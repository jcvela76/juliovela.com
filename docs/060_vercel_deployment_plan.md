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

## Step-by-step setup plan
Use separate slices so hosting setup does not get mixed with SEO, DNS, or publishing.

### 1. SEO readiness before Vercel setup
- Implement metadata defaults.
- Add route-level metadata.
- Add robots and sitemap.
- Confirm preview-only content is not treated as production-published.
- Validate with the project-local `mise` toolchain.

### 2. Vercel Preview setup
- Connect the GitHub repository to Vercel.
- Confirm the root directory is the repository root.
- Confirm install command: `pnpm install --frozen-lockfile`.
- Confirm build command: `pnpm build`.
- Confirm output uses the default Next.js settings.
- Configure Node.js as `22.x` in Vercel project settings.
- Do not configure production domain yet.

### 3. Preview validation
- Open the Vercel Preview URL from the PR.
- Review `/`, `/blog`, and one article page.
- Confirm `/drafts-preview` is not linked from public nav or footer.
- Confirm approved preview content is reviewable but not marked `published`.
- Confirm legal pages load.

### 4. Production readiness review
- Confirm production rendering includes only `published` articles.
- Confirm no draft or approved-only preview URLs are included in production sitemap.
- Confirm robots rules are correct.
- Confirm no secrets or real environment values are committed.
- Confirm launch approval from Julio.

### 5. Domain and launch
- Configure `juliovela.com` only after explicit approval.
- Make DNS changes only after explicit approval.
- Deploy or promote production only after explicit approval.
- Run post-launch smoke checks.

## Local versus Vercel runtime
- Local development uses exact versions through `.mise.toml`.
- Vercel should use Node `22.x`.
- Do not change global Node or pnpm versions to match Vercel.
- Do not commit `.vercel/`.

## What not to do in the first Vercel slice
- Do not configure DNS.
- Do not promote production.
- Do not add analytics.
- Do not add n8n automation.
- Do not create secrets.
- Do not publish approved preview articles.
