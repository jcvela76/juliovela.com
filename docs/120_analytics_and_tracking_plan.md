# Analytics and Tracking Plan

## Purpose
Define a privacy-aware analytics approach for `juliovela.com` before custom domain launch.

The goal is to understand basic site performance and content interest without adding unnecessary tracking complexity, cookies, advertising pixels, or invasive user profiling.

## Current status
- Vercel Web Analytics is implemented in the app through `@vercel/analytics`.
- The root App Router layout renders the official `<Analytics />` component.
- The public privacy page is prepared for Vercel Web Analytics as the intended lightweight analytics tool.
- The remaining operational step is to confirm Web Analytics is enabled and receiving traffic in the Vercel dashboard.
- Do not add Google Analytics, advertising pixels, retargeting scripts, or third-party marketing tags in the first tracking slice.

## Recommended phase 1 tool
Use Vercel Web Analytics as the first analytics implementation.

Why:
- It fits the current Vercel-hosted architecture.
- It is lighter than a full marketing analytics stack.
- It is enough for early launch questions like page views, top pages, referrers, devices, countries, and content interest.
- It avoids adding GA4 complexity before there is a real need for campaign attribution or custom conversion funnels.

Before changing or expanding analytics, verify current Vercel Web Analytics behavior in official documentation, especially privacy, cookies, data collection, retention, and regional handling.

## What to measure in phase 1
- Page views for public routes.
- Blog/article interest.
- Referring sources.
- Device and browser trends.
- Country-level geographic trends if available.
- Basic launch performance signals.

## Daily reporting position
Daily analytics summaries are useful, but they are not part of the first implementation.

Current decision:
- Do not add n8n for analytics reporting yet.
- Use the Vercel dashboard as the source of truth for early traffic review.
- Review analytics manually during the first launch period.
- Revisit automated daily reports after enough launch traffic exists to make trend summaries useful.

Future daily report options:
- Use a privacy-friendly analytics tool with API access if automated reports become a priority.
- Build a minimal first-party event store only if there is a clear need for custom reporting.
- Use n8n later only as an orchestration layer after the analytics data source is selected.

Do not scrape dashboards or store visitor-level data just to create daily summaries.

## What not to measure yet
- Individual user identity.
- Cross-site tracking.
- Advertising retargeting.
- Form submissions, because there is no contact form yet.
- Newsletter conversion, because there is no newsletter yet.
- Affiliate conversion, because affiliate publishing is not active yet.
- Logged-in behavior, because there are no accounts.

## Google Analytics / GA4 position
Do not add GA4 in phase 1.

Use GA4 later only if the project needs:
- Campaign attribution.
- Custom events and funnels.
- Newsletter or product conversion tracking.
- Integration with Ads or broader marketing dashboards.
- Deeper traffic source analysis than Vercel Web Analytics provides.

If GA4 is added later, update privacy documentation first and review whether consent controls or a cookie banner are required.

## Google Search Console
Google Search Console should be configured before or shortly after custom domain launch.

Why:
- It helps validate indexing.
- It checks sitemap discovery.
- It reports search queries, impressions, click-through rate, and indexing issues.
- It is SEO infrastructure, not behavior tracking in the same sense as analytics scripts.

Recommended flow:
- Add property for `juliovela.com` after DNS/custom domain is approved.
- Submit `https://juliovela.com/sitemap.xml`.
- Verify indexing for home, blog index, and published article URLs.

## Legal and privacy requirements
Before enabling any analytics script:
- Update `/privacy` to disclose analytics usage.
- Document what is collected and why.
- Document whether cookies are used.
- Document whether third-party processors receive data.
- Confirm whether consent UI is required for the chosen tooling and target audience.
- Do not enable advertising, retargeting, or affiliate tracking without separate approval.

## Implementation guardrails
- Keep tracking implementation small and reversible.
- Do not add secrets to the repository.
- Do not create `.env` files with real values.
- Use project-local tooling through `mise`.
- Run full validation before commit.
- Verify production after deployment.

## Proposed slice plan

### Slice 1: Tracking strategy documentation
Status: current slice.

Deliverables:
- Document analytics strategy.
- Update roadmap and privacy/security notes.
- No runtime analytics code yet.

### Slice 2: Privacy copy update
Status: current slice.

Deliverables:
- Update `/privacy` to disclose the selected analytics tool.
- Keep copy plain-language and minimal.
- Confirm no cookie banner is needed, or document if it is needed.

### Slice 3: Vercel Web Analytics implementation
Status: implemented.

Deliverables:
- Use the official `@vercel/analytics` package.
- Add the Vercel Analytics component in the Next.js App Router root layout.
- Keep tracking limited to public page analytics.
- Do not add custom events in this slice.
- Validate locally and in Vercel Preview/Production.

Operational follow-up:
- Confirm Web Analytics is enabled in the Vercel dashboard.
- Confirm production traffic appears for `https://juliovela.com`.
- Review analytics manually during the first launch period.

### Slice 4: Search Console setup
Deliverables:
- Add domain/property after custom domain approval.
- Submit sitemap.
- Verify crawl/indexing health.
- Document results.

### Slice 5: GA4 evaluation
Deliverables:
- Only evaluate after launch traffic exists or campaign needs emerge.
- Document whether GA4 is needed.
- If approved, update privacy and consent strategy before implementation.

### Slice 6: Daily analytics automation evaluation
Deliverables:
- Evaluate only after launch traffic exists.
- Confirm whether Vercel Web Analytics exposes enough data for automation in the available tooling.
- If not, compare privacy-friendly analytics tools with API access.
- Keep n8n out of the first analytics implementation.
- Document the selected data source before building any automated reports.

## Approval checklist before changing analytics
- Julio approves the analytics change.
- Privacy copy is updated if the data collection model changes.
- No ad pixels or retargeting are included.
- No secrets are committed.
- Vercel Preview validates correctly.
- Production smoke tests pass after deployment.

## Official references checked
- Vercel Web Analytics documentation: `https://vercel.com/docs/analytics/`
- Vercel Web Analytics privacy and compliance documentation: `https://vercel.com/docs/analytics/privacy-policy`
- Vercel Web Analytics quickstart: `https://vercel.com/docs/analytics/quickstart`

Notes from official docs reviewed on 2026-05-16:
- Vercel describes Web Analytics as storing anonymized data and not using cookies.
- Vercel describes visitor identification as using a generated hash rather than third-party cookies.
- The privacy page should still disclose analytics usage before implementation.
