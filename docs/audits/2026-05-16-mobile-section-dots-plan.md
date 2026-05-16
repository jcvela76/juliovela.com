# Mobile Section Dots Slice

Date: 2026-05-16

## Context

The mobile homepage uses a narrative scroll model, but mobile users did not have a compact way to move between sections. Desktop has header links and snap alignment. Mobile needs a lighter navigation pattern that does not turn the header into a crowded menu.

## Decision

Add a left-side mobile-only dot navigation.

The dots should:

- Use the same anchor map as the desktop section navigation.
- Stay hidden on the intro screen so the approved logo remains calm and uncluttered.
- Appear after the intro once the header logo appears.
- Use a red vertical active pill for the current section.
- Use small inactive dots for other sections.
- Include accessible labels and focus states.
- Avoid a hamburger menu for this slice.

## Why this direction

This keeps the mobile experience closer to the desktop narrative scroll without adding a drawer, menu state, or extra UI complexity. It also makes it easier to test anchors like `#expertise`, `#services`, and `#contact` on mobile.

## Guardrails

- No new dependencies.
- No content model changes.
- No routing changes.
- No blog, MDX, analytics, or Vercel configuration changes.
- No fake content.
- Validate with the project-local mise toolchain.

## Validation target

After implementation:

- `mise exec -- pnpm check:live`
- Browser/mobile anchor measurement
- `git diff --check`
- `git status --short --branch`
- Final validation before commit:
  - `mise exec -- pnpm check:all`
  - `git diff --check`
  - `git status --short --branch`
