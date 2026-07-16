# Component Guidelines

**Internal Engineering Documentation — Agency Starter**
Status: Living document. Practical companion to [`PROJECT_BLUEPRINT.md`](./PROJECT_BLUEPRINT.md) §4 (Component Architecture) and [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Read those first for the _why_; this document is the _how_ for writing an individual component in this repository.

---

## 1. Where a Component Lives

Three tiers, strictly separated (`PROJECT_BLUEPRINT.md` §3–4). A component never imports "up" a tier.

| Tier        | Path                    | Knows about product?                  | Examples                                                        |
| ----------- | ----------------------- | ------------------------------------- | --------------------------------------------------------------- |
| Primitive   | `components/ui/`        | No — pure vocabulary                  | `Button`, `Input`, `Card`, `Dialog`, `Badge`, `Heading`, `Text` |
| Composition | `components/shared/`    | Layout-aware, not page-specific       | `Container`, `Section`, `FadeIn`                                |
| Chrome      | `components/layout/`    | Structural, appears on most/all pages | `Header`, `Footer`, `Navbar`, `NavLink`, `MobileMenu`, `FooterColumn`, `FooterLink` |
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

## 7. Checklist Before Adding a New `ui/` Primitive

- [ ] Does shadcn (or the underlying `@base-ui/react` package this project uses in place of Radix) already have this primitive? Adapt it; don't build from scratch (`PROJECT_BLUEPRINT.md` §5).
- [ ] Styled exclusively with semantic tokens — no raw hex, no arbitrary Tailwind color utilities.
- [ ] Default, hover, focus-visible, active, disabled states all implemented if the component is interactive.
- [ ] Server Component unless it has a concrete, stated reason to be a Client Component.
- [ ] JSDoc present on the exported component.
- [ ] No import from `components/shared/`, `components/layout/`, or any feature folder.
