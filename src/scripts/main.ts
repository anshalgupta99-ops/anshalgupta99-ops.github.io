// One clock: GSAP's ticker drives Lenis, ScrollTrigger and every timer here. No scroll listeners, no rAF loops.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Tenant = {
  name: string; domain: string; ground: string; ink: string; accent: string; radius: number;
};

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tenants: Tenant[] = JSON.parse(document.getElementById('tenants-data')?.textContent ?? '[]');
const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$<HTMLAnchorElement>('a[data-scroll]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id ? document.querySelector<HTMLElement>(id) : null;
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else target.scrollIntoView();
    history.replaceState(null, '', id);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

/* ---------- Hero: tenant skins ---------- */
const hero = $<HTMLElement>('[data-hero]')!;
const chips = $$<HTMLButtonElement>('[data-skin]', hero);
const cycleBar = $<HTMLElement>('[data-cycle]', hero)!;
const status = $<HTMLElement>('[data-status]');
let heroIndex = 0;
let cycleTween: gsap.core.Tween | null = null;
let userTookOver = false;

const GLYPHS = '!<>-_\\/[]{}=+*^?#0123456789abcdef';
function scramble(el: HTMLElement, text: string) {
  if (reduce) { el.textContent = text; return; }
  const state = { p: 0 };
  gsap.killTweensOf(state);
  gsap.to(state, {
    p: 1, duration: 0.6, ease: 'none',
    onUpdate: () => {
      const cut = Math.floor(state.p * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += i < cut || ch === '"' || ch === '.' || ch === '#' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
    },
    onComplete: () => { el.textContent = text; },
  });
}

function setStatus(label: string, tenant: string) {
  if (status) status.textContent = `${label} / ${tenant}`;
}

function applyTenant(i: number) {
  const t = tenants[i];
  if (!t) return;
  heroIndex = i;
  hero.dataset.tenant = t.name;
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.skin === t.name)));
  const vals: Record<string, string> = {
    name: `"${t.name}"`, domain: `"${t.domain}"`, ground: `"${t.ground}"`, ink: `"${t.ink}"`, accent: `"${t.accent}"`, radius: String(t.radius),
  };
  for (const [k, v] of Object.entries(vals)) {
    const el = $<HTMLElement>(`[data-k="${k}"]`, hero);
    if (el) scramble(el, v);
  }
  if (activeLabel === 'Intro') setStatus('Intro', t.name);
}

chips.forEach((chip, i) => {
  chip.addEventListener('click', () => {
    userTookOver = true;
    stopCycle();
    applyTenant(i);
  });
});

function startCycle() {
  if (reduce || userTookOver || cycleTween) return;
  const run = () => {
    gsap.set(cycleBar, { scaleX: 0 });
    cycleTween = gsap.to(cycleBar, {
      scaleX: 1, duration: 4.2, ease: 'none',
      onComplete: () => { applyTenant((heroIndex + 1) % tenants.length); cycleTween = null; if (!userTookOver) run(); },
    });
  };
  run();
}
function stopCycle() {
  cycleTween?.kill();
  cycleTween = null;
  gsap.set(cycleBar, { scaleX: 0 });
}

if (!reduce) {
  ScrollTrigger.create({
    trigger: hero, start: 'top bottom', end: 'bottom top',
    onEnter: startCycle, onEnterBack: startCycle, onLeave: () => { if (!userTookOver) stopCycle(); }, onLeaveBack: () => { if (!userTookOver) stopCycle(); },
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if (!userTookOver) stopCycle(); } else if (!userTookOver) startCycle(); });
}

/* ---------- Frame steps aside on scroll down ---------- */
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate: (self) => {
    document.documentElement.classList.toggle('ui-hidden', self.direction === 1 && self.scroll() > 240);
  },
});

/* ---------- Active section: status chip + nav state ---------- */
let activeLabel = 'Intro';
const sections = $$<HTMLElement>('[data-tenant][data-label]').filter((s) => s.id);
const navLinks = $$<HTMLAnchorElement>('[data-nav]');
sections.forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec, start: 'top 55%', end: 'bottom 55%',
    onToggle: (self) => {
      if (!self.isActive) return;
      activeLabel = sec.dataset.label ?? '';
      setStatus(activeLabel, sec.dataset.tenant ?? '');
      navLinks.forEach((l) => l.setAttribute('aria-current', String(l.dataset.nav === sec.id)));
    },
  });
});

