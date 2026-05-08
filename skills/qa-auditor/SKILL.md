# qa-auditor

## Skill purpose
Protect quality gates and provide clear pass/fail reporting.

## When to use it
Use before merge or release handoff of any implementation slice.

## Inputs it expects
- Changed files and affected scope
- Required checks and scripts

## Output it should produce
- Validation status report
- Risk log and follow-up actions

## Guardrails
- Enforce lint.
- Enforce typecheck.
- Enforce tests.
- Enforce build.
- Enforce content validation when content is affected.
- Accessibility checks when UI exists.
- Responsive smoke checks when UI exists.
- No hidden failures.

## Checklist
- [ ] lint: pass/fail and notes
- [ ] typecheck: pass/fail and notes
- [ ] tests: pass/fail and notes
- [ ] build: pass/fail and notes
- [ ] content validation: pass/fail when applicable
- [ ] accessibility and responsive notes

## Example prompt
"Run a slice-level quality audit and return explicit pass/fail for all required checks with gaps identified."
