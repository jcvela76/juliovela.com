# Homepage Copy and Mobile UX Audit

Date: 2026-05-16

## Scope
This audit reviews the deployed homepage experience after the homepage positioning update.

Reviewed deployment:
- `https://juliovela-com.vercel.app`

This audit covers:
- Homepage copy
- Narrative flow
- Mobile readability
- Mobile section rhythm
- Header and navigation behavior
- Contact clarity

This audit does not implement changes.

Excluded from this slice:
- Blog changes
- Article copy changes
- SEO implementation changes
- Vercel configuration
- DNS changes
- Analytics changes
- New features

## Measurement summary
Playwright was used to review desktop and mobile viewport behavior.

Viewports checked:
- Desktop: `1440 x 900`
- iPhone SE-style: `375 x 667`
- iPhone standard: `390 x 844`
- Large mobile: `430 x 932`

Measured results:
- Horizontal overflow: `0` across checked viewports
- Desktop sections: full viewport-height panels
- Mobile sections: some sections exceed viewport height because content is intentionally readable rather than compressed
- Hero logo remains centered in the intro viewport
- Header logo appears compact and aligned after the header lockup adjustment

## Executive summary
The homepage is in a strong launch-ready direction: premium, minimal, practical, and aligned with the approved brand. The copy is clearer than earlier versions and avoids generic AI hype.

The main remaining opportunity is not visual structure; it is message specificity. The current copy is polished, but a few phrases could become more concrete about who Julio helps and what kind of decisions he helps clarify.

Mobile is usable and does not show horizontal overflow. The most important mobile opportunity is section density: on smaller phones, long titles plus supporting cards can make sections feel less like calm narrative panels and more like tall content blocks.

## What is working

### Brand intro
The logo-first intro remains the right first impression.

Why it works:
- It feels calm and premium.
- It lets the brand breathe.
- It avoids stuffing marketing copy into the first screen.
- It makes the scroll experience feel intentional.

Recommendation:
- Keep the first screen logo-only.
- Do not add CTA buttons or long copy to the intro.

### Overall positioning
The core message is now clear:

> Practical guidance for better technology decisions.

This is the right territory for the brand because it is broader than only AI, but specific enough to frame Julio as a practical technology advisor.

### Tone
The tone is aligned:
- Practical
- Clear
- Technical
- Calm
- Non-hype
- Not corporate-heavy

The copy does not make fake claims, invent clients, or overpromise outcomes.

### Header
The compact header logo is the right decision.

Why:
- The full two-line lockup belongs in the hero and brand assets.
- The compact lockup works better next to navigation.
- The header no longer competes with the hero brand moment.

## Section-by-section audit

### Intro
Current role:
- Brand recognition
- Calm first impression
- Scroll cue

Assessment:
- Strong.
- No copy changes recommended.

Potential future refinement:
- If user testing shows people miss the scroll cue, consider a slightly more visible scroll affordance.
- Do not add a CTA unless the homepage strategy changes.

### About
Current copy:

> Practical guidance for better technology decisions.

> I help builders and teams make sense of AI, automation, software, and web tools before they commit time, budget, or trust.

Assessment:
- Clear and strong.
- The phrase "builders and teams" is useful, but still broad.
- "Before they commit time, budget, or trust" is a strong phrase and should likely stay.

Opportunity:
- Consider making the audience slightly more specific in a later copy pass.

Possible direction:
- Professionals and small teams choosing AI, automation, and software tools.
- Operators and builders who need practical technology direction before implementation.

Priority:
- Medium.

### Expertise
Current title:

> Where strategy meets implementation.

Assessment:
- Stronger than a generic "Expertise" title.
- Fits the brand well.

Current items:
- AI tools evaluated by workflow fit
- Automation designed around real bottlenecks
- Software strategy before build decisions
- Web solutions with practical scope and maintainability
- Technology recommendations with clear tradeoffs

Assessment:
- Good, practical, and not hype-driven.
- The list is clear, but could be slightly more distinct if each item had a tiny outcome attached.

Potential future direction:
- "AI tools evaluated by workflow fit, not novelty"
- "Automation designed around real bottlenecks, not busywork"
- "Technology recommendations with tradeoffs clearly explained"

Priority:
- Low to medium.

### Services / Work With Me
Current title:

> Useful direction before the build gets expensive.

Assessment:
- Very good.
- It creates urgency without sounding salesy.
- It communicates the value of early strategic guidance.

Current summary:

> Support for early decisions, messy tool choices, workflow planning, and software direction when the next move needs to be clearer.

Assessment:
- Strong, but "messy tool choices" is informal.
- That informality may be good for approachability, but it should be reviewed against the premium tone.

Potential future direction:
- Keep "messy" if we want a more human voice.
- Replace with "unclear" or "high-stakes" if we want a more premium/consultative tone.

