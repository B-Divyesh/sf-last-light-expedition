import "./style.css";
import { camps, choose, createGame, effectText, endings, weatherSeeds, type GameState, type Resources } from "./game";
import { clearRun, defaultSettings, loadRun, loadSettings, saveRun, saveSettings, type Settings } from "./storage";

const app = document.querySelector<HTMLDivElement>("#app")!;
if (!app) throw new Error("App root is missing");

const build = "1.1.1";
const origin = "https://last-light-expedition.sociobot.in";
let game: GameState | null = null;
let demoMode = false;
let settings: Settings = window.location.pathname.replace(/\/+$/, "") === "/demo" ? { ...defaultSettings } : loadSettings();
let lastFocused: HTMLElement | null = null;
let frameHandle = 0;
let previousFrame = 0;
let lightOffset = 0;
const systemMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function motionIsReduced(): boolean {
  return settings.reducedMotion || systemMotionQuery.matches;
}

function route(): string {
  const clean = window.location.pathname.replace(/\/+$/, "");
  return clean || "/";
}

function navigate(path: string): void {
  const wasDemo = demoMode;
  if (path === "/demo" && !wasDemo) {
    game = createGame();
    settings = { ...defaultSettings };
  } else if (wasDemo && path !== "/demo") {
    settings = loadSettings();
    game = settings.rememberRun ? loadRun() : null;
  }
  history.pushState({}, "", path);
  render(true);
}

function setMetadata(title: string, description: string, path: string): void {
  document.title = title;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", `${origin}${path}`);
}

function header(): string {
  return `
    <a class="skip-link" href="#main">Skip to game</a>
    <header class="site-header">
      <a class="wordmark" href="/" data-link aria-label="Last Light Expedition home">
        <svg aria-hidden="true" viewBox="0 0 40 40"><path d="M20 3 33 33H7L20 3Zm0 9-6 15h12l-6-15Z"/><circle cx="20" cy="28" r="3"/></svg>
        <span>Last Light Expedition</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/" data-link>Play</a>
        <a href="/demo" data-link>Demo</a>
        <a href="/#complete-edition">Price</a>
        <a href="/privacy" data-link>Privacy</a>
      </nav>
    </header>`;
}

function footer(): string {
  return `
    <footer>
      <p>Choose six irreversible route decisions in one short browser run.</p>
      <nav aria-label="Footer navigation">
        <a href="/privacy" data-link>Privacy</a>
        <a href="/terms" data-link>Terms</a>
        <a href="https://sociobot.in" rel="external">Built by Param Factory <span class="visually-hidden">(external site)</span></a>
      </nav>
      <p class="fine-print">Version ${build}. Valley artwork was generated for this game with Azure AI Foundry.</p>
    </footer>`;
}

function demoBanner(): string {
  if (!demoMode) return "";
  return `
    <aside class="demo-banner" aria-label="Demo status">
      <strong>Demo — sample data, nothing is saved</strong>
      <div>
        <button class="text-button" type="button" data-action="reset-demo">Reset demo</button>
        <button class="text-button" type="button" data-action="start-real">Start for real</button>
      </div>
    </aside>`;
}

function resourceMeter(name: keyof Resources, value: number): string {
  const safe = Math.max(0, Math.min(14, value));
  return `
    <div class="resource" data-resource="${name}">
      <div><span>${name}</span><strong>${value}</strong></div>
      <div class="meter" role="meter" aria-label="${name}" aria-valuemin="0" aria-valuemax="14" aria-valuenow="${safe}">
        <span style="--meter:${(safe / 14) * 100}%"></span>
      </div>
    </div>`;
}

function routeMap(state: GameState | null): string {
  const current = state?.campIndex ?? 0;
  const points = [[70, 320], [155, 267], [252, 242], [340, 168], [438, 142], [530, 70]];
  const lines = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1];
    return `<line class="route-segment ${current > index ? "complete" : ""}" x1="${point[0]}" y1="${point[1]}" x2="${next[0]}" y2="${next[1]}" />`;
  }).join("");
  const nodes = points.map((point, index) => {
    const status = state?.ending && index === 5 ? "finish" : index < current ? "complete" : index === current ? "current" : "upcoming";
    return `<g class="route-node ${status}" transform="translate(${point[0]} ${point[1]})">
      <circle r="14"/><text y="5" text-anchor="middle">${index + 1}</text>
    </g>`;
  }).join("");
  return `
    <div class="map-panel" aria-label="Six-camp route map">
      <picture>
        <source srcset="/assets/expedition-valley.webp" type="image/webp" />
        <img src="/assets/expedition-valley.jpg" width="1536" height="1024" alt="A painted mountain valley shows the six-camp route to a distant observatory." fetchpriority="high" decoding="async" />
      </picture>
      <svg class="route-overlay" viewBox="0 0 600 380" role="img" aria-label="Route progress from camp 1 to camp 6">
        ${lines}${nodes}
        <circle class="light-marker" cx="70" cy="320" r="4" style="transform: translateX(${lightOffset}px)" />
      </svg>
      <div class="map-key">${state ? `Camp ${Math.min(current + 1, 6)} of 6` : "Six camps · one ending"}</div>
    </div>`;
}

