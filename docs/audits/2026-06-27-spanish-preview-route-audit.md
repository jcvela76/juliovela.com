# Spanish Preview Route Audit

Date: 2026-06-27

Branch:
`codex/article-visual-spanish-preview`

Pull request:
`https://github.com/jcvela76/juliovela.com/pull/14`

Purpose:
Verify the local route behavior for the article visual assets and Spanish draft preview slice before relying on Vercel Preview for final review.

## Routes checked

Base URL:
`http://127.0.0.1:19100`

| Route | Result | Notes |
| --- | --- | --- |
| `/blog` | `200` | English blog index renders and remains indexable. |
| `/blog/choosing-the-right-ai-tool` | `200` | English article renders, remains indexable, and links to the Spanish preview route. |
| `/es/blog` | `200` | Spanish blog index renders for review and emits `noindex, nofollow`. |
| `/es/blog/como-elegir-la-herramienta-ia-adecuada` | `200` | Spanish draft article renders for review and emits `noindex, nofollow`. |
| `/blog/choosing-the-right-ai-tool/opengraph-image` | `200` | Article-specific OG image returns `image/png`. |
| `/robots.txt` | `200` | Public crawl rules respond. |
| `/sitemap.xml` | `200` | Sitemap responds. |

## Metadata findings

English article:
- Title: `Choosing the Right AI Tool for Your Workflow | Julio Vela Tech Solutions`
- H1: `Choosing the Right AI Tool`
- Robots: `index, follow`
- Language link: `Versión en español` points to `/es/blog/como-elegir-la-herramienta-ia-adecuada`

Spanish article:
- Title: `Cómo elegir una herramienta de IA | Julio Vela Tech Solutions`
- H1: `Cómo elegir la herramienta de IA adecuada`
- Robots: `noindex, nofollow`
- Language link: `English version` points to `/blog/choosing-the-right-ai-tool`

## Sitemap findings

The sitemap includes:
- `/blog`
- `/blog/choosing-the-right-ai-tool`

The sitemap intentionally does not include:
- `/es/blog`
- `/es/blog/como-elegir-la-herramienta-ia-adecuada`

Reason:
The Spanish version is still a draft and should not be indexed or included in production sitemap output until explicitly approved and published.

## Decision

Local route audit result: `pass`

The slice is ready for Vercel Preview review.

## Next step

Review the PR Preview deployment for:
- `/blog/choosing-the-right-ai-tool`
- `/es/blog`
- `/es/blog/como-elegir-la-herramienta-ia-adecuada`
- `/blog/choosing-the-right-ai-tool/opengraph-image`

If Vercel Preview checks pass and the rendered Spanish article is approved, merge the PR.

Publishing the Spanish article is a separate future decision and should not happen automatically.
