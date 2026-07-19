# SEO Guide

**Internal Engineering Documentation — Agency Starter**
Practical companion to [`PROJECT_BLUEPRINT.md`](./PROJECT_BLUEPRINT.md) §11 (SEO Standards). That document describes the _why_; this is the _how_ for the SEO infrastructure that ships in `lib/seo/`, `config/routes.ts`, and the `app/` file-convention routes.

---

## 1. Setup

Nothing needs mounting — unlike the motion system, SEO infrastructure has no provider. `app/layout.tsx` calls `buildPageMetadata()` once for the root route and renders `<JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />` once, site-wide. Every other route calls the same helpers for its own metadata; there's no global setup step beyond that.

The canonical site origin (used everywhere a full URL is needed — canonical links, OG/Twitter URLs, the sitemap, robots.txt) is never read as `process.env.NEXT_PUBLIC_SITE_URL` directly. It's always resolved through `getSiteUrl()` (`lib/seo/site-url.ts`), which falls back to `siteConfig.url` when the env var is unset. Set `NEXT_PUBLIC_SITE_URL` per deployment — see `.env.example`.

## 2. Page metadata — `buildPageMetadata`

```ts
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Pricing',
  description: 'Plans for teams of every size.',
  path: '/pricing',
});
```

Every route that ships (per `PROJECT_BLUEPRINT.md` §11, "every route defines its own metadata") exports its own `metadata` built this way — title, description, canonical link, Open Graph, and Twitter card are derived together from `siteConfig` + the page's own `title`/`description`/`path`, so a page can never ship with only some of them filled in.

- `title` is a plain string for every route **except** the root layout, which passes `{ default, template }` so child routes' plain-string titles resolve through the `%s | Agency Starter` template automatically (this is how `app/layout.tsx` and `app/page.tsx` already work — see both files for the pattern).
- `path` defaults to `/` — always pass the route's actual path so the canonical link and Open Graph URL are correct.
- Pass `noIndex: true` for a route that should render but never be indexed (e.g. a thank-you page reached only after a form submit). It sets `robots: { index: false, follow: false }`; it does **not** remove the route from `config/routes.ts` for you — do that too, so `sitemap.ts` stays in sync.

## 3. Open Graph & Twitter images

`app/opengraph-image.tsx` and `app/twitter-image.tsx` generate a branded 1200×630 share image at request time from `siteConfig`, using Next's built-in `ImageResponse` (`next/og`) — no designed asset required, and the image can never drift out of sync with the site name/description because it's generated from the same config every other page uses.

A specific route can override the default by adding its own `opengraph-image.tsx` (and, if it should differ, `twitter-image.tsx`) inside that route's segment folder — Next's file-convention routing picks the closer file automatically. Only do this when a page's share image genuinely needs to differ (e.g. a blog post with its own title baked into the image); don't add per-route overrides speculatively.

## 4. Structured data — `lib/seo/json-ld.ts` + `JsonLd`

```tsx
import { JsonLd } from '@/components/shared/json-ld';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/json-ld';

<JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />;
```

`lib/seo/json-ld.ts` exports pure builder functions (`organizationJsonLd`, `websiteJsonLd`, `breadcrumbJsonLd`) that return plain, hand-typed schema.org objects — no `schema-dts` dependency; three small types are cheaper to own than a package for this. `components/shared/json-ld.tsx`'s `JsonLd` component renders whatever data it's given as a safely-escaped `<script type="application/ld+json">` tag.

- `organizationJsonLd()` and `websiteJsonLd()` are rendered **once**, in the root layout — they describe the site, not a specific page. Don't re-render them per route.
- `breadcrumbJsonLd(items)` is per-page and is generated automatically by `PageShell` (§5) when you pass it `breadcrumbs` — you generally won't call it directly.
- Adding a new schema type (e.g. `Service`, `FAQPage`, `LocalBusiness` — per `PROJECT_BLUEPRINT.md` §11) means adding one more hand-typed builder function to `json-ld.ts`, following the same shape as the existing three.

## 5. `PageShell` — the scaffold for non-home pages

```tsx
import { PageShell } from '@/components/shared/page-shell';

export default function PricingPage() {
  return (
    <PageShell breadcrumbs={[{ name: 'Pricing', path: '/pricing' }]}>
      <Section>...</Section>
    </PageShell>
  );
}
```

`PageShell` renders an accessible breadcrumb trail (`nav[aria-label="Breadcrumb"]`, native `<a>`s via `next/link`, `aria-current="page"` on the final crumb) plus its matching `BreadcrumbList` JSON-LD, then its `children`. It does not dictate section content — pages still compose `Section`/`Container`/motion primitives inside it exactly as before.

`breadcrumbs` is optional and omitted on the homepage (there's no useful trail to show). Reach for `PageShell` on the first real subpage a project adds — it isn't wired into `app/page.tsx` today because the homepage has nothing for it to do.

## 6. Sitemap & robots — `config/routes.ts`

```ts
// config/routes.ts
export const routes: RouteEntry[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
];
```

`app/sitemap.ts` maps this registry to absolute URLs (via `getSiteUrl()`) — there is no separate step to "add a page to the sitemap." `app/robots.ts` allows all crawling by default and points at `/sitemap.xml`.

**Adding a new indexable route is a three-step checklist:**

1. Add the route's `metadata` export via `buildPageMetadata` (§2).
2. Add an entry to `routes.ts` so it appears in the sitemap.
3. If it's a subpage (not the homepage), wrap its content in `PageShell` with its breadcrumb trail (§5).

A route intentionally excluded from indexing (a legal disclaimer page, a preview/staging route) should set `noIndex: true` in its metadata **and** be left out of `routes.ts` — both, not one or the other; `robots: noIndex` stops indexing, omitting it from the sitemap stops advertising it.

## 7. Content architecture

This starter does not (yet) have a CMS or MDX content layer — per `PROJECT_BLUEPRINT.md` §20, that stays deferred until a real engagement needs client-editable content. Until then, the convention is: a route's visible copy and its `metadata` description are two separate strings, written once each in the route file — don't derive one from the other (a good meta description is written for search results, not lifted verbatim from an on-page paragraph). Route groups (`(marketing)`, etc., per `PROJECT_BLUEPRINT.md` §3) are introduced only once a project has more than one distinct layout context, not speculatively for SEO's sake.

## 8. Quick reference: what to use when

| Situation                                          | Use                                                    |
| --------------------------------------------------- | ------------------------------------------------------ |
| Any new route                                       | `export const metadata = buildPageMetadata({...})`     |
| A subpage (not the homepage)                        | Wrap content in `PageShell` with `breadcrumbs`          |
| Site-wide structured data (Organization, WebSite)    | Already in `app/layout.tsx` — don't duplicate per-page |
| Page-specific structured data (FAQ, Service, etc.)   | Add a builder to `lib/seo/json-ld.ts`, render via `JsonLd` |
| A route that must never be indexed                  | `noIndex: true` in its metadata, and omit it from `routes.ts` |
| A route with a non-default share image               | Add an `opengraph-image.tsx` inside that route segment  |
