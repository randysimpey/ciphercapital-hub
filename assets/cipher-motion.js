
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

  const header = document.querySelector('.site-header');
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
