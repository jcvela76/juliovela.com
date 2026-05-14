# Automation Plan

## Recommended strategy
Primary path: **n8n** for orchestration (future phase).
Fallback path: repository-native scripts for local reliability.

## Architecture decision
The repository is the source of truth for content.

n8n should orchestrate the workflow, but it should not become the source of truth and should not publish directly.

Recommended production flow:
1. Read content topics from GitHub.
2. Generate draft artifacts.
3. Open a GitHub branch or PR with the draft files.
4. Request Julio review.
5. Wait for explicit approval.
6. Merge approved work through GitHub.
7. Let Vercel Preview/Production follow the approved branch strategy.

## n8n path (planned)
- Cron trigger twice weekly
- Read topic queue
- Generate draft article and LinkedIn variant
- Generate image prompt
- Send review request
- Wait for approval
- Open PR / mark ready
- Publish only after explicit approval

## Local n8n development
n8n may be run locally in Docker for automation experiments.

Local Docker rules:
- Check ports before starting containers.
- Do not stop existing services without approval.
- Use the project port registry.
- Store real credentials in n8n credentials, local environment, or a secret manager.
- Do not commit real tokens, webhook secrets, API keys, or `.env` files.
- Export workflow JSON only after removing secrets.

Recommended local n8n port:
- `N8N_PORT=19110`

Before starting local Docker work, run checks like:
- `lsof -nP -iTCP:19110 -sTCP:LISTEN`
- `docker ps`

## Production automation recommendation
For production automation, prefer n8n Cloud or a dedicated n8n host.

Do not host n8n itself on Vercel. n8n needs long-running processes, durable workflow state, webhook handling, background workers, and credential storage. Vercel should host the website and previews, not the workflow engine.

## Script fallback (planned)
- `pnpm content:new-topic`
- `pnpm content:draft`
- `pnpm content:validate`
- `pnpm content:approve`
- `pnpm content:publish-ready`

## Script fallback purpose
Repository-native scripts should exist so the workflow remains usable if n8n is unavailable.

Scripts should:
- Create topic entries.
- Validate content files.
- Move drafts through approved states only with explicit command intent.
- Never publish to LinkedIn or production automatically.
- Produce clear pass/fail output for CI and local checks.
