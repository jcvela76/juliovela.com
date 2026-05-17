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

Initial decision:

- Do not use CSS mobile scroll snapping.
- Keep desktop behavior as `mandatory`.
- Add a mobile-only gesture controller driven by `touchstart`, `touchmove`, and `touchend`.
- Track the active section from scroll position before the gesture begins.
- When the swipe crosses a small threshold, call `preventDefault()` on `touchmove` and take control of the transition.
- Animate exactly one section forward or backward per gesture.
- Lock additional gestures while the smooth animation is running.
- Use smooth anchor navigation for dots and direct section links.
- Preserve natural touch scrolling on mobile because even `proximity` snapping can feel abrupt on tall narrative sections.

Final mobile decision after real-device testing round 1:

- Remove JavaScript-controlled mobile auto-positioning.
- Do not intercept `touchmove`.
- Do not call `preventDefault()` during normal mobile scrolling.
- Keep mobile scrolling fully native so browser momentum, finger tracking, address-bar behavior, and accessibility remain predictable.
- Keep mobile dots as intentional manual section shortcuts.
- Keep desktop scroll snap because mouse/trackpad desktop behavior is stable and expected.

### Upward navigation bug

During review, downward navigation felt correct, but upward navigation skipped one section.

Root cause:

- The first gesture-led implementation calculated the current section at the end of the gesture.
- While swiping upward, native browser scrolling had already moved the viewport toward the previous section.
- The code then treated that partially moved viewport as the current section and applied another upward move.
- Example failure mode: starting on `Expertise`, swiping upward could jump past `About` and target `Intro`.

First fix:

- Calculate the current section from `touchStartScrollY`, captured at `touchstart`.
- This keeps the destination anchored to where the gesture began.
- Verified behavior:
  - From `Expertise`, upward gesture lands on `About`.
  - From `About`, downward gesture lands on `Expertise`.
  - No horizontal overflow.

Follow-up issue:

- Mobile real-device testing still showed occasional upward skips during fast gestures.
- The likely cause is native momentum continuing to move the document while the JavaScript smooth scroll is also trying to position the viewport.
- This means the hybrid model still allowed two scroll systems to compete.

Rejected fix:

- Replace the hybrid settler with a stricter full-page gesture controller.
- Use `touchmove` with `{ passive: false }` only on mobile so the handler can prevent native scrolling after the gesture crosses the threshold.
- Navigate a maximum of one section per gesture.
- Keep an animation lock for the duration of the transition.
- Re-sync the active section after animation completes.

Real-device result:

- The strict controller reduced some double-jump cases in synthetic browser tests.
- On real mobile hardware, it still produced too many visible jumps.
- The interaction felt worse than native scrolling because the page took control away from the user's finger.

Updated implementation:

- `src/components/mobile-scroll-settler.tsx` now renders no behavior.
- The component remains as an intentional placeholder documenting that mobile auto-settling was tested and disabled.
- Future mobile scroll experiments should be treated as new slices and must start from native scrolling as the baseline.

Follow-up research:

- The CSS Scroll Snap model is designed to let the browser choose the best final snap position after a native scroll operation instead of using JavaScript to fight touch momentum.
- Web.dev notes that JavaScript scroll-control solutions do not have the same fidelity as native/composited scrolling.
- MDN documents `scroll-snap-stop: always`, which prevents a scroll container from passing over a snap point.
- This points to a better architecture for this homepage: use a dedicated native scroll container for the homepage and let CSS Scroll Snap handle one-panel stops.

Final mobile decision after research:

- Use CSS native scroll snap on the homepage scroll container.
- Do not intercept touch events.
- Do not use JavaScript gesture control for normal mobile scrolling.
- Set each homepage panel to `scroll-snap-stop: always` to reduce fast-swipe section skipping.
- Keep the dots as manual anchor navigation.
- Keep this behavior scoped to the homepage only so article and legal pages keep normal document scrolling.

Implementation:

- `src/app/page.tsx` adds `home-scroll-container` to the homepage `<main>`.
- `src/app/globals.css` scopes mobile scroll snap to `.home-scroll-container`.
- `src/components/site-header.tsx` points the mobile intro dot to `#intro`, because the scroll container owns the homepage scroll position.
- `src/components/mobile-section-dots.tsx` handles dot clicks by scrolling `.home-scroll-container` directly instead of relying on document-level anchor scrolling.

References:

- MDN `scroll-snap-stop`: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
- MDN CSS Scroll Snap concepts: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll_snap/Basic_concepts
- Web.dev CSS Scroll Snap: https://web.dev/articles/css-scroll-snap

Reference implementation:

- `src/app/globals.css`
- `src/components/mobile-section-dots.tsx`
- `src/components/mobile-scroll-settler.tsx` remains intentionally inert so future reviews can see that JavaScript gesture control was tested and disabled.

### Mobile content margin

The previous dots polish increased mobile content inset so the left rail no longer competes with headings. That spacing should remain.

### Current mobile UX rule

Use two different behaviors intentionally:

- Native touch scrolling remains the foundation.
- CSS Scroll Snap handles homepage panel settling.
- Dots and direct hash links use smooth anchor positioning.

Avoid:

- Document-level CSS mobile scroll snap on `html` or `body`.
- Delayed debounce-only snapping.
- JavaScript touch interception for normal scroll gestures.
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
