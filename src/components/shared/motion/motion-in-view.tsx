'use client';

import { motion, type Transition, type Variants } from 'framer-motion';

import { cn } from '@/lib/utils';
import { motionViewport } from '@/lib/motion/tokens';

export type MotionInViewProps = {
  children: React.ReactNode;
  className?: string;
  /** `hidden`/`visible` variant values this instance animates between. */
  variants: Variants;
  /** Delay in seconds before the transition starts, e.g. a manual stagger. */
  delay?: number;
  /** Overrides the transition inherited from `MotionProvider`'s `MotionConfig`. */
  transition?: Transition;
};

/**
 * Shared viewport-triggered entrance engine that `FadeIn`, `SlideUp`, and
 * `ScaleIn` are thin presets over — each of those differs only in its
 * `variants` shape, so the once-only viewport trigger lives here exactly
 * once (DESIGN_SYSTEM.md §9: an element that already entered must never
 * flicker back out on scroll-up). Reduced-motion handling is not
 * implemented here — it's delegated globally to the `MotionConfig` set up
 * by `MotionProvider`, which strips transform-based variant values
 * (x/y/scale) tree-wide for users who prefer reduced motion while leaving
 * opacity fades intact. `Reveal` and `Stagger` don't use this engine: they
 * animate more than one node under a single trigger, a shape this
 * single-node engine doesn't fit.
 */
function MotionInView({
  children,
  className,
  variants,
  delay = 0,
  transition,
}: MotionInViewProps) {
  const resolvedTransition: Transition | undefined =
    transition || delay
      ? { ...transition, delay: delay || transition?.delay }
      : undefined;

  return (
    <motion.div
      data-slot="motion-in-view"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={variants}
      transition={resolvedTransition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { MotionInView };
