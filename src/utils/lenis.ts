import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';

let lenis: Lenis | null = null;

/** Starts Lenis and drives it from GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    autoRaf: false,
    anchors: { offset: -80 },
  });
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}
