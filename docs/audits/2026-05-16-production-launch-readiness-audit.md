# Production Launch Readiness Audit

Date: 2026-05-16

## Scope
This audit checks whether the current production deployment is ready for the custom domain setup step.

Current production deployment:
- `https://juliovela-com.vercel.app`

Planned canonical domain:
- `https://juliovela.com`

Planned redirect:
- `https://www.juliovela.com` should redirect to `https://juliovela.com`

## Summary
The deployed application is functionally ready for the next controlled launch step: configuring the custom domain in Vercel.

No application blocker was found in the production smoke checks. DNS and custom domain work still require explicit Julio approval before changes are made.

## Automated browser smoke check
Command:

```bash
PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app mise exec -- pnpm test:browser
```

Result:
- Passed: 4 browser smoke tests

Coverage:
- `/`
- `/blog`
- `/robots.txt`
- `/sitemap.xml`

## Production route checks
The following production routes returned expected successful responses:

- `/`
- `/blog`
- `/blog/choosing-the-right-ai-tool`
- `/privacy`
- `/disclosures`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`
- `/blog/choosing-the-right-ai-tool/opengraph-image`
- `/icon.svg`
- `/apple-icon.svg`

## Draft visibility
`/drafts-preview` is not intended for production users.

Observed production behavior:
- Returns `404`
- Includes `noindex`
- Is blocked in `robots.txt`
- Is not listed in `sitemap.xml`

This is acceptable for the current launch posture.

## SEO and canonical readiness
Current SEO files already use the planned canonical domain:

- `robots.txt` declares host: `https://juliovela.com`
- `robots.txt` points to: `https://juliovela.com/sitemap.xml`
- `sitemap.xml` emits canonical URLs under `https://juliovela.com`

This means the code is already aligned with `juliovela.com` as the primary domain. After DNS is connected, smoke checks must be rerun against `https://juliovela.com`.

## Social image readiness
The production OG image routes returned PNG images at the expected dimensions:

- `/opengraph-image`: `1200 x 630`
- `/blog/choosing-the-right-ai-tool/opengraph-image`: `1200 x 630`

The current OG images use the stabilized brand asset direction. Future article slices should continue using article-specific OG images.

## Legal and disclosure readiness
The following pages returned successful responses:

- `/privacy`
- `/disclosures`

The privacy policy already documents Vercel Web Analytics at a high level. If GA4, pixels, retargeting, forms, newsletters, or CRM tracking are added later, privacy copy must be updated before enabling them.

## Analytics readiness
Vercel Web Analytics is enabled in the app.

Next checks after domain launch:
- Confirm Vercel Web Analytics receives traffic from `juliovela.com`.
- Do not add GA4 or marketing pixels until the tracking plan and privacy copy are updated.

## Launch blockers
No app-level blocker was found.

Operational work remaining:
- Add `juliovela.com` in the Vercel project dashboard.
- Configure `www.juliovela.com` to redirect to `juliovela.com`.
- Make DNS changes only after explicit Julio approval.
- Rerun smoke checks against `https://juliovela.com`.
- Submit the canonical domain to Google Search Console after DNS is live.

## Recommended next slice
Domain setup slice:

1. Use the Vercel dashboard to add `juliovela.com`.
2. Add `www.juliovela.com` as an alternate domain.
3. Configure `juliovela.com` as the primary/canonical domain.
4. Configure `www.juliovela.com` to redirect to `juliovela.com`.
5. Apply DNS records only after explicit approval.
6. Wait for DNS propagation.
7. Run production smoke tests against `https://juliovela.com`.
