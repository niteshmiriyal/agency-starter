import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with `clsx`, then resolves conflicting Tailwind
 * utilities with `tailwind-merge` so the last conflicting class wins.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
