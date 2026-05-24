# SEO Foundation

## Purpose
Define the minimum SEO structure before creating the first real pre-production article.

This is a planning and validation foundation only. It does not publish a blog, generate a sitemap, configure analytics, or expose draft content in production.

## SEO principles
- Write for practical usefulness first.
- Avoid keyword stuffing.
- Keep titles clear and human-readable.
- Use stable slugs.
- Keep drafts non-indexable until approved and intentionally published.
- Treat LinkedIn copy as a distribution asset, not a replacement for blog metadata.
- Use Vercel Preview and GitHub PRs for review before production.

## URL strategy
Planned public blog URL shape:
- `/blog`
- `/blog/[slug]`

Draft review URL:
- `/drafts-preview`

Rules for `/drafts-preview`:
- Internal review only.
- Not linked from public navigation.
- `noindex`.
- Blocked from `VERCEL_ENV=production`.

Public blog visibility:
- Preview/local `/blog` may render approved and published content.
- Production `/blog` must render only published content.
- Drafts must not appear in public blog routes.

## Required blog frontmatter
Every blog draft should include:

```yaml
title: ""
seo_title: ""
description: ""
slug: ""
date: ""
status: "draft"
author: "Julio Vela"
excerpt: ""
tags: []
linkedin_summary: ""
cover_image: ""
canonical_url: ""
og_title: ""
og_description: ""
approved_by: ""
approved_at: ""
```

## Field rules
- `title`: primary article title and intended H1.
- `seo_title`: search title, ideally 60 characters or fewer.
- `description`: meta description, ideally 155 characters or fewer.
- `excerpt`: on-site summary, can be more editorial than the meta description.
- `slug`: lowercase kebab-case and stable after approval.
- `tags`: limited and specific; no keyword stuffing.
- `linkedin_summary`: angle for LinkedIn reuse.
- `cover_image`: empty until an approved image exists.
- `canonical_url`: empty until production publish target exists.
- `og_title`: social preview title.
- `og_description`: social preview description.
- `approved_by`: empty until approval.
- `approved_at`: empty until approval.

## Heading rules
- Each article should have exactly one H1.
- H2 headings should describe clear sections.
- Avoid skipping heading levels for visual styling.
- Draft outlines should be reviewed before approval.

## Image and Open Graph plan
Initial implementation may use manual cover images or image prompts.

Every article should eventually have:
- Cover image path
- OG image path or generated OG image plan
- Alt text
- Image approval checklist

Do not use:
- Generic AI robot visuals
- Circuit-board clutter
- Neon cyberpunk visuals
- Fake product screenshots
- Stolen or imitation brand styles

## Canonical URL plan
Before production publish:
- `canonical_url` may remain empty.

For published production articles:
- Use `https://juliovela.com/blog/[slug]`.
- If an article is syndicated or heavily reused elsewhere, decide the canonical source before publishing.

## Sitemap and robots plan
Implement now that public blog rendering exists:
- `robots.txt`
- `sitemap.xml`
- Dynamic metadata for `/blog/[slug]`
- Open Graph metadata

Do not include draft URLs in the sitemap.
Do not include `approved` preview-only URLs in the production sitemap.

## Structured data plan
Article structured data should be added only after public article routes and metadata rules are stable.

Implemented baseline:
- `BlogPosting` JSON-LD on `/blog/[slug]`
- `Person` author metadata using `Julio Vela`
- `Organization` publisher metadata using `Julio Vela Tech Solutions`
- Article URL, title, description, published date, tags, and article-specific OG image

Future optional structured data:
- `Person` profile page metadata
- `WebSite` search/discovery metadata

## SEO and Vercel readiness sequence
Use small PRs so SEO, hosting, DNS, and production publishing do not get mixed.

## Production SEO audit follow-up
The 2026-05-24 production SEO audit confirmed the baseline is healthy and identified two launch-priority fixes:
- Add one semantic homepage `h1` while preserving the approved logo-first hero design.
- Redirect `www.juliovela.com` to the canonical apex domain `https://juliovela.com`.

