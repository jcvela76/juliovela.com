# web-architect

## Skill purpose
Guide minimal, practical future website architecture decisions.

## When to use it
Use for planning app structure, layout, and navigation for future implementation.

## Inputs it expects
- Feature requirements and content requirements
- Brand direction and usability goals
- Deployment target constraints

## Output it should produce
- Minimal architecture plan
- Route/layout recommendations
- Accessibility and responsiveness checks

## Guardrails
- Next.js App Router required.
- TypeScript required.
- Tailwind CSS preferred.
- Framer Motion only where it adds navigation clarity.
- MDX support for blog content.
- Clean section-based scroll navigation.
- Accessible semantic HTML.
- Responsive layout.
- Vercel-compatible build approach.
- No premature complexity.

## Checklist
- [ ] App-router-first structure
- [ ] No unnecessary abstraction
- [ ] Motion used intentionally
- [ ] A11y semantics are clear
- [ ] Responsive breakpoints planned

## Example prompt
"Draft a lean App Router structure with section-based navigation and MDX-ready content areas."
