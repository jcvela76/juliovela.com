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
  - `mise exec -- pnpm check:live`
  - `git diff --check`
  - `git status --short --branch`
- Before final handoff or commit recommendation, require the full default validation suite.
- Do not run `next build`, `mise exec -- pnpm build`, `mise exec -- pnpm check:final`, or `mise exec -- pnpm check:all` while relying on an active `next dev` preview.
- If final build validation is required, stop the dev server first when possible, run final checks, then restart preview only with user approval.
- If a dev server breaks after a build, recover by stopping the dev server, removing `.next`, and restarting `mise exec -- pnpm dev:local` only with user approval.
- Every project validation must include the default suite unless blocked:
  - `mise exec -- pnpm check:final`
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
