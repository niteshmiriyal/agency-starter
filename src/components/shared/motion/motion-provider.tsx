'use client';

import { MotionConfig } from 'framer-motion';

import { defaultMotionTransition } from '@/lib/motion/tokens';

export type MotionProviderProps = {
  children: React.ReactNode;
};

/**
 * Root-level Framer Motion configuration. Sets the tokenized default
 * transition (DESIGN_SYSTEM.md §8) so individual primitives don't need to
 * repeat duration/easing, and sets `reducedMotion="user"` so every `motion`
 * component in the tree automatically drops transform-based animation
 * (x/y/scale/rotate) for users who prefer reduced motion while opacity
 * fades still play — the accessibility fallback Blueprint §9/§10 require,
 * enforced once here rather than reimplemented per primitive. Mounted once
 * in the root layout; the `"use client"` boundary is isolated to this file
 * so `app/layout.tsx` itself stays a Server Component.
 */
function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig transition={defaultMotionTransition} reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

export { MotionProvider };
