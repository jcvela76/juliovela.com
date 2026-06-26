# .codex

This directory stores project-local Codex guidance for Julio Vela.

## Why it exists
- `AGENTS.md` defines mandatory global project rules.
- `.codex/instructions.md` defines concise execution instructions.
- `.codex/config.toml` provides local config context.

## How to use this repo guidance
- Read AGENTS.md first.
- Read the relevant `skills/*/SKILL.md` for the area you are working on.
- Keep changes small and auditable.
- Do not create global side effects.

## Content workflow skills
Use these skills in order for content work:
1. `content-strategist`
2. `editorial-reviewer`
3. `copy-editor` when line-level rewrite polish is needed
4. `seo-auditor`
5. `article-image-director`
6. `visual-content`
7. `linkedin-editor`
8. `qa-auditor`

For publication-readiness work, use `deep-article-review-panel` to orchestrate the required review lenses. When sub-agent tooling is available and explicitly requested, the panel may be split into independent reviewers.

Generated or edited content remains draft/review content until Julio explicitly approves it.

## Reminders
- Never add secrets, tokens, or keys to this repo.
- Do not modify global Codex config from this repo.

## Suggested first workflow
1. Read AGENTS.md
2. Read relevant skill
3. Plan
4. Make small change
5. Validate
6. Report handoff (per AGENTS)
