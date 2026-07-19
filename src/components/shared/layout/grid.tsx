import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const gridVariants = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      12: 'grid-cols-12',
    },
    gap: {
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 8,
  },
});

export type GridProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof gridVariants>;

/**
 * Responsive grid primitive generalizing the column-collapse pattern
 * (DESIGN_SYSTEM.md §6: 12-col desktop, proportional collapse on smaller
 * viewports) so a page-specific grid (e.g. `FeatureGrid`'s hand-rolled
 * classes) isn't the only place this shape lives. `cols` describes the
 * desktop column count; each preset already encodes its own mobile/tablet
 * collapse. Server Component.
 */
function Grid({ className, cols, gap, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(gridVariants({ cols, gap, className }))}
      {...props}
    />
  );
}

export { Grid, gridVariants };
