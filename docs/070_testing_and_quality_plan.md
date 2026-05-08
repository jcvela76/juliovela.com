# Testing and Quality Plan

## Baseline quality gates
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm content:validate`
- `pnpm check:ports`
- `pnpm check:all`

## CI intent
- Install from lockfile
- Run lint/typecheck/tests/build/content validation
- Fail fast on any check failure

## Governance
- Every implementation task must include validation.
- Track known gaps until implementation catches up.
