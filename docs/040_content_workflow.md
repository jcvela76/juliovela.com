# Content Workflow

## Source of truth
Content starts as files in this repository, not in a database.

Recommended storage:
- Topics: YAML in `content/topics/`
- Blog drafts: MDX in `content/drafts/blog/`
- LinkedIn drafts: Markdown in `content/drafts/linkedin/`
- Approved blog content: MDX in `content/approved/blog/`
- Approved LinkedIn content: Markdown in `content/approved/linkedin/`
- Image and cover prompts: Markdown in `content/assets/prompts/`
- Generated or approved images: files in `content/assets/images/`

Git is the audit trail. GitHub PRs are the approval gate. Vercel Preview deployments are the review surface.

Do not use a production database for content in the first content slice.

## Flow
1. Julio adds a topic to `content/topics/topic_queue.yml`.
2. Topic starts at status `idea`.
3. Content strategist drafts:
- Blog MDX draft
- LinkedIn draft
- Image prompt / visual plan
- SEO title/description and excerpt
4. Draft status becomes `ready_for_review`.
5. Julio reviews in preview/PR.
6. On approval, move to approved folders and prepare publish plan.

## Rules
- All generated items are drafts until approved.
- No auto-publishing.
- n8n or local scripts may create drafts, but they must not publish.
- Approval happens through Julio review, normally in GitHub PR and Vercel Preview.
- A merge to `main` may make approved content eligible for production, but production publishing still follows the deployment approval rules.
- Content status values:
  - `idea`, `draft`, `ready_for_review`, `approved`, `published`, `archived`

## Why files first
- Vercel handles static content and preview deployments well.
- Git keeps every content change reviewable and reversible.
- PR review keeps human approval explicit.
- The project does not need accounts, a CMS admin, scheduling UI, or database-backed editorial workflows yet.
- Avoiding a database keeps the first content foundation small and auditable.

## When a database or CMS may be useful later
Consider a database or CMS only when the project needs:
- Admin login and web-based editing
- Multiple editors
- Scheduled publishing
- Real-time editorial status
- Searchable content operations
- User-specific content
- Analytics-driven recommendations
- Content updates without Git commits or redeploys

Possible future options:
- Sanity, Contentful, DatoCMS, or similar headless CMS
- Supabase or Neon/Postgres
- Notion as a temporary editorial input
- A custom admin backed by Vercel-compatible storage

These should be evaluated after the repo-first workflow proves its limits.

## Initial validation goals
The first content implementation adds `pnpm content:validate`.

The validator should check:
- Required content folders exist.
- Example topic queue exists.
- Draft frontmatter includes required content and SEO fields.
- `status` is one of the approved workflow statuses.
- Draft folders do not contain `status: published`.
- Published content requires `approved_by` and `approved_at`.
- Approval metadata is empty for unapproved drafts.
- Blog slugs are lowercase kebab-case.
- Blog SEO titles and descriptions stay within target lengths.

## Initial implementation status
The content foundation slice should include:
- Example topic queue at `content/topics/topic_queue.example.yml`
- Example blog draft under `content/drafts/blog/`
- Example LinkedIn draft under `content/drafts/linkedin/`
- Example image prompt under `content/assets/prompts/`
- Empty approved/image folders preserved with `.gitkeep`
- Validator at `scripts/content-validate.mjs`
- `pnpm content:validate` wired into `check:live` and `check:final`
- SEO frontmatter fields required for blog drafts

## Draft preview route
The content foundation may include `/drafts-preview` as an internal review aid.

Rules:
- The route is for local and Vercel Preview review only.
- The route must not be linked from the public nav or footer.
- The route must use `noindex`.
- The route must not expose drafts in Vercel Production.
- It is not a public blog and should not be treated as published content.
- Drafts shown there remain `draft` until explicitly approved.

## Public blog rendering plan
Public blog routes read only from approved content folders and never from draft folders.

Current public routes:
- `/blog`
- `/blog/[slug]`

Public blog routes should read only from:
- `content/approved/blog/`

Visibility rules:
- Local and Vercel Preview may render `approved` and `published`.
- Vercel Production may render only `published`.
- `draft`, `idea`, `ready_for_review`, and `archived` content must not render in public blog routes.
- Drafts remain visible only in `/drafts-preview`.

First approved preview rule:
- An article with `status: approved` may be reviewed in local and Vercel Preview.
- It must not be treated as production-published content.
- Promotion from `approved` to `published` requires explicit Julio approval in a later slice.

Publish readiness rule:
- Before changing any article from `approved` to `published`, create a publish-readiness audit.
- Confirm editorial fit, SEO metadata, legal/disclosure needs, canonical URL behavior, visual/OG image readiness, and production visibility expectations.
- Do not publish from Markdown/frontmatter review alone.
- Julio must review the rendered Vercel Preview article page and `/blog` listing before publication.
- Julio must approve the visual/OG image plan, even if the default brand OG image is used temporarily.
- The publish PR must run full validation and be reviewed in Vercel Preview before merge.
- Production smoke checks must run after merge.
- Use `docs/110_publication_review_checklist.md` for the required review checklist.

Validation rules:
- Public blog slugs must be unique within `content/approved/blog/`.
- Files in `content/approved/blog/` may use only `approved`, `published`, or `archived`.
- `published` content must include approval metadata.
- Production rendering must filter out `approved` content.
