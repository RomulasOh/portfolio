(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');

  function setMenu(open){
    if(!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  }

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if(innerWidth > 980) setMenu(false); }, {passive:true});

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const glow = document.querySelector('.cursor-glow');
  addEventListener('mousemove', e => {
    if(!glow || innerWidth < 981) return;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});
})();