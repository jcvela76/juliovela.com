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
3. `content-strategist` drafts:
- Blog MDX draft
- LinkedIn draft
- Image prompt / visual plan
- SEO title/description and excerpt
4. `editorial-reviewer` performs the professional editorial gate:
- Clarifies the audience and practical takeaway
- Improves the opening hook and closing
- Removes vague or generic language
- Returns `pass`, `pass_with_edits`, or `revise_before_review`
- Preserves Julio Vela's practical, technical, non-hype voice
5. `copy-editor` may be used for line-level rewrites, hook variants, transitions, and closing language when needed.
6. `seo-auditor` confirms metadata, heading structure, slug, canonical plan, tags, and structured-data readiness.
7. `article-image-director` defines article-specific OG/social image strategy, concepts, prompt, alt text, and fallback decision.
8. `visual-content` confirms cover/OG direction, image guardrails, and brand fit.
9. `linkedin-editor` creates or refines the LinkedIn-native version.
10. Draft status becomes `ready_for_review`.
11. Julio reviews the rendered article and supporting assets in preview/PR.
12. On approval, move to approved folders and prepare publish plan.

## Rules
- All generated items are drafts until approved.
- No auto-publishing.
- n8n or local scripts may create drafts, but they must not publish.
- Approval happens through Julio review, normally in GitHub PR and Vercel Preview.
- A merge to `main` may make approved content eligible for production, but production publishing still follows the deployment approval rules.
- Every article must pass professional copy review before approval or publication.
- Copy review may improve clarity, rhythm, structure, hook, transitions, and closing, but must not invent claims, metrics, clients, endorsements, or expertise.
- `editorial-reviewer` is the required editorial gate for articles and meaningful public page copy.
- `copy-editor` is optional support for line-level rewrite polish, but it does not replace the editorial gate.
- `article-image-director` is required for every article before approval or publication, even when the final decision is to use the default brand OG fallback.
- Content status values:
  - `idea`, `draft`, `ready_for_review`, `approved`, `published`, `archived`

## Skill sequence
Default content skill order:
1. `content-strategist`
2. `editorial-reviewer`
3. `copy-editor` if line-level rewrite support is needed
4. `seo-auditor`
5. `article-image-director`
6. `visual-content`
7. `linkedin-editor`
8. `qa-auditor`

Do not skip `editorial-reviewer` for public articles. SEO can make a page easier to find, but editorial review makes the content worth finding.

## Deep Article Review Panel
Before any blog article is approved for publication, run a deep article-review panel. The panel is a structured review sequence that uses existing project skills as independent lenses.

The panel may be run by one Codex session or by separate sub-agents when sub-agent tooling is available and explicitly requested. The panel does not publish content. It produces a pass/fail recommendation and a list of required edits before Julio approval.

Required inputs:
- Article file path
- Current article status
- Intended audience
- Practical takeaway
- SEO title and description
- Canonical URL plan
- Cover/OG image or image prompt
- LinkedIn draft, if applicable
- Preview URL, when available

Review roles:
- Editorial Lead: `editorial-reviewer`
- Copy Polish: `copy-editor`
- SEO Reviewer: `seo-auditor`
- Article Image Director: `article-image-director`
- Visual Reviewer: `visual-content`
- LinkedIn Reviewer: `linkedin-editor`
- QA / Publication Gate: `qa-auditor`

## Panel decision
The article may move forward only if every required reviewer returns one of:
- `pass`
- `pass_with_edits` with edits completed

The article must not move to `published` if any reviewer returns:
- `revise_before_review`
- `needs_visual_review`
- `revise_before_publish`
- `blocked`

Final states:
- `pass`: ready for Julio approval or publish PR
- `pass_with_edits`: can proceed only after listed edits are applied
- `revise_before_review`: not ready for approval
- `blocked`: cannot proceed until the blocker is resolved

## Article Review Record
Create one review record per article before publication.

Path:
`docs/audits/YYYY-MM-DD-article-review-[slug].md`

Required sections:
- Article
- Status
- Preview URL
- Editorial review
- Copy review
- SEO review
- Article image review
- Visual/OG review
- LinkedIn review
- QA review
- Required fixes
- Final decision
- Julio approval status

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
- Confirm the article has passed professional copy review.
- Confirm the article has passed the deep article-review panel.
- Confirm article-specific image direction or explicit fallback approval has been recorded.
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
