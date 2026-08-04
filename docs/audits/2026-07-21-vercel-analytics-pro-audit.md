# Vercel Analytics Pro Audit

Date: 2026-07-21

## Scope

Docs-only audit for the current `juliovela.com` analytics setup.

No runtime code, deploy settings, Vercel project settings, secrets, drains, API tokens, Google Analytics, or automation were changed in this slice.

## Current implementation

- `@vercel/analytics` is installed in `package.json`.
- `src/app/layout.tsx` imports `Analytics` from `@vercel/analytics/next`.
- The root App Router layout renders `<Analytics />`.
- Vercel Web Analytics is active for the production project.
- The Vercel dashboard was reviewed for `juliovela-com` in `Production` with the `Last 7 Days` filter.

Observed dashboard snapshot:

- Visitors: 4
- Page Views: 4
- Bounce Rate: 100%
- Top visible page: `/`
- Referrers: no data for the selected period
- Country: United States of America, 100%
- Devices: Desktop 50%, Mobile 50%
- Operating Systems: Windows 50%, Android 25%, iOS 25%
- Online visitors at review time: 0

This snapshot is only a point-in-time review. Dashboard values will change as traffic changes.

## Dashboard capability

The standard Vercel Web Analytics dashboard supports practical early-launch reporting:

- Pages
- Routes
- Hostnames
- Referrers
- UTM Parameters, when available for the account/product tier
- Country
- Browsers
- Devices
- Operating systems
- Custom events, if configured
- Feature flags, if configured

The dashboard view reviewed for this project showed country-level location, not city-level location.

## Public Web Analytics API capability

Vercel announced a public Web Analytics API in May 2026.

Useful fit:

- Pull aggregated analytics without scraping the dashboard.
- Build daily or weekly summaries.
- Report page views, visitors, routes, countries, referrers, and devices if the required dimensions are exposed.
- Keep reports aligned with dashboard totals because the API reads from the same aggregated data model.

Current limitation for our city question:

- Official API announcement mentions aggregate grouping by time, route, country, referrer, device, feature flag, and custom event data.
- It does not clearly confirm city-level aggregation.
- Treat API-based city reporting as unconfirmed until tested against the actual project with a read-only token.

## Vercel Web Analytics Drains capability

Because the team has Vercel Pro, Drains are a viable future option.

Web Analytics Drains can forward raw analytics events to an external HTTPS endpoint. The documented Web Analytics Drain schema includes:

- `path`
- `referrer`
- `queryParams`
- `route`
- `country`
- `region`
- `city`
- `osName`
- `clientName`
- `clientType`
- `deviceType`
- `vercelEnvironment`
- `deployment`

This is the likely path if city-level analysis becomes important.

## Privacy and data minimization position

Keep this project privacy-forward.

Preferred reporting data:

- Date bucket
- Path or route
- Country
- Region, only if needed
- City, only if needed
- Device type
- Browser
- Referrer domain
- Page views
- Visitors

Avoid storing:

- IP addresses
- Emails or names
- Raw user identifiers
- Unneeded session IDs
- Unneeded device IDs
- Cross-site profiles
- Full user-level event histories

If Drains are implemented, aggregate quickly and avoid retaining raw event payloads longer than needed for processing.

## Security requirements for Drains

Do not create a Drain until the receiving endpoint and storage plan are designed.

Any future Drain endpoint must:

- Verify Vercel signatures against the raw request body.
- Store the signing secret only in Vercel environment variables or a secure secret manager.
- Reject unsigned or invalid requests.
- Log only safe operational metadata.
- Avoid printing payloads that may contain unnecessary visitor-level fields.
- Use a small retention window for raw events, or skip raw storage entirely and write aggregates only.

## Options

### Option A: Dashboard-only

Use the Vercel dashboard manually.

Pros:

- No new code.
- No new storage.
- Lowest privacy and operational risk.

Cons:

- City-level reporting is not visible in the current dashboard view.
- Daily reports are manual.

### Option B: Public Web Analytics API

Use the Vercel Web Analytics API for read-only aggregate reports.

Pros:

- Good fit for weekly summaries.
- Avoids maintaining a raw event pipeline.
- Lower security risk than Drains.

Cons:

- City-level aggregation is not confirmed from official docs.
- Requires a Vercel token if automated.

### Option C: Web Analytics Drains

Forward Web Analytics events to a secure endpoint and aggregate the dimensions we need.

Pros:

- Documented schema includes `city` and `region`.
- Best fit for city-level reporting and future custom dashboards.

Cons:

- Requires endpoint, signature verification, secret management, storage, retention policy, and monitoring.
- More operational responsibility.

## Recommendation

Use a stepped approach:

1. Continue using the Vercel dashboard for early launch traffic.
2. Run a read-only Web Analytics API feasibility slice before adding infrastructure.
3. If city-level reporting is not available through the API, create a Drains design slice.
4. Implement Drains only after the endpoint, storage, security, retention, and privacy plan are approved.

Do not add Google Analytics yet. GA4 remains useful later for marketing attribution, but Vercel Pro should be explored first because it keeps the stack simpler and more aligned with the current hosting platform.

## Proposed next slices

### Slice 1: Read-only Web Analytics API feasibility

Goal:

- Confirm whether the public API can return the needed aggregated data for `juliovela.com`.

Allowed:

- Read-only Vercel API calls.
- No secrets in git.
- No runtime changes.
- No persistent storage.

Questions to answer:

- Can we query visitors/page views by date?
- Can we query by route/path?
- Can we query by country?
- Can we query by referrer?
- Can we query by device?
- Is city available through API grouping or filtering?

### Slice 2: Analytics reporting design

Goal:

- Design the report format before automation.

Potential weekly report:

- Total visitors
- Total page views
- Top pages
- Countries
- Cities, if available
- Devices
- Referrers
- Notable changes
- Content/SEO observations

### Slice 3: Drains architecture plan

Goal:

- Plan a secure city-level analytics pipeline only if API is insufficient.

Decisions needed:

- Endpoint location
- Storage location
- Aggregation model
- Retention policy
- Signature verification
- Alerting/monitoring
- Privacy copy update

## Official references checked

- Vercel Web Analytics: `https://vercel.com/docs/analytics`
- Using Web Analytics: `https://vercel.com/docs/analytics/using-web-analytics`
- Filtering Analytics: `https://vercel.com/docs/analytics/filtering`
- Tracking Custom Events: `https://vercel.com/docs/analytics/custom-events`
- Public Web Analytics API announcement: `https://vercel.com/changelog/web-analytics-api`
- Web Analytics Drains Reference: `https://vercel.com/docs/drains/reference/analytics`
- Drains Overview: `https://vercel.com/docs/drains`
