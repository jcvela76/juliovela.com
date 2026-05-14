# Vercel Deployment Plan

## Current setup status
- Repository: `jcvela76/juliovela.com`
- Framework: Next.js App Router
- Package manager: `pnpm@10.33.4`
- Local runtime: `mise` with Node `22.22.2`
- Vercel runtime target: Node `22.x`
- Production branch target: `main`
- Preview branch pattern: all feature branches and PRs
- Real Vercel project settings are not configured in this repo.
- `.vercel/` must remain untracked.

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

## First Vercel Preview setup checklist
Use the Vercel Dashboard first. Do not add CLI tokens, `.vercel/`, or project IDs to the repository.

### Import project
- Open Vercel dashboard.
- Create a new project from GitHub.
- Select repository: `jcvela76/juliovela.com`.
- Use root directory: repository root.
- Use framework preset: Next.js.
- Do not configure `juliovela.com` domain yet.
- Do not add production-only environment variables yet.

### Build settings
Use project settings unless Vercel auto-detects equivalent values:
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: leave as Vercel/Next.js default
- Development command: not required for Vercel deployment
- Node.js version: `22.x`

### Environment variables
Current project status:
- No real runtime secrets are required for the static/public site.
- No `.env` or `.env.local` file should be committed.
- If future env vars are needed, document keys in `.env.example` without values.
- Set real values only in Vercel dashboard, local `.env.local`, n8n credentials, or a secure secret manager.

### Git deployment behavior
- Feature branches and PRs should create Preview deployments.
- Merges to `main` may create a Production deployment in Vercel by default.
- Do not connect the custom domain until production readiness is explicitly approved.
- Do not treat a Vercel Production deployment as content publication unless the content status is intentionally `published`.

### Preview validation checklist
For the first Preview deployment, review:
- `/`
- `/blog`
- `/blog/choosing-the-right-ai-tool`
- `/privacy`
- `/disclosures`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

Expected behavior:
- Approved article is visible in Preview.
- Approved article remains `noindex`.
- `/drafts-preview` is not linked from public nav or footer.
- `/drafts-preview` is blocked from production rendering.
- `robots.txt` excludes `/drafts-preview`.
- `sitemap.xml` excludes preview-only approved articles.
- Default Open Graph image route exists.

### First Preview acceptance criteria
- Vercel build succeeds.
- Preview URL loads without runtime errors.
- No serverless function exceeds the Vercel uncompressed size limit.
- Build logs do not show `.pnpm-store` bundled into application functions.
- Metadata and SEO routes are present.
- No secrets are committed.
- `.vercel/` remains untracked.
- No DNS or custom domain changes were made.
- Production launch remains blocked pending explicit approval.

## Serverless function size guardrail
The first Vercel deployment attempt failed because serverless functions for content-backed routes exceeded the 250 MB uncompressed limit.

Observed oversized routes:
- `/blog`
- `/blog/[slug]`
- `/drafts-preview`

Observed oversized traced dependency:
- `.pnpm-store/v10/files`

Mitigation:
- `next.config.mjs` uses Next 14-compatible `experimental.outputFileTracingExcludes` to exclude `./.pnpm-store/**/*`.
- `next.config.mjs` uses Next 14-compatible `experimental.outputFileTracingIncludes` to include only required content folders for content-backed routes.

Follow-up validation:
- Redeploy from the fix branch.
- Confirm the Vercel build no longer reports `.pnpm-store` in large dependencies.
- Confirm `/blog`, `/blog/[slug]`, `/drafts-preview`, `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` still work.

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

## Official references checked
- Vercel Git deployments documentation: Preview deployments are created from PRs/branches when using Git integration.
- Vercel deployment methods documentation: Git deployments are the primary deployment path for connected repositories.
- Vercel project settings documentation: build settings, root directory, install command, and Node.js version are project-level settings.
- Vercel Node.js version documentation: new projects use the latest supported LTS by default; this project should target Node `22.x`.
