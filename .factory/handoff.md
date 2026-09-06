# Handoff

## Outcome

Independent Verification 5 passes against <https://last-light-expedition.sociobot.in>.

- Implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `9a3c91d83fa3c00683f9162b53ab292cbcd0f607` (`9a3c91d`).
- Verdict: **PASS — 0 findings and 0 untested public claims**.
- The live JavaScript and CSS match the clean candidate build byte-for-byte.

No product code was changed during verification. The full report is `.factory/verification-5.md`.

## Verification summary

- Clean install passed with zero audit vulnerabilities.
- `npm test` passed: 5 unit and 50 browser tests.
- All 16 declared claim commands passed separately; all browser claims also passed against production.
- The full live suite passed 50/50 across fresh desktop Chromium and Pixel 5 profiles.
- Fresh desktop and phone sessions show the job, audience, sample action, and active Camp 1 before scrolling.
- Independent six-choice runs reached **A shared dawn** with the persistent demo label, reset and exit controls, no real-data changes, and no console, page, cross-origin, or non-GET errors.
- System reduced motion stopped the rendered map marker on fresh load and live preference change in both profiles. Normal motion resumed after the preference was removed.
- The installed fleet verifier, repository verifier, Axe integration, keyboard/focus checks, 200% text sizing, target audit, recovery checks, and first-visit offline reload passed.
- Ten repeated live opt-in-storage tests passed without retry.
- Fresh mobile Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP 951 ms, LCP 1,326 ms, TBT 23 ms, CLS 0.
- `npm run build` produced `dist/`: main JavaScript 27.21 KB raw / 9.68 KB gzip and CSS 15.62 KB raw / 4.44 KB gzip.
- Unknown pages and assets return deliberate HTTP 404 responses; the page route renders the designed recovery screen.

Durable evidence is under `/work/.evidence/verification-5/`.

## Earlier findings

All earlier findings are resolved: active root play, phone first-screen visibility, complete claim registration, real-play privacy and opt-in storage proof, 44 × 44 targets, deliberate 404 handling, the saved-run test race, and system reduced-motion behavior. The authoritative fleet helper exists at `/opt/fleet/lib/verify-url.sh` and passes.

## Offer and known external limit

The complete edition remains **$6 once**, not a subscription. Public metadata contains only public fields and matches the live page: eight additional authored weather seeds, eight matching relic variants, and a printable six-camp route log.

Billing registration, checkout, license validation, and entitlement QA remain unavailable external dependencies. The product honestly states that sales are not open and does not claim checkout or activation has passed.

The game advertises no multiplayer or runtime AI. It is static and local-first, so backend checks do not apply.

## Reproduce

```sh
npm ci
npm test
npm run build
BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e
BASE_URL=https://last-light-expedition.sociobot.in npm run test:a11y
/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-5/helper
npm run verify:url -- https://last-light-expedition.sociobot.in/
```

Run every command in `.factory/claims.json` separately for the claim sweep. The system reduced-motion check must observe rendered marker positions in a fresh context and after a live preference change.
