# Production Brand and OG Visual Audit

Date: 2026-05-16
Target: `https://juliovela-com.vercel.app`

## Scope
- Homepage brand lockup
- Main Open Graph image
- Article Open Graph image for `choosing-the-right-ai-tool`
- Favicon and Apple icon routes
- Production browser smoke tests

## Checks performed
- Browser review of production homepage.
- Production Playwright smoke test using `PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app`.
- Direct HTTP checks for generated OG images and icon assets.

## Results

### Homepage
Status: Pass

- URL: `https://juliovela-com.vercel.app/`
- The approved logo lockup is visible on the first screen.
- The lockup is centered and calm, with the header not competing with the intro screen.
- Browser smoke test confirms the accessible SVG logo is visible with the name `Julio Vela Tech Solutions`.

### Main OG image
Status: Pass

- URL: `https://juliovela-com.vercel.app/opengraph-image`
- HTTP status: `200`
- Content type: `image/png`
- Size: `1200 x 630`
- Visual result: clean centered brand lockup on Soft White, aligned with the homepage logo direction.

### Article OG image
Status: Pass with future polish note

- URL: `https://juliovela-com.vercel.app/blog/choosing-the-right-ai-tool/opengraph-image`
- HTTP status: `200`
- Content type: `image/png`
- Size: `1200 x 630`
- Visual result: article title, excerpt, tags, and compact Julio Vela logo render correctly.
- Future polish: the compact logo is acceptable for this slice, but can be refined further if the brand lockup is later converted to final outlined SVG paths.

### Favicon
Status: Pass

- URL: `https://juliovela-com.vercel.app/icon.svg`
- HTTP status: `200`
- Content type: `image/svg+xml`
- Visual/source result: red `://` mark on Soft White.

### Apple icon
Status: Follow-up fix prepared

- URL: `https://juliovela-com.vercel.app/apple-icon.svg`
- HTTP status: `404`
- Current metadata references `/apple-icon.svg`, but production does not serve that path.
- Recommended fix: add `public/apple-icon.svg` or switch to a supported `apple-icon.png` asset and update metadata if needed.
- Local fix prepared: add `public/apple-icon.svg` using the same red `://` mark on Soft White.
- Production verification required after commit, push, and Vercel deployment.

## Automated validation

Production browser smoke test passed:

```bash
PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app mise exec -- pnpm test:browser
```

Result:

```text
4 passed
```

## Decision
- Brand logo and OG rendering are production-usable.
- Do not expand the current brand/OG slice further after the Apple icon routing fix.
- Next verification: after deployment, confirm `/apple-icon.svg` returns `200` with `image/svg+xml`.
