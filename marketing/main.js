(() => {
  const posters=[...document.querySelectorAll('.poster')], reel=document.querySelector('.campaign-reel'), orbit=document.querySelector('.cursor-orbit');
  let active=0;
  function setFrame(i){i=Math.max(0,Math.min(posters.length-1,i));if(i===active)return;posters[active]?.classList.remove('active');active=i;posters[active]?.classList.add('active')}
  addEventListener('mousemove',e=>{if(innerWidth<901)return;setFrame(Math.floor((e.clientX/innerWidth)*posters.length));if(orbit){const x=(e.clientX/innerWidth-.5)*40,y=(e.clientY/innerHeight-.5)*30;orbit.style.setProperty('--mx',x+'px');orbit.style.setProperty('--my',y+'px')}},{passive:true});
  const text="Attention is easy to buy. Relevance is harder. Let's build campaigns that lead somewhere.";
  const target=document.getElementById('typewriter'),cursor=document.getElementById('type-cursor');let i=0;setTimeout(()=>{const t=setInterval(()=>{if(!target)return clearInterval(t);target.textContent=text.slice(0,i++);if(i>text.length){clearInterval(t);cursor?.classList.add('done')}},30)},520);
  setTimeout(()=>document.getElementById('hero-actions')?.classList.add('visible'),400);
  const burger=document.querySelector('.burger'),menu=document.querySelector('.mobile-menu');
  function setMenu(open){burger?.setAttribute('aria-expanded',String(open));menu?.classList.toggle('open',open);menu?.setAttribute('aria-hidden',String(!open));document.body.style.overflow=open?'hidden':''}
  burger?.addEventListener('click',()=>setMenu(burger.getAttribute('aria-expanded')!=='true'));menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});addEventListener('resize',()=>{if(innerWidth>900)setMenu(false)},{passive:true});
  const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>io.observe(x))}else items.forEach(x=>x.classList.add('visible'));
})();