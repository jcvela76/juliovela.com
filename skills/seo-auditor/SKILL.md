# seo-auditor

## Skill purpose
Review draft articles for SEO quality and readability before approval.

## When to use it
Use during review of draft or ready-for-review content.

## Inputs it expects
- Title, meta, slug, headings, excerpt, tags, links
- Canonical URL plan and publish target

## Output it should produce
- SEO/readability audit
- Prioritized fixes and accept/reject recommendations

## Guardrails
- Validate title clarity.
- Validate `seo_title` length and usefulness.
- Validate meta description quality.
- Validate slug quality.
- Validate H1/H2 structure.
- Suggest internal linking.
- Verify excerpt quality.
- Verify tags and canonical URL plan.
- Verify Open Graph title/description plan.
- Keep draft URLs non-indexable until approved/published.
- No keyword stuffing.

## Checklist
- [ ] Title and meta are clear
- [ ] `seo_title` is clear and about 60 characters or fewer
- [ ] `description` is clear and about 155 characters or fewer
- [ ] Slug is readable and short
- [ ] H1/H2 hierarchy is logical
- [ ] Internal links are suggested
- [ ] Excerpt and tags are complete
- [ ] OG title/description are complete
- [ ] Canonical URL plan is clear

## Example prompt
"Audit this draft for SEO readability and return required changes, including title/meta/slug and heading improvements."
