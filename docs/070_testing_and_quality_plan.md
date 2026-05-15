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
- `mise exec -- pnpm check:live`
- `git diff --check`
- `git status --short --branch`

`check:live` includes lint, typecheck, tests, and content validation. It intentionally avoids `next build`.

Before final handoff or commit recommendation, run the full validation suite below.

Every future implementation slice requires running all available checks:
- `mise exec -- pnpm check:final`
- `mise exec -- pnpm test:browser`
- `mise exec -- pnpm check:all`
- `git diff --check`
- `git status --short --branch`

`check:final` includes lint, typecheck, tests, content validation, and build.
`test:browser` runs Playwright smoke tests. By default it validates a local built app on port `19100`; set `PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app` to smoke test production or a Vercel Preview URL.
`check:all` includes `check:final` and browser smoke tests.

Never treat a change as validated unless every required command passes.
If a command is blocked by environment or dependency issues, mark validation as `BLOCKED` and rerun once dependencies are installed.

## Dev server preview safety
- `next build` can rewrite `.next` while `next dev` is running.
- Do not run `mise exec -- pnpm build`, `mise exec -- pnpm check:final`, or `mise exec -- pnpm check:all` while relying on an active `next dev` preview.
- Use `mise exec -- pnpm check:live` during browser review because it avoids `next build`.
- For final validation, stop the dev server first when possible, run final checks, then restart the preview if visual review will continue.
- Do not stop, restart, or replace an occupied dev-server port without user approval.
- If the preview is broken after validation, report the port/process and ask whether to restart it or use a temporary alternate port.
- If approved, recover the preview by stopping the existing dev server, running `rm -rf .next`, and restarting with `mise exec -- pnpm dev:local`.

## CI intent
- Install from lockfile
- Run lint/typecheck/tests/build/content validation
- Install Playwright Chromium for browser smoke tests
- Run Playwright smoke tests against the built app
- Fail fast on any check failure

## Vercel Preview validation
Before accepting a Vercel Preview deployment:
- Confirm the deployment build passed.
- Confirm the preview URL loads.
- Review `/`, `/blog`, one article route, `/privacy`, and `/disclosures`.
- Review `/robots.txt`, `/sitemap.xml`, and `/opengraph-image`.
- Confirm preview-only approved articles are reviewable but not production-published.
- Confirm no secrets, `.env.local`, or `.vercel/` files are committed.
- Confirm no DNS or production domain changes were made.

## Governance
- Every implementation task must include validation.
- Track known gaps until implementation catches up.

## Current status
- Runtime now uses project-local toolchain via `.mise.toml` (`node=22`, `pnpm=10.33.4`).
- Validation and checks should be run with the project-local toolchain (`mise exec -- pnpm ...`).
- Playwright browser smoke tests are available through `mise exec -- pnpm test:browser`.
- CI is configured to install dependencies from the lockfile, install Chromium, and run `pnpm check:all`.
- Current validation command sequence:
  - `mise exec -- pnpm check:live`
  - `mise exec -- pnpm check:final`
  - `mise exec -- pnpm check:all`
  - `PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app mise exec -- pnpm test:browser`
