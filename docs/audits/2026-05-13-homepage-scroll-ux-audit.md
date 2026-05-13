# Homepage Scroll UX Audit

Date: 2026-05-13
Branch: `feature/minimal-next-scaffold`
Scope: homepage layout, brand presentation, scroll UX, contrast, and QA readiness.
Status: fixes applied and reviewed in the local browser preview.

## Context

The homepage is now a minimal full-screen narrative scroll experience for the Julio Vela personal technology brand.

Approved brand direction:

- `://` as the Signal Red brand mark (`#E11D2E`)
- `JULIO VELA` in Space Gray / Charcoal (`#1F2329`)
- `TECH SOLUTIONS` in Interface Gray (`#9AA0A6`) with wide tracking
- Minimal, premium, practical, and software-brand-like

## Browser Audit Status

The homepage was reviewed in the local browser preview at `http://localhost:19100/`.

The review focused on the logo intro, section snap behavior, nav underline state, header contrast on light/dark panels, and anchor stops for About, Expertise, Services, Insights, and Contact.

## Findings

### 1. Mobile logo may overflow on narrow screens

File: `src/components/brand-mark.tsx`

The hero lockup keeps `://` and `JULIO VELA` in one row with large mobile typography. On narrow mobile widths, the combined mark, wordmark, and gap may overflow or feel compressed.

Recommendation:

- Reduce the base mobile hero wordmark size.
- Keep larger sizes at `sm` and `md`.
- Consider tighter mobile gap between mark and wordmark.

Resolution:

- Reduced base mobile hero logo sizing.
- Tightened the mobile gap while preserving the approved horizontal lockup.

### 2. Header navigation may crowd the logo on mobile

Files:

- `src/components/site-header.tsx`
- `src/components/section-nav.tsx`

The header contains the compact logo and all section anchors in one row. This may wrap awkwardly or compete with the hero logo on small screens.

Recommendation:

- Hide full section nav below `md`, or show only a compact minimal nav on mobile.
- Keep desktop anchor navigation visible and simple.

Resolution:

- Hid the full section navigation below `md`.
- Kept the compact logo visible in the header.

### 3. Scroll snap may be too aggressive on shorter desktop viewports

File: `src/app/globals.css`

Current desktop snap starts at `768px` with `scroll-snap-stop: always`. This can feel rigid on laptops or shorter windows, especially when a section has multiple list items.

Recommendation:

- Apply snap only on larger and taller viewports, for example `min-width: 1024px` and `min-height: 760px`.
- Consider removing `scroll-snap-stop: always` if navigation feels sticky.

Resolution:

- Limited snap behavior to larger/taller desktop viewports.
- Removed `scroll-snap-stop: always`.

### 4. Reduced motion support is missing

File: `src/app/globals.css`

The homepage includes entrance and scroll hint animations. These are subtle, but should still respect `prefers-reduced-motion`.

Recommendation:

- Add a `prefers-reduced-motion: reduce` media query.
- Disable or shorten animations and smooth scrolling for users who prefer reduced motion.

Resolution:

- Added reduced-motion handling for smooth scrolling, animations, and transitions.

### 5. Minor cleanup opportunities

Files:

- `src/app/page.tsx`
- `src/lib/brand.ts`

`scroll-story` appears as a class on `main` but has no CSS definition. `displaySubtitle` exists in brand data but is not currently used.

Recommendation:

- Remove unused class/data or wire them intentionally in the next cleanup pass.

Resolution:

- Removed the unused `scroll-story` class and unused `displaySubtitle` field.

### 6. Header contrast switched too early or too late

Files:

- `src/components/site-header.tsx`
- `src/app/globals.css`

The header/nav color state was sometimes ahead of the visible section. This made dark text appear over dark panels or light text appear over light panels during anchor navigation.

Root causes:

- Anchor offsets were still tuned for a normal document page, not full-screen scroll panels.
- Header theme detection sampled a fixed viewport point that could hit the header itself or the wrong section boundary.

Resolution:

- Removed the full-page scroll offset so each section anchor lands at the real panel start.
- Updated header theme detection to sample the section immediately below the fixed header.
- Confirmed About, Expertise, Services, Insights, and Contact anchor states in the local browser preview.

### 7. Home nav underline should not appear on the intro screen

File: `src/components/site-header.tsx`

The intro screen already centers the approved logo, so an active underline in the nav made the home state feel visually redundant.

Resolution:

- Header logo stays hidden while the intro is visible.
- Section underline is cleared while the intro is visible.
- Section underline starts once the user navigates into the content panels.

## Recommended Next Pass

1. Run final full validation before committing.
2. Review tablet and mobile widths once desktop direction is accepted.
3. Keep the next implementation slice focused on content structure, not automation.

Required validation after fixes:

- `mise exec -- pnpm lint`
- `mise exec -- pnpm typecheck`
- `mise exec -- pnpm test`
- `mise exec -- pnpm build`
- `mise exec -- pnpm check:all`
- `git diff --check`
- `git status --short --branch`

## Commit Guidance

This audit records the local preview review and fixes from the homepage polish pass. Commit only after the full validation suite passes.
