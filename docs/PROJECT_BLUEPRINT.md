# Project Blueprint

**Internal Engineering Documentation — Agency Starter**
Status: Living document. Owned by engineering. Update whenever a standard changes; do not let practice drift silently away from what's written here.

---

## 1. Vision

We build web properties for clients who are themselves selling quality, trust, and craft — agencies, studios, and premium service businesses whose own credibility depends on how their digital presence looks and feels. The product of this repository is not "a website that works." It is a website that communicates competence within the first three seconds of load, holds up under scrutiny from a technically literate visitor, and continues to perform after we've moved on to the next engagement.

This starter exists so that every new client engagement begins from a foundation that is already fast, accessible, typographically disciplined, and structurally consistent — freeing engineering time to be spent on what makes each client distinct, not on re-litigating basics.

Three things are true of everything we ship from this codebase:

- **It is fast by default.** Performance is not a late-stage optimization pass; it is a constraint respected from the first commit.
- **It is legible by default.** Typography, spacing, and color are systematized, not improvised per page.
- **It is trustworthy by default.** Accessibility and semantic correctness are baseline requirements, not client upsells.

## 2. Product Philosophy

- **Restraint is a feature.** A premium interface earns its polish through discipline — consistent spacing, a small and deliberate color palette, purposeful motion — not through decoration. When in doubt, remove.
- **Every screen has a job.** Before a component or section is built, its purpose in the visitor's decision-making journey should be stated in one sentence. If it can't be, it doesn't ship yet.
- **Defaults over configuration.** We optimize for the common case and make it effortless; we do not build flexible abstractions to anticipate hypothetical future needs. Configurability is added when a second real use case demands it, not before.
- **The system is the deliverable, not just the site.** Each engagement should leave behind a design system and component library that the client's own team (or our future selves) can extend without reverse-engineering intent.
- **No silent shortcuts.** A placeholder, a hardcoded value that should be a token, a missing alt attribute — these are debts. They get tracked and resolved, not shipped and forgotten.
- **Client trust is earned in the details.** Focus rings that work, transitions that don't jank, text that doesn't reflow on font load — these are the difference between "looks fine" and "feels expensive."

## 3. Folder Architecture

The repository follows the Next.js App Router convention with a clear separation between routing, UI composition, and infrastructure.

```
src/
  app/            Route segments only. Pages, layouts, loading/error states,
                   route handlers, and route-level metadata. No business
                   logic lives here beyond composition of components.
  components/
    ui/            Low-level, unopinionated primitives (buttons, inputs,
                   dialogs). Sourced from or shaped like shadcn/ui.
                   These know nothing about the product — they are the
                   vocabulary, not the sentences.
    shared/        Cross-page composition primitives (layout helpers,
                   animation wrappers, containers, section scaffolding).
                   Product-aware but not page-specific.
    layout/        Structural chrome that appears on most or all pages:
                   header, footer, navigation.
    [feature]/     Page- or feature-specific components, colocated under a
                   folder named for the feature (e.g. components/pricing/).
                   Created only once a feature has more than one component,
                   or a component that is clearly not reusable elsewhere.
                   components/marketing/ is the first realized example:
                   reusable marketing-page sections (Hero, FeatureGrid,
                   LogoCloud, StatsGrid, CTASection) that compose ui/ and
                   shared/ primitives but are domain-specific rather than
                   generic layout helpers.
  config/          Static, typed configuration: site metadata, navigation
                   structures, feature flags, environment-derived constants.
  lib/             Framework-agnostic utilities, helpers, and business
                   logic with no JSX. If it doesn't touch the DOM or React,
                   it belongs here, not in components/.
  hooks/           Custom React hooks shared across more than one component.
                   (Created when the first shared hook is needed.)
  types/           Shared TypeScript types and interfaces that span more
                   than one module. Colocate types with their owning module
                   when they are used in exactly one place.
public/            Static assets served as-is: images, fonts not loaded via
                   next/font, robots.txt, sitemap fallback, favicons.
```

Rules that govern this structure:

- A file's location should be guessable from its purpose without needing to search for it.
- Nothing is placed at the root of `src/` — every file belongs to one of the folders above.
- New top-level folders under `src/` require a stated reason and should be added to this document when introduced.
- Route groups (`(marketing)`, `(dashboard)`, etc.) are used to organize routing without affecting URL structure once a project has more than one distinct layout context — not before.

## 4. Component Architecture

