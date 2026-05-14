# Blog Rendering Foundation Audit

Date: 2026-05-14
Branch: `feature/blog-rendering-foundation`
Scope: planning audit before adding public `/blog` and `/blog/[slug]` rendering.
Status: no implementation yet; proceed only after this plan is accepted.

## Summary

The project is ready for a controlled blog rendering foundation slice.

No blocking refactor is required before implementation, but the visibility rules must be explicit before any public blog routes are created.

## Current state

Already implemented:
- Repo-first content storage under `content/`
- Example topic queue
- Example blog draft
- Example LinkedIn draft
- Example image prompt
- `content:validate`
- Internal `/drafts-preview`
- SEO frontmatter requirements
- SEO foundation documentation

Not implemented:
- Public `/blog`
- Public `/blog/[slug]`
- MDX rendering pipeline
- Sitemap
- RSS
- Search
- n8n workflows
- CMS/database
- Auto-publishing

## Recommended public content source

Public blog rendering should read only:

```text
content/approved/blog/
```

It must not read from:

```text
content/drafts/blog/
content/drafts/linkedin/
content/assets/prompts/
```

Draft content belongs only in `/drafts-preview`.

## Status visibility rules

Recommended rules:

| Content status | Local dev | Vercel Preview | Vercel Production |
| --- | --- | --- | --- |
| `idea` | hidden | hidden | hidden |
| `draft` | hidden from `/blog`; visible only in `/drafts-preview` | hidden from `/blog`; visible only in `/drafts-preview` | hidden |
| `ready_for_review` | hidden from `/blog`; visible only in `/drafts-preview` | hidden from `/blog`; visible only in `/drafts-preview` | hidden |
| `approved` | visible in `/blog` for review | visible in `/blog` for review | hidden |
| `published` | visible | visible | visible |
| `archived` | hidden | hidden | hidden |

Production should only render:

```text
status: published
```

Local dev and Vercel Preview may render:

```text
status: approved
status: published
```

## Environment rules

Use `process.env.VERCEL_ENV`:

- `production`: render only `published`
- `preview`: render `approved` and `published`
- undefined/local: render `approved` and `published`

Do not rely on branch names alone for visibility.

## Required routes

Initial blog rendering slice should create:

```text
/blog
/blog/[slug]
```

`/blog` should:
- List approved/published articles according to environment visibility rules.
- Show title, excerpt, date, tags, and draft/publish state when not production.
- Not show drafts from `content/drafts/`.

`/blog/[slug]` should:
- Render one approved/published article according to environment visibility rules.
- Use frontmatter metadata.
- Return 404 for hidden statuses or missing slugs.

## Metadata rules

Each rendered article should use:
- `seo_title`
- `description`
- `og_title`
- `og_description`
- `canonical_url` when published
- `cover_image` when available

If public rendering finds incomplete required metadata, validation should fail before merge.

Do not silently invent production metadata for public posts.

## Canonical URL rules

For non-production review:
- `canonical_url` may remain empty.
- Do not emit a production canonical unless the post is ready for production.

For production:
- Published posts should use `https://juliovela.com/blog/[slug]`.

## SEO indexing rules

Initial slice:
- Public `/blog` and `/blog/[slug]` can be indexable only for production-visible published content.
- Preview environments should avoid encouraging indexing.
- `/drafts-preview` stays `noindex` and blocked from production.

Later slice:
- Add `robots.txt`.
- Add `sitemap.xml`.
- Exclude drafts and hidden statuses from sitemap.

## Rendering approach

Recommended implementation:
- Add a small content reader under `src/lib/content/`.
- Parse MDX frontmatter with a simple internal parser or a minimal dependency only if needed.
- Keep rendering simple Markdown/MDX-compatible content first.
- Avoid a full CMS or database.
- Avoid adding automation.

Potential file structure:

```text
src/lib/content/blog.ts
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
```

## Validation updates

The blog rendering slice should update `content:validate` to check approved blog content.

Additional validation expectations:
- Approved/published blog files have all SEO fields.
- `published` content has `approved_by` and `approved_at`.
- Production-visible content has a valid canonical plan.
- Duplicate slugs fail validation.
- Draft folders cannot contain `published`.
- Approved folder should not contain `draft` unless intentionally documented as staged content.

## What not to include in the next slice

Do not include:
- n8n workflows
- Docker services
- CMS/database
- Analytics
- Search
- RSS
- Sitemap
- Dynamic OG image generation
- Auto-publishing
- LinkedIn publishing

## Risks

### Risk: accidental draft exposure

Mitigation:
- Public routes only read `content/approved/blog/`.
- Visibility filter checks status and environment.
- Drafts remain only in `/drafts-preview`.

### Risk: approved content appears in production too early

Mitigation:
- Production filter renders only `published`.
- `approved` remains preview-only.

### Risk: metadata drift

Mitigation:
- `content:validate` enforces required fields.
- Blog rendering uses frontmatter, not hardcoded fallbacks.

### Risk: scope creep into automation

Mitigation:
- Keep n8n and publishing workflows out of this slice.

## Refactor recommendation

Required before blog rendering:
- None.

Recommended during blog rendering:
- Add shared blog content reader.
- Reuse or generalize the existing draft frontmatter parser if practical.
- Keep `/drafts-preview` separate from public blog readers.

Optional later:
- Extract shared static page shell for legal pages.
- Extract homepage Contact section.
- Add sitemap/robots after public rendering is stable.

## Decision

Proceed with a blog rendering foundation slice after review.

Implementation should render only approved/published content from `content/approved/blog/`, keep drafts hidden from public routes, and preserve human approval as the publishing gate.
