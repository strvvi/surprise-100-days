/**
 * 紀念日與 100 天即時計時器
 */
function initDayCounter() {
  const daysEl = document.getElementById('counter-days');
  const hoursEl = document.getElementById('counter-hours');
  const minutesEl = document.getElementById('counter-minutes');
  const secondsEl = document.getElementById('counter-seconds');
  const progressBarEl = document.getElementById('milestone-progress');
  const progressPercentEl = document.getElementById('milestone-percent');

  function updateCounter() {
    const now = new Date();
    const start = CONFIG.startDate;
    const target100 = CONFIG.target100Date;

    // 計算在一起的總毫秒數
    let diff = now - start;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

    // 計算 100 天進度百分比
    const totalDuration = target100 - start;
    const currentProgress = now - start;
    let percentage = Math.min(100, Math.max(0, Math.round((currentProgress / totalDuration) * 100)));

    if (progressBarEl) progressBarEl.style.width = `${percentage}%`;
    if (progressPercentEl) progressPercentEl.textContent = `${percentage}%`;
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}
