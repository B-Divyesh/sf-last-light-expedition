# Verification 2 — PASS

Verified 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation: `27fd6407972215f43a19dc32396f014f9ae627dd` (`27fd640`)
- Documentation/evidence revision: `adc247698703df42362996299dfe28714d5739e3` (`adc2476`)
- Verdict: **PASS**
- Current findings: **0**
- Previous findings resolved: **4 of 4**
- Declared public claims: **14 of 14 passed independently**

## Cold first screen

Fresh 1280 × 720 desktop and 393 × 727 phone clients show:

- the job: **Choose a route through a six-camp expedition**;
- the audience and outcome in one 16-word sentence;
- the complete **Try it with sample data** action;
- active Camp 1 resources, report, and three route-choice controls;
- the first route choice before scrolling.

The root therefore shows active gameplay, not a pre-play landing. Evidence: `/work/.evidence/desktop-first-screen.png`, `/work/.evidence/phone-first-screen.png`, and `/work/.evidence/browser-verification.json`.

## Previous findings

### 1. Root route did not show active gameplay — resolved

A fresh root visit creates a real run with three `[data-choice]` controls and current resources. The player can take a route without an entry click. Both the local regression and final live suite assert this rendered outcome.

### 2. Phone primary action was below the fold — resolved

The phone layout now orders the active ledger before the map. The final 393 × 727 capture records `primary_fully_visible: true` and `first_choice_visible_fraction: 1`.

### 3. Claim registry and proof were incomplete — resolved

The registry grew from 8 to 14 claims. The six missing categories now have exact tagged outcome tests:

1. deterministic ending and resource summary for identical seed and choices;
2. pointer, touch, Tab plus Enter/Space, and number-key route control;
3. muted default and a reduce-motion setting that stops marker movement;
4. a six-choice ending, absence of combat controls, and explicit fiction label;
5. eight paid seeds, eight matching relic variants, and a printable six-row route log;
6. a 60 FPS animation target with a measured 45–75 FPS Pixel 5 test range.

The privacy claim now completes a demo from empty browser state and asserts no account inputs, cookies, demo storage, non-GET requests, or cross-origin requests. A scan of test sources found each claim ID exactly once. Every declared command passed independently; logs are in `/work/.evidence/repair-2/claims/`.

### 4. Required URL verifier was absent — resolved

`verify-url.sh` is executable, documented, and passed locally and live. The factory verifier also passed and wrote `/work/.evidence/repair-2/live/verify.json`.

## Earlier history

The earlier unknown-route issue remains resolved. `/missing-camp` and `/assets/missing-file.js` return expected HTTP 404 responses. The designed 404 has its own title, one h1, one main landmark, and a link back to the game.

## Run and end-screen evidence

The fixed route was played with independent fresh desktop and phone contexts:

1. Share the load with Mara.
2. Follow Mara's pine route.
3. Rest in the shallow cave.
4. Use the signal lens.
5. Let Mara decide.
6. Work the hinge together.

Both reached **A shared dawn** after six irreversible choices. The demo label stayed in the viewport on the phone end screen, and demo reset/exit remained available. Evidence: `/work/.evidence/desktop-end-screen.png` and `/work/.evidence/phone-end-screen.png`.

## Quality results

- Clean `npm ci`: passed, 60 packages, zero audit vulnerabilities.
- Final `npm test`: 5/5 unit and 42/42 browser tests passed.
- Final `npm run build`: passed and created `dist/`.
- Final live browser suite: 42/42 passed.
- Final live Axe: 2/2 passed; no serious or critical findings.
- Repository URL verifier and factory URL verifier: passed with no console errors.
- Live Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO.
- FCP 911 ms; LCP 1,286 ms; CLS 0; TBT 33 ms.
- Initial assets remain below the product budgets.
- Required live/legal routes and public offer metadata passed.

## Honest remaining dependency

Billing registration, checkout, entitlement, and license activation remain external and unverified. The product retains the $6 one-time paid deliverables and publicly reports sales as closed. This dependency does not block free sample play or the repaired browser-game contract.
