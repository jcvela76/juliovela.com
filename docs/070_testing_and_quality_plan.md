# Testing and Quality Plan

## Baseline quality gates
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm content:validate`
- `pnpm check:ports`
- `pnpm check:all`

## Default implementation validation (required)
Every future implementation slice requires running all available checks:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm check:all`
- `git diff --check`
- `git status --short --branch`

Never treat a change as validated unless every required command passes.
If a command is blocked by environment or dependency issues, mark validation as `BLOCKED` and rerun once dependencies are installed.

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
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm check:all`
