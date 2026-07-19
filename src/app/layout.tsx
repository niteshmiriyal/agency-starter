import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { siteConfig } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/shared/json-ld';
import { MotionProvider } from '@/components/shared/motion/motion-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = buildPageMetadata({
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  path: '/',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <MotionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
