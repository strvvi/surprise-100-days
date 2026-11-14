/**
 * 💌 心動悄悄話互動（專屬稱呼：萌萌咪）
 */
let lastWhisperIdx = -1;

function initHeartWhispers() {
  const heartBtn = document.getElementById('whisper-heart-btn');
  const displayCard = document.getElementById('whisper-display-card');
  const textEl = document.getElementById('whisper-text');
  const countEl = document.getElementById('whisper-counter');

  if (!heartBtn || !textEl) return;

  let clickCount = 0;

  heartBtn.addEventListener('click', (e) => {
    clickCount++;
    if (countEl) countEl.textContent = `已收集 ${clickCount} 次心動 💕`;

    // 隨機選一句悄悄話（避免連續重複）
    let idx;
    do {
      idx = Math.floor(Math.random() * CONFIG.heartWhispers.length);
    } while (CONFIG.heartWhispers.length > 1 && idx === lastWhisperIdx);
    lastWhisperIdx = idx;

    const quote = CONFIG.heartWhispers[idx];

    // 更新並觸發浮動動畫
    displayCard.classList.remove('hidden');
    displayCard.classList.remove('whisper-bubble');
    void displayCard.offsetWidth; // 觸發重繪
    displayCard.classList.add('whisper-bubble');

    textEl.textContent = `「${quote}」`;

    // 噴出愛心粒子
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.65 },
        colors: ['#ff6b8b', '#ff8e9b', '#ffaec0', '#ffd166']
      });
    }
  });
}
