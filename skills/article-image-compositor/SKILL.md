# article-image-compositor

## Skill purpose
Compose the final typography layer for Julio Vela article Open Graph and social images after the textless editorial illustration has been approved.

This skill protects the final brand polish: the `://` mark, article title, support line, alignment, visual rhythm, collision checks, and browser-reviewed iterations.

## When to use it
Use this skill when:
- An article has an approved textless editorial illustration.
- Julio asks to add title/support copy to an article image.
- The OG route or static social image needs final typography.
- The title must follow a visual path, line, or composition guide.
- A generated image contains bad text, deformed `://`, poor logo fidelity, or layout collisions.

Do not use this skill to generate the base illustration. Use `editorial-illustrator` for the textless concept and `article-image-director` for strategy first.

## Inputs it expects
Required inputs:
- Article title
- Article slug
- Short support line
- Base illustration path
- Target route or output path
- Approved brand mark source
- Required dimensions, usually `1200x630`
- Notes from Julio about alignment, path behavior, or visual issues

Optional inputs:
- Screenshot of current OG preview
- Previous failed iteration
- Exact path geometry or line coordinates
- Browser preview URL
- Social platform target, such as OG, LinkedIn, or both

## Output it should produce
- Final composition recommendation
- Typography overlay implementation plan
- Updated OG route or generated final image asset
- Browser-preview evidence or visual observations
- Collision and readability notes
- Approval checklist
- Clear next action: approve, adjust, or rasterize for production

## Core principle
Do not let AI-generated image tools render brand typography.

Generated tools may create the textless illustration, but the final text layer must be controlled by the project:
- Use the official `://` mark or SVG/source geometry.
- Use the project typography system or a documented compatible font.
- Use deterministic coordinates, SVG paths, or code-generated layout.
- Never accept malformed generated text as final.

## Required composition system
Default article image copy:

```text
:// [Article Title]
[Short support line]
```

Rules:
- `://` must be Signal Red `#E11D2E`.
- Title must be Space Gray `#1F2329`.
- Support line should be short, understated, and readable.
- Prefer one support line of 2-6 words when the image is visually dense.
- Do not add `ARTICLE`, date, author, tags, or extra metadata unless Julio explicitly approves.
- Do not let text collide with nodes, shapes, edges, or important illustration details.

## Path-based title rules
When Julio asks for the title to follow a line/path:
- Use a real SVG `textPath`, path-aware render step, or deterministic rasterization workflow when possible.
- Do not fake path-following by randomly splitting the title into separate blocks.
- If the runtime cannot render `textPath`, stop and document the technical constraint before using a fallback.
- If a fallback is necessary, ask for approval or clearly label it as an approximation.
- The title should ride the path with enough offset so the red line does not cut through letterforms.
- The title must end before colliding with the target node or important visual object.

## Iteration loop
Every composition iteration must follow this loop:

1. Implement one focused layout change.
2. Load the target preview in the browser.
3. Capture or visually inspect the rendered image.
4. Check alignment:
   - `://` matches the approved logo mark.
   - Title follows the intended path or approved fallback.
   - Text baseline feels intentional.
   - Support line does not collide with shapes.
   - Red line does not cut through the title unless intentionally approved.
   - Composition remains readable at social preview size.
5. If any issue is visible, adjust only the composition layer and repeat.
6. Stop when the layout is visually correct or when a technical limit requires a different rendering approach.

Do not keep iterating blindly. Name the specific visual issue before each adjustment.

## Visual QA checklist
- [ ] `://` uses the official Julio Vela mark or faithful vector geometry.
- [ ] `://` is Signal Red `#E11D2E`.
- [ ] Title uses brand-aligned typography and Space Gray `#1F2329`.
- [ ] Title follows the approved path or an approved fallback.
- [ ] Title does not collide with the red target node.
- [ ] Support line is short and readable.
- [ ] Support line does not overlap shapes, dotted paths, or shadows.
- [ ] Text remains readable at small social preview size.
- [ ] Composition still feels minimal, premium, calm, and editorial.
- [ ] Base illustration remains textless and reusable.
- [ ] Final route or asset format is suitable for the target platform.
- [ ] Julio has approved the rendered result before publication.

## Platform output guidance
- Use PNG for final Open Graph and LinkedIn reliability when possible.
- SVG may be useful for design preview or path-accurate composition.
- If SVG is used as an intermediate, rasterize to PNG before production social use unless platform compatibility has been verified.
- Do not claim a social platform will render SVG correctly without testing.

## Guardrails
- Do not change the approved base illustration unless Julio asks.
- Do not redesign the brand mark.
- Do not use AI-generated text as final typography.
- Do not use third-party logos or fake tool icons.
- Do not publish or deploy automatically.
- Do not make global runtime/tooling changes.
- Keep all changes small and reviewable.

## Example prompt
"Use `article-image-compositor` to add the final title layer for `choosing-the-right-ai-tool`. Use the approved textless illustration, preserve the red path, make `:// Choosing the Right AI Tool` follow the path with the official red mark, keep the support line short, preview in browser, and iterate only on visible composition issues until it is ready for Julio approval."
