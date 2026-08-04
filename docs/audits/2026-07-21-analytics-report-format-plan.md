# Analytics Report Format Plan

Date: 2026-07-21

## Scope

Docs-only planning slice for the first `juliovela.com` analytics report format.

This slice does not add scripts, automation, n8n, Vercel Drains, Google Analytics, secrets, storage, alerts, runtime code, or dashboard scraping.

## Decision

Use a weekly report as the default analytics rhythm.

During launch or after publishing a new article, allow ad hoc daily reports using the same format.

Rationale:

- Weekly reports reduce noise while traffic is still early.
- Daily reports are useful immediately after launch changes, SEO changes, or content publication.
- The Vercel Web Analytics API already supports the aggregate dimensions needed for a useful first report.
- City-level location should not block the first reporting workflow.

## Report audience

Primary reader:

- Julio Vela

Purpose:

- Understand whether the site is getting traffic.
- Identify which pages or articles are drawing attention.
- See basic traffic source and device patterns.
- Surface SEO/content follow-ups without overreacting to small numbers.

## Recommended report title

Use this format:

```text
juliovela.com Analytics Report — YYYY-MM-DD to YYYY-MM-DD
```

For ad hoc launch checks:

```text
juliovela.com Launch Analytics Check — YYYY-MM-DD
```

## Required report sections

### 1. Executive summary

Short human-readable summary.

Include:

- Total visitors
- Total page views
- Whether traffic is mostly direct, search, social, or unknown
- Most viewed page
- Any obvious issue or anomaly

Example:

```text
This week had 42 visitors and 83 page views. Most traffic went to the homepage and the first AI tools article. Referrers are still limited, so the next useful action is to improve distribution and keep monitoring Search Console.
```

### 2. Traffic snapshot

Include:

- Date range
- Visitors
- Page views
- Pages per visitor, if calculated locally from aggregates

Avoid:

- Visitor identity
- IP addresses
- Session-level records

### 3. Top pages

Use Vercel Web Analytics `requestPath` or `route`.

Include:

- Path
- Visitors
- Page views
- Note if the page is homepage, blog index, article, legal, or utility route

Recommended interpretation:

- Homepage traffic answers brand awareness.
- Blog traffic answers content interest.
- Legal page traffic is useful, but usually not a marketing success signal.
- Sitemap/robots traffic should be treated separately from human content interest if it appears.

### 4. Content signals

Include a short content/editorial read.

Questions:

- Which article or theme got attention?
- Did Spanish or English content receive meaningful traffic?
- Did `/blog` lead into article views?
- Did an article get traffic without homepage traffic?
- Is there a content gap worth exploring?

### 5. Geography

Use country-level reporting from Vercel Web Analytics API.

Include:

- Country
- Visitors
- Page views

Do not include:

- City, unless a future approved Drains or alternate analytics source is implemented.

Current limitation:

- The public Web Analytics API dimensions tested on 2026-07-21 do not include `city`.

### 6. Referrers

Use `referrerHostname`.

Include:

- Hostname
- Visitors
- Page views

Interpretation:

- Empty referrer usually means direct traffic, privacy-stripped traffic, typed/bookmarked URLs, or apps that do not pass referrer data.
- Do not over-interpret referrer data with low traffic.

### 7. Devices and browsers

Use:

- `deviceType`
- `browserName`

Include:

- Device mix
- Browser mix
- Any QA implication

Example QA implication:

```text
Mobile traffic increased, so the next content/design change should be checked on a real mobile device before release.
```

### 8. SEO and distribution notes

Include practical observations:

- Which pages may need better internal links
- Whether a blog post may need stronger title/meta copy
- Whether Search Console should be checked
- Whether LinkedIn distribution should be repeated or adjusted
- Whether Open Graph image/title previews should be reviewed

Do not invent rankings, search queries, or conversion claims.

### 9. Anomalies / watchlist

Include only meaningful anomalies.

Examples:

- Sudden spike in unknown referrers
- Traffic mostly to nonexistent paths
- Unexpected preview/staging host traffic
- Repeated traffic to legal pages only
- Sharp mobile-only increase after a visual change

Do not label traffic as an attack from Web Analytics alone.

Security note:

- Web Analytics can highlight suspicious traffic patterns, but security alerting should use Vercel Firewall, Observability, logs, or Drains if needed.

### 10. Recommended actions

Keep recommendations small.

Recommended action categories:

- Content
- SEO
- UX/mobile QA
- Distribution
- Technical tracking
- Security follow-up

Limit to three recommendations per report unless there is a real incident.

## Data source mapping

| Report field | Vercel API dimension/source | Status |
| --- | --- | --- |
| Visitors | visits count | Available |
| Page views | visits count | Available |
| Top pages | `requestPath` or `route` | Available |
| Countries | `country` | Available |
| Referrers | `referrerHostname` | Available |
| Device mix | `deviceType` | Available |
| Browser mix | `browserName` | Available |
| Operating system | `osName` | Available if needed |
| Environment | `environment` | Available if needed |
| UTM source/medium/campaign | `utmSource`, `utmMedium`, `utmCampaign` | Available if links use UTM tags |
| City | Not available in tested public API dimensions | Requires future decision |

## First report template

```markdown
# juliovela.com Analytics Report — YYYY-MM-DD to YYYY-MM-DD

## Executive summary
- Visitors:
- Page views:
- Most viewed page:
- Main traffic source:
- Main takeaway:

## Traffic snapshot
| Metric | Value |
| --- | ---: |
| Visitors |  |
| Page views |  |
| Pages per visitor |  |

## Top pages
| Page | Visitors | Page views | Note |
| --- | ---: | ---: | --- |
|  |  |  |  |

## Content signals
-

## Geography
| Country | Visitors | Page views |
| --- | ---: | ---: |
|  |  |  |

## Referrers
| Referrer | Visitors | Page views |
| --- | ---: | ---: |
|  |  |  |

## Devices and browsers
| Type | Visitors | Page views |
| --- | ---: | ---: |
|  |  |  |

## SEO and distribution notes
-

## Anomalies / watchlist
-

## Recommended actions
1.
2.
3.
```

## Review workflow

1. Generate the report.
2. Review the summary manually.
3. Check the dashboard if a number looks surprising.
4. Convert only clear findings into work items.
5. Avoid making product decisions from one low-traffic day.

## Privacy rules

- Keep reports aggregate-only.
- Do not store raw visitor events.
- Do not store IP addresses.
- Do not store user identifiers.
- Do not attempt cross-site tracking.
- Do not add ad pixels or retargeting.
- Do not add Google Analytics unless a future slice approves it.
- Update the privacy page before changing the data collection model.

## Next recommended slice

Create a local read-only report command.

Proposed command:

```text
mise exec -- pnpm analytics:report
```

Expected behavior:

- Reads the date range.
- Queries Vercel Web Analytics aggregates.
- Prints a Markdown report.
- Does not write persistent visitor data.
- Does not require committed secrets.
- Does not scrape the dashboard.
