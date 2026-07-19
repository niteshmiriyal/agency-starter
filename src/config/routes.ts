export type RouteEntry = {
  /** Route path, always leading with `/` (e.g. `/`, `/pricing`). */
  path: string;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Relative priority for search engines, 0–1. */
  priority?: number;
};

/**
 * Registry of every route intended for search-engine indexing. `sitemap.ts`
 * maps this list to absolute URLs — adding a new indexable page means
 * adding one entry here (per docs/SEO_GUIDE.md).
 */
export const routes: RouteEntry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
];
