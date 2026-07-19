'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/container';

export type MobileMenuProps = {
  /** Nav links and any CTA to render inside the collapsible panel. */
  children: React.ReactNode;
  className?: string;
};

/**
 * Mobile navigation disclosure: a toggle button plus a collapsible panel
 * anchored below it. Kept in its own file (separate from `Navbar`/`NavLink`
 * in `navbar.tsx`) because `"use client"` applies at the file level — this
 * is the only piece of the nav group that needs a client boundary, so it's
 * isolated the same way `button.tsx` is split from `button-variants.ts`.
 *
 * Owns the open/close state locally so `Navbar` and `Header` don't need to
 * be Client Components themselves. The panel is absolutely positioned,
 * anchored to the nearest positioned ancestor (`Navbar`'s sticky
 * `<header>`), so it can span full width without the header growing in
 * height while open. Closes on any interior click (e.g. selecting a link).
 */
function MobileMenu({ children, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-slot="mobile-menu" className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="text-foreground inline-flex items-center justify-center rounded-md p-2"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        className={cn(
          'border-border/40 bg-background/80 absolute inset-x-0 top-full overflow-hidden border-b backdrop-blur-md',
          isOpen ? 'max-h-64' : 'max-h-0 border-b-0',
          'transition-[max-height] duration-200 ease-in-out',
          className,
        )}
      >
        <Container
          className="flex flex-col gap-4 py-4"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </Container>
      </div>
    </div>
  );
}

export { MobileMenu };
