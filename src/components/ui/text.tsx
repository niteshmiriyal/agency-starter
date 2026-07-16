import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.5]',
      base: 'text-base leading-[1.6]',
      lg: 'text-lg leading-[1.6]',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'base',
    tone: 'default',
  },
});

type TextElement = 'p' | 'span' | 'div' | 'label';

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
  VariantProps<typeof textVariants> & {
    /** HTML element to render. Defaults to `p` for body copy. */
    as?: TextElement;
  };

/**
 * Body copy primitive. Server Component — renders static markup with no
 * client-only behavior. Maps to the fixed type scale in DESIGN_SYSTEM.md
 * §1 rather than allowing arbitrary font sizes.
 */
function Text({ as: Tag = 'p', size, tone, className, ...props }: TextProps) {
  return (
    <Tag
      data-slot="text"
      className={cn(textVariants({ size, tone }), className)}
      {...props}
    />
  );
}

export { Text, textVariants };
