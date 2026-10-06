(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');

  function setMenu(open){
    if(!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  setMenu(false);

  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if(e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if(innerWidth > 980) setMenu(false); }, {passive:true});

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12});
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const glow = document.querySelector('.cursor-glow');
  addEventListener('mousemove', e => {
    if(!glow || innerWidth < 981) return;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, {passive:true});


  // V20 pricing carousel
  const rateLab = document.querySelector('.rate-lab');
  if(rateLab){
    const rateData = [
      {label:'1 CLASS TRIAL',title:'1 Class Trial',word:'TRIAL',price:'$50',desc:'Try a session and experience the training before choosing a package.',cta:'BOOK TRIAL',link:'https://wa.me/6581705022?text=Hi%20Romulas%2C%20I%20came%20from%20your%20Muay%20Thai%20%26%20Boxing%20page.%20I%20would%20like%20to%20book%20the%201%20Class%20Trial%20at%20%2450.%20My%20preferred%20day/time%20is%3A%20'},
      {label:'1 CLASS',title:'1 Class',word:'1 CLASS',price:'$120',desc:'A focused one-on-one personal training session built around your current level and goal.',cta:'BOOK SESSION',link:'https://wa.me/6581705022?text=Hi%20Romulas%2C%20I%20came%20from%20your%20Muay%20Thai%20%26%20Boxing%20page.%20I%20would%20like%20to%20enquire%20about%20the%201%20Class%20session%20at%20%24120.%20My%20preferred%20day/time%20is%3A%20'},
      {label:'10 CLASSES PACK',title:'10 Classes Pack',word:'10 PACK',price:'$950',desc:'Build consistency, sharpen technique and make steady progress across structured sessions.',cta:'ENQUIRE PACK',link:'https://wa.me/6581705022?text=Hi%20Romulas%2C%20I%20came%20from%20your%20Muay%20Thai%20%26%20Boxing%20page.%20I%20would%20like%20to%20enquire%20about%20the%2010%20Classes%20Pack%20at%20%24950.%20My%20goal%20is%3A%20'},
      {label:'20 CLASSES PACK',title:'20 Classes Pack',word:'20 PACK',price:'$1800',desc:'Commit to long-term progress with more time to build conditioning, confidence and stronger fundamentals.',cta:'ENQUIRE PACK',link:'https://wa.me/6581705022?text=Hi%20Romulas%2C%20I%20came%20from%20your%20Muay%20Thai%20%26%20Boxing%20page.%20I%20would%20like%20to%20enquire%20about%20the%2020%20Classes%20Pack%20at%20%241800.%20My%20goal%20is%3A%20'}
    ];
    const figures=[...rateLab.querySelectorAll('[data-rate-figure]')];
    const tabs=[...rateLab.querySelectorAll('[data-rate-tab]')];
    const title=rateLab.querySelector('[data-rate-title]');
    const label=rateLab.querySelector('[data-rate-label]');
    const word=rateLab.querySelector('[data-rate-word]');
    const price=rateLab.querySelector('[data-rate-price]');
    const desc=rateLab.querySelector('[data-rate-desc]');
    const counter=rateLab.querySelector('[data-rate-counter]');
    const cta=rateLab.querySelector('[data-rate-cta]');
    const links=[...rateLab.querySelectorAll('[data-rate-link]')];
    const prev=rateLab.querySelector('[data-rate-prev]');
    const next=rateLab.querySelector('[data-rate-next]');
    let current=0; let touchStartX=null;
    const wrap=n=>(n+rateData.length)%rateData.length;
    const positionFor=i=>{
      const delta=(i-current+rateData.length)%rateData.length;
      if(delta===0)return 'active';
      if(delta===1)return 'next';
      if(delta===rateData.length-1)return 'prev';
      return i<current?'hidden-left':'hidden-right';
    };
    function render(index,animate=true){
      current=wrap(index); const data=rateData[current];
      if(animate)rateLab.classList.add('is-changing');
      setTimeout(()=>{
        rateLab.dataset.rateIndex=String(current); title.textContent=data.title; label.textContent=data.label; word.textContent=data.word; price.textContent=data.price; desc.textContent=data.desc; counter.textContent=String(current+1).padStart(2,'0'); cta.textContent=data.cta; links.forEach(link=>link.href=data.link);
        figures.forEach((figure,i)=>{figure.dataset.pos=positionFor(i);figure.setAttribute('aria-hidden',i===current?'false':'true');});
        tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===current);tab.setAttribute('aria-selected',i===current?'true':'false');});
        rateLab.classList.remove('is-changing');
      },animate?150:0);
    }
    prev?.addEventListener('click',()=>render(current-1));
    next?.addEventListener('click',()=>render(current+1));
    tabs.forEach(tab=>tab.addEventListener('click',()=>render(Number(tab.dataset.rateTab))));
    rateLab.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')render(current-1);if(e.key==='ArrowRight')render(current+1);});
    rateLab.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0]?.clientX??null;},{passive:true});
    rateLab.addEventListener('touchend',e=>{if(touchStartX==null)return;const endX=e.changedTouches[0]?.clientX??touchStartX;const delta=endX-touchStartX;touchStartX=null;if(Math.abs(delta)<45)return;render(delta>0?current-1:current+1);},{passive:true});
    render(0,false);
  }

})();
