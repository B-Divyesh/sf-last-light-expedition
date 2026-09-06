# Review 3 — PASS

Reviewed independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `087682a5da2278be05b6b9744d6f47a98e5f4271` (`087682a`).
- Verdict: **PASS**.
- Findings: **0**.
- Untested public claims: **0**.

The live JavaScript and CSS match a clean build of `7b939bc` byte-for-byte. Changes through the documentation baseline affect only `.factory/handoff.md` and `.factory/verification-5.md`; no later product image required review. The work order's separate `factory-evidence/last-light-expedition-verify-5/qa-report.md` path was not present under `/work` in this disposable worker. The complete repository report `.factory/verification-5.md` was read before review.

## Job, audience, and first action

Before scrolling, fresh 1280 × 720 desktop and 393 × 727 phone clients show:

- job: **Choose a route through a six-camp expedition**;
- audience: browser players who want one authored run with irreversible resource choices and four tested endings;
- first action: **Try it with sample data**, followed by **Opens a fixed run. Saves nothing.**;
- active Camp 1 resources, report, seed, and all three route choices.

The action, its result, and the first complete route choice fit in both initial viewports. Both have three playable controls and no horizontal overflow. The screen shows active play rather than a menu.

Evidence: `/work/.evidence/review-3/live/independent-browser-review.json`, `desktop-first-screen.png`, and `phone-first-screen.png`.

## Complete game runs and sample isolation

Two fresh, independent browser clients entered the sample from `/` in one click. Each showed seed `MIST-042`, the authored River shelf report, three resources at 7, three route choices, and the persistent **Demo — sample data, nothing is saved** label.

The desktop client made six fixed choices and reached the win ending **A shared dawn** with warmth 2, supplies 2, trust 19, and the relic used. The phone client made the fixed loss route and reached **The light goes out** with warmth -4, supplies 6, trust 3, and the relic kept. Both screens said **Expedition complete · 6 camps reached**, removed choice controls, and retained **Reset demo** and **Start for real**.

Reset returned both clients to Camp 1 with all resources at 7. A seeded real-data sentinel stayed unchanged during entry, play, completion, and reset. **Start for real** discarded the sample and opened real play without the demo label. The runs made no cross-origin or non-GET requests, set no cookies, and produced no console or page errors.

Evidence: `/work/.evidence/review-3/live/desktop-end-screen.png`, `phone-end-screen.png`, and `independent-browser-review.json`.

## Declared claims

The registry contains 16 unique IDs. Source inspection found exactly one matching `@claim:<id>` tag for every ID and no undeclared tags. Every declared command passed separately from the clean checkout, against production for browser claims and against the package for paid content.

| Claim | Result |
| --- | --- |
| `complete-run` | PASS |
| `four-endings` | PASS |
| `restart-reset` | PASS |
| `demo-isolation` | PASS |
| `offline-reload` | PASS |
| `local-privacy` | PASS |
| `real-play-privacy` | PASS |
| `opt-in-run-storage` | PASS |
| `settings-persist` | PASS |
| `one-time-offer` | PASS |
| `deterministic-outcome` | PASS |
| `input-controls` | PASS |
| `accessible-preferences` | PASS |
| `finite-fiction` | PASS |
| `paid-content` | Packaged PASS |
| `frame-rate` | PASS |

Landing, legal, purchase-status, README, manifest, and public-offer copy were cross-checked with the registry. No testable public promise is unlisted.

Evidence: `/work/.evidence/review-3/claim-registry-scan.json`, `claim-results.tsv`, and `claims/`.

## Quality, accessibility, and recovery

