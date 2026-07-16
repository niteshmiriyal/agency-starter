import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/container';

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
};

/**
 * Standard vertical rhythm scaffold for a page section, wrapping its
 * children in `Container` so section padding and content width are never
 * set ad hoc per page (DESIGN_SYSTEM.md §14).
 */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-16 sm:py-24', className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
