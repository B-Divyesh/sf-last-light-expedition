# Verification 5 — PASS

Verified independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `9a3c91d83fa3c00683f9162b53ab292cbcd0f607` (`9a3c91d`).
- Verdict: **PASS**.
- Findings: **0**.
- Untested public claims: **0**.

The only change from the implementation candidate to the documentation baseline is `.factory/handoff.md`. The deployed JavaScript and CSS match the clean candidate build byte-for-byte.

## Job, audience, and first action

Before scrolling, fresh 1280 × 720 desktop and 393 × 727 Pixel 5 contexts show:

- job: **Choose a route through a six-camp expedition**;
- audience: browser players who want one authored run with irreversible resource choices and four tested endings;
- first action: **Try it with sample data**, followed by **Opens a fixed run. Saves nothing.**;
- active Camp 1 resources, report, and all three route choices.

The action and first complete choice are visible in both viewports. Neither view has horizontal overflow. Evidence: `/work/.evidence/verification-5/live/browser-verification.json`, `independent-browser-check.json`, `desktop-first-screen.png`, and `phone-first-screen.png`.

## Complete game run and demo sandbox

Fresh independent desktop and phone clients entered the sample in one click. Each showed seed `MIST-042`, all resources at 7, authored Camp 1 content, and the persistent **Demo — sample data, nothing is saved** label.

Both clients played this deterministic route:

1. Share the load with Mara.
2. Follow Mara's pine route.
3. Rest in the shallow cave.
4. Use the signal lens.
5. Let Mara decide.
6. Work the hinge together.

Both reached **A shared dawn** with warmth 2, supplies 2, trust 19, and the relic used. Choice controls stopped at the ending. **Reset demo** and **Start for real** remained available, and the sample label remained visible. The four-endings claim also reached the loss ending **The light goes out** and the other two authored endings through rendered play.

Reset returned the sample to Camp 1 with all resources at 7. A seeded real-data sentinel remained unchanged through entry, choices, reset, completion, and exit. **Start for real** discarded the sample and opened a fresh real run. There were no console errors, page errors, cross-origin requests, or non-GET requests.

Evidence: `/work/.evidence/verification-5/live/desktop-end-screen.png`, `phone-end-screen.png`, `browser-verification.json`, and `independent-browser-check.json`.

## Declared claims

The registry contains 16 unique IDs, each with exactly one matching `@claim:<id>` tag and no undeclared tags. Every declared command passed separately after the clean install. All browser claims also passed against production; `paid-content` is a packaged unit check.

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

Landing, legal, purchase-status, manifest, metadata, and README copy were cross-checked with the registry. No testable public promise is unlisted. Evidence: `/work/.evidence/verification-5/claim-registry-scan.json`, `claims/`, and `live/claim-*.log`.

## Quality, accessibility, and recovery

- Clean `npm ci`: 60 packages, zero audit vulnerabilities.
- Local `npm test`: 5/5 unit tests and 50/50 browser tests passed.
- `npm run build`: passed and produced `dist/`. Main JavaScript is 27.21 KB raw / 9.68 KB gzip; CSS is 15.62 KB raw / 4.44 KB gzip.
- Full production suite: 50/50 browser tests passed across desktop Chromium and Pixel 5.
- Live Axe integration: 2/2 profile runs passed with no serious or critical findings across root, demo, privacy, terms, purchase status, and designed 404 states.
- The installed fleet helper was inspected and run as `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-5/helper`. It passed HTTPS, title, language, h1/main, image alternatives, button names, and console checks. The repository's separately documented `npm run verify:url` command also passed.
- Keyboard pointer, touch, Tab with Enter or Space, and number keys work. Route changes move focus. The settings dialog contains focus and returns it to the opener. The visible focus ring is 3 px amber with a 4 px offset.
- Text enlarged to 200% retains the h1 and choices without horizontal overflow. All rendered route controls in the phone audit have an effective target of at least 44 × 44 CSS pixels.
- Restart cancellation preserves Camp 2; confirmation resets Camp 1. Invalid saved data recovers to a new run. Ten repeated live opt-in-storage runs passed without a retry.
- The map marker moved normally, stopped at one rendered position when the system preference changed to reduced motion, and resumed after the preference returned to no-preference in both fresh profiles. Play remained usable. Sound starts muted.

Evidence: `/work/.evidence/verification-5/local/`, `live/npm-test-e2e.log`, `live/axe.log`, `live/keyboard-focus-recovery.json`, `live/independent-browser-check.json`, `live/opt-in-storage-stress.log`, and `helper/`.

## Routes, offline use, privacy, offer, and performance

`/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests deliberately return HTTP 404. The page route renders its own title, one h1, one main landmark, and a route back; this is expected behavior, not a defect. All in-scope internal destinations are present and reachable.

Offline reload and continued play passed immediately after the first successful visit in a fresh browser context. Demo and real play made no cross-origin or non-GET requests and set no cookies. Demo storage remained empty except for the deliberately seeded sentinel; real settings and unfinished-run storage remained local, optional, resumable, and erasable.

The live offer matches both repository copies: **$6 once**, not a subscription, for eight additional authored weather seeds, eight matching relic variants, and a printable six-camp route log. The public JSON contains only public offer fields and no credential-like values. Sales, checkout, activation, and entitlement remain honestly unavailable pending external registration and product QA.

Fresh mobile Lighthouse scores are 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO; FCP is 951 ms, LCP 1,326 ms, TBT 23 ms, CLS 0, and total transfer 127,695 bytes. Both independent profiles measured 60.0 FPS. Live asset hashes exactly match `dist/`: JavaScript `4d9c54d8971350e39407d988595ce8b65ba3475c32c2e61dd94dc5d666ed2d32`; CSS `77752d67376413938427f541669899f6e44acd8fdcc59870bd6954f52979c752`.

The product advertises no multiplayer or runtime AI. It is static and local-first, so backend tenant isolation, SQLite restart persistence, health, and 429 checks do not apply.

Evidence: `/work/.evidence/verification-5/live/statuses.txt`, `headers.txt`, `offline-first-visit.json`, `billing-offer-summary.json`, `asset-sha256.txt`, and `/work/.evidence/verification-5/lighthouse/`.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens at active Camp 1 with three choices.
2. **Verification 1 phone visibility — resolved.** Job, audience, sample action, resources, report, and first choice fit at 393 × 727.
3. **Verification 1 incomplete claim proof — resolved.** Sixteen exact claim tests pass locally and against production where applicable.
4. **Verification 1 helper location — corrected.** The authoritative installed helper exists at `/opt/fleet/lib/verify-url.sh` and passes. The repository's own documented helper also exists and passes.
5. **Verification 2 real-play privacy and opt-in-storage coverage — resolved.** Both have separate passing outcome claims.
6. **Verification 2 undersized links — resolved.** Fresh route and control audits found no effective target below 44 × 44 CSS pixels.
7. **Earlier unknown-route behavior — resolved.** Unknown page and asset responses are deliberate 404s, and the page has designed recovery.
8. **Review 2 saved-run race — resolved.** The claim passed in both complete suites, both independent claim sweeps, and 10 consecutive live stress runs.
9. **Verification 4 system reduced motion — resolved.** Fresh and live-change checks show a fixed rendered marker under the system preference on desktop and phone, with play still usable.

Review 1 and Verification 3 had no findings. Verification 4's sole finding is the repaired item above.

## Verdict

**PASS — 0 findings and 0 untested public claims.**
