import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/container';

export type NavLinkProps = React.ComponentProps<typeof Link> & {
  /**
   * Marks the link as representing the current route. The caller computes
   * this (e.g. via `usePathname` in a client wrapper) so `NavLink` itself
   * never needs a client boundary of its own.
   */
  isActive?: boolean;
};

/**
 * Styled navigation link shared by `Navbar` and `MobileMenu`. Server
 * Component — has no interactivity beyond the native anchor.
 */
function NavLink({ className, isActive, ...props }: NavLinkProps) {
  return (
    <Link
      data-slot="nav-link"
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'text-sm font-medium transition-colors',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}

export type NavbarProps = {
  /** Brand mark, typically a `next/link` to `/` with the site name or logo. */
  logo: React.ReactNode;
  /** Desktop nav links (e.g. a list of `NavLink`s), hidden below `md`. */
  children?: React.ReactNode;
  /** Desktop-only trailing action (e.g. a CTA button), hidden below `md`. */
  actions?: React.ReactNode;
  /** A `MobileMenu` instance rendering the same links/actions for small viewports. */
  mobileMenu?: React.ReactNode;
  className?: string;
};

/**
 * Sticky top navigation chrome. Server Component — all interactivity lives
 * in `mobileMenu` (a `MobileMenu` instance), so `Navbar` never needs a
 * client boundary of its own. `position: sticky` on the root also serves
 * as the positioned ancestor `MobileMenu`'s dropdown panel anchors to, so
 * the panel can render full-width without the header growing in height.
 */
function Navbar({
  logo,
  children,
  actions,
  mobileMenu,
  className,
}: NavbarProps) {
  return (
    <header
      data-slot="navbar"
      className={cn(
        'border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md',
        className,
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {logo}

        {children && (
          <nav
            data-slot="navbar-links"
            className="hidden items-center gap-8 md:flex"
          >
            {children}
          </nav>
        )}

        {actions && <div className="hidden md:block">{actions}</div>}

        {mobileMenu}
      </Container>
    </header>
  );
}

export { Navbar, NavLink };
