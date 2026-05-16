# Mobile Navigation UX Plan

Date: 2026-05-16

## Context
The homepage works well on desktop as a narrative scroll experience with section navigation. On mobile, however, the experience has two clear issues:

- There is no visible mobile navigation.
- Section anchoring and scroll rhythm are inconsistent because several mobile sections are taller than the viewport.

This plan documents the recommended mobile direction before implementation.

## Current mobile findings

### 1. No visible mobile navigation
The desktop nav is hidden on mobile, leaving only scroll as the navigation method.

Impact:
- Users cannot quickly jump between sections.
- Users have no sense of how many sections exist.
- The page feels less intentionally guided on mobile than it does on desktop.

### 2. Scroll panel behavior breaks down on mobile
On mobile, sections can exceed the viewport height because headings, summaries, and cards require more vertical space.

Observed section heights on mobile:
- About: taller than viewport on small phones
- Expertise: taller than viewport on small phones
- Insights: taller than viewport on small phones
- Contact: tall and visually heavy on small phones

Impact:
- The page no longer feels like clean full-screen slides.
- Anchor navigation can land in awkward positions.
- Some anchors appear to stop in the previous section instead of opening the target section cleanly.

### 3. Hero intro works
The logo-first intro screen works well on mobile.

Keep:
- Logo-only first screen
- Calm premium presentation
- Minimal scroll cue

Do not add:
- Long hero copy
- CTA buttons
- Decorative visual clutter

## Recommended direction

Use a mobile vertical dots navigation system, but only after fixing mobile section rhythm.

The dots nav should behave like a minimal section rail:

- One dot per section
- Fixed vertical position
- Left side of the viewport
- Active dot in Signal Red
- Inactive dots in subtle gray or soft white depending on section background
- Tap/click navigates to the target section
- Accessible labels for screen readers

Sections:
- Intro
- About
- Expertise
- Services
- Insights
- Contact

## Why dots nav is preferred

### Better than hamburger
A hamburger menu would be familiar, but it would make the page feel more generic and less editorial.

Dots nav is better because:
- It supports a narrative one-page experience.
- It is minimal and premium.
- It gives users orientation without opening a menu.
- It does not compete with the compact header logo.

### Better than bottom nav
A bottom nav is easier to reach with the thumb, but it risks making the site feel like an app and can cover content.

Dots nav is better because:
- It fits the visual language of a scroll story.
- It keeps the content area calmer.
- It can be visually subtle.

### Better than no navigation
No mobile nav keeps the UI very clean, but it gives users no orientation and makes the long page feel less intentional.

Dots nav is better because:
- It communicates page structure.
- It gives quick jumps.
- It reinforces the idea that each section is part of a designed sequence.

## Implementation sequence

### Slice Mobile A: Scroll rhythm and anchor alignment
Goal:
- Make mobile section navigation land cleanly before adding dots.

Recommended changes:
- Review mobile section padding.
- Reduce mobile heading size if needed.
- Ensure section anchors start in predictable positions.
- Add mobile-specific `scroll-margin-top` or `scroll-padding-top` if needed.
- Avoid aggressive scroll snap on mobile.
- Keep desktop behavior unchanged.

Acceptance criteria:
- `#about` opens with the About heading visible.
- `#expertise` opens with the Expertise heading visible.
- `#services` opens with the Services heading visible.
- `#insights` opens with the Insights heading visible.
- `#contact` opens with the Contact heading visible.
- No section starts hidden behind the header.
- No horizontal overflow on common mobile widths.

Validation:
- Mobile browser review at `375px`, `390px`, and `430px` widths.
- `mise exec -- pnpm check:live`
- Full `mise exec -- pnpm check:all` before commit.

### Slice Mobile B: Mobile dots nav
Goal:
- Add minimal mobile section navigation after anchor alignment is stable.

Recommended design:
- Position: fixed left side
- Suggested left offset: `14px`
- Suggested vertical position: centered
- Active dot: Signal Red `#E11D2E`
- Inactive dots on light sections: subtle Space Gray alpha
- Inactive dots on dark sections: subtle Soft White alpha
- Dot size: approximately `6px` inactive, `8px` active
- Hit target: at least `32px`
- Labels: screen-reader labels only by default

Behavior:
- Dot click navigates to section anchor.
- Active state follows the currently visible section.
- Active state should not jump too early.
- Dots should adapt contrast on dark sections.
- Dots should not appear on the intro if they distract from the logo moment, unless testing shows they help orientation.

Acceptance criteria:
- Dots are visible and usable on mobile.
- Dots do not cover important content.
- Active dot matches the visible section.
- Dot taps land cleanly on the target section.
- Header remains clean and compact.

Validation:
- Mobile browser review.
- Keyboard/focus review where applicable.
- `mise exec -- pnpm check:live`
- Full `mise exec -- pnpm check:all` before commit.

### Slice Mobile C: Mobile copy density pass
Goal:
- Reduce visual heaviness only if real-device review still feels dense after Scroll Rhythm and Dots Nav are implemented.

Possible changes:
- Slightly shorten mobile-only headings.
- Reduce mobile heading size.
- Reduce card padding.
- Convert some card lists into simpler text rows on small screens.

Guardrails:
- Do not weaken the premium feel.
- Do not remove useful context.
- Do not make mobile feel like a stripped-down version of desktop.

## Risks

### Too much UI
Dots can become visual noise if too large or too bright.

Mitigation:
- Keep them subtle.
- Use red only for active state.
- Avoid labels unless interaction requires them.

### Poor contrast on dark sections
Dots need to remain visible on both light and dark backgrounds.

Mitigation:
- Adapt dot color based on active section theme.
- Test on Expertise and Insights dark panels.

### Anchor mismatch
If scroll alignment is not fixed first, dots nav will expose the problem more clearly.

Mitigation:
- Implement Slice Mobile A before Slice Mobile B.

## Recommendation
Proceed step by step:

1. Implement Slice Mobile A: scroll rhythm and anchor alignment.
2. Review on mobile.
3. Implement Slice Mobile B: left-side dots nav.
4. Review on mobile again.
5. Only then decide whether Slice Mobile C is needed.