Search Console remains an external setup step:
- Verify `juliovela.com`.
- Submit `https://juliovela.com/sitemap.xml`.
- Request indexing for the homepage and first published article.

### Slice 1: SEO metadata foundation
Goal:
- Add metadata defaults and route-specific metadata without changing hosting settings.

Scope:
- Global metadata in `src/app/layout.tsx`
- Shared SEO helper in `src/lib/seo.ts`
- `metadataBase` for `https://juliovela.com`
- Title template for Julio Vela Tech Solutions
- Open Graph defaults
- Twitter card defaults
- Robots defaults
- Route metadata for `/`, `/blog`, `/privacy`, `/disclosures`, and `/drafts-preview`
- Dynamic metadata for `/blog/[slug]`
- Brand-aligned favicon and apple icon metadata

Rules:
- Approved preview articles may be visible locally and in Vercel Preview.
- Approved preview articles should be `noindex` until they become `published`.
- Draft routes remain `noindex`.
- No analytics, Vercel setup, DNS, or production changes in this slice.

Validation:
- `mise exec -- pnpm check:live`
- Browser review for `/`, `/blog`, and one article route
- Final validation with `mise exec -- pnpm check:final` before commit

Status:
- Implemented in `feature/seo-metadata-foundation`.
- `approved` article pages now emit `noindex`.
- `published` article pages may emit canonical metadata.
- Favicon metadata now references a minimal `://` SVG icon.
- `robots.ts`, `sitemap.ts`, and OG image assets remain in later slices.

### Slice 2: robots and sitemap
Goal:
- Make crawl rules explicit.

Scope:
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- Include homepage, blog index, legal pages, and production-published articles only.
- Exclude `/drafts-preview`.
- Exclude `approved` preview-only articles from production sitemap.

Rules:
- Do not include draft or preview-only URLs in production sitemap output.
- Keep sitemap generated from the same content visibility rules as the blog.

Validation:
- `mise exec -- pnpm check:final`
- Inspect `/robots.txt`
- Inspect `/sitemap.xml`

Status:
- Implemented in `feature/robots-sitemap-foundation`.
- `robots.txt` allows public crawling but excludes `/drafts-preview`.
- `sitemap.xml` includes public static routes.
- `sitemap.xml` excludes draft preview URLs.
- `sitemap.xml` excludes `approved` preview-only articles and includes only production-published articles.

### Slice 3: Open Graph image baseline
Goal:
- Add a clean default share image for the site.

Scope:
- Static default OG image using the approved `:// JULIO VELA / TECH SOLUTIONS` identity
- Metadata wiring to use the default image
- Alt text documentation

Rules:
- No generic AI robot visuals.
- No neon, circuit-board, or template-style graphics.
- No per-article dynamic image generator yet unless needed later.

Validation:
- `mise exec -- pnpm check:final`
- Browser or metadata inspection for OG tags

Status:
- Implemented in `feature/og-image-baseline`.
- Default image route is `src/app/opengraph-image.tsx`.
- Default OG image size is `1200x630`.
- Metadata helper wires the image into Open Graph and Twitter metadata.
- Per-article dynamic OG images remain a later optional slice.

### Slice 3.5: BlogPosting structured data
Goal:
- Help search engines understand public article pages as blog posts.

Scope:
- Add reusable `BlogPosting` JSON-LD helper.
- Render structured data on `/blog/[slug]`.
- Reuse approved article metadata from frontmatter.
- Keep the default brand OG image as the structured data image until article-specific images are approved.

Rules:
- Do not publish or expose draft content.
- Do not add CMS, automation, Search Console, or domain changes in this slice.
- Do not invent author, publisher, or article metadata.

Validation:
- `mise exec -- pnpm check:live`
- `mise exec -- pnpm check:all`
- Inspect rendered article HTML for `application/ld+json`

Status:
- Implemented as the first follow-up from the SEO audit for `choosing-the-right-ai-tool`.

### Slice 3.6: Article-specific OG images
Goal:
- Give each blog post a social image that reflects the article, not only the site brand.

