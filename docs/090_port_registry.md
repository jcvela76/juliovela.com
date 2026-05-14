# Port Registry

Reserved local ports for this project:
- `WEB_PORT=19100`
- `STORYBOOK_PORT=19101`
- `N8N_PORT=19110`
- `AUTOMATION_API_PORT=19120`
- `POSTGRES_PORT=19132`

## Safety rule
Before any container or local service start, check port availability to avoid conflicts.

## Required pre-checks
Before starting a local service, inspect active listeners and containers:
- `lsof -nP -iTCP:<PORT> -sTCP:LISTEN`
- `docker ps`

Do not stop or replace an occupied port without explicit approval.

## Automation notes
- Local n8n experiments should use `N8N_PORT=19110`.
- If a database is needed later for local automation experiments, use `POSTGRES_PORT=19132`.
- The website preview should use `WEB_PORT=19100` through `mise exec -- pnpm dev:local`.
- Do not add Docker Compose services until the required ports and secrets are documented.
