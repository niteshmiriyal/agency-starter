export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: 'Agency Starter',
  description:
    'A premium, production-ready Next.js starter with Tailwind CSS, shadcn/ui, and Framer Motion.',
  url: 'https://example.com',
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
