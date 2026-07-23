# CapacityPlus — Project Context

## Project identity

- Project: CapacityPlus / Capacity+
- Local path: `/opt/data/projects/capacityplus`
- GitHub: `https://github.com/Rexdomine/capacityplus`
- Repository visibility: private
- Default branch: `main`
- Product: an evidence-led healthcare company coordinating integrated GP–community-pharmacy working to increase primary-care capacity. Hypertension case-finding and ABPM are the current proven backbone, but the operating model is intended to extend to further integrated services.

## Source and stack

- Source archive received from Rex: `capacityplusapp-main.zip`
- Framework: Next.js 16 App Router
- Language: TypeScript / React 19
- Styling: Tailwind CSS 4
- Package manager: pnpm with committed lockfile
- UI/animation dependencies include Radix UI, Lucide, Tabler Icons, Framer Motion, AOS and Lottie.

## Canonical client direction — 26 June 2026 brief

- Source: `Capacity+ — Website Rebuild Brief`, supplied by Rex on 2026-07-23; document dated 2026-06-26 and authored by Os for Joy.
- This is a focused refactor of the existing Next.js site, not a ground-up rebuild. Reuse sound components and structure.
- One proposition: Capacity+ delivers integrated GP–pharmacy working that increases primary-care capacity.
- Hypertension case-finding and ABPM are the current proven backbone, but the company must not be framed as hypertension-only.
- Primary audiences: GP practices, community pharmacies and NHS commissioners.
- Single conversion: **Book a call**. Avoid competing asks, newsletter capture and diluted CTA language.
- Brand tone: clean, clinical, evidence-led, sentence case and no hype. Keep the navy/green/teal palette.
- Retain: “Transparent by design. Every referral. Every outcome. Fully trackable.” and the dual GP-practice/pharmacy value structure.
- Remove permanently: Life & Leadership Coaching, AI-Powered Social Media Visibility, generic SaaS filler, inflated/unquantified claims, prohibited overclaims and the loading banner.
- Hide until real/approved: founder video and FAQ. No placeholders or blank questions may ship.
- Phase 1 routes/content: Home, How it works, For GP Practices, Contact/booking, Privacy, Cookie Policy and Terms.
- Phase 2: For Pharmacies, For Commissioners, Evidence & About, approved FAQ, founder video and optional Hypertension/ABPM page.
- Phase 1 definition of done: one proposition; real qualified evidence; one conversion type; real legal pages; no placeholders; clean metadata; mobile-first and WCAG 2.1 AA passing.

### Locked pilot evidence

Always label these as **single-site St Giles pilot results, approximately 8,000 patients, year one**. Never aggregate, round up or imply multi-site evidence:

- 150+ ABPMs delivered.
- Approximately 75 GP clinical hours released.
- Approximately £8,000 NHS revenue generated for the partner pharmacy.
- Approximately £1,700 appliance-prescription savings — Commissioners page only.

### Clinical wording boundaries

- Hypertension: Capacity+ coordinates the pathway; the community pharmacy delivers clinical activity under NHS service specifications; diagnosis, prescribing, oversight and liability remain with the practice.
- Appliance review: Capacity+ delivers reviews in general practice through registered pharmacy professionals within host-practice governance.
- Pharmacy technicians work to protocol; any prescription change requires pharmacist/prescriber sign-off. Never imply independent deprescribing.
- Never imply Capacity+ itself diagnoses or prescribes. Keep professional registration and clinical responsibility explicit.
- Keep off the public site: international/Manchester/multi-site plans, white-label/platform/AI roadmaps, pricing, contraception referrals, supplier/DAC names or conflict allegations.
- Frame appliance value structurally: appliances are not routinely reviewed like medicines, so waste can accumulate; Capacity+ supplies an independent review layer.

### Required client inputs before final implementation

- Final Home, How it works and For GP Practices copy from Os.
- Canonical Capacity+ email and company-only social links.
- Confirmed booking URL, secure form processor/inbox and privacy-retention details.
- Approved legal entity/controller details, ICO details and real Privacy/Cookie/Terms copy.
- Cookie inventory and privacy-respecting analytics decision.
- Approved evidence citations and clinical/legal sign-off for QOF/IIF, NICE, Core20PLUS5, liability and governance claims.
- Approved FAQ answers, founder video and Phase 2 copy.
- Decision on the existing Speaking page and redirect policy for retired routes.
- Production domain/canonical choice (`capacityx.co.uk` versus `www`).

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

1. Preserve the current live baseline until Rex explicitly authorizes the client-brief refactor.
2. Obtain the missing client inputs listed above, especially final Phase 1 copy, legal/controller details, canonical identity, booking/form destination and evidence/clinical approvals.
3. Plan Phase 1 as a focused refactor: remove retired services and unsupported claims; build Home, How it works and For GP Practices; refactor Contact; ship real legal pages; clean metadata and conversion paths.
4. Treat WCAG 2.1 AA, mobile-first responsiveness, essential-only cookie posture, privacy-safe analytics and functional no-patient-data form handling as release gates—not polish.
5. Keep Phase 2 content unlinked/unindexed until approved; do not ship placeholders.
6. Keep every update in a focused branch and PR; do not merge without Rex's approval.
7. For every preview or production deployment, re-verify the dedicated CapacityPlus token, team and project boundary before running Vercel operations.

## Handoff log

- **2026-07-23 — Client brief analysis:** Extracted and visually verified all five pages of the 26 June client brief, mapped it against the current source/live baseline, and recorded the canonical business proposition, brand tone, locked evidence, clinical wording boundaries, phased scope, release gates and missing client inputs. No website source or deployment was changed.
- **2026-07-23 — Vercel baseline deployment:** Created the separate `capacityplus` project under the Capacity team using the dedicated CapacityPlus credential, deployed the exact committed Git baseline from a clean archive, verified production `READY`, checked all expected routes, and recorded the permanent credential/account separation rule without storing the token.
