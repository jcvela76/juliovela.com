# article-image-director

## Skill purpose
Define the visual direction for each blog article before publication, including article-specific Open Graph images, cover image planning, social image prompts, alt text, and approval criteria.

This skill turns an approved or near-approved article into a clear image direction that is brand-aligned, practical, minimal, and ready for Julio review.

## When to use it
Use this skill when:
- A new blog article is drafted.
- An article moves toward `ready_for_review`.
- An article needs an OG/social preview image.
- A published article needs a better social image.
- The default brand OG image may not communicate the article topic clearly.

Do not use it to publish images automatically.

## Inputs it expects
Required inputs:
- Article title
- Article slug
- Article excerpt
- Article tags
- Intended audience
- Article thesis or practical takeaway
- Publication status
- Target surface: OG image, blog cover, LinkedIn image, carousel, or fallback decision
- Current article URL or planned canonical URL
- Whether the image is article-specific or default brand fallback

Optional inputs:
- Approved article copy
- LinkedIn post draft
- SEO title and description
- Existing image prompt
- Existing OG preview screenshot
- Brand asset references
- Any legal/disclosure constraints

## Output it should produce
- Recommended image strategy
- 2-3 visual concept options
- One preferred concept with rationale
- OG/social prompt
- Negative prompt / avoid list
- Layout notes
- Brand constraints
- Required dimensions
- Alt text
- Approval checklist
- Fallback recommendation
- File/path suggestions for storing prompts or approved assets

## Required dimensions
Default project dimensions:
- Open Graph / Twitter large image: `1200x630`
- Aspect ratio: `1.91:1`
- Format: PNG for generated OG routes
- Route preview: `/blog/[slug]/opengraph-image`

Optional future assets:
- LinkedIn feed image: reuse `1200x630` unless a platform-specific crop is intentionally designed.
- Blog cover image: define only when the article page design supports visible cover images.
- Carousel images: treat as a separate future slice.

## Brand constraints
All article images must follow the Julio Vela Tech Solutions identity.

Logo / identity:
- `:// JULIO VELA`
- `TECH SOLUTIONS`

Palette:
- Signal Red: `#E11D2E`
- Space Gray: `#1F2329`
- Graphite: `#2B2F36`
- Interface Gray: `#9AA0A6`
- Soft White: `#F5F6F7`
- White: `#FFFFFF`

Style:
- Minimal
- Premium
- Modern
- Editorial
- Practical technology
- Clear and trustworthy

Avoid:
- Generic AI robots
- Circuit-board visuals
- Neon cyberpunk
- Cluttered dashboards
- Fake screenshots
- Fake UI products
- Stock-photo business imagery
- Imitating another brand or living artist
- Unapproved third-party logos
- Fake claims, metrics, awards, or endorsements

## Concept model
For each article, propose 2-3 concepts.

Concept 1: Editorial title card
Use the article title, brand logo, tags, and a strong typographic hierarchy. Best for thought leadership and LinkedIn sharing.

Concept 2: Abstract workflow visual
Use minimal geometric shapes, flow lines, decision paths, or structured blocks to represent the article idea without becoming generic tech decoration.

Concept 3: Practical framework visual
Use a matrix, checklist, or decision model inspired by the article structure. Must not look like a fake software screenshot.

Each concept must include:
- Visual summary
- Why it fits the article
- Risk or tradeoff
- Whether it should be used for OG, LinkedIn, or both

## Prompt format
Use this prompt structure:

```text
Create a minimal premium editorial image for an article titled "[ARTICLE_TITLE]".

Purpose:
[OG image / LinkedIn image / blog cover]

Topic:
[SHORT ARTICLE TOPIC]

Visual direction:
[DESCRIBE PREFERRED CONCEPT]

Brand:
Use the Julio Vela Tech Solutions identity. Use a soft white or high-contrast brand background, Signal Red #E11D2E as a restrained accent, Space Gray #1F2329 for primary visual weight, Graphite #2B2F36 where needed, and Interface Gray #9AA0A6 for secondary elements.

Composition:
1200x630 horizontal layout. Keep generous whitespace. Use strong typographic hierarchy. Keep the design calm, modern, technical, and trustworthy.

Include:
- The `://` mark or approved logo lockup only if it can remain faithful to the brand asset.
- Article title or approved OG title.
- Optional short tag line from article tags.

Avoid:
No robots, no circuits, no neon cyberpunk, no fake screenshots, no fake software UI, no stock photo style, no clutter, no unapproved logos, no exaggerated AI symbolism, no imitation of another brand or artist.
```

## Alt text rules
Alt text must:
- Describe the image plainly.
- Mention the article topic.
- Avoid keyword stuffing.
- Avoid saying "image of" unless useful.
- Avoid promotional language.

Alt text format:

```text
Minimal Julio Vela Tech Solutions editorial graphic for an article about [ARTICLE_TOPIC], using the brand red mark, dark typography, and a clean technical layout.
```

## Approval checklist
Before an article image is approved, confirm:
- [ ] Image matches the approved Julio Vela brand direction.
- [ ] `://` mark is accurate if used.
- [ ] Colors use the approved brand palette.
- [ ] Image is readable at social preview size.
- [ ] Article title or topic is clear.
- [ ] No generic AI robot, circuit, neon, or cyberpunk visuals.
- [ ] No fake screenshots or fake UI.
- [ ] No unapproved third-party logos.
- [ ] No unsupported claims, metrics, or endorsements.
- [ ] Alt text is included.
- [ ] OG route or asset path is documented.
- [ ] Julio has approved the image or explicitly approved using the default fallback.

## Fallback rule
Every article must have one of these before publishing:
- Approved article-specific OG/social image.
- Explicit Julio approval to use the default brand OG fallback.

Do not assume the fallback is acceptable. Record the decision.

## Suggested storage
Prompt file:
`content/assets/prompts/[slug]-image-direction.md`

Future approved static images, if needed:
`content/assets/images/[slug]/og.png`
`content/assets/images/[slug]/linkedin.png`

Current generated route:
`/blog/[slug]/opengraph-image`

## Handoff format
Return:
- Article slug
- Recommended image strategy
- Preferred concept
- Alternate concepts
- Final prompt
- Negative prompt / avoid list
- Alt text
- Dimensions
- Suggested file paths
- Approval checklist
- Open questions
- Fallback recommendation

## Example prompt
"Create an article image direction for `choosing-the-right-ai-tool`. Return concept options, preferred direction, OG/social prompt, alt text, approval checklist, and fallback recommendation. Do not publish or generate final assets without Julio approval."