function choiceList(state: GameState): string {
  const camp = camps[state.campIndex];
  if (!camp) return "";
  return `
    <div class="camp-heading">
      <div><p class="eyebrow">${camp.name} of 6</p><h2>${camp.location}</h2></div>
      <span class="seed-chip">Seed ${state.seedId}</span>
    </div>
    <p class="report">${camp.report}</p>
    <fieldset class="choices">
      <legend>Choose one route. You cannot undo it.</legend>
      ${camp.choices.map((choice, index) => `
        <button type="button" class="choice" data-choice="${choice.id}">
          <span class="choice-number" aria-hidden="true">${index + 1}</span>
          <span><strong>${choice.title}</strong><small>${choice.detail}</small></span>
          <em>${effectText(choice)}</em>
        </button>`).join("")}
    </fieldset>
    <p class="weather-note"><strong>${weatherSeeds.find((seed) => seed.id === state.seedId)?.name}:</strong> ${weatherSeeds.find((seed) => seed.id === state.seedId)?.note}</p>`;
}

function endingPanel(state: GameState): string {
  const ending = endings[state.ending ?? "return"];
  return `
    <section class="ending" aria-labelledby="ending-title">
      <p class="eyebrow">Expedition complete · ${state.campIndex} camps reached</p>
      <h2 id="ending-title" tabindex="-1">${ending.name}</h2>
      <p>${ending.summary}</p>
      <dl class="run-summary">
        <div><dt>Warmth</dt><dd>${state.resources.warmth}</dd></div>
        <div><dt>Supplies</dt><dd>${state.resources.supplies}</dd></div>
        <div><dt>Trust</dt><dd>${state.resources.trust}</dd></div>
        <div><dt>Relic</dt><dd>${state.relicUsed ? "Used" : "Kept"}</dd></div>
      </dl>
      <button class="primary" type="button" data-action="restart">Play the seed again</button>
      <p class="ending-note">A restart clears every choice and returns all resources to 7.</p>
    </section>`;
}

function gamePanel(state: GameState): string {
  return `
    <section class="game-ledger" aria-label="Expedition controls">
      <div class="play-intro">
        <p class="eyebrow">Last Light Expedition</p>
        <h1 id="page-title" tabindex="-1">Choose a route through a six-camp expedition</h1>
        <p class="lead">For browser players who want one complete authored run with irreversible resource choices and four tested endings.</p>
        ${demoMode ? '<p class="sample-note">This sample starts at Camp 1 with a fixed weather seed and saves nothing.</p>' : `
        <div class="hero-actions">
          <button class="primary" type="button" data-action="try-demo">Try it with sample data</button>
          <span>Opens a fixed run. Saves nothing.</span>
        </div>
        <ul class="plain-facts" aria-label="Game facts">
          <li>Offline after one visit.</li>
          <li>Saves are local.</li>
          <li>Free seed. Complete edition: $6 once.</li>
        </ul>`}
      </div>
      <div class="ledger-status">
        <div class="resources" aria-label="Current resources">
          ${resourceMeter("warmth", state.resources.warmth)}
          ${resourceMeter("supplies", state.resources.supplies)}
          ${resourceMeter("trust", state.resources.trust)}
        </div>
        <div class="ledger-tools">
          <button class="icon-button" type="button" data-action="open-settings" aria-haspopup="dialog">Settings</button>
          <button class="icon-button danger-link" type="button" data-action="restart">Restart</button>
        </div>
      </div>
      <div id="game-status" class="game-status" aria-live="polite"></div>
      ${state.ending ? endingPanel(state) : choiceList(state)}
    </section>`;
}

