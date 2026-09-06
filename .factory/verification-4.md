# Verification 4 — FAIL

Verified independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `068fcc6eab551a71b341782abad1fbfae705704a` (`068fcc6`)
- Documentation baseline reviewed: `d928fc19b85452b7625f51e1bafae677dd335ff8` (`d928fc1`)
- Verdict: **FAIL**
- Findings: **1 minor**
- Untested public claims: **0**

The deployed JavaScript and CSS hashes exactly match a clean local build of the candidate. The only repository change from the implementation candidate to the documentation baseline is `.factory/handoff.md`, so later report-only work does not imply a different product image.

## Finding

### 1. Minor — the operating-system reduced-motion preference does not stop the moving map marker

A fresh Chromium context created with `reducedMotion: "reduce"` reports that `(prefers-reduced-motion: reduce)` matches. Despite that preference, six samples taken 120 ms apart all contained different inline transforms on `.light-marker`, moving from `translateX(0.466404px)` to `translateX(2.95684px)`. A no-preference control context moved in the same way.

The CSS media query shortens CSS animation and transition durations, but the `requestAnimationFrame` loop continues to write the marker transform unless the separate in-game **Reduce motion** checkbox is enabled. The checkbox works and its declared claim passes. The defect is that the platform preference does not automatically stop the continuing atmospheric drift, contrary to the accessibility baseline and the product motion policy.

Required repair: gate the JavaScript frame update on both the saved setting and `matchMedia("(prefers-reduced-motion: reduce)").matches`, respond to preference changes, and add a browser regression that asserts the marker remains fixed under the operating-system preference.

Evidence: `/work/.evidence/verification-4/live/system-reduced-motion.json` and `keyboard-recovery-resize.json`.

## First screen, game run, and demo sandbox

Fresh independent 1280 × 720 desktop and 393 × 727 phone contexts show active Camp 1 before scrolling. Both state:

- job: **Choose a route through a six-camp expedition**;
- audience: browser players wanting one complete authored run with irreversible resource choices and four tested endings;
- first action: **Try it with sample data**, followed by **Opens a fixed run. Saves nothing.**

The title, audience, action, and first complete route choice are inside both initial viewports. Each has three active choices and no horizontal overflow.

The sample opens in one click with `MIST-042`, Camp 1, three authored choices, and warmth, supplies, and trust at 7. After one choice, **Reset demo** returns all resources to 7. A seeded real-data sentinel remains unchanged during reset, play, and exit. The label **Demo — sample data, nothing is saved**, **Reset demo**, and **Start for real** remain visible through the ending. **Start for real** discards the sample and returns to fresh Camp 1.

Both clients played this deterministic route:

1. Share the load with Mara.
2. Follow Mara's pine route.
3. Rest in the shallow cave.
4. Use the signal lens.
5. Let Mara decide.
6. Work the hinge together.

Both reached **A shared dawn** with warmth 2, supplies 2, trust 19, and the relic used. Each measured 60.0 FPS. There were no console errors, page errors, cross-origin requests, or non-GET requests.

Evidence: `/work/.evidence/verification-4/live/fresh-browser-check.json`, `demo-resource-reset.json`, `desktop-first-screen.png`, `phone-first-screen.png`, `desktop-end-screen.png`, and `phone-end-screen.png`.

## Claims

The registry contains 16 unique IDs. Every ID has exactly one matching `@claim:<id>` tag, no undeclared claim tags exist, and every command was run separately from the clean checkout. All 16 passed locally and against the deployed HTTPS origin where applicable; the paid-content claim is a packaged-content unit check:

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

The Repair 4 race check also passed 10 consecutive live invocations without retries: 20/20 browser-project runs. Public landing, legal, purchase-status, and README copy was cross-checked against the registry. No testable public promise is unlisted. The new finding is a platform accessibility requirement, not a failure of the narrower public claim that the in-game setting stops the marker.

