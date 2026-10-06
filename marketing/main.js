(() => {
  const slides = window.__ROMULAS_MARKETING_SLIDES__ || [];
  let index = 0;

  const label = document.getElementById('campaign-label');
  const title = document.getElementById('campaign-title');
  const desc = document.getElementById('campaign-desc');
  const cta = document.getElementById('campaign-cta');

  function render() {
    const slide = slides[index];
    if (!slide) return;

    [label, title, desc, cta].forEach((el) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.filter = 'blur(10px)';
      el.style.transform = 'translateY(12px)';
    });

    setTimeout(() => {
      if (label) label.textContent = slide.label;
      if (title) title.textContent = slide.title;
      if (desc) desc.textContent = slide.desc;
      if (cta) cta.href = slide.href;

      [label, title, desc, cta].forEach((el) => {
        if (!el) return;
        el.style.transition = 'opacity .45s, filter .45s, transform .45s';
        el.style.opacity = '1';
        el.style.filter = 'blur(0)';
        el.style.transform = 'none';
      });
    }, 180);
  }

  document.getElementById('prev')?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  document.getElementById('next')?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  const menuBtn = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-menu');

  function setMenu(open) {
    menuBtn?.setAttribute('aria-expanded', String(open));
    menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu?.classList.toggle('open', open);
    menu?.setAttribute('aria-hidden', String(!open));
  }

  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth >= 1024) setMenu(false); }, { passive: true });

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
