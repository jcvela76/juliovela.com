# Header Nav and Logo Contrast Regression

Date: 2026-05-16
Area: Homepage header, section navigation, SVG logo rendering

## Summary
After stabilizing the Julio Vela logo as a reusable SVG, the homepage header lost its previous adaptive contrast behavior over dark homepage sections.

The issue was visible when scrolling to dark sections such as `#expertise` and `#insights`:
- The red `://` mark stayed visible.
- The `JULIO VELA` wordmark became hard to read or nearly invisible.
- The navigation color behavior was not consistently synchronized with the section background.
- Direct hash navigation, for example opening `/#about`, could start without the correct active nav state.

## What failed

### 1. SVG logo colors became fixed
The previous logo implementation used text/classes that could adapt through surrounding styles. The new SVG logo source used fixed `fill` values for the wordmark and subtitle.

Impact:
- On light sections, fixed Space Gray and Interface Gray worked well.
- On dark sections, the fixed Space Gray wordmark blended into the dark header/background.

Root cause:
- The SVG source did not expose a light/inverted tone for dark backgrounds.

### 2. Header did not pass inverted state to navigation
`SectionNav` already supported an `inverted` mode, but `SiteHeader` was not passing an inverted state based on the current section.

Impact:
- The nav could remain styled for light backgrounds while visually sitting over a dark section.

Root cause:
- Section theme awareness existed in page content, but not in the fixed header state.

### 3. Active nav state could miss initial hash navigation
When loading directly into a hash route such as `/#about`, the active nav state could depend only on IntersectionObserver timing.

Impact:
- The underline/active state could be missing or delayed on direct section URLs.

Root cause:
- The header did not explicitly sync initial `window.location.hash` before observer updates.

### 4. Test update initially failed due repeated renders
A new test for inverted brand tone initially failed because the test file rendered two `BrandMark` instances and queried globally with `screen.getByRole`.

Impact:
- Test failure was not a UI regression; it was a test isolation issue.

Root cause:
- The test needed to scope the query to the render container.

## Fix applied

### Logo tone support
`BrandLogoSvg` now supports:
- `tone="default"`
- `tone="inverted"`

The red mark remains brand red in both modes. The wordmark/subtitle switch between dark and light colors depending on background.

### Header section awareness
`SiteHeader` now treats these homepage sections as dark header contexts:
- `#expertise`
- `#insights`

For those sections:
- Header background switches to Space Gray.
- Logo wordmark/subtitle switch to light colors.
- `SectionNav` receives `inverted={true}`.

For light sections:
- Header uses Soft White.
- Logo uses the default dark lockup.
- Nav uses default light-section styling.

### Hash synchronization
`SiteHeader` now syncs the active nav state from `window.location.hash` on mount and on `hashchange`.

This keeps direct section links aligned with the nav underline and header theme.

### Test update
The inverted tone test now scopes its query with `within(container)` so it validates the intended rendered instance only.

## Verification performed

### Manual visual verification
Local preview was reviewed at:
- `http://127.0.0.1:19100/#about`
- `http://127.0.0.1:19100/#expertise`
- `http://127.0.0.1:19100/#insights`
- `http://127.0.0.1:19100/#contact`

Observed result:
- Light sections use dark logo/nav colors.
- Dark sections use inverted logo/nav colors.
- Header remains readable across section transitions.

### Desktop nav verification
A desktop viewport check confirmed:
- `#about` active nav: dark text, default logo fills.
- `#expertise` active nav: white text, inverted logo fills.
- `#insights` active nav: white text, inverted logo fills.
- `#contact` active nav: dark text, default logo fills.

### Automated validation
`mise exec -- pnpm check:live` passed after the fix.

Result:
- Lint passed.
- Typecheck passed.
- Unit/component tests passed.
- Content validation passed.

## Follow-up recommendation
Before committing this fix, run:

```bash
mise exec -- pnpm check:live
git diff --check
git status --short --branch
```

Before pushing or merging, run the full suite when the dev preview is stopped or with the known elevated Playwright workflow:

```bash
mise exec -- pnpm check:all
```
