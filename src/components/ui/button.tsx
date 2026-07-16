'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

/**
 * Primary interactive action element. Client Component because the
 * underlying Base UI primitive attaches pointer/keyboard handlers and
 * interactive data attributes that only resolve in the browser. To style a
 * plain link as a button from a Server Component, use `buttonVariants`
 * from `@/components/ui/button-variants` instead of rendering `Button`.
 */
function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
