(() => {
  const burger=document.querySelector('.burger');
  const menu=document.querySelector('.mobile-menu');
  function setMenu(open){if(!burger||!menu)return;burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''}
  burger?.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>850)setMenu(false)},{passive:true});
  const items=document.querySelectorAll('.reveal');
  if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('visible'));
})();