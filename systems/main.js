(() => {
  const appears=[...document.querySelectorAll('.appear')];
  appears.forEach(el=>el.addEventListener('animationend',()=>el.classList.add('is-in'),{once:true}));
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    appears.forEach(el=>{const a=el.getAnimations?.()||[];if(!a.some(x=>x.playState==='running'||x.playState==='finished'))el.classList.add('is-in')});
  }));
  const burger=document.getElementById('burger'),menu=document.getElementById('menu');
  function setMenu(open){document.body.classList.toggle('menu-open',open);burger?.setAttribute('aria-expanded',String(open));burger?.setAttribute('aria-label',open?'Close menu':'Open menu');menu?.setAttribute('aria-hidden',String(!open));}
  burger?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
  document.querySelectorAll('#menu a,#site-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>=901)setMenu(false)},{passive:true});
})();