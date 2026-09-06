import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function chooseNames(page: Page, names: string[]) {
  for (const name of names) {
    const choice = page.getByRole("button", { name: new RegExp(name, "i") });
    await expect(choice).toBeVisible();
    await choice.click();
  }
}

test("first screen states the job, audience, action, and shows the game", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Choose a route through six camps" })).toBeVisible();
  await expect(page.getByText("For browser players who want one complete run without an endless grind.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Try it with sample data" })).toBeVisible();
  await expect(page.getByLabel("Six-camp route map")).toBeVisible();
});

test("@claim:complete-run six irreversible choices reach an end screen", async ({ page }) => {
  await page.goto("/demo");
  const path = ["Share the load", "Follow Mara", "Rest in the shallow cave", "Use the signal lens", "Let Mara decide", "Work the hinge together"];
  for (let index = 0; index < path.length; index += 1) {
    const button = page.getByRole("button", { name: new RegExp(path[index], "i") });
    await button.click();
    await expect(button).toHaveCount(0);
    if (index < 5) await expect(page.getByLabel("Expedition controls").getByText(`Camp ${index + 2} of 6`, { exact: true })).toBeVisible();
  }
  await expect(page.getByRole("heading", { name: "A shared dawn" })).toBeVisible();
  await expect(page.getByText("Expedition complete · 6 camps reached")).toBeVisible();
});

test("@claim:four-endings every ending is reachable through rendered play", async ({ page }) => {
  const paths = [
    { name: "A shared dawn", choices: ["Share the load", "Follow Mara", "Rest in the shallow cave", "Use the signal lens", "Let Mara decide", "Work the hinge together"] },
    { name: "The observatory signal", choices: ["Climb to the stone crossing", "Recover the cache", "Rest in the shallow cave", "Keep the lens wrapped", "Burn oil on the climb", "Force the observatory door"] },
    { name: "The sheltered return", choices: ["Dry the rope", "Recover the cache", "Rest in the shallow cave", "Keep the lens wrapped", "Pitch the canvas", "Descend to the return shelter"] },
    { name: "The light goes out", choices: ["Climb to the stone crossing", "Recover the cache", "Take the ridge marker", "Cut straight across", "Burn oil on the climb", "Force the observatory door"] },
  ];
  for (const ending of paths) {
    await page.goto("/demo");
    await chooseNames(page, ending.choices);
    await expect(page.getByRole("heading", { name: ending.name })).toBeVisible();
  }
});

test("@claim:restart-reset restart clears decisions and resources", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: /Share the load/i }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Restart" }).click();
  await expect(page.getByLabel("Expedition controls").getByText("Camp 1 of 6", { exact: true })).toBeVisible();
  for (const name of ["warmth", "supplies", "trust"]) {
    await expect(page.getByRole("meter", { name })).toHaveAttribute("aria-valuenow", "7");
  }
});

test("@claim:demo-isolation demo label, reset, and settings never alter real data", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("real:sentinel", "unchanged"));
  await page.goto("/demo");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await page.getByRole("button", { name: /Share the load/i }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("Sound effects").check();
  await page.getByRole("button", { name: "Save settings" }).click();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByLabel("Expedition controls").getByText("Camp 1 of 6", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual({ "real:sentinel": "unchanged" });
  await page.getByRole("button", { name: "Start for real" }).click();
  await expect(page.getByText("Demo — sample data, nothing is saved")).toHaveCount(0);
});

test("@claim:offline-reload demo reloads and remains playable offline", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("/demo");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await context.setOffline(true);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Choose a route through six camps" })).toBeVisible();
  await page.getByRole("button", { name: /Share the load/i }).click();
  await expect(page.getByLabel("Expedition controls").getByText("Camp 2 of 6", { exact: true })).toBeVisible();
  await context.close();
});

