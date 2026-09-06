import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ headless: true });
const report = { baseURL, captured_at: new Date().toISOString(), desktop: {}, phone: {} };

async function inspect(name, viewport, isMobile = false) {
  const context = await browser.newContext({ viewport, isMobile, reducedMotion: "reduce" });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const requests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("request", (request) => requests.push(request.url()));
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `/work/.evidence/${name}-first-screen.png`, fullPage: false });
  const firstScreen = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim(),
    main: Boolean(document.querySelector("main")),
    primary: document.querySelector('[data-action="try-demo"]')?.textContent?.trim(),
    viewport: { width: innerWidth, height: innerHeight },
    scrollWidth: document.documentElement.scrollWidth,
  }));
  await page.getByRole("button", { name: "Try it with sample data" }).click();
  const choices = ["Share the load", "Follow Mara", "Rest in the shallow cave", "Use the signal lens", "Let Mara decide", "Work the hinge together"];
  for (const choice of choices) await page.getByRole("button", { name: new RegExp(choice, "i") }).click();
  await page.screenshot({ path: `/work/.evidence/${name}-end-screen.png`, fullPage: false });
  const ending = await page.getByRole("heading", { name: "A shared dawn" }).textContent();
  const fps = await page.evaluate(async () => {
    const stamps = [];
    await new Promise((resolve) => {
      const tick = (time) => {
        stamps.push(time);
        if (stamps.length >= 90) resolve(); else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    return ((stamps.length - 1) * 1000) / (stamps.at(-1) - stamps[0]);
  });
  report[name] = {
    firstScreen,
    ending,
    choices_completed: choices.length,
    animation_frame_rate_fps: Number(fps.toFixed(1)),
    console_errors: consoleErrors,
    page_errors: pageErrors,
    external_requests: requests.filter((url) => new URL(url).origin !== new URL(baseURL).origin),
  };
  await context.close();
}

await inspect("desktop", { width: 1440, height: 900 });
await inspect("phone", { width: 390, height: 844 }, true);
await browser.close();
await writeFile("/work/.evidence/browser-verification.json", `${JSON.stringify(report, null, 2)}\n`);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
