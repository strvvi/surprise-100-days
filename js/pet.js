/**
 * 🐰🐾 漫遊小可愛寵物元件 (烏薩奇 & 小桃 Momonga 在螢幕底部歡樂奔跑巡邏)
 */
function initRoamingUsagi() {
  const summonBtn = document.getElementById('summon-usagi-btn');

  // ==========================================
  // 1. 建立 🐰 烏薩奇 漫遊元件
  // ==========================================
  const usagiContainer = document.createElement('div');
  usagiContainer.id = 'roaming-usagi-container';
  usagiContainer.className = 'fixed bottom-4 z-40 select-none cursor-pointer transition-transform duration-300 pointer-events-auto';
  usagiContainer.style.left = '30px';
  usagiContainer.style.width = '90px';
  usagiContainer.style.height = '90px';

  usagiContainer.innerHTML = `
    <!-- 關閉按鈕 -->
    <button id="close-usagi-btn" class="absolute -top-2 -right-2 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full text-[10px] flex items-center justify-center shadow transition-all hover:scale-110 z-50" title="收起烏薩奇">
      ✕
    </button>
    <!-- 說話對話框 -->
    <div id="usagi-bubble" class="absolute -top-9 left-1/2 -translate-x-1/2 bg-white/95 text-rose-600 px-2.5 py-1 rounded-xl text-xs font-bold shadow-md border border-rose-200 whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none">
      呀哈！⚡️
    </div>
    <!-- 烏薩奇角色圖 -->
    <img id="usagi-avatar" src="photos/usagi.png?v=20261118_v3" class="w-full h-full object-contain filter drop-shadow-md transition-transform" alt="Roaming Usagi" />
  `;
  document.body.appendChild(usagiContainer);

  const usagiImg = document.getElementById('usagi-avatar');
  const usagiBubble = document.getElementById('usagi-bubble');
  const closeUsagiBtn = document.getElementById('close-usagi-btn');

  // ==========================================
  // 2. 建立 🐾 小桃 (Momonga) 漫遊元件
  // ==========================================
  const momongaContainer = document.createElement('div');
  momongaContainer.id = 'roaming-momonga-container';
  momongaContainer.className = 'fixed bottom-4 z-40 select-none cursor-pointer transition-transform duration-300 pointer-events-auto';
  momongaContainer.style.left = '200px';
  momongaContainer.style.width = '88px';
  momongaContainer.style.height = '92px';

  momongaContainer.innerHTML = `
    <!-- 關閉按鈕 -->
    <button id="close-momonga-btn" class="absolute -top-2 -right-2 w-5 h-5 bg-black/60 hover:bg-black/80 text-white rounded-full text-[10px] flex items-center justify-center shadow transition-all hover:scale-110 z-50" title="收起小桃">
      ✕
    </button>
    <!-- 說話對話框 -->
    <div id="momonga-bubble" class="absolute -top-9 left-1/2 -translate-x-1/2 bg-white/95 text-purple-600 px-2.5 py-1 rounded-xl text-xs font-bold shadow-md border border-purple-200 whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none">
      誇獎我！✨
    </div>
    <!-- 小桃角色圖 (全身體與蓬鬆藍大尾巴) -->
    <img id="momonga-avatar" src="photos/momonga.png?v=20261118_v3" class="w-full h-full object-contain filter drop-shadow-md transition-transform" alt="Roaming Momonga" />
  `;
  document.body.appendChild(momongaContainer);

  const momongaImg = document.getElementById('momonga-avatar');
  const momongaBubble = document.getElementById('momonga-bubble');
  const closeMomongaBtn = document.getElementById('close-momonga-btn');

  // ==========================================
  // 3. 狀態控制與巡邏運動設定
  // ==========================================
  let posX1 = 30;
  let speed1 = 1.8;
  let dir1 = 1; // 1: 向右, -1: 向左
  let isUsagiRunning = true;
  let isUsagiPaused = false;
  let bounce1 = 0;

  let posX2 = 220;
  let speed2 = 1.5;
  let dir2 = -1; // 1: 向右, -1: 向左
  let isMomongaRunning = true;
  let isMomongaPaused = false;
  let bounce2 = 0;

  let animFrameId = null;

  const usagiQuotes = ["呀哈！⚡️", "嗚啦！", "Mimi 超可愛！", "100 天快樂 💕", "出發約會囉！", "吃宵夜嗎～", "跑跑跑 🐰💨"];
  const momongaQuotes = ["誇獎我！✨", "可愛吧～🐾", "萌萌純純大壞咪！💕", "男朋友超愛妳的！❤️", "大尾巴軟綿綿～", "100 天快樂！", "看我看我！💖"];

  function step() {
    const screenW = window.innerWidth;
    const maxX = Math.max(100, screenW - 95);

    // --- 烏薩奇巡邏 ---
    if (isUsagiRunning && !isUsagiPaused) {
      posX1 += speed1 * dir1;
      bounce1 += 0.2;

      if (posX1 >= maxX) {
        posX1 = maxX;
        dir1 = -1;
        usagiImg.style.transform = 'scaleX(-1)';
      } else if (posX1 <= 10) {
        posX1 = 10;
        dir1 = 1;
        usagiImg.style.transform = 'scaleX(1)';
      }

      const bounceY1 = Math.sin(bounce1) * 6;
      usagiContainer.style.transform = `translate3d(${posX1}px, ${bounceY1}px, 0)`;

      // 隨機停步看風景
      if (Math.random() < 0.003) {
        isUsagiPaused = true;
        setTimeout(() => {
          isUsagiPaused = false;
          if (Math.random() > 0.5) {
            dir1 *= -1;
            usagiImg.style.transform = dir1 === 1 ? 'scaleX(1)' : 'scaleX(-1)';
          }
        }, 1500);
      }
    }

    // --- 小桃巡邏 ---
    if (isMomongaRunning && !isMomongaPaused) {
      posX2 += speed2 * dir2;
      bounce2 += 0.18;

      if (posX2 >= maxX) {
        posX2 = maxX;
        dir2 = -1;
        momongaImg.style.transform = 'scaleX(1)';
      } else if (posX2 <= 10) {
        posX2 = 10;
        dir2 = 1;
        momongaImg.style.transform = 'scaleX(-1)';
      }

      const bounceY2 = Math.sin(bounce2) * 5;
      momongaContainer.style.transform = `translate3d(${posX2}px, ${bounceY2}px, 0)`;

      // 隨機停步賣萌
      if (Math.random() < 0.003) {
        isMomongaPaused = true;
        setTimeout(() => {
          isMomongaPaused = false;
          if (Math.random() > 0.5) {
            dir2 *= -1;
            momongaImg.style.transform = dir2 === 1 ? 'scaleX(-1)' : 'scaleX(1)';
          }
        }, 1600);
      }
    }

    animFrameId = requestAnimationFrame(step);
  }

  animFrameId = requestAnimationFrame(step);

  // ==========================================
  // 4. 點擊互動事件
  // ==========================================
  // 點擊烏薩奇
  usagiContainer.addEventListener('click', (e) => {
    if (e.target === closeUsagiBtn) return;

    usagiContainer.style.transition = 'transform 0.2s ease';
    usagiContainer.style.transform = `translate3d(${posX1}px, -28px, 0)`;
    setTimeout(() => {
      usagiContainer.style.transition = 'none';
    }, 250);

    const q = usagiQuotes[Math.floor(Math.random() * usagiQuotes.length)];
    usagiBubble.textContent = q;
    usagiBubble.classList.remove('opacity-0');
    usagiBubble.classList.add('opacity-100');
    setTimeout(() => {
      usagiBubble.classList.remove('opacity-100');
      usagiBubble.classList.add('opacity-0');
    }, 1500);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x: Math.max(0.1, Math.min(0.9, posX1 / window.innerWidth)), y: 0.9 }
      });
    }
  });

  // 點擊小桃 (Momonga)
  momongaContainer.addEventListener('click', (e) => {
    if (e.target === closeMomongaBtn) return;

    momongaContainer.style.transition = 'transform 0.2s ease';
    momongaContainer.style.transform = `translate3d(${posX2}px, -28px, 0)`;
    setTimeout(() => {
      momongaContainer.style.transition = 'none';
    }, 250);

    const q = momongaQuotes[Math.floor(Math.random() * momongaQuotes.length)];
    momongaBubble.textContent = q;
    momongaBubble.classList.remove('opacity-0');
    momongaBubble.classList.add('opacity-100');
    setTimeout(() => {
      momongaBubble.classList.remove('opacity-100');
      momongaBubble.classList.add('opacity-0');
    }, 1500);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 20,
        spread: 50,
        colors: ['#c084fc', '#f472b6', '#38bdf8', '#ffd166'],
        origin: { x: Math.max(0.1, Math.min(0.9, posX2 / window.innerWidth)), y: 0.9 }
      });
    }
  });

  // ==========================================
  // 5. 關閉與喚醒機制
  // ==========================================
  function updateSummonBtn() {
    if (summonBtn) {
      if (!isUsagiRunning || !isMomongaRunning) {
        summonBtn.classList.remove('hidden');
      } else {
        summonBtn.classList.add('hidden');
      }
    }
  }

  closeUsagiBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isUsagiRunning = false;
    usagiContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    usagiContainer.style.opacity = '0';
    usagiContainer.style.transform = `translate3d(${posX1}px, 30px, 0) scale(0.5)`;
    setTimeout(() => {
      usagiContainer.style.display = 'none';
      updateSummonBtn();
    }, 400);
  });

  closeMomongaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isMomongaRunning = false;
    momongaContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    momongaContainer.style.opacity = '0';
    momongaContainer.style.transform = `translate3d(${posX2}px, 30px, 0) scale(0.5)`;
    setTimeout(() => {
      momongaContainer.style.display = 'none';
      updateSummonBtn();
    }, 400);
  });

  function showAllPets() {
    isUsagiRunning = true;
    usagiContainer.style.display = 'block';
    usagiContainer.style.opacity = '1';
    usagiContainer.style.transform = `translate3d(${posX1}px, 0, 0) scale(1)`;

    isMomongaRunning = true;
    momongaContainer.style.display = 'block';
    momongaContainer.style.opacity = '1';
    momongaContainer.style.transform = `translate3d(${posX2}px, 0, 0) scale(1)`;

    updateSummonBtn();
  }

  if (summonBtn) {
    summonBtn.addEventListener('click', showAllPets);
  }
}
