# Julio Vela Local Instructions

This is the Julio Vela personal brand repo.

- Preserve the brand identity: `:// JULIO VELA` and `TECH SOLUTIONS`.
- Do not publish or deploy without explicit approval.
- Do not install or configure global tools.
- Use project-local versions and local lockfiles.
- Use `.mise.toml` for project-local Node/pnpm pinning.
- Runtime versions must be active only in the terminal/session used for this project.
- Do not change global Node, npm, pnpm, or shell defaults to satisfy this repo.
- Prefer `mise exec -- pnpm ...` for all project commands so the pinned local Node/pnpm versions are used.
- If local runtime activation is unavailable, report the blocker and exact local setup command instead of installing or switching global versions.
- Keep changes auditable, small, and reversible.
- Favor small testable slices.
- Keep future work aligned with Next.js, TypeScript, Vercel, MDX, and human-approved content workflow.

Validation rules:
- During live UI iteration, every code change must be followed by at least:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm test`
- Before final handoff or commit recommendation, run the full default validation suite.
- If `next build` runs while a dev server is active, verify the preview afterward; restart the dev server or change ports only with user approval.
- Every future code or configuration change must finish with validation when possible:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm typecheck`
  - `mise exec -- pnpm test`
  - `mise exec -- pnpm build`
  - `mise exec -- pnpm check:all`
  - `git diff --check`
  - `git status --short --branch`
- Never claim validation passed unless all required checks actually pass.
- If validation is blocked by dependency/install issues (for example registry/network/DNS), report `BLOCKED` and do not mark work ready to commit.
