# Verification 2 — FAIL

Verified independently on 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation: `27fd6407972215f43a19dc32396f014f9ae627dd` (`27fd640`)
- Documentation baseline reviewed: `252148d52974c5aec1dda0fee4116fea44b559d8` (`252148d`)
- Verdict: **FAIL**
- Findings: **2** (one major, one minor)
- Untested public claims: **2**
- Declared claims: **14 of 14 commands passed independently**

The repaired gameplay and all four Verification 1 dispositions were rechecked. Active Camp 1 play now appears on the first desktop and phone screen, the complete deterministic run works, and the fleet-installed verifier passes. This fresh pass found two additional acceptance issues.

## Job, audience, and first action before scrolling

Fresh 1280 × 720 desktop and 393 × 727 phone contexts show:

- the job: **Choose a route through a six-camp expedition**;
- the audience: browser players who want one authored run with irreversible resource choices and four tested endings;
- the first action: **Try it with sample data**, with “Opens a fixed run. Saves nothing.” beside it;
- active Camp 1 resources, report, and all three route choices.

The sample action and first route choice are fully inside both viewports. There is no horizontal overflow. Evidence: `/work/.evidence/verification-2/live/desktop-first-screen.png`, `/work/.evidence/verification-2/live/phone-first-screen.png`, and `/work/.evidence/verification-2/live/browser-verification.json`.

## Current findings

### 1. Major — two public local-data promises have no declared claim coverage

Every registered claim command passes, and each of the 14 registered IDs appears in exactly one tagged test. However, the public copy makes two additional testable promises that are not represented by the wording and outcome of any claim entry:

1. Real play needs no account and sends no gameplay or settings to another service. The `local-privacy` claim and its tagged test cover only `/demo`.
2. An unfinished real run is stored only after the player opts in, and **Erase saved run** removes it. The `settings-persist` claim tests only that a sound setting survives reload.

Manual live QA confirmed both behaviors currently work: default real play did not survive reload, opt-in play resumed at Camp 2, erase removed `last-light:run`, and the real run made no cross-origin or non-GET requests. Manual evidence does not satisfy the contract requiring each public claim to have a declared, exactly tagged repeatable outcome test.

Evidence: `.factory/claims.json`, `tests/product.spec.ts`, `/work/.evidence/verification-2/claim-registry-scan.json`, and `/work/.evidence/verification-2/live/real-storage.json`.

Required repair: add exact claim entries and tagged outcome tests for real-play request/privacy behavior and opt-in run persistence plus erase, or narrow the public copy to the behavior already declared and tested.

### 2. Minor — three text links do not meet the 44 × 44 CSS-pixel target minimum

The shared header’s **Play** link measures about 33.38 × 44 CSS pixels on desktop and phone. **Price** measures about 39.03 × 44 on desktop and is intentionally hidden on phone. The privacy email link measures about 161.77 × 19. The attached accessibility and design contracts require every touch/click target to be at least 44 × 44.

All other visible controls passed the size audit, adjacent header links keep at least 8 pixels of separation, keyboard operation works, and Axe reports no serious or critical issue. This remains a contract failure even though the links are operable.

Evidence: `/work/.evidence/verification-2/live/touch-target-audit.json` and `/work/.evidence/verification-2/live/independent-browser-checks.json`.

Required repair: enlarge the effective clickable boxes for **Play**, **Price**, and `privacy@sociobot.in` to at least 44 × 44 CSS pixels without reducing spacing or obscuring focus indication.

## Verification 1 disposition

1. **Inactive root gameplay — resolved.** Fresh root contexts contain three playable choices and need no entry click.
2. **Phone action below the fold — resolved.** The sample action and first route choice are fully visible at 393 × 727.
3. **Six previously missing claim categories — resolved.** Determinism, all advertised inputs, muted/reduced-motion settings, finite fictional play, paid-content counts, and measured frame rate now have exact tagged tests. All 14 declared commands pass. Finding 1 above concerns two distinct local-data promises not identified in Verification 1.
4. **Repository helper expectation — corrected, not a product defect.** Verification 1 searched only the checkout. The authoritative helper is `/opt/fleet/lib/verify-url.sh`; it exists in the worker image and passed against the live URL using the work-order evidence directory. A repository duplicate is not required for acceptance.

