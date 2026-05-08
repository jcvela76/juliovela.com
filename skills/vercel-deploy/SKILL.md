# vercel-deploy

## Skill purpose
Guide safe deployment tasks once implementation starts.

## When to use it
Use for preparing or reviewing deploy procedures and checks.

## Inputs it expects
- Branch and merge context
- Validation outputs
- Environment requirements

## Output it should produce
- Preview and production deployment plan
- Approval checklist
- Env var documentation plan

## Guardrails
- Preview deployments for branch/PR workflows.
- Production only from `main` and with explicit approval.
- No production deploy without approval.
- No secrets in repository.
- Document env vars in `.env.example` only.
- Validate build before deployment.
- DNS changes require explicit approval.

## Checklist
- [ ] Preview deployment path defined
- [ ] Build/lint/typecheck/test checks passed
- [ ] Approval gate completed
- [ ] Env vars documented without values
- [ ] Rollback path noted

## Example prompt
"Create a Vercel deployment checklist (preview + production promotion) that enforces manual approval and build validation."
