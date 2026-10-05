(() => {
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.mobile-overlay');
  const menu = document.querySelector('.mobile-menu');
  const menuLinks = menu ? [...menu.querySelectorAll('a')] : [];

  function setMenu(open) {
    if (!burger || !overlay || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.hidden = !open;
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  burger?.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  overlay?.addEventListener('click', () => setMenu(false));
  menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 720) setMenu(false); }, { passive:true });

  const values = [...document.querySelectorAll('.stat-value[data-target]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;
  const render = (el, v) => el.textContent = String(Math.round(v)).padStart(2,'0');
  function runCounters(){
    if(started) return; started = true;
    values.forEach((el,i)=>{
      const target = Number(el.dataset.target||0);
      if(reduced){render(el,target);return;}
      const duration=1500+i*80, delay=480+i*90;
      setTimeout(()=>{
        const start=performance.now();
        function tick(now){
          const t=Math.min(1,(now-start)/duration);
          const eased=1-Math.pow(1-t,3);
          render(el,target*eased);
          if(t<1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },delay);
    });
  }
  const stats=document.querySelector('.stats');
  if('IntersectionObserver' in window && stats){
    const ob=new IntersectionObserver(entries=>{
      if(entries.some(x=>x.isIntersecting)){runCounters();ob.disconnect();}
    },{threshold:.25});
    ob.observe(stats);
  }else{runCounters();}
})();