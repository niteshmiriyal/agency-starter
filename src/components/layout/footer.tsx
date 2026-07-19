import Link from 'next/link';
import { GitBranch, Globe } from 'lucide-react';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/shared/container';

export type FooterLinkProps = React.ComponentProps<typeof Link>;

/**
 * Styled footer link shared by `Footer`'s own nav row and `FooterColumn`.
 * Server Component — no interactivity beyond the native anchor.
 */
function FooterLink({ className, ...props }: FooterLinkProps) {
  return (
    <Link
      data-slot="footer-link"
      className={cn(
        'text-muted-foreground hover:text-foreground text-sm font-medium transition-colors',
        className,
      )}
      {...props}
    />
  );
}

export type FooterColumnProps = {
  /** Column heading (e.g. "Product", "Company", "Resources"). */
  title: string;
  /** `FooterLink`s belonging to this column. */
  children: React.ReactNode;
  className?: string;
};

/**
 * A titled group of `FooterLink`s. Lets `Footer` support the multi-column
 * layout premium marketing sites need, beyond a single flat nav row.
 */
function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div
      data-slot="footer-column"
      className={cn('flex flex-col gap-3', className)}
    >
      <span className="text-foreground text-sm font-semibold">{title}</span>
      <nav className="flex flex-col gap-2">{children}</nav>
    </div>
  );
}

/**
 * Site-wide footer chrome: brand, copyright, primary nav row, and social
 * links, all driven by `siteConfig`. Server Component. Consumers building
 * a richer multi-column footer can render `FooterColumn`/`FooterLink`
 * directly inside `Footer` instead of relying on this default nav row.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/40 border-t">
      <Container className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-sm font-semibold tracking-tight">
            {siteConfig.name}
          </span>
          <p className="text-muted-foreground text-sm">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <nav className="flex items-center gap-6">
          {siteConfig.nav.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitBranch className="size-5" />
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="size-5" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}

export { FooterColumn, FooterLink };
