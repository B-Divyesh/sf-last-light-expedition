# Handoff

## Outcome

Repair 5 passes locally and at <https://last-light-expedition.sociobot.in>.

- Implementation commit: `7b939bc8375f280ec0c34b62a453db0b7b49b02c` (`7b939bc`).
- Previous QA/documentation baseline: `56a03fe46f5b9e1ce4e959749bbed4d4dd985b55` (`56a03fe`).
- Static deployment completed from `dist/`; the live `main-BOO_l5Hd.js` SHA-256 is `4d9c54d8971350e39407d988595ce8b65ba3475c32c2e61dd94dc5d666ed2d32`, matching the built artifact.
- The remaining Verification 4 minor finding is resolved: an operating-system reduced-motion preference now stops map-marker drift, both on initial load and when the preference changes.

## What changed

- The animation loop now treats either the saved **Reduce motion** setting or `prefers-reduced-motion: reduce` as a stop condition.
- Platform preference changes reset the frame timing safely and take effect without reloading.
- Route-change scrolling also respects the system preference.
- The accessibility-preferences claim and README now cover both in-game and system reduced-motion behavior.
- Browser regressions sample the marker's rendered position: one switches the platform preference during play and one starts a fresh reduced-motion browser session. Both also confirm Camp 2 remains playable.

## Verification

- Clean `npm ci`: passed; 60 packages installed, zero audit vulnerabilities.
- `npm test`: passed — 5 unit tests and 50 browser tests.
- `npm run build`: passed and produced `dist/`. Main JavaScript is 27.21 kB raw / 9.68 kB gzip; CSS is 15.62 kB raw / 4.44 kB gzip.
- Every one of the 16 declared claim commands passed separately after the clean install. Durable local logs: `/work/.evidence/last-light-expedition-repair-5/claims-final/`.
- Full live `BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e`: passed — 50 browser tests across fresh desktop Chromium and Pixel 5 profiles.
- The active first screen passed in both profiles: **Choose a route through a six-camp expedition**; the audience sentence; **Try it with sample data**; and active Camp 1 choices are visible before scrolling.
- The demo entered in one click, stayed labeled, reset safely, preserved real-data isolation, and reaches the six-choice end screen. The full suite also covers all four endings, restart, keyboard/touch, offline reload, settings, invalid-save recovery, focus, 200% text, and the reduced-motion setting.
- The installed worker verifier was inspected and run as `/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/last-light-expedition-repair-5/live-helper`. It passed HTTPS, title, language, one main/h1, image alternatives, named buttons, and zero browser errors.
- Axe checks passed on the root, demo, legal, purchase-status, and designed-404 routes in both live browser profiles with no serious or critical issues.
- Fresh live mobile Lighthouse: Performance 100, Accessibility 100, Best Practices 100, and SEO 100; FCP 901 ms, LCP 1,276 ms, CLS 0, and TBT 16 ms.
- Live routes `/`, `/demo`, `/privacy`, `/terms`, `/license`, `robots.txt`, `sitemap.xml`, and public offer metadata return 200. Unknown page and asset paths deliberately return HTTP 404; the browser suite confirms the designed recovery page.
- Live headers retain CSP, HSTS, `nosniff`, strict referrer policy, frame denial, and disabled camera, microphone, geolocation, and payment permissions.
- `.factory/catalog-description.txt` remains verb-first, 105 characters, and was copied unchanged to `/work/.evidence/catalog-description.txt`.

## Earlier finding disposition

All previous findings remain resolved: root opens in active play; the phone first screen exposes the job, audience, action, and route choice; all public claims have exact outcome tests; the authoritative helper path is the worker-installed helper; real-play privacy and opt-in storage are separately tested; interactive targets meet 44 by 44 CSS pixels; unknown routes are deliberate 404s; and settings persistence is deterministic.

## Product and known limits

The complete authored game remains six irreversible choices with four endings. The planned Complete Edition remains **$6 once**, not a subscription. Its public offer metadata has only public fields. Billing registration, checkout, license validation, and entitlement QA are still unavailable external dependencies; the product honestly says sales are not open and makes no claim that checkout or activation has passed.

This is a static, local-first browser game. It advertises no multiplayer or runtime AI, so backend tenant, SQLite, restart-persistence, health, and rate-limit checks do not apply.

## Reproduce

```sh
npm ci
npm test
npm run build
BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/last-light-expedition-repair-5/live-helper
```

Run every command in `.factory/claims.json` separately for the claim sweep. The reduced-motion check must exercise the operating-system preference, not only the in-game checkbox.
