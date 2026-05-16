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
- First approved article preview: add one approved article under `content/approved/blog/` for local and Vercel Preview review without marking it as production published.
- SEO and Vercel readiness should proceed in separate slices: SEO metadata, robots/sitemap, OG image baseline, Vercel Preview setup, production readiness review, then domain/production launch.
- Vercel Preview setup slice: document dashboard setup, build settings, Node `22.x`, preview validation, and launch guardrails before any real DNS or production changes.
- Vercel environment strategy: use PR Preview deployments as staging/review for now; keep `main` as production and defer a dedicated `stg` branch/domain until needed.
- Browser smoke testing slice: add Playwright smoke tests for `/`, `/blog`, `/robots.txt`, and `/sitemap.xml`, and run them in CI through `pnpm check:all`.
- First article publish-readiness slice: audit `choosing-the-right-ai-tool` for editorial, SEO, legal/disclosure, sitemap, and production visibility readiness before any status change to `published`.
- Publication review checklist slice: require rendered Vercel Preview review of article page, blog listing, metadata, mobile/desktop layout, and OG/cover image before any future article publish.
- SEO structured data slice: add `BlogPosting` JSON-LD to article pages using approved frontmatter metadata.
- Marketing/UX/copy audit slice: document current positioning gaps and plan a focused homepage/blog copy update before broader content expansion.
- Homepage/blog copy slice: sharpen public positioning and remove internal draft-language signals from the public Insights section.
- Editorial workflow slice: add professional copy review as a required step before article approval or publication.

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
- Automation drafts should route through professional copy review before SEO review, visual review, rendered preview, and Julio approval.
- Local n8n Docker experiments may use reserved port `19110`, but production n8n should run on n8n Cloud or a dedicated host, not Vercel.

## Phase 4 (Refinement)
- Quality hardening, SEO improvement, and publish-readiness checks
