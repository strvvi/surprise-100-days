/**
 * 主流程控制、浪漫音樂播放器與情書互動
 */
let bgmAudio = null;
let isAudioPlaying = false;
let webAudioCtx = null;
let synthTimer = null;

// Web Audio API: Taylor Swift - Love Story 浪漫八音盒/鋼琴旋律合成器
function initWebAudioSynth() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    webAudioCtx = new AudioContext();

    // Taylor Swift - Love Story 經典旋律音符與時長 (D大調 / C大調浪漫八音盒)
    // "We were both young when I first saw you..."
    // "Romeo take me somewhere we can be alone... It's a love story baby just say yes"
    const notes = [
      // Intro / Verse
      { f: 261.63, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 523.25, d: 0.8 },
      { f: 392.00, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 293.66, d: 0.8 },
      { f: 261.63, d: 0.4 }, { f: 329.63, d: 0.4 }, { f: 392.00, d: 0.4 }, { f: 440.00, d: 0.8 },
      { f: 392.00, d: 0.4 }, { f: 349.23, d: 0.4 }, { f: 329.63, d: 0.8 },
      
      // "Romeo, take me somewhere we can be alone"
      { f: 392.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 523.25, d: 0.7 },
      { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 493.88, d: 0.35 }, { f: 440.00, d: 0.7 },
      
      // "I'll be waiting, all there's left to do is run"
      { f: 440.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 493.88, d: 0.35 }, { f: 523.25, d: 0.7 },
      { f: 392.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 392.00, d: 0.35 }, { f: 329.63, d: 0.35 }, { f: 293.66, d: 0.8 },
      
      // "You'll be the prince and I'll be the princess"
      { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 493.88, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 392.00, d: 0.7 },
      
      // "It's a love story, baby, just say YES"
      { f: 329.63, d: 0.35 }, { f: 349.23, d: 0.35 }, { f: 392.00, d: 0.5 }, { f: 392.00, d: 0.35 }, { f: 440.00, d: 0.35 }, { f: 392.00, d: 0.35 },
      { f: 523.25, d: 0.6 }, { f: 587.33, d: 0.6 }, { f: 523.25, d: 1.4 }
    ];

    let noteIdx = 0;

    function playNextNote() {
      if (!isAudioPlaying || !webAudioCtx) return;
      if (webAudioCtx.state === 'suspended') {
        webAudioCtx.resume();
      }

      const note = notes[noteIdx];
      const now = webAudioCtx.currentTime;

      // 主旋律振盪器 (甜美柔和正弦波八音盒質感)
      const osc = webAudioCtx.createOscillator();
      const gain = webAudioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now);

      // 八音盒清脆擊弦包絡
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d * 1.5);

      osc.connect(gain);
      gain.connect(webAudioCtx.destination);

      osc.start(now);
      osc.stop(now + note.d * 1.6);

      // 低音柔和泛音伴奏 (每四拍一聲)
      if (noteIdx % 4 === 0) {
        const bassOsc = webAudioCtx.createOscillator();
        const bassGain = webAudioCtx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(note.f / 2, now);
        bassGain.gain.setValueAtTime(0.03, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        bassOsc.connect(bassGain);
        bassGain.connect(webAudioCtx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 1.3);
      }

      noteIdx = (noteIdx + 1) % notes.length;
      synthTimer = setTimeout(playNextNote, note.d * 1000);
    }

    playNextNote();
  } catch (e) {
    console.log('Web Audio Synth unavailable:', e);
  }
}

window.playRomanticBGM = function() {
  const vinylRecord = document.getElementById('vinyl-record');
  const bgmStatusText = document.getElementById('bgm-status-text');

  if (!bgmAudio) {
    bgmAudio = new Audio(CONFIG.bgmPath);
    bgmAudio.loop = true;
  }

  bgmAudio.play()
    .then(() => {
      isAudioPlaying = true;
      if (vinylRecord) vinylRecord.classList.remove('vinyl-paused');
      if (bgmStatusText) bgmStatusText.textContent = "Taylor Swift - Love Story 🎵";
    })
    .catch(() => {
      isAudioPlaying = true;
      if (!webAudioCtx) initWebAudioSynth();
      if (vinylRecord) vinylRecord.classList.remove('vinyl-paused');
      if (bgmStatusText) bgmStatusText.textContent = "Taylor Swift - Love Story 🎵";
    });
};

