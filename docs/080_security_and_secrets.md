# Security and Secrets

## Core policy
- No secrets in git.
- Use `.env.example` for documentation only.
- Real credentials stay in local env, Vercel, or secret manager.

## Workflow constraints
- Never commit API keys or tokens.
- Never print secrets in logs.
- Use least-privilege tokens and webhook auth for automation.
- Review credentials usage before enabling any automation integration.

## Public transparency pages
- `/privacy` exists as a minimal pre-launch privacy page.
- `/disclosures` exists as a minimal pre-launch disclosure page.
- Current public copy states that the site does not use accounts, contact forms, newsletter signup, advertising pixels, payment flows, Google Analytics, retargeting scripts, or behavioral advertising tools.
- Current public copy is prepared for Vercel Web Analytics as the intended lightweight analytics tool.
- Update `/privacy` before adding analytics, cookies, forms, newsletters, accounts, payments, or other data collection.
- Update `/disclosures` before publishing affiliate links, sponsorships, paid recommendations, or other material relationships.

## Analytics and tracking
- Analytics is not enabled yet.
- The recommended first tracking tool is Vercel Web Analytics, documented in `docs/120_analytics_and_tracking_plan.md`.
- Do not add Google Analytics, advertising pixels, retargeting scripts, or marketing tags without a separate approval slice.
- Before enabling analytics, update `/privacy` to disclose the tool, what is collected, whether cookies are used, and whether any consent UI is required.
- Google Search Console may be configured around custom domain launch for SEO monitoring, but domain/DNS work still requires explicit approval.
