'use client';

import { AnimatePresence, type AnimatePresenceProps } from 'framer-motion';

export type PresenceProps = AnimatePresenceProps;

/**
 * Thin, conventionally-named wrapper around Framer's `AnimatePresence` so
 * exit animations (a closing panel, a dismissed toast, a swapped section)
 * are reached through the same `@/components/shared/motion` import surface
 * as every entrance primitive, rather than importing directly from
 * `framer-motion` at each call site. Defaults `mode` to `"wait"` — the
 * safer default for single-child swaps, since it waits for the outgoing
 * element to finish exiting before the incoming one enters, avoiding
 * layout overlap; pass `mode="popLayout"` or `"sync"` explicitly for
 * multi-child lists.
 */
function Presence({ mode = 'wait', ...props }: PresenceProps) {
  return <AnimatePresence mode={mode} {...props} />;
}

export { Presence };
