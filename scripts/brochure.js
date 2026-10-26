#!/usr/bin/env node
// Renders templates/brochure.html to public/brochure/taipreneur-brochure.pdf (two A4 pages).
// Needs Playwright with Chromium installed: npx playwright install chromium
const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const root = path.join(__dirname, "..");
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + path.join(root, "templates/brochure.html"), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(root, "public/brochure/taipreneur-brochure.pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log("wrote public/brochure/taipreneur-brochure.pdf");
})();
