# editorial-illustrator

## Skill purpose
Create original editorial illustration directions for Julio Vela Tech Solutions articles, including concepts, prompts, composition notes, alt text, and approval checklists.

Use this skill when an article needs a visual concept for Open Graph, LinkedIn, blog cover, or future carousel artwork.

## When to use it
Use when:
- A blog article needs an article-specific illustration.
- A social image should feel more conceptual than a text-only title card.
- The visual should communicate the article's idea without fake UI, stock imagery, or generic AI visuals.
- Julio wants an illustration direction before approving or generating an image.

## Inputs it expects
- Article title
- Article slug
- Article excerpt
- Article tags
- Article thesis or practical takeaway
- Intended audience
- Target surface: OG image, LinkedIn image, blog cover, or carousel
- Required dimensions
- Current brand assets and palette
- Any visual references approved by Julio

## Output it should produce
- 2-3 original editorial illustration concepts
- One recommended concept with rationale
- Composition notes
- Color and typography guidance
- Final image-generation prompt
- Negative prompt / avoid list
- Alt text
- Approval checklist
- Open questions before generation or publication

## Guardrails
- Do not copy the New York Times, any publication, any living artist, or any specific illustrator's style.
- Use "editorial illustration" as a category, not as imitation of a publication.
- Keep the work original to the Julio Vela brand.
- Use conceptual, practical technology metaphors instead of generic AI symbolism.
- Avoid robots, glowing brains, circuits, neon cyberpunk, fake dashboards, fake screenshots, fake UI, stock business people, and clutter.
- Do not add fake metrics, fake claims, fake clients, awards, testimonials, or endorsements.
- Do not generate or publish final images without Julio approval.
- Keep illustrations premium, calm, minimal, and useful.
- Keep generated illustrations textless unless Julio explicitly asks otherwise.
- Leave safe space for the final OG copy lockup: `:// [article title]` and one supporting line.

## Brand rules
- Signal Red: `#E11D2E`
- Space Gray: `#1F2329`
- Graphite: `#2B2F36`
- Interface Gray: `#9AA0A6`
- Soft White: `#F5F6F7`
- White: `#FFFFFF`
- Brand mark: `:// JULIO VELA`
- Subtitle: `TECH SOLUTIONS`

## Preferred visual language
Use an original Julio Vela editorial illustration system:
- Minimal conceptual metaphor
- High negative space
- Strong silhouette or simple geometric scene
- Limited palette
- One restrained Signal Red accent
- Clean, premium editorial layout
- Practical technology subject matter
- Human judgment and workflows over abstract AI hype

## Concept patterns
Use these as starting points, not templates:

### Workflow metaphor
Show a clean path, decision fork, or simplified workspace that represents choosing one useful tool instead of many noisy options.

### Decision clarity
Show a person, cursor, or simple object making a clear selection from a restrained set of options. Keep it abstract and non-literal.

### Tool fit
Show modular shapes fitting into a workflow path, emphasizing usefulness and fit rather than novelty.

### Signal vs noise
Show many muted inputs with one clear red signal. Keep it minimal and avoid clutter.

## Prompt format
Use this structure:

```text
Create an original premium editorial illustration for an article titled "[ARTICLE_TITLE]".

Purpose:
[OG image / LinkedIn image / blog cover]

Topic:
[SHORT ARTICLE TOPIC]

Concept:
[DESCRIBE THE ORIGINAL CONCEPTUAL METAPHOR]

Visual direction:
Minimal editorial illustration, premium software-brand feel, high negative space, restrained shapes, practical technology tone. Use an original Julio Vela Tech Solutions visual language. Do not copy or imitate any publication, brand, or artist.

Brand palette:
Soft White #F5F6F7 background, Space Gray #1F2329 primary forms, Graphite #2B2F36 support forms, Interface Gray #9AA0A6 secondary details, and Signal Red #E11D2E as one restrained accent.

Composition:
1200x630 horizontal layout. Keep generous whitespace. Leave safe space for the final article copy lockup: `:// [ARTICLE TITLE]` plus one short supporting line. Make the concept readable at social preview size.

Avoid:
No robots, no circuits, no neon cyberpunk, no fake dashboards, no fake screenshots, no fake UI, no stock-photo business people, no third-party logos, no fake metrics, no fake awards, no imitation of the New York Times or any specific artist/publication style.
```

## Checklist
- [ ] Concept communicates the article's practical takeaway.
- [ ] Illustration is original and does not imitate a publication or artist.
- [ ] Brand palette is followed.
- [ ] Signal Red is restrained.
- [ ] Visual is readable at social preview size.
- [ ] No generic AI or cyberpunk motifs.
- [ ] No fake UI/screenshots/metrics.
- [ ] Illustration is textless.
- [ ] Safe space exists for `:// [article title]` plus one support line.
- [ ] Alt text is included.
- [ ] Julio has approved the concept before generation.
- [ ] Julio has approved the rendered image before publication.

## Example prompt
"Create an original editorial illustration direction for `choosing-the-right-ai-tool`. Avoid copying any publication style. Return concept options, a recommended concept, final prompt, negative prompt, alt text, and approval checklist."
