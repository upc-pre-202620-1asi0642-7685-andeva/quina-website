import { gsap, ScrollTrigger, prefersReducedMotion } from '@/utils/gsap';
import { initSmoothScroll, getLenis } from '@/utils/lenis';

const reduced = prefersReducedMotion();
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------------------------------------------------------------------
   Utilidades
   --------------------------------------------------------------------------- */

/** Envuelve cada palabra en una máscara para animarla desde abajo. */
function splitWords(el: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            continue;
          }
          const mask = document.createElement('span');
          mask.className = 'word-mask';
          const word = document.createElement('span');
          word.className = 'word';
          word.textContent = part;
          mask.append(word);
          frag.append(mask);
          words.push(word);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    }
  };
  walk(el);
  return words;
}

/* ---------------------------------------------------------------------------
   Header: siempre visible (como open-design); marca una línea al hacer scroll
   --------------------------------------------------------------------------- */

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: () => header.toggleAttribute('data-scrolled', window.scrollY > 8),
  });
}

/* ---------------------------------------------------------------------------
   Menús desplegables del header (open-design)
   --------------------------------------------------------------------------- */

function initDropdowns() {
  const dropdowns = [...document.querySelectorAll<HTMLElement>('[data-dropdown]')];
  const timers = new WeakMap<HTMLElement, number>();
  // Momento en que el hover de mouse abrió cada menú: el clic que sigue no debe cerrarlo
  const hoverOpenedAt = new WeakMap<HTMLElement, number>();

  const setOpen = (dd: HTMLElement, open: boolean) => {
    const trigger = dd.querySelector<HTMLElement>('[data-dropdown-trigger]');
    dd.toggleAttribute('data-open', open);
    trigger?.setAttribute('aria-expanded', String(open));
    document.documentElement.toggleAttribute(
      'data-nav-open',
      dropdowns.some((d) => d.hasAttribute('data-open')),
    );
  };

  const closeAll = (except?: HTMLElement) =>
    dropdowns.forEach((d) => d !== except && setOpen(d, false));

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector<HTMLElement>('[data-dropdown-trigger]');
    if (!trigger) return;

    // Toque, teclado o clic sin hover previo: alterna. Clic justo después de abrir por hover: se mantiene.
    trigger.addEventListener('click', () => {
      const justHovered = performance.now() - (hoverOpenedAt.get(dd) ?? -Infinity) < 600;
      const open = justHovered ? true : !dd.hasAttribute('data-open');
      closeAll(dd);
      setOpen(dd, open);
    });

    // El hover solo aplica a un mouse real. Se decide por evento y no por media query:
    // un toque en un equipo con mouse (o el modo responsive del navegador) también
    // dispara pointerenter/pointerleave y cerraba el menú al levantar el dedo.
    // Los menús marcados con data-dropdown-click (idioma) solo abren con clic,
    // igual que el botón de tema que tienen al lado.
    const hoverable = !dd.hasAttribute('data-dropdown-click');

    dd.addEventListener('pointerenter', (e) => {
      if (!hoverable || e.pointerType !== 'mouse') return;
      clearTimeout(timers.get(dd));
      if (!dd.hasAttribute('data-open')) hoverOpenedAt.set(dd, performance.now());
      closeAll(dd);
      setOpen(dd, true);
    });
    dd.addEventListener('pointerleave', (e) => {
      if (!hoverable || e.pointerType !== 'mouse') return;
      timers.set(
        dd,
        window.setTimeout(() => setOpen(dd, false), 140),
      );
    });

    dd.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dd.hasAttribute('data-open')) {
        setOpen(dd, false);
        trigger.focus();
      }
    });

    dd.addEventListener('focusout', (e) => {
      if (!dd.contains(e.relatedTarget as Node | null)) setOpen(dd, false);
    });
  });

  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('[data-dropdown]')) closeAll();
  });
}

/* ---------------------------------------------------------------------------
   Modo claro / oscuro
   --------------------------------------------------------------------------- */

function initThemeToggle() {
  const html = document.documentElement;
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  const sync = () => {
    const dark = html.dataset['theme'] === 'dark';
    document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute(
        'aria-label',
        (dark ? btn.dataset['labelLight'] : btn.dataset['labelDark']) ?? '',
      );
      btn.setAttribute('aria-pressed', String(dark));
    });
    meta?.setAttribute('content', dark ? '#161917' : '#f8f8fa');
  };

  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const next = html.dataset['theme'] === 'dark' ? 'light' : 'dark';
      html.dataset['theme'] = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* sin almacenamiento: el cambio dura hasta recargar */
      }
      sync();
    }),
  );

  sync();
}

/* ---------------------------------------------------------------------------
   Menú a pantalla completa (Azurio)
   --------------------------------------------------------------------------- */

