# Review 4 — PASS

Reviewed independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `4727ef2c384b127fb36e4f2ff45c385759e90d9f` (`4727ef2`).
- Verdict: **PASS**.
- Findings: **0**.
- Untested public claims: **0**.

The external work-order path `factory-evidence/last-light-expedition-verify-7/qa-report.md` is not present in this disposable worker. The complete repository report `.factory/verification-7.md` was read in full. The implementation-to-baseline diff changes only prior QA reports and handoff documentation; a fresh clean build's JavaScript and CSS SHA-256 values exactly match the live assets.

## Job, audience, and first action

Fresh independent desktop (1280 × 720) and phone (393 × 727 Pixel 5) clients show active Camp 1 at `/` before scrolling.

- Job: **Choose a route through a six-camp expedition**.
- Audience: browser players who want one complete authored run with irreversible resource choices and four tested endings.
- First action: **Try it with sample data**, with **Opens a fixed run. Saves nothing.** visible beside it.

Both contexts had three playable route choices, no horizontal overflow, and the sample action plus first complete choice in the viewport. The first screen is active play, not a menu.

## Complete runs and demo sandbox

Two fresh browser clients entered the sample from the root in one click. The desktop run made the authored six-choice route to **A shared dawn** (warmth 2, supplies 2, trust 19, relic used). The phone run made a distinct six-choice route to **The light goes out** (warmth -4, supplies 6, trust 3, relic kept).

Both end screens removed choice controls and retained the persistent **Demo — sample data, nothing is saved** label, **Reset demo**, and **Start for real**. Reset restored Camp 1 with warmth, supplies, and trust at 7. Start for real removed the sample label and opened fresh real play. Both profiles measured 60.0 FPS and had no page errors, console errors, cross-origin requests, or non-GET requests.

Evidence: `/work/.evidence/review-4/live/fresh-browser-review.json`, `desktop-first-screen.png`, `phone-first-screen.png`, `desktop-end-screen.png`, and `phone-end-screen.png`.

## Declared public claims

The registry has 16 unique IDs. Source inspection found exactly one `@claim:<id>` test for every ID across `tests/product.spec.ts` and `tests/game.test.ts`, with no undeclared tag. Every command in `.factory/claims.json` passed separately from the clean checkout; the browser commands ran in both desktop and phone projects, and `paid-content` passed as its declared packaged unit test.

All 16 passed: `complete-run`, `four-endings`, `restart-reset`, `demo-isolation`, `offline-reload`, `local-privacy`, `real-play-privacy`, `opt-in-run-storage`, `settings-persist`, `one-time-offer`, `deterministic-outcome`, `input-controls`, `accessible-preferences`, `finite-fiction`, `paid-content`, and `frame-rate`.

The full production suite also passed 50/50, including all browser claim outcomes, privacy request checks, offline reload, input modes, invalid-state recovery, settings/save/erase recovery, route titles, designed 404, target sizing, system reduced motion, and accessibility checks.

Evidence: `/work/.evidence/review-4/claims/local-results.tsv`, `registry-audit.json`, `claims/*.local.log`, and `live/npm-test-e2e.log`.

## Quality, accessibility, privacy, and routes

- Clean `npm ci` passed with 60 packages and zero audit vulnerabilities.
- Local `npm test` passed: 5 unit tests and 50 browser tests.
- `npm run build` passed and produced `dist/`: JavaScript 27.21 KB raw / 9.68 KB gzip; CSS 15.62 KB raw / 4.44 KB gzip.
- `npm run test:a11y` passed in desktop and phone profiles with no serious or critical Axe findings across the game, demo, legal, purchase-status, and designed-404 states.
- The installed authoritative helper `/opt/fleet/lib/verify-url.sh` was inspected and passed with the live URL and `/work/.evidence/review-4/helper`; the repository's documented URL verifier also passed. Both report a title, `lang=en`, one h1, a main landmark, complete image alternatives, named buttons, and no console errors.
- Keyboard, pointer, touch, Tab plus Enter/Space, and number keys are covered by passing live browser checks. Focus return, native-dialog containment, 200% text, 44 × 44 px targets, muted default sound, system and in-game reduced motion, optional save/erase, and recovery from malformed saved data passed.
- `/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests deliberately return HTTP 404; this is expected, and the page route provides designed recovery.
- Live headers provide CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions. The demo and real-play privacy outcomes pass without accounts, cookies, cross-origin traffic, or non-GET gameplay traffic.

The public offer exactly matches repository metadata and exposes public fields only: **$6 once**, not a subscription, for eight additional authored weather seeds, eight matching relic variants, and a printable route log. Sales, checkout, activation, and entitlement are honestly unavailable pending external operator QA; this review does not claim they passed.

Evidence: `/work/.evidence/review-4/local/`, `helper/`, `live/statuses.tsv`, `headers.txt`, `link-metadata-audit.json`, and `runtime-offer-audit.json`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Both new contexts opened on active Camp 1 with three choices.
2. **Verification 1 phone first-screen visibility — resolved.** Job, audience, action, resources, report, and the first route choice fit at 393 × 727 without overflow.
3. **Verification 1 incomplete claim proof — resolved.** Sixteen declared outcomes have exact tests and every declared command passed independently.
4. **Verification 1 helper location — corrected.** The authoritative installed fleet helper exists at `/opt/fleet/lib/verify-url.sh` and passed; no repository duplicate is required by the product contract.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both remain separately declared and pass in the fresh local commands and live suite.
6. **Verification 2 undersized links — resolved.** The live regression covering the affected controls passes in both profiles.
7. **Earlier unknown-route behavior — resolved.** Missing pages and assets deliberately return HTTP 404, with designed browser recovery.
8. **Review 2 saved-run race — resolved.** The exact opt-in command passes independently from the clean checkout and in the full live suite without retry.
9. **Verification 4 system reduced motion — resolved.** Fresh desktop and phone live checks keep the marker fixed under the system preference while play still advances.

The product advertises no multiplayer or runtime AI. It is static and local-first, so multiplayer, tenant isolation, SQLite restart persistence, health, and 429 checks do not apply.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
