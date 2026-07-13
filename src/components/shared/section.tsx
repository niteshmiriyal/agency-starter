import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/container';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
};

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
