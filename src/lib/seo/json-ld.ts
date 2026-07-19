import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/seo/site-url';

export type OrganizationJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  sameAs: string[];
};

export type WebSiteJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
};

export type BreadcrumbListJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
};

/** Site-wide `Organization` structured data, rendered once in the root layout. */
export function organizationJsonLd(): OrganizationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.legalName,
    url: getSiteUrl(),
    sameAs: [...siteConfig.organization.sameAs],
  };
}

/** Site-wide `WebSite` structured data, rendered once in the root layout. */
export function websiteJsonLd(): WebSiteJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: getSiteUrl(),
  };
}

/**
 * Per-page `BreadcrumbList` structured data. `path` entries are resolved to
 * absolute URLs against the canonical site origin.
 */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): BreadcrumbListJsonLd {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}
