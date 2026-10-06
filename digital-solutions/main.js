(() => {
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.mobile-overlay');
  const menu = document.querySelector('.mobile-menu');
  const menuLinks = menu ? [...menu.querySelectorAll('a')] : [];

  function setMenu(open){
    if(!burger || !overlay || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.hidden = !open;
    menu.hidden = !open;
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  // Always start closed, including after mobile browser back/forward cache.
  setMenu(false);

  burger?.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));
  overlay?.addEventListener('click',()=>setMenu(false));
  menuLinks.forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>720)setMenu(false)},{passive:true});
  addEventListener('pageshow',()=>setMenu(false));

  // Subtle binary/data stream over hero
  const binary = document.getElementById('binary-overlay');
  const chars = ['0','1','8','S','{','}','/'];
  function makeBinary(){
    if(!binary) return;
    const cols = Math.max(34, Math.floor(innerWidth / 22));
    const rows = Math.max(18, Math.floor(innerHeight / 28));
    let out = '';
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        out += Math.random()>.68 ? chars[Math.floor(Math.random()*chars.length)] : ' ';
      }
      out += '\\n';
    }
    binary.textContent = out;
  }
  makeBinary();
  let binaryTimer = setInterval(makeBinary, 850);
  addEventListener('resize',makeBinary,{passive:true});

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },{threshold:.12});
    revealEls.forEach(el=>io.observe(el));
  }else{
    revealEls.forEach(el=>el.classList.add('visible'));
  }

  // Terminal type line
  const line = document.getElementById('type-line');
  const text = 'build --around-business --remove-friction --ship';
  let started = false;
  function typeCommand(){
    if(started || !line) return;
    started = true;
    let i = 0;
    const tick = ()=>{
      line.textContent = text.slice(0,i++);
      if(i <= text.length) setTimeout(tick,38);
    };
    tick();
  }
  const terminal = document.querySelector('.terminal-window');
  if('IntersectionObserver' in window && terminal){
    const tio = new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){
        typeCommand();
        tio.disconnect();
      }
    },{threshold:.3});
    tio.observe(terminal);
  }else{
    typeCommand();
  }
})();