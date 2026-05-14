# Vercel Function Size Fix Audit

Date: 2026-05-14

## Context
The first Vercel deployment for `juliovela.com` failed after `next build` completed.

Vercel reported:
- A Serverless Function exceeded the 250 MB uncompressed maximum size.
- The oversized traced dependency was `.pnpm-store/v10/files`.

Affected routes:
- `/blog`
- `/drafts-preview`
- `/blog/[slug]`

## Likely cause
The content-backed routes read files from the repository using Node `fs`.

Next.js output file tracing uses static analysis of imports and `fs` usage. In this deployment, tracing included Vercel's local `.pnpm-store`, making the serverless function bundles too large.

## Fix
Add explicit Next 14-compatible output file tracing configuration in `next.config.mjs`.

Excludes:
- `./.pnpm-store/**/*`

Includes:
- `./content/approved/blog/**/*` for `/blog`, `/blog/[slug]`, and `/sitemap.xml`
- `./content/assets/prompts/**/*` for `/drafts-preview`
- `./content/drafts/blog/**/*` for `/drafts-preview`
- `./content/drafts/linkedin/**/*` for `/drafts-preview`

## Validation expectations
Local validation:
- `mise exec -- pnpm check:live`
- `mise exec -- pnpm check:final`
- `git diff --check`
- `next build` must not report invalid `next.config.mjs` keys.

Vercel validation:
- Redeploy the fix branch.
- Confirm build succeeds.
- Confirm Vercel logs no longer report `.pnpm-store` as a large traced dependency.
- Confirm no function exceeds the 250 MB uncompressed limit.

Route checks after deployment:
- `/`
- `/blog`
- `/blog/choosing-the-right-ai-tool`
- `/drafts-preview`
- `/privacy`
- `/disclosures`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

## Guardrails
- Do not connect custom domain yet.
- Do not change DNS.
- Do not add secrets.
- Do not mark approved content as `published`.
- Do not add analytics or automation in this fix.