/* ---------- Motion layers (skipped entirely under reduced motion) ---------- */
function setupMotion() {
  // Sections grow into view with the radius of their own tenant skin.
  $$<HTMLElement>('.sec--reveal').forEach((sec) => {
    const r = Math.min(tenants.find((t) => t.name === sec.dataset.tenant)?.radius ?? 0, 32);
    gsap.fromTo(
      sec,
      { clipPath: `inset(8svh 3vw 0 3vw round ${r}px)` },
      {
        clipPath: 'inset(0svh 0vw 0 0vw round 0px)', ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 30%', scrub: true, invalidateOnRefresh: true },
      },
    );
  });

  // Headings lift out of a mask, line by line.
  $$<HTMLElement>('[data-reveal]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true, aria: 'auto',
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }),
    });
  });

  // Rows draw their rule as they arrive.
  $$<HTMLElement>('[data-row]').forEach((row) => {
    const line = $<HTMLElement>('.row__line', row)!;
    gsap.from(line, { scaleX: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 92%', once: true } });
  });

  // Numbers count up to the real value already in the HTML.
  $$<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = String(Math.round(o.v)); } }),
    });
    el.textContent = '0';
  });

  // Stack: a scan keeps moving across the chips while the section is on screen.
  const chipsAll = $$<HTMLElement>('[data-chip]');
  let scanIdx = 0;
  let scanCall: gsap.core.Tween | null = null;
  const scanStep = () => {
    chipsAll.forEach((c) => c.removeAttribute('data-scan'));
    chipsAll[scanIdx % chipsAll.length]?.setAttribute('data-scan', '');
    scanIdx++;
    scanCall = gsap.delayedCall(0.55, scanStep);
  };
  const stackSec = $<HTMLElement>('#stack');
  if (stackSec && chipsAll.length) {
    ScrollTrigger.create({
      trigger: stackSec, start: 'top 80%', end: 'bottom 20%',
      onEnter: scanStep, onEnterBack: scanStep,
      onLeave: () => { scanCall?.kill(); chipsAll.forEach((c) => c.removeAttribute('data-scan')); },
      onLeaveBack: () => { scanCall?.kill(); chipsAll.forEach((c) => c.removeAttribute('data-scan')); },
    });
  }
}

/* ---------- Loader and intro ---------- */
function intro() {
  const nameEl = $<HTMLElement>('[data-hero-name]')!;
  const split = SplitText.create(nameEl, { type: 'chars', mask: 'chars', aria: 'auto' });
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from(split.chars, { yPercent: 115, duration: 1.2, stagger: 0.045 })
    .from($$('[data-hero-fade]'), { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.8')
    .add(() => { startCycle(); }, '-=0.4');
}

async function boot() {
  const loader = $<HTMLElement>('[data-loader]');
  if (reduce || !loader) {
    loader?.remove();
    return;
  }
  setupMotion();
  const countEl = $<HTMLElement>('[data-loader-count]')!;
  const bar = $<HTMLElement>('[data-loader-bar]')!;
  const o = { v: 0 };
  // Progress is capped at 90 until fonts and the window are ready, then it completes.
  const ready = Promise.all([
    document.fonts.ready,
    document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => addEventListener('load', r, { once: true })),
  ]);
  const climb = gsap.to(o, {
    v: 90, duration: 1.1, ease: 'power2.out',
    onUpdate: () => { countEl.textContent = String(Math.round(o.v)).padStart(3, '0'); gsap.set(bar, { scaleX: o.v / 100 }); },
  });
  await Promise.race([ready, new Promise((r) => setTimeout(r, 2200))]);
  await climb.then();
  await new Promise<void>((resolve) =>
    gsap.to(o, {
      v: 100, duration: 0.35, ease: 'power1.out',
      onUpdate: () => { countEl.textContent = String(Math.round(o.v)).padStart(3, '0'); gsap.set(bar, { scaleX: o.v / 100 }); },
      onComplete: resolve,
    }),
  );
  gsap.to(loader, {
    clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut', delay: 0.1,
    onStart: intro,
    onComplete: () => { loader.remove(); ScrollTrigger.refresh(); },
  });
}

boot();
