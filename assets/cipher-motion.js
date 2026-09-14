
/* =========================================================
   Cipher Motion Engine
   Vanilla JS: performant, dependency-free, reduced-motion aware.
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress + header depth
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.prepend(progress);

  const header = document.querySelector('.site-header, .site');
  let ticking = false;

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    progress.style.width = `${Math.min(100, Math.max(0, p * 100))}%`;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, {passive:true});
  updateScrollUI();

  if (reduceMotion) return;

  // Reveal elements as they enter the viewport.
  const revealSelectors = [
    'section > .section-head',
    '.card',
    '.price-card',
    '.report-preview',
    '.about-grid',
    '.faq-item',
    '.cta',
    '.trust-strip'
  ];

  document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
    el.classList.add(i % 4 === 0 ? 'reveal-left' : i % 4 === 1 ? 'reveal' : i % 4 === 2 ? 'reveal-right' : 'reveal-scale');
  });

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -7% 0px'});

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => revealObserver.observe(el));

  // Stagger common card groups.
  document.querySelectorAll('.grid, .cards, .pricing-grid').forEach(group => {
    const children = [...group.children];
    if (children.length >= 2 && children.length <= 8) {
      group.classList.add('stagger');
      revealObserver.observe(group);
    }
  });

  // Cursor-aware light on cards.
  document.querySelectorAll('.card,.price-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // Subtle 3D tilt for the dashboard only.
  const dashboard = document.querySelector('.hero-dashboard');
  if (dashboard && window.matchMedia('(pointer:fine)').matches) {
    dashboard.addEventListener('pointermove', e => {
      const r = dashboard.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      dashboard.style.transform =
        `perspective(1200px) rotateX(${(-y * 2.5).toFixed(2)}deg) rotateY(${(x * 3).toFixed(2)}deg) translateY(-4px)`;
    });
    dashboard.addEventListener('pointerleave', () => {
      dashboard.style.transform = '';
    });
  }

  // Count-up numbers when visible.
  const countEls = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const start = performance.now();
      const duration = 1100;
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, {threshold:.6});
  countEls.forEach(el => countObserver.observe(el));

  // Cipher Intelligence scrollytelling, if the section exists.
  const story = document.querySelector('.cipher-story');
  if (story) {
    const steps = [...story.querySelectorAll('.cipher-story__step')];
    const core = story.querySelector('.cipher-core');
    const setActive = index => {
      steps.forEach((s, i) => s.classList.toggle('is-active', i === index));
      if (core) core.style.transform = `scale(${1 + index * .045}) rotate(${index * 2}deg)`;
    };

    const storyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const rect = story.getBoundingClientRect();
        const progress = Math.min(0.999, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
      });
    }, {threshold:[0,.25,.5,.75,1]});

    storyObserver.observe(story);
    window.addEventListener('scroll', () => {
      const rect = story.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const p = Math.min(0.999, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
      }
    }, {passive:true});
  }
})();


/* --- Ultra UX layer --- */
(() => {
  const root = document.documentElement;

  // Accessible motion toggle (also available with "M").
  const motionBtn = document.createElement('button');
  motionBtn.className = 'motion-control';
  motionBtn.type = 'button';
  motionBtn.innerHTML = 'Motion <span>ON</span>';
  document.body.appendChild(motionBtn);

  const setMotion = (on) => {
    root.classList.toggle('motion-off', !on);
    motionBtn.innerHTML = `Motion <span>${on ? 'ON' : 'OFF'}</span>`;
    localStorage.setItem('cipher-motion', on ? 'on' : 'off');
  };
  setMotion(localStorage.getItem('cipher-motion') !== 'off');
  motionBtn.addEventListener('click', () => setMotion(root.classList.contains('motion-off')));

  // Back-to-top.
  const topBtn = document.createElement('button');
  topBtn.className='backtop';
  topBtn.type='button';
  topBtn.setAttribute('aria-label','Back to top');
  topBtn.textContent='↑';
  document.body.appendChild(topBtn);
  const scrollCheck=()=>topBtn.classList.toggle('show',window.scrollY>700);
  window.addEventListener('scroll',scrollCheck,{passive:true});
  scrollCheck();
  topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:root.classList.contains('motion-off')?'auto':'smooth'}));

  // Demo scan — clearly illustrative / client-side, never presented as a real scan.
  const form = document.querySelector('#demoScanForm');
  if(form){
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    const lines = [...document.querySelectorAll('.demo-status .scan-line')];
    const result = document.querySelector('.demo-result');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const value=input.value.trim() || 'github.com/example/repository';
      button.disabled=true;
      button.textContent='Simulating…';
      result?.classList.remove('show');
      lines.forEach(l=>{l.classList.remove('done','active');});
      let i=0;
      const tick=()=>{
        if(i>0){lines[i-1]?.classList.remove('active');lines[i-1]?.classList.add('done')}
        if(i<lines.length){lines[i].classList.add('active');i++;setTimeout(tick,520)}
        else{
          button.disabled=false;button.textContent='Run demo';
          if(result){
            result.classList.add('show');
            const repoName=value.replace(/^https?:\/\/(www\.)?github\.com\//,'').replace(/\/+$/,'');
            const label=document.querySelector('#demoRepoLabel');
            if(label) label.textContent=repoName;
          }
        }
      };
      tick();
    });
  }

  // Finding detail modal.
  const modal=document.querySelector('#findingModal');
  if(modal){
    const title=modal.querySelector('[data-modal-title]');
    const body=modal.querySelector('[data-modal-body]');
    const close=()=>modal.classList.remove('show');
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
    modal.querySelector('.modal-close')?.addEventListener('click',close);
    document.querySelectorAll('.finding-card').forEach(card=>{
      card.addEventListener('click',()=>{
        title.textContent=card.dataset.title || 'Finding details';
        body.innerHTML=`
          <p><strong>Why it matters</strong></p>
          <p>${card.dataset.why || 'Review the evidence and confirm the finding in the affected code or configuration.'}</p>
          <p><strong>Evidence</strong></p>
          <div class="evidence-box">${card.dataset.evidence || 'Evidence excerpt would appear here in the real report.'}</div>
          <div class="modal-actions">
            <a class="btn btn-dark" href="#scan" data-close-modal>Review scan workflow</a>
            <button class="btn btn-light" type="button" data-close-modal>Close</button>
          </div>`;
        modal.classList.add('show');
        body.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',close));
      });
    });
  }

  // Command palette: Cmd/Ctrl+K.
  const command = document.querySelector('#commandPalette');
  if(command){
    const cmdInput=command.querySelector('input');
    const items=[...command.querySelectorAll('.command-item')];
    const close=()=>command.classList.remove('show');
    const open=()=>{command.classList.add('show');cmdInput.value='';setTimeout(()=>cmdInput.focus(),0)};
    document.addEventListener('keydown',e=>{
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}
      if(e.key==='Escape') close();
      if(e.key.toLowerCase()==='m' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) setMotion(root.classList.contains('motion-off'));
    });
    command.addEventListener('click',e=>{if(e.target===command)close();});
    items.forEach(item=>item.addEventListener('click',()=>{const target=item.dataset.target;close();if(target)document.querySelector(target)?.scrollIntoView({behavior:root.classList.contains('motion-off')?'auto':'smooth',block:'start'});}));
    cmdInput.addEventListener('input',()=>{
      const q=cmdInput.value.toLowerCase();
      items.forEach(i=>i.style.display=i.textContent.toLowerCase().includes(q)?'flex':'none');
    });
  }

  // Inject command palette markup.
  const palette=document.createElement('div');
  palette.id='commandPalette'; palette.className='command';
  palette.innerHTML=`
    <div class="command-box" role="dialog" aria-modal="true" aria-label="Site command palette">
      <input class="command-input" placeholder="Jump to…  (Esc to close)" aria-label="Jump to section">
      <div class="command-list">
        <div class="command-item" data-target="#product"><span>SecurityAuditAI</span><span class="command-key">P</span></div>
        <div class="command-item" data-target="#coverage"><span>Coverage</span><span class="command-key">C</span></div>
        <div class="command-item" data-target="#scan"><span>Free scan</span><span class="command-key">S</span></div>
        <div class="command-item" data-target="#pricing"><span>Pricing</span><span class="command-key">R</span></div>
        <div class="command-item" data-target="#trust"><span>Trust & transparency</span><span class="command-key">T</span></div>
        <div class="command-item" data-target="#tutorial"><span>Tutorials</span><span class="command-key">Y</span></div>
      </div>
    </div>`;
  document.body.appendChild(palette);
  const cmdInput2=palette.querySelector('input');
  const openPalette=()=>{palette.classList.add('show');cmdInput2.value='';setTimeout(()=>cmdInput2.focus(),0)};
  const closePalette=()=>palette.classList.remove('show');
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette();}
    if(e.key==='Escape') closePalette();
  });
  palette.addEventListener('click',e=>{if(e.target===palette)closePalette();});
  palette.querySelectorAll('.command-item').forEach(item=>item.addEventListener('click',()=>{
    closePalette();document.querySelector(item.dataset.target)?.scrollIntoView({behavior:root.classList.contains('motion-off')?'auto':'smooth',block:'start'});
  }));
  cmdInput2.addEventListener('input',()=>{const q=cmdInput2.value.toLowerCase();palette.querySelectorAll('.command-item').forEach(i=>i.style.display=i.textContent.toLowerCase().includes(q)?'flex':'none')});
})();
