# Decision 0001: Project Stack

## Decision
Use **Next.js App Router + TypeScript** as the primary stack, with:
- Tailwind CSS
- MDX for content
- Framer Motion for restrained motion
- Zod for content/frontmatter validation
- Vercel for hosting
- Local runtime control via `mise`:
  - Node.js 22 LTS
  - pnpm 10.33.4

## Rationale
This stack balances speed, editorial clarity, and deployment ergonomics for a personal technology brand.

## Governance constraints
- Human approval before publishing.
- Keep changes small and auditable.
- Prefer stable, project-local tooling and lockfile-based installs.
- Do not modify global Node, npm, pnpm, or machine-wide runtime versions for this project.
- Project commands should run through the local toolchain, for example `mise exec -- pnpm build`.
- Runtime activation should be scoped to the current project terminal/session only.
- If the local runtime manager is unavailable, document the required setup rather than installing or switching global tools.
