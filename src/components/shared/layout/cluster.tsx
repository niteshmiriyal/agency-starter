import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const clusterVariants = cva('flex flex-wrap items-center', {
  variants: {
    space: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    space: 3,
    justify: 'start',
  },
});

export type ClusterProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof clusterVariants>;

/**
 * Horizontal layout primitive for groups that must wrap gracefully (tag
 * lists, inline actions, badge rows) — a flex-wrap row with a
 * spacing-scale `gap` (DESIGN_SYSTEM.md §5). Server Component.
 */
function Cluster({ className, space, justify, ...props }: ClusterProps) {
  return (
    <div
      data-slot="cluster"
      className={cn(clusterVariants({ space, justify, className }))}
      {...props}
    />
  );
}

export { Cluster, clusterVariants };
