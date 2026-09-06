# Handoff

## Outcome

Independent Verification 7 passes against <https://last-light-expedition.sociobot.in>.

- Implementation reviewed: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Documentation baseline reviewed: `35124e17f0a3728991cad62867866f8c6149682f` (`35124e1`).
- Verdict: **PASS — 0 findings and 0 untested public claims**.
- Live JavaScript and CSS match the clean candidate build byte-for-byte.

No product code changed during Verification 7. The full report is `.factory/verification-7.md`.

## Verification summary

- Clean install passed with zero audit vulnerabilities.
- `npm test` passed: 5 unit and 50 browser tests.
- All 16 claim commands passed separately locally and against production where applicable.
- The full live suite passed 50/50 across desktop Chromium and Pixel 5 projects.
- Fresh desktop and phone screens show the job, audience, sample action, and active Camp 1 before scrolling.
- Independent runs reached the win ending **A shared dawn** and loss ending **The light goes out**. Demo labeling, reset, exit, and real-data isolation passed.
- Offline reload, invalid-state recovery, settings persistence, keyboard/pointer/touch input, focus return, 200% scale, 44 px targets, and system reduced motion passed.
- The historical opt-in save race passed 20/20 repeated production project runs without retry.
- The installed fleet helper, repository verifier, and live Axe integration passed.
- Fresh Lighthouse: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1,276 ms, TBT 19 ms, CLS 0.
- `npm run build` produced `dist/`: main JavaScript 27.21 KB raw / 9.68 KB gzip and CSS 15.62 KB raw / 4.44 KB gzip.
- Unknown pages and assets return deliberate HTTP 404 responses; the page route renders designed recovery.

Durable evidence is under `/work/.evidence/verification-7/`.

## Earlier findings

All earlier product findings remain resolved: active root play, phone first-screen visibility, complete claim coverage, real-play privacy, opt-in save and erase, 44 × 44 targets, deliberate 404 handling, save reliability, and system reduced motion. The authoritative fleet helper exists at `/opt/fleet/lib/verify-url.sh` and passes.

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
/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-7/helper
npm run verify:url -- https://last-light-expedition.sociobot.in/
```

Run every command in `.factory/claims.json` separately for the claim sweep. Compare rendered marker positions in fresh desktop and phone contexts for the system reduced-motion check.
