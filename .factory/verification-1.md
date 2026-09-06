# Verification 1 — FAIL

Verified 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation: `648e4c4554ef9e1ecd935fb498f46d0d84692d40` (`648e4c4`)
- Documentation/handoff commit: `10fc311bfdb69c8197af09fbb9f00ec79165a308` (`10fc311`)
- Verdict: **FAIL**
- Findings: **4** (three major, one minor)
- Untested public-claim categories: **6**

The game is playable and the declared automated suite passes, but this is not a product PASS. The live root screen violates the browser-game and mobile first-screen contracts, and the public-claim registry/test evidence is incomplete.

## Job, audience, and first action

Before scrolling, the desktop root page states the job as “Choose a route through six camps,” names browser players seeking one complete run, and labels the first action “Try it with sample data.” The desktop page shows that action in the viewport.

On a fresh 393 px phone session, the route-map image fills the initial viewport. The job begins below the map and the primary action is below the fold. This fails the requirement that a cold mobile visitor can see the job, audience, and first action on the first screen.

## Findings

### 1. Major — the root route does not show active gameplay on first load

The browser-game contract requires the game itself on the first screen, not a menu wall. Fresh desktop and phone sessions at `/` expose no camp-choice controls (`[data-choice]` count: `0`); they show an introductory landing state and require “Try it with sample data” or “Start a new expedition” before a camp can be played. The map is a preview, not active play.

Evidence: `/work/.evidence/verification-1/desktop-first.png` and `/work/.evidence/verification-1/phone-first.png`.

### 2. Major — the phone first screen hides the primary action below the fold

At the Pixel 5/393 px profile, the responsive layout places the map before the intro panel. The captured initial viewport does not contain “Try it with sample data”; it appears only after scrolling. This contradicts the plain-words first-screen contract and this work order’s explicit phone check.

Evidence: `/work/.evidence/verification-1/phone-first.png`.

### 3. Major — claims registry and proof are incomplete

All eight entries currently present in `.factory/claims.json` have a passing tagged browser test, but the registry does not cover all public, testable promises. Six untested claim categories were found:

1. README: identical seed and choices always produce the same result.
2. README: pointer/touch, Tab/Enter/Space, and number-key controls work.
3. README: sound starts muted and reduced-motion support is available.
4. README and landing: no combat, endless progression, or real survival advice.
5. README and paid-content copy: the complete edition contains eight additional weather seeds, eight relic variants, and a printable route log.
6. Browser-game contract: a measured 60 FPS claim/test for a mid-range phone is absent.

These statements either have no `claims.json` ID or no exact `@claim:<id>` test. Existing general tests and a handoff measurement do not satisfy the required public-claim registration and exact tagged-test contract.

The listed `local-privacy` claim is also incompletely proved. Its test only checks that requests during a demo run stay same-origin. That does not demonstrate the full rendered promise “no accounts, analytics, adverts, or tracking,” because same-origin analytics/tracking or account/ad markup would still pass. The claim needs observables that cover each part of its wording, or the wording needs narrowing.

### 4. Minor — required `verify-url.sh` is absent

The accessibility baseline calls for running the worker’s `verify-url.sh` (title, language, main landmark, alt text, and console). No such script exists anywhere in the checkout, so that named quality gate could not be run from the documented clean setup. Playwright checks and live Axe passed, but they do not make the required script available.

## Checks that passed

- Fresh clone at `10fc311`, then `npm ci`: passed, 60 packages installed, zero npm audit vulnerabilities.
- `npm test`: passed: 5 unit tests and 32 browser tests.
- `npm run build`: passed and generated `dist/`; main JavaScript is 26.70 kB raw / 9.50 kB gzip and CSS is 14.41 kB raw / 4.20 kB gzip.
- Each declared claim command was run independently against the HTTPS origin, on desktop and phone, and passed: `complete-run`, `four-endings`, `restart-reset`, `demo-isolation`, `offline-reload`, `local-privacy`, `settings-persist`, and `one-time-offer`.
- Live Axe (`npm run test:a11y`): 2/2 passed with no serious or critical findings across home, demo, legal, purchase-status, and 404 routes.
- Normal, invalid, recovery, keyboard/focus, dialog focus-return, reduced-motion, history, route-title, legal, and designed-404 tests: 12/12 passed against live.
- Live status: `/`, `/demo`, `/privacy`, `/terms`, and `/license` returned 200. An unknown route and unknown asset returned HTTP 404; that is the expected designed 404, not a defect.
- Fresh desktop and phone demo runs used the fixed six-choice path to “A shared dawn.” The demo banner remained visible before and after the run, no console/page errors occurred, and no request left the product origin. End-screen captures: `/work/.evidence/verification-1/desktop-end.png` and `/work/.evidence/verification-1/phone-end.png`.
- Reset, demo isolation, offline reload, settings persistence, and the honest $6 one-time, sales-not-open status passed their declared live checks. No multiplayer mode is advertised, so no multiplayer client/state check applies.
- Privacy, terms, sitemap, robots, headers, and external factory link were reachable. The live response includes language/title/main support through the app, a CSP, `nosniff`, referrer policy, and frame protection.

## Earlier findings and current disposition

The earlier deployment record identified an unknown-route repair in `648e4c4`. Current live requests to an unknown page and an unknown asset return a deliberate HTTP 404 with the recovery design, so that earlier issue is resolved. The prior handoff reported no remaining product gap; this independent pass found the four items above.

## Required follow-up

Make an active camp playable at the root route, reorganize the phone first viewport so its job/audience/action are visible without scrolling, register and prove every public claim with exact tagged tests, and add the documented URL verifier. Re-run independent verification only after those changes are deployed.
