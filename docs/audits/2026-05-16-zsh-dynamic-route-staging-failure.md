# zsh Dynamic Route Staging Failure

## Summary
During the article-specific OG image slice, the first staging command failed because `zsh` interpreted the Next.js dynamic route folder name `[slug]` as a glob pattern.

## Failure observed
Command pattern:

```bash
git add src/app/blog/[slug]/page.tsx
```

Error:

```text
zsh:1: no matches found: src/app/blog/[slug]/page.tsx
```

## Cause
In `zsh`, square brackets are glob syntax. Next.js App Router dynamic segment folders also use square brackets, so paths like `src/app/blog/[slug]/page.tsx` must be quoted or escaped in shell commands.

## Resolution used
The command was rerun with the dynamic route paths quoted:

```bash
git add 'src/app/blog/[slug]/page.tsx' 'src/app/blog/[slug]/opengraph-image.tsx'
```

The corrected staging command succeeded, validation stayed green, and the article-specific OG image commit was pushed to `main`.

## Prevention
- Quote any path containing Next.js dynamic route segments such as `[slug]`, `[id]`, or `[[...catchAll]]`.
- Prefer explicit quoted file paths in commit instructions.
- If this error appears again, rerun only the failed command with quoted paths; do not change project files unless the underlying file path is actually wrong.
