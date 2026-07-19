'use client';

import { motion, type Variants } from 'framer-motion';

import { cn } from '@/lib/utils';
import {
  motionDuration,
  motionEasing,
  motionViewport,
} from '@/lib/motion/tokens';

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionDuration.moderate,
      ease: motionEasing.inPlace,
    },
  },
};

const curtainVariants: Variants = {
  hidden: { scaleX: 1 },
  visible: {
    scaleX: 0,
    transition: { duration: motionDuration.slow, ease: motionEasing.enter },
  },
};

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Overrides the curtain surface's background (defaults to `bg-primary`). */
  curtainClassName?: string;
};

/**
 * The one "showy" entrance DESIGN_SYSTEM.md §8 / PROJECT_BLUEPRINT.md §9
 * permit — reserved for a single hero moment per page, not everyday content
 * entrances (use `FadeIn`, `SlideUp`, or `ScaleIn` for those). A solid
 * curtain surface wipes away (`scaleX` from a fixed `origin-right`,
 * transform-only — no `clip-path`, keeping strictly to the
 * animate-`transform`/`opacity`-only rule) to uncover `children`, which
 * fade in behind it. Has its own viewport trigger rather than being built
 * on `MotionInView`: it animates two sibling nodes (content + curtain)
 * under one trigger, a shape the single-node engine doesn't fit.
 */
function Reveal({ children, className, curtainClassName }: RevealProps) {
  return (
    <motion.div
      data-slot="reveal"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      className={cn('relative overflow-hidden', className)}
    >
      <motion.div data-slot="reveal-content" variants={contentVariants}>
        {children}
      </motion.div>
      <motion.div
        data-slot="reveal-curtain"
        variants={curtainVariants}
        aria-hidden="true"
        className={cn(
          'bg-primary absolute inset-0 origin-right',
          curtainClassName,
        )}
      />
    </motion.div>
  );
}

export { Reveal };
