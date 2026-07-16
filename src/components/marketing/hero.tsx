import { cn } from '@/lib/utils';
import { Section, type SectionProps } from '@/components/shared/section';

export type HeroProps = Omit<SectionProps, 'size'> & {
  /** Supporting visual, typically a `HeroMedia` instance, laid out beside `children` on `lg`+. */
  media?: React.ReactNode;
};

/**
 * Top-of-page hero section. Composes `Section` at the `lg` rhythm tier
 * (DESIGN_SYSTEM.md §15: hero content sits within `section-lg` padding).
 * Server Component. When `media` is supplied, `children` (typically
 * `HeroContent`) and `media` (a `HeroMedia` instance) lay out side by side
 * on `lg`+; DOM order keeps content before media so smaller viewports
 * stack with the visual below the content, per §15's mobile rule.
 */
function Hero({
  className,
  containerClassName,
  media,
  children,
  ...props
}: HeroProps) {
  return (
    <Section
      size="lg"
      className={className}
      containerClassName={cn(
        media && 'grid items-center gap-12 lg:grid-cols-2',
        containerClassName,
      )}
      {...props}
    >
      {children}
      {media}
    </Section>
  );
}

export type HeroContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Groups a hero's eyebrow/heading/subhead/actions with the tight internal
 * rhythm from DESIGN_SYSTEM.md §15 (`space-4`–`space-6`), as one visual
 * unit against the section's outer whitespace. Defaults to left-aligned
 * (the common layout when paired with `HeroMedia`); pass `className` to
 * center a single-column hero instead.
 */
function HeroContent({ className, ...props }: HeroContentProps) {
  return (
    <div
      data-slot="hero-content"
      className={cn('flex flex-col items-start gap-6 text-left', className)}
      {...props}
    />
  );
}

export type HeroActionsProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Lays out a hero's primary (and optional secondary) CTA — row on `sm`+,
 * stacked full-width below that, per DESIGN_SYSTEM.md §15.
 */
function HeroActions({ className, ...props }: HeroActionsProps) {
  return (
    <div
      data-slot="hero-actions"
      className={cn('flex flex-col gap-3 sm:flex-row', className)}
      {...props}
    />
  );
}

export type HeroMediaProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Positions a hero's supporting visual (an image, illustration, or product
 * shot passed as `children`, typically via `next/image`). No animation is
 * wired up here — the stable `data-slot` hook lets a future `FadeIn` wrap
 * this with zero internal refactor.
 */
function HeroMedia({ className, ...props }: HeroMediaProps) {
  return (
    <div data-slot="hero-media" className={cn('w-full', className)} {...props} />
  );
}

export { Hero, HeroContent, HeroActions, HeroMedia };
