'use client';

import { motion, type Variants } from 'framer-motion';

import { cn } from '@/lib/utils';
import {
  motionDistance,
  motionDuration,
  motionEasing,
  motionViewport,
} from '@/lib/motion/tokens';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: motionDistance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.moderate, ease: motionEasing.enter },
  },
};

export type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's start. DESIGN_SYSTEM.md §8: 30–50ms, capped at ~8 items. */
  staggerDelay?: number;
};

/**
 * Owns the single viewport trigger and `staggerChildren` orchestration for
 * a group of `StaggerItem`s — one IntersectionObserver for the whole group
 * rather than one per item (a performance win, PROJECT_BLUEPRINT.md §12),
 * which is also the only way Framer's stagger timing works correctly. Cap
 * groups at roughly 8 items (DESIGN_SYSTEM.md §8); beyond that, animate the
 * group as a whole instead (e.g. `FadeIn` around the container).
 */
function Stagger({ children, className, staggerDelay = 0.05 }: StaggerProps) {
  return (
    <motion.div
      data-slot="stagger"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A single animated child of `Stagger`. Deliberately has no `initial` or
 * `whileInView` of its own — it inherits the active variant label from the
 * nearest `Stagger` ancestor and applies its own `hidden`/`visible` values
 * for it, which is what lets `staggerChildren` stagger these correctly.
 * Rendered outside a `Stagger` parent, it simply won't animate.
 */
function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      data-slot="stagger-item"
      variants={itemVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { Stagger, StaggerItem };
