# Visual thesis: field notes at the edge of daylight

Last Light Expedition uses a cinematic environmental field-journal direction. The game map is a single cold valley viewed from above at dusk, while the controls resemble paper route cards pinned over it. This makes route choice readable first and atmospheric second. It avoids the card-grid look of a general web app.

## Palette

- `night` `#101819`: the valley and page background.
- `pine` `#1b2b28`: raised terrain and panels.
- `paper` `#f3ead3`: primary text and route notes.
- `mist` `#b7c5bc`: secondary text.
- `ember` `#f0a34b`: the one primary action and current route.
- `ember-ink` `#251609`: text on ember.
- `lichen` `#9fc18d`: safety and completed camps.
- `rust` `#d97762`: danger and resource warnings.

All text and control pairs meet WCAG AA contrast. State always includes a word or symbol, never color alone.

## Type and spacing

Headings use Georgia with tight tracking, like an annotated field journal. Body and controls use the local system sans stack for clear play at phone sizes. The scale is 16, 18, 22, 30, and 48 pixels. Spacing follows an 8-pixel rhythm, with 4-pixel adjustments only inside compact meters.

## Shape and layout

The active expedition fills the first screen. On desktop, the playable ledger occupies the left edge while the route map stays visible to its right. On phones, the ledger comes first so the job, sample action, resources, camp report, and first route choice are visible in the 393 × 727 viewport. The map becomes a short strip after the controls. Angled route lines and clipped paper corners supply the signature shape. Controls remain at least 44 pixels tall.

## Interaction grammar

A fresh root visit starts active play at Camp 1. A choice previews its exact resource change before it is taken. Once chosen, the old fork closes and the route advances to the next camp. Completed nodes receive a drawn ring. Keyboard players use Tab plus Enter or Space; number keys 1–3 also choose the visible options. The settings dialog traps focus and returns focus to its opener.

## Motion

Route progress draws forward in 240 ms and the light marker drifts by at most 12 pixels. Choice feedback fades in place. There is no flashing or looping essential motion. Reduced-motion mode makes every transition immediate and stops atmospheric drift. The game pauses its frame clock when the tab is hidden and clamps long frames.

## Difficulty curve

Camps one and two teach the warmth, supplies, and trust trade. Camps three and four introduce weather penalties and relic use. Camps five and six force a sacrifice. Every run reaches an ending after six choices; four endings depend on final resources, trust, relic use, and the selected route.

## Original asset prompt sheet

Use case: `stylized-concept`. Asset: wide landing/game background and social crop. Subject: an empty six-camp mountain route seen obliquely from above, with a tiny amber tent light at the near ridge and a pale observatory at the far ridge. World: a wind-cut valley at the final hour before night. Medium: tactile gouache, charcoal contour marks, subtle paper grain, editorial landscape illustration. Composition: strong S-shaped route from lower left to upper right; calm dark negative space along the left edge for the play ledger. Light: cold blue-green dusk with one restrained amber glow. Palette: night, pine, paper, mist, ember, lichen, rust. Avoid: people, readable text, letters, logos, watermarks, photorealism, neon fantasy, busy stars, gradients, brands, copied game art.

Generation: Azure AI Foundry factory image deployment via `/opt/fleet/lib/gen-image.sh`, 2026-09-06. The generated scene is original to this product. It is disclosed in the footer. SVG route marks, compass, resource symbols, and favicon are hand-authored in this repository under MIT.
