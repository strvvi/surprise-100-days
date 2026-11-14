/**
 * 🐰 漫遊烏薩奇寵物元件 (可在螢幕底部奔跑，並隨時支援關閉與喚醒)
 */
function initRoamingUsagi() {
  // 建立烏薩奇漫遊容器
  const petContainer = document.createElement('div');
  petContainer.id = 'roaming-usagi-container';
  petContainer.className = 'fixed bottom-4 z-40 select-none cursor-pointer transition-transform duration-300 pointer-events-auto';
  petContainer.style.left = '50px';
  petContainer.style.width = '95px';
  petContainer.style.height = '95px';

  petContainer.innerHTML = `
    <!-- 關閉按鈕 -->
    <button id="close-pet-btn" class="absolute -top-2 -right-2 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full text-[10px] flex items-center justify-center shadow transition-all hover:scale-110 z-50" title="收起烏薩奇">
      ✕
    </button>
    <!-- 說話對話框 -->
    <div id="pet-bubble" class="absolute -top-9 left-1/2 -translate-x-1/2 bg-white/95 text-rose-600 px-2.5 py-1 rounded-xl text-xs font-bold shadow-md border border-rose-200 whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none">
      呀哈！⚡️
    </div>
    <!-- 烏薩奇角色圖 (實心黃色身體與完整耳朵) -->
    <img id="pet-avatar" src="photos/usagi.png?v=20261115_v2" class="w-full h-full object-contain filter drop-shadow-md transition-transform" alt="Roaming Usagi" />
  `;

  document.body.appendChild(petContainer);

  const avatar = document.getElementById('pet-avatar');
  const bubble = document.getElementById('pet-bubble');
  const closeBtn = document.getElementById('close-pet-btn');
  const summonBtn = document.getElementById('summon-usagi-btn');

  let posX = 60;
  let speed = 1.8;
  let direction = 1; // 1: 向右, -1: 向左
  let isRunning = true;
  let isPaused = false;
  let animFrameId = null;
  let bounceStep = 0;

  const quotes = ["呀哈！⚡️", "嗚啦！", "Mimi 超可愛！", "100 天快樂 💕", "出發約會囉！", "吃宵夜嗎～", "跑跑跑 🐰💨"];

  // 奔跑巡邏動畫
  function step() {
    if (!isRunning || isPaused) {
      animFrameId = requestAnimationFrame(step);
      return;
    }

    const maxX = window.innerWidth - 85;
    posX += speed * direction;
    bounceStep += 0.2;

    // 碰壁折返
    if (posX >= maxX) {
      posX = maxX;
      direction = -1;
      avatar.style.transform = 'scaleX(-1)';
    } else if (posX <= 10) {
      posX = 10;
      direction = 1;
      avatar.style.transform = 'scaleX(1)';
    }

    // 小小上下彈跳步伐 (模擬跑步)
    const bounceY = Math.sin(bounceStep) * 6;
    petContainer.style.transform = `translate3d(${posX}px, ${bounceY}px, 0)`;

    // 偶爾隨機停下休息看風景
    if (Math.random() < 0.003) {
      isPaused = true;
      setTimeout(() => {
        isPaused = false;
        if (Math.random() > 0.5) {
          direction *= -1;
          avatar.style.transform = direction === 1 ? 'scaleX(1)' : 'scaleX(-1)';
        }
      }, 1500);
    }

    animFrameId = requestAnimationFrame(step);
  }

  animFrameId = requestAnimationFrame(step);

  // 點擊烏薩奇互動：高興跳躍 + 隨機語錄
  petContainer.addEventListener('click', (e) => {
    if (e.target === closeBtn) return;

    // 彈跳
    petContainer.style.transition = 'transform 0.2s ease';
    petContainer.style.transform = `translate3d(${posX}px, -28px, 0)`;
    setTimeout(() => {
      petContainer.style.transition = 'none';
    }, 250);

    // 顯示說話氣泡
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    bubble.textContent = q;
    bubble.classList.remove('opacity-0');
    bubble.classList.add('opacity-100');

    setTimeout(() => {
      bubble.classList.remove('opacity-100');
      bubble.classList.add('opacity-0');
    }, 1500);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x: posX / window.innerWidth, y: 0.9 }
      });
    }
  });

  // 關閉烏薩奇按鈕
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideUsagi();
  });

  function hideUsagi() {
    isRunning = false;
    cancelAnimationFrame(animFrameId);
    petContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    petContainer.style.opacity = '0';
    petContainer.style.transform = `translate3d(${posX}px, 30px, 0) scale(0.5)`;
    setTimeout(() => {
      petContainer.style.display = 'none';
    }, 400);

    // 顯示導航列上的喚醒按鈕
    if (summonBtn) {
      summonBtn.classList.remove('hidden');
    }
  }

  function showUsagi() {
    petContainer.style.display = 'block';
    petContainer.style.opacity = '1';
    petContainer.style.transform = `translate3d(${posX}px, 0, 0) scale(1)`;
    isRunning = true;
    animFrameId = requestAnimationFrame(step);

    if (summonBtn) {
      summonBtn.classList.add('hidden');
    }
  }

  if (summonBtn) {
    summonBtn.addEventListener('click', showUsagi);
  }
}
