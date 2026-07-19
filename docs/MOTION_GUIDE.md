# Motion Guide

**Internal Engineering Documentation — Agency Starter**
Practical companion to [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) §8 (Motion Principles) and [`COMPONENT_GUIDELINES.md`](./COMPONENT_GUIDELINES.md). Those documents describe the _why_ and the architecture; this is the _how_ for using the motion primitives that ship in `components/shared/motion/`.

---

## 1. Setup

A single `MotionProvider` (`components/shared/motion/motion-provider.tsx`) is mounted once, in `app/layout.tsx`, wrapping the whole page tree. It configures Framer Motion's `MotionConfig` with two things:

- **A tokenized default `transition`** (`duration-moderate` / 300ms, `ease-out`) — every primitive below inherits this unless it explicitly overrides it, so duration/easing is never retyped per component.
- **`reducedMotion="user"`** — this is the accessibility mechanism for the entire system. When a visitor has `prefers-reduced-motion: reduce` set, Framer Motion automatically strips any transform-based animation (`x`, `y`, `scale`, `rotate`) from every `motion` component in the tree, while leaving opacity animations intact. This is enforced **once, globally** — no individual primitive implements its own reduced-motion check. This is why none of the primitives below take a "disable motion" prop: there's nothing for them to opt into or out of.

