# security-env

## Skill purpose
Protect secrets, credentials, and environment-variable handling.

## When to use it
Use before any configuration involving environment variables, webhooks, or deployment paths.

## Inputs it expects
- Integration map
- Environment variable list
- Automation/chaining touchpoints

## Output it should produce
- Security posture recommendations
- `.env.example` variable list
- Credential handling and webhook-auth guidance

## Guardrails
- No secrets in git.
- Use `.env.example` only.
- Real environment values are out-of-repo.
- Never print tokens.
- Never commit API keys.
- Document required env vars without values.
- Review webhook auth and source validation before automation.

## Checklist
- [ ] Secret scanning logic applied to docs and scripts
- [ ] `.env.example` contains names only
- [ ] Real credentials stored in secure secret stores
- [ ] Webhook auth is reviewed
- [ ] Sensitive outputs are excluded from logs

## Example prompt
"Review this workflow plan for secret leakage and propose secure env/secret handling controls."
