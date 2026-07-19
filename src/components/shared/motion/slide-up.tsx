'use client';

import type { Variants } from 'framer-motion';

import { motionDistance } from '@/lib/motion/tokens';
import { MotionInView } from '@/components/shared/motion/motion-in-view';

const variants: Variants = {
  hidden: { opacity: 0, y: motionDistance.lg },
  visible: { opacity: 1, y: 0 },
};

export type SlideUpProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the transition starts, e.g. manually staggering a list. */
  delay?: number;
};

/**
 * Entrance where vertical movement is the dominant effect rather than
 * incidental to a fade (contrast `FadeIn`'s smaller `motionDistance.sm`
 * travel) — use where content should read as arriving "from below", e.g. a
 * section's supporting visual following its heading.
 */
function SlideUp({ children, className, delay }: SlideUpProps) {
  return (
    <MotionInView variants={variants} delay={delay} className={className}>
      {children}
    </MotionInView>
  );
}

export { SlideUp };