function landing(): string {
  if (!game) game = createGame();
  const currentGame = game;
  return `
    ${header()}${demoBanner()}
    <main id="main">
      <div class="game-stage is-playing">
        ${gamePanel(currentGame)}
        ${routeMap(currentGame)}
      </div>
      ${!demoMode ? `
      <section class="information" aria-labelledby="how-heading">
        <p class="section-number">01</p>
        <div>
          <h2 id="how-heading">How play works</h2>
          <ol class="steps">
            <li><strong>Read the camp report.</strong><span>See the next obstacle and the current weather.</span></li>
            <li><strong>Spend one resource.</strong><span>Every route changes warmth, supplies, or Mara's trust.</span></li>
            <li><strong>Reach an ending.</strong><span>Your six decisions lead to one of four written conclusions.</span></li>
          </ol>
        </div>
      </section>
      <section class="information quiet-section" aria-labelledby="limits-heading">
        <p class="section-number">02</p>
        <div>
          <h2 id="limits-heading">Local data and limits</h2>
          <p>A run stops after six choices and has no combat or repeatable progression. The story is fiction, not survival advice.</p>
          <p>Saving an unfinished run is optional. You can erase it from Settings or your browser controls.</p>
        </div>
      </section>
      <section class="information price-section" id="complete-edition" aria-labelledby="price-heading">
        <p class="section-number">03</p>
        <div>
          <h2 id="price-heading">Complete edition</h2>
          <p class="price"><strong>$6</strong> one-time price</p>
          <p>Includes eight additional authored weather seeds, eight relic variants, and a printable route log.</p>
          <p class="availability"><strong>Sales are not open yet.</strong> Billing and license activation must pass product QA first.</p>
          <a class="secondary button-link" href="/license" data-link>Check purchase availability</a>
        </div>
      </section>` : ""}
    </main>
    ${settingsDialog()}
    <div class="route-announcer visually-hidden" aria-live="polite"></div>
    ${footer()}`;
}

function settingsDialog(): string {
  return `
    <dialog id="settings-dialog" aria-labelledby="settings-title">
      <form>
        <div class="dialog-heading"><h2 id="settings-title">Game settings</h2><button class="close-button" type="button" data-action="close-settings" aria-label="Close settings">×</button></div>
        <label class="toggle"><span><strong>Sound effects</strong><small>Plays a short tone after a choice.</small></span><input type="checkbox" name="sound" ${settings.sound ? "checked" : ""} /></label>
        <label class="toggle"><span><strong>Reduce motion</strong><small>Stops the map marker drift.</small></span><input type="checkbox" name="reducedMotion" ${settings.reducedMotion ? "checked" : ""} /></label>
        <label class="toggle"><span><strong>Remember unfinished run</strong><small>Saves real play in this browser. Demo play is never saved.</small></span><input type="checkbox" name="rememberRun" ${settings.rememberRun ? "checked" : ""} /></label>
        ${demoMode ? "" : '<button class="danger-button" type="button" data-action="erase-save">Erase saved run</button>'}
        <p id="settings-status" aria-live="polite"></p>
        <button class="primary" type="submit">Save settings</button>
      </form>
    </dialog>`;
}

function legalPage(kind: "privacy" | "terms" | "license"): string {
  const pages = {
    privacy: {
      title: "Privacy — Last Light Expedition",
      heading: "Your game data stays in your browser",
      description: "Read how Last Light Expedition handles local game settings and saved runs.",
      body: `<section><h2>Data this game stores</h2><p>The game stores settings only after you change them. It stores an unfinished run only when you enable that setting.</p><p>Demo play uses memory only. Resetting or leaving the demo discards its state.</p></section><section><h2>Data this game sends</h2><p>A full run needs no account and sends no gameplay or settings to another service. The host receives standard web request logs when it serves a file.</p></section><section><h2>Erase your data</h2><p>Open Settings and choose “Erase saved run.” You can also clear this site's browser storage.</p></section><section><h2>Privacy requests</h2><p>There is no account record to export or correct. Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a> with questions about host request logs.</p></section>`,
    },
    terms: {
      title: "Terms — Last Light Expedition",
      heading: "Terms for playing this expedition",
      description: "Read the terms for the free sample and planned complete edition.",
      body: `<section><h2>Free sample</h2><p>You may play the browser sample for personal use. The story presents fictional choices, not real survival advice.</p></section><section><h2>Complete edition</h2><p>The planned complete edition costs $6 once. It is not a subscription.</p><p>Sales are not open yet. No purchase, license, refund right, or activation exists until checkout passes product QA.</p></section><section><h2>Availability</h2><p>The game is provided as available, without a promise of uninterrupted access. You keep rights granted by applicable consumer law.</p></section>`,
    },
    license: {
      title: "Purchase status — Last Light Expedition",
      heading: "Purchases are not open yet",
      description: "Check the current purchase and license status for Last Light Expedition.",
      body: `<section><h2>Current status</h2><p>The complete edition will cost $6 once. Billing registration and license validation are not connected.</p><p>No checkout or activation has passed product QA. The free six-camp sample remains available.</p><a class="primary button-link" href="/demo" data-link>Play the free sample</a></section>`,
    },
  } as const;
  const page = pages[kind];
  setMetadata(page.title, page.description, `/${kind}`);
  return `${header()}<main id="main" class="legal"><p class="eyebrow">Last Light Expedition</p><h1 id="page-title" tabindex="-1">${page.heading}</h1>${page.body}</main><div class="route-announcer visually-hidden" aria-live="polite"></div>${footer()}`;
}

