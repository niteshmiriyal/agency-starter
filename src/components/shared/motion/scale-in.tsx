'use client';

import type { Variants } from 'framer-motion';

import { MotionInView } from '@/components/shared/motion/motion-in-view';

const variants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export type ScaleInProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the transition starts, e.g. manually staggering a list. */
  delay?: number;
};

/**
 * Entrance driven by scale rather than translation — suited to discrete
 * surfaces (cards, media, modals-in-flow) where a subtle "settle into
 * place" reads better than a directional slide.
 */
function ScaleIn({ children, className, delay }: ScaleInProps) {
  return (
    <MotionInView variants={variants} delay={delay} className={className}>
      {children}
    </MotionInView>
  );
}

export { ScaleIn };
