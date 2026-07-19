import { cn } from '@/lib/utils';

export type MediaBlockProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Insets media (an image/video, typically `next/image`, passed as
 * `children`) to a radius one step below its container, per
 * DESIGN_SYSTEM.md §3's nested-radius rule and §11 ("media inside a card is
 * inset to the card's radius minus 4–8px, never full-bleed with sharp
 * corners inside a rounded card") — generalized here for any container
 * (`SplitSection`, a feature card, a hero), not just `Card`. Server
 * Component; `children` supplies the actual media element so this stays a
 * pure layout wrapper with no opinion on image source or loading strategy.
 */
function MediaBlock({ className, children, ...props }: MediaBlockProps) {
  return (
    <div
      data-slot="media-block"
      className={cn(
        'overflow-hidden rounded-lg [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>video]:h-full [&>video]:w-full [&>video]:object-cover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { MediaBlock };
