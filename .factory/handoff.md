# Handoff

## Outcome

Independent Verification 2 completed against <https://last-light-expedition.sociobot.in>.

- Candidate implementation: `27fd6407972215f43a19dc32396f014f9ae627dd`
- Documentation baseline reviewed: `252148d52974c5aec1dda0fee4116fea44b559d8`
- Verdict: **FAIL**
- Findings: **2** (one major, one minor)
- Untested public claims: **2**

No product code was changed. The full report is `.factory/verification-2.md`.

## What passed

The Repair 2 gameplay changes are live. Fresh desktop and 393 × 727 phone clients show the job, audience, sample action, active Camp 1 resources/report, and all three choices before scrolling. Independent desktop and phone runs reached **A shared dawn** after six irreversible choices. Demo reset, exit, isolation, end-screen labeling, real opt-in persistence, erase, invalid-state recovery, keyboard input, focus, reduced motion, offline reload, legal routes, designed 404, and public one-time offer behavior all worked.

All 14 declared claim commands passed independently. Clean local results were 5/5 unit and 42/42 browser tests; the live suite was 42/42. Live Axe passed. The fleet-installed `/opt/fleet/lib/verify-url.sh` passed. Lighthouse scored 100 in Performance, Accessibility, Best Practices, and SEO. Live JavaScript and CSS hashes match the candidate build.

## Findings to repair

1. Add declared, exactly tagged outcome coverage for two public promise categories: real-play no-account/no-cross-origin behavior, and opt-in unfinished-run persistence plus erase. Current manual checks pass, but the existing `local-privacy` test covers demo only and `settings-persist` covers only a setting.
2. Increase the effective target size of the header **Play** link (about 33 × 44), desktop **Price** link (about 39 × 44), and privacy email link (about 162 × 19) to at least 44 × 44 CSS pixels.

After repair, redeploy the product candidate and repeat independent Verification 2. The separate billing operator must still register `last-light-expedition-complete` and validate checkout plus entitlement before sales can open.

## Reproduce

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/verify-url.sh https://last-light-expedition.sociobot.in /work/.evidence/verification-2/live
BASE_URL=https://last-light-expedition.sociobot.in npm run test:e2e
BASE_URL=https://last-light-expedition.sociobot.in npm run test:a11y
```

Run every command in `.factory/claims.json` separately. Evidence for this pass is under `/work/.evidence/verification-2/`, including screenshots, claim logs, browser checks, route/link results, storage checks, runtime hashes, Axe, and Lighthouse output.
