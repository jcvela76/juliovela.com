# Roadmap

## Phase 0 (Foundation)
- Governance and Codex instructions
- Skills and workflow scaffolding

## Phase 1 (Documentation)
- Finalize docs foundation
- Validate content schema and approval process

## Phase 2 (Website implementation)
- Minimal Next.js app + sectioned homepage
- MDX article pipeline
- Slice 2: Minimal scaffold implemented and validated with mise-managed Node/pnpm.
- Next slice: complete validation, then proceed to content validation and production-ready quality checks before adding any blog ingestion/automation.

## Runtime alignment slice (active)
- Project-local tooling switched to `mise` with Node 22 LTS and pnpm 10.33.4.
- Validation for subsequent slices should run with project-local toolchain:
  - `mise exec -- pnpm lint`
  - `mise exec -- pnpm typecheck`
  - `mise exec -- pnpm test`
  - `mise exec -- pnpm build`
  - `mise exec -- pnpm check:all`

## Phase 3 (Automation)
- n8n-orchestrated content pipeline
- Human-in-the-loop approval gates

## Phase 4 (Refinement)
- Quality hardening, SEO improvement, and publish-readiness checks
