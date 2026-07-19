import { cn } from '@/lib/utils';

export type Stat = {
  value: string;
  label: string;
};

export type StatsGridProps = React.HTMLAttributes<HTMLDivElement> & {
  stats: Stat[];
};

/**
 * Grid of numeral + label proof-point pairs. Server Component. Numerals
 * use tabular figures so values with differing digit counts still align
 * across the row (DESIGN_SYSTEM.md §1).
 */
function StatsGrid({ stats, className, ...props }: StatsGridProps) {
  return (
    <div
      data-slot="stats-grid"
      className={cn('grid grid-cols-2 gap-8 sm:grid-cols-4', className)}
      {...props}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-2 text-center"
        >
          <span className="text-4xl font-bold tracking-[-0.02em] tabular-nums">
            {stat.value}
          </span>
          <span className="text-muted-foreground text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export { StatsGrid };
