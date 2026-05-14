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
Implement after public blog rendering exists:
- `robots.txt`
- `sitemap.xml`
- Dynamic metadata for `/blog/[slug]`
- Open Graph metadata

Do not include draft URLs in the sitemap.
Do not include `approved` preview-only URLs in the production sitemap.

## Structured data plan
Consider later, after the first public article route exists:
- `Article`
- `Person`
- `WebSite`

Do not add structured data until the public content model is stable.

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
- Blog/public SEO rendering is not implemented yet.
- `content:validate` checks required SEO frontmatter for blog drafts.
- `/drafts-preview` is available for local and Vercel Preview review only.
- Public `/blog` and `/blog/[slug]` should come in a later controlled slice.
