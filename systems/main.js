(() => {
  const appears = [...document.querySelectorAll('.appear')];
  appears.forEach((el) => {
    el.addEventListener('animationend', () => el.classList.add('is-in'), { once: true });
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    appears.forEach((el) => {
      const animations = el.getAnimations?.() || [];
      if (!animations.some((a) => a.playState === 'running' || a.playState === 'finished')) {
        el.classList.add('is-in');
      }
    });
  }));

  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger?.setAttribute('aria-expanded', String(open));
    burger?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu?.setAttribute('aria-hidden', String(!open));
  }

  burger?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.querySelectorAll('#menu a, #site-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth >= 901) setMenu(false); }, { passive: true });

  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach((el) => el.classList.add('reveal-ready'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
})();
