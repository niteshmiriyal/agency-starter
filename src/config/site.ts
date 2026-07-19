export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: 'Agency Starter',
  description:
    'A premium, production-ready Next.js starter with Tailwind CSS, shadcn/ui, and Framer Motion.',
  /**
   * Hardcoded fallback origin. Real deployments set `NEXT_PUBLIC_SITE_URL`
   * instead — always read the resolved value via `getSiteUrl()`
   * (`@/lib/seo/site-url`), never this field directly.
   */
  url: 'https://example.com',
  locale: 'en_US',
  keywords: [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'agency starter',
  ],
  twitter: {
    handle: '@agencystarter',
  },
  organization: {
    legalName: 'Agency Starter',
    sameAs: ['https://github.com', 'https://twitter.com'],
  },
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],
  links: {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
  },
} as const;
