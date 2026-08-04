# Analytics and Tracking Plan

## Purpose
Define a privacy-aware analytics approach for `juliovela.com` before custom domain launch.

The goal is to understand basic site performance and content interest without adding unnecessary tracking complexity, cookies, advertising pixels, or invasive user profiling.

## Current status
- Vercel Web Analytics is implemented in the app through `@vercel/analytics`.
- The root App Router layout renders the official `<Analytics />` component.
- The public privacy page is prepared for Vercel Web Analytics as the intended lightweight analytics tool.
- Web Analytics was confirmed receiving production traffic in the Vercel dashboard on 2026-07-21.
- Read-only Vercel Web Analytics API access was confirmed through the authenticated Vercel CLI on 2026-07-21.
- The dashboard currently exposes country-level location for this project view, not city-level location.
- The public Web Analytics API supports aggregated reporting for visitors, page views, routes, countries, referrers, devices, browsers, operating systems, environments, feature flags, and UTM dimensions.
- City is not currently available as a public Web Analytics API aggregation dimension for this project. A read-only `by=city` test returned a validation error with the supported dimension list.
- Because the team has Vercel Pro, Web Analytics Drains remain the likely future option if city-level analytics become important.
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
- Use the Vercel dashboard as the source of truth for visual/manual review.
- Use the public Web Analytics API as the first candidate for repo-native daily or weekly aggregate reports.
- Keep automated reporting read-only and aggregate-only.
- Defer city-level reporting unless there is a clear marketing or security reason to collect it.
- Revisit n8n only after the reporting source, report format, credentials model, and privacy posture are approved.

Future daily report options:
- Repo-native script that calls the Vercel Web Analytics API with a local or CI secret.
- Scheduled GitHub Actions report if storing a Vercel read-only token in GitHub Secrets is approved.
- Local scheduled report from Julio's machine for low-risk personal review.
- Vercel Drains only if API-level aggregation is insufficient.
- A privacy-friendly third-party analytics tool only if Vercel cannot answer the required reporting questions.

Do not scrape dashboards or store visitor-level data just to create daily summaries.

## Vercel Pro analytics position

Vercel Pro should be explored before adding Google Analytics.

Current decision:
- Keep Vercel Web Analytics as the primary analytics layer.
- Use the dashboard for early launch review.
- Prefer a read-only Web Analytics API feasibility slice before adding new infrastructure.
- Use Web Analytics Drains only if the API cannot answer required reporting questions such as city-level traffic.

Reasoning:
- The dashboard is already receiving production data.
- The standard dashboard provides enough information for early launch review: pages, routes, hostnames, referrers, country, browser, device, and operating system.
- The public Web Analytics API can support aggregated reports if its available dimensions are enough.
- Web Analytics Drains can expose richer raw event fields, including `city` and `region`, but require endpoint security, secret management, storage, retention, and monitoring.

Privacy position:
- Keep reporting aggregated.
- Do not store IP addresses.
- Do not store emails, names, or personal identifiers.
- Avoid retaining raw session or device identifiers unless a future approved design proves they are necessary.
- Update the privacy page before changing the data collection or storage model.

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
Status: partially answered by the API feasibility audit.

Deliverables:
- Evaluate only after launch traffic exists.
- Confirm whether Vercel Web Analytics exposes enough data for automation in the available tooling.
- Confirmed on 2026-07-21: API can support aggregate reports for totals, routes, countries, referrers, devices, and browsers.
- Confirmed on 2026-07-21: city-level aggregation is not available through the public API dimensions tested.
- If city becomes required, compare Web Analytics Drains against privacy-friendly analytics tools with API access.
- Keep n8n out of the first analytics implementation.
- Document the selected data source before building any automated reports.

### Slice 7: Vercel Analytics Pro audit
Status: documented.

Deliverables:
- Confirm production dashboard data exists.
- Document dashboard limits for city-level visibility.
- Document public Web Analytics API as the first automation candidate.
- Document Web Analytics Drains as the likely path for city-level reporting if the API is insufficient.
- Keep GA4 deferred.

Follow-up:
- Use the read-only Web Analytics API feasibility audit as the basis for the reporting roadmap.
- Do not create Drains until endpoint, storage, security, retention, and privacy plans are approved.

### Slice 8: Read-only Web Analytics API feasibility
Status: documented on 2026-07-21.

Deliverables:
- Confirmed authenticated read-only Vercel CLI API access.
- Confirmed Web Analytics is enabled and has data for the production project.
- Confirmed aggregate count and grouping queries work.
- Confirmed country, request path, referrer hostname, device type, and browser name can be queried.
- Confirmed `city` is not an allowed aggregate dimension in the public API response tested.

Follow-up:
- Build a repo-native analytics report script only after approving the report format and credential model.
- Keep all tokens out of git.
- Keep report output aggregate-only.

### Slice 9: Repo-native analytics report script
Status: pending after report format approval.

Goal:
- Create a local, read-only report command that summarizes Vercel Web Analytics without scraping the dashboard.

Initial report fields:
- Date range
- Total visitors
- Total page views
- Top pages/routes
- Countries
- Referrer hostnames
- Device types
- Browser names
- Notes for content/SEO follow-up

Guardrails:
- No secrets in git.
- No raw visitor storage.
- No city reporting unless Drains or another approved source is introduced.
- No n8n in this slice.
- No dashboard scraping.
- No alerts until baseline traffic exists.

### Slice 9A: Analytics report format
Status: documented on 2026-07-21.

Goal:
- Define the daily or weekly analytics report shape before writing automation.

Deliverables:
- Standard report sections.
- Data source mapping.
- Privacy guardrails.
- Review workflow.
- Escalation rules for anomalies.

Decision:
- Start with a weekly report format.
- Allow ad hoc daily reports during launch checks.
- Keep reports aggregate-only.
- Do not include city-level reporting until a separate Drains or alternate analytics source decision is approved.

Reference:
- `docs/audits/2026-07-21-analytics-report-format-plan.md`

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
