/**
 * 3D 火漆印信封拆封動畫與轉場（防呆且極致流暢版）
 */
function initEnvelope() {
  const waxSeal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');
  const introSection = document.getElementById('intro-section');
  const mainSection = document.getElementById('main-content');
  const openDirectBtn = document.getElementById('open-direct-btn');

  if (!introSection || !mainSection) return;

  let hasOpened = false;

  function openEnvelopeNow() {
    if (hasOpened) return;
    hasOpened = true;

    // 1. 信封翻開
    if (envelope) envelope.classList.add('open');
    if (waxSeal) waxSeal.style.display = 'none';

    // 2. 噴灑五彩紙屑
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6b8b', '#ffd166', '#06d6a0', '#118ab2', '#ff9a9e']
        });
      }
    } catch (e) {}

    // 3. 嘗試播放音樂
    try {
      if (window.playRomanticBGM) {
        window.playRomanticBGM();
      }
    } catch (e) {}

    // 4. 平滑進入主頁 (保證 100% 不會卡在空白畫面)
    setTimeout(() => {
      introSection.style.transition = 'opacity 0.6s ease';
      introSection.style.opacity = '0';
      introSection.style.pointerEvents = 'none';

      setTimeout(() => {
        introSection.classList.add('hidden');
        introSection.style.display = 'none';

        mainSection.classList.remove('hidden');
        mainSection.style.display = 'block';
        mainSection.style.opacity = '1';

        // 重新繪製刮刮卡以獲取正確維度
        if (window.renderScratchCards) {
          window.renderScratchCards();
        }
      }, 600);
    }, 900);
  }

  // 點擊火漆印、信封本體或直接點開按鈕都可以順利開啟
  if (waxSeal) {
    waxSeal.addEventListener('click', openEnvelopeNow);
    waxSeal.addEventListener('touchend', openEnvelopeNow);
  }
  if (envelope) {
    envelope.addEventListener('click', openEnvelopeNow);
  }
  if (openDirectBtn) {
    openDirectBtn.addEventListener('click', openEnvelopeNow);
  }
}

window.skipIntro = function() {
  const introSection = document.getElementById('intro-section');
  const mainSection = document.getElementById('main-content');
  if (introSection) {
    introSection.classList.add('hidden');
    introSection.style.display = 'none';
  }
  if (mainSection) {
    mainSection.classList.remove('hidden');
    mainSection.style.display = 'block';
    mainSection.style.opacity = '1';
  }
  if (window.playRomanticBGM) window.playRomanticBGM();
  if (window.renderScratchCards) window.renderScratchCards();
};
