import sirv from "sirv";
import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
const pristine = readFileSync("dist/index.html", "utf8");
const assets = sirv("dist", { single: false });
const server = createServer((req, res) => {
  if (/\.[a-zA-Z0-9]+(\?|$)/.test(req.url)) return assets(req, res);
  res.setHeader("Content-Type", "text/html"); res.end(pristine);
}).listen(4175);
const browser = await puppeteer.launch({ headless: "new", args:["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("http://localhost:4175/calculator/bmi", { waitUntil: "networkidle0" });
await page.waitForFunction(() => document.querySelector("h1"), {timeout:15000}).catch(()=>{});
await new Promise(r=>setTimeout(r,800));
const info = await page.evaluate(() => {
  const titles = [...document.querySelectorAll('title')].map(t => t.textContent);
  return { docTitle: document.title, allTitleTags: titles, headHTML: document.head.outerHTML.slice(0, 1500) };
});
console.log(JSON.stringify(info, null, 2));
await browser.close(); server.close();
