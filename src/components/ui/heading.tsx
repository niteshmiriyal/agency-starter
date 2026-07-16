import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headingVariants = cva('text-balance text-foreground', {
  variants: {
    size: {
      xl: 'text-xl leading-[1.4] font-semibold',
      '2xl': 'text-2xl leading-[1.3] font-semibold',
      '3xl': 'text-3xl leading-[1.25] font-bold tracking-[-0.02em]',
      '4xl': 'text-4xl leading-[1.2] font-bold tracking-[-0.02em]',
      '5xl': 'text-5xl leading-[1.1] font-bold tracking-[-0.02em]',
      '6xl': 'text-6xl leading-[1.05] font-bold tracking-[-0.02em]',
      '7xl': 'text-7xl leading-none font-bold tracking-[-0.02em]',
    },
  },
  defaultVariants: {
    size: '4xl',
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Visual size each semantic heading level maps to when `size` is not set explicitly. */
const defaultSizeByLevel: Record<
  HeadingLevel,
  VariantProps<typeof headingVariants>['size']
> = {
  1: '5xl',
  2: '4xl',
  3: '3xl',
  4: '2xl',
  5: 'xl',
  6: 'xl',
};

export type HeadingProps = Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  'color'
> &
  VariantProps<typeof headingVariants> & {
    /**
     * Document heading level (`h1`–`h6`). Chosen for document structure,
     * not visual weight — pass `size` separately when the two must diverge
     * (DESIGN_SYSTEM.md §1: "semantic first, visual second").
     */
    level?: HeadingLevel;
  };

/**
 * Semantic heading primitive. Server Component — renders static markup
 * with no client-only behavior.
 */
function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      data-slot="heading"
      className={cn(
        headingVariants({ size: size ?? defaultSizeByLevel[level] }),
        className,
      )}
      {...props}
    />
  );
}

export { Heading, headingVariants };
