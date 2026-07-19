import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/seo/site-url';

export type PageMetadataOptions = {
  /** Plain page title, or a `{ default, template }` pair for the root layout. */
  title: string | { default: string; template: string };
  description: string;
  /** Route path this metadata belongs to, e.g. `/pricing`. Defaults to `/`. */
  path?: string;
  /** Excludes the page from search indexing when true. */
  noIndex?: boolean;
};

/**
 * Builds a Next.js `Metadata` object (title, description, canonical,
 * Open Graph, Twitter) from `siteConfig` + the page's own inputs, so every
 * route produces consistent, complete metadata without re-deriving it per
 * file. See docs/SEO_GUIDE.md.
 */
export function buildPageMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(path, siteUrl).toString();
  const titleText = typeof title === 'string' ? title : title.default;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [...siteConfig.keywords],
    openGraph: {
      title: titleText,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      site: siteConfig.twitter.handle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
