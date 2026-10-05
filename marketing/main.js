(() => {
  const slides=window.__ROMULAS_MARKETING_SLIDES__||[];
  let index=0;
  const label=document.getElementById('campaign-label'),title=document.getElementById('campaign-title'),desc=document.getElementById('campaign-desc'),cta=document.getElementById('campaign-cta');
  function render(){
    const s=slides[index]; if(!s)return;
    [label,title,desc,cta].forEach(el=>{if(el){el.style.opacity='0';el.style.filter='blur(10px)';el.style.transform='translateY(12px)'}});
    setTimeout(()=>{
      label.textContent=s.label; title.textContent=s.title; desc.textContent=s.desc; cta.href=s.href;
      [label,title,desc,cta].forEach(el=>{if(el){el.style.transition='opacity .45s,filter .45s,transform .45s';el.style.opacity='1';el.style.filter='blur(0)';el.style.transform='none'}});
    },180);
  }
  document.getElementById('prev')?.addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;render()});
  document.getElementById('next')?.addEventListener('click',()=>{index=(index+1)%slides.length;render()});

  const menuBtn=document.querySelector('.menu-button'),menu=document.querySelector('.mobile-menu');
  function setMenu(open){menuBtn?.setAttribute('aria-expanded',String(open));menuBtn?.setAttribute('aria-label',open?'Close menu':'Open menu');menu?.classList.toggle('open',open);menu?.setAttribute('aria-hidden',String(!open));}
  menuBtn?.addEventListener('click',()=>setMenu(menuBtn.getAttribute('aria-expanded')!=='true'));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  addEventListener('resize',()=>{if(innerWidth>=1024)setMenu(false)},{passive:true});
})();