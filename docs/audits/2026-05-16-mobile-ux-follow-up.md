# Mobile UX Follow-up Audit

Date: 2026-05-16

## Scope

Review the deployed/mobile homepage behavior after adding the mobile section dots navigation.

## Findings

### Intro scroll hint

The intro still displayed the visible word `Scroll`.

This was useful before the mobile dots existed, but now it adds unnecessary text to a brand-first screen. The intro should stay calm and logo-led.

Decision:

- Remove visible `Scroll` text.
- Remove the remaining vertical line hint after mobile review.
- Let the approved logo intro stand alone without additional scroll UI.
- Keep section movement available through native scrolling and mobile section dots after the intro.

### Mobile auto-positioning

Desktop had scroll snap behavior, but mobile did not. Mobile users could move through the narrative sections, but the page did not softly settle on section starts.

Initial attempts and issues:

- CSS `scroll-snap-type: y proximity` was tested for mobile.
- It technically created auto-positioning, but the interaction felt too abrupt on touch devices.
- The snap also risked fighting against longer narrative sections where users may want to read within a panel instead of being forced to the section start.
- A debounce-based JavaScript settler was then tested: wait until scrolling pauses, then animate to the closest section.
- That solved the browser snap harshness, but it felt late because the animation started only after the scroll already lost momentum.
- The desired interaction is gesture-led: when the user releases a meaningful swipe, the page should immediately complete the movement toward the next or previous section.

Final decision:

- Do not use CSS mobile scroll snapping.
- Keep desktop behavior as `mandatory`.
- Add a mobile-only scroll settler driven by `touchstart` and `touchend`.
- On `touchstart`, store both the starting finger position and `touchStartScrollY`.
- On `touchend`, calculate swipe direction and immediately animate to the next or previous section.
- Use `touchStartScrollY` to determine the starting section index, not the final scroll position.
- Use smooth anchor navigation for dots and direct section links.
- Preserve natural touch scrolling on mobile because even `proximity` snapping can feel abrupt on tall narrative sections.

### Upward navigation bug

During review, downward navigation felt correct, but upward navigation skipped one section.

Root cause:

- The first gesture-led implementation calculated the current section at the end of the gesture.
- While swiping upward, native browser scrolling had already moved the viewport toward the previous section.
- The code then treated that partially moved viewport as the current section and applied another upward move.
- Example failure mode: starting on `Expertise`, swiping upward could jump past `About` and target `Intro`.

Fix:

- Calculate the current section from `touchStartScrollY`, captured at `touchstart`.
- This keeps the destination anchored to where the gesture began.
- Verified behavior:
  - From `Expertise`, upward gesture lands on `About`.
  - From `About`, downward gesture lands on `Expertise`.
  - No horizontal overflow.

Reference implementation:

- `src/components/mobile-scroll-settler.tsx`

### Mobile content margin

The previous dots polish increased mobile content inset so the left rail no longer competes with headings. That spacing should remain.

### Current mobile UX rule

Use three different behaviors intentionally:

- Native touch scrolling remains natural by default.
- Gesture-led section completion handles meaningful vertical swipes.
- Dots and direct hash links use smooth anchor positioning.

Avoid:

- CSS mobile scroll snap.
- Delayed debounce-only snapping.
- Any visible intro scroll text or vertical scroll marker.

## Guardrails

- No new dependencies.
- No routing changes.
- No content or SEO changes.
- No analytics or deployment configuration changes.
- Validate with project-local `mise` tooling.

## Validation checklist

- `mise exec -- pnpm check:live`
- Browser/mobile visual review
- `git diff --check`
- Final validation before commit:
  - `mise exec -- pnpm check:all`
  - `git diff --check`
  - `git status --short --branch`
