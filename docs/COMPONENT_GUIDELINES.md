# Component Guidelines

**Internal Engineering Documentation — Agency Starter**
Status: Living document. Practical companion to [`PROJECT_BLUEPRINT.md`](./PROJECT_BLUEPRINT.md) §4 (Component Architecture) and [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Read those first for the _why_; this document is the _how_ for writing an individual component in this repository.

---

## 1. Where a Component Lives

Three tiers, strictly separated (`PROJECT_BLUEPRINT.md` §3–4). A component never imports "up" a tier.

| Tier        | Path                    | Knows about product?                  | Examples                                                                                                                            |
| ----------- | ----------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Primitive   | `components/ui/`        | No — pure vocabulary                  | `Button`, `Input`, `Card`, `Dialog`, `Badge`, `Heading`, `Text`                                                                     |
| Composition | `components/shared/`    | Layout-aware, not page-specific       | `Container`, `Section`, `FadeIn`                                                                                                    |
| Chrome      | `components/layout/`    | Structural, appears on most/all pages | `Header`, `Footer`, `Navbar`, `NavLink`, `MobileMenu`, `FooterColumn`, `FooterLink`                                                 |
| Feature     | `components/[feature]/` | Page/feature-specific                 | `components/pricing/plan-card.tsx`, `components/marketing/hero.tsx` (`Hero`, `FeatureGrid`, `LogoCloud`, `StatsGrid`, `CTASection`) |

If you're unsure which tier a new component belongs in, ask: _would this make sense in a completely different product with zero modification?_ If yes → `ui/`. If it composes `ui/` primitives into a reusable layout shape → `shared/`. If it only makes sense on one page or feature → the feature folder.

## 2. Anatomy of a Primitive (`components/ui/`)

Every file in `components/ui/` follows the same shape, established by `button.tsx`:

1. **Imports** — the underlying headless primitive (from `@base-ui/react/*`) where one exists, `cva` for variant styling, `cn` from `@/lib/utils`.
2. **Variants** — a `cva(...)` call defining the style axes (`variant`, `size`, etc.) using semantic design tokens only (`bg-primary`, never `bg-blue-600`).
3. **Component function** — a named function component, destructuring `className` and variant props first, spreading the rest onto the underlying element. Every root element carries a `data-slot="<name>"` attribute for styling hooks and testability.
4. **Exports** — named exports only (`export { Button, buttonVariants }`), no default export. This keeps `components/ui/index.ts` barrel exports (if introduced) unambiguous and matches the existing convention in this folder.

```tsx
function Widget({ className, variant = 'default', ...props }: WidgetProps) {
  return (
    <div
      data-slot="widget"
      className={cn(widgetVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Widget, widgetVariants };
```

## 3. Server vs. Client Components

**Server by default.** A component only becomes a Client Component when it genuinely needs interactivity, browser APIs, or local state — and `"use client"` is declared at the narrowest possible file, never hoisted to a page or layout (`PROJECT_BLUEPRINT.md` §4).

In this repo:

- `Button` is a Client Component — it wraps `@base-ui/react/button`, which attaches pointer/keyboard event handlers and manages interactive data attributes (`data-pressed`, `data-focus-visible`, etc.) that only resolve client-side.
- `Input` and `Dialog` are likewise Client Components for the same reason — they wrap interactive Base UI primitives.
- `Container`, `Section`, `Heading`, `Text`, `Card`, `Badge` are Server Components — they render static markup with no client-only behavior. They accept `children`, which may themselves be Client Components, without becoming client themselves.
- `MobileMenu` is a Client Component — it owns the mobile nav disclosure's open/close state locally. It's kept in its own file (`mobile-menu.tsx`), separate from `Navbar`/`NavLink` (`navbar.tsx`), because `"use client"` applies at the file level — mixing it into the same file would force those Server Components client too, the same reason `button.tsx` is split from `button-variants.ts`.
- `Navbar`, `NavLink`, `Header`, `Hero`, `HeroContent`, `HeroActions`, `HeroMedia`, `FeatureGrid`, `FeatureCard`, `LogoCloud`, `StatsGrid`, `CTASection`, `Footer`, `FooterColumn`, and `FooterLink` are all Server Components — `Header` in particular is a Server Component precisely because the only interactive piece of the nav (the mobile disclosure) is delegated to `MobileMenu`.

When adding a new primitive, default to Server. Add `"use client"` only when the compiler or a runtime error tells you the primitive needs it (state, effects, event handlers that must run in the browser, or a headless library that requires a client boundary).

## 4. JSDoc

Every exported component and non-trivial exported function carries a JSDoc block immediately above it:

```tsx
/**
 * Renders a semantic heading whose visual size can diverge from its
 * semantic level, per DESIGN_SYSTEM.md §1 ("semantic first, visual second").
 */
function Heading({ level = 2, size, ...props }: HeadingProps) { ... }
```

- Describe _why_ the component exists or a non-obvious constraint it satisfies — not a restatement of the prop types (those are already visible via TypeScript).
- Document a prop inline only when its purpose isn't obvious from its name and type (`PROJECT_BLUEPRINT.md` §4: "self-documenting through prop names and types").
- Skip JSDoc on trivial internal helpers (e.g., a one-line `cn()` re-export) unless the _why_ isn't obvious from the code.

## 5. Storybook-Ready Structure

Storybook itself is not yet installed in this starter (tracked in `PROJECT_BLUEPRINT.md` §20, Future Roadmap). Until it is, every primitive is still built so a story can be added later with zero refactoring:

- **Props fully describe rendered output.** No primitive reads from context, global state, or module-level singletons to decide what to render — everything comes in through props.
- **No side effects on render.** Primitives don't fetch data, write to storage, or fire analytics as a side effect of mounting.
- **A named `<ComponentName>Props` type is exported (or at least defined) for every component**, so a story file can import and reuse it directly instead of redeclaring shapes.
- **Variants are enumerable.** Anything driven by `cva` has a finite, inspectable set of `variants`, which maps directly to Storybook `argTypes` controls without extra mapping code.
- **Default exports are avoided** in favor of named exports, so a future `component-name.stories.tsx` can import exactly what it needs without relying on file-path-based default naming.

## 6. Naming & File Conventions

Follow `PROJECT_BLUEPRINT.md` §14–15 exactly:

- File: kebab-case (`heading.tsx`), named for the component it exports.
- Component: PascalCase (`Heading`), matching the concept.
- Props type: `<ComponentName>Props` (`HeadingProps`).
- One component family per file (a primitive and its tightly-coupled sub-parts — e.g. `Card`, `CardHeader`, `CardTitle` — share a file; unrelated primitives do not).

## 7. Motion & Layout Primitives (`components/shared/motion/`, `components/shared/layout/`)

Sprint 3 added a motion system and a layout system, both living in the `shared/` tier (composed, product-aware, reusable across any page). Usage-level documentation and examples live in [`MOTION_GUIDE.md`](./MOTION_GUIDE.md); this section covers the architecture.

**Motion — one engine, thin presets, one deliberate exception.**

- `MotionInView` (`components/shared/motion/motion-in-view.tsx`) is the internal, single-node viewport-trigger engine. `FadeIn`, `SlideUp`, and `ScaleIn` are each a ~10-line preset over it, differing only in their `variants` object — the viewport trigger (`once: true`, per DESIGN_SYSTEM.md §9) lives exactly once. `MotionInView` is not part of the public barrel (`components/shared/motion/index.ts`); import it directly only when a new single-node entrance genuinely needs the engine.
- `Reveal` and `Stagger`/`StaggerItem` are **not** built on `MotionInView` — both animate more than one node under a single shared trigger (a curtain + content; a group of items), a shape the single-node engine doesn't fit. Don't force a future multi-node primitive through `MotionInView` either; give it its own trigger, matching this precedent.
- **Reduced motion is handled once, globally**, not per component. `MotionProvider` (mounted in `app/layout.tsx`) sets Framer's `MotionConfig reducedMotion="user"`, which strips transform-based variant values (`x`/`y`/`scale`/`rotate`) tree-wide for users who prefer reduced motion, leaving opacity fades intact. No primitive in `shared/motion/` implements its own `prefers-reduced-motion` check — if you find yourself adding one, the tree-wide mechanism has likely broken down and that's the bug to fix, not the check to add.
- Every file in `shared/motion/` carries `"use client"` — this is the only client boundary this sprint introduces. `shared/layout/` primitives are all Server Components; a layout primitive may wrap a motion primitive as `children` without itself becoming client (the same boundary pattern `Section`/`Container` already rely on).
- Motion tokens (durations, easings, distances, the shared viewport config) live in `lib/motion/tokens.ts` — pure constants, no JSX, per §3's `lib/` rule. Framer Motion consumes numeric seconds and cubic-bezier arrays, not CSS custom properties, so these can't simply reuse `globals.css` tokens.
- `Presence` (`components/shared/motion/presence.tsx`) wraps `AnimatePresence` purely so exit animations are reached through the same `@/components/shared/motion` surface as entrances, not because it adds behavior.

**Layout — composition over configuration, no retrofit of existing components.**

- `Stack`, `Cluster`, `Grid`, `SplitSection`, and `MediaBlock` generalize shapes that `Section`/`Container` (spacing rhythm), `FeatureGrid` (a hand-rolled grid), and `Hero` (a hand-rolled two-column split) already each implement inline for their own use. Deliberately, none of those existing components were refactored to use the new primitives in this sprint — that would be an unrequested change to working feature components. Consolidating them is a tracked future opportunity, not a decision made here.
- All five are Server Components with no interactivity; style axes (`space`, `align`, `justify`, `cols`, `gap`) are expressed via `cva` so they're enumerable and map directly to future Storybook `argTypes`, per §5.

## 8. SEO Primitives (`components/shared/json-ld.tsx`, `components/shared/page-shell.tsx`)

Sprint 4 added two more `shared/`-tier primitives, alongside the metadata/JSON-LD builder functions in `lib/seo/`. Usage-level documentation and examples live in [`SEO_GUIDE.md`](./SEO_GUIDE.md); this section covers the architecture.

- `JsonLd` (`components/shared/json-ld.tsx`) takes a `data: object | object[]` prop and renders it as a `<script type="application/ld+json">` tag, escaping angle brackets in the serialized output so a value can never break out of the script tag. It has no opinion about what schema.org shape it's given — that logic lives in the pure builder functions in `lib/seo/json-ld.ts` (`organizationJsonLd`, `websiteJsonLd`, `breadcrumbJsonLd`), matching the split between `lib/motion/tokens.ts` (data) and the motion primitives (rendering) in §7.
- `PageShell` (`components/shared/page-shell.tsx`) is the scaffold for non-home marketing pages: an optional accessible breadcrumb trail (native `next/link` anchors, `aria-current="page"` on the active crumb) plus its matching `BreadcrumbList` JSON-LD, rendered via `JsonLd`. It does not dictate section content — a page still composes `Section`/`Container`/motion primitives inside `PageShell`'s `children`, the same way pages already compose those without it.
- Both are Server Components; neither introduces a client boundary.
- `PageShell` is deliberately **not** wired into `app/page.tsx` — the homepage has no breadcrumb trail to show, and existing page content is not restructured onto new primitives without being asked (this repo's homepage is treated as a working sandbox, not something to migrate opportunistically). It's ready for the first real subpage a project adds.

## 9. Checklist Before Adding a New `ui/` Primitive

- [ ] Does shadcn (or the underlying `@base-ui/react` package this project uses in place of Radix) already have this primitive? Adapt it; don't build from scratch (`PROJECT_BLUEPRINT.md` §5).
- [ ] Styled exclusively with semantic tokens — no raw hex, no arbitrary Tailwind color utilities.
- [ ] Default, hover, focus-visible, active, disabled states all implemented if the component is interactive.
- [ ] Server Component unless it has a concrete, stated reason to be a Client Component.
- [ ] JSDoc present on the exported component.
- [ ] No import from `components/shared/`, `components/layout/`, or any feature folder.
