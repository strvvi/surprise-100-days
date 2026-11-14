/**
 * HTML5 Canvas 趣味刮刮卡兌換券互動
 */
function initScratchCards() {
  const container = document.getElementById('coupons-grid');
  if (!container) return;

  window.renderScratchCards = function() {
    container.innerHTML = '';

    CONFIG.coupons.forEach((coupon, index) => {
      const card = document.createElement('div');
      card.className = 'scratch-container bg-white border border-rose-100 shadow-md p-6 flex flex-col justify-between relative min-h-[220px] transition-transform hover:-translate-y-1';

      card.innerHTML = `
        <div class="coupon-content flex flex-col h-full justify-between select-none">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex items-center justify-center p-2.5 bg-rose-100 text-rose-500 rounded-xl">
                <i data-lucide="${coupon.icon}" class="w-6 h-6"></i>
              </span>
              <span class="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-200">
                ${coupon.validUntil}
              </span>
            </div>
            <h4 class="font-bold text-gray-800 text-lg mb-2">${coupon.title}</h4>
            <p class="text-sm text-gray-600 leading-relaxed">${coupon.desc}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-dashed border-rose-200 flex items-center justify-between text-xs text-rose-600 font-medium">
            <span>兌換代碼: LOVE-100-${index + 1}</span>
            <span class="flex items-center gap-1 font-bold">✨ 已解鎖</span>
          </div>
        </div>
        <canvas class="scratch-canvas" id="canvas-${coupon.id}"></canvas>
      `;

      container.appendChild(card);

      // 初始化 Canvas 刮刮層
      setTimeout(() => {
        setupCanvas(coupon.id, card);
      }, 50);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  function setupCanvas(id, cardEl) {
    const canvas = document.getElementById(`canvas-${id}`);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = cardEl.offsetWidth;
    const height = cardEl.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // 繪製銀粉/玫瑰金刮刮塗層
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e2d4d8');
    grad.addColorStop(0.5, '#c5b0b6');
    grad.addColorStop(1, '#dfd3d7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 塗層上的引導文字與裝飾
    ctx.fillStyle = '#6d5d62';
    ctx.font = 'bold 15px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ 輕輕刮開領取福利 ✨', width / 2, height / 2 - 5);
    ctx.font = '12px -apple-system, sans-serif';
    ctx.fillStyle = '#8a797f';
    ctx.fillText('( 手指滑動或滑鼠刮開 )', width / 2, height / 2 + 20);

    let isDrawing = false;
    let scratchedPixels = 0;
    let isRevealed = false;

    function scratch(x, y) {
      if (isRevealed) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      checkScratchedPercentage();
    }

    function checkScratchedPercentage() {
      if (isRevealed) return;
      // 抽樣檢查像素透明度
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparent = 0;
      const totalSample = pixels.length / 16; // 每4個像素檢查一個

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparent++;
        }
      }

      if (transparent / totalSample > 0.45) {
        isRevealed = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.remove();
        }, 600);

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { y: 0.7 }
          });
        }
      }
    }

    // 滑鼠事件
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      scratch(e.clientX - rect.left, e.clientY - rect.top);
    });

    window.addEventListener('mouseup', () => isDrawing = false);

    // 觸控事件 (手機端)
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    }, { passive: true });

    canvas.addEventListener('touchend', () => isDrawing = false);
  }

  window.renderScratchCards();
}
