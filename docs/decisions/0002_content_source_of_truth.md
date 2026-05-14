# 0002 Content Source of Truth

## Status
Accepted

## Decision
Use repository files as the source of truth for the initial content workflow.

The project will store content in Git using:
- YAML for topic queues
- MDX for blog drafts and approved blog content
- Markdown for LinkedIn drafts
- Markdown for image prompts and visual direction
- Static files for approved/generated images

Do not introduce a production database or CMS in the initial content foundation slice.

## Context
juliovela.com is hosted on Vercel and follows a preview-first workflow. The project needs content drafts, review, approval, and publishing discipline before it needs a database-backed editorial system.

The key workflow requirement is human approval:
- Nothing publishes automatically.
- Drafts must be reviewable.
- Changes must be auditable.
- Vercel Preview deployments should support review before production.

## Rationale
Repo-first content is preferred because:
- GitHub PRs provide a clear approval gate.
- Git history provides auditability and rollback.
- Vercel works well with static content and preview deployments.
- MDX files can later become public blog pages without migrating storage.
- YAML topic queues are easy for humans and automation to read.
- This avoids premature CMS/database complexity.

## Automation role
n8n may be used later as an orchestration layer.

n8n should:
- Read topic queues from GitHub.
- Generate draft blog, LinkedIn, SEO, and image prompt artifacts.
- Open a branch or PR for review.
- Wait for Julio approval.
- Never publish directly.

Git remains the source of truth. n8n is not the canonical content database.

## Local automation
n8n may be tested locally with Docker after port checks.

Recommended local port:
- `N8N_PORT=19110`

Before running Docker automation work:
- Check active ports with `lsof`.
- Check running containers with `docker ps`.
- Do not stop existing services without explicit approval.
- Do not commit secrets or real `.env` files.

## Future reconsideration triggers
Revisit this decision if the project needs:
- Web-based editing UI
- Multiple editors
- Scheduled publishing
- Database-backed editorial state
- User accounts
- Personalized content
- Content updates without Git commits or redeploys
- Advanced search/admin workflows

Possible future options include Sanity, Contentful, DatoCMS, Supabase, Neon/Postgres, Notion, or a custom admin.

## Consequences
- Initial content work stays simple and auditable.
- Automation must work through GitHub PRs.
- Publishing remains tied to review and merge workflows.
- A future CMS/database migration remains possible, but is intentionally deferred.
