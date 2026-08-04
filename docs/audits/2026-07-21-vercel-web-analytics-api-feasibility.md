# Vercel Web Analytics API Feasibility Audit

Date: 2026-07-21

## Scope

Read-only feasibility audit for using the public Vercel Web Analytics API as the first reporting source for `juliovela.com`.

No runtime code, Vercel project settings, deployments, secrets, drains, Google Analytics, n8n workflows, or persistent storage were changed.

## Summary

The public Vercel Web Analytics API is feasible for aggregate reporting on:

- Visitors
- Page views
- Request paths
- Countries
- Referrer hostnames
- Device types
- Browser names

City-level reporting is not available through the public aggregate dimensions tested. A `by=city` query returned a validation error with the allowed dimensions, and `city` was not included.

If city-level reporting becomes important, the recommended path is a separate Web Analytics Drains design slice because the documented drain schema can include raw event location fields such as city and region.

## Project state verified

- Vercel CLI authentication is available in this local environment.
- The Vercel team is on Pro.
- The `juliovela-com` Vercel project has Web Analytics enabled.
- The project Web Analytics state reports existing data.

Internal Vercel project/team identifiers were used only for read-only API calls and are not required in committed scripts or docs.

## API checks performed

### Total count

The visits count endpoint returned aggregate totals for the project.

Observed point-in-time response:

- Visitors: 29
- Page views: 57
- API range returned by Vercel: 2026-05-14 through 2026-07-22 UTC boundary

### Country aggregation

The visits aggregate endpoint returned country-level data for the reviewed range.

Observed point-in-time response for 2026-07-14 through 2026-07-21:

- US: 3 visitors, 3 page views
- CA: 1 visitor, 1 page view

### Request path aggregation

The visits aggregate endpoint returned request path data.

Observed point-in-time response for 2026-07-14 through 2026-07-21:

- `/`: 4 visitors, 4 page views

### Referrer aggregation

The visits aggregate endpoint returned referrer hostname data.

Observed point-in-time response for 2026-07-14 through 2026-07-21:

- Empty referrer hostname: 4 visitors, 4 page views

### Device aggregation

The visits aggregate endpoint returned device type data.

Observed point-in-time response for 2026-07-14 through 2026-07-21:

- Desktop: 3 visitors, 3 page views
- Mobile: 1 visitor, 1 page view

### Browser aggregation

The visits aggregate endpoint returned browser data.

Observed point-in-time response for 2026-07-14 through 2026-07-21:

- Chrome: 2 visitors, 2 page views
- Microsoft Edge: 1 visitor, 1 page view
- Mobile Safari: 1 visitor, 1 page view

### City aggregation

A `by=city` aggregation test failed with a validation error.

Allowed dimensions reported by the API:

- `hour`
- `day`
- `week`
- `month`
- `year`
- `country`
- `deviceType`
- `environment`
- `requestPath`
- `referrerHostname`
- `osName`
- `browserName`
- `route`
- `utmSource`
- `utmMedium`
- `utmCampaign`
- `utmContent`
- `utmTerm`
- `flags`
- JSON feature flag dimensions such as `flags/<name>`

Conclusion: use country for API reports. Do not promise city-level reports from the public Web Analytics API.

## Recommended implementation roadmap

### Slice A: Report format

Define the exact daily or weekly report format before writing automation.

Recommended fields:

- Date range
- Visitors
- Page views
- Top paths/routes
- Countries
- Referrer hostnames
- Device types
- Browser names
- Content/SEO notes
- Questions or anomalies for Julio to review

### Slice B: Local read-only report command

Create a repo-native command that reads from the Vercel Web Analytics API.

Recommended command:

- `mise exec -- pnpm analytics:report`

Rules:

- Use a local environment variable or existing Vercel CLI auth.
- Do not commit tokens.
- Do not write raw visitor records.
- Output a readable Markdown report.
- Keep reports aggregate-only.

### Slice C: Optional scheduled report

After the local report command is approved, decide whether to schedule it.

Options:

- Manual local run.
- GitHub Actions cron with `VERCEL_TOKEN` stored in GitHub Secrets.
- Vercel Cron only if a protected report endpoint is approved.
- n8n later, only if orchestration becomes useful.

### Slice D: Alerts

Do not implement alerts until baseline traffic exists.

Initial low-risk alert ideas:

- Unexpected page view spike.
- Unknown high-volume referrer.
- Repeated traffic to nonexistent paths.
- Sudden increase in non-production hostnames.

Security note:

- Web Analytics is not a full attack-detection system.
- For security monitoring, prefer Vercel Firewall, Observability, logs, and Drains.

### Slice E: City-level reporting decision

If city-level reporting becomes important, plan Web Analytics Drains separately.

That slice must decide:

- Endpoint location
- Signature verification
- Secret storage
- Aggregation model
- Raw event retention
- Privacy page update
- Cost and monitoring

## Recommendation

Build the first analytics automation on the public Web Analytics API.

Do not add Google Analytics, Drains, n8n, or custom storage yet. The API is enough for the first useful daily/weekly report, except for city-level reporting.

## Sources checked

- Vercel Web Analytics: `https://vercel.com/docs/analytics`
- Query Web Analytics with the API: `https://vercel.com/docs/analytics/web-analytics-api`
- Public Web Analytics API announcement: `https://vercel.com/changelog/web-analytics-api`
- Vercel Drains: `https://vercel.com/docs/drains`
- Web Analytics Drains Reference: `https://vercel.com/docs/drains/reference/analytics`
