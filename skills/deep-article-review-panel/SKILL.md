# deep-article-review-panel

## Skill purpose
Coordinate a deep, multi-lens review of a blog article before approval or publication.

This skill is an orchestration playbook. It may be run by one Codex session using the listed skills, or by separate sub-agents when sub-agent tooling is available and explicitly requested.

## When to use it
Use before:
- Moving an article to `ready_for_review`
- Moving an article from `approved` to `published`
- Creating a publish PR
- Updating a public article meaningfully

Do not use it to publish automatically.

## Inputs it expects
- Article file path
- Current article status
- Intended audience
- Practical takeaway
- SEO title and description
- Canonical URL plan
- Cover/OG image or image prompt
- LinkedIn draft, if applicable
- Preview URL, when available

## Output it should produce
- Article Review Record
- Panel decision
- Required fixes
- Reviewer notes
- Julio approval status
- Publication blockers

## Review roles
Editorial Lead: `editorial-reviewer`
Confirms the article is useful, clear, credible, and aligned with Julio Vela Tech Solutions.

Copy Polish: `copy-editor`
Improves line-level clarity, rhythm, transitions, and closing language after the editorial gate.

SEO Reviewer: `seo-auditor`
Confirms title, metadata, slug, headings, canonical plan, internal links, Open Graph metadata, and structured-data readiness.

Article Image Director: `article-image-director`
Defines or validates article-specific OG/social image direction, alt text, visual concepts, and approval criteria.

Visual Reviewer: `visual-content`
Reviews the broader cover/OG/social image plan and confirms brand visual guardrails.

LinkedIn Reviewer: `linkedin-editor`
Creates or validates a LinkedIn-native version of the article.

QA / Publication Gate: `qa-auditor`
Confirms validation, preview rendering, status transitions, sitemap/robots impact, links, and approval metadata.

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

## Guardrails
- No auto-publishing.
- No LinkedIn posting without explicit Julio approval.
- No article moves to `published` without Julio approval.
- Do not invent claims, metrics, clients, testimonials, endorsements, or credentials.
- Do not approve articles with missing visual/OG plan.
- Do not approve articles that have not been reviewed as rendered preview.

## Checklist
- [ ] Article file path is known
- [ ] Current status is known
- [ ] Editorial gate completed
- [ ] Copy polish completed if needed
- [ ] SEO review completed
- [ ] Article image direction completed
- [ ] Visual/OG review completed
- [ ] LinkedIn draft reviewed if applicable
- [ ] Rendered preview reviewed
- [ ] Validation plan documented
- [ ] Required fixes resolved
- [ ] Julio approval status recorded

## Example prompt
"Run the deep article review panel for `content/approved/blog/choosing-the-right-ai-tool.mdx`. Use editorial, copy, SEO, article image, visual, LinkedIn, and QA lenses. Return an Article Review Record with pass/fail decisions and required fixes. Do not publish."
