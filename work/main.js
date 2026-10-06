(() => {
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

  // Optional local video: page still works cleanly if the MP4 has not been supplied yet.
  const video = document.querySelector('.hero-video');
  video?.addEventListener('error', () => video.classList.add('video-error'));
  video?.querySelector('source')?.addEventListener('error', () => video.classList.add('video-error'));

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