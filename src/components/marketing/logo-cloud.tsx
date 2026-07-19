import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/text';

export type LogoCloudLogo = {
  name: string;
  src: string;
  href?: string;
  width?: number;
  height?: number;
};

export type LogoCloudProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Optional eyebrow label above the logo row (e.g. "Trusted by teams at"). */
  label?: string;
  logos: LogoCloudLogo[];
};

/**
 * Row of client/partner logos with an optional eyebrow label. Server
 * Component. Each logo renders via `next/image` with explicit dimensions
 * to prevent layout shift (DESIGN_SYSTEM.md §12), and every image carries
 * its own accessible `alt` (§16) — decorative-only imagery is not assumed.
 */
function LogoCloud({ label, logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      data-slot="logo-cloud"
      className={cn('flex flex-col items-center gap-8', className)}
      {...props}
    >
      {label && (
        <Text size="sm" tone="muted" className="text-center font-medium">
          {label}
        </Text>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => {
          const image = (
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width ?? 120}
              height={logo.height ?? 32}
              className="h-8 w-auto object-contain grayscale opacity-60 transition-opacity duration-200 hover:opacity-100"
            />
          );

          return (
            <div key={logo.name} className="shrink-0">
              {logo.href ? (
                <Link href={logo.href} aria-label={logo.name}>
                  {image}
                </Link>
              ) : (
                image
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { LogoCloud };
