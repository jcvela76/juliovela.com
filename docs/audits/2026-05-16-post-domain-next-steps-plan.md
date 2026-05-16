# Post-Domain Propagation Next Steps Plan

Date: 2026-05-16

## Context
`juliovela.com` has been added to Vercel and DNS records have been updated. Vercel shows the domain as valid, but public propagation may still be uneven because previous DNS records used a longer TTL.

While DNS finishes propagating, the safest next work is planning and low-risk refinement that does not require new DNS, deployment configuration, secrets, or automation.

## Current launch posture
Ready:
- Vercel production deployment exists.
- `juliovela.com` is the intended canonical domain.
- `www.juliovela.com` should redirect to `juliovela.com`.
- Production smoke tests pass on the Vercel deployment URL.
- `robots.txt` and `sitemap.xml` already point to `https://juliovela.com`.
- Vercel Web Analytics is enabled.
- Privacy and disclosure pages exist.

Waiting:
- DNS propagation for `juliovela.com` and `www.juliovela.com`.
- Final smoke tests against `https://juliovela.com`.
- Search Console verification after the canonical domain reliably resolves.

## Audit findings

### 1. Search Console readiness
The project is close to ready for Google Search Console setup.

Current strengths:
- Sitemap route exists.
- Robots route exists.
- Canonical domain is already planned as `https://juliovela.com`.
- A published article exists.
- Legal pages exist.

Remaining checks:
- Confirm `https://juliovela.com/sitemap.xml` resolves after DNS propagation.
- Confirm `https://juliovela.com/robots.txt` resolves after DNS propagation.
- Confirm sitemap contains only public canonical URLs.
- Confirm `www` redirects to apex.
- Submit sitemap only after the canonical domain is stable.

Recommendation:
- Do not start Search Console until `https://juliovela.com` loads the Vercel site consistently.

### 2. Homepage copy final pass
The homepage is visually stable enough for a focused marketing/UX copy pass.

Goal:
- Make the public positioning clearer, sharper, and more memorable.
- Keep the tone practical, premium, and non-hype.

Recommended focus areas:
- About section: clarify who Julio helps and what decisions the site helps readers make.
- Expertise section: make topic areas feel specific, not generic.
- Services / Work With Me: clarify possible collaboration without overpromising.
- Insights Preview: make the content promise concrete while avoiding fake article language.
- Contact: keep the CTA simple and direct.

Guardrails:
- No fake clients.
- No fake metrics.
- No fake testimonials.
- No exaggerated AI claims.
- No new features in this slice.

### 3. Content workflow next article
The content system is ready for a second article planning slice, but it should come after the homepage copy pass.

Recommended flow:
1. Add a topic to the topic queue.
2. Draft the article and LinkedIn post.
3. Generate or plan the article-specific OG image.
4. Review copy as a professional editor.
5. Review SEO metadata and slug.
6. Review rendered page in local and Vercel Preview.
7. Mark approved only after Julio approval.
8. Publish only after explicit approval.

Guardrails:
- No automatic publishing.
- No article should move from draft to published without rendered preview approval.
- Every article needs SEO, editorial, visual, and approval checks.

### 4. Post-launch QA checklist
This checklist should run immediately after `juliovela.com` resolves reliably.

Required checks:
- `https://juliovela.com`
- `https://juliovela.com/blog`
- `https://juliovela.com/blog/choosing-the-right-ai-tool`
- `https://juliovela.com/privacy`
- `https://juliovela.com/disclosures`
- `https://juliovela.com/robots.txt`
- `https://juliovela.com/sitemap.xml`
- `https://juliovela.com/opengraph-image`
- `https://juliovela.com/blog/choosing-the-right-ai-tool/opengraph-image`
- `https://www.juliovela.com`

Expected behavior:
- Apex domain loads the site.
- `www` redirects to apex.
- Sitemap uses apex canonical URLs.
- Robots points to apex sitemap.
- Article OG image renders.
- Default OG image renders.
- No draft preview is publicly exposed.
- Vercel Web Analytics receives production traffic.

## Recommended sequence

### Slice A: DNS final verification
When DNS appears stable:
- Run browser smoke tests against `https://juliovela.com`.
- Verify `www` redirect.
- Verify robots and sitemap.
- Document result.

Exit criteria:
- Browser smoke tests pass on `https://juliovela.com`.
- `www` redirect is confirmed.

### Slice B: Search Console readiness
After Slice A:
- Document Search Console setup steps.
- Add a Search Console verification checklist.
- Submit sitemap only after domain verification.

Exit criteria:
- Search Console setup is documented.
- Sitemap submission is ready or completed manually.

### Slice C: Homepage copy final pass
Can begin while DNS propagates:
- Audit current public copy.
- Propose revised copy.
- Implement only copy changes after review.
- Validate with full project checks.

Exit criteria:
- Copy is clearer and more conversion-ready.
- No new product claims or fake proof points were introduced.

### Slice D: Second article workflow
After homepage copy:
- Select next article topic.
- Create draft and LinkedIn reuse angle.
- Create OG/image plan.
- Review in rendered preview before approval.

Exit criteria:
- A complete draft package exists.
- Nothing is published automatically.

## Recommended immediate next step
Start with Slice C: Homepage copy final pass.

Reason:
- It does not depend on DNS propagation.
- It improves the first impression before traffic starts going to `juliovela.com`.
- It is low-risk and easy to validate.

After DNS finishes, pause copy work briefly to run Slice A domain verification.
