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
- Vercel Web Analytics is implemented in the app through `@vercel/analytics`.
- Confirm analytics traffic in the Vercel dashboard after each relevant launch/deployment milestone.
- Do not add Google Analytics, advertising pixels, retargeting scripts, or marketing tags without a separate approval slice.
- Before adding any new analytics tool beyond Vercel Web Analytics, update `/privacy` to disclose the tool, what is collected, whether cookies are used, and whether any consent UI is required.
- Google Search Console may be configured around custom domain launch for SEO monitoring, but domain/DNS work still requires explicit approval.

## Firewall and attack alerting
- Use Vercel's built-in platform firewall and DDoS mitigation as the first protection layer.
- Configure Vercel dashboard alerts for usage/error anomalies where available for the account plan.
- Review the Vercel project Firewall dashboard after launch and during traffic spikes.
- If the site appears to be under a targeted attack, consider enabling Vercel Attack Challenge Mode from the dashboard.
- Do not create custom firewall rules, IP blocks, or challenge policies without documenting the intent and approval.
- Do not use n8n for security alerting in the first launch phase.
- If webhook-based alerts are added later, document the endpoint, authentication approach, and secret storage before enabling.

Current Vercel security references:
- Vercel Firewall provides platform-wide DDoS mitigation on all plans.
- Vercel Attack Challenge Mode is available on all plans and should be used primarily during targeted attacks, not as a permanent default.
- Vercel Alerts can notify by email, Slack, or webhook where available for the account plan.

Operational first step:
- In the Vercel dashboard, review project `Firewall`, `Observability`, and `Alerts` settings.
- Enable available Vercel-native notifications first.
- Defer custom webhook automation until there is a clear need and a documented endpoint.