Scope:
- Add `/blog/[slug]/opengraph-image`.
- Generate article social images from approved article metadata.
- Keep `/opengraph-image` as the site-wide fallback.
- Wire article Open Graph, Twitter, and `BlogPosting` JSON-LD image metadata to the article-specific image.

Rules:
- No generic AI robot visuals.
- No neon, circuits, fake product screenshots, or clutter.
- No new image dependencies.
- No article content changes in this slice.

Validation:
- `mise exec -- pnpm check:live`
- `mise exec -- pnpm check:all`
- Confirm article image route returns `200`, `image/png`, and `1200x630`.
- Review generated image visually before commit.

Status:
- Implemented for article routes while preserving the global fallback.

### Slice 4: Vercel preview setup
Goal:
- Connect the repository to Vercel and confirm Preview deployments.

Scope:
- Vercel project setup
- GitHub integration
- Preview deploys for feature branches and PRs
- Confirm build command and install command
- Confirm Node 22.x on Vercel

Rules:
- No production promotion.
- No domain or DNS change.
- No real secrets in the repo.
- Keep `.vercel/` out of git.

Validation:
- Vercel Preview URL loads
- `/`, `/blog`, and one article route load
- Vercel build succeeds
- Preview still renders `approved` content for review

### Slice 5: Production readiness review
Goal:
- Prepare for the first production launch without changing DNS yet.

Scope:
- Confirm only `published` articles render in production mode
- Confirm SEO metadata
- Confirm sitemap and robots behavior
- Confirm legal pages
- Confirm footer links
- Confirm no draft preview links are public

Rules:
- Do not promote to production without explicit Julio approval.
- Do not modify DNS without explicit Julio approval.
- Do not publish article content unless status is intentionally changed to `published`.

Validation:
- `mise exec -- pnpm check:final`
- Vercel Preview review
- Manual launch checklist approval

### Slice 6: Domain and production launch
Goal:
- Connect `juliovela.com` and launch production only after approval.

Scope:
- Vercel domain configuration
- DNS instructions or DNS change with explicit approval
- Production deployment confirmation
- Post-launch smoke test

Rules:
- DNS changes require explicit approval.
- Production deployment requires explicit approval.
- If anything looks wrong, pause and roll back or fix in a new branch.

Validation:
- `https://juliovela.com`
- `https://juliovela.com/blog`
- `https://juliovela.com/privacy`
- `https://juliovela.com/disclosures`
- `https://juliovela.com/robots.txt`
- `https://juliovela.com/sitemap.xml`

## Do not mix in the same PR
- SEO metadata and Vercel project linking
- Vercel Preview setup and DNS changes
- Content approval and production publishing
- Analytics and legal/cookie changes
- n8n automation and public publishing
- Runtime/tooling changes and SEO implementation

## Branch sequence
Recommended branch names:
- `feature/seo-metadata-foundation`
- `feature/robots-sitemap-foundation`
- `feature/og-image-baseline`
- `feature/vercel-preview-setup`
- `feature/production-readiness-review`
- `feature/domain-production-launch`

Each branch should start from latest `main`, include one responsibility, pass validation, and merge before the next branch starts.

## Approval checklist before publish
Before a post can be published:
- `status` is `approved` or `published`.
- `approved_by` is set.
- `approved_at` is set.
- `seo_title` is clear.
- `description` is clear and within target length.
- `slug` is final.
- H1/H2 structure is reviewed.
- Tags are specific and limited.
- LinkedIn summary exists.
- Cover image or image plan is approved.
- Canonical URL plan is clear.
- No draft-only notes remain in the article body.

## Current implementation status
- Initial public blog rendering exists for `/blog` and `/blog/[slug]`.
- `content:validate` checks required SEO frontmatter for blog drafts.
- `/drafts-preview` is available for local and Vercel Preview review only.
- Public `/blog` should read only from `content/approved/blog/`.
- Production blog rendering should include only `published` content.
- The first approved preview article exists for local and Vercel Preview review, but is not production-published.