- **Three tiers, strictly separated:** `ui/` (primitive, dumb, reusable across any product), `shared/` (composed, product-aware, reusable across any page), and feature components (specific, used in one context). A component should never reach "up" a tier — a `ui/` primitive must never import from `shared/` or a feature folder.
- **Server Components by default.** A component is a Client Component only when it needs interactivity, browser APIs, or state — and that need is declared explicitly with `"use client"` at the narrowest possible boundary, not hoisted up to a page or layout.
- **Single responsibility.** A component does one thing. If a component's name needs "and" to describe it, it should be split.
- **Composition over configuration.** Prefer components that accept `children` and slot-like props over components with a long list of boolean flags controlling internal behavior.
- **No prop-drilling beyond two levels.** If a value needs to pass through more than two layers of components unused at each intermediate layer, introduce context or restructure the composition.
- **Presentational and structural concerns are separate.** Data fetching and business logic stay out of presentational components; presentational components receive fully-prepared data as props.
- **Every reusable component is self-documenting through its prop names and types** — no separate prop documentation should be necessary to understand how to use a well-named component correctly.

## 5. UI Design System

- **shadcn/ui is the baseline vocabulary.** New primitives are added via the shadcn CLI and then adapted to the project's tokens, not built from scratch, unless shadcn has no equivalent.
- **One design system per project, not per page.** Every page draws from the same palette, type scale, spacing scale, radius scale, and shadow scale. Page-specific visual treatment is achieved through composition and content, not through one-off token values.
- **Radius, shadow, and border strategy is decided once per project** at the token level (see Section 7) and applied consistently — a card and a button in the same product share a visual language.
- **States are first-class, not afterthoughts.** Every interactive component is designed with its default, hover, focus-visible, active, disabled, and loading states specified before implementation — not discovered ad hoc during build.
- **Iconography comes from a single source** (Lucide, per current dependencies) at consistent stroke width and sizing. Mixed icon sets are not permitted within one product.
- **Empty states, error states, and loading states are designed, not defaulted.** A blank screen or a raw error message is never acceptable in a client-facing surface.

## 6. Typography Rules

- **A fixed type scale, not arbitrary sizes.** Every project defines a bounded set of font-size steps (commonly a 6–8 step scale from small print to hero display) and every piece of text in the product maps to one of those steps. Arbitrary one-off sizes are a code smell.
- **One typeface family for UI text, optionally a second for display/headline use.** More than two families in a single product is not permitted without a specific brand-driven exception, documented at the point of introduction.
- **Fonts are loaded via `next/font`** to guarantee self-hosting, eliminate layout shift from web font loading, and avoid third-party request waterfalls.
- **Line-height and measure are tied to font size**, not set independently per instance: body text targets a comfortable reading measure (roughly 60–75 characters per line) and a line-height that scales down as font size increases (tighter for display type, looser for small print).
- **Heading hierarchy is semantic first, visual second.** An `h2` is chosen because it is the second level of document structure, not because of how large it should look — visual size is then applied via the type scale, decoupled from the semantic tag when the two must diverge.
- **Weight is used deliberately.** A small number of font weights (typically 2–3: regular, medium/semibold, bold) are used across the whole product; weight is not treated as a fine-grained emphasis dial.
- **Letter-spacing (tracking) is tightened slightly at large display sizes and left at default for body text.** All-caps text always carries increased tracking for legibility.

## 7. Color Token Strategy

- **Colors are consumed exclusively as semantic tokens**, never as raw hex or arbitrary Tailwind color utilities in component code. A component references `background`, `foreground`, `primary`, `muted`, `destructive`, `border`, etc. — never `slate-200` or `#F4F4F5` directly.
- **Tokens are defined once, at the theme layer**, and mapped to raw palette values there. Rebranding or theming a project means changing token definitions in one place, not hunting through components.
- **A layered token model:**
  1. **Primitive palette** — raw color ramps (e.g. neutral, brand, semantic hues) with numeric steps, defined once.
  2. **Semantic tokens** — purpose-named tokens (`background`, `foreground`, `primary`, `primary-foreground`, `muted`, `accent`, `destructive`, `border`, `ring`) that map to primitive steps.
  3. **Component-level tokens** — used sparingly, only when a specific component needs a mapping distinct from the general semantic tokens (e.g. a card background subtly offset from page background).
