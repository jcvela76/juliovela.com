# Article OG Image Follow-up

Date: 2026-05-16

Related article:
`/blog/choosing-the-right-ai-tool`

Related current fallback:
`/opengraph-image`

## Purpose

Document the social image gap discovered during the pre-commit review of the first article copy polish.

This audit does not implement article-specific OG images. It records the issue so the current article copy task can stay focused and the OG work can become its own controlled slice.

## Finding

The article page now has a stronger editorial presentation than the current default OG image.

The article page feels:

- Editorial
- Practical
- Premium
- Minimal
- Clear
- Strongly aligned with the written content

The current OG image is technically correct and brand-aligned, but it is generic:

- It shows the Julio Vela brand lockup.
- It does not include the article title.
- It does not communicate the article topic.
- It does not reflect the article page hierarchy.
- It is acceptable as a fallback, but not ideal for article sharing.

## Current Technical State

The default OG image:

- Returns `200`.
- Is a PNG.
- Uses `1200x630`.
- Uses the approved `:// JULIO VELA / TECH SOLUTIONS` brand direction.
- Avoids robots, circuits, neon, fake screenshots, and generic AI visuals.

The article metadata currently points to the default image.

This is acceptable temporarily, but should not be the long-term article sharing strategy.

## Recommended Direction

Add article-specific OG images for blog posts.

Recommended visual direction:

- Soft white background.
- Signal Red `://` mark.
- Large article title.
- Small topic/tags line.
- Small `JULIO VELA / TECH SOLUTIONS` brand signature.
- Minimal editorial layout.
- No AI stock imagery.
- No robots, circuits, neon, or fake product screenshots.

Example structure:

```text
:// JULIO VELA

Choosing the Right AI Tool

AI tools / workflows / software strategy

TECH SOLUTIONS
```

## Recommended Implementation Slice

Suggested future slice:

`feat: add article-specific OG images`

Potential implementation:

- Add `src/app/blog/[slug]/opengraph-image.tsx`.
- Generate OG image from approved article metadata.
- Use article title and tags.
- Keep the existing `/opengraph-image` as the site-wide fallback.
- Update article metadata to point to the article-specific OG image when available.
- Keep fallback behavior for articles without custom image support.

## Workflow Rule

Every published article should have one of the following before publish:

- An article-specific OG/social image approved by Julio.
- Explicit approval to use the default brand fallback image for that publish.

This should be checked during the publication review process.

## Do Not Do in the Current Article Copy Slice

- Do not implement dynamic OG image generation.
- Do not redesign the default brand OG image.
- Do not add new image dependencies.
- Do not change the article slug or metadata structure only for this finding.
- Do not delay the article copy polish commit if the fallback image is explicitly accepted as temporary.

## Recommended Next Step After Article Copy Polish

Create a dedicated article OG/social image slice before publishing additional articles.

