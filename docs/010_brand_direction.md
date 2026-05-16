# Brand Direction

## Brand identity
- Name: `:// JULIO VELA`
- Subtitle: `TECH SOLUTIONS`
- Core palette:
  - Signal Red: `#E11D2E`
  - Space Gray: `#1F2329`
  - Graphite: `#2B2F36`
  - Interface Gray: `#9AA0A6`
  - Soft White: `#F5F6F7`
  - White: `#FFFFFF`

## Positioning
Julio Vela is a practical technology guide focused on:
- AI tools and workflows
- Automation
- Software strategy
- Web/software solutions
- Technology recommendations

## Voice
- Clear, practical, and non-hype
- Solution-oriented, concise, and credible
- Technical without being corporate-heavy

## Visual style
- Minimal, bold, clean layouts
- Avoid robot/cyberpunk clichés
- Favor simple spacing, high contrast, and restrained copy

## Logo source of truth
- The approved `:// JULIO VELA` / `TECH SOLUTIONS` lockup should be reused from the project SVG source instead of being recreated with separate text spans.
- The reusable logo geometry lives in code so the homepage, header, and generated assets stay visually aligned.
- Web UI, header usage, and homepage hero should use the same SVG source to avoid visual drift.
- `next/og` does not support SVG `<text>` nodes; OG image routes use a PNG asset derived from the SVG lockup until the final logo SVG is converted to path outlines.
- The generated OG fallback image should stay visually close to the homepage logo: same red mark proportions, same wordmark weight, same centered `TECH SOLUTIONS` subtitle, and no extra decorative treatment.
- The favicon and Apple icon should use only the red `://` mark on Soft White, not the full wordmark.
- If the logo needs a new size, scale the SVG; do not redesign the mark, change the colors, add shadows, or substitute decorative tech imagery.

## Current brand asset implementation
- UI logo component: `src/components/brand-logo-svg.tsx`
- Shared logo SVG data: `src/lib/brand-logo.ts`
- OG-safe logo component: `src/components/og-brand-logo.tsx`
- OG PNG source: `public/brand-logo-lockup.png`
- OG PNG data URI helper: `src/lib/brand-logo-png.ts`
- Main OG route: `src/app/opengraph-image.tsx`
- Article OG route: `src/app/blog/[slug]/opengraph-image.tsx`
- Favicon: `src/app/icon.svg`
- Apple icon: `src/app/apple-icon.svg`

## Brand asset maintenance notes
- When the SVG logo geometry changes, regenerate `public/brand-logo-lockup.png` from the local homepage preview and then regenerate `src/lib/brand-logo-png.ts`.
- After asset changes, verify `/opengraph-image`, `/blog/[slug]/opengraph-image`, `/icon.svg`, and `/apple-icon.svg` locally before committing.
- Do not manually approximate the logo in separate OG or metadata code; use the shared source or a generated derivative from the shared source.
