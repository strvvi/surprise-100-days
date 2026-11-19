/**
 * 🔒 付費解鎖隱私模式 (Paywall Privacy Mode)
 * 一鍵將名字與天數替換為搞笑又可愛的「🔒 付費解鎖」標籤
 * 支援 URL 參數 (?privacy=1 或 ?vip=1) 以及導航列一鍵切換
 */
(function() {
  window.isPrivacyMode = false;

  const PAYWALL_HTML = '<span class="paywall-tag cursor-pointer bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded text-xs border border-amber-300 shadow-sm transition-all hover:scale-105 inline-flex items-center gap-0.5 align-middle select-none" title="點擊查看解鎖條件">🔒 付費解鎖</span>';
  const PAYWALL_DATE_HTML = '<span class="paywall-tag cursor-pointer bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded text-xs border border-amber-300 shadow-sm transition-all hover:scale-105 inline-flex items-center gap-0.5 align-middle select-none" title="點擊查看解鎖條件">🔒 付費解鎖日期</span>';

  // 原始內容備份容器
  const originalState = {
    brandTitle: null,
    coupleNames: null,
    heroSince: null,
    introTitle: null,
    introSubtitle: null,
    letterEntryDesc: null,
    letterEntryBtn: null,
    letterTitle: null,
    letterSubtitle: null,
    letterSign: null,
    letterDate: null,
    letterParagraphs: [],
    footerMade: null,
    footerSub: null,
    milestoneFirst: null,
    milestoneLast: null,
  };

  function createPaywallModal() {
    if (document.getElementById('paywall-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'paywall-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 hidden select-none animate-fade-in';
    modal.innerHTML = `
      <div class="bg-gradient-to-b from-[#fffbf8] to-[#fff4f5] rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border-2 border-amber-300 relative animate-scale-up">
        <!-- 關閉按鈕 -->
        <button id="close-paywall-x" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 text-sm font-bold">
          ✕
        </button>

        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner border border-amber-200">
          💳
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-1">🔒 VIP 專屬內容未解鎖</h3>
        <p class="text-xs text-rose-500 font-semibold mb-4 tracking-wide">此內容為特級私密，需完成付費手續方可查看</p>
        
        <div class="bg-white/90 rounded-2xl p-4 text-xs text-gray-700 text-left space-y-2.5 mb-5 border border-amber-200 shadow-sm leading-relaxed">
          <div class="flex items-center gap-1.5 font-bold text-gray-800 text-sm">
            <span>💰 解鎖費用（以下條件任選一項）：</span>
          </div>
          <p class="flex items-start gap-1.5 text-gray-700">
            <span>🍹</span> <span>請 <strong>Mimi</strong> 喝一杯超好喝水果特調或奶茶</span>
          </p>
          <p class="flex items-start gap-1.5 text-gray-700">
            <span>🍣</span> <span>請萌萌小公主吃一頓海鮮丼、芒果冰或大餐</span>
          </p>
          <p class="flex items-start gap-1.5 text-gray-700">
            <span>💕</span> <span>向男朋友支付 <strong>99,999,999</strong> 點心動點數</span>
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <button id="pay-fake-btn" class="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5">
            <span>立即刷卡支付 ➔</span>
            <span class="text-[10px] opacity-80">（餘額不足）</span>
          </button>
          <button id="unlock-owner-btn" class="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-xl border border-rose-200 transition-all">
            我是本人！輸入通關密語解除鎖定 🔓
          </button>
          <button id="close-paywall-btn" class="text-xs text-gray-400 hover:text-gray-600 py-1">
            默默關閉
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('close-paywall-btn');
    const closeX = document.getElementById('close-paywall-x');
    const fakePayBtn = document.getElementById('pay-fake-btn');
    const unlockBtn = document.getElementById('unlock-owner-btn');

    function closeModal() {
      modal.classList.add('hidden');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeX) closeX.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (fakePayBtn) {
      fakePayBtn.addEventListener('click', () => {
        alert('💳 刷卡失敗！您的帳戶餘額不足 $99,999,999 元 😭\n請改用「請喝飲料」或「請吃大餐」方式支付～');
      });
    }

    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        const pwd = prompt('請輸入解除鎖定通關密語（提示：520 或 strvvi）：');
        if (pwd && (pwd.trim().toLowerCase() === '520' || pwd.trim().toLowerCase() === 'strvvi' || pwd.trim().toLowerCase() === 'vixus')) {
          closeModal();
          window.togglePrivacyMode(false);
          alert('🎉 驗證成功！已成功為您切換回原始甜蜜模式 💕');
          if (typeof confetti === 'function') {
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          }
        } else if (pwd !== null) {
          alert('❌ 密碼錯誤！請向小公主 Mimi 索取正確密語～');
        }
      });
    }
  }

  function showPaywallPopup() {
    createPaywallModal();
    const modal = document.getElementById('paywall-modal');
    if (modal) modal.classList.remove('hidden');
  }

  function bindPaywallTags() {
    document.querySelectorAll('.paywall-tag').forEach(tag => {
      if (!tag.dataset.bound) {
        tag.dataset.bound = 'true';
        tag.addEventListener('click', (e) => {
          e.stopPropagation();
          showPaywallPopup();
        });
      }
    });
  }

  function filterPrivacyText(text) {
    if (!text) return text;
    return text
      .replace(/萌萌純純大壞咪/g, PAYWALL_HTML)
      .replace(/萌萌小公主/g, PAYWALL_HTML)
      .replace(/萌萌咪/g, PAYWALL_HTML)
      .replace(/Vixus & Mimi/g, PAYWALL_HTML)
      .replace(/Mimi/g, PAYWALL_HTML)
      .replace(/Vixus/g, PAYWALL_HTML)
      .replace(/100 Days/g, PAYWALL_HTML)
      .replace(/100 days/g, PAYWALL_HTML)
      .replace(/100 天/g, PAYWALL_HTML)
      .replace(/100天/g, PAYWALL_HTML)
      .replace(/2026\.08\.12/g, PAYWALL_DATE_HTML)
      .replace(/2026\.11\.20/g, PAYWALL_DATE_HTML)
      .replace(/8 月 12 號/g, PAYWALL_DATE_HTML)
      .replace(/8\/12/g, PAYWALL_DATE_HTML);
  }

  function applyPrivacyMode() {
    // 1. 導航列品牌標題與情侶名
    const brandTitle = document.querySelector('header span.text-rose-500.text-xl');
    if (brandTitle) {
      if (!originalState.brandTitle) originalState.brandTitle = brandTitle.innerHTML;
      brandTitle.innerHTML = `❤️ ${PAYWALL_HTML}`;
    }

    const coupleNames = document.getElementById('couple-names');
    if (coupleNames) {
      if (!originalState.coupleNames) originalState.coupleNames = coupleNames.innerHTML;
      coupleNames.innerHTML = PAYWALL_HTML;
    }

    // 2. 開場信封區
    const introSection = document.getElementById('intro-section');
    if (introSection) {
      const h2 = introSection.querySelector('h2');
      if (h2) {
        if (!originalState.introTitle) originalState.introTitle = h2.innerHTML;
        h2.innerHTML = `For My Dearest ${PAYWALL_HTML}`;
      }
      const p = introSection.querySelector('p.text-rose-500');
      if (p) {
        if (!originalState.introSubtitle) originalState.introSubtitle = p.innerHTML;
        p.innerHTML = `寫在我們相愛的第 ${PAYWALL_HTML} 天 • 點擊火漆印解鎖驚喜`;
      }
    }

    // 3. Hero 紀念標題區
    const heroSince = document.querySelector('section.text-center span.tracking-widest');
    if (heroSince) {
      if (!originalState.heroSince) originalState.heroSince = heroSince.innerHTML;
      heroSince.innerHTML = `Since ${PAYWALL_DATE_HTML}`;
    }

    // 4. 進度條兩端日期
    const progressContainer = document.querySelector('div.max-w-md.mx-auto.bg-white\\/60');
    if (progressContainer) {
      const spans = progressContainer.querySelectorAll('div.flex.justify-between span');
      if (spans.length >= 3) {
        if (!originalState.milestoneFirst) originalState.milestoneFirst = spans[0].innerHTML;
        if (!originalState.milestoneLast) originalState.milestoneLast = spans[2].innerHTML;
        spans[0].innerHTML = `${PAYWALL_DATE_HTML} 第一天`;
        spans[2].innerHTML = `${PAYWALL_DATE_HTML} 第 ${PAYWALL_HTML} 天`;
      }
    }

    // 5. 手寫信入口卡片
    const letterEntryH3 = document.querySelector('section.bg-white\\/70 h3');
    if (letterEntryH3) {
      if (!originalState.letterEntryDesc) originalState.letterEntryDesc = letterEntryH3.innerHTML;
      letterEntryH3.innerHTML = `最後，有一封信想給 ${PAYWALL_HTML}`;
    }

    const openLetterBtn = document.getElementById('open-letter-btn');
    if (openLetterBtn) {
      if (!originalState.letterEntryBtn) originalState.letterEntryBtn = openLetterBtn.innerHTML;
      openLetterBtn.innerHTML = `<i data-lucide="heart" class="w-4 h-4 fill-white"></i> 打開 ${PAYWALL_HTML} 手寫信 💌`;
    }

    // 6. 手寫信彈窗 (Modal)
    const letterTitle = document.getElementById('letter-title');
    if (letterTitle) {
      if (!originalState.letterTitle) originalState.letterTitle = letterTitle.innerHTML;
      letterTitle.innerHTML = `給最親愛的 ${PAYWALL_HTML}`;
    }

    const letterSubtitle = document.getElementById('letter-subtitle');
    if (letterSubtitle) {
      if (!originalState.letterSubtitle) originalState.letterSubtitle = letterSubtitle.innerHTML;
      letterSubtitle.innerHTML = `寫在我們相愛的第 ${PAYWALL_HTML} 天`;
    }

    const letterSign = document.getElementById('letter-sign');
    if (letterSign) {
      if (!originalState.letterSign) originalState.letterSign = letterSign.innerHTML;
      letterSign.innerHTML = `愛妳的 ${PAYWALL_HTML}`;
    }

    const letterDate = document.getElementById('letter-date');
    if (letterDate) {
      if (!originalState.letterDate) originalState.letterDate = letterDate.innerHTML;
      letterDate.innerHTML = PAYWALL_DATE_HTML;
    }

    const letterContent = document.getElementById('letter-content');
    if (letterContent) {
      const ps = letterContent.querySelectorAll('p');
      if (originalState.letterParagraphs.length === 0) {
        ps.forEach(p => originalState.letterParagraphs.push(p.innerHTML));
      }
      ps.forEach(p => {
        p.innerHTML = filterPrivacyText(p.innerHTML);
      });
    }

    // 7. 頁尾
    const footerDiv = document.querySelector('footer div.flex');
    if (footerDiv) {
      const span = footerDiv.querySelector('span');
      if (span) {
        if (!originalState.footerMade) originalState.footerMade = span.innerHTML;
        span.innerHTML = `Made with all my love ❤️ for ${PAYWALL_HTML} by ${PAYWALL_HTML}`;
      }
    }
    const footerP = document.querySelector('footer p.text-\\[11px\\]');
    if (footerP) {
      if (!originalState.footerSub) originalState.footerSub = footerP.innerHTML;
      footerP.innerHTML = `${PAYWALL_DATE_HTML} - ${PAYWALL_DATE_HTML} • Happy Anniversary`;
    }

    // 8. 刮刮卡標題
    document.querySelectorAll('.scratch-desc, h4').forEach(el => {
      if (el.textContent.includes('Mimi 專屬')) {
        el.innerHTML = el.innerHTML.replace(/Mimi 專屬/g, `${PAYWALL_HTML} 專屬`);
      }
    });

    // 綁定所有付費標籤點擊事件
    bindPaywallTags();
    if (window.lucide) window.lucide.createIcons();
  }

  function removePrivacyMode() {
    const brandTitle = document.querySelector('header span.text-rose-500.text-xl');
    if (brandTitle && originalState.brandTitle) brandTitle.innerHTML = originalState.brandTitle;

    const coupleNames = document.getElementById('couple-names');
    if (coupleNames && originalState.coupleNames) coupleNames.innerHTML = originalState.coupleNames;

    const introSection = document.getElementById('intro-section');
    if (introSection) {
      const h2 = introSection.querySelector('h2');
      if (h2 && originalState.introTitle) h2.innerHTML = originalState.introTitle;
      const p = introSection.querySelector('p.text-rose-500');
      if (p && originalState.introSubtitle) p.innerHTML = originalState.introSubtitle;
    }

    const heroSince = document.querySelector('section.text-center span.tracking-widest');
    if (heroSince && originalState.heroSince) heroSince.innerHTML = originalState.heroSince;

    const progressContainer = document.querySelector('div.max-w-md.mx-auto.bg-white\\/60');
    if (progressContainer) {
      const spans = progressContainer.querySelectorAll('div.flex.justify-between span');
      if (spans.length >= 3) {
        if (originalState.milestoneFirst) spans[0].innerHTML = originalState.milestoneFirst;
        if (originalState.milestoneLast) spans[2].innerHTML = originalState.milestoneLast;
      }
    }

    const letterEntryH3 = document.querySelector('section.bg-white\\/70 h3');
    if (letterEntryH3 && originalState.letterEntryDesc) letterEntryH3.innerHTML = originalState.letterEntryDesc;

    const openLetterBtn = document.getElementById('open-letter-btn');
    if (openLetterBtn && originalState.letterEntryBtn) openLetterBtn.innerHTML = originalState.letterEntryBtn;

    const letterTitle = document.getElementById('letter-title');
    if (letterTitle && originalState.letterTitle) letterTitle.innerHTML = originalState.letterTitle;

    const letterSubtitle = document.getElementById('letter-subtitle');
    if (letterSubtitle && originalState.letterSubtitle) letterSubtitle.innerHTML = originalState.letterSubtitle;

    const letterSign = document.getElementById('letter-sign');
    if (letterSign && originalState.letterSign) letterSign.innerHTML = originalState.letterSign;

    const letterDate = document.getElementById('letter-date');
    if (letterDate && originalState.letterDate) letterDate.innerHTML = originalState.letterDate;

    const letterContent = document.getElementById('letter-content');
    if (letterContent && originalState.letterParagraphs.length > 0) {
      const ps = letterContent.querySelectorAll('p');
      ps.forEach((p, idx) => {
        if (originalState.letterParagraphs[idx]) {
          p.innerHTML = originalState.letterParagraphs[idx];
        }
      });
    }

    const footerDiv = document.querySelector('footer div.flex');
    if (footerDiv) {
      const span = footerDiv.querySelector('span');
      if (span && originalState.footerMade) span.innerHTML = originalState.footerMade;
    }
    const footerP = document.querySelector('footer p.text-\\[11px\\]');
    if (footerP && originalState.footerSub) footerP.innerHTML = originalState.footerSub;

    if (window.lucide) window.lucide.createIcons();
  }

  window.togglePrivacyMode = function(forceState) {
    if (typeof forceState === 'boolean') {
      window.isPrivacyMode = forceState;
    } else {
      window.isPrivacyMode = !window.isPrivacyMode;
    }

    localStorage.setItem('privacy_mode', window.isPrivacyMode ? 'true' : 'false');

    const toggleBtn = document.getElementById('privacy-toggle-btn');
    const toggleText = document.getElementById('privacy-toggle-text');

    if (window.isPrivacyMode) {
      applyPrivacyMode();
      if (toggleBtn) {
        toggleBtn.classList.remove('bg-amber-50', 'text-amber-700', 'border-amber-200');
        toggleBtn.classList.add('bg-amber-500', 'text-white', 'border-amber-600', 'shadow-md');
      }
      if (toggleText) toggleText.textContent = '🔒 付費解鎖模式中';
    } else {
      removePrivacyMode();
      if (toggleBtn) {
        toggleBtn.classList.remove('bg-amber-500', 'text-white', 'border-amber-600', 'shadow-md');
        toggleBtn.classList.add('bg-amber-50', 'text-amber-700', 'border-amber-200');
      }
      if (toggleText) toggleText.textContent = '🔒 付費解鎖模式';
    }
  };

  window.initPrivacyMode = function() {
    createPaywallModal();

    // 檢查 URL 參數 (?privacy=1 或 ?vip=1 或 ?pay=1) 或 LocalStorage
    const urlParams = new URLSearchParams(window.location.search);
    const hasUrlParam = urlParams.has('privacy') || urlParams.has('vip') || urlParams.has('pay') || urlParams.has('lock');
    const savedState = localStorage.getItem('privacy_mode') === 'true';

    const shouldEnable = hasUrlParam || savedState;

    const toggleBtn = document.getElementById('privacy-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        window.togglePrivacyMode();
      });
    }

    if (shouldEnable) {
      window.togglePrivacyMode(true);
    }
  };
})();
