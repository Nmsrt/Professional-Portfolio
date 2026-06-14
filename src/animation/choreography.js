/* =============================================================================
 * choreography.js — all GSAP + ScrollTrigger animation logic in one place.
 *
 * Responsibilities:
 *   · drive the Three.js camera from scroll progress (scrub) → "travel"
 *   · play the hero launch sequence on load
 *   · reveal sections, stagger groups, and parallax layers on scroll
 *   · fully bail out under prefers-reduced-motion (content stays visible)
 *
 * Animations use gsap.from(), so the natural CSS state is the *visible* state —
 * if JS never runs (or reduced motion), everything is simply shown.
 * ===========================================================================*/

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* One motion language for the whole page — every scroll reveal shares these.
   Mirrors the CSS tokens (--ease / --dur) so JS + CSS motion feel identical. */
const EASE = 'power2.out';
const DUR = 0.6;
const REVEAL_START = 'top 80%';

/**
 * @param {object}  opts
 * @param {SpaceScene} opts.scene   the Three.js controller (or null)
 * @param {HTMLElement} opts.root   the scroll container used for progress
 * @param {boolean} opts.reducedMotion
 * @returns {() => void} cleanup
 */
export function initChoreography({ scene, root, reducedMotion }) {
  // Reduced motion: park the camera at the start and leave the DOM untouched.
  if (reducedMotion) {
    scene?.setIntro(0);
    scene?.setProgress(0);
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    /* ── 1. Scroll progress → camera travel through the corridor ─────────── */
    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => scene?.setProgress(self.progress)
    });

    /* ── 2. Launch sequence (hero entrance) — the one cinematic moment ────── */
    const introObj = { v: 1 };
    const launch = gsap.timeline({ defaults: { ease: EASE } });

    // starfield zooms in: camera settles from far pull-back to flight position
    launch.to(
      introObj,
      {
        v: 0,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => scene?.setIntro(introObj.v)
      },
      0
    );

    // text materializes from below its mask, then the rest fades in sequence
    launch
      .from(
        '[data-hero-line]',
        { yPercent: 120, opacity: 0, duration: 1, stagger: 0.14, ease: 'power4.out' },
        0.6
      )
      .from('[data-hero-fade]', { opacity: 0, y: 24, duration: 0.9, stagger: 0.12 }, 1.3)
      .from('[data-hero-cue]', { opacity: 0, y: 10, duration: 0.8 }, 1.9)
      .from('[data-hud]', { opacity: 0, duration: 1, stagger: 0.1 }, 1.0);

    /* ── 3. Section reveals — one shared duration / ease / trigger ────────── */
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      const dir = el.dataset.reveal || 'up';
      const from = { opacity: 0, duration: DUR, ease: EASE };
      if (dir === 'up') from.y = 40;
      if (dir === 'left') from.x = -48;
      if (dir === 'right') from.x = 48;
      if (dir === 'scale') from.scale = 0.92;

      gsap.from(el, {
        ...from,
        scrollTrigger: {
          trigger: el,
          start: REVEAL_START,
          toggleActions: 'play none none reverse'
        }
      });
    });

    /* ── 4. Staggered groups — same language, sequenced so the eye flows ──── */
    gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
      gsap.from(group.children, {
        opacity: 0,
        y: 36,
        duration: DUR,
        ease: EASE,
        stagger: 0.08,
        scrollTrigger: {
          trigger: group,
          start: REVEAL_START,
          toggleActions: 'play none none reverse'
        }
      });
    });

    /* ── 5. Parallax layers (subtle depth as you scroll) ─────────────────── */
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      gsap.to(el, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, root);

  // Fonts / images shifting layout can throw off trigger positions.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  const refreshTimer = setTimeout(refresh, 600);

  return () => {
    clearTimeout(refreshTimer);
    window.removeEventListener('load', refresh);
    ctx.revert();
  };
}
