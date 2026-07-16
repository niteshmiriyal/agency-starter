import { Section, type SectionProps } from '@/components/shared/section';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export type CTASectionProps = SectionProps & {
  title: string;
  description?: string;
  /** Primary (and optional secondary) action — typically `Button`/`buttonVariants` links. */
  actions: React.ReactNode;
};

/**
 * Full-bleed band pairing a heading, optional description, and one or more
 * actions — the final-conversion moment on a marketing page. Server
 * Component, composed from `Section`/`Heading`/`Text` plus whatever action
 * elements the consumer passes in (no button opinion of its own).
 */
function CTASection({
  title,
  description,
  actions,
  className,
  containerClassName,
  ...props
}: CTASectionProps) {
  return (
    <Section className={className} containerClassName={containerClassName} {...props}>
      <div
        data-slot="cta-section"
        className="border-border bg-card mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border p-10 text-center sm:p-16"
      >
        <Heading level={2} size="4xl">
          {title}
        </Heading>
        {description && (
          <Text size="lg" tone="muted" className="max-w-md">
            {description}
          </Text>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      </div>
    </Section>
  );
}

export { CTASection };
