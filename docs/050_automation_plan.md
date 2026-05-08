# Automation Plan

## Recommended strategy
Primary path: **n8n** for orchestration (future phase).
Fallback path: repository-native scripts for local reliability.

## n8n path (planned)
- Cron trigger twice weekly
- Read topic queue
- Generate draft article and LinkedIn variant
- Generate image prompt
- Send review request
- Wait for approval
- Open PR / mark ready
- Publish only after explicit approval

## Script fallback (planned)
- `pnpm content:new-topic`
- `pnpm content:draft`
- `pnpm content:validate`
- `pnpm content:approve`
- `pnpm content:publish-ready`
