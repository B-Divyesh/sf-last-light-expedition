# Last Light Expedition

Last Light Expedition is a browser game for players who want one complete short run. Choose one route at each of six camps. Each irreversible choice changes warmth, supplies, or Mara's trust. The route ends with one of four conclusions.

The design target is 15–25 minutes at a reading pace. It is a session target, not a timed claim. The game has no combat, endless progression, accounts, analytics, adverts, or tracking.

## Play the sample

Open `/demo` or choose **Try it with sample data** on the first screen. The sample starts at Camp 1 with weather seed `MIST-042` and all resources at 7. Its state stays in memory and is discarded on reset or exit. It never reads or writes real-play storage.

Controls:

- Pointer or touch: choose any route button.
- Keyboard: Tab to a route and press Enter or Space.
- Number keys: press 1, 2, or 3 for the visible routes.
- Settings: sound starts muted, reduced motion is available, and an unfinished run is saved only after opt-in.

Every run presents six choices and reaches an ending. Restart clears every decision and resets all three resources to 7. The same seed and choices always produce the same result.

## Complete edition

The Complete Edition has a **$6 one-time price**. It is not a subscription. It includes eight additional authored weather seeds, eight relic variants, and a printable route log. Sales are not open because billing registration and license validation have not passed product QA.

The public operator metadata is in `.factory/billing-offer.json`. No key, checkout placeholder, or payment-provider credential exists in this repository.

## Local data and offline use

The game has no accounts, analytics, adverts, or tracking. Real-play settings use the `last-light:settings` localStorage key. An unfinished run uses `last-light:run` only when the player enables **Remember unfinished run**. Settings has an erase action.

After the first successful visit, the service worker reloads the game offline. The demo and its sample content also remain playable offline. The offline claim has an isolated Playwright browser test.

## Develop

Prerequisites: Node.js 20 or newer and npm.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`. The direct demo route is `http://127.0.0.1:5173/demo`.

## Verify

```sh
npm test
npm run test:unit
npm run test:e2e
npm run test:a11y
npm run build
```

`npm test` runs deterministic rule tests and Playwright tests in desktop and phone viewports. Claim-specific commands are listed in `.factory/claims.json`. The production build is written to `dist/`.

## Deploy

Deploy the contents of `dist/` as one static site at `https://last-light-expedition.sociobot.in`. Keep `staticwebapp.config.json` with the deployment so route fallback, security headers, cache policy, and the designed 404 remain active.

Do not deploy `premium/route-log.html` publicly. It is a paid-edition source deliverable for the billing and packaging operator.

## Original work

All game writing and route graphics were authored for this repository. The valley artwork was generated for this game with the factory image deployment. Its prompt, review, and provenance are recorded in `.factory/design.md` and `assets/src/expedition-valley.prompt.json`.

The project is MIT licensed. The game is fiction and does not provide survival advice.
