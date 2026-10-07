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



  // V28 — Home mindset pinned scroll story.
  const mindsetStory = document.querySelector('.mindset-story');
  if(mindsetStory){
    const steps = [
      {
        no:'00 / FOUNDATION',
        title:'Different disciplines.<br><span>Same foundation.</span>',
        desc:'Understand the problem. Master the fundamentals. Build from something solid.'
      },
      {
        no:'01 / BUILD SYSTEMS',
        title:'Build systems<br><span>that remove friction.</span>',
        desc:'Structure the workflow. Make the process clear. Automate what should not stay manual.'
      },
      {
        no:'02 / BUILD PEOPLE',
        title:'Build people<br><span>through discipline.</span>',
        desc:'Technique. Repetition. Conditioning. Confidence. Progress comes from doing the fundamentals well.'
      },
      {
        no:'03 / SAME MINDSET',
        title:'Different work.<br><span>Same mindset.</span>',
        desc:'Understand. Structure. Execute. Improve. The method stays consistent whether the goal is a better system or a stronger person.'
      }
    ];

    const noEl = mindsetStory.querySelector('[data-mindset-no]');
    const titleEl = mindsetStory.querySelector('[data-mindset-title]');
    const descEl = mindsetStory.querySelector('[data-mindset-desc]');
    const tabs = [...mindsetStory.querySelectorAll('[data-mindset-tab]')];
    let current = -1;
    let rafId = 0;

    function setStep(step, animate=true){
      step = Math.max(0, Math.min(steps.length - 1, step));
      if(step === current) return;
      current = step;

      if(animate) mindsetStory.classList.add('is-changing');

      setTimeout(() => {
        const data = steps[step];
        noEl.textContent = data.no;
        titleEl.innerHTML = data.title;
        descEl.textContent = data.desc;
        mindsetStory.dataset.step = String(step);

        tabs.forEach((tab, i) => {
          tab.classList.toggle('active', i === step);
          tab.setAttribute('aria-current', i === step ? 'step' : 'false');
        });

        mindsetStory.classList.remove('is-changing');
      }, animate ? 150 : 0);
    }

    function updateMindsetStory(){
      rafId = 0;

      if(innerWidth <= 900){
        setStep(3, false);
        mindsetStory.style.setProperty('--mindset-progress','1');
        return;
      }

      const rect = mindsetStory.getBoundingClientRect();
      const scrollable = Math.max(1, mindsetStory.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      mindsetStory.style.setProperty('--mindset-progress', String(progress));

      const step = Math.min(3, Math.floor(progress * 4));
      setStep(step, true);
    }

    function requestMindsetUpdate(){
      if(!rafId) rafId = requestAnimationFrame(updateMindsetStory);
    }

    addEventListener('scroll', requestMindsetUpdate, {passive:true});
    addEventListener('resize', requestMindsetUpdate, {passive:true});

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        if(innerWidth <= 900){
          setStep(i, true);
          return;
        }
        const storyTop = mindsetStory.getBoundingClientRect().top + scrollY;
        const scrollable = Math.max(1, mindsetStory.offsetHeight - innerHeight);
        const target = storyTop + scrollable * (i / 3);
        scrollTo({top:target,behavior:'smooth'});
      });
    });

    setStep(0, false);
    updateMindsetStory();
  }


  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => io.observe(el));
})();