function initMenu() {
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = menu?.querySelector<HTMLButtonElement>('[data-menu-close]');
  if (!menu || !openBtn || !closeBtn) return;

  const panel = menu.querySelector('[data-menu-panel]');
  const visual = menu.querySelector('[data-menu-visual]');
  const links = menu.querySelectorAll('[data-menu-link]');
  const lines = menu.querySelectorAll('[data-menu-line]');
  const fades = menu.querySelectorAll('[data-menu-fade]');

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'expo.out' },
    onReverseComplete: () => {
      menu.removeAttribute('data-open');
      menu.inert = true;
    },
  });

  tl.fromTo(
    [visual, panel],
    { clipPath: 'inset(0% 0% 100% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut', stagger: 0.08 },
  )
    .fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.06 }, 0.45)
    .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06 }, 0.5)
    .fromTo(fades, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.7);

  const open = () => {
    menu.setAttribute('data-open', '');
    menu.inert = false;
    openBtn.setAttribute('aria-expanded', 'true');
    getLenis()?.stop();
    if (reduced) tl.progress(1);
    else tl.timeScale(1).play();
    closeBtn.focus();
  };

  const close = () => {
    openBtn.setAttribute('aria-expanded', 'false');
    getLenis()?.start();
    if (reduced) {
      tl.progress(0);
      menu.removeAttribute('data-open');
      menu.inert = true;
    } else tl.timeScale(1.6).reverse();
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  menu.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  menu
    .querySelectorAll('[data-menu-close-link]')
    .forEach((l) => l.addEventListener('click', close));

  // Grupos con subenlaces: acordeón, uno abierto a la vez
  const groups = [...menu.querySelectorAll<HTMLButtonElement>('[data-menu-group]')];
  groups.forEach((g) =>
    g.addEventListener('click', () => {
      const open = g.getAttribute('aria-expanded') !== 'true';
      groups.forEach((o) => o.setAttribute('aria-expanded', 'false'));
      g.setAttribute('aria-expanded', String(open));
    }),
  );
}

/* ---------------------------------------------------------------------------
   Botones imán (navby)
   --------------------------------------------------------------------------- */

function initMagnetic() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const inner = el.querySelector<HTMLElement>('[data-magnetic-inner]');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const ixTo = inner && gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3.out' });
    const iyTo = inner && gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3.out' });

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.35);
      yTo(dy * 0.45);
      ixTo?.(dx * 0.15);
      iyTo?.(dy * 0.2);
    });

    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' });
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' });
    });
  });
}

/* ---------------------------------------------------------------------------
   Hero: titular palabra por palabra, ventana del producto y tarjetas
   --------------------------------------------------------------------------- */

function initHero() {
  const fades = gsap.utils.toArray<HTMLElement>('[data-hero-fade]');
  const windowEl = document.querySelector<HTMLElement>('[data-hero-window]');
  const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
  const bgMedia = document.querySelector<HTMLElement>('[data-hero-bg-media]');
  const floats = gsap.utils.toArray<HTMLElement>('[data-float]');

  const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
  intro
    .from(fades, { autoAlpha: 0, y: 24, duration: 1, stagger: 0.09 }, 0.55)
    .from(windowEl, { y: 120, autoAlpha: 0, duration: 1.4 }, 0.7)
    .from(
      floats,
      { y: 40, scale: 0.92, autoAlpha: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(1.6)' },
      1.15,
    );

  // La ventana se endereza y crece mientras entra (open-design + Evernote)
  if (windowEl && stage) {
    gsap.fromTo(
      windowEl,
      { rotateX: 14, scale: 0.9 },
      {
        rotateX: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top 85%', end: 'top 20%', scrub: true },
      },
    );
  }

  // Parallax de cada tarjeta con su propia velocidad
  floats.forEach((card) => {
    const speed = Number(card.dataset['speed'] ?? 0);
    gsap.to(card, {
      yPercent: speed * -600,
      ease: 'none',
      scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  if (bgMedia) {
    gsap.to(bgMedia, {
      yPercent: 12,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* ---------------------------------------------------------------------------
   Titulares divididos en palabras (integratedbio)
   --------------------------------------------------------------------------- */

function initSplitHeadings() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = splitWords(el);
    el.style.visibility = 'visible';
    const inHero = el.closest('.hero');
    gsap.from(words, {
      yPercent: 110,
      rotate: 4,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.05,
      delay: inHero ? 0.2 : 0,
      ...(inHero ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
    });
  });
}

/* ---------------------------------------------------------------------------
   Declaración que se ilumina palabra por palabra con el scroll
   --------------------------------------------------------------------------- */

function initScrubWords() {
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });
}

/* ---------------------------------------------------------------------------
   Entradas escalonadas por sección
   --------------------------------------------------------------------------- */

function initReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(':scope [data-reveal]');
    if (!items.length) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      },
    );
  });
}

/* ---------------------------------------------------------------------------
   Marquee que acelera con la velocidad del scroll
   --------------------------------------------------------------------------- */

