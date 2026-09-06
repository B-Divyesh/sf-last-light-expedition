# Handoff

## Outcome

Repair 3 passes. Last Light Expedition is deployed at <https://last-light-expedition.sociobot.in> with both Verification 2 findings fixed. Independent Verification 3 records a **PASS** with zero findings and zero untested public claims in `.factory/verification-3.md`.

- Implementation and deployed candidate: `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4`
- Documentation/report content: `2828cdc343713e51995e4bb021a83ba6ed0f98f6`
- Deployment resource: existing product-owned Static Web App `sf-last-light-expedition`, production environment only
- Artifact shape: static local-first browser game; no backend, shared database, staging slot, or multiplayer mode

The researched product remains intact: active six-camp play begins on the first screen, each choice is irreversible, every run reaches one of four endings, and the one-click demo stays isolated in memory. The complete edition remains **$6 once**, not a subscription. Sales remain closed until the separate operator completes billing registration and entitlement QA.

## Finding disposition

1. **Two public real-data promises lacked declared claim tests — fixed.** `.factory/claims.json` now declares 16 claims. `@claim:real-play-privacy` changes a setting, finishes a real run, and proves the flow has no account fields, cookies, non-GET requests, or cross-origin requests. `@claim:opt-in-run-storage` proves a default choice is not stored, opt-in play resumes at Camp 2, erase removes the run, and the next reload starts at Camp 1. Every claim ID appears in exactly one tagged test.
2. **Play, Price, and privacy email targets were below 44 × 44 CSS pixels — fixed.** Shared header links now have a 44-pixel minimum width and height. The email link has a 44-pixel minimum height. A browser regression measures the rendered boxes on desktop and at 393 × 727. Live measurements are Play 44 × 44, Price 44 × 44, phone Play 44 × 44, and email 161.77 × 44 CSS pixels.

All earlier findings were also rechecked. Root play is active without an entry gate, the phone first screen shows the job, audience, sample action, resources, report, and first choice, all earlier claim categories remain tagged, the fleet-installed URL helper passes, and unknown pages and assets return deliberate HTTP 404 responses with the designed recovery page.

## Verification

The documented clean setup and local gates were run:

```sh
npm ci
npm test
npm run build
```

- `npm ci`: 60 packages, zero audit vulnerabilities.
- Unit tests: 5/5 passed.
- Browser tests: 48/48 passed across desktop Chromium and Pixel 5.
- Every command in `.factory/claims.json`: all 16 passed independently; logs are in `/work/.evidence/repair-3/claims/`.
- Claim registry scan: 16 unique IDs, exactly one tagged test per ID, and no undeclared test tags.
- Build: JavaScript 26.50 KB raw / 9.51 KB gzip; CSS 15.62 KB raw / 4.44 KB gzip; WebP scene 66.10 KB.
- The existing copy audit was rechecked because public copy did not change. Its landing sentences remain at most 22 words with no banned marketing term.

Production checks against the cold HTTPS origin:

- Full browser suite: 48/48 passed.
- Axe: 2/2 passed with no serious or critical findings across root, demo, privacy, terms, purchase status, and designed 404 routes.
- `/opt/fleet/lib/verify-url.sh`: passed with HTTP 200, title, `lang=en`, one h1, one main, complete image alternatives, named buttons, and zero browser errors.
- Fresh desktop and phone clients each entered the demo, completed six choices, and reached **A shared dawn**. The demo label and exit/reset actions remain visible on the phone end screen.
- First-screen evidence at 1280 × 720 and 393 × 727 shows the headline, audience, sample action, three active choices, and no horizontal overflow. The first choice is fully visible in both viewports.
- Captured runs measured 59.3 FPS on desktop and 60 FPS on the phone profile. They produced no console errors, page errors, or cross-origin requests.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 954 ms, LCP 1,503 ms, CLS 0, TBT 64 ms.
- `/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200. Unknown page and asset requests return 404 as intended.
- Live JavaScript and CSS SHA-256 hashes match the local candidate build. Public offer metadata matches `.factory/billing-offer.json`.
- CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions remain present.

Evidence is under `/work/.evidence/repair-3/`. Public billing metadata and the 104-character verb-first catalog description were copied to `/work/.evidence/billing-offer.json` and `/work/.evidence/catalog-description.txt`.

## Product decisions preserved

- The free sample is a complete authored seed, not a checkout or paid-flow simulation.
- Eight additional authored weather seeds, eight matching relic variants, and the printable six-camp route log remain paid deliverables.
- No subscription, checkout placeholder, activation claim, runtime AI feature, multiplayer claim, or external runtime service was added.
- Demo state remains in memory. Optional real-run data stays in the `last-light:*` browser namespace and can be erased.
- The visual thesis, original writing, generated-art provenance, plain first-screen language, and scope non-goals remain unchanged.

## Known external dependency

The separate billing-registration operator must register `last-light-expedition-complete`, connect real license validation, and complete checkout plus entitlement QA. Until then, `/license` correctly states that purchases are unavailable. No checkout or activation is claimed as passing.

## Verification 3 handoff

Independent QA reviewed implementation `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4` and documentation commit `f5ff38fdfe96ab2820b3a3c50c1648e31e42f424`. The only post-implementation change is documentation. The deployed JavaScript and CSS hashes match the candidate build.

Verification reran `npm ci`, `npm test`, `npm run build`, every one of the 16 claim commands, and the full 48-test suite against the production URL. It also used the installed fleet command `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-3/helper`, captured independent desktop and phone sample runs, performed Axe through the live test suite, and ran Lighthouse mobile with the worker's installed Chromium. Results: 5/5 local unit tests, 48/48 local browser tests, 48/48 live browser tests, all 16 claims passing, no serious/critical Axe issues, helper pass, and Lighthouse 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO.

The production game begins directly at Camp 1 on desktop and phone. Both fresh browser clients saw the job, audience, sample action, and active choices before scrolling; each completed the sample to **A shared dawn** in six choices, with the visible demo label and no console, page, or cross-origin request errors. All Verification 1 and 2 findings are resolved. Evidence is stored outside the repository at `/work/.evidence/verification-3/`.

## Review 1

Fresh strict Review 1 records a **PASS** with zero findings and zero untested public claims in `.factory/review-1.md`. It reviewed implementation `8ae84cb5c34e59c0193ee14c6677e623ce05e4c4`; the report baseline was `fad7a1c422c8f8440fffbdf11b910a3132dae0ca`, whose changes after the candidate are documentation only. Live JavaScript and CSS hashes match the local candidate build.

Review 1 reran clean `npm ci`, local `npm test` (5/5 unit and 48/48 browser tests), `npm run build`, every one of the 16 declared claim commands independently against production, and the full 48-test browser suite against production. It inspected and ran the installed fleet helper at `/opt/fleet/lib/verify-url.sh`, completed fresh desktop and phone sample runs to **A shared dawn**, crawled product-owned links, audited 63 visible phone controls for 44 x 44 CSS-pixel targets, and measured fresh mobile Lighthouse results: 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO (FCP 0.9 s, LCP 1.3 s, CLS 0, TBT 40 ms).

Both new first-screen captures show the job, audience, sample action, three active Camp 1 choices, and no horizontal overflow. The demo label, reset, and real-play exit remain visible through the ending. All prior Verification 1 and 2 findings remain resolved. Evidence is at `/work/.evidence/review-1/`.
