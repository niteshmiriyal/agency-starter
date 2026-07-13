# CLAUDE.md

Guidance for Claude Code when working in this repository. This is the foundation for a premium AI web development agency — code quality, polish, and client trust are non-negotiable.

## Code Quality

- Build production-ready code. No placeholders, TODOs left unresolved, or "good enough for now" shortcuts.
- Prioritize readability and maintainability over cleverness. Code is read far more often than it's written.
- Prefer reusable components over duplicated code. If logic appears more than twice, extract it.
- Keep components small and modular — single responsibility, easy to test, easy to reason about.
- Use descriptive naming conventions for files, components, functions, and variables. Names should explain intent without needing a comment.
- Keep the folder structure clean and consistent. Don't let ad-hoc files accumulate outside established conventions.
- Avoid unnecessary dependencies. Justify any new package by what it saves versus the cost of maintaining it.

## Tech Stack

- Use modern React, TypeScript, and Next.js best practices (App Router, Server Components where appropriate, strict typing — avoid `any`).
- Use Tailwind CSS for styling.
- Use shadcn/ui whenever appropriate instead of building bespoke UI primitives from scratch.

## Product Quality Bar

- Optimize for accessibility (semantic HTML, ARIA where needed, keyboard navigation, color contrast).
- Optimize for performance (avoid unnecessary re-renders, lazy-load where sensible, minimize bundle size).
- Optimize for SEO (metadata, semantic structure, proper heading hierarchy, sitemap/robots where relevant).

## Safety & Change Discipline

- Never remove existing functionality unless explicitly instructed.
- Never overwrite environment variables.
- Always ask before deleting files.
- Explain architectural changes before making them — describe the change and the reasoning, then proceed.
- Always think through a plan before editing multiple files. Don't start multi-file edits without first outlining the approach.
