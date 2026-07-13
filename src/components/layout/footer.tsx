import Link from 'next/link';
import { GitBranch, Globe } from 'lucide-react';

import { siteConfig } from '@/config/site';
import { Container } from '@/components/shared/container';

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
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
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
