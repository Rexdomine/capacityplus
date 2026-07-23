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
- Source is committed and pushed to private GitHub repository on `main`.
- Deployment has not started. Rex will authorize the deployment phase separately.

## Important pre-deployment findings

- `src/app/layout.tsx` references `/images/og-image.jpg`, but that asset was not present in the supplied archive.
- Google site verification metadata still contains a placeholder value.
- Twitter/X creator metadata contains a placeholder handle.
- The contact form currently appears presentational and requires functional review before claiming submissions work.
- External Lottie animations are loaded from `lottie.host`; deployment QA should verify availability and graceful failure.
- Package installation under the hardened local pnpm policy reported ignored build scripts for `msw` and `sharp`; direct Next.js production build nevertheless completed successfully.

## Workflow rules

- Do not push directly to `main` for future feature or update work.
- Create focused branches and open PRs for review.
- Run build, lint/type checks and NightWing QA before merge or deployment handoff.
- Do not commit deployment credentials or environment secrets.
- Preserve the current imported baseline unless Rex explicitly approves fixes or redesign work.

## Verification

- Build: `./node_modules/.bin/next build` — PASS
- Lint baseline: `./node_modules/.bin/biome check .` — FAIL, 56 errors and 5 warnings from supplied source
- Expected routes include `/`, `/about`, `/contact`, `/speaking`, three service pages, `/robots.txt` and `/sitemap.xml`.

## Next likely step

After Rex confirms the hosting target and authorizes deployment:

1. Inspect deployment requirements and account/project boundaries.
2. Decide whether to deploy the imported baseline first or resolve blockers before launch.
3. Configure the selected host without committing secrets.
4. Deploy to a protected preview first.
5. Run desktop/mobile functional and visual QA.
6. Keep website updates in separate focused branches after baseline deployment.
