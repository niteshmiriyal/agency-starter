import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { breadcrumbJsonLd } from '@/lib/seo/json-ld';
import { Container } from '@/components/shared/container';
import { JsonLd } from '@/components/shared/json-ld';

export type PageShellBreadcrumb = {
  name: string;
  path: string;
};

export type PageShellProps = {
  /** Trail from home to the current page. Omit on pages with no useful trail (e.g. the homepage). */
  breadcrumbs?: PageShellBreadcrumb[];
  className?: string;
  children: React.ReactNode;
};

/**
 * Scaffold for non-home marketing pages: renders an accessible breadcrumb
 * trail plus its matching `BreadcrumbList` JSON-LD when `breadcrumbs` is
 * provided, then the page's own content. Doesn't dictate section content —
 * pages still compose `Section`/`Container` as usual inside `children`.
 */
export function PageShell({ breadcrumbs, className, children }: PageShellProps) {
  return (
    <div className={className}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <>
          <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
          <Container className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm">
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <li key={crumb.path} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <ChevronRight
                          aria-hidden="true"
                          className="size-3.5 shrink-0"
                        />
                      )}
                      {isLast ? (
                        <span aria-current="page" className="text-foreground font-medium">
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          href={crumb.path}
                          className="hover:text-foreground transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </Container>
        </>
      )}
      {children}
    </div>
  );
}
