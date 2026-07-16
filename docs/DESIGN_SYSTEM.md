# Design System

This document is the single source of truth for visual and interaction design across every product we build. It exists independently of any one codebase — it describes principles, scales, and rules, not implementation. When a project's design tokens (Tailwind config, CSS variables, theme files) are created or updated, they should be derived from this document, and any deviation from it should be a deliberate, documented exception rather than a drift.

This is a premium system. Every rule below exists to produce interfaces that feel deliberate, calm, and trustworthy — never generic, never accidental.

---

## 1. Typography Scale

### Philosophy

Type is the primary carrier of hierarchy. We use a single modular scale so every heading, label, and paragraph across every product shares the same rhythm. Hierarchy should be legible from scale and weight alone, without relying on color.

### Scale

A 1.250 (major third) ratio scale, base 16px, expressed in `rem`:

| Token | Size (px) | Size (rem) | Line Height | Typical Use |
|---|---|---|---|---|
| `text-xs` | 12 | 0.75rem | 1.5 | Captions, metadata, timestamps |
| `text-sm` | 14 | 0.875rem | 1.5 | Secondary body text, form labels |
| `text-base` | 16 | 1rem | 1.6 | Default body copy |
| `text-lg` | 18 | 1.125rem | 1.6 | Lead paragraphs, emphasized body |
| `text-xl` | 20 | 1.25rem | 1.4 | Small headings (H5/H6) |
| `text-2xl` | 25 | 1.563rem | 1.3 | H4 |
| `text-3xl` | 31 | 1.953rem | 1.25 | H3 |
| `text-4xl` | 39 | 2.441rem | 1.2 | H2 |
| `text-5xl` | 49 | 3.052rem | 1.1 | H1 |
| `text-6xl` | 61 | 3.815rem | 1.05 | Hero display |
| `text-7xl` | 76 | 4.768rem | 1.0 | Large hero display (marketing only) |

### Font Weight

- **400 (Regular)** — body copy, default state.
- **500 (Medium)** — UI labels, buttons, form labels, emphasis within body text.
- **600 (Semibold)** — subheadings (H4–H6), card titles.
- **700 (Bold)** — primary headings (H1–H3), key numerals/stats.
- Avoid weights below 400 or above 700; they read as inconsistent across font-rendering engines.

### Font Pairing Rules

