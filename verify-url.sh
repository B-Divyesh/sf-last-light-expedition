#!/usr/bin/env bash
set -euo pipefail

target_url="${1:-https://last-light-expedition.sociobot.in/}"

node --input-type=module - "$target_url" <<'NODE'
import { chromium } from "@playwright/test";

const target = process.argv[2];
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ serviceWorkers: "block" });
const page = await context.newPage();
const consoleErrors = [];
const pageErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  const response = await page.goto(target, { waitUntil: "networkidle" });
  const result = await page.evaluate(() => {
    const images = [...document.querySelectorAll("img")];
    const buttons = [...document.querySelectorAll("button")];
    return {
      title: document.title.trim(),
      lang: document.documentElement.lang,
      main_count: document.querySelectorAll("main").length,
      h1_count: document.querySelectorAll("h1").length,
      images_without_alt: images.filter((image) => !image.hasAttribute("alt")).length,
      unnamed_buttons: buttons.filter((button) => {
        const name = button.getAttribute("aria-label") || button.textContent || "";
        return name.trim().length === 0;
      }).length,
    };
  });
  const failures = [];
  if (!response || !response.ok()) failures.push(`HTTP status ${response?.status() ?? "missing"}`);
  if (!result.title || result.title.length > 60) failures.push("title is missing or longer than 60 characters");
  if (result.lang !== "en") failures.push(`html lang is ${JSON.stringify(result.lang)}, expected "en"`);
  if (result.main_count !== 1) failures.push(`found ${result.main_count} main landmarks, expected 1`);
  if (result.h1_count !== 1) failures.push(`found ${result.h1_count} h1 elements, expected 1`);
  if (result.images_without_alt !== 0) failures.push(`${result.images_without_alt} images lack alt attributes`);
  if (result.unnamed_buttons !== 0) failures.push(`${result.unnamed_buttons} buttons lack accessible names`);
  if (consoleErrors.length) failures.push(`${consoleErrors.length} console errors`);
  if (pageErrors.length) failures.push(`${pageErrors.length} page errors`);

  console.log(JSON.stringify({
    url: target,
    status: response?.status() ?? null,
    ...result,
    console_error_count: consoleErrors.length,
    page_error_count: pageErrors.length,
    passed: failures.length === 0,
  }, null, 2));

  if (failures.length) {
    for (const failure of failures) console.error(`FAIL: ${failure}`);
    process.exitCode = 1;
  }
} finally {
  await context.close();
  await browser.close();
}
NODE
