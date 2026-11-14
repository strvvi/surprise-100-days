/**
 * 沉浸式 IG 限時動態播放器 (Story Viewer)
 * 支援【照片 .jpg / .png / .svg】與【影片 .mp4 / .mov / .webm】
 */
let currentStoryIndex = 0;
let storyTimer = null;
let storyProgress = 0;
let isPaused = false;
const DEFAULT_IMAGE_DURATION = 5000;
const STEP_INTERVAL = 50;

function initStoryViewer() {
  const modal = document.getElementById('story-modal');
  const closeBtn = document.getElementById('close-story-btn');
  const storyImage = document.getElementById('story-image');
  const storyVideo = document.getElementById('story-video');
  const storyDate = document.getElementById('story-date');
  const storyLocation = document.getElementById('story-location');
  const storyCaption = document.getElementById('story-caption');
  const storyLikes = document.getElementById('story-likes');
  const storyAvatar = document.getElementById('story-avatar');
  const progressBarContainer = document.getElementById('story-progress-container');
  const touchAreaLeft = document.getElementById('story-nav-left');
  const touchAreaRight = document.getElementById('story-nav-right');
  const heartBtn = document.getElementById('story-heart-btn');
  const videoSoundToggle = document.getElementById('story-sound-toggle');

  if (!modal) return;

  function buildProgressBars() {
    progressBarContainer.innerHTML = '';
    CONFIG.stories.forEach((_, idx) => {
      const bar = document.createElement('div');
      bar.className = 'story-progress-bar';
      const fill = document.createElement('div');
      fill.className = 'story-progress-fill';
      fill.id = `story-fill-${idx}`;
      bar.appendChild(fill);
      progressBarContainer.appendChild(bar);
    });
  }

  window.openStory = function(index = 0) {
    currentStoryIndex = index;
    buildProgressBars();
    modal.classList.remove('hidden');
    loadStory(currentStoryIndex);
  };

  function checkIsVideo(story) {
    const mediaUrl = story.media || story.image || '';
    return story.type === 'video' || /\.(mp4|mov|webm)$/i.test(mediaUrl);
  }

  function loadStory(idx) {
    if (idx < 0) idx = 0;
    if (idx >= CONFIG.stories.length) {
      closeStoryModal();
      return;
    }
    currentStoryIndex = idx;
    const story = CONFIG.stories[idx];
    const isVideo = checkIsVideo(story);
    const mediaUrl = story.media || story.image;

    storyDate.textContent = story.date;
    storyLocation.textContent = story.location;
    storyCaption.textContent = story.caption;
    storyLikes.textContent = story.likes;
    if (storyAvatar && story.avatar) storyAvatar.src = story.avatar;

    // 更新進度條狀態
    CONFIG.stories.forEach((_, i) => {
      const fill = document.getElementById(`story-fill-${i}`);
      if (!fill) return;
      if (i < idx) {
        fill.style.width = '100%';
        fill.classList.add('completed');
      } else if (i > idx) {
        fill.style.width = '0%';
        fill.classList.remove('completed');
      } else {
        fill.style.width = '0%';
        fill.classList.remove('completed');
      }
    });

    clearInterval(storyTimer);
    storyProgress = 0;
    isPaused = false;

    if (isVideo && storyVideo) {
      storyImage.classList.add('hidden');
      storyVideo.classList.remove('hidden');
      if (videoSoundToggle) videoSoundToggle.classList.remove('hidden');

      // 播放影片時，暫停背景 BGM 以免聲音衝突
      if (window.bgmAudio && !window.bgmAudio.paused) {
        window.bgmAudio.pause();
      }

      storyVideo.src = mediaUrl;
      storyVideo.currentTime = 0;
      storyVideo.muted = false;
      storyVideo.play().catch(() => {
        storyVideo.muted = true;
        storyVideo.play();
      });

      storyVideo.ontimeupdate = () => {
        if (!storyVideo.duration) return;
        const pct = (storyVideo.currentTime / storyVideo.duration) * 100;
        const currentFill = document.getElementById(`story-fill-${currentStoryIndex}`);
        if (currentFill) currentFill.style.width = `${Math.min(100, pct)}%`;
      };

      storyVideo.onended = () => {
        loadStory(currentStoryIndex + 1);
      };

    } else {
      if (storyVideo) {
        storyVideo.pause();
        storyVideo.classList.add('hidden');
      }
      if (videoSoundToggle) videoSoundToggle.classList.add('hidden');
      storyImage.classList.remove('hidden');
      storyImage.src = mediaUrl;

      // 若背景音樂開啟中，切回照片時恢復 BGM
      if (window.isAudioPlaying && window.bgmAudio && window.bgmAudio.paused) {
        window.bgmAudio.play().catch(() => {});
      }

      storyTimer = setInterval(() => {
        if (isPaused) return;

        storyProgress += (STEP_INTERVAL / DEFAULT_IMAGE_DURATION) * 100;
        const currentFill = document.getElementById(`story-fill-${currentStoryIndex}`);
        if (currentFill) {
          currentFill.style.width = `${Math.min(100, storyProgress)}%`;
        }

        if (storyProgress >= 100) {
          clearInterval(storyTimer);
          loadStory(currentStoryIndex + 1);
        }
      }, STEP_INTERVAL);
    }
  }

  function closeStoryModal() {
    clearInterval(storyTimer);
    if (storyVideo) {
      storyVideo.pause();
      storyVideo.currentTime = 0;
    }
    // 關閉限動時恢復背景音樂
    if (window.isAudioPlaying && window.bgmAudio && window.bgmAudio.paused) {
      window.bgmAudio.play().catch(() => {});
    }
    modal.classList.add('hidden');
  }

  touchAreaLeft.addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      loadStory(currentStoryIndex - 1);
    } else {
      loadStory(0);
    }
  });

  touchAreaRight.addEventListener('click', (e) => {
    e.stopPropagation();
    loadStory(currentStoryIndex + 1);
  });

  const storyContainer = document.getElementById('story-main-frame');
  if (storyContainer) {
    const handlePause = () => {
      isPaused = true;
      if (storyVideo && !storyVideo.classList.contains('hidden')) {
        storyVideo.pause();
      }
    };
    const handleResume = () => {
      isPaused = false;
      if (storyVideo && !storyVideo.classList.contains('hidden')) {
        storyVideo.play();
      }
    };

    storyContainer.addEventListener('mousedown', handlePause);
    storyContainer.addEventListener('mouseup', handleResume);
    storyContainer.addEventListener('touchstart', handlePause, { passive: true });
    storyContainer.addEventListener('touchend', handleResume);
  }

  if (videoSoundToggle) {
    videoSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!storyVideo) return;
      storyVideo.muted = !storyVideo.muted;
      videoSoundToggle.innerHTML = storyVideo.muted 
        ? '<i data-lucide="volume-x" class="w-4 h-4"></i>' 
        : '<i data-lucide="volume-2" class="w-4 h-4"></i>';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (heartBtn) {
    heartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      createFloatingHeart();
    });
  }

  function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart text-2xl select-none';
    const icons = ['❤️', '💖', '💕', '🥰', '✨'];
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    
    const offset = (Math.random() - 0.5) * 80;
    heart.style.left = `calc(50% + ${offset}px)`;
    heart.style.bottom = '75px';

    const container = document.getElementById('story-main-frame');
    if (container) {
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }
  }

  closeBtn.addEventListener('click', closeStoryModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeStoryModal();
    }
  });
}
