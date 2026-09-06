# Review 2 — FAIL

Reviewed 2026-09-06 UTC against <https://last-light-expedition.sociobot.in>.

- Candidate implementation reviewed: `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4` (`8ae84cb`)
- Documentation/report baseline: `786fac89794f86fe060c4464de1211d1b4dee446` (`786fac8`)
- Verdict: **FAIL**
- Findings: **1** (major)
- Untested public claims: **0**

The live JavaScript and CSS hashes match the local build from `8ae84cb`. Changes after that implementation are reports and handoff documentation only.

## Finding

### 1. Major — the opt-in saved-run claim command is not reliable

The required clean claim command failed on its first production run:

```sh
BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e -- --grep @claim:opt-in-run-storage
```

Desktop passed, but the Pixel 5 project failed immediately after **Save settings**. The test expected `last-light:run.campIndex` to equal `1`; it received `undefined`. This command exited 1, so the product cannot pass the strict claims contract.

The production behavior is not consistently broken. The same two-project command passed on a rerun, five isolated phone reruns passed, and the later complete live suite passed. The failure is consistent with a race in the proof: saving runs occurs in the dialog `close` event, while the tagged test reads localStorage immediately after clicking the method-dialog submit button without first waiting for the dialog to close or the storage outcome to appear.

Required repair: make the save transition and its tagged assertion deterministic, then prove the exact declared command passes repeatedly from a clean setup. Do not hide the first failed run with a retry.

Evidence: `/work/.evidence/review-2/claims/opt-in-run-storage.log` (exit 1) and `opt-in-run-storage-rerun.log` (exit 0).

## First screen and complete game loop

Fresh independent 1280 × 720 desktop and 393 × 727 phone contexts show active Camp 1 before scrolling. They state:

- job: **Choose a route through a six-camp expedition**;
- audience: browser players wanting one authored run with irreversible resource choices and four tested endings;
- first action: **Try it with sample data**, with the result stated beside it.

The action and first route choice are fully visible in both viewports. Each view has three active choices and no horizontal overflow.

Each client entered the sample in one click and completed the fixed six-choice route to **A shared dawn**, with warmth 2, supplies 2, trust 19, and the relic used. The persistent **Demo — sample data, nothing is saved** label, **Reset demo**, and **Start for real** remain available at the end screen. Reset, start-for-real, and a real-data sentinel confirm that demo play neither reads nor changes real browser data.

The captured runs measured 60 FPS and produced no console, page, or cross-origin request errors. Evidence: `/work/.evidence/review-2/live/browser-verification.json` and the four first/end-screen PNG files in that directory.

## Claims and quality gates

The registry has 16 unique claim IDs, exactly one matching `@claim:<id>` tag for each ID, and no undeclared tags. Every claim command was invoked. Fifteen passed on the first invocation. `opt-in-run-storage` failed as described above and then passed on rerun. The claim is tested, so the untested-claim count is zero; its unreliable command remains a finding.

The other claim checks pass for six irreversible choices, all four endings, reset, deterministic outcomes, demo isolation, offline reload, demo and real-play privacy, settings persistence, the $6 one-time offer, all advertised inputs, muted/reduced-motion preferences, finite fictional play, paid-content counts, and frame rate.

- Clean `npm ci`: passed, 60 packages and zero audit vulnerabilities.
- Local `npm test`: passed, 5/5 unit tests and 48/48 browser tests.
- `npm run build`: passed and produced `dist/`; JavaScript is 26.50 kB raw / 9.51 kB gzip and CSS is 15.62 kB raw / 4.44 kB gzip.
- Full production suite: 48/48 browser tests passed after the isolated claim failure.
- Installed worker helper: `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/review-2/helper` passed HTTP 200, title, `lang=en`, one h1, main, image alternatives, named buttons, and console checks.
- Axe: no serious or critical findings across game, demo, privacy, terms, purchase status, and designed 404 states.
- Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO; FCP 902 ms, LCP 1,502 ms, CLS 0, TBT 14 ms.
- Phone target audit: no target below 44 × 44 CSS pixels across game, demo, settings, legal, purchase status, ending, and 404 states.
- At 200% text size, the phone layout retains all content without horizontal overflow. The skip link exposes a 3 px focus ring. Native modal focus, Escape close, and focus return work; restart cancellation preserves Camp 2.

## Routes, privacy, and offer

`/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200 and render their route-specific title, one h1, and one main landmark. An unknown page and unknown asset deliberately return HTTP 404. The page route renders the designed recovery screen; this is expected, not a defect.

Production headers include CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions. Complete demo and real-play flows make only same-origin GET requests, create no cookies, and need no account. Optional real-run storage remains erasable.

The public offer is **$6 once**, not a subscription. Live metadata matches `.factory/billing-offer.json`: eight additional authored weather seeds, eight matching relic variants, and a printable route log. Sales, checkout, activation, and entitlement remain honestly unavailable pending separate product QA. No multiplayer or runtime AI mode is advertised. The static local-first product has no backend, tenant, health, restart-persistence, SQLite, or 429 behavior to test.

## Earlier finding disposition

1. **Verification 1 inactive root play — resolved.** Root opens at active Camp 1 with three choices.
2. **Verification 1 phone first-screen visibility — resolved.** Job, audience, sample action, resources, report, and first choice are visible at 393 × 727.
3. **Verification 1 incomplete claim coverage — resolved.** All 16 public claim categories are declared and tagged. Finding 1 concerns reliability of one command, not missing coverage.
4. **Verification 1 helper assertion — corrected.** The authoritative installed helper exists at `/opt/fleet/lib/verify-url.sh` and passed. The repository also documents and contains its own separate helper.
5. **Verification 2 real-play privacy and opt-in storage coverage — resolved.** Both are independently declared and exercised.
6. **Verification 2 undersized Play, Price, and privacy-email links — resolved.** Fresh rendered measurements meet 44 × 44 CSS pixels.
7. **Earlier unknown-route defect — resolved.** Unknown page and asset requests return deliberate HTTP 404 responses, with a designed recovery page for navigation.

## Verdict

**FAIL — 1 major finding and 0 untested public claims.**
