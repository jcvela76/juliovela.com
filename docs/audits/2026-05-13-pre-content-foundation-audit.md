# Pre-Content Foundation Audit

Date: 2026-05-13
Branch: `feature/content-foundation`
Scope: readiness check before adding `content/`, content validation, and draft workflow files.
Status: no blocking refactor required before the content foundation slice.

## Summary

The current project foundation is ready for the content foundation slice.

No large refactor is required before creating repo-first content folders, example drafts, and `content:validate`.

The main recommendation is to keep the next slice focused on content structure and validation. Defer UI component cleanup unless the content slice needs those files directly.

## Current architecture reviewed

Reviewed areas:
- `src/app/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/disclosures/page.tsx`
- `src/components/brand-mark.tsx`
- `src/components/content-section.tsx`
- `src/components/hero-section.tsx`
- `src/components/section-nav.tsx`
- `src/components/site-header.tsx`
- `src/lib/brand.ts`
- `src/lib/site.ts`
- `package.json`
- `docs/040_content_workflow.md`
- `docs/050_automation_plan.md`
- `docs/070_testing_and_quality_plan.md`
- `docs/090_port_registry.md`
- `docs/decisions/0002_content_source_of_truth.md`

## Findings

### 1. Legal pages repeat layout markup

Files:
- `src/app/privacy/page.tsx`
- `src/app/disclosures/page.tsx`

Both legal pages repeat the same page shell, brand link, heading structure, date treatment, and body layout.

Recommendation:
- Optional later refactor: create a shared `LegalPage` component if a third legal/static page is added.
- Do not refactor now unless the next slice touches legal pages again.

Risk if not refactored:
- Low. Duplication is small and readable.

### 2. Homepage contact section is embedded in `page.tsx`

File:
- `src/app/page.tsx`

The homepage composition is still understandable, but Contact and mini-footer markup make the file longer.

Recommendation:
- Optional later refactor: extract `ContactSection` if homepage sections continue to grow.
- Keep as-is for the content foundation slice.

Risk if not refactored:
- Low. Current file is still small enough.

### 3. Content validation is documented but not implemented

Files:
- `docs/040_content_workflow.md`
- `docs/070_testing_and_quality_plan.md`
- `package.json`

Docs already mention `content:validate`, but the script and `content/` folders do not exist yet.

Recommendation for next slice:
- Add `scripts/content-validate.mjs` with no new dependency.
- Add `content:validate` to `package.json`.
- Include `pnpm content:validate` inside `check:live` and `check:final` after the validator exists.

Risk if not fixed:
- Medium. The docs describe a gate that is not currently executable.

### 4. Content source-of-truth decision is ready

File:
- `docs/decisions/0002_content_source_of_truth.md`

The repo-first architecture is clear:
- Git is source of truth.
- Vercel handles website and previews.
- n8n may orchestrate later but must not publish directly.
- Docker-local n8n experiments require port checks.

Recommendation:
- Proceed with file-based content folders and examples.
- Do not introduce a database, CMS, or n8n workflow in the next implementation slice.

Risk if ignored:
- Medium. Adding automation or a CMS too early would increase scope and reduce auditability.

### 5. Live vs final validation workflow is improved

Files:
- `package.json`
- `docs/070_testing_and_quality_plan.md`
- `AGENTS.md`
- `.codex/instructions.md`
- `skills/qa-auditor/SKILL.md`

The project now separates:
- `pnpm check:live` for active browser review
- `pnpm check:final` and `pnpm check:all` for final build validation

Recommendation:
- Keep using `check:live` while the dev server is active.
- Stop the dev server before build/final validation when possible.

Risk if ignored:
- High. Running `next build` while `next dev` is serving from `.next` can break the local preview.

### 6. Navigation/header implementation is acceptable for current scope

Files:
- `src/components/site-header.tsx`
- `src/components/section-nav.tsx`

The header logic uses browser APIs to detect the section under the fixed header and adjust contrast. This is acceptable for the current single-page homepage.

Recommendation:
- Do not refactor before the content foundation slice.
- Revisit only if public blog pages need shared header behavior.

Risk if not refactored:
- Low for current scope.

## Refactor recommendation

Required before content foundation:
- None.

Recommended during content foundation:
- Implement `content:validate`.
- Add content folders and examples.
- Update `check:live` and `check:final` to include `content:validate`.
- If a draft review page is added, keep it internal, noindexed, unlinked from public navigation, and blocked from Vercel Production.

Optional later cleanup:
- Extract `LegalPage` if more static/legal pages are added.
- Extract `ContactSection` if homepage continues to grow.
- Consider a shared static-page shell for Privacy, Disclosures, and future content policy pages.

## Content foundation implementation plan

Next slice should create:
- `content/topics/topic_queue.example.yml`
- `content/drafts/blog/*.example.mdx`
- `content/drafts/linkedin/*.example.md`
- `content/approved/blog/.gitkeep`
- `content/approved/linkedin/.gitkeep`
- `content/assets/prompts/*.example.md`
- `content/assets/images/.gitkeep`
- `scripts/content-validate.mjs`
- Optional internal `/drafts-preview` route for local and Vercel Preview review

Package scripts should add:
- `content:validate`

Validation scripts should become:
- `check:live`: lint, typecheck, test, content validation
- `check:final`: lint, typecheck, test, content validation, build
- `check:all`: final validation

## Validation during audit

Executed:
- `mise exec -- pnpm check:live`
- `git diff --check`
- `git status --short --branch`

Result:
- `check:live` passed.
- `git diff --check` passed.
- Working branch has documentation changes for the content source-of-truth decision and this audit.

## Decision

Proceed with the content foundation slice without a blocking refactor.

Keep the next slice focused on repo-first content structure and validation. Avoid adding public blog rendering, MDX routing, n8n workflows, Docker services, analytics, CMS, or database work until the content foundation is validated.