test("@claim:local-privacy full play makes same-origin requests only", async ({ page, baseURL }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/demo");
  await chooseNames(page, ["Share the load", "Follow Mara", "Rest in the shallow cave", "Use the signal lens", "Let Mara decide", "Work the hinge together"]);
  const expectedOrigin = new URL(baseURL!).origin;
  expect(requests.length).toBeGreaterThan(0);
  expect(requests.filter((url) => new URL(url).origin !== expectedOrigin)).toEqual([]);
});

test("@claim:settings-persist real-play settings survive reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Start a new expedition" }).click();
  await page.getByRole("button", { name: "Settings" }).click();
  await page.getByLabel("Sound effects").check();
  await page.getByRole("button", { name: "Save settings" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Settings" }).click();
  await expect(page.getByLabel("Sound effects")).toBeChecked();
});

test("@claim:one-time-offer public offer matches price and unavailable status", async ({ page }) => {
  await page.goto("/");
  const offer = await page.evaluate(async () => (await fetch("/billing-offer.json")).json() as Promise<{ price_minor: number; currency: string; price_type: string }>);
  expect(offer).toMatchObject({ price_minor: 600, currency: "USD", price_type: "one_time_price" });
  await expect(page.getByRole("heading", { name: "Complete edition" })).toBeVisible();
  await expect(page.getByText("$6", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Check purchase availability" }).click();
  await expect(page.getByRole("heading", { name: "Purchases are not open yet" })).toBeVisible();
  await expect(page.getByText("No checkout or activation has passed product QA.", { exact: false })).toBeVisible();
});

test("keyboard shortcut chooses and focus follows the next camp", async ({ page }) => {
  await page.goto("/demo");
  await page.keyboard.press("2");
  await expect(page.getByLabel("Expedition controls").getByText("Camp 2 of 6", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Recover the cache/i })).toBeFocused();
});

test("invalid saved data recovers to a new-run screen", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("last-light:settings", JSON.stringify({ rememberRun: true }));
    localStorage.setItem("last-light:run", JSON.stringify({ seedId: "MIST-042", campIndex: 2 }));
  });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Start a new expedition" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Try it with sample data" })).toBeVisible();
});

test("history navigation restores the route and focuses its heading", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Privacy", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Your game data stays in your browser" })).toBeFocused();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "Choose a route through six camps" })).toBeFocused();
});

test("settings dialog returns focus to its opener", async ({ page }) => {
  await page.goto("/demo");
  const opener = page.getByRole("button", { name: "Settings" });
  await opener.click();
  await expect(page.getByRole("dialog", { name: "Game settings" })).toBeVisible();
  await page.getByRole("button", { name: "Close settings" }).click();
  await expect(opener).toBeFocused();
});

test("routes have distinct titles, one h1, legal content, and a designed 404", async ({ page }) => {
  const routes = [
    ["/", "Last Light Expedition — choose a six-camp route"],
    ["/demo", "Demo — Last Light Expedition"],
    ["/privacy", "Privacy — Last Light Expedition"],
    ["/terms", "Terms — Last Light Expedition"],
    ["/license", "Purchase status — Last Light Expedition"],
  ];
  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
  }
  await page.goto("/route-that-does-not-exist");
  await expect(page.getByRole("heading", { name: "This route does not exist" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to the game" })).toBeVisible();
});

test("@a11y main routes have no serious or critical axe findings", async ({ page }) => {
  for (const path of ["/", "/demo", "/privacy", "/terms", "/license", "/missing-page"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    const important = results.violations.filter((item) => ["serious", "critical"].includes(item.impact ?? ""));
    expect(important, `${path}: ${important.map((item) => `${item.id} ${item.help}`).join(", ")}`).toEqual([]);
  }
});

test("reduced-motion setting remains playable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/demo");
  await page.getByRole("button", { name: /Share the load/i }).click();
  await expect(page.getByLabel("Expedition controls").getByText("Camp 2 of 6", { exact: true })).toBeVisible();
});
