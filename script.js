(() => {

  // V23 — Home mobile navigation.
  const homeMenuToggle = document.querySelector('.home-menu-toggle');
  const homeMenu = document.querySelector('.home-mobile-menu');
  const homeBackdrop = document.querySelector('.home-mobile-backdrop');

  function setHomeMenu(open){
    if(!homeMenuToggle || !homeMenu || !homeBackdrop) return;
    homeMenuToggle.setAttribute('aria-expanded', String(open));
    homeMenuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    homeMenu.hidden = !open;
    homeMenu.setAttribute('aria-hidden', String(!open));
    homeBackdrop.hidden = !open;
    document.body.classList.toggle('home-menu-open', open);
  }

  setHomeMenu(false);
  homeMenuToggle?.addEventListener('click', () => {
    setHomeMenu(homeMenuToggle.getAttribute('aria-expanded') !== 'true');
  });
  homeBackdrop?.addEventListener('click', () => setHomeMenu(false));
  homeMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setHomeMenu(false));
  });
  addEventListener('keydown', e => {
    if(e.key === 'Escape') setHomeMenu(false);
  });
  addEventListener('resize', () => {
    if(innerWidth > 900) setHomeMenu(false);
  }, {passive:true});

  const reveal = document.getElementById('reveal-image');
  const desktop = window.matchMedia('(min-width: 901px)');
  const pattern = document.getElementById('hero-grid-pattern');
  const mouse = { x: innerWidth * 0.72, y: innerHeight * 0.48 };
  const smooth = { ...mouse };
  const grid = { x: 0, y: 0 };
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let raf = 0;

  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
  function move(e) { mouse.x = e.clientX; mouse.y = e.clientY; }
  function frame() {
    if (desktop.matches && reveal && ctx) {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const radius = Math.round(Math.min(420, Math.max(160, innerWidth * 0.16)));
      const g = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, radius);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(.4, 'rgba(255,255,255,1)');
      g.addColorStop(.6, 'rgba(255,255,255,.75)');
      g.addColorStop(.75, 'rgba(255,255,255,.4)');
      g.addColorStop(.88, 'rgba(255,255,255,.12)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const url = `url(${canvas.toDataURL()})`;
      reveal.style.maskImage = url;
      reveal.style.webkitMaskImage = url;

      const cx = smooth.x / Math.max(1, innerWidth) - .5;
      const cy = smooth.y / Math.max(1, innerHeight) - .5;
      grid.x += (cx * 16 - grid.x) * .06;
      grid.y += (cy * 16 - grid.y) * .06;
      if (pattern) { pattern.setAttribute('x', String(grid.x)); pattern.setAttribute('y', String(grid.y)); }
    }
    raf = requestAnimationFrame(frame);
  }

  resize();
  addEventListener('resize', resize, { passive: true });
  addEventListener('mousemove', move, { passive: true });
  raf = requestAnimationFrame(frame);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => io.observe(el));
})();