window.toggleRomanticBGM = function() {
  const vinylRecord = document.getElementById('vinyl-record');
  const bgmStatusText = document.getElementById('bgm-status-text');

  if (isAudioPlaying) {
    isAudioPlaying = false;
    if (bgmAudio) bgmAudio.pause();
    if (vinylRecord) vinylRecord.classList.add('vinyl-paused');
    if (bgmStatusText) bgmStatusText.textContent = "已暫停音樂";
  } else {
    window.playRomanticBGM();
  }
};

// 渲染拍立得回憶牆
function renderPolaroids() {
  const gallery = document.getElementById('polaroid-gallery');
  if (!gallery) return;

  gallery.innerHTML = '';
  CONFIG.polaroids.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card flex flex-col items-center relative';
    card.style.transform = `rotate(${item.rotate})`;

    const mediaSrc = item.media || item.image;
    const isVideo = /\.(mp4|mov|webm)$/i.test(mediaSrc);
    // 對應的縮圖路徑（若為影片，優先使用生成的快速縮圖）
    const filename = mediaSrc.split('/').pop();
    const thumbSrc = `thumbnails/${filename}.png`;

    card.innerHTML = `
      <div class="w-full aspect-[4/5] bg-rose-50 overflow-hidden rounded mb-3 relative flex items-center justify-center">
        ${isVideo 
          ? `<img src="${thumbSrc}" onerror="this.onerror=null; this.src='photos/avatar.svg';" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
             <div class="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors flex items-center justify-center">
               <div class="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow flex items-center justify-center text-rose-500 hover:scale-110 transition-transform">
                 <i data-lucide="play" class="w-5 h-5 ml-0.5 fill-rose-500"></i>
               </div>
             </div>
             <div class="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur text-white text-[10px] rounded-full flex items-center gap-1">
               <i data-lucide="video" class="w-3 h-3 text-rose-300"></i> 限動
             </div>`
          : `<img src="${mediaSrc}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />`
        }
      </div>
      <p class="font-handwriting text-xl text-gray-700 tracking-wide">${item.title}</p>
      <span class="text-xs text-rose-400 mt-1">${item.date}</span>
    `;

    card.addEventListener('click', () => {
      if (window.openStory) {
        // 找到在 stories 中的對應索引
        const storyIdx = CONFIG.stories.findIndex(s => s.media === mediaSrc);
        window.openStory(storyIdx >= 0 ? storyIdx : index);
      }
    });

    gallery.appendChild(card);
  });
}

// 渲染第 100 天手寫情書
function initLoveLetter() {
  const openBtn = document.getElementById('open-letter-btn');
  const closeBtn = document.getElementById('close-letter-btn');
  const modal = document.getElementById('letter-modal');
  const contentEl = document.getElementById('letter-content');
  const titleEl = document.getElementById('letter-title');
  const subtitleEl = document.getElementById('letter-subtitle');
  const signEl = document.getElementById('letter-sign');
  const dateEl = document.getElementById('letter-date');

  if (!modal) return;

  titleEl.textContent = CONFIG.loveLetter.title;
  subtitleEl.textContent = CONFIG.loveLetter.subtitle;
  signEl.textContent = CONFIG.loveLetter.sign;
  dateEl.textContent = CONFIG.loveLetter.date;

  contentEl.innerHTML = '';
  CONFIG.loveLetter.content.forEach((paragraph) => {
    const p = document.createElement('p');
    p.className = 'mb-4 text-gray-700 leading-relaxed font-light';
    p.textContent = paragraph;
    contentEl.appendChild(p);
  });

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 }
        });
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const coupleNamesEl = document.getElementById('couple-names');
  const heroQuoteEl = document.getElementById('hero-quote');
  if (coupleNamesEl) coupleNamesEl.textContent = `${CONFIG.boyName} & ${CONFIG.girlName}`;
  if (heroQuoteEl) heroQuoteEl.textContent = CONFIG.quote;

  initEnvelope();
  initDayCounter();
  initStoryViewer();
  initScratchCards();
  initLoveLetter();
  renderPolaroids();
  if (window.initHeartWhispers) initHeartWhispers();
  if (window.initCoupleQuiz) initCoupleQuiz();
  if (window.initNightMode) initNightMode();
  if (window.initRoamingUsagi) initRoamingUsagi();

  const musicToggleBtn = document.getElementById('music-toggle-btn');
  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', window.toggleRomanticBGM);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
