import { cn } from '@/lib/utils';

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Enforces the product's shared max-width and horizontal gutter
 * (DESIGN_SYSTEM.md §6) so every page draws from the same content grid.
 */
export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
