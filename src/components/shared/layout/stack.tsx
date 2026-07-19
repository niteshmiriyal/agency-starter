import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const stackVariants = cva('flex flex-col', {
  variants: {
    space: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
      12: 'gap-12',
      16: 'gap-16',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    space: 4,
    align: 'stretch',
  },
});

export type StackProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof stackVariants>;

/**
 * Vertical layout primitive: a flex column with a spacing-scale `gap`
 * (DESIGN_SYSTEM.md §5) instead of an arbitrary one-off gap utility.
 * Server Component — purely structural, no client boundary.
 */
function Stack({ className, space, align, ...props }: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn(stackVariants({ space, align, className }))}
      {...props}
    />
  );
}

export { Stack, stackVariants };
