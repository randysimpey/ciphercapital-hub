/* =========================================================
   CipherCapital — motion engine
   Vanilla JS. No dependencies. Reduced-motion aware.
   Everything degrades to a fully readable static page.
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const MOTION_KEY = 'cc-motion';
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('js');

  let motionOn = localStorage.getItem(MOTION_KEY) !== 'off' && !prefersReduce;
  const applyMotion = (on) => {
    motionOn = on;
    root.classList.toggle('motion-off', !on);
    localStorage.setItem(MOTION_KEY, on ? 'on' : 'off');
  };
  applyMotion(motionOn);

  const raf = (fn) => requestAnimationFrame(fn);
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  /* ---------- Scroll progress + sticky bar state ---------- */
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.prepend(bar);

  const topbar = document.querySelector('.topbar');
  let queued = false;

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${clamp(max > 0 ? scrollY / max : 0, 0, 1) * 100}%`;
    if (topbar) topbar.classList.toggle('stuck', scrollY > 20);
    queued = false;
  };
  addEventListener('scroll', () => {
    if (!queued) { raf(onScroll); queued = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Hero entrance: one orchestrated moment ---------- */
  const hero = document.querySelector('.hero');
  if (hero) raf(() => raf(() => hero.classList.add('lit')));

  /* ---------- Reveal on enter (headings + media only) ---------- */
  const revealables = document.querySelectorAll('.rise');
  if (revealables.length) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('seen');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach((el) => io.observe(el));
  }

  /* ---------- Terminal typing ---------- */
  const term = document.querySelector('[data-console]');
  if (term) {
    let lines = [];
    try { lines = JSON.parse(term.dataset.console); } catch (_) { lines = []; }

    const paint = (done, partial, cls) => {
      const html = done.map((l) => `<div class="${l.c || ''}">${l.t || '&nbsp;'}</div>`).join('');
      term.innerHTML = partial === null
        ? `${html}<span class="caret"></span>`
        : `${html}<div class="${cls}">${partial}<span class="caret"></span></div>`;
    };

    const paintAll = () => paint(lines.map((l) => ({ t: l[0], c: l[1] })), null);

    if (!motionOn) {
      paintAll();
    } else {
      const done = [];
      let li = 0;
      const nextLine = () => {
        if (li >= lines.length) { paint(done, null); return; }
        const [text, cls] = lines[li];
        let ci = 0;
        const tick = () => {
          if (ci <= text.length) {
            paint(done, text.slice(0, ci), cls || '');
            ci += 1;
            setTimeout(tick, 16);
          } else {
            done.push({ t: text, c: cls || '' });
            li += 1;
            setTimeout(nextLine, text ? 110 : 40);
          }
        };
        tick();
      };
      const startIO = new IntersectionObserver((entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        setTimeout(nextLine, 380);
      }, { threshold: 0.4 });
      startIO.observe(term);
    }
  }

  /* ---------- Report rows illuminate with scroll position ---------- */
  const sheet = document.querySelector('[data-sheet]');
  if (sheet) {
    const rows = [...sheet.querySelectorAll('.row')];
    if (!motionOn) {
      rows.forEach((r) => r.classList.add('on'));
    } else {
      let sQueued = false;
      const paintRows = () => {
        const r = sheet.getBoundingClientRect();
        const span = r.height + innerHeight * 0.55;
        const p = clamp((innerHeight * 0.85 - r.top) / span, 0, 1);
        const cut = Math.round(p * rows.length * 1.35);
        rows.forEach((row, i) => row.classList.toggle('on', i < cut));
        sQueued = false;
      };
      addEventListener('scroll', () => {
        if (!sQueued) { raf(paintRows); sQueued = true; }
      }, { passive: true });
      paintRows();
    }
  }

  /* ---------- Count-up ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        obs.unobserve(el);
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        if (!motionOn) { el.textContent = target + suffix; return; }
        const t0 = performance.now();
        const dur = 1200;
        const step = (now) => {
          const t = clamp((now - t0) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (t < 1) raf(step);
        };
        raf(step);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------- Pinned story ---------- */
  const story = document.querySelector('[data-story]');
  if (story) {
    const steps = [...story.querySelectorAll('.story-step')];
    const dots = [...story.querySelectorAll('.story-dots i')];
    const graph = story.querySelector('.graph');
    const nodes = graph ? [...graph.querySelectorAll('.node')] : [];
    const core = graph ? graph.querySelector('.core') : null;

    // Measure each edge so the draw-on animation is exact.
    if (graph) {
      graph.querySelectorAll('.edge').forEach((edge) => {
        const len = Math.ceil(edge.getTotalLength ? edge.getTotalLength() : 200);
        edge.style.setProperty('--len', len);
      });
    }

    let active = -1;
    const setStep = (i) => {
      if (i === active) return;
      active = i;
      steps.forEach((s, n) => s.classList.toggle('live', n === i));
      dots.forEach((d, n) => d.classList.toggle('live', n <= i));
      if (graph) {
        graph.classList.remove('s1', 's2', 's3');
        graph.classList.add(`s${i + 1}`);
        nodes.forEach((n, idx) => n.classList.toggle('hot', idx <= i * 2 + 1));
        if (core) core.setAttribute('r', String(26 + i * 7));
      }
    };
    setStep(0);

    if (motionOn) {
      let stQueued = false;
      const paintStory = () => {
        const r = story.getBoundingClientRect();
        const span = Math.max(1, r.height - innerHeight);
        const p = clamp(-r.top / span, 0, 0.999);
        setStep(Math.min(steps.length - 1, Math.floor(p * steps.length)));
        stQueued = false;
      };
      addEventListener('scroll', () => {
        if (!stQueued) { raf(paintStory); stQueued = true; }
      }, { passive: true });
      paintStory();
    }
  }

  /* ---------- Pointer light on cards ---------- */
  if (motionOn && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }, { passive: true });
    });

    // Console tilt — subtle, hero only.
    const con = document.querySelector('.console');
    if (con) {
      con.addEventListener('pointermove', (e) => {
        const r = con.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        con.style.transform = `perspective(1400px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.8).toFixed(2)}deg)`;
      }, { passive: true });
      con.addEventListener('pointerleave', () => { con.style.transform = ''; });
    }

    // Portrait parallax.
    const portrait = document.querySelector('[data-parallax]');
    if (portrait) {
      let pQueued = false;
      const paintP = () => {
        const r = portrait.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) {
          const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          portrait.style.transform = `translate3d(0,${(p * -18).toFixed(1)}px,0)`;
        }
        pQueued = false;
      };
      addEventListener('scroll', () => {
        if (!pQueued) { raf(paintP); pQueued = true; }
      }, { passive: true });
      paintP();
    }
  }

  /* ---------- Anchor scrolling with sticky-bar offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (topbar ? topbar.getBoundingClientRect().height : 52) + 14;
      scrollTo({
        top: target.getBoundingClientRect().top + scrollY - offset,
        behavior: motionOn ? 'smooth' : 'auto'
      });
      history.replaceState(null, '', id);
    });
  });

  /* ---------- Motion toggle ---------- */
  if (!prefersReduce) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'motion-toggle';
    const label = () => { btn.innerHTML = `Motion <b>${motionOn ? 'on' : 'off'}</b>`; };
    label();
    document.body.appendChild(btn);
    setTimeout(() => btn.classList.add('show'), 1600);
    btn.addEventListener('click', () => { applyMotion(!motionOn); label(); });
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'm' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        applyMotion(!motionOn); label();
      }
    });
  }

  /* ---------- Analytics consent (Google Consent Mode v2) ---------- */
  const consent = document.querySelector('[data-consent]');
  if (consent) {
    const KEY = 'cc-consent';
    const saved = localStorage.getItem(KEY);
    const grant = () => { if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: 'granted' }); };

    if (saved === 'granted') grant();
    else if (saved !== 'denied') consent.hidden = false;

    consent.querySelector('[data-accept]')?.addEventListener('click', () => {
      localStorage.setItem(KEY, 'granted'); grant(); consent.hidden = true;
    });
    consent.querySelector('[data-decline]')?.addEventListener('click', () => {
      localStorage.setItem(KEY, 'denied'); consent.hidden = true;
    });
  }

  /* ---------- Checklist sign-up ---------- */
  const form = document.querySelector('[data-signup]');
  if (form) {
    const note = form.parentElement.querySelector('[data-note]');
    const button = form.querySelector('button');
    const original = button ? button.textContent : '';
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (button) { button.disabled = true; button.textContent = form.dataset.sending || 'Sending…'; }
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (note) {
          note.hidden = false;
          note.textContent = res.ok ? (form.dataset.ok || 'Check your inbox.') : (form.dataset.fail || 'That did not go through — use the direct download below.');
        }
        if (res.ok) form.hidden = true;
      } catch (_) {
        if (note) { note.hidden = false; note.textContent = form.dataset.fail || 'That did not go through — use the direct download below.'; }
      } finally {
        if (button) { button.disabled = false; button.textContent = original; }
      }
    });
  }
})();
