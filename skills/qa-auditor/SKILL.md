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
- Use the project-local runtime for validation.
- Prefer `mise exec -- pnpm ...` when `.mise.toml` is present.
- Never change global Node, npm, pnpm, or shell defaults in order to run checks.
- If the local runtime is missing or cannot activate, report validation as `BLOCKED` with the exact local setup or rerun command.
- During live UI iteration, every code change must be followed by at least:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm test`
- Before final handoff or commit recommendation, require the full default validation suite.
- If `next build` runs while a dev server is active, verify the preview afterward and do not restart/replace the running server without user approval.
- Every project validation must include the default suite unless blocked:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm typecheck`
  - `mise exec -- pnpm test`
  - `mise exec -- pnpm build`
  - `mise exec -- pnpm check:all`
  - `git diff --check`
  - `git status --short --branch`
- Never report validation as passed unless all required checks succeed.
- If dependencies are unavailable due install/network issues, report validation as `BLOCKED` and list the exact blocker and rerun command.
- Validation is expected to run using project-local toolchain (`mise exec -- pnpm ...`) whenever the repo declares `.mise.toml`.

## Checklist
- [ ] lint: pass/fail and notes
- [ ] typecheck: pass/fail and notes
- [ ] tests: pass/fail and notes
- [ ] build: pass/fail and notes
- [ ] content validation: pass/fail when applicable
- [ ] accessibility and responsive notes
- [ ] if blocked: record blocker and command to rerun
- [ ] never mark task ready without passing required validation checks

## Example prompt
"Run a slice-level quality audit and return explicit pass/fail for all required checks with gaps identified."
