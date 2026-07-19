import { siteConfig } from '@/config/site';

/**
 * Single source of truth for the deployed site's canonical origin. Every
 * SEO helper (metadata, sitemap, robots, OG/Twitter images) resolves the
 * origin through this function rather than reading `process.env` or
 * `siteConfig.url` directly, so environment resolution lives in one place.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
}