The earlier unknown-route defect also remains resolved. Direct unknown-page and missing-asset requests return deliberate HTTP 404 responses; a browser loading the unknown page renders the designed recovery screen with its own title, one h1, one main landmark, and a route back.

## Complete run and sample sandbox

Independent fresh desktop and phone clients entered the sample in one click and saw the persistent **Demo — sample data, nothing is saved** label. The sample contained seed `MIST-042`, three resources at 7, Camp 1 text, and three real choices. Reset returned to Camp 1 with all resources at 7 and did not alter a real-data sentinel.

Both clients played this deterministic route:

1. Share the load with Mara.
2. Follow Mara's pine route.
3. Rest in the shallow cave.
4. Use the signal lens.
5. Let Mara decide.
6. Work the hinge together.

Both reached **A shared dawn** with warmth 2, supplies 2, trust 19, and the relic used. The demo label, **Reset demo**, and **Start for real** remained visible on the phone end screen. Starting for real discarded the sample and returned to fresh Camp 1 state. Evidence: `/work/.evidence/verification-2/live/desktop-end-screen.png`, `/work/.evidence/verification-2/live/phone-end-screen.png`, and `/work/.evidence/verification-2/live/independent-browser-checks.json`.

## Declared claim results

| Claim | Result |
| --- | --- |
| `complete-run` | PASS |
| `four-endings` | PASS |
| `restart-reset` | PASS |
| `demo-isolation` | PASS |
| `offline-reload` | PASS |
| `local-privacy` | PASS for its declared demo scope |
| `settings-persist` | PASS for its declared settings scope |
| `one-time-offer` | PASS |
| `deterministic-outcome` | PASS |
| `input-controls` | PASS |
| `accessible-preferences` | PASS |
| `finite-fiction` | PASS |
| `paid-content` | PASS |
| `frame-rate` | PASS |

Each command ran separately from the clean checkout. Logs are in `/work/.evidence/verification-2/claims/`.

## Other checks passed

- Clean `npm ci`: 60 packages, zero audit vulnerabilities.
- `npm test`: 5/5 unit tests and 42/42 browser tests passed locally.
- `npm run build`: passed and produced `dist/`.
- Full live suite: 42/42 browser tests passed on desktop Chromium and Pixel 5 profiles.
- Live Axe: 2/2 passed across root, demo, privacy, terms, purchase status, and designed 404 routes.
- Fleet `/opt/fleet/lib/verify-url.sh`: passed with HTTPS 200, title, `lang=en`, one h1, main landmark, complete image alternatives, named buttons, and no browser errors.
- Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP 901 ms, LCP 1,501 ms, CLS 0, TBT 8 ms.
- Production assets: JavaScript 26.50 KB raw / 9.51 KB gzip; CSS 15.48 KB raw / 4.41 KB gzip; primary WebP scene 66.10 KB.
- Runtime match: the live JavaScript and CSS hashes exactly match the local build from candidate `27fd640`; commits after it changed reports only.
- Routes `/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200 with distinct titles, one h1, and one main. Internal links pass. The `mailto:` privacy request and explicitly labeled external factory link are present.
- Keyboard Tab, Enter, Space, and number controls pass. Focus moves to the next camp, the settings dialog returns focus, the skip link works, and reduced-motion play remains usable.
- Invalid saved data recovers to Camp 1. Restart cancel preserves the run; restart confirm resets it. Offline reload and continued play pass under a controlling service worker.
- Security headers include CSP, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions.
- The public offer matches repository metadata: **$6 once**, eight additional seeds, eight matching relic variants, and a printable six-camp route log. Sales, checkout, activation, and entitlement are honestly reported as unavailable.
- No multiplayer or runtime AI mode is advertised. The product is static and local-first, so backend tenancy, SQLite persistence, restart, health, and 429 checks do not apply.

## External dependency

Billing registration and entitlement validation remain outside this product QA. They do not excuse the two current product findings, and no checkout or activation is claimed as passing.

## Verdict

**FAIL — 2 findings remain, including 2 untested public claims.**
