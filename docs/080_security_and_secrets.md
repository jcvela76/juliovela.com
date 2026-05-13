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
- Current public copy states that the site does not use accounts, contact forms, newsletter signup, analytics, advertising pixels, or payment flows.
- Update `/privacy` before adding analytics, cookies, forms, newsletters, accounts, payments, or other data collection.
- Update `/disclosures` before publishing affiliate links, sponsorships, paid recommendations, or other material relationships.