- **Dark mode is a token remap, not a parallel design.** Every semantic token has a light and dark value; components are written once and never branch on theme directly.
- **Contrast is checked at the token level, not the component level.** Every foreground/background token pairing intended for text is verified against WCAG contrast minimums before it is approved for use (see Section 10).
- **The palette is intentionally small.** A restrained set of neutrals plus one primary brand hue plus semantic states (success, warning, destructive, info) is sufficient for the large majority of surfaces. Additional accent colors require justification.

## 8. Spacing System

- **A single spacing scale drives all margin, padding, and gap values**, based on a consistent base unit (4px increments are the project default, aligned with Tailwind's default scale). Arbitrary pixel values in spacing utilities are not permitted.
- **Spacing communicates hierarchy.** Related elements sit close together; unrelated groups are separated by a visibly larger gap. The relative jump between spacing steps should always be perceptible — avoid adjacent steps that read as visually identical.
- **Section rhythm is standardized.** Vertical spacing between major page sections is drawn from a small subset of the scale reserved for that purpose (large steps), while spacing within a component is drawn from a subset reserved for tight relationships (small steps). The two subsets are not mixed casually.
- **Container widths and gutters are systematized**, not set per page — a shared container/section scaffold (see `components/shared`) enforces consistent max-width and horizontal padding across the product, with defined breakpoint-specific gutter adjustments.
- **Consistency over precision.** It is better to reuse an existing spacing step that's slightly imperfect than to introduce a new arbitrary value for a single instance.

## 9. Motion & Animation Guidelines

- **Motion communicates, it doesn't decorate.** Every animation should answer one of: where did this element come from, where is it going, or what changed as a result of my action. Motion with no informational purpose is cut.
- **Duration and easing are tokenized**, not chosen per animation. A small set of durations (roughly: fast ~150ms for micro-interactions, base ~250ms for standard transitions, slow ~400ms for larger surface changes) and a small set of easing curves cover the large majority of cases.
- **Entrances are subtle.** Fade and slight translate (the pattern established by the shared fade-in primitive) is the default for content entering the viewport — large, showy entrance animations are the exception, reserved for hero moments, and used at most once per page.
- **Respect `prefers-reduced-motion` without exception.** Every animation has a reduced-motion fallback that either removes movement entirely or replaces it with a simple opacity change. This is a hard accessibility requirement, not a nice-to-have.
- **Interactive feedback is fast.** Hover and press states respond within the "fast" duration tier — anything slower reads as lag, not polish.
- **Animate performant properties.** Transitions favor `transform` and `opacity`; animating layout-triggering properties (`width`, `height`, `top`, `left`, box shadows at large scale) is avoided in favor of transform-based equivalents.
- **Scroll-triggered animation is used sparingly** and never blocks the user from reading content that has not yet animated in — content must be reachable and legible even if a user scrolls faster than the animation completes.

## 10. Accessibility Standards (WCAG)

- **Baseline target: WCAG 2.2 Level AA**, across every page shipped to a client, without exception. This is treated as a functional requirement equivalent to "the page loads," not an optional enhancement.
- **Semantic HTML first.** Native elements (`button`, `nav`, `header`, `footer`, `main`, `a`) are used for their native behavior before reaching for ARIA. ARIA is used to fill genuine gaps, not to relabel misused elements.
- **Full keyboard operability.** Every interactive element is reachable and operable via keyboard alone, in a logical tab order matching visual order. Custom components (menus, dialogs, tabs, accordions) implement the correct ARIA pattern and keyboard interaction model for their role.
- **Visible focus states are mandatory** on every focusable element, using the shared `ring` token — focus is never suppressed for aesthetic reasons.
- **Color contrast minimums are non-negotiable:** 4.5:1 for body text, 3:1 for large text (18pt+/14pt+ bold) and for meaningful UI component boundaries/icons. Verified at the token level per Section 7.
- **Color is never the sole carrier of meaning.** Status, errors, and required fields are indicated with text or iconography in addition to color.
- **All meaningful images carry descriptive `alt` text; decorative images are marked so assistive technology skips them.**
- **Forms are fully labeled.** Every input has a programmatically associated label; errors are announced, described, and associated with their field, not conveyed by color or placement alone.
- **Motion respects `prefers-reduced-motion`** (see Section 9) and no content flashes more than three times per second.
- **Accessibility is verified with both automated tooling and manual keyboard/screen-reader passes** before a page is considered complete — automated tools catch a minority of real issues and are a floor, not a ceiling.

## 11. SEO Standards

- **Every route defines its own metadata** (title, description, canonical URL, Open Graph and Twitter card data) via the Next.js Metadata API — no page ships with default or duplicated metadata inherited unintentionally from its layout.
- **One `h1` per page**, matching the page's primary intent, followed by a logical, non-skipping heading hierarchy.
- **Semantic landmark structure** (`header`, `nav`, `main`, `footer`, `article`, `section` where appropriate) so page structure is legible to search engines and assistive technology alike.
- **Sitemap and robots.txt are generated and kept current** as routes are added or removed; no route intended for indexing is left out of the sitemap.
- **Structured data (JSON-LD)** is added for content types that benefit from rich results (organization, breadcrumb, article, FAQ, service, local business — as applicable to the client's business type).
- **URLs are stable, human-readable, and kebab-case.** Redirects are put in place before a URL is changed or removed, never left to 404.
- **Every image ships with meaningful `alt` text**, serving both accessibility and image search.
- **Core Web Vitals are treated as SEO requirements**, not purely a performance concern (see Section 12) — ranking and user experience are the same objective here.
- **Internal linking is deliberate**: navigation and in-content links reinforce the site's information hierarchy rather than being an afterthought.

## 12. Performance Standards

- **Target budgets, tracked per page:** Largest Contentful Paint under 2.5s, Interaction to Next Paint under 200ms, Cumulative Layout Shift under 0.1, measured at the 75th percentile on real-world conditions (Core Web Vitals "Good" thresholds). These are release gates, not aspirations.
- **Server Components and static rendering are the default.** Client-side JavaScript is opt-in, added only where interactivity genuinely requires it, keeping the client bundle as small as the page allows.
- **Images are always served through `next/image`**, with explicit dimensions to prevent layout shift, appropriately sized sources, and modern formats served automatically.
- **Fonts are self-hosted via `next/font`** with no render-blocking external font requests and no flash of invisible/unstyled text.
- **Code-splitting is applied at natural boundaries** — heavy, below-the-fold, or interaction-gated components (rich editors, charts, modals with heavy content) are dynamically imported rather than bundled into the initial page load.
- **Third-party scripts are treated as a liability by default.** Each one added must be justified, loaded with the least-blocking strategy available, and periodically reviewed for continued necessity.
- **No unbounded client-side data fetching waterfalls.** Data required for initial render is fetched server-side; client-side fetching is reserved for genuinely dynamic, post-interaction data.
- **Performance is measured, not assumed.** Lighthouse/PageSpeed and real-user monitoring data are checked before a page ships and periodically thereafter — regressions are caught by measurement, not by someone noticing the site "feels slower."

## 13. Coding Standards

- **TypeScript strict mode is always on; `any` is not used.** Where a type is genuinely unknown, `unknown` is used and narrowed properly. Untyped escape hatches are treated as bugs.
- **No placeholder or "good enough for now" code ships.** A TODO left in committed code represents a decision that was deferred without a plan to resolve it — either the work is finished, or it is tracked as an explicit follow-up outside the code itself, not left as an inline comment implying someone will circle back.
- **Functions and components do one thing.** If a function needs a comment to explain what it does step-by-step, it should likely be decomposed into smaller, well-named functions instead.
- **Comments explain why, not what.** Code should be legible enough that *what* is obvious from names and structure; comments are reserved for non-obvious constraints, trade-offs, or the reasoning behind a decision that isn't visible in the code itself.
- **Errors are handled at the boundary where they're meaningful**, not swallowed silently and not caught reflexively everywhere. Every error path either recovers meaningfully or surfaces a clear, user-appropriate message.
- **No dead code, no commented-out code, in committed work.** Version control is the history; the working tree reflects only what currently matters.
- **Formatting and linting are automated and enforced**, not a matter of personal preference — Prettier and ESLint configuration in this repository is the single source of truth, and their output is not manually overridden.
- **Dependencies are added deliberately.** Before adding a package, its ongoing maintenance cost, bundle-size impact, and the size of the problem it solves are weighed against writing the (usually small) amount of code it would replace.

## 14. Naming Conventions

- **Files:** kebab-case for all files (`user-profile-card.tsx`, `use-scroll-position.ts`). Component files are named for the component they default-export.
- **Components:** PascalCase for the component/function name, matching the concept it represents (`UserProfileCard`), regardless of the kebab-case filename.
- **Hooks:** camelCase, always prefixed `use` (`useScrollPosition`), named for the value or behavior they return, not their implementation detail.
- **Variables and functions:** camelCase, named for what they hold or do. Booleans read as a question or a state (`isLoading`, `hasError`, `canSubmit`) — never a bare noun.
- **Types and interfaces:** PascalCase, named for the concept they model (`UserProfile`, `NavigationItem`). No `I` prefix. A props type is named `<ComponentName>Props`.
- **Constants:** SCREAMING_SNAKE_CASE reserved for true, module-level constants that will never vary at runtime (`MAX_RETRY_ATTEMPTS`); configuration objects and derived values use camelCase.
- **CSS/design tokens:** kebab-case, semantic and purpose-named as described in Sections 7–9 (`--color-primary`, `--space-4`, `--radius-md`) — never named for their raw value (`--blue-500`).
- **Folders:** kebab-case, plural for collections of like things (`components`, `hooks`), singular for conceptual groupings (`lib`, `config`).
- **Names describe intent, not implementation.** A name should survive a change in how something is built without becoming misleading.

## 15. File Organization Rules

- **Colocate what changes together.** A component, its own styles (if any beyond Tailwind classes), and its own tests live next to each other; only code shared across multiple consumers moves to a shared location.
- **One default export per component file**, matching the filename. Named exports are used for small, tightly-related helper exports (e.g. a component's variant type) that have no reason to live elsewhere.
- **Barrel files (`index.ts` re-exports) are used sparingly** — only at the boundary of a folder that represents a genuine public API (e.g. `components/ui/index.ts`), not reflexively in every folder, to avoid obscuring where things actually live and to avoid unnecessary bundling side effects.
- **No file exceeds a length that resists being understood in one sitting.** When a component file grows large enough to scroll through repeatedly to understand it, it is a signal to decompose it into smaller, colocated pieces.
- **Tests live beside the code they test** (`component-name.test.tsx` alongside `component-name.tsx`), not in a parallel mirrored test tree.
- **Configuration lives at the root or in `config/`, never scattered.** A new engineer should be able to find every environment-affecting setting without grep.
- **Generated files and build output are never committed.** Anything reproducible by a build step stays out of version control and is covered by `.gitignore`.

## 16. Responsive Design Strategy

- **Mobile-first construction.** Base styles target the smallest supported viewport; larger breakpoints layer on refinements via `min-width` utilities, never the reverse.
- **A shared, small set of breakpoints** (aligned to Tailwind's default scale: `sm`, `md`, `lg`, `xl`, `2xl`) is used consistently across the product. Custom one-off breakpoints are not introduced without a documented reason.
- **Design and build for content, not for devices.** Layouts respond to available space and content length, not to assumptions about a specific device class — the same rules should hold up on a foldable, an ultrawide monitor, or a browser window resized to an unusual width.
- **Touch targets meet a minimum size** (44×44px effective hit area) on any surface reachable on a touch device, regardless of visual size.
- **Every layout is verified at true breakpoint boundaries and at a few in-between widths**, not just at a fixed set of common device presets — real users resize windows and use devices the design wasn't specifically tested against.
- **Typography scales across breakpoints in coordinated steps** (see Section 6), not via arbitrary per-breakpoint overrides on individual elements.
- **Navigation patterns adapt deliberately** (e.g. collapsing to a documented mobile menu pattern at a defined breakpoint), and that pattern is consistent across every page of a given project.

## 17. Git Workflow

- **`main` is always deployable.** Nothing is merged into `main` that is known to be broken, half-finished, or failing checks.
- **Feature branches, short-lived.** Work happens on a descriptively named branch (`feature/`, `fix/`, `chore/` prefixes) scoped to a single piece of work, merged and deleted promptly rather than left to accumulate drift from `main`.
- **Commits are atomic and descriptive.** Each commit represents one coherent change and explains *why* in its message, not just what changed — the diff already shows what changed.
- **No direct pushes to `main` on client engagements** without review, once a project has more than one contributor. Solo-maintained internal tooling may relax this with explicit agreement.
- **Pull requests are reviewed for correctness, adherence to this blueprint, and blast radius** before merge — not rubber-stamped.
- **Force-pushes, history rewrites, and destructive operations are never performed on shared branches** without explicit, in-the-moment agreement from whoever else depends on that branch.
- **CI (lint, type-check, build, test) must pass before merge.** A red pipeline blocks merging; it is fixed before new work continues on top of it.
- **Secrets and environment values are never committed**, under any circumstance — `.env` files are gitignored from project inception, and their contents are managed through the deployment platform's secret storage.

## 18. AI Collaboration Workflow

- **AI-authored code is held to the same bar as human-authored code** — every standard in this document applies regardless of who or what wrote the first draft.
- **Plans before multi-file changes.** Before an AI agent edits more than one file, it states its intended approach and reasoning; execution follows agreement on that approach, not the other way around.
- **Architectural changes are explained before they are made** — the change and its reasoning are stated up front, not discovered after the fact by reading a diff.
- **No unrequested removal of existing functionality.** An AI agent does not delete, disable, or silently narrow existing behavior as a side effect of an unrelated task.
- **Environment variables and secrets are never overwritten or fabricated** by an AI agent under any circumstance.
- **Destructive or hard-to-reverse actions** (force pushes, history rewrites, dropped data, deleted files/branches) require explicit human confirmation in the moment, every time — prior approval of a similar action does not carry forward implicitly.
- **AI output is reviewed, not trusted blindly.** A human is responsible for every change that reaches `main`, regardless of how it was authored — "the AI wrote it" is never a substitute for review.
- **Ambiguity is surfaced, not guessed past.** When a request is underspecified in a way that materially changes the outcome, the agent asks rather than silently choosing an interpretation and proceeding.
- **This document is the shared contract.** When instructions in a specific conversation conflict with this blueprint, the conflict is surfaced explicitly rather than one silently overriding the other.

## 19. Quality Assurance Checklist

Before any page or feature is considered done, it clears the following:

**Correctness**
- [ ] Feature matches the agreed requirement; no scope silently added or dropped.
- [ ] All interactive states (default, hover, focus, active, disabled, loading, error, empty) implemented and verified.
- [ ] No console errors or warnings in development or production builds.

**Accessibility**
- [ ] Fully keyboard-operable; logical, visible focus order.
- [ ] Passes automated accessibility scan with zero critical/serious issues.
- [ ] Manually verified with a screen reader for any non-trivial interactive component.
- [ ] Color contrast meets WCAG AA minimums (Section 10).

**Performance**
- [ ] Core Web Vitals within target budgets (Section 12) on a throttled connection/device profile.
- [ ] Images optimized and correctly sized; no layout shift from images or fonts.
- [ ] No unnecessary client-side JavaScript shipped for static content.

**SEO**
- [ ] Metadata (title, description, OG/Twitter) present and accurate for the route.
- [ ] Heading hierarchy is valid and starts from a single `h1`.
- [ ] Route included in the sitemap if intended for indexing.

**Design & Consistency**
- [ ] Only design-system tokens used for color, spacing, typography, and radius — no arbitrary one-off values.
- [ ] Responsive behavior verified at all standard breakpoints and a few in-between widths.
- [ ] Motion respects `prefers-reduced-motion` and stays within tokenized durations/easing.

**Code Quality**
- [ ] Lint, type-check, and build all pass cleanly.
- [ ] No `any`, no dead code, no leftover debug statements or commented-out code.
- [ ] Naming and file placement follow Sections 14–15.

**Content**
- [ ] Copy proofread; no lorem ipsum or placeholder text remains.
- [ ] All links resolve; no broken internal or external references.

## 20. Future Roadmap

This starter is expected to evolve. Items below are directional, not committed timelines — they are recorded so future decisions build on stated intent rather than rediscovering it.

- **Testing infrastructure.** Introduce a unit/component testing setup and a baseline of tests for shared and ui-tier components before this starter is used on a client engagement with more than one contributor.
- **Content layer.** Evaluate a typed content/CMS integration (headless CMS or MDX-based) once a project requires client-editable content beyond what hardcoded config supports.
- **Component library documentation.** As `components/ui` and `components/shared` grow, introduce a lightweight, browsable catalog (e.g. Storybook or an internal docs route) so the design system is inspectable independent of any one project's pages.
- **Analytics and monitoring baseline.** Standardize a default privacy-respecting analytics and error-monitoring integration so new engagements start with visibility into real-world performance and errors, not just synthetic scores.
- **Internationalization readiness.** Revisit folder and routing architecture (Section 3) if and when a client engagement requires multi-locale support, rather than speculatively building it in now.
- **Design token automation.** Consider generating token definitions (Sections 7–9) from a single source of truth shared with design tooling, reducing drift between design files and implementation.
- **Accessibility regression testing in CI.** Move automated accessibility checks (Section 19) from manual pre-ship verification into an automated CI gate once the component set stabilizes enough to make that check reliable.
- **This document's own governance.** As the team using this starter grows beyond its original author(s), establish a lightweight review process for changes to this blueprint itself, so it remains a genuine shared contract rather than one person's notes.
