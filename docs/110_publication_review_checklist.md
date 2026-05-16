# Publication Review Checklist

Use this checklist before changing any article from `approved` to `published`.

No article should be published from Markdown/frontmatter review alone. Julio must review the rendered experience in Vercel Preview first.

## Required preview surfaces
- Vercel Preview article page: `/blog/[slug]`
- Vercel Preview blog index: `/blog`
- Open Graph / cover image preview: `/blog/[slug]/opengraph-image`
- Site-wide fallback image preview: `/opengraph-image`
- Metadata output in rendered HTML
- Mobile viewport review
- Desktop viewport review

## Required approvals
Before merge to `main`, confirm:
- Content approved
- Professional copy review approved
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

## Professional copy review
Every article must pass copy review before approval or publication.

The copy review should confirm:
- The intended audience is clear.
- The opening explains why the article matters.
- The practical takeaway is obvious.
- Section transitions feel natural.
- Generic or vague language has been tightened.
- The closing gives a useful next step or soft CTA.
- The article still sounds like Julio Vela: practical, technical, clear, modern, and non-hype.
- No claims, metrics, clients, testimonials, or endorsements were invented.

Copy review may improve:
- Hook
- Structure
- Rhythm
- Transitions
- Clarity
- Closing

Copy review must not:
- Change the article's approved intent without calling it out.
- Add unsupported claims.
- Make the tone clickbait-heavy.
- Turn practical guidance into generic AI hype.

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
- If the article is intended for social sharing, prefer an article-specific OG image over the default brand fallback.
- Record whether the article is using an article-specific OG image or an explicitly approved fallback.

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
The project currently supports article-specific OG image generation and keeps the default brand OG image as a fallback.

Every publish-readiness audit must explicitly confirm whether the article-specific OG image is approved.

Follow-up:
- Keep `/opengraph-image` as the site-wide fallback.
- Do not block focused copy edits on OG implementation if fallback use is explicitly accepted as temporary.
