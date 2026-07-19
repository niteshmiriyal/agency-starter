'use client';

import type { Variants } from 'framer-motion';

import { motionDistance } from '@/lib/motion/tokens';
import { MotionInView } from '@/components/shared/motion/motion-in-view';

const variants: Variants = {
  hidden: { opacity: 0, y: motionDistance.sm },
  visible: { opacity: 1, y: 0 },
};

export type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the fade starts, e.g. manually staggering a list. */
  delay?: number;
};

/**
 * Default subtle entrance for content entering the viewport
 * (DESIGN_SYSTEM.md §9): a fade plus a slight upward translate. Built on
 * `MotionInView`, which owns the viewport trigger — reduced-motion handling
 * is inherited from the app-level `MotionConfig` in `MotionProvider`, not
 * implemented here.
 */
function FadeIn({ children, className, delay }: FadeInProps) {
  return (
    <MotionInView variants={variants} delay={delay} className={className}>
      {children}
    </MotionInView>
  );
}

export { FadeIn };
