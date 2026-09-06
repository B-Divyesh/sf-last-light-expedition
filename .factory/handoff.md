# Handoff

## Outcome

Repair 2 passes. Last Light Expedition is live at <https://last-light-expedition.sociobot.in> and now opens directly into active Camp 1 play. A fresh visitor can read the job and audience, choose the no-save sample, or take a real route choice without passing through a menu wall.

The complete authored run remains intact: six irreversible decisions, three resources, one weather seed and relic, and four tested endings. The researched one-time offer remains **$6 once**. Sales are still closed because billing registration and entitlement validation have not passed product QA.

## Verified revisions and deployment

- Deployed implementation SHA: `27fd6407972215f43a19dc32396f014f9ae627dd`
- Documentation/evidence SHA: recorded by the final report-only follow-up commit
- Live origin: `https://last-light-expedition.sociobot.in`
- Deployment resource: existing product-owned Static Web App `sf-last-light-expedition` in `centralus`
- Deployment shape: static application, one production environment, no backend, database, staging slot, or shared service
- Public offer metadata: `.factory/billing-offer.json` and `/work/.evidence/billing-offer.json`
- Catalog description: `.factory/catalog-description.txt` and `/work/.evidence/catalog-description.txt` (105 bytes)

## Finding disposition

1. **Root was pre-play — fixed.** The root creates a real `MIST-042` run immediately. Fresh desktop and phone clients render Camp 1, three choice controls, current resources, settings, and restart before any supporting section.
2. **Phone action was below the fold — fixed.** At 393 × 727, the headline, audience, complete sample button, three facts, resources, camp report, and first choice are visible before scrolling.
3. **Claims were incomplete — fixed.** `.factory/claims.json` now has 14 entries. Each ID appears in exactly one tagged outcome test. Added proof covers deterministic replay, pointer/touch/keyboard input, muted and reduced-motion settings, the finite fictional non-combat run, paid-content counts, and measured frame rate. The privacy promise was narrowed and now proves no sign-in, cookies, demo storage, non-GET requests, or cross-origin requests during a full run.
4. **`verify-url.sh` was missing — fixed.** The executable repository script checks HTTP status, title, language, landmarks, one h1, image alternatives, button names, and browser errors. Both it and the factory verifier passed against the final HTTPS origin.

The earlier unknown-route defect also remains fixed: unknown pages and assets return deliberate HTTP 404 responses, while the designed recovery page gives a route back to the game.

## Additional repair found during verification

The first final phone end-screen capture showed that the demo banner could scroll away. The mobile override was corrected, and the demo-isolation claim now plays through an ending and requires the sample label to remain in the viewport. The final phone end-screen evidence shows the label with **Reset demo** and **Start for real**.

## Verification performed

Clean setup and final local gates:

```sh
npm ci
npm test
npm run build
```

- Unit tests: 5/5 passed.
- Browser tests: 42/42 passed across desktop Chromium and the Pixel 5 profile.
- Every one of the 14 commands in `.factory/claims.json` passed independently from the clean install. Logs are in `/work/.evidence/repair-2/claims/`.
- Production bundle: 26.50 KB JavaScript raw / 9.51 KB gzip; 15.48 KB CSS raw / 4.41 KB gzip; 66.1 KB WebP scene.
- `dist/` was produced.

Final live gates:

- Full HTTPS browser suite: 42/42 passed against the final deployed candidate.
- Live Axe: 2/2 passed across root, demo, privacy, terms, purchase status, and designed 404 routes, with no serious or critical findings.
- Repository and factory URL verifiers: passed with HTTPS 200, correct title/language, one h1, one main, complete image alternatives, labeled buttons, and no console or page errors.
- Fresh deterministic run: desktop and phone both made six choices and reached **A shared dawn**.
- First-screen evidence: both clients expose three playable choices; the sample button and first choice are visible before scrolling.
- Demo evidence: the no-save label remains visible through the phone end screen; reset and exit remain available.
- Frame measurement: 58.7 FPS desktop and 60 FPS phone in the final capture. Gameplay has no timing requirement.
- Requests: zero external requests, console errors, page errors, or horizontal overflow during both captured runs.
- Routes: `/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200; unknown page and asset requests return 404.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 911 ms, LCP 1,286 ms, CLS 0, TBT 33 ms.
- Security headers: CSP, `nosniff`, strict referrer policy, frame denial, and disabled camera/microphone/geolocation/payment permissions are present.
- Live public billing metadata exactly matches the repository metadata.

Evidence is in `/work/.evidence/repair-2/`, `/work/.evidence/browser-verification.json`, and the first/end-screen PNG files in `/work/.evidence/`.

## Product decisions preserved

- The free sample is one complete six-camp seed, not a checkout or paid-flow simulation.
- The complete edition retains eight additional authored weather seeds, eight matching relic variants, and the printable six-camp route log.
- No subscription, mock checkout, activation claim, multiplayer mode, runtime AI feature, or external service dependency was added.
- Optional real-run persistence stays in the `last-light:*` browser namespace. Demo state stays in memory and does not touch that namespace.
- This is a static local-first product, so SQLite, restart persistence, backend health, rate limiting, and multi-replica storage checks do not apply.

## Known external dependency

The separate billing-registration operator must register `last-light-expedition-complete`, connect real license validation, and complete checkout plus entitlement QA. Until then, `/license` correctly says purchases are unavailable. No checkout or activation is claimed as passing.
