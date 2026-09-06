# Verification 3 — PASS

Verified independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4` (`8ae84cb`)
- Documentation baseline: `f5ff38fdfe96ab2820b3a3c50c1648e31e42f424` (`f5ff38f`)
- Verdict: **PASS**
- Findings: **0**
- Untested public claims: **0**

The live JavaScript and CSS SHA-256 hashes exactly match the local build from candidate `8ae84cb`. The only difference between that candidate and `f5ff38f` is `.factory/handoff.md`; no later product image needs review.

## Job, audience, and first action

Before scrolling, fresh 1280 × 720 desktop and 393 × 727 phone contexts state the job as **“Choose a route through a six-camp expedition”**. They name browser players wanting one authored run with irreversible resource choices and four tested endings. The visible first action is **“Try it with sample data”**, with its result stated beside it. Both views contain active Camp 1, all three playable choices, and no horizontal overflow. The primary action and first choice are fully visible.

Evidence: `/work/.evidence/verification-3/live/browser-verification.json`, `desktop-first-screen.png`, and `phone-first-screen.png`.

## Game and sandbox result

Fresh independent desktop and phone browser contexts each entered the sample in one click and completed this deterministic run:

1. Share the load with Mara.
2. Follow Mara's pine route.
3. Rest in the shallow cave.
4. Use the signal lens.
5. Let Mara decide.
6. Work the hinge together.

Both reached **A shared dawn** after six choices. The captured runs measured 60.0 FPS, produced no console or page errors, and made no cross-origin requests. The persistent demo label, reset, and start-for-real controls stayed available through the end screen. The full suite also independently covers reset, invalid saved-data recovery, offline reload after first visit, settings persistence, keyboard/pointer/touch inputs, reduced motion, and dialog focus return.

Evidence: `/work/.evidence/verification-3/live/desktop-end-screen.png`, `phone-end-screen.png`, `browser-verification.json`, and `npm-test-live.log`.

## Claim verification

All 16 declared commands were run separately from the clean checkout against the HTTPS origin where applicable. The paid-content unit command also passed. Registry inspection found 16 declared IDs and exactly one `@claim:<id>` tag for each, with no failed command output. Public copy was cross-checked against the registry; no testable public promise is unlisted.

| Claim scope | Result |
| --- | --- |
| Six choices, four endings, reset, deterministic outcome | PASS |
| Demo label/isolation, offline reload, demo privacy | PASS |
| Real-play privacy, opt-in storage/erase, settings persistence | PASS |
| $6 one-time offer and paid-content counts | PASS |
| Pointer/touch/keyboard inputs, accessible preferences, finite fictional play, frame rate | PASS |

Evidence: `/work/.evidence/verification-3/claims/`.

## Quality, access, and routes

- Clean setup: `npm ci` passed with 60 packages and zero audit vulnerabilities.
- Local `npm test`: 5/5 unit and 48/48 browser tests passed. `npm run build` produced `dist/`; JS is 26.50 KB raw / 9.51 KB gzip and CSS is 15.62 KB raw / 4.44 KB gzip.
- Live `BASE_URL=https://last-light-expedition.sociobot.in npm test`: 48/48 passed, including Axe checks with no serious or critical findings on root, demo, legal, purchase-status, and designed-404 routes.
- The required installed worker helper, `/opt/fleet/lib/verify-url.sh`, was inspected and run as `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-3/helper`. It passed: HTTPS 200, title, `lang=en`, one h1, main landmark, complete image alternatives, named buttons, and zero browser errors.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 987 ms, LCP 1,362 ms, CLS 0, TBT 56 ms.
- `/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200 with their expected structure and titles. Unknown page and asset URLs deliberately return HTTP 404; the page route renders the designed recovery screen. This is expected behavior, not a defect.
- Live headers include CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions.

Evidence: `/work/.evidence/verification-3/npm-ci.log`, `npm-test.log`, `build.log`, `live/npm-test-live.log`, `helper/`, `live/lighthouse-summary.json`, `live/statuses.txt`, `live/headers.txt`, and `live/asset-sha256.txt`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens on active Camp 1 with three choices.
2. **Verification 1 phone first-screen visibility — resolved.** Job, audience, sample action, and first choice are fully visible at 393 × 727.
3. **Verification 1 incomplete claim registry and proof — resolved.** The registry has 16 exact outcome tests, including determinism, inputs, settings, finite fiction, paid content, and frame rate.
4. **Verification 1 repository-helper assertion — corrected.** The authoritative helper is installed at `/opt/fleet/lib/verify-url.sh`; it exists and passed. A duplicate repository helper is not an acceptance requirement.
5. **Verification 2 real-play privacy and opt-in-save claims — resolved.** `real-play-privacy` and `opt-in-run-storage` are separately declared and pass against the live origin.
6. **Verification 2 undersized Play, Price, and privacy-email links — resolved.** The live browser regression verifies the relevant rendered targets are at least 44 × 44 CSS pixels.

## External dependency

Public offer metadata honestly states a **$6 one-time** complete edition. Billing registration, checkout, license validation, and entitlement QA remain an operator task outside this static product verification. Sales are still shown as unavailable, so this is neither a false public claim nor a product finding.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
