# Publication Review Checklist

Use this checklist before changing any article from `approved` to `published`.

No article should be published from Markdown/frontmatter review alone. Julio must review the rendered experience in Vercel Preview first.

## Required preview surfaces
- Vercel Preview article page: `/blog/[slug]`
- Vercel Preview blog index: `/blog`
- Open Graph / cover image preview: `/opengraph-image` or the article-specific image route when available
- Metadata output in rendered HTML
- Mobile viewport review
- Desktop viewport review

## Required approvals
Before merge to `main`, confirm:
- Content approved
- Rendered article page approved
- Blog index card/listing approved
- Visual / OG image approved
- SEO metadata approved
- Legal/disclosure needs reviewed
- Publish approved explicitly by Julio

Suggested approval wording:

```text
Approved to publish: [article slug]
Content, visual preview, SEO metadata, and production behavior reviewed.
```

## Article page review
Check the Vercel Preview article page:
- Title renders correctly.
- Date is the intended publish date.
- Excerpt is clear and not duplicated awkwardly.
- Tags are relevant.
- Body formatting is readable.
- Headings create a clear hierarchy.
- Lists render as actual lists, not broken paragraphs.
- Mobile spacing is comfortable.
- Desktop line length is readable.
- No fake metrics, fake claims, or unapproved endorsements appear.

## Blog index review
Check `/blog` in Vercel Preview:
- Article appears with the intended title.
- Excerpt is concise.
- Date is correct.
- Tags are not noisy.
- The page still feels clean with the article card/list item present.

## Visual / image review
Check the visual plan before publishing:
- OG image or cover image is visible.
- Image matches the Julio Vela brand direction.
- Image does not use generic AI robots, neon cyberpunk, circuits, fake screenshots, or clutter.
- Image has appropriate alt text or planned alt text.
- If an article-specific image is not ready, confirm the default brand OG image is acceptable for this publish.

## SEO metadata review
Confirm:
- `seo_title` is clear and within target length.
- `description` is clear and within target length.
- `slug` is stable and lowercase kebab-case.
- Canonical behavior is correct.
- Published articles are indexable.
- Preview-only content remains noindex or hidden from production.
- `sitemap.xml` includes only published public articles.
- `robots.txt` still blocks `/drafts-preview`.

## Legal and disclosure review
Confirm:
- No affiliate links are present unless disclosed.
- No paid sponsorship or vendor relationship is implied unless disclosed.
- No legal, financial, security, or medical advice is presented as professional advice.
- Product recommendations are framed as practical guidance, not guaranteed outcomes.

## Validation commands
Before publishing PR is merged:

```bash
mise exec -- pnpm check:live
mise exec -- pnpm check:all
PLAYWRIGHT_BASE_URL=<vercel-preview-url> mise exec -- pnpm test:browser
git diff --check
git status --short --branch
```

After merge to `main`:

```bash
git checkout main
git pull
PLAYWRIGHT_BASE_URL=https://juliovela-com.vercel.app mise exec -- pnpm test:browser
```

Then manually confirm:
- `/blog`
- `/blog/[slug]`
- `/sitemap.xml`
- `/robots.txt`

## Current limitation
The project currently has a default brand OG image but not yet article-specific OG image generation.

Until article-specific OG images exist, every publish-readiness audit must explicitly confirm whether the default brand OG image is acceptable for that article.
