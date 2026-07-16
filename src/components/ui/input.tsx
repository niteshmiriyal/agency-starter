'use client';

import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/utils';

export type InputProps = InputPrimitive.Props;

/**
 * Single-line text input. Client Component because the underlying Base UI
 * primitive manages focus, validation, and Field integration in the browser.
 */
function Input({ className, ...props }: InputProps) {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(
        'border-input selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/20 focus-visible:ring-3',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 aria-invalid:ring-3',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
