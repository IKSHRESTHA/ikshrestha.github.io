// Visual effects for the home page. Every effect respects
// prefers-reduced-motion, and anything animated pauses when it is not
// visible so the page stays cheap to run.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// --------------------------- Hero: risk simulation ---------------------------
// Simulated claim-development paths, drawn like a stochastic fan chart:
// many trajectories fan out from the same origin and settle toward their
// ultimates. It is the visual signature of the site — risk, literally drawn.
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const PATHS = 26;
  const STEPS = 110;
  const DRAW_MS = 4200;
  const HOLD_MS = 2600;
  const FADE_MS = 900;

  // Path colors per theme: gold/rose/steel on dark, bronze/maroon/navy on light.
  const palette = () =>
    document.documentElement.dataset.theme === 'dark'
      ? [
          [227, 183, 103],
          [232, 167, 174],
          [125, 156, 208],
        ]
      : [
          [138, 90, 18],
          [122, 30, 46],
          [31, 58, 102],
        ];

  let paths = [];
  let width = 0;
  let height = 0;
  let phase = 'draw'; // draw -> hold -> fade -> reseed
  let phaseStart = 0;
  let visible = false;
  let rafId = 0;

  function seed() {
    paths = [];
    const originY = height * 0.86;
    for (let p = 0; p < PATHS; p++) {
      const pts = [];
      let y = originY + (Math.random() - 0.5) * 18;
      // Total climb for this path and its volatility. exp decay makes growth
      // fast early and flat late — the shape of a loss-development curve.
      const climb = height * (0.35 + Math.random() * 0.42);
      const vol = 4 + Math.random() * 11;
      for (let s = 0; s <= STEPS; s++) {
        const x = -12 + ((width + 24) / STEPS) * s;
        const decay = Math.exp(-3.1 * (s / STEPS));
        y -= (climb / STEPS) * decay * 3.1 + (Math.random() - 0.5) * vol * decay * 2;
        pts.push([x, y]);
      }
      paths.push({
        pts,
        colorIndex: p % 3,
        alpha: 0.07 + Math.random() * 0.17,
        lineWidth: 0.8 + Math.random() * 1.5,
      });
    }
  }

  function strokePath(path, color, upTo, alphaScale) {
    const [r, g, b] = color;
    ctx.beginPath();
    ctx.moveTo(path.pts[0][0], path.pts[0][1]);
    for (let s = 1; s <= upTo; s++) ctx.lineTo(path.pts[s][0], path.pts[s][1]);
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${path.alpha * alphaScale})`;
    ctx.lineWidth = path.lineWidth;
    ctx.stroke();
  }

  function draw(progress, alphaScale) {
    ctx.clearRect(0, 0, width, height);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const pal = palette(); // resolved per frame so a theme switch recolors live
    const upTo = Math.max(1, Math.floor(progress * STEPS));
    for (const path of paths) {
      const color = pal[path.colorIndex];
      strokePath(path, color, upTo, alphaScale);
      // a small bright head while the paths are still being drawn
      if (progress < 1 && alphaScale === 1) {
        const [r, g, b] = color;
        const [hx, hy] = path.pts[upTo];
        ctx.beginPath();
        ctx.arc(hx, hy, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(0.7, path.alpha * 3)})`;
        ctx.fill();
      }
    }
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(now) {
    if (!visible || document.hidden) {
      rafId = 0;
      return;
    }
    if (!phaseStart) phaseStart = now;
    const elapsed = now - phaseStart;

    if (phase === 'draw') {
      const t = Math.min(1, elapsed / DRAW_MS);
      draw(easeOut(t), 1);
      if (t >= 1) {
        phase = 'hold';
        phaseStart = now;
      }
    } else if (phase === 'hold') {
      if (elapsed >= HOLD_MS) {
        phase = 'fade';
        phaseStart = now;
      }
    } else {
      const t = Math.min(1, elapsed / FADE_MS);
      draw(1, 1 - t);
      if (t >= 1) {
        seed();
        phase = 'draw';
        phaseStart = now;
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (!rafId && visible && !document.hidden && !reducedMotion.matches) {
      phaseStart = 0;
      rafId = requestAnimationFrame(frame);
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    // Reduced motion: one calm, finished picture. No loop.
    if (reducedMotion.matches) draw(1, 0.8);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    },
    { threshold: 0.05 }
  );
  io.observe(canvas);

  document.addEventListener('visibilitychange', start);

  // Repaint the static frame when the theme flips (the animated loop picks
  // the new palette up on its own next frame).
  new MutationObserver(() => {
    if (reducedMotion.matches) draw(1, 0.8);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      draw(1, 0.8);
    } else {
      start();
    }
  });
}

// ------------------------------- Stat counters -------------------------------
// The stats count up from zero the first time they scroll into view.
export function initCounters() {
  const values = document.querySelectorAll('.stats-strip dd');
  if (!values.length || reducedMotion.matches) return;

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split('.')[1] || '').length;
    const startTime = performance.now();
    const DURATION = 1400;

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  values.forEach((el) => io.observe(el));
}

// ---------------------------------- Ticker -----------------------------------
// The scrolling strip of actuarial methods. The track is duplicated once so
// the CSS animation can loop seamlessly; CSS turns the motion off under
// prefers-reduced-motion.
export function initTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

// -------------------------------- Cursor glow --------------------------------
// A soft gold light that trails the pointer. Desktop pointers only, and only
// when the visitor has no motion preference set.
export function initCursorGlow() {
  if (reducedMotion.matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 3;
  let x = targetX;
  let y = targetY;

  window.addEventListener(
    'pointermove',
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true }
  );

  (function follow() {
    x += (targetX - x) * 0.09;
    y += (targetY - y) * 0.09;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(follow);
  })();
}

export function initEffects() {
  initHeroCanvas();
  initCounters();
  initTicker();
  initCursorGlow();
}