- Clean `npm ci`: 60 packages and zero audit vulnerabilities.
- Local `npm test`: 5/5 unit tests and 50/50 browser tests passed without retries.
- `npm run build`: passed and produced `dist/`; main JavaScript is 27.21 KB raw / 9.68 KB gzip and CSS is 15.62 KB raw / 4.44 KB gzip.
- Full production suite: 50/50 browser tests passed across desktop Chromium and Pixel 5.
- Live Axe integration: both profiles found no serious or critical issue across root, demo, privacy, terms, purchase status, and designed 404 states.
- The installed fleet helper was inspected and run as `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/review-3/helper`. It passed HTTPS, title, language, h1/main, image alternatives, button names, and console checks.
- Pointer, touch, Tab with Enter or Space, and number keys 1–3 work. Route changes move focus. The settings modal prevents focus from reaching background controls, closes with Escape, and returns focus to its opener.
- The visible focus treatment is a 3 px amber outline with a 4 px offset. No effective target below 44 × 44 CSS pixels was found across game, demo, settings, ending, legal, purchase-status, and 404 states.
- At 200% text size, essential controls retain area and neither profile has horizontal overflow.
- Invalid saved data recovers to Camp 1. Restart cancellation preserves Camp 2; confirmation returns to Camp 1.
- Sound starts muted. Fresh system reduced-motion and live preference checks hold the map marker at one rendered position while play remains usable.

Evidence: `/work/.evidence/review-3/local/`, `live/full-live-e2e.log`, `live/interaction-accessibility-audit.json`, and `helper/`.

## Routes, offline use, privacy, offer, and performance

`/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests deliberately return HTTP 404. The page route renders its own title, one h1, one main landmark, and a way back; this is expected behavior.

Offline reload and continued sample play pass after the first successful visit in a fresh context. Demo and real play require no account, use no cookies, and send no gameplay or settings outside the product origin. Real unfinished-run storage is opt-in, resumes after reload, and is erasable. The product advertises no update workflow beyond its tested offline service worker.

The live offer matches both repository copies: **$6 once**, not a subscription, for eight additional authored weather seeds, eight matching relic variants, and a printable six-camp route log. Public JSON contains only public offer fields and no credential-like keys. Sales, checkout, activation, and entitlement remain honestly unavailable; this review makes no claim that they passed.

Fresh mobile Lighthouse scores are 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO. FCP is 1,051 ms, LCP 1,439 ms, TBT 63 ms, CLS 0, and total transfer 127,731 bytes. Both independent clients measured 60.0 FPS. Live asset hashes match `dist/`: JavaScript `4d9c54d8971350e39407d988595ce8b65ba3475c32c2e61dd94dc5d666ed2d32`; CSS `77752d67376413938427f541669899f6e44acd8fdcc59870bd6954f52979c752`.

The game advertises no multiplayer or runtime AI. It is static and local-first, so backend tenant isolation, SQLite restart persistence, health, and 429 checks do not apply. The brief does not imply a useful runtime AI step.

Evidence: `/work/.evidence/review-3/live/statuses.tsv`, `headers.txt`, `public-contract-audit.json`, `lighthouse-summary.json`, and `independent-browser-review.json`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens at active Camp 1 with three choices.
2. **Verification 1 phone visibility — resolved.** Job, audience, action, resources, report, and the first complete choice fit at 393 × 727.
3. **Verification 1 incomplete claim proof — resolved.** Sixteen exact claim tests pass independently.
4. **Verification 1 helper location — corrected.** The authoritative installed helper exists at `/opt/fleet/lib/verify-url.sh` and passes. A repository duplicate is not required, though this product also contains its documented helper.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both have separate passing outcome claims.
6. **Verification 2 undersized links — resolved.** Fresh all-state audits found no effective target below 44 × 44 CSS pixels.
7. **Earlier unknown-route behavior — resolved.** Unknown page and asset responses are deliberate 404s, and the page route has designed recovery.
8. **Review 2 saved-run race — resolved.** The claim passed in the local suite, full live suite, separate claim sweep, and 10 consecutive live stress invocations: 20/20 browser-project runs without retry.
9. **Verification 4 system reduced motion — resolved.** Desktop and phone marker samples stayed fixed under the system preference, and play advanced normally.

Review 1 and Verifications 3 and 5 had no findings.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