You should never need to render `MotionProvider` yourself outside the root layout, and you should never wrap a second `MotionConfig` around a subtree unless a page genuinely needs a different default transition (rare — prefer overriding the specific primitive's props instead).

## 2. Motion tokens

`lib/motion/tokens.ts` is the canonical source for every duration, easing curve, and travel distance, mirroring `DESIGN_SYSTEM.md` §8:

| Export                    | Value                             | Use                                      |
| ------------------------- | --------------------------------- | ---------------------------------------- |
| `motionDuration.instant`  | 0.1s                              | Micro-feedback                           |
| `motionDuration.fast`     | 0.15s                             | Hover, tooltips                          |
| `motionDuration.base`     | 0.2s                              | Dropdowns, accordions                    |
| `motionDuration.moderate` | 0.3s                              | Standard content entrances (the default) |
| `motionDuration.slow`     | 0.5s                              | Large surface transitions, hero reveals  |
| `motionEasing.enter`      | `cubic-bezier(0.16,1,0.3,1)`      | Entering elements                        |
| `motionEasing.exit`       | `cubic-bezier(0.4,0,1,1)`         | Exiting elements                         |
| `motionEasing.inPlace`    | `cubic-bezier(0.4,0,0.2,1)`       | State changes in place                   |
| `motionDistance.sm`       | 16px                              | Subtle translate (`FadeIn`)              |
| `motionDistance.lg`       | 40px                              | Pronounced translate (`SlideUp`)         |
| `motionViewport`          | `{ once: true, margin: '-80px' }` | Shared viewport-trigger config           |

If a new primitive needs a duration/easing/distance not listed here, add it to this file rather than hardcoding a number in the component — that's the whole point of the token layer.

## 3. Entrance primitives

`FadeIn`, `SlideUp`, and `ScaleIn` share one internal engine (`MotionInView`, not exported for general use) that owns the viewport trigger. Each is a ~10-line preset that only defines its own `variants` shape. All three share the same props:

```
children: React.ReactNode
className?: string
delay?: number   // seconds, before the transition starts
```

### `FadeIn`

The default, everyday entrance for content scrolling into view: opacity 0→1 with a slight (`motionDistance.sm`) upward translate. Use this for the large majority of section/card entrances.

### `SlideUp`

Same shape as `FadeIn` but with a pronounced (`motionDistance.lg`) translate — use where vertical movement should read as the primary effect (e.g. a visual arriving distinctly "from below"), not as the default for ordinary content.

### `ScaleIn`

Opacity 0→1 with a scale from 0.95→1. Better suited to discrete surfaces (cards, media, inline panels) where a "settle into place" reads more naturally than a directional slide.

**All three trigger once, on first entry into the viewport** (`viewport={{ once: true }}`) — content never flickers back out if the user scrolls up past it. None of them delay content from being reachable: they animate `opacity`/`transform` only, never `display` or pointer-events, so fast scrollers/keyboard users always reach real, interactive content even mid-animation.

## 4. `Reveal` — the one hero-moment exception

```tsx
<Reveal curtainClassName="bg-primary">
  <HeroHeadline />
</Reveal>
```

`DESIGN_SYSTEM.md` §8 and `PROJECT_BLUEPRINT.md` §9 both call out that large, showy entrances are the _exception_ — reserved for a single hero moment per page. `Reveal` is that primitive: a solid curtain panel wipes away (`scaleX`, transform-only, no `clip-path`) to uncover its `children`, which fade in behind it.

**Use `Reveal` at most once per page.** It has its own viewport trigger (it isn't built on `MotionInView`, because it animates two sibling nodes — the content and the curtain — under one shared trigger, a shape the single-node engine doesn't fit). Pass `curtainClassName` to override the curtain's color if the default `bg-primary` doesn't suit the surface it sits on.

## 5. `Stagger` / `StaggerItem`

```tsx
<Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <FeatureCard {...item} />
    </StaggerItem>
  ))}
</Stagger>
```

`Stagger` owns a single viewport trigger and a `staggerChildren` transition (default 0.05s between items, matching `DESIGN_SYSTEM.md` §8's 30–50ms guidance). `StaggerItem` is a plain animated child with **no viewport trigger of its own** — it inherits the active animation state from its nearest `Stagger` ancestor. This means one `IntersectionObserver` for the whole group instead of one per item, and it's the only way Framer's stagger timing works correctly.

**Cap a `Stagger` group at roughly 8 items.** Beyond that, animate the group as a single unit (wrap it in `FadeIn` instead) rather than staggering dozens of nodes — per `DESIGN_SYSTEM.md` §8.

`StaggerItem` rendered outside a `Stagger` parent simply won't animate; it's not a standalone primitive.

## 6. `Presence`

```tsx
'use client';
<Presence>
  {isOpen && (
    <motion.div key="panel" exit={{ opacity: 0 }}>
      {/* ... */}
    </motion.div>
  )}
</Presence>;
```

A thin, conventionally-named wrapper around Framer's `AnimatePresence`, re-exported from `@/components/shared/motion` so exit animations are reached through the same import surface as the entrance primitives, instead of importing `framer-motion` directly at each call site. Defaults `mode="wait"` (waits for the outgoing element to finish exiting before the incoming one enters — the safer default for single-child swaps); pass `mode="popLayout"` explicitly for animated lists. `Presence` itself doesn't animate anything — the child `motion` element still needs its own `initial`/`animate`/`exit` props, same as using `AnimatePresence` directly.

## 7. Parallax — deferred

A `Parallax` primitive was scoped for this sprint but is **deferred**: it's driven by continuous `useScroll`/`useTransform` scroll-progress mapping rather than a discrete `hidden`/`visible` state, so it doesn't fit the `MotionInView` engine, and — more importantly — it falls outside `MotionProvider`'s automatic reduced-motion coverage (`reducedMotion="user"` only strips transform values passed via `animate`/`variants`, not values driven manually through motion values like `useTransform`). Building it correctly means its own manual reduced-motion gate, its own scroll-container considerations, and its own SSR-safety handling — real complexity, and `PROJECT_BLUEPRINT.md` §9 already treats decorative scroll motion as something to use "sparingly." Tracked as a follow-up rather than shipped half-considered.

## 8. Layout primitives

Delivered alongside the motion system, documented in full in `COMPONENT_GUIDELINES.md`: `Stack` (vertical flex, tokenized `space`), `Cluster` (wrapping horizontal flex, tokenized `space`), `Grid` (responsive column-collapse grid), `SplitSection` (two-column content/media section), and `MediaBlock` (radius-inset media wrapper). All are Server Components — none of them need the client boundary the motion primitives require, and they compose freely with motion primitives as `children` without becoming client themselves.

## 9. Quick reference: what to use when

| Situation                                                     | Primitive                  |
| ------------------------------------------------------------- | -------------------------- |
| A section or card entering the viewport (the default case)    | `FadeIn`                   |
| Content that should read as arriving from below               | `SlideUp`                  |
| A card, media block, or panel settling into place             | `ScaleIn`                  |
| The single hero moment on the page                            | `Reveal`                   |
| A grid or list of like items entering together                | `Stagger` + `StaggerItem`  |
| A conditionally-rendered element that needs an exit animation | `Presence`                 |
| Continuous scroll-linked movement                             | Not yet available — see §7 |
