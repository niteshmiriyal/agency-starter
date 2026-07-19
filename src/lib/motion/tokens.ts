import type { Transition } from 'framer-motion';

/**
 * Duration scale mirroring DESIGN_SYSTEM.md §8, in seconds — Framer Motion
 * transitions take numeric seconds, not CSS duration strings, so this is
 * the canonical source every motion primitive reads from instead of
 * retyping raw numbers per component.
 */
export const motionDuration = {
  instant: 0.1,
  fast: 0.15,
  base: 0.2,
  moderate: 0.3,
  slow: 0.5,
} as const;

/**
 * Easing curves mirroring DESIGN_SYSTEM.md §8. Typed as mutable 4-tuples
 * (not `as const` readonly tuples) to match the cubic-bezier array shape
 * Framer Motion's `Transition['ease']` expects.
 */
export const motionEasing: Record<
  'enter' | 'exit' | 'inPlace',
  [number, number, number, number]
> = {
  enter: [0.16, 1, 0.3, 1],
  exit: [0.4, 0, 1, 1],
  inPlace: [0.4, 0, 0.2, 1],
};

/** Travel distance (px) for translate-based entrances. */
export const motionDistance = {
  sm: 16,
  lg: 40,
} as const;

/**
 * Shared viewport-trigger config for every entrance primitive. `once: true`
 * is deliberate: an element that has already entered must never flicker
 * back out on scroll-up (DESIGN_SYSTEM.md §9).
 */
export const motionViewport = {
  once: true,
  margin: '-80px',
} as const;

/**
 * Default transition applied globally via `MotionProvider`'s `MotionConfig`
 * so individual primitives don't need to repeat duration/easing unless a
 * specific moment calls for an explicit override (e.g. `Reveal`'s
 * `duration-slow`).
 */
export const defaultMotionTransition: Transition = {
  duration: motionDuration.moderate,
  ease: motionEasing.enter,
};
