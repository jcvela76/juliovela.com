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