function notFound(): string {
  setMetadata("Page not found — Last Light Expedition", "Return to the six-camp browser expedition.", "/404");
  return `${header()}<main id="main" class="not-found"><div><p class="eyebrow">404</p><h1 id="page-title" tabindex="-1">This route does not exist</h1><p>The expedition map has no camp at this address.</p><a class="primary button-link" href="/" data-link>Return to the game</a></div>${routeMap(null)}</main><div class="route-announcer visually-hidden" aria-live="polite"></div>${footer()}`;
}

function render(routeChange = false): void {
  const path = route();
  if (path === "/demo") {
    demoMode = true;
    if (!game) game = createGame();
    setMetadata("Demo — Last Light Expedition", "Play the fixed six-camp sample without saving data.", "/demo");
    app.innerHTML = landing();
  } else if (path === "/") {
    demoMode = false;
    setMetadata("Last Light Expedition — play a six-camp route", "Choose irreversible resource decisions across six camps and reach one of four endings in a short browser expedition.", "/");
    app.innerHTML = landing();
  } else if (path === "/privacy" || path === "/terms" || path === "/license") {
    demoMode = false;
    app.innerHTML = legalPage(path.slice(1) as "privacy" | "terms" | "license");
  } else {
    demoMode = false;
    app.innerHTML = notFound();
  }
  bindInteractions();
  updateMotionSetting();
  if (routeChange) {
    const title = document.querySelector<HTMLElement>("h1");
    title?.focus({ preventScroll: true });
    document.querySelector<HTMLElement>(".route-announcer")!.textContent = document.title;
    window.scrollTo({ top: 0, behavior: motionIsReduced() ? "auto" : "smooth" });
  }
}

function playTone(): void {
  if (!settings.sound) return;
  const AudioContextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 330;
  gain.gain.setValueAtTime(0.04, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.12);
  oscillator.addEventListener("ended", () => void context.close());
}

function restartGame(): void {
  if (game && game.choices.length > 0 && !game.ending) {
    const approved = window.confirm("Restart this expedition? All current choices will be cleared and every resource will return to 7.");
    if (!approved) return;
  }
  game = createGame();
  if (!demoMode) saveRun(game, settings.rememberRun);
  render();
  document.querySelector<HTMLElement>(".choice")?.focus();
  announce("The expedition restarted. All resources are 7.");
}

function announce(message: string): void {
  const status = document.querySelector<HTMLElement>("#game-status");
  if (status) status.textContent = message;
}

function startReal(): void {
  demoMode = false;
  settings = loadSettings();
  game = createGame();
  history.pushState({}, "", "/");
  render();
  document.querySelector<HTMLElement>(".choice")?.focus();
}

function takeChoice(choiceId: string): void {
  if (!game) return;
  const oldResources = { ...game.resources };
  try {
    game = choose(game, choiceId);
  } catch (error) {
    announce(error instanceof Error ? `${error.message}. Restart the expedition.` : "The route could not continue. Restart the expedition.");
    return;
  }
  playTone();
  if (!demoMode) saveRun(game, settings.rememberRun);
  const changes = (Object.keys(game.resources) as Array<keyof Resources>)
    .map((name) => ({ name, value: game!.resources[name] - oldResources[name] }))
    .filter(({ value }) => value !== 0)
    .map(({ name, value }) => `${name} ${value > 0 ? "increased" : "decreased"} by ${Math.abs(value)}`)
    .join(", ");
  render();
  if (game.ending) {
    document.querySelector<HTMLElement>("#ending-title")?.focus();
    announce(`Expedition complete. ${endings[game.ending].name}. ${changes}.`);
  } else {
    document.querySelector<HTMLElement>(".choice")?.focus();
    announce(`Choice saved. ${changes}. Now at camp ${game.campIndex + 1} of 6.`);
  }
}