- One typeface for UI and body text (a humanist or grotesque sans — e.g., Inter, Geist, or a client's brand equivalent). Optionally, one display typeface reserved strictly for hero headlines and marketing moments — never for UI chrome.
- Never mix more than two typefaces in a single product.
- Numerals in dashboards and data tables must use tabular figures so columns align.

### Measure & Tracking

- Body copy line length: 60–80 characters (`max-w-prose` equivalent, ~65ch).
- Letter-spacing: `-0.02em` on headings `text-3xl` and above (large type looks loose by default); `0` on body; `+0.01em` on all-caps labels (`text-xs`/`text-sm` uppercase eyebrows).

---

## 2. Color Palette Philosophy

### Principles

1. **Neutral-first.** The interface is built from a deep, warm-or-cool neutral ramp (pick one temperature per brand and hold it — never mix warm and cool grays in the same product). Color is the exception, not the wallpaper.
2. **One brand accent, used sparingly.** A single primary brand color drives interactive elements (primary buttons, links, focus states, active nav). If a project needs a second accent, it must serve a distinct semantic purpose (e.g., a secondary CTA tier), not decoration.
3. **Semantic colors are fixed roles, not swatches.** Success, warning, destructive, and info map to consistent hues across every project (green/amber/red/blue families respectively), regardless of brand palette, so meaning is never ambiguous.
4. **Color communicates state, not identity.** Don't use color alone to distinguish content categories where a label or icon would be clearer — reserve color for interactive/system state (hover, active, error, success).
5. **60-30-10 balance.** Roughly 60% neutral background, 30% neutral foreground/surface, 10% accent and semantic color, per screen.

### Palette Structure

Every project defines:

- **Neutral ramp** — 11 or 12 steps (50–950), used for backgrounds, borders, and text.
- **Brand ramp** — 9–11 steps of the primary accent, generated from a single brand hue (not picked ad hoc per shade).
- **Semantic ramps** — success, warning, destructive, info — each with at least a subtle (background), mid (icon/border), and strong (text/solid) step.

### Usage Rules

- Text on surfaces must resolve from the neutral ramp: primary text = darkest neutral (light mode) / lightest neutral (dark mode); secondary text = a mid-neutral, never below the accessible contrast floor (see §16).
- Never hardcode a one-off hex value in a component. Every color used must trace back to a token in the ramp.
- Gradients, when used, blend between two adjacent steps of the same ramp (or brand → neutral), never between two unrelated hues — this keeps gradients feeling intentional rather than decorative.

---

## 3. Border Radius System

A single radius scale, applied consistently by component size — small controls get small radii, large surfaces get larger radii, maintaining optical consistency (nested elements should have a radius ≤ their parent's).

| Token | Value | Use |
|---|---|---|
| `radius-none` | 0px | Tables, dividers, full-bleed media |
| `radius-sm` | 6px | Checkboxes, small badges, chips |
| `radius-md` | 8px | Inputs, buttons, small cards |
| `radius-lg` | 12px | Cards, modals, dropdowns |
| `radius-xl` | 16px | Large panels, feature cards |
| `radius-2xl` | 24px | Hero panels, modal sheets, marketing surfaces |
| `radius-full` | 9999px | Avatars, pills, icon buttons, toggles |

**Rule of thumb:** a component nested inside another should use a radius 2–4px smaller than its parent (e.g., a card with `radius-lg` containing a thumbnail should use `radius-md` on the thumbnail), so the corners appear concentric rather than colliding.

---

## 4. Shadow System

Shadows communicate elevation, not decoration. Use the smallest shadow that achieves the necessary separation — over-shadowing is the fastest way to make an interface look dated.

| Token | Elevation | Use |
|---|---|---|
| `shadow-xs` | 1dp | Inputs, subtle card borders-in-lieu-of-border |
| `shadow-sm` | 2dp | Resting cards, dropdown triggers |
| `shadow-md` | 4dp | Popovers, hover state on cards |
| `shadow-lg` | 8dp | Dropdown menus, tooltips |
| `shadow-xl` | 16dp | Modals, dialogs |
| `shadow-2xl` | 24dp | Command palettes, large overlays |

### Construction Rules

- Every shadow is built from two layers: a tight, low-opacity "contact" shadow (small blur, small offset, ~8% opacity) and a soft, wider "ambient" shadow (large blur, larger offset, ~4% opacity). This dual-layer approach reads as physically plausible light, not a flat drop shadow.
- Shadow color is never pure black — tint it toward the neutral ramp's darkest step (or the brand hue at very low opacity for a "glow" effect on interactive elements).
- In dark mode, shadows alone are nearly invisible against dark backgrounds — elevation must be communicated primarily through surface color steps (see §9) and a thin 1px border, with shadow as a secondary cue.
- Increase blur radius, not just opacity, as elevation increases — never make a shadow "darker" to indicate more elevation.

---

## 5. Spacing Scale

A single 4px base unit, used for all padding, margin, and gap values. Never use arbitrary spacing values outside this scale.

| Token | Value |
|---|---|
| `space-0` | 0px |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |
| `space-32` | 128px |

### Application Rules

- **Component-internal spacing** (padding inside a button, gap between icon and label) uses the 4–16px range.
- **Component-to-component spacing** (between cards in a grid, between form fields) uses the 16–32px range.
- **Section-level spacing** (see §13) uses the 64px+ range.
- Related elements sit closer together than unrelated ones — spacing itself should communicate grouping (Gestalt proximity) before any divider or border is added.

---

## 6. Grid System

- **Base grid:** 12-column grid on desktop, with a consistent gutter of `space-6` (24px) at desktop and `space-4` (16px) at mobile.
- **Max content width:** 1280px for standard content, 1440px for data-dense dashboards, with generous outer margins beyond that on ultra-wide viewports — content should never stretch edge-to-edge on large monitors.
- **Column collapse:** 12 columns (desktop) → 8 columns (tablet) → 4 columns (mobile). Components span proportionally (e.g., a 4-column card on desktop becomes full-width on mobile, not a fraction).
- **Nested grids** inherit the parent gutter; don't mix gutter sizes within one grid context.
- Dashboards and marketing pages may use different grid densities, but both must be built from the same 12-column base and the same spacing scale.

---

## 7. Breakpoints

Mobile-first. Design and build for the smallest viewport first, then progressively enhance.

| Token | Min Width | Target Devices |
|---|---|---|
| `xs` (default) | 0px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large / ultra-wide desktops |

### Rules

- Layout should never "break" (overlap, clip, overflow) between breakpoints — treat these as anchor points for a fluid layout, not the only sizes that must look correct.
- Touch targets must be ≥44×44px below the `md` breakpoint regardless of visual size.
- Test every layout at the breakpoint boundary minus 1px, not just at the named width.

---

## 8. Motion Principles

### Philosophy

Motion confirms cause and effect. Every animation must answer "what triggered this, and what changed?" Motion that exists purely for delight, without a functional trigger, is a liability — it slows perceived performance and ages badly.

### Duration Scale

| Token | Duration | Use |
|---|---|---|
| `duration-instant` | 100ms | Micro-feedback: button press, checkbox toggle |
| `duration-fast` | 150ms | Hover states, tooltips |
| `duration-base` | 200ms | Default transitions: dropdowns, accordions |
| `duration-moderate` | 300ms | Modals, drawers, page-level transitions |
| `duration-slow` | 500ms | Large surface transitions, hero reveals |

Never exceed 500ms for a UI transition; anything longer reads as sluggish, not premium.

### Easing

- **Entering** elements (appearing, expanding): ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`) — fast start, gentle settle.
- **Exiting** elements (disappearing, collapsing): ease-in (`cubic-bezier(0.4, 0, 1, 1)`) — quick departure, don't linger.
- **State changes in place** (color, transform on hover): ease-in-out (`cubic-bezier(0.4, 0, 0.2, 1)`).
- Never use linear easing for anything a human is meant to perceive as natural — reserve linear only for indeterminate loaders/spinners.

### Rules

- Respect `prefers-reduced-motion`: replace movement/scale transitions with opacity-only fades, and disable decorative motion (parallax, auto-playing background animation) entirely.
- Animate `transform` and `opacity` only wherever possible; avoid animating `width`, `height`, `top`/`left`, or `box-shadow` blur (layout thrashing, jank).
- Stagger children (list items, grid cards) by 30–50ms per item, capped at ~8 items — beyond that, animate as a group.
- Every interactive element needs a hover AND active/pressed state at minimum; focus-visible state is mandatory (see §16) and must never be removed for aesthetic reasons.

---

## 9. Glassmorphism Rules

Glass effects are a controlled, occasional device — used for elevated overlays that need to feel "above" the interface while keeping spatial context with what's behind them (command palettes, navigation bars over content, modals over media-rich backgrounds). They are not a default surface treatment.

### When to Use

- Sticky navigation bars over scrolling content.
- Command palettes / spotlight search overlays.
- Modals or panels presented over rich media (images, video, gradients).

### When Not to Use

- Never on dense data surfaces (tables, forms, dashboards) — legibility loses to effect.
- Never stacked more than one layer deep (a glass panel containing another glass panel is prohibited — contrast collapses).
- Never as the only surface differentiator in a text-heavy layout.

### Construction

| Property | Value |
|---|---|
| Background | Neutral surface color at 60–75% opacity |
| Backdrop blur | 16–24px |
| Border | 1px, neutral ramp at ~12% opacity (a hairline, not a heavy stroke) |
| Shadow | `shadow-lg` or `shadow-xl`, per §4 |

### Rules

- Always pair blur with a semi-opaque fill — blur alone without an opacity fallback breaks on browsers/devices without backdrop-filter support (provide a solid-color fallback background).
- Text directly on a glass surface must be checked for contrast against the busiest part of the background it will sit over, not the average — worst case, not best case.
- In dark mode, glass surfaces lighten (not darken) relative to the background, and the border becomes more prominent (~16–20% opacity) since ambient shadow is less effective (see §4).

---

## 10. Button Styles

### Hierarchy

Every screen has at most one primary action visible at a time. Buttons express hierarchy through style tier, not size.

| Tier | Style | Use |
|---|---|---|
| **Primary** | Solid fill, brand color, white/inverse text | The one key action per view/section |
| **Secondary** | Solid fill, neutral surface, primary text color, 1px border | Supporting actions alongside a primary |
| **Outline** | Transparent fill, 1px border, text color | Tertiary actions, toolbars |
| **Ghost** | Transparent, no border, text color, background appears on hover only | Low-emphasis actions, icon buttons, in-table actions |
| **Destructive** | Solid fill, semantic-destructive color | Irreversible/dangerous actions only |
| **Link** | No padding/border, text color, underline on hover | Inline actions within text or table rows |

### Sizing

| Token | Height | Horizontal Padding | Text Size |
|---|---|---|---|
| `sm` | 32px | `space-3` (12px) | `text-sm` |
| `md` (default) | 40px | `space-4` (16px) | `text-sm` |
| `lg` | 48px | `space-6` (24px) | `text-base` |

- Radius: `radius-md` at all sizes (per §3).
- Icon-only buttons are always square (height = width) and use `radius-md` or `radius-full` depending on context (toolbar vs. floating action).
- Minimum touch target 44×44px on touch devices even if the visual button is smaller (expand hit area via padding, not visible size).

### States

Every button must define: default, hover (slightly darker/lighter fill, ~8% shift), active/pressed (scale 0.98 + further shift, `duration-instant`), focus-visible (2px ring, offset 2px, brand or high-contrast color), disabled (40% opacity, no pointer events), and loading (spinner replaces label or sits inline before it; button retains its width to prevent layout shift).

---

## 11. Card Styles

Cards are the default container for grouped content. Consistency here does more for perceived quality than almost any other component.

### Anatomy

- **Padding:** `space-6` (24px) default; `space-4` (16px) for dense/compact card grids; `space-8` (32px) for feature/marketing cards.
- **Radius:** `radius-lg` default, `radius-xl` for large feature cards.
- **Surface:** one step above page background on the neutral ramp (not pure white/black), so cards read as distinct surfaces even without a border.
- **Border:** 1px, neutral ramp at ~8–10% opacity — used *in addition to* the surface-color step, not instead of it.
- **Shadow:** `shadow-sm` at rest; `shadow-md` on hover only if the card itself is interactive (clickable).

### Rules

- A card's internal spacing must follow §5: header-to-body gap uses `space-4`, body-to-footer gap uses `space-4`–`space-6`.
- Interactive cards (clickable rows, hoverable feature cards) must show a visible state change on hover (surface lightens/darkens one step, or shadow elevates) — never rely on the cursor pointer alone.
- Never nest a card inside a card with an identical surface color and border — differentiate by increasing the surface step or removing the inner border.
- Media inside a card (image/video) is inset to the card's radius minus 4–8px (per the nested-radius rule in §3), never full-bleed with sharp corners inside a rounded card.

---

## 12. Form Styles

### Inputs

- **Height:** 40px default (`md`), matching button `md` height so inputs and buttons align in a toolbar or inline form.
- **Padding:** `space-3` horizontal (12px).
- **Radius:** `radius-md`.
- **Border:** 1px, neutral ramp; on focus, border becomes brand color and gains a 2px focus ring at 20% opacity around the outside (never remove the border, only augment it).
- **Placeholder text:** a distinct, lighter neutral step from actual input text — must still meet 3:1 contrast minimum against the field background (placeholders are not exempt from accessibility).

### Labels & Structure

- Labels sit above their input (not inline/floating) at `text-sm`, weight 500, `space-2` gap to the input — floating labels are avoided for accessibility and cross-browser consistency reasons.
- Helper text sits below the input at `text-xs`, neutral secondary color, `space-1` gap.
- Required fields marked with a subtle asterisk or "(required)" text — never color alone.
- Group related fields with consistent `space-4` vertical rhythm between fields, `space-8` between distinct sections of a longer form.

### Validation

- Error state: border and helper text switch to semantic-destructive color; an icon (not color alone) appears in the field; error message replaces helper text and is announced via `aria-live` for screen readers.
- Success state (where used, e.g., async validation): border and icon switch to semantic-success — used sparingly, not on every valid field.
- Validate on blur for the first pass, then live on subsequent keystrokes after an error has been shown — never validate a field the user hasn't touched yet or while they're still mid-first-entry.

---

## 13. Icon Sizing

- Icons are sourced from a single icon set per project (e.g., Lucide) — never mix icon libraries; stroke weight and corner style must match across every icon on screen.
- **Stroke width:** 1.5–2px, consistent across the entire set regardless of icon size.

| Token | Size | Use |
|---|---|---|
| `icon-xs` | 12px | Inline with `text-xs` labels, badges |
| `icon-sm` | 16px | Inline with `text-sm` body/buttons, form field icons |
| `icon-md` (default) | 20px | Default button icons, nav items |
| `icon-lg` | 24px | Section headers, standalone icon buttons |
| `icon-xl` | 32px | Feature illustrations, empty states |
| `icon-2xl` | 48px+ | Empty-state hero icons, onboarding |

- An icon paired with text is sized relative to that text's line-height (typically one step below the text's own scale token) and vertically centered against the text's cap-height, not its full line box.
- Icon-only interactive elements must always carry an accessible label (`aria-label` or equivalent) — an icon alone is never a sufficient label.

---

## 14. Section Spacing

Applies to marketing/landing-page-style vertical composition — the rhythm between major page sections.

| Token | Value | Use |
|---|---|---|
| `section-sm` | `space-16` (64px) | Compact sections, dashboard page sections |
| `section-md` | `space-24` (96px) | Standard marketing sections (default) |
| `section-lg` | `space-32` (128px) | Sections following/preceding the hero, major transitions |

### Rules

- Vertical padding is symmetric (top = bottom) unless a section visually connects to the next (e.g., a CTA band that bleeds into a footer) — in that case, reduce the shared edge only.
- Section padding scales down at `md` breakpoint and below: halve the value (e.g., `section-lg` desktop → `section-md` on tablet → `section-sm` on mobile) rather than using a fixed value across all breakpoints.
- Content within a section respects the grid max-width (§6); the section background may extend full-bleed, but text/content never does.
- Never place two sections with identical background color and zero visual separator back-to-back without adequate spacing — vary the surface step, add a hairline divider, or increase spacing to signal the boundary.

---

## 15. Hero Guidelines

The hero is the single highest-leverage section on any page — it sets the tone for everything else and must load fast and communicate instantly.

### Structure

- **Eyebrow (optional):** `text-sm`, uppercase, brand color, `+0.01em` tracking — one short label above the headline.
- **Headline:** `text-5xl`–`text-7xl` depending on product type (SaaS product marketing vs. large brand campaign), weight 700, tight line-height (1.0–1.1), max ~12 words. This is the single most important sentence on the page — write and design it last, after everything else is settled.
- **Subheadline:** `text-lg`–`text-xl`, weight 400, neutral-secondary color, max ~65ch, 1–3 sentences expanding the headline's promise.
- **Primary CTA + optional secondary CTA:** primary button (`lg` size) plus, at most, one lower-emphasis secondary action (outline or link style) — never two primary-tier buttons side by side.
- **Supporting visual (optional):** product screenshot, illustration, or abstract brand motif — must not visually compete with the headline for the first fixation; place below or beside, sized so the headline remains the largest single element on screen.

### Rules

- Hero content sits within `section-lg` vertical padding (§14), but the hero's *own* internal rhythm (eyebrow → headline → subhead → CTA) uses `space-4`–`space-6` gaps, tightly grouped as one visual unit against the surrounding whitespace.
- Never require an image/video asset to load before the headline and CTA are visible and interactive — text and buttons render first, media loads progressively.
- If using a background video or animated gradient, it must be decorative only (no essential information conveyed by it alone), muted/looping, and respect `prefers-reduced-motion` by falling back to a static frame.
- Contrast between headline text and its background must meet §16 at the actual deployed background (including any gradient/image), checked at the darkest and lightest points the text overlaps.
- On mobile, stack every hero element full-width, reduce headline to roughly `text-4xl`–`text-5xl`, and move any supporting visual below the CTA, not above the headline.

---

## 16. Accessibility & Color Contrast

Accessibility is not a pass at the end — it constrains every decision above. Non-negotiable minimums (WCAG 2.1 AA, targeting AAA where feasible):

### Contrast Minimums

| Content | Minimum Ratio |
|---|---|
| Body text (< 18px, or < 14px bold) | 4.5:1 |
| Large text (≥ 18px, or ≥ 14px bold) | 3:1 |
| UI component boundaries & graphical objects (input borders, icon glyphs conveying meaning) | 3:1 |
| Disabled elements | Exempt, but should still be legible in intent |

### Rules

- Every color pairing used for text-on-surface across the neutral, brand, and semantic ramps must be verified against these ratios at design-token creation time — not spot-checked per component later. When a ramp is built, document which text-color step is guaranteed to pass against which background-color step.
- Never convey information (error, required, active state, category) through color alone — always pair with an icon, label, underline, or shape change.
- Focus-visible states are mandatory on every interactive element, use a minimum 3:1 contrast ring against the adjacent background, and are never suppressed via `outline: none` without a compliant replacement.
- Interactive target size minimum 44×44px (mobile) / 24×24px (desktop, with adequate spacing to neighboring targets) per WCAG 2.5.8.
- All non-text content (icons-as-buttons, images conveying information) requires text alternatives (`aria-label`, `alt`); purely decorative imagery is marked `aria-hidden`/`alt=""`.
- Motion-based information (see §8) must have a non-motion equivalent, and no interface may flash more than 3 times per second.

---

## 17. Dark Mode Strategy

Dark mode is a first-class theme, designed alongside light mode from the same tokens — never an auto-inverted afterthought.

### Principles

1. **Elevation via lightness, not shadow.** In light mode, elevation is shown via shadow (§4). In dark mode, shadows read poorly against dark backgrounds — elevation is instead shown by *lightening* the surface color at each step up (base background darkest, cards one step lighter, modals/popovers lighter still), with shadow retained only as a secondary, subtler cue.
2. **Never pure black, never pure white.** Base dark background sits around the neutral ramp's 950 step (a very dark, slightly tinted neutral), not `#000`. Base light background sits around the 25–50 step, not `#fff`. Pure black/white surfaces cause halation and eye strain, especially with any blur or motion.
3. **Desaturate and lighten brand/semantic colors for dark backgrounds.** The same brand hue at the same lightness used in light mode will often feel oversaturated and vibrate against a dark surface. Dark-mode accent steps are shifted lighter and slightly less saturated versions of the same hue — never a different hue.
4. **Reduce contrast slightly at the extremes.** Pure white text on a near-black background (21:1) causes glare; cap primary text contrast around 15–17:1 by lightening pure white text down one or two neutral steps, while keeping it comfortably above the 4.5:1 minimum (§16).
5. **Borders become more important, shadows less.** Since shadow is a weaker signal in dark mode, hairline borders (1px, neutral ramp ~12–16% opacity) do more of the work separating adjacent surfaces of similar lightness.

### Implementation Rules

- Every token in this document (color ramps, shadow tint) must define both a light and dark value — dark mode is not `filter: invert()` or a CSS-level trick.
- Images, illustrations, and product screenshots embedded in marketing content should have dark-mode-appropriate variants where feasible (e.g., a screenshot of a light-mode-only product UI should be framed/matted rather than sitting jarringly on a dark hero).
- Theme switching must not cause layout shift — only color tokens change, never spacing, sizing, or typography.
- Respect the user's system preference (`prefers-color-scheme`) by default, with an explicit, persisted user override available and clearly accessible (not buried).
- Test every component in both themes before shipping; a component reviewed only in light mode is not considered complete.

---

## Governing Principle

When any rule in this document seems to conflict with a specific project's needs, resolve the conflict in favor of **consistency across the portfolio** over a one-off improvement — a design system's value comes from its universality. If a genuine, recurring need justifies deviation, amend this document itself so the next project inherits the improvement, rather than quietly diverging in a single codebase.
