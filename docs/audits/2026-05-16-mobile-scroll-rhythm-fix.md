# Mobile Scroll Rhythm Fix

Date: 2026-05-16

## Scope
This implementation slice addresses mobile scroll rhythm and anchor alignment before adding mobile dots navigation.

Included:
- Mobile anchor alignment
- Mobile section rhythm
- Mobile heading density reduction
- Mobile card spacing reduction

Excluded:
- Dots navigation
- Hamburger navigation
- Copy changes
- Blog changes
- DNS or Vercel changes

## Problem
The deployed mobile homepage had no visible mobile navigation, and anchor navigation did not consistently land on the intended section.

Observed behavior before this slice:
- Some anchors visually landed in the previous section.
- Mobile sections felt less like intentional panels.
- Mobile headings and cards were dense on smaller devices.
- The future dots navigation would have exposed the anchor mismatch more clearly.

## Root cause
The homepage was designed around desktop full-screen scroll panels. On mobile, section content can exceed the viewport height, so full-panel behavior needs mobile-specific rhythm.

Additionally, fixed header spacing was not accounted for in mobile anchor navigation.

## Changes made

### 1. Mobile scroll offset
Added a global mobile scroll padding so section anchors land below the fixed header:

- `html { scroll-padding-top: 4rem; }`
- Desktop scroll snap resets this value to `0`.

Result:
- Mobile anchors now open with the target section beginning below the fixed header.
- Desktop scroll snap behavior remains unchanged.

### 2. Removed redundant panel height constraint
Removed redundant `min-h-screen` usage from content sections where `.scroll-panel` already provides `min-height: 100svh`.

Result:
- Mobile sizing uses the safer viewport unit already defined for the project.

### 3. Mobile typography and spacing tuning
Adjusted mobile-first section typography and spacing:

- Section headings use a slightly smaller mobile size.
- Summary copy steps up at `sm` and `md`.
- Card padding is slightly tighter on small screens.

Result:
- Mobile sections are still bold and editorial, but less heavy.
- Content remains readable without feeling as oversized on smaller phones.

## Validation measurements
Measured with Playwright against local preview at:

- `375 x 667`
- `390 x 844`
- `430 x 932`

Expected result:
- Target section top should land just below the fixed header.
- Header height is approximately `63px`.
- Target section top should be approximately `64px`.

Observed after fix:

### iPhone SE-style viewport
- `#about`: target top `64px`
- `#expertise`: target top `64px`
- `#services`: target top `64px`
- `#insights`: target top `64px`
- `#contact`: target top `64px`
- Horizontal overflow: `0`

### iPhone standard viewport
- `#about`: target top `64px`
- `#expertise`: target top `64px`
- `#services`: target top `64px`
- `#insights`: target top `64px`
- `#contact`: target top `64px`
- Horizontal overflow: `0`

### iPhone Pro Max-style viewport
- `#about`: target top `64px`
- `#expertise`: target top `64px`
- `#services`: target top `64px`
- `#insights`: target top `64px`
- `#contact`: target top `64px`
- Horizontal overflow: `0`

## Visual review notes
The mobile sections now land predictably after anchor navigation.

Remaining design notes:
- The page still has no visible mobile navigation.
- Dots navigation should be implemented in the next slice.
- Contact remains visually strong; it may need a later density pass only if real-device review feels heavy.

## Acceptance criteria
Passed:
- Anchors land below the header.
- No mobile horizontal overflow was detected.
- Desktop scroll snap remains scoped to large screens.
- No dots navigation was added in this slice.

Pending:
- Real-device review.
- Dots nav implementation in Slice Mobile B.

## Recommended next slice
Slice Mobile B: add minimal left-side mobile dots navigation.

Implementation guardrails:
- Do not use a hamburger menu.
- Keep the header compact.
- Keep dots subtle.
- Active dot should be Signal Red.
- Dots should remain usable on light and dark sections.