Priority:
- Medium.

### Insights
Current title:

> Field notes for practical technology work.

Assessment:
- Strong.
- More editorial and memorable than "Insights Preview."
- Fits the personal brand direction.

Current summary:

> Short, useful guides on choosing tools, improving workflows, and making better software decisions without getting pulled into hype.

Assessment:
- Good and aligned.
- "Without getting pulled into hype" is on-brand.

Opportunity:
- The section should eventually link more clearly to the blog once we want stronger navigation into articles.
- For now, it works as positioning.

Priority:
- Low.

### Contact
Current title:

> Have a technology decision that needs a sharper point of view?

Assessment:
- Strong.
- It feels more personal and useful than a generic contact CTA.

Current summary:

> For project questions, workflow reviews, or practical software direction, start with a direct note.

Assessment:
- Clear.
- "Start with a direct note" is simple and low-pressure.

Opportunity:
- Consider adding a tiny expectation-setting phrase later, such as "No form, no funnel."
- Only do this if it fits the final brand tone.

Priority:
- Low.

## Mobile UX audit

### What is working on mobile
- No horizontal overflow was detected.
- Hero logo remains centered.
- Header height is compact.
- The compact header logo is appropriate for mobile.
- The section order remains clear.
- Full-screen rhythm works on larger mobile screens.

### Mobile concerns

#### 1. Section density on small phones
On iPhone SE-style dimensions, several sections are taller than the viewport:
- About
- Expertise
- Insights
- Contact

This is not a bug. It is better than forcing content into cramped panels. However, it means the experience becomes less like a snap-based slide deck and more like long-form scrolling on small phones.

Recommendation:
- Keep mobile scrolling flexible.
- Avoid aggressive scroll snap on mobile.
- Consider slightly shorter mobile titles or tighter item spacing only if visual review shows fatigue.

Priority:
- Medium.

#### 2. Header navigation on mobile
The current header keeps the brand compact. The nav links are not the primary mobile interaction, which is acceptable for this minimal site.

Recommendation:
- Do not add a hamburger menu yet.
- Keep mobile navigation simple unless analytics or user review shows people need faster section jumping.

Priority:
- Low.

#### 3. Mobile title scale
Large editorial titles are part of the premium direction, but they should be reviewed visually on the smallest phones.

Recommendation:
- In the next implementation slice, check whether `text-5xl` feels too large on small mobile sections.
- If needed, use a slightly smaller mobile title size and keep the large scale for `md` and above.

Priority:
- Medium.

## Recommended copy refinements for next slice
Do not apply all of these automatically. Use them as candidates for review.

### Candidate A: sharpen About audience
Current:

> I help builders and teams make sense of AI, automation, software, and web tools before they commit time, budget, or trust.

Possible:

> I help professionals and small teams make sense of AI, automation, software, and web tools before they commit time, budget, or trust.

Tradeoff:
- More specific and credible.
- Slightly less builder-oriented.

### Candidate B: make Services more premium
Current:

> Support for early decisions, messy tool choices, workflow planning, and software direction when the next move needs to be clearer.

Possible:

> Support for early decisions, unclear tool choices, workflow planning, and software direction when the next move needs to be clearer.

Tradeoff:
- More polished.
- Less human and conversational.

### Candidate C: tighten mobile titles
If mobile visual review feels dense, consider shortening:

Current:

> Useful direction before the build gets expensive.

Possible:

> Direction before the build gets expensive.

Tradeoff:
- Cleaner on mobile.
- Slightly less conversational.

## Recommended implementation sequence

### Slice C.1: Mobile visual tuning
Goal:
- Improve small-screen rhythm without changing the brand direction.

Possible changes:
- Slightly reduce mobile heading size.
- Tighten mobile section padding.
- Keep desktop unchanged.
- Keep the hero logo-first intro.

Validation:
- Local mobile visual review.
- `mise exec -- pnpm check:all`
- Production smoke after deploy.

### Slice C.2: Copy specificity pass
Goal:
- Decide whether to make the About and Services copy more specific.

Possible changes:
- Replace "builders and teams" only if we want a more explicit audience.
- Decide whether "messy tool choices" should stay.
- Keep the current Contact CTA unless user review suggests otherwise.

Validation:
- Copy review.
- `mise exec -- pnpm check:all`

## Recommendation
Do not change the homepage copy immediately.

Recommended next step:
- Review the deployed homepage manually on a real phone.
- If the mobile sections feel too dense, do Slice C.1 first.
- If the mobile rhythm feels good, do Slice C.2 as a small copy-only refinement.

Best immediate decision:
- Keep the current copy live for now.
- Only adjust mobile type/spacing if real-device review confirms the density concern.