function openSettings(button: HTMLElement): void {
  lastFocused = button;
  const dialog = document.querySelector<HTMLDialogElement>("#settings-dialog");
  const form = dialog?.querySelector<HTMLFormElement>("form");
  if (form) {
    form.querySelector<HTMLInputElement>('[name="sound"]')!.checked = settings.sound;
    form.querySelector<HTMLInputElement>('[name="reducedMotion"]')!.checked = settings.reducedMotion;
    form.querySelector<HTMLInputElement>('[name="rememberRun"]')!.checked = settings.rememberRun;
  }
  dialog?.showModal();
  dialog?.querySelector<HTMLInputElement>("input")?.focus();
}

function persistSettings(dialog: HTMLDialogElement): void {
  const form = dialog.querySelector<HTMLFormElement>("form");
  if (form) {
    const data = new FormData(form);
    settings = {
      sound: data.has("sound"),
      reducedMotion: data.has("reducedMotion"),
      rememberRun: data.has("rememberRun"),
    };
    if (!demoMode) saveSettings(settings);
    if (game && !demoMode) saveRun(game, settings.rememberRun);
    updateMotionSetting();
  }
}

function closeSettings(): void {
  lastFocused?.focus();
}

function bindInteractions(): void {
  document.querySelectorAll<HTMLAnchorElement>("a[data-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      navigate(new URL(link.href).pathname);
    });
  });
  document.querySelectorAll<HTMLElement>("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.dataset.action) {
        case "try-demo": navigate("/demo"); break;
        case "reset-demo": game = createGame(); render(); announce("Demo reset. Camp 1 is ready and all resources are 7."); break;
        case "start-real": startReal(); break;
        case "restart": restartGame(); break;
        case "open-settings": openSettings(button); break;
        case "close-settings": document.querySelector<HTMLDialogElement>("#settings-dialog")?.close("cancelled"); break;
        case "erase-save":
          if (!window.confirm("Erase the saved run on this browser? This cannot be undone.")) break;
          clearRun();
          settings.rememberRun = false;
          saveSettings(settings);
          (document.querySelector<HTMLInputElement>('input[name="rememberRun"]')!).checked = false;
          document.querySelector<HTMLElement>("#settings-status")!.textContent = "Saved run erased. Future runs will not be saved.";
          break;
      }
    });
  });
  document.querySelectorAll<HTMLElement>("[data-choice]").forEach((button) => button.addEventListener("click", () => takeChoice(button.dataset.choice!)));
  const dialog = document.querySelector<HTMLDialogElement>("#settings-dialog");
  const form = dialog?.querySelector<HTMLFormElement>("form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    persistSettings(dialog!);
    dialog!.close("saved");
    announce(settings.rememberRun
      ? "Settings saved. This unfinished run will resume in this browser."
      : "Settings saved. This unfinished run will not be stored.");
  });
  dialog?.addEventListener("close", closeSettings);
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function updateMotionSetting(): void {
  document.documentElement.dataset.reduceMotion = settings.reducedMotion ? "true" : "false";
}

function frame(now: number): void {
  const delta = Math.min(50, now - previousFrame);
  previousFrame = now;
  if (!document.hidden && !motionIsReduced() && delta < 50) {
    lightOffset = Math.sin(now / 1600) * 6;
    document.querySelector<SVGElement>(".light-marker")?.style.setProperty("transform", `translateX(${lightOffset}px)`);
  }
  frameHandle = requestAnimationFrame(frame);
}

window.addEventListener("popstate", () => {
  const targetDemo = route() === "/demo";
  if (targetDemo && !demoMode) {
    game = createGame();
    settings = { ...defaultSettings };
  } else if (!targetDemo && demoMode) {
    settings = loadSettings();
    game = settings.rememberRun ? loadRun() : null;
  }
  render(true);
});
window.addEventListener("keydown", (event) => {
  if (document.querySelector("dialog[open]") || !game || game.ending) return;
  if (["1", "2", "3"].includes(event.key)) {
    const choice = camps[game.campIndex]?.choices[Number(event.key) - 1];
    if (choice) {
      event.preventDefault();
      takeChoice(choice.id);
    }
  }
});
document.addEventListener("visibilitychange", () => { previousFrame = performance.now(); });
systemMotionQuery.addEventListener("change", () => {
  previousFrame = performance.now();
  updateMotionSetting();
});

if (route() === "/") {
  const saved = loadRun();
  game = saved && settings.rememberRun && saved.seedId === "MIST-042" && saved.campIndex >= 0 && saved.campIndex <= 6
    ? saved
    : createGame();
}
render();
frameHandle = requestAnimationFrame(frame);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then((registration) => {
      if (registration.waiting) announce("An update is ready. Reload the page to use it.");
    }).catch(() => {
      // Offline support is optional until the first successful service-worker install.
    });
  });
}

window.addEventListener("beforeunload", () => cancelAnimationFrame(frameHandle));
