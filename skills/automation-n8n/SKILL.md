# automation-n8n

## Skill purpose
Design future n8n-based content automation with human controls.

## When to use it
Use for planning workflow or validating automation design.

## Inputs it expects
- Topic queue and status model
- Approval policy and review path
- Destination systems and credentials needs

## Output it should produce
- Approval-first n8n flow design
- Failure/retry behavior
- Logs and status lifecycle
- Security notes

## Guardrails
- Human-in-the-loop approval required.
- Draft generation only.
- No auto-publishing.
- Approval required before GitHub PR/publish transitions.
- Safe credential handling outside repo.
- Webhook security and payload validation.
- Retry/fallback planning required.
- Log each status transition.

## Checklist
- [ ] Scheduled trigger (2x/week)
- [ ] Read topic queue
- [ ] Generate blog + LinkedIn draft
- [ ] Generate image prompt
- [ ] Review request sent
- [ ] Approval wait loop or state handling
- [ ] PR/ready transition only after approval

## Example prompt
"Propose an n8n workflow matching idea->draft->approval with no auto-publish and explicit review logs."