Evidence: `/work/.evidence/verification-4/claim-registry-scan.json`, `claims/`, `live/claims/`, and `live/opt-in-stress/`.

## Quality, accessibility, recovery, and performance

- Clean `npm ci`: 60 packages, zero audit vulnerabilities.
- Local `npm test`: 5/5 unit tests and 48/48 browser tests passed with no retries.
- Local `npm run build`: passed and produced `dist/`. Main JavaScript is 27.06 KB raw / 9.62 KB gzip; CSS is 15.62 KB raw / 4.44 KB gzip; the primary WebP scene is 66.10 KB.
- Full live browser suite: 48/48 passed across desktop Chromium and Pixel 5.
- Axe integration: no serious or critical findings on root, demo, privacy, terms, purchase-status, and designed-404 routes in either project.
- Independent structure and target audit: 12 route/profile combinations; one h1 and one main each, correct language, header/nav/footer, image alternatives, no horizontal overflow, and no effective target below 44 × 44 CSS pixels.
- Keyboard/recovery: number keys, Tab plus Enter/Space, pointer, and touch work; route changes move focus; the modal keeps focus away from background controls and returns it after Escape; restart cancellation preserves Camp 2; invalid saved data recovers to Camp 1.
- Text at 200% retains all content and active choices without horizontal overflow. A fresh keyboard session exposes a 3 px amber focus ring.
- Offline reload and continued play pass after the first visit. Sound starts muted. The separate in-game reduced-motion setting stops marker drift and play remains usable.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1,000 ms, LCP 1,375 ms, CLS 0, TBT 40 ms.
- Installed fleet helper: `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-4/helper` passed HTTP 200, title, `lang=en`, main landmark, image alternatives, button names, and console checks.

Evidence: `/work/.evidence/verification-4/local/`, `live/npm-test-e2e.log`, `live/structure-target-audit.json`, `live/keyboard-recovery-resize.json`, `live/focus-ring-check.log`, `live/lighthouse-summary.json`, and `helper/`.

## Routes, privacy, and offer

`/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests deliberately return HTTP 404. The page route renders the designed recovery screen with a way back; this is expected behavior, not a defect. All in-scope internal destination links resolve as expected.

Live headers include CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions. Demo and real-play privacy claims pass with no accounts, cookies, cross-origin requests, or non-GET requests. Local run storage remains opt-in and erasable.

The public offer is **$6 once**, not a subscription. Live metadata exactly matches both repository copies and contains only public offer fields: eight additional authored weather seeds, eight matching relic variants, a printable route log, and the `/license` status path. It contains no credential-like field or value. Sales, checkout, activation, and entitlement remain honestly unavailable pending separate operator QA.

No multiplayer or runtime AI mode is advertised. This is a static, local-first game, so backend tenant isolation, SQLite restart persistence, health, and 429 checks do not apply.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens at active Camp 1 with three choices.
2. **Verification 1 phone first-screen visibility — resolved.** Job, audience, sample action, resources, report, and the first complete choice fit at 393 × 727.
3. **Verification 1 incomplete claim proof — resolved.** Sixteen unique declared claims have exact tagged tests and all commands pass locally and live.
4. **Verification 1 helper location — corrected.** The authoritative installed helper exists at `/opt/fleet/lib/verify-url.sh` and passed. No duplicate repository helper is required for acceptance.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both have independent, passing outcome claims.
6. **Verification 2 undersized links — resolved.** Fresh desktop and phone measurement found no effective target below 44 × 44 CSS pixels.
7. **Earlier unknown-route behavior — resolved.** Unknown page and asset responses are deliberate 404s, and the page route has a designed recovery screen.
8. **Review 2 settings persistence race — resolved.** The exact opt-in claim passed locally, live, in both complete suites, and in 10 consecutive live stress invocations without retries.

## Verdict

**FAIL — 1 minor finding and 0 untested public claims.**
