# copy-editor

## Skill purpose
Sharpen Julio Vela article drafts like a professional copywriter/editor while preserving the brand voice and original intent.

Use `skills/editorial-reviewer/SKILL.md` as the formal editorial approval gate. Use this skill when the task is specifically focused on line-level copy improvements, rewrite options, hooks, transitions, or closing language.

## When to use it
Use after a blog draft exists and before SEO review, visual review, approval, or publication.

## Inputs it expects
- Source article draft
- Intended audience
- Topic goal or practical takeaway
- Brand voice constraints
- Current publication status

## Output it should produce
- Copy review summary
- Specific rewrite recommendations
- Optional before/after rewrite snippets
- Improved opening or hook if needed
- Improved transitions if needed
- Improved closing or soft CTA if needed
- Notes about any risks, unsupported claims, or unclear sections

## Guardrails
- Preserve Julio Vela's voice: practical, technical, clear, modern, and non-hype.
- Improve clarity, rhythm, structure, transitions, and usefulness.
- Do not invent claims, metrics, clients, testimonials, endorsements, or credentials.
- Do not make the article clickbait.
- Do not change the article's core intent without calling it out.
- Do not publish automatically.
- Keep all reviewed content in draft/review state until Julio approves it.
- Escalate to `editorial-reviewer` when the article needs a pass/fail editorial decision.

## Checklist
- [ ] Audience is clear
- [ ] Opening explains why the article matters
- [ ] Practical takeaway is explicit
- [ ] Headline and excerpt fit the article
- [ ] Sections flow naturally
- [ ] Vague or generic phrases are tightened
- [ ] Closing gives a useful next step or soft CTA
- [ ] No unsupported claims were introduced
- [ ] Tone remains practical and trustworthy

## Example prompt
"Review this article as a professional copywriter. Improve clarity, hook, transitions, and closing while preserving Julio Vela's practical, non-hype voice. Do not invent claims or change the article intent."
