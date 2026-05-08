# Julio Vela Local Instructions

This is the Julio Vela personal brand repo.

- Preserve the brand identity: `:// JULIO VELA` and `TECH SOLUTIONS`.
- Do not publish or deploy without explicit approval.
- Do not install or configure global tools.
- Use project-local versions and local lockfiles.
- Use `.mise.toml` for project-local Node/pnpm pinning.
- Keep changes auditable, small, and reversible.
- Favor small testable slices.
- Keep future work aligned with Next.js, TypeScript, Vercel, MDX, and human-approved content workflow.

Validation rules:
- Every future code or configuration change must finish with validation when possible:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm build`
  - `pnpm check:all`
  - `git diff --check`
  - `git status --short --branch`
- Never claim validation passed unless all required checks actually pass.
- If validation is blocked by dependency/install issues (for example registry/network/DNS), report `BLOCKED` and do not mark work ready to commit.
