/**
 * 🌙 晚安星空浪漫模式 (Night Sky Mode)
 */
function initNightMode() {
  const toggleBtn = document.getElementById('night-mode-toggle');
  const starCanvas = document.getElementById('star-canvas');

  if (!toggleBtn || !starCanvas) return;

  const ctx = starCanvas.getContext('2d');
  let stars = [];
  let isNight = false;
  let animId = null;

  function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    stars = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 9000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        dir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function renderStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    stars.forEach(star => {
      star.alpha += star.speed * star.dir;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.dir *= -1;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 230, 240, ${star.alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(255, 180, 210, 0.8)';
      ctx.fill();
    });
    if (isNight) {
      animId = requestAnimationFrame(renderStars);
    }
  }

  toggleBtn.addEventListener('click', () => {
    isNight = !isNight;
    document.body.classList.toggle('night-mode', isNight);

    if (isNight) {
      toggleBtn.innerHTML = `
        <i data-lucide="sun" class="w-4 h-4 text-amber-300"></i>
        <span class="font-medium text-amber-200">白晝模式</span>
      `;
      resizeCanvas();
      renderStars();
    } else {
      toggleBtn.innerHTML = `
        <i data-lucide="moon" class="w-4 h-4 text-rose-500"></i>
        <span class="font-medium text-rose-700">星空模式 🌙</span>
      `;
      cancelAnimationFrame(animId);
      ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  window.addEventListener('resize', () => {
    if (isNight) resizeCanvas();
  });
}
