(() => {
  const video = document.querySelector('.hero-video');
  const hero = document.querySelector('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Robust GitHub Pages video playback.
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
    setTimeout(() => { if (video.readyState < 2) tryPlay(); }, 1800);
  }

  // Animated mobile menu, including staggered links and delayed hide on exit.
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  let menuTimer;

  function setMenu(open){
    if(!toggle || !menu) return;
    clearTimeout(menuTimer);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);

    if(open){
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
    }else{
      menu.classList.remove('is-open');
      menuTimer = setTimeout(() => { menu.hidden = true; }, reduceMotion ? 0 : 320);
    }
  }

  setMenu(false);
  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if(innerWidth > 1050) setMenu(false); }, {passive:true});

  // Build the hero title as individual characters with deliberate sequence timings.
  document.querySelectorAll('[data-stagger]').forEach((line, lineIndex) => {
    const text = line.dataset.stagger || '';
    line.innerHTML = '';
    [...text].forEach((ch, index) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      const base = lineIndex === 0 ? 430 : 1080;
      span.style.transitionDelay = `${base + index * 70}ms`;
      line.appendChild(span);
    });
  });

  // Start hero choreography only after first paint.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero?.classList.add('hero-enter'));
  });

  // Subtle desktop pointer parallax after the main sequence has settled.
  if(hero && !reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches){
    let raf = 0;
    const updateParallax = (e) => {
      const r = hero.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - .5) * 2;
      const ny = ((e.clientY - r.top) / r.height - .5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        hero.style.setProperty('--parallax-x', `${nx * -8}px`);
        hero.style.setProperty('--parallax-y', `${ny * -5}px`);
        hero.style.setProperty('--copy-x', `${nx * 3}px`);
        hero.style.setProperty('--copy-y', `${ny * 2}px`);
      });
    };
    hero.addEventListener('pointermove', updateParallax, {passive:true});
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--parallax-x','0px');
      hero.style.setProperty('--parallax-y','0px');
      hero.style.setProperty('--copy-x','0px');
      hero.style.setProperty('--copy-y','0px');
    });
  }

  // Scroll-triggered reveals for the case studies below the hero.
  const reveals = document.querySelectorAll('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -5% 0px'});
    reveals.forEach(el => io.observe(el));
  }
})();
