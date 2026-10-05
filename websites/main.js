(() => {
  // ----------------------------------------------------------
  // Mouse-scrub hero video
  // ----------------------------------------------------------
  const video = document.getElementById('scrub-video');
  const SENSITIVITY = 0.8;
  let prevX = null;
  let targetTime = 0;
  let seeking = false;
  let duration = 0;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function seekToTarget() {
    if (!video || !duration || seeking) return;
    const next = clamp(targetTime, 0, Math.max(0, duration - 0.03));
    if (Math.abs(video.currentTime - next) < 0.015) return;
    seeking = true;
    try { video.currentTime = next; } catch (_) { seeking = false; }
  }

  video?.addEventListener('loadedmetadata', () => {
    duration = Number.isFinite(video.duration) ? video.duration : 0;
    targetTime = duration ? duration * 0.18 : 0;
    seekToTarget();
  });

  video?.addEventListener('seeked', () => {
    seeking = false;
    if (Math.abs(video.currentTime - targetTime) > 0.015) seekToTarget();
  });

  addEventListener('mousemove', (event) => {
    if (!video || !duration || innerWidth < 901) return;
    if (prevX == null) {
      prevX = event.clientX;
      return;
    }
    const delta = event.clientX - prevX;
    prevX = event.clientX;
    targetTime = clamp(
      targetTime + (delta / innerWidth) * SENSITIVITY * duration,
      0,
      Math.max(0, duration - 0.03)
    );
    seekToTarget();
  }, { passive: true });

  addEventListener('mouseleave', () => { prevX = null; });

  // Mobile: use a subtle slow loop because there is no mouse.
  if (video && matchMedia('(max-width: 900px)').matches) {
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {});
  }

  // ----------------------------------------------------------
  // Typewriter
  // ----------------------------------------------------------
  const text = "Good websites get attention. Better websites explain the business, earn trust and make the next step obvious. What are we building?";
  const target = document.getElementById('typewriter');
  const cursor = document.getElementById('type-cursor');
  let index = 0;

  setTimeout(() => {
    const timer = setInterval(() => {
      if (!target) return clearInterval(timer);
      target.textContent = text.slice(0, index++);
      if (index > text.length) {
        clearInterval(timer);
        cursor?.classList.add('done');
      }
    }, 28);
  }, 500);

  // Independent hero action entrance
  setTimeout(() => {
    document.getElementById('hero-actions')?.classList.add('visible');
  }, 400);

  // ----------------------------------------------------------
  // Mobile menu
  // ----------------------------------------------------------
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); }, { passive: true });

  // ----------------------------------------------------------
  // Reveal sections
  // ----------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
})();