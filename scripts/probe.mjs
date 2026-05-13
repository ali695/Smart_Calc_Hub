import sirv from "sirv";
import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const pristine = readFileSync(join(DIST, "index.html"), "utf8");
const assets = sirv(DIST, { single: false, dev: false });
const server = createServer((req, res) => {
  if (/\.[a-zA-Z0-9]+(\?|$)/.test(req.url)) return assets(req, res);
  res.setHeader("Content-Type", "text/html");
  res.end(pristine);
}).listen(4174);

const browser = await puppeteer.launch({ headless: "new", args:["--no-sandbox"] });
for (const route of ["/", "/calculator/bmi", "/calculator/loan", "/about"]) {
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto("http://localhost:4174" + route, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.getElementById("root")?.children.length > 0 && !!document.querySelector("h1"), { timeout: 15000 }).catch(()=>{});
  await new Promise(r=>setTimeout(r,800));
  const info = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector("h1")?.textContent ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
  }));
  console.log(route, JSON.stringify(info), errs.length ? "ERRORS:"+errs.join("|") : "");
  await page.close();
}
await browser.close(); server.close();
