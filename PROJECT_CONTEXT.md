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
- **Team content received 2026-07-24:** approved profile copy and supplied square headshots for Data Protection Officer Radha Muthusamy and IT Delivery Partner Ben Paddick, plus replacement founder bio for Onosenadia (Os) Joseph-Ebare. The existing repository founder image is available, but its informal selfie style does not visually match the two supplied professional headshots; confirm reuse or request a new founder headshot before final publication if consistent presentation is required.
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
- The original imported source carried 56 Biome errors and 5 warnings; the merged Phase 1 refactor has cleared that baseline, and the current Biome check passes.
- Source is committed and pushed to the private GitHub repository.
- The Phase 1 client-brief refactor is merged into `main`; production still serves the prior baseline until a separately approved launch.
- A focused About/Team update is implemented on `feat/capacityplus-team`: new `/about` route, header/footer/sitemap integration, three client-approved profiles, optimized 640×640 WebP portraits, evidence-safe pilot wording and explicit clinical-governance boundaries. The canonical local release gate passes: production audit has no high-severity findings (one low advisory), 16 source tests pass, content validation and Biome pass, Next.js produces 14 static pages, built-content validation passes, and 40 Playwright checks pass across 390×844, 768×1024, 1366×768 and 1440×900.
- The Phase 1 homepage hero now uses a publication-reviewed conceptual coordinated-care image showing equal primary-care/pharmacy collaboration around a blood-pressure pathway. The optimized 1200×900 WebP is approximately 97 KB, has truthful conceptual alt text, and replaced the malformed text-heavy illustration. Exact viewport QA passed at 390×844, 768×1024, 1366×768 and 1440×900.
- Production baseline deployed on Vercel on 2026-07-23.
- Stable production URL: `https://capacityplus.vercel.app`
- The Vercel API reports the production deployment as `READY`.
- Capacity+ logo brand-story and usage guidelines v1.0 are packaged outside the repository at `/opt/data/deliverables/capacityplus-brand-guidelines-2026-07-23/`. The delivery set includes the PDF, logo assets, contact sheet and ZIP package.
- A real Gmail draft is saved in `rextechng@gmail.com` for `j.jebare@gmail.com`, subject **Capacity+ logo brand guidelines and outstanding website inputs**. It contains the guidelines PDF attachment and the outstanding client-input request. It remains unsent and requires Rex's review/approval before sending.

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
- `POST /api/contact` provides the contact form's server-side Brevo delivery path and requires the server-only `BREVO_API_KEY`; missing configuration fails closed with a generic submission failure.
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

