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
- Editorial skill slice: add `editorial-reviewer` as the formal content gate before SEO, visual review, LinkedIn adaptation, approval, or publication.
- Article review panel slice: define a repeatable deep-review panel for editorial, copy, SEO, article image, visual, LinkedIn, and QA checks before publication.
- Article image director slice: add article-specific image direction as a required step before approving or publishing blog posts.
- First article review backfill slice: run the deep-review panel against `choosing-the-right-ai-tool`, record canonical/cover image metadata, and store the article image direction prompt.
- First article social package slice: create the LinkedIn-native draft, social image review checklist, and no-auto-publish approval gate before LinkedIn sharing.
- Editorial illustration system slice: add `editorial-illustrator` and shift article images toward original conceptual editorial illustration, avoiding imitation of publications or artists.
- First article illustration direction slice: select and store the approved direction asset for `choosing-the-right-ai-tool`; next step is implementing the rendered OG composition.
- Article image copy system slice: use a consistent minimal lockup for all article images, `:// [post title]` plus one short support line.
- Article OG image slice: first article-specific image is implemented using a Figma-approved exported PNG at `content/assets/images/choosing-the-right-ai-tool/approved-og.png`, while the default brand OG image remains the fallback pattern for articles without custom art.
- Bilingual content model slice: first Spanish article draft created with a localized SEO slug; `hreflang` and Spanish sitemap inclusion remain gated until publication.
- Spanish rendered preview slice: `/es/blog` and `/es/blog/[slug]` implemented for Spanish draft review outside production; production remains gated to published content only.
- Spanish article publication slice: promote the approved Spanish AI-tool article to `published`, enable bilingual alternates, and include the Spanish URL in sitemap after PR preview approval.
- Spanish article production validation slice: PR #15 merged, the Spanish article is visible on `https://juliovela.com`, sitemap includes both language URLs, and production browser smoke passed.
- Brand asset stabilization slice: reuse the approved SVG logo in UI, use a generated PNG derivative for OG routes because `next/og` does not support SVG text nodes, and update favicon/apple icon to the red `://` mark.
- Analytics strategy slice: Vercel Web Analytics is the first analytics layer; defer GA4, ad pixels, retargeting, and invasive tracking.
- Analytics privacy slice: `/privacy` documents Vercel Web Analytics at a high level.
- Vercel Web Analytics slice: official analytics component added for public page analytics only; no GA4, pixels, retargeting, or custom events.
- Security alerting slice: use Vercel Firewall/Observability dashboard alerts first; defer n8n automation until a later operational slice.
- Production launch readiness slice: production smoke checks pass on the Vercel domain, `juliovela.com` is the planned canonical domain, and `www.juliovela.com` should redirect to the apex domain after explicit DNS approval.
- Domain setup slice: add `juliovela.com` in Vercel, configure `www` redirect, wait for DNS propagation, then rerun smoke checks against the canonical domain.
- Production SEO follow-up slice: add the homepage semantic `h1`, add a project-level `www` to apex redirect safety net, and document Search Console setup.
- Post-domain next steps plan: while DNS propagates, proceed with homepage copy final pass; after DNS stabilizes, run canonical-domain smoke tests, Search Console readiness, and post-launch QA.
- Homepage copy final pass slice: refine positioning around practical technology decision clarity and correct header logo vertical alignment.
- Homepage copy/mobile audit slice: review deployed homepage copy and mobile rhythm before making additional copy or mobile spacing changes.
- Mobile navigation UX slice: document and implement mobile scroll rhythm first, then add a minimal left-side dots navigation if mobile review confirms it improves orientation.
- Mobile scroll rhythm slice: align mobile anchors below the fixed header, reduce small-screen density, and preserve desktop scroll-snap behavior before adding dots navigation.
- Mobile section dots slice: add a mobile-only left-side anchor rail for section orientation without introducing a hamburger menu.
- Mobile dots polish slice: tune section-aware dot colors and mobile content inset so the rail stays visible without competing with the narrative content.
- Mobile UX follow-up slice: remove intro scroll UI and add a controlled mobile scroll settler that softly finishes near-section transitions without CSS snap.

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
- Search Console setup after custom domain approval.
- Analytics refinement after launch traffic exists, including whether daily reporting automation is worth adding.
- Security alert refinement after launch traffic exists, including whether webhook or n8n-based alert routing is needed.
