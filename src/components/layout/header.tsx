import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { buttonVariants } from '@/components/ui/button-variants';
import { Navbar, NavLink } from '@/components/layout/navbar';
import { MobileMenu } from '@/components/layout/mobile-menu';

/**
 * Site-wide header chrome. Composes `Navbar`/`NavLink`/`MobileMenu` with
 * `siteConfig` data — the one place in the nav group that knows about the
 * product, per COMPONENT_GUIDELINES.md §1. Server Component: the only
 * interactive piece, the mobile disclosure, lives inside `MobileMenu`, so
 * this component doesn't need a client boundary of its own.
 */
export function Header() {
  const navLinks = siteConfig.nav.map((item) => (
    <NavLink key={item.href} href={item.href}>
      {item.label}
    </NavLink>
  ));

  return (
    <Navbar
      logo={
        <Link href="/" className="text-base font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
      }
      actions={
        <Link href="#contact" className={buttonVariants()}>
          Get in touch
        </Link>
      }
      mobileMenu={
        <MobileMenu>
          {navLinks}
          <Link
            href="#contact"
            className={buttonVariants({ className: 'w-full' })}
          >
            Get in touch
          </Link>
        </MobileMenu>
      }
    >
      {navLinks}
    </Navbar>
  );
}
