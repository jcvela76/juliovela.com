# Vercel Preview Readiness Audit

Date: 2026-05-14

## Scope
Audit whether the repository is ready for the first Vercel Preview setup.

This audit does not configure Vercel, deploy production, change DNS, create secrets, or modify runtime versions.

## Current repository status
- Branch baseline: `main`
- Framework: Next.js App Router
- Package manager: `pnpm@10.33.4`
- Local runtime manager: `mise`
- Local Node version: `22.22.2`
- Vercel runtime target: Node `22.x`
- Production branch target: `main`
- Preview strategy: feature branches and PRs

## Implemented prerequisites
- Minimal homepage exists.
- Blog index and article route exist.
- Approved preview article exists.
- Draft preview route exists and is not public nav/footer content.
- Metadata foundation exists.
- Favicon/icon metadata exists.
- `robots.txt` route exists.
- `sitemap.xml` route exists.
- Default Open Graph image route exists.
- `.vercel/` is ignored in `.gitignore`.
- Validation scripts exist:
  - `pnpm check:live`
  - `pnpm check:final`
  - `pnpm check:all`

## Vercel project settings to use
- Framework preset: Next.js
- Root directory: repository root
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm build`
- Output directory: default Next.js/Vercel output
- Node.js version: `22.x`
- Production branch: `main`

## Environment variables
No real runtime secrets are required for the current static/public site.

Rules:
- Do not commit `.env`, `.env.local`, or real secrets.
- Keep `.env.example` for future documentation only.
- Use Vercel dashboard for future hosted environment variables.
- Use local `.env.local` only for local secrets if needed later.

## First Preview deployment checks
Review these routes on the first Vercel Preview URL:
- `/`
- `/blog`
- `/blog/choosing-the-right-ai-tool`
- `/privacy`
- `/disclosures`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

Expected:
- Preview deployment builds successfully.
- Approved article is visible in Preview.
- Approved article remains preview-only and `noindex`.
- `/drafts-preview` is not linked publicly.
- `/drafts-preview` is disallowed by robots.
- `sitemap.xml` excludes preview-only approved content.
- Default Open Graph image route exists.

## Risks and guardrails
- Vercel may create Production deployments from `main` after Git integration is enabled.
- Do not connect `juliovela.com` custom domain until production readiness is explicitly approved.
- Do not change DNS in this slice.
- Do not mark approved content as `published` in this slice.
- Do not commit `.vercel/`.
- Do not add analytics or cookies until legal/privacy review is updated.

## Recommendation
Proceed with Vercel Preview setup through the Vercel Dashboard after this documentation branch is reviewed and merged.

Use Preview deployments first. Delay custom domain and production launch until a separate production readiness review.
