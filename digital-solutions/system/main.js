(() => {
  const videos = [...document.querySelectorAll('.bg-video')];
  const switches = [...document.querySelectorAll('.switch')];
  let activeVideo = 0;
  let transitioning = false;

  function setVideo(index){
    if(index === activeVideo || transitioning || !videos[index]) return;
    transitioning = true;
    videos[activeVideo]?.classList.remove('active');
    switches[activeVideo]?.classList.remove('active');
    activeVideo = index;
    videos[activeVideo].classList.add('active');
    switches[activeVideo]?.classList.add('active');
    setTimeout(()=>{ transitioning = false; },1000);
  }
  switches.forEach(btn=>{
    btn.addEventListener('click',()=>setVideo(Number(btn.dataset.video)));
  });

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-overlay');
  const menu = document.querySelector('.mobile-menu');
  const links = menu ? [...menu.querySelectorAll('a')] : [];

  function setMenu(open){
    if(!toggle || !overlay || !menu) return;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open ? 'Close menu' : 'Open menu');
    overlay.hidden = !open;
    menu.hidden = !open;
    document.body.classList.toggle('menu-open',open);
  }
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  overlay?.addEventListener('click',()=>setMenu(false));
  links.forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{ if(e.key==='Escape') setMenu(false); });
  addEventListener('resize',()=>{ if(innerWidth>720) setMenu(false); },{passive:true});

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.11});
    items.forEach(el=>observer.observe(el));
  }else{
    items.forEach(el=>el.classList.add('visible'));
  }
})();