# Handoff

## Outcome

Repair 4 is complete and deployed at <https://last-light-expedition.sociobot.in>.

- Implementation and deployed candidate: `068fcc6e86565b8f40235194128da91543aef41e`
- Previous review baseline: `96d988fe29dbbde419c3b44711e18ae02852f932`
- Deployment resource: existing product-owned Static Web App `sf-last-light-expedition`, production environment only
- Product shape: static, local-first browser game; no backend, shared database, staging slot, runtime AI, or multiplayer mode

The complete researched product remains intact. Root opens on active Camp 1. A run has six irreversible resource choices and reaches one of four endings. The one-click demo is isolated in memory. The complete edition remains **$6 once**, not a subscription, and sales remain closed until billing registration and entitlement QA are complete.

## Review 2 finding fixed

The `opt-in-run-storage` failure was an event-order race. **Save settings** used a native method-dialog close, while persistence ran later from the dialog `close` event. A browser assertion could therefore complete the click and inspect storage before the close handler wrote `last-light:run`.

Save is now an explicit transaction. Form submission reads the selected settings, writes settings and the current run synchronously, updates the motion preference, closes the dialog, and announces whether the run will resume. The separate close action cancels unsubmitted checkbox changes and returns focus to the opener.

The claim regression checks the observable completed state, closed dialog, opt-in setting, saved Camp 2 state, reload resume, erase confirmation, removed run data, and a fresh Camp 1 after reload. It does not use retries or a source-string assertion.

Reliability evidence:

- Ten consecutive local invocations of the exact claim command passed on their first attempt across desktop and phone: 20/20 project runs.
- The command then passed independently in the clean local claim sweep: 2/2 projects.
- The command passed independently against the deployed HTTPS origin: 2/2 projects.
- Logs: `/work/.evidence/repair-4/race-proof/`, `/work/.evidence/repair-4/claims/opt-in-run-storage.log`, and `/work/.evidence/repair-4/live/claims/opt-in-run-storage.log`.

## Earlier finding disposition

1. **Inactive root play — remains fixed.** A fresh root visit starts active Camp 1 with three route choices.
2. **Phone first-screen content below the fold — remains fixed.** At 393 × 727, the job, audience, sample action, resources, Camp 1 report, and first complete choice are visible without horizontal overflow.
3. **Incomplete public-claim proof — remains fixed.** The registry has 16 unique IDs, one exact tagged test for each ID, and no undeclared tags. All commands pass separately locally and live.
4. **Worker helper path — resolved as a tooling-location correction.** The installed `/opt/fleet/lib/verify-url.sh` was inspected and run against the product URL with the Repair 4 evidence directory. It passed. The repository helper remains because README documents it, but it is not treated as a substitute for the fleet helper.
5. **Real-play privacy and opt-in storage coverage — remains fixed.** Both have independent outcome tests. Real play uses no account, cookie, cross-origin request, or non-GET request.
6. **Undersized Play, Price, and privacy-email links — remains fixed.** The rendered-target regression passes on desktop and phone; each relevant target is at least 44 × 44 CSS pixels.
7. **Unknown route behavior — remains fixed.** Unknown pages and assets deliberately return HTTP 404. The page route renders the designed recovery screen and is not reported as a defect.

## Clean local verification

Run from the documented setup:

```sh
npm ci
npm test
npm run build
```

Results:

- `npm ci`: 60 packages; zero audit vulnerabilities.
- Unit tests: 5/5 passed.
- Browser tests: 48/48 passed across desktop Chromium and Pixel 5.
- Axe integration: no serious or critical findings across root, demo, privacy, terms, purchase status, and designed 404 routes.
- Every command in `.factory/claims.json`: 16/16 passed independently.
- Claim registry: 16 unique IDs, one exact tag each, no missing or undeclared tags.
- Build: JavaScript 27.06 KB raw / 9.62 KB gzip; CSS 15.62 KB raw / 4.44 KB gzip; primary WebP scene 66.10 KB.
- Evidence: `/work/.evidence/repair-4/local/` and `/work/.evidence/repair-4/claims/`.

## Production verification

- Full HTTPS browser suite: 48/48 passed.
- All 16 claim commands: passed independently against the HTTPS origin.
- Fleet URL helper: passed HTTP 200, title, `lang=en`, one h1, main landmark, image alternatives, button names, and zero console errors.
- Fresh 1280 × 720 desktop and 393 × 727 phone clients each entered the demo in one click and reached **A shared dawn** after six choices.
- Both first screens show the plain job title, audience, sample action, three active choices, and the first complete choice. Neither has horizontal overflow.
- Both captured runs measured 60 FPS with no console errors, page errors, or cross-origin requests.
- The demo label, **Reset demo**, and **Start for real** remain visible through the end screen. The live isolation claim proves reset and play do not change real data.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 945 ms, LCP 1,502 ms, CLS 0, TBT 14 ms.
- `/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, the manifest, and public offer metadata return 200. Unknown page and asset requests return 404 as intended.
- Live JavaScript and CSS SHA-256 hashes exactly match the local candidate build.
- Live offer metadata exactly matches `.factory/billing-offer.json` and `public/billing-offer.json`.
- CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions are present.
- Evidence: `/work/.evidence/repair-4/live/`.

The first Lighthouse attempt completed its audits but Chromium crashed during Lighthouse's optional full-page screenshot. That artifact was rejected and replaced by a clean run with the screenshot disabled. The scores above come only from the clean report, whose `runtimeError` is empty.

## Public metadata

`.factory/catalog-description.txt` is a 104-character, verb-first description (105 bytes including its newline). It was copied to `/work/.evidence/catalog-description.txt`.

The public one-time offer was copied to `/work/.evidence/billing-offer.json`. It contains only the required public fields: slug, name, USD 600 minor-unit one-time price, exact product return URL, price evidence, three paid deliverables, and license-validation path. It contains no credential or provider secret.

## Known external dependency

The separate billing-registration operator still needs to register `last-light-expedition-complete`, connect real license validation, and complete checkout plus entitlement QA. Until then, `/license` correctly says purchases are unavailable. No checkout, activation, or entitlement is claimed as passing.
