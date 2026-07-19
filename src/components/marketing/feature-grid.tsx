import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type FeatureGridProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Responsive grid for `FeatureCard`s (1 col mobile → 2 col `sm` → 3 col
 * `lg`). Server Component.
 */
function FeatureGrid({ className, ...props }: FeatureGridProps) {
  return (
    <div
      data-slot="feature-grid"
      className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...props}
    />
  );
}

export type FeatureCardProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> & {
  /** Icon component from `lucide-react`, rendered at `icon-lg` per DESIGN_SYSTEM.md §13. */
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Icon + title + description card for a `FeatureGrid`. Composes the `ui`
 * tier `Card` family rather than hand-rolled markup, so feature cards
 * share the same surface/border/radius treatment as every other card in
 * the product (DESIGN_SYSTEM.md §11).
 */
function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      data-slot="feature-card"
      className={cn('h-full', className)}
      {...props}
    >
      <CardHeader>
        <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export { FeatureGrid, FeatureCard };