function initMarquee() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-marquee-track]');
    if (!track) return;
    const half = track.scrollWidth / 2;
    const loop = gsap.to(track, {
      x: -half,
      duration: 22,
      ease: 'none',
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: string) => parseFloat(x) % half) },
    });

    let boost = 1;
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity() / 300;
        boost = gsap.utils.clamp(-6, 6, 1 + Math.abs(v)) * (self.direction === 1 ? 1 : -1);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: self.direction === 1 ? 1 : -1, duration: 1.2, delay: 0.2 });
      },
    });
  });
}

/* ---------------------------------------------------------------------------
   Dispositivos que se enderezan en 3D (Azurio)
   --------------------------------------------------------------------------- */

function initTilt() {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((wrap) => {
    const frame = wrap.querySelector<HTMLElement>('.device-frame');
    if (!frame) return;
    const dir = wrap.dataset['tilt'] === 'right' ? -1 : 1;
    gsap.fromTo(
      frame,
      { rotateY: -28 * dir, rotateX: 18, rotateZ: -6 * dir, xPercent: 18 * dir, scale: 0.86 },
      {
        rotateY: -6 * dir,
        rotateX: 4,
        rotateZ: -1.5 * dir,
        xPercent: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'center 55%', scrub: 0.6 },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-rule]').forEach((rule) => {
    gsap.from(rule, {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: rule, start: 'top 90%', once: true },
    });
  });
}

/* ---------------------------------------------------------------------------
   Video que crece hasta casi llenar la pantalla (Viora)
   --------------------------------------------------------------------------- */

function initVideo() {
  const stage = document.querySelector<HTMLElement>('[data-video-stage]');
  const frame = document.querySelector<HTMLElement>('[data-video-frame]');
  if (!stage || !frame) return;
  gsap.fromTo(
    frame,
    { scale: 0.62, borderRadius: 40 },
    {
      scale: 1,
      borderRadius: 28,
      ease: 'none',
      scrollTrigger: { trigger: stage, start: 'top 90%', end: 'center center', scrub: true },
    },
  );

  const video = frame.querySelector<HTMLVideoElement>('[data-video]');
  if (video) {
    ScrollTrigger.create({
      trigger: frame,
      start: 'top 70%',
      end: 'bottom 30%',
      onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
    });
  }
}

/* ---------------------------------------------------------------------------
   Footer que aparece desde atrás (Folira)
   --------------------------------------------------------------------------- */

function initFooterReveal() {
  const footer = document.querySelector<HTMLElement>('[data-footer]');
  const main = document.querySelector<HTMLElement>('[data-main]');
  const inner = footer?.querySelector<HTMLElement>('[data-footer-inner]');
  if (!footer || !main || !inner) return;

  const html = document.documentElement;
  let tween: gsap.core.Tween | null = null;

  const update = () => {
    html.classList.remove('footer-reveal');
    main.style.marginBottom = '';
    const h = footer.offsetHeight;
    const fits = h < window.innerHeight * 0.95;
    tween?.scrollTrigger?.kill();
    tween?.kill();
    tween = null;
    gsap.set(inner, { clearProps: 'transform' });
    if (!fits) return;

    html.classList.add('footer-reveal');
    main.style.marginBottom = `${h}px`;
    if (!reduced) {
      tween = gsap.fromTo(
        inner,
        { yPercent: -35, scale: 0.96 },
        {
          yPercent: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: main, start: 'bottom bottom', end: `+=${h}`, scrub: true },
        },
      );
    }
  };

  update();
  let raf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      update();
      ScrollTrigger.refresh();
    });
  });
}

/* ---------------------------------------------------------------------------
   Idioma preferido compartido con la webapp
   La webapp vive en el mismo dominio (/app) y no lleva el idioma en la URL:
   lee esta cookie para mostrar su interfaz en el idioma elegido en el sitio.
   --------------------------------------------------------------------------- */

function initLanguageCookie() {
  document.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((link) =>
    link.addEventListener('click', () => {
      const lang = link.dataset['setLang'];
      if (!lang) return;
      document.cookie = `quina-lang=${lang}; path=/; max-age=31536000; samesite=lax; secure`;
    }),
  );
}

/* ---------------------------------------------------------------------------
   Arranque
   --------------------------------------------------------------------------- */

initSmoothScroll();
initThemeToggle();
initMenu();
initHeader();
initDropdowns();
initLanguageCookie();
initFooterReveal();

if (reduced) {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    el.style.visibility = 'visible';
  });
  gsap.set('[data-reveal]', { autoAlpha: 1 });
} else {
  initSplitHeadings();
  initHero();
  initScrubWords();
  initReveals();
  initMarquee();
  initTilt();
  initVideo();
  initMagnetic();
}

window.addEventListener('load', () => ScrollTrigger.refresh());
