# Handoff

## Independent verification 1 — FAIL

Verification of deployed candidate `648e4c4` was completed on 2026-09-06. The clean setup, build, declared tests, live claim tests, full desktop/phone demo runs, routes, and live Axe checks passed. The product nevertheless **does not pass** independent QA: the root route opens as a pre-play landing state rather than active game play, the 393 px first viewport places the primary sample action below the fold, claim registration/proof is incomplete, and the required `verify-url.sh` is absent. See `.factory/verification-1.md` for the four findings, evidence paths, and required follow-up. Do not treat this handoff as a release PASS.

## Outcome

Last Light Expedition is implemented and live at <https://last-light-expedition.sociobot.in>. It is a deterministic, local-first browser game with six authored camps, three irreversible choices at each camp, a weather seed, a relic, three resources, and four reachable endings.

The first screen names the play, its audience, and the first action. The route map and game scene appear before any supporting sections. `/demo` starts a complete sample run in one click and keeps a visible no-save label. Reset and exit discard demo state without reading or writing real-play storage.

The public one-time offer is **$6 once**, not a subscription. The Complete Edition retains eight additional authored weather seeds, eight relic variants, and a printable route log. Sales, checkout, entitlement, and activation are explicitly unavailable until the separate billing operator registers and tests the offer.

## Source and deployment

- Deployed implementation SHA: `648e4c4554ef9e1ecd935fb498f46d0d84692d40`
- Verification configuration SHA: `92850491347d4709b321d5ee29586a82cca474fc`
- Deployment resource: product-owned Static Web App `sf-last-light-expedition`, one production environment in `centralus`
- Production origin: `https://last-light-expedition.sociobot.in`
- Public billing metadata: `.factory/billing-offer.json` and `/work/.evidence/billing-offer.json`
- Catalog description: `.factory/catalog-description.txt` and `/work/.evidence/catalog-description.txt` (101 bytes)

The verification-only SHA adds external-origin test support and Node types. It does not change the deployed runtime. The final handoff commit only records this report.

## What was built

- Vite and strict TypeScript application with no runtime framework or third-party network dependency.
- Full route loop: entry, six camps, resource feedback, ending summary, and one-action replay.
- Four tested endings: The light goes out, A shared dawn, The observatory signal, and The sheltered return.
- Touch, pointer, Tab/Enter/Space, and number-key input.
- Sound disabled by default, reduced-motion setting, focus-managed settings dialog, route announcements, and visible focus states.
- Optional real-run persistence with validation and recovery from malformed saved data.
- In-memory demo sandbox at `/demo`; real `last-light:*` storage is untouched while the demo banner is present.
- Offline reload after the first visit through a same-origin service worker.
- Privacy, terms, purchase-status, and designed 404 routes with distinct titles.
- Security headers, sitemap, robots file, manifest, favicon, social image, and responsive original art.
- Exact one-time public offer metadata without a checkout stub or any credential.
- Original printable route log source at `premium/route-log.html`; it is not deployed publicly.

## Verification

Clean setup was exercised by moving the existing install and build aside, then running:

```sh
npm ci
npm test
npm run build
```

Results:

- Unit: 5/5 passed. This covers determinism, six-camp structure, invalid choices, paid-content count, and all four endings.
- Browser: 32/32 passed across desktop Chromium and a 390 px phone profile.
- Every command in `.factory/claims.json`: passed separately on both profiles.
- Live claim suite: 16/16 passed against the final HTTPS origin.
- Live axe suite: 2/2 passed; no serious or critical findings across home, demo, legal, purchase-status, and 404 pages.
- Factory `verify-url.sh`: HTTPS 200, correct title and language, one h1, main landmark, complete image alt text, labeled buttons, and no console errors.
- Live route status: `/`, `/demo`, `/privacy`, `/terms`, and `/license` return 200. Unknown pages and assets return 404 with the designed recovery page.
- Production bundle: 26.70 KB JavaScript raw / 9.50 KB gzip; 14.41 KB CSS raw / 4.20 KB gzip; 66.1 KB WebP hero.
- Live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 901 ms, LCP 1,501 ms, CLS 0, TBT 0 ms.
- Fresh live deterministic run: six choices reached “A shared dawn” on desktop and phone.
- Measured animation timing: 56.8 FPS in the desktop headless profile and 60 FPS in the phone profile. Gameplay has no timing requirement.
- Live browser capture: zero console errors, zero page errors, zero horizontal overflow, and zero requests outside the product origin.

Evidence is in `/work/.evidence/`: `browser-verification.json`, first-screen and end-screen captures for both viewports, `lighthouse-live.json`, and `live/verify.json`.

## Product decisions

- The free sample is one complete six-camp weather seed, not a checkout simulation.
- Paid seeds remain paid content even while registration is missing.
- No multiplayer mode is advertised or implemented.
- No runtime AI feature was added because authored deterministic prose fits the researched product.
- The app is static and local-first. There is no backend state, so SQLite and multi-replica concerns do not apply.
- The image-generation skill produced the valley scene. Its prompt, generation route, review, and license provenance are recorded in `.factory/design.md` and the asset sidecars.

## Known dependency and next step

The separate billing-registration operator must register `last-light-expedition-complete`, connect real license validation, and complete checkout plus entitlement QA. Until that happens, the public purchase-status page correctly says sales are not open. Independent verification 1 also found the four release-blocking QA gaps recorded at the top of this file and in `.factory/verification-1.md`.
