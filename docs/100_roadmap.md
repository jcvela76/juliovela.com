# Roadmap

## Phase 0 (Foundation)
- Governance and Codex instructions
- Skills and workflow scaffolding

## Phase 1 (Documentation)
- Finalize docs foundation
- Validate content schema and approval process

## Phase 2 (Website implementation)
- Minimal Next.js app + sectioned homepage
- Minimal legal transparency pages
- MDX article pipeline
- Slice 2: Minimal scaffold implemented and validated with mise-managed Node/pnpm.
- Homepage polish: approved logo-first intro, full-screen scroll panels, adaptive header contrast, and active section navigation reviewed in local preview.
- Legal mini-slice: footer links, `/privacy`, and `/disclosures` implemented as pre-launch transparency pages.
- Content foundation slice: use repo-first content storage with Git as source of truth, then add topic queue, draft folders, examples, and `content:validate`.
- Pre-content audit: no blocking refactor required; proceed with content folders and validation before public blog rendering.
- Content folders, draft examples, image prompt example, and `content:validate` are part of the active content foundation branch.
- Internal `/drafts-preview` route may be used for local/Vercel Preview review, but it is not a public blog.
- SEO foundation is documented before the first real pre-production article.
- Blog rendering audit: public routes should read only `content/approved/blog/`, render `approved` in preview/local, and render only `published` in production.
- Blog rendering foundation branch: implement `/blog` and `/blog/[slug]` with approved/published visibility rules, still without automation or auto-publishing.

## Runtime alignment slice (active)
- Project-local tooling switched to `mise` with Node 22 LTS and pnpm 10.33.4.
- Validation for subsequent slices should run with project-local toolchain:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm typecheck`
  - `mise exec -- pnpm test`
  - `mise exec -- pnpm build`
  - `mise exec -- pnpm check:all`

## Phase 3 (Automation)
- n8n-orchestrated content pipeline after repo-first content workflow is validated
- Human-in-the-loop approval gates
- Local n8n Docker experiments may use reserved port `19110`, but production n8n should run on n8n Cloud or a dedicated host, not Vercel.

## Phase 4 (Refinement)
- Quality hardening, SEO improvement, and publish-readiness checks
