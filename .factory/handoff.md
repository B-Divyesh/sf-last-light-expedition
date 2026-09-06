# Handoff

## Outcome

Independent Verification 4 completed against <https://last-light-expedition.sociobot.in>.

- Verdict: **FAIL**
- Findings: **1 minor**
- Untested public claims: **0**
- Implementation reviewed: `068fcc6eab551a71b341782abad1fbfae705704a` (`068fcc6`)
- Documentation baseline reviewed: `d928fc19b85452b7625f51e1bafae677dd335ff8` (`d928fc1`)
- Full report: `.factory/verification-4.md`
- Evidence: `/work/.evidence/verification-4/`

No product code was changed during verification. The live JavaScript and CSS hashes exactly match the clean local candidate build.

## Finding to repair

The operating-system `prefers-reduced-motion: reduce` preference does not stop the map light marker. In a fresh matching browser context, six transform samples taken 120 ms apart were all different. The separate in-game **Reduce motion** checkbox works, but the JavaScript frame loop does not consult the platform preference.

Repair the frame loop so it stops marker drift when either the saved setting or the operating-system preference requests reduced motion. Listen for preference changes and add a browser regression that asserts a stable marker transform under `page.emulateMedia({ reducedMotion: "reduce" })` or an equivalent fresh context.

Evidence: `/work/.evidence/verification-4/live/system-reduced-motion.json`.

## What passed

- Clean `npm ci`: 60 packages and zero audit vulnerabilities.
- Local `npm test`: 5/5 unit and 48/48 browser tests.
- Local `npm run build`: passed and produced `dist/`.
- Full live browser suite: 48/48 passed.
- All 16 declared claim commands passed independently locally and live.
- The repaired `opt-in-run-storage` command passed 10 consecutive live invocations without retries: 20/20 browser-project runs.
- Fresh desktop and Pixel 5 clients showed active Camp 1, the plain job title, audience, sample action, resources, and first complete choice before scrolling.
- Both fresh clients entered the isolated demo in one click and reached **A shared dawn** after six choices at 60 FPS.
- Demo reset returned all resources to 7. The persistent demo label remained at the ending, and reset/exit did not change a real-data sentinel.
- No console, page, cross-origin, or non-GET request errors occurred in the independent runs.
- Axe found no serious or critical issues across root, demo, legal, purchase-status, and designed-404 routes.
- Twelve independent route/profile structure and target audits found no target below 44 × 44 CSS pixels and no structural or overflow failure.
- Keyboard inputs, focus return, restart cancellation, invalid-save recovery, 200% text, offline reload, and the in-game reduced-motion setting passed.
- Lighthouse mobile scored 100 in Performance, Accessibility, Best Practices, and SEO. LCP was 1,375 ms, CLS 0, and TBT 40 ms.
- `/opt/fleet/lib/verify-url.sh` passed against the live URL using the work-order evidence directory.
- Live route status, designed 404 behavior, security headers, internal links, and public one-time offer metadata passed.

## Earlier findings

All earlier findings remain resolved: active root play, phone first-screen visibility, complete claim coverage, the fleet helper path correction, real-play privacy and opt-in storage claims, 44 × 44 text-link targets, deliberate 404 behavior, and the Repair 4 settings-save race.

## Product and offer status

The complete authored game remains intact: six irreversible choices and four reachable endings. The complete edition remains **$6 once**, not a subscription. Public offer metadata contains only public fields. Sales, checkout, activation, and entitlement are still honestly unavailable pending external billing registration and entitlement QA.

No multiplayer, backend, shared database, runtime AI, staging, or additional product resource is part of this product.

## Reproduce

```sh
npm ci
npm test
npm run build
BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e
/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-4/helper
```

Run each command in `.factory/claims.json` separately for the claim sweep. The system reduced-motion defect requires a fresh browser context whose operating-system preference is set to `reduce`; do not substitute the in-game checkbox for that check.
