import { cn } from '@/lib/utils';
import { Section, type SectionProps } from '@/components/shared/section';

export type SplitSectionProps = Omit<SectionProps, 'size'> & {
  /** Secondary column content, typically a `MediaBlock`. Laid out beside `children` on `lg`+. */
  media?: React.ReactNode;
  /**
   * Which side `media` renders on at `lg`+. Also determines DOM order, so
   * smaller viewports stack in the same order (`start` stacks media above
   * `children`, `end` stacks it below). Defaults to `end`.
   */
  mediaPosition?: 'start' | 'end';
  size?: SectionProps['size'];
};

/**
 * Two-column content/media layout, generalizing the split-column shape
 * `Hero` composes ad hoc for its own use into a reusable primitive for any
 * section that pairs a content column with supporting media. Defaults to
 * `size="md"` (a standard section rhythm, not `Hero`'s `lg`); pass
 * `size="lg"` for a hero-adjacent moment. `Hero` itself is left as-is —
 * this is a new primitive alongside it, not a replacement. Server
 * Component.
 */
function SplitSection({
  className,
  containerClassName,
  media,
  mediaPosition = 'end',
  size = 'md',
  children,
  ...props
}: SplitSectionProps) {
  return (
    <Section
      size={size}
      className={className}
      containerClassName={cn(
        media && 'grid items-center gap-12 lg:grid-cols-2',
        containerClassName,
      )}
      {...props}
    >
      {mediaPosition === 'start' && media}
      {children}
      {mediaPosition === 'end' && media}
    </Section>
  );
}

export { SplitSection };
