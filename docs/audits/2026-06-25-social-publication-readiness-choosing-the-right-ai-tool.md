# Social Publication Readiness: Choosing the Right AI Tool

Date: 2026-06-25

Source article:
`content/approved/blog/choosing-the-right-ai-tool.mdx`

Article URL:
`https://juliovela.com/blog/choosing-the-right-ai-tool`

LinkedIn draft:
`content/drafts/linkedin/choosing-the-right-ai-tool.md`

Image direction:
`content/assets/prompts/choosing-the-right-ai-tool-image-direction.md`

Selected direction asset:
`content/assets/images/choosing-the-right-ai-tool/editorial-illustration-direction.png`

Current article OG route:
`https://juliovela.com/blog/choosing-the-right-ai-tool/opengraph-image`

## Purpose

Prepare the social-sharing package for the first published article without publishing automatically.

This audit records the draft, image decision, approval gates, and remaining steps before a LinkedIn post can go live.

## Current package status

- Blog article: published on the website.
- Canonical URL: set to `https://juliovela.com/blog/choosing-the-right-ai-tool`.
- Article-specific OG route: available as a technical fallback.
- Preferred future social image: original editorial illustration.
- Selected direction asset: generated and stored in the repo for the next implementation pass.
- LinkedIn draft: created and marked `ready_for_review`.
- Image prompt/direction: created and marked `ready_for_review`.
- LinkedIn publication: not approved and not published.

## LinkedIn draft review

Decision: `ready_for_review`

Strengths:
- Strong practical hook.
- Clear workflow-first point of view.
- Human, concise structure.
- No clickbait.
- No fake claims, fake metrics, fake clients, or fake endorsements.
- Soft CTA only.

Required before publishing:
- Julio reviews and approves the exact text.
- Julio may edit tone, length, or CTA before posting.
- Final approved copy should be moved to `content/approved/linkedin/` or have approval recorded before publishing.

## Image / OG review

Decision: `ready_for_review`

Preferred image:
An original Julio Vela editorial illustration based on:
`content/assets/prompts/choosing-the-right-ai-tool-image-direction.md`

Selected direction:
`content/assets/images/choosing-the-right-ai-tool/editorial-illustration-direction.png`

Final copy lockup:

```text
:// Choosing the Right AI Tool
A workflow-first framework for evaluating AI tools before adding them to your technology stack.
```

Temporary fallback:
The current generated OG route:
`/blog/choosing-the-right-ai-tool/opengraph-image`

Why:
- The new direction better supports a premium article system across future posts.
- It can communicate the article thesis visually instead of relying only on text.
- It should stay minimal, editorial, and brand-aligned.
- It avoids generic AI visuals, robots, circuits, fake screenshots, fake UI, and fake claims.
- It must not imitate the New York Times, any publication, or any artist.
- It will use the consistent minimal article copy system: `:// [title]` plus one support line.

Required before publishing:
- Julio has approved the visual direction.
- Julio still needs to approve the final rendered OG/social composition after logo/title/metadata are mounted.
- If the image is not approved, either adjust the image or explicitly approve the default brand fallback for this one share.

## Approval checklist

Before LinkedIn publication:

- [ ] Julio approves the LinkedIn post text.
- [ ] Julio approves the final rendered OG/social image using the minimal copy lockup.
- [ ] Article URL is correct.
- [ ] Canonical URL is correct.
- [ ] No affiliate, sponsor, or vendor disclosure is needed.
- [ ] No fake claims, fake clients, fake metrics, testimonials, or endorsements are present.
- [ ] The post links to the intended article URL.
- [ ] The final post is copied manually or published through an approved future automation flow.

## Publication rule

Do not publish automatically.

LinkedIn publication requires explicit Julio approval after reviewing:
- Post text
- Article URL
- Social image
- Any disclosure needs

If future automation is added, it must stop at a human approval gate before posting.

## Final decision

Decision: `not_ready_to_publish`

Reason:
The package is ready for text review, and the visual direction has been selected, but the final rendered OG/social composition and LinkedIn publication have not been approved yet.

Next step:
Implement the illustrated OG composition, then review the LinkedIn draft and final social image together. If approved, record approval before posting.