- **2026-08-20 — Brevo immutable-retry repair candidate (NightWing re-review pending):** Repaired the two PR #6 blockers on `feat/brevo-contact-form` without changing provider/server behavior. The first valid client attempt now freezes one immutable payload, submission UUID and start time; pending and uncertain-failure states visibly preserve and disable those details, retries use the same snapshot under the label “Try same enquiry again,” and only confirmed complete success clears/unlocks/reset state. All uncertain failures use conservative copy acknowledging Capacity+ may already have received the enquiry. Semantic RED proved the old false copy and an editable 503 retry that changed `name` while retaining the same ID/time. GREEN passes 47/47 source tests, 8/8 intercepted contact Playwright checks across four viewports, changed-file Biome, production TypeScript/build and `git diff --check`. No credential/provider call, commit, push, deployment, PR action or email occurred.
- **2026-08-20 — Brevo semantic-repair candidate (Groot review pending):** Repaired the contact boundary on `feat/brevo-contact-form` with a mount/reset-owned completion timestamp and a 3-second minimum, a deterministic bounded in-memory limiter (5 validated submissions per platform-normalized `x-real-ip` per 10 minutes; maximum 1,000 keys with expiry pruning), normalized single-value forwarded host/protocol origin handling, strict exact-key/control-character validation, server-injected UTC receipt metadata, canonical site email colours and hidden preheaders, and visitor acknowledgements that do not repeat free-text enquiries. The limiter is deliberately per serverless instance and is not a distributed/global quota. Stable UUID retries, per-operation idempotency keys, pending duplicate-click protection, generic no-store responses and provider-body privacy remain intact. TDD RED was observed with 6 requirement-specific failures; focused GREEN passes 13/13 and changed-file Biome passes. No secret was read, no provider was called, and no commit, push, deployment or email occurred. This is a local candidate only: Groot must still run the full canonical gate and independent semantic review.
- **2026-08-20 — Brevo contact-form implementation candidate:** On isolated branch `feat/brevo-contact-form`, replaced the inert contact adapter with a typed same-origin `/api/contact` flow and added a server-only native-fetch Brevo integration. The endpoint applies same-origin/content-type/body-size checks, strict field/UUID validation, honeypot rejection, generic errors, no-store responses, fail-closed configuration, 10-second provider timeouts, escaped branded HTML/plain templates, and stable per-operation idempotency keys for safe partial-failure retries. The browser retains one submission UUID and field values through failures and resets only after both provider operations confirm. Strict RED was observed before production changes (`route` module and `fetchContactSubmitter` absent); focused GREEN passed 10/10. Candidate verification passed 42 source tests, 24-file source content validation, changed-file Biome, Next TypeScript/build with 17 routes including dynamic `/api/contact`, 13-file built-content validation, and 8/8 intercepted contact Playwright checks across four viewports. Standalone `tsc --noEmit` remains blocked by the pre-existing ES2017 target versus ES2018 named-regex use in `tests/routes.test.ts:126`; Next's production TypeScript stage passed. No Brevo call, secret read, email, commit, push, merge or deployment occurred. Next action: independent review and Groot canonical verification before any separately approved configuration/deployment.
- **2026-07-28 — Complete-cross website logo candidate:** Replaced the shared header/footer asset `public/images/capacity-logo-web.png` with the client-approved complete-cross refinement, preserving the Capacity wordmark, blue/green palette, faceted treatment, original 784×400 canvas and transparent bounds. Added an exact-asset SHA-256 regression contract after observing the old three-arm asset fail the test. Canonical local release gate passes: production audit has one low-severity advisory and no high-severity blocker; 17 source tests, 19-file content validation, Biome, Next.js production build, 11-file built validation and 40 Playwright checks across mobile/tablet/laptop/desktop all pass. Browser inspection confirms the four-arm cross, wordmark, navigation alignment and footer rendering are unclipped. Work is isolated on `fix/capacityplus-complete-cross`; no production deployment, merge, email or branch deletion occurred.
- **2026-07-24 — Capacity+ Team implementation candidate:** Read the forwarded Gmail message `Fwd: Capacity+ Team` in the verified non-CounterFix account `rextechng@gmail.com`; preserved the supplied inputs outside Git under `/opt/data/private/capacityplus/client-inputs/2026-07-24-capacity-team/`; and implemented a new evidence-safe `/about` experience with Onosenadia (Os) Joseph-Ebare, Radha Muthusamy and Ben Paddick. Added responsive team cards, optimized 640×640 metadata-free WebP portraits, About navigation/footer/sitemap/canonical coverage, and removed the retired redirect. Strengthened appliance-review wording to preserve host-practice governance, protocol working and pharmacist/prescriber sign-off. Canonical local gate passes with 16 source tests, content validation, Biome, production build/built validation and 40 Playwright checks across four viewports. No email was sent, no PR was merged, and production was not changed.
- **2026-07-23 — Paused after logo-guidelines delivery preparation:** Completed the Capacity+ logo brand story and practical usage-guidelines package, including the client PDF, export assets, contact sheet and ZIP bundle under `/opt/data/deliverables/capacityplus-brand-guidelines-2026-07-23/`. Saved and read-back verified an unsent Gmail draft from Rex's account to `j.jebare@gmail.com`, with the PDF attached and a request for outstanding website/legal inputs. No email was sent, no PR was merged, and no production deployment was performed. Resume point: Rex reviews the Gmail draft and attachment; send only with explicit approval, then await client feedback/inputs before further website or brand changes.
- **2026-07-23 — Homepage hero brand-story refresh:** Replaced the malformed generic pathway illustration with a publication-reviewed conceptual image of equal GP–community-pharmacy coordination around a blood-pressure pathway. Added a binary media contract, optimized the asset to a 1200×900 approximately 97 KB WebP, and verified content, Biome, production build and 32 Playwright checks across mobile/tablet/laptop/desktop. No production deployment was performed.
- **2026-07-23 — Client brief analysis:** Extracted and visually verified all five pages of the 26 June client brief, mapped it against the current source/live baseline, and recorded the canonical business proposition, brand tone, locked evidence, clinical wording boundaries, phased scope, release gates and missing client inputs. No website source or deployment was changed.
- **2026-07-23 — Vercel baseline deployment:** Created the separate `capacityplus` project under the Capacity team using the dedicated CapacityPlus credential, deployed the exact committed Git baseline from a clean archive, verified production `READY`, checked all expected routes, and recorded the permanent credential/account separation rule without storing the token.
