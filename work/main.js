(() => {

  // Robust hero-video playback for GitHub Pages.
  const video = document.querySelector('.hero-video');
  const hero = document.querySelector('.hero');

  if (video && hero) {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;

    const markReady = () => hero.classList.add('video-ready');

    video.addEventListener('loadeddata', markReady, { once: true });
    video.addEventListener('canplay', markReady, { once: true });
    video.addEventListener('playing', markReady, { once: true });

    const tryPlay = () => {
      try {
        video.load();
        const p = video.play();
        if (p && typeof p.catch === 'function') {
          p.catch(() => {
            // Some browsers need one user interaction even for muted autoplay.
            const resume = () => {
              video.play().then(markReady).catch(() => {});
              window.removeEventListener('pointerdown', resume);
              window.removeEventListener('keydown', resume);
            };
            window.addEventListener('pointerdown', resume, { once: true });
            window.addEventListener('keydown', resume, { once: true });
          });
        }
      } catch (_) {}
    };

    tryPlay();

    // Retry once after GitHub Pages/cache has had time to return the MP4.
    setTimeout(() => {
      if (video.readyState < 2) tryPlay();
    }, 1800);
  }

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');

  function setMenu(open){
    if(!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  setMenu(false);
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if(innerWidth > 1050) setMenu(false); }, {passive:true});

  // Character-stagger hero title.
  document.querySelectorAll('[data-stagger]').forEach((line, lineIndex) => {
    const text = line.dataset.stagger || '';
    line.innerHTML = '';
    [...text].forEach((ch, index) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.transitionDelay = `${lineIndex * 240 + index * 55}ms`;
      line.appendChild(span);
    });
  });

  requestAnimationFrame(() => {
    document.querySelectorAll('.stagger-line').forEach(line => line.classList.add('show'));
  });

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.1});
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();