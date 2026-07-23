# CapacityPlus — Project Context

## Project identity

- Project: CapacityPlus / Capacity+
- Local path: `/opt/data/projects/capacityplus`
- GitHub: `https://github.com/Rexdomine/capacityplus`
- Repository visibility: private
- Default branch: `main`
- Product: healthcare-services website focused on primary-care digital integration, life and leadership coaching, social-media visibility, and speaking.

## Source and stack

- Source archive received from Rex: `capacityplusapp-main.zip`
- Framework: Next.js 16 App Router
- Language: TypeScript / React 19
- Styling: Tailwind CSS 4
- Package manager: pnpm with committed lockfile
- UI/animation dependencies include Radix UI, Lucide, Tabler Icons, Framer Motion, AOS and Lottie.

## Current status

- Archive integrity and extraction-safety checks passed: no traversal paths, symlinks or encrypted members.
- Source was scanned for common credential/token patterns; no `.env` files or apparent committed secrets were found.
- Removed the source archive's `.DS_Store` and added a production-appropriate `.gitignore` before publication.
- Production build passes and generates the expected static routes.
- Existing Biome baseline does not pass: 56 errors and 5 warnings, largely formatting/import-order issues plus accessibility findings in the contact form. These were preserved rather than silently rewriting the supplied source during import.
- Source is committed and pushed to the private GitHub repository.
- Production baseline deployed on Vercel on 2026-07-23.
- Stable production URL: `https://capacityplus.vercel.app`
- The Vercel API reports the production deployment as `READY`.

## Vercel deployment boundary

- Authorized Vercel team: **Capacity** (`capacity3`).
- Authorized Vercel project: **capacityplus** (`prj_pXSaBUXgrSQ1dBUysc5xOi2WagAr`).
- Authorized account/team ID: `team_6XVk6HznsAdIjUfAdGH9lcUm`.
- CapacityPlus has a dedicated project-specific Vercel access token held in the CapacityPlus-only secret store outside this repository.
- Every Vercel API, CLI, deployment, environment or integration operation for CapacityPlus must use that dedicated token. Never substitute a token belonging to another project, and never use the CapacityPlus token for another project.
- Before every deployment, verify the token identity/scope, team ID, project ID and project name. Abort on any mismatch or ambiguous project result.
- Never commit, hard-code, print, log, document or place the raw token in a PR. Keep `.vercel`, `.env*` and credential artifacts out of Git.
- Git-triggered deployment is intentionally not connected at this baseline. Deployments currently use the dedicated token against the explicitly verified CapacityPlus project, preventing accidental cross-project automation.

## Important deployment findings

- `src/app/layout.tsx` references `/images/og-image.jpg`, but that asset was not present in the supplied archive.
- Google site verification metadata still contains a placeholder value.
- Twitter/X creator metadata contains a placeholder handle.
- The contact form currently appears presentational and requires functional review before claiming submissions work.
- External Lottie animations are loaded from `lottie.host`; deployment QA should verify availability and graceful failure.
- Package installation under the hardened local pnpm policy reported ignored build scripts for `msw` and `sharp`; direct Next.js production build nevertheless completed successfully.
- The live baseline does not currently return explicit CSP, `X-Content-Type-Options`, frame, referrer or permissions-policy headers. Add these through a reviewed source change before treating the site as launch-hardened.
- The homepage title is the generic `Home`; other pages use the broader `Capacity+ | Healthcare Services` title.
- The Founder Overview still contains a visible video placeholder.
- Automated headless QA eventually triggered Vercel's Security Checkpoint after repeated requests. Ordinary HTTP checks and the first browser runs returned 200; treat checkpoint responses as bot/WAF behaviour rather than an application route failure.

## Workflow rules

- Do not push directly to `main` for future feature or update work.
- Create focused branches and open PRs for review.
- Run build, lint/type checks and NightWing QA before merge or deployment handoff.
- Do not commit deployment credentials or environment secrets.
- Enforce the CapacityPlus-only Vercel credential boundary above for every deployment and Vercel configuration operation.
- Preserve the current imported baseline unless Rex explicitly approves fixes or redesign work.
- Do not merge PRs or delete branches without Rex's explicit approval.

## Verification

- Local build: `./node_modules/.bin/next build` — PASS
- Lint baseline: `./node_modules/.bin/biome check .` — FAIL, 56 errors and 5 warnings from supplied source
- Expected routes include `/`, `/about`, `/contact`, `/speaking`, three service pages, `/robots.txt` and `/sitemap.xml`.
- Vercel production build: PASS (Next.js 16.1.6; 12 static pages generated).
- Vercel project/account read-back: PASS for `capacity3/capacityplus` and the IDs recorded above.
- Production deployment state/target read-back: `READY` / `production`.
- Live route HTTP checks: all expected pages, `robots.txt` and `sitemap.xml` returned 200.
- Browser QA: homepage loaded without console/page errors; all three homepage images decoded; 390×844 mobile layout had no horizontal overflow and all 43 headings rendered after scroll-triggered animations.
- Additional 768, 1366 and 1440 automated screenshots were blocked by Vercel's bot checkpoint after repeated QA requests, so they are not counted as passing visual evidence.

## Next likely priorities

1. Review the stable baseline at `https://capacityplus.vercel.app`.
2. Prioritize launch hardening: security headers, metadata/placeholders and functional form behaviour.
3. Run human/interactive tablet, laptop and desktop visual review if Vercel's automated checkpoint persists.
4. Keep each website update in a focused branch and PR; do not merge without Rex's approval.
5. For every preview or production deployment, re-verify the dedicated CapacityPlus token, team and project boundary before running Vercel operations.

## Handoff log

- **2026-07-23 — Vercel baseline deployment:** Created the separate `capacityplus` project under the Capacity team using the dedicated CapacityPlus credential, deployed the exact committed Git baseline from a clean archive, verified production `READY`, checked all expected routes, and recorded the permanent credential/account separation rule without storing the token.
