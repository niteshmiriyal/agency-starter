import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/container';

/** Vertical rhythm tiers from DESIGN_SYSTEM.md §14 (section-sm/md/lg), each halved below `sm`. */
const sectionPaddingBySize = {
  sm: 'py-8 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-16 sm:py-32',
} as const;

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
  /**
   * Vertical rhythm tier (DESIGN_SYSTEM.md §14). Use `lg` for sections
   * adjacent to a hero, `sm` for compact sections. Defaults to `md`, the
   * standard marketing section rhythm.
   */
  size?: keyof typeof sectionPaddingBySize;
};

/**
 * Standard vertical rhythm scaffold for a page section, wrapping its
 * children in `Container` so section padding and content width are never
 * set ad hoc per page (DESIGN_SYSTEM.md §14).
 */
export function Section({
  className,
  containerClassName,
  size = 'md',
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionPaddingBySize[size], className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
