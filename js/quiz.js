/**
 * 🧩 100 天默契小快問快答 (Couple Quiz)
 */
let currentQuizIdx = 0;

function initCoupleQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container || !CONFIG.quizQuestions) return;

  renderQuizQuestion();

  function renderQuizQuestion() {
    if (currentQuizIdx >= CONFIG.quizQuestions.length) {
      // 全部答對通關
      container.innerHTML = `
        <div class="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 rounded-2xl p-6 text-center border border-rose-200">
          <div class="text-4xl mb-2">🎉 💯 💖</div>
          <h4 class="text-xl font-bold text-rose-600 mb-1">默契大考驗 100 分通關！</h4>
          <p class="text-sm text-gray-600 mb-4">我們真的是天生一對！罰賞：立刻獲得一個超緊的抱抱！🥰</p>
          <button onclick="restartQuiz()" class="px-5 py-2 bg-rose-500 text-white rounded-full text-xs font-semibold hover:bg-rose-600 transition-all shadow-sm">
            再玩一次 🔄
          </button>
        </div>
      `;
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      return;
    }

    const q = CONFIG.quizQuestions[currentQuizIdx];

    container.innerHTML = `
      <div class="bg-white/80 backdrop-blur rounded-2xl p-6 border border-rose-100 shadow-sm transition-all">
        <div class="flex items-center justify-between mb-3 text-xs text-rose-500 font-semibold">
          <span>題目 ${currentQuizIdx + 1} / ${CONFIG.quizQuestions.length}</span>
          <span>100 天專屬默契</span>
        </div>
        <h4 class="text-base sm:text-lg font-bold text-gray-800 mb-4">${q.question}</h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="quiz-options">
          ${q.options.map((opt, i) => `
            <button onclick="handleQuizAnswer(${i})" class="w-full text-left p-3.5 rounded-xl border border-rose-100 bg-rose-50/40 hover:bg-rose-100/60 hover:border-rose-300 transition-all text-sm font-medium text-gray-700 flex items-center justify-between">
              <span>${opt}</span>
              <span class="text-rose-400 text-xs">選擇 ➔</span>
            </button>
          `).join('')}
        </div>

        <div id="quiz-feedback" class="mt-4 hidden p-3 rounded-xl text-xs font-medium text-center"></div>
      </div>
    `;
  }

  window.handleQuizAnswer = function(selectedIdx) {
    const q = CONFIG.quizQuestions[currentQuizIdx];
    const feedbackEl = document.getElementById('quiz-feedback');

    if (selectedIdx === q.answer) {
      // 答對
      feedbackEl.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-emerald-50 text-emerald-600 border border-emerald-200 block';
      feedbackEl.innerHTML = '🎉 太棒了，完全答對！果然好懂我 💕';

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 }
        });
      }

      setTimeout(() => {
        currentQuizIdx++;
        renderQuizQuestion();
      }, 1000);
    } else {
      // 答錯趣味處罰
      feedbackEl.className = 'mt-4 p-3 rounded-xl text-xs font-medium text-center bg-rose-50 text-rose-600 border border-rose-200 block animate-shake';
      feedbackEl.innerHTML = q.wrongTip;
    }
  };

  window.restartQuiz = function() {
    currentQuizIdx = 0;
    renderQuizQuestion();
  };
}
