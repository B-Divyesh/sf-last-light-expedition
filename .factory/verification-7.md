# Verification 7 — PASS

Verified independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `35124e17f0a3728991cad62867866f8c6149682f` (`35124e1`).
- Verdict: **PASS**.
- Findings: **0**.
- Untested public claims: **0**.

Every commit after the implementation candidate and through the documentation baseline changes only `.factory` reports. The deployed JavaScript and CSS match a clean build byte-for-byte.

## First screen and complete game runs

Before scrolling, fresh independent 1280 × 720 desktop and 393 × 727 phone contexts show:

- job: **Choose a route through a six-camp expedition**;
- audience: browser players who want one complete authored run with irreversible resource choices and four tested endings;
- first action: **Try it with sample data**, followed by **Opens a fixed run. Saves nothing.**;
- active Camp 1 resources, report, and a complete first route choice.

The sample action and first choice are fully visible in both viewports. There is no horizontal overflow. Each context entered the sample in one click, kept the **Demo — sample data, nothing is saved** label visible, made six choices, and reached the win ending **A shared dawn** with warmth 2, supplies 2, trust 19, and the relic used. Both measured 60.0 FPS, with no console errors, page errors, or cross-origin requests.

A separate loss route made six rendered choices and reached **The light goes out** with no remaining choice controls. Its end screen kept the demo label, **Reset demo**, and **Start for real** visible. The four-endings claim also reached the other two authored endings. Reset restored Camp 1 and all resources to 7. Exiting discarded the sample, and a real-data sentinel remained unchanged throughout the declared isolation test.

Evidence: `/work/.evidence/verification-7/live/browser-verification.json`, `desktop-first-screen.png`, `phone-first-screen.png`, `desktop-end-screen.png`, `phone-end-screen.png`, `desktop-loss-end-screen.png`, and `loss-run.json`.

## Declared claims

The registry contains 16 unique IDs. Each has exactly one matching `@claim:<id>` test, no undeclared claim tag exists, and every declared command passed separately from the clean checkout. Every browser claim also passed separately against production; `paid-content` is a packaged-content unit check.

| Claim | Local | Live or packaged |
| --- | --- | --- |
| `complete-run` | PASS | PASS |
| `four-endings` | PASS | PASS |
| `restart-reset` | PASS | PASS |
| `demo-isolation` | PASS | PASS |
| `offline-reload` | PASS | PASS |
| `local-privacy` | PASS | PASS |
| `real-play-privacy` | PASS | PASS |
| `opt-in-run-storage` | PASS | PASS |
| `settings-persist` | PASS | PASS |
| `one-time-offer` | PASS | PASS |
| `deterministic-outcome` | PASS | PASS |
| `input-controls` | PASS | PASS |
| `accessible-preferences` | PASS | PASS |
| `finite-fiction` | PASS | PASS |
| `paid-content` | PASS | Packaged PASS |
| `frame-rate` | PASS | PASS |

Landing, game, legal, purchase-status, metadata, and README copy were cross-checked with the registry. No testable public promise is unlisted. Evidence: `/work/.evidence/verification-7/claims/`.

## Quality, accessibility, and recovery

- Clean `npm ci`: 60 packages and zero audit vulnerabilities.
- Local `npm test`: 5/5 unit tests and 50/50 browser tests passed.
- Production browser suite: 50/50 tests passed across desktop Chromium and Pixel 5 projects.
- Live Axe integration: both projects passed root, demo, privacy, terms, purchase status, and designed-404 checks with no serious or critical findings.
- The installed `/opt/fleet/lib/verify-url.sh` was inspected and run with the product URL and this work-order evidence directory. It passed HTTP, title, language, landmarks, image alternatives, button names, and console checks. The repository's documented URL verifier also passed.
- Keyboard, pointer, touch, Tab with Enter or Space, and number keys work. The skip link has a visible 3 px amber focus outline. The native modal keeps background controls inert, Escape closes it, and focus returns to Settings.
- First-screen interactive targets are at least 44 × 44 CSS pixels in both profiles. At 200% text size, the h1 and all three choices remain present, and route selection still advances to Camp 2.
- Invalid saved data recovers to fresh Camp 1. Cancelling Restart preserves Camp 2; confirming it restores Camp 1 and resources of 7. The previously unreliable opt-in save/resume/erase path passed 20/20 repeated production project runs with no retry.
- System reduced motion held the map marker at one rendered position in six samples on desktop and phone while play remained usable. A no-preference control moved normally. Sound starts muted.
- Offline reload and continued sample play passed in an isolated context after the first visit.

Evidence: `/work/.evidence/verification-7/local/`, `live/npm-test-e2e.log`, `live/axe.log`, `live/focus-detail.json`, `live/dialog-focus.json`, `live/keyboard-focus-recovery.json`, `live/text-resize-200.json`, `live/opt-in-storage-stress.log`, and `helper/`.

## Routes, privacy, offer, and performance

`/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests deliberately return HTTP 404. The unknown page has its own title, one h1, one main landmark, and a route back; this is expected behavior. All product-owned links resolve, while the email and external factory link are explicitly identified.

Live headers include CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions. Demo and real play use no account, set no cookies, make no cross-origin or non-GET requests, and keep optional settings and run state in local browser storage only.

The public offer is **$6 once**, not a subscription. Live metadata exactly matches both repository copies and contains only public fields. It promises eight additional authored weather seeds, eight matching relic variants, and a printable six-camp route log; the packaged-content test verifies those counts and print styling. Sales, checkout, activation, and entitlement remain honestly unavailable pending separate operator QA.

`npm run build` produced `dist/`. Main JavaScript is 27.21 KB raw / 9.68 KB gzip and CSS is 15.62 KB raw / 4.44 KB gzip. Fresh mobile Lighthouse scores are 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO; FCP is 901 ms, LCP 1,276 ms, TBT 19 ms, CLS 0, and total transfer 127,758 bytes. Both independent play profiles measured 60.0 FPS.

The product advertises no multiplayer or runtime AI. It is static and local-first, so backend tenant isolation, SQLite restart persistence, health, and 429 checks do not apply.

Evidence: `/work/.evidence/verification-7/live/statuses.txt`, `headers.txt`, `link-route-audit.json`, `billing-offer-summary.json`, `asset-sha256.txt`, and `/work/.evidence/verification-7/lighthouse/`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens at active Camp 1 with three choices.
2. **Verification 1 phone first-screen visibility — resolved.** Job, audience, sample action, resources, report, and first choice fit at 393 × 727.
3. **Verification 1 incomplete claim proof — resolved.** Sixteen unique claims have exact tests, and every command passes locally and against production where applicable.
4. **Verification 1 helper location — corrected.** The authoritative fleet helper exists at `/opt/fleet/lib/verify-url.sh` and passes. No duplicate factory helper is required in the repository.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both have separate passing outcome claims.
6. **Verification 2 undersized links — resolved.** Fresh desktop and phone measurements found no first-screen target below 44 × 44 CSS pixels; the targeted Play, Price, and privacy-email regression also passes.
7. **Earlier unknown-route behavior — resolved.** Unknown pages and assets return deliberate 404 responses, and page navigation gets designed recovery.
8. **Review 2 saved-run race — resolved.** The claim passes in the complete suites, separate claim sweeps, and 20/20 repeated production project runs.
9. **Verification 4 system reduced motion — resolved.** Fresh desktop and phone samples remain fixed under the system preference, and live preference-change tests pass.

Review 1, Verification 3, Verification 5, and Review 3 reported no findings; their passing areas were independently rechecked here.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
