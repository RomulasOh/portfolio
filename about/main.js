(() => {
  const burger=document.querySelector('.hamburger');
  const menu=document.querySelector('.about-menu');
  const close=document.querySelector('.menu-close');
  function setMenu(open){
    if(!burger||!menu)return;
    burger.setAttribute('aria-expanded',String(open));
    burger.setAttribute('aria-label',open?'Close menu':'Open menu');
    menu.classList.toggle('open',open);
    menu.setAttribute('aria-hidden',String(!open));
    document.body.style.overflow=open?'hidden':'';
  }
  burger?.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));
  close?.addEventListener('click',()=>setMenu(false));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>=1024)setMenu(false)},{passive:true});
  const els=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('visible'));
})();