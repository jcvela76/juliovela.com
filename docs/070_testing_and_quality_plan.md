# Testing and Quality Plan

## Baseline quality gates
- `mise exec -- pnpm lint`
- `mise exec -- pnpm typecheck`
- `mise exec -- pnpm test`
- `mise exec -- pnpm build`
- `mise exec -- pnpm content:validate`
- `mise exec -- pnpm check:ports`
- `mise exec -- pnpm check:all`

## Local runtime isolation
- This project must use project-local Node and pnpm versions only.
- Runtime versions are declared in `.mise.toml`, `.node-version`, `.nvmrc`, and `package.json`.
- Do not change global Node, npm, pnpm, shell defaults, or machine-wide runtime settings for this repo.
- Use `mise exec -- pnpm ...` so the correct versions apply only to the current command/session.
- If `mise` or the pinned runtime is unavailable, document the blocker and setup command instead of installing or switching global versions.

## Default implementation validation (required)
During live UI iteration, every code change must be followed by at least:
- `mise exec -- pnpm lint`
- `mise exec -- pnpm test`

Before final handoff or commit recommendation, run the full validation suite below.

Every future implementation slice requires running all available checks:
- `mise exec -- pnpm lint`
- `mise exec -- pnpm typecheck`
- `mise exec -- pnpm test`
- `mise exec -- pnpm build`
- `mise exec -- pnpm check:all`
- `git diff --check`
- `git status --short --branch`

Never treat a change as validated unless every required command passes.
If a command is blocked by environment or dependency issues, mark validation as `BLOCKED` and rerun once dependencies are installed.

## Dev server preview safety
- `next build` can rewrite `.next` while `next dev` is running.
- After running a full build during a live preview session, verify the preview URL.
- Do not stop, restart, or replace an occupied dev-server port without user approval.
- If the preview is broken after validation, report the port/process and ask whether to restart it or use a temporary alternate port.
- During live browser UX review, prefer the short validation loop after each visual/code change:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm test`
  - `git diff --check`
  - `git status --short --branch`
- Run `mise exec -- pnpm build` and `mise exec -- pnpm check:all` before final handoff or commit recommendation, not repeatedly during an active preview session unless needed.

## CI intent
- Install from lockfile
- Run lint/typecheck/tests/build/content validation
- Fail fast on any check failure

## Governance
- Every implementation task must include validation.
- Track known gaps until implementation catches up.

## Current status
- Runtime now uses project-local toolchain via `.mise.toml` (`node=22`, `pnpm=10.33.4`).
- Validation and checks should be run with the project-local toolchain (`mise exec -- pnpm ...`).
- Add/validate command sequence once dependencies are available:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm typecheck`
  - `mise exec -- pnpm test`
  - `mise exec -- pnpm build`
  - `mise exec -- pnpm check:all`
