# Review 1 — PASS

Reviewed 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4` (`8ae84cb`)
- Documentation/report baseline: `fad7a1c422c8f8440fffbdf11b910a3132dae0ca` (`fad7a1c`)
- Verdict: **PASS**
- Findings: **0**
- Untested public claims: **0**

The live JavaScript and CSS SHA-256 values match the local build from `8ae84cb`.  The only changes from that implementation through the documentation baseline are handoff and verification reports, so no later product image requires review.

## First screen and game run

Fresh independent 1280 x 720 desktop and 393 x 727 phone contexts both show active Camp 1 before scrolling.  The first screen states the job, **“Choose a route through a six-camp expedition,”** identifies browser players seeking one authored run with irreversible resource choices and four endings, and exposes **“Try it with sample data”** with its result.  Each view has three active route choices, no horizontal overflow, and the sample action plus first choice inside the viewport.

Each fresh client entered the sample in one click and completed the fixed six-choice route to **A shared dawn**.  The persistent **“Demo — sample data, nothing is saved”** label, **Reset demo**, and **Start for real** remained available at the end screen.  The fresh-run checks produced no console or page errors, only same-origin GET requests, and no cross-origin requests.

Evidence: `/work/.evidence/review-1/live/fresh-browser-check.json`, `desktop-first-screen.png`, `phone-first-screen.png`, `desktop-end-screen.png`, and `phone-end-screen.png`.

## Claims, quality, and access

All 16 entries in `.factory/claims.json` were run separately against the HTTPS production origin.  Every command passed.  Registry inspection found 16 declared IDs, exactly one matching `@claim:` test for each ID, and no undeclared test tag.  Public copy and README promises were cross-checked with the registry; there are no unlisted testable promises.

This covers six irreversible choices and all four endings; demo isolation and offline reload; real-play privacy and opt-in, erasable local storage; settings persistence; the honest $6 one-time, sales-not-open offer; deterministic outcomes; pointer, touch, keyboard, and number-key controls; muted/reduced-motion preferences; finite fictional non-combat play; paid-content counts; and the measured phone-profile frame-rate claim.

- Clean `npm ci` passed: 60 packages, zero audit vulnerabilities.
- Local `npm test` passed: 5/5 unit tests and 48/48 browser tests.
- `npm run build` passed and produced `dist/`; JavaScript is 26.50 kB raw / 9.51 kB gzip and CSS is 15.62 kB raw / 4.44 kB gzip.
- `BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e` passed: 48/48 browser tests, including Axe checks with no serious or critical issues on the game, demo, legal, purchase-status, and designed-404 routes.
- The installed worker helper was inspected and run as `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/review-1/helper`.  It passed HTTPS 200, title, `lang=en`, one h1, main landmark, image alternatives, named buttons, and zero browser errors.
- Fresh Lighthouse mobile scored 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO (FCP 0.9 s, LCP 1.3 s, CLS 0, TBT 40 ms).
- A fresh phone touch-target audit checked 63 visible controls over root, demo, legal, purchase-status, and sample-ending states; all were at least 44 x 44 CSS pixels.
- Same-origin product links return 200 with route-specific titles and one h1.  Unknown page and asset URLs deliberately return HTTP 404; the page URL renders the designed recovery screen.  This is expected, not a defect.
- Live headers retain CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions.

Evidence: `/work/.evidence/review-1/npm-ci.log`, `npm-test-local.log`, `build.log`, `claims/`, `claim-registry-scan.txt`, `helper.log`, `helper/`, `live/npm-test-e2e-live.log`, `live/lighthouse-summary.json`, `live/touch-target-audit.json`, `live/internal-link-check.json`, and `live/asset-sha256.txt`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Both fresh contexts expose Camp 1 and three playable choices at `/` without an entry gate.
2. **Verification 1 phone first-screen visibility — resolved.** The job, audience, sample action, resources, and first route choice are in the 393 x 727 phone viewport without overflow.
3. **Verification 1 incomplete claim proof — resolved.** The registry has 16 declared, exact-outcome claims and every independently run command passed.
4. **Verification 1 helper assertion — corrected.** The authoritative worker helper is installed at `/opt/fleet/lib/verify-url.sh`; it exists and passed.  A product-repository duplicate is not an acceptance requirement.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both have separate declared claims and passing live outcome tests.
6. **Verification 2 undersized Play, Price, and privacy-email targets — resolved.** The comprehensive fresh phone control audit found no target below 44 x 44 CSS pixels.

No multiplayer mode or runtime AI feature is advertised, so independent-client shared-state and model-gateway checks do not apply.  The product remains static and local-first; backend tenant, persistence, health, and rate-limit checks do not apply.  The public metadata correctly offers the complete edition for **$6 once**, not a subscription, while sales, checkout, activation, and entitlement are honestly unavailable pending operator billing work.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
