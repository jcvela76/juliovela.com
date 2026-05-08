# Vercel Deployment Plan

## Environment model
- Branch previews for validation
- Production from `main` after explicit approval

## Rules
- No automatic production deploys.
- No DNS changes without explicit approval.
- Validate build before deployment.
- Document env vars in `.env.example` only (no real values).

## Future config approach
- Keep deployments preview-first
- Maintain clear environment separation
- Track deployment commands/documentation in CI docs before enabling
