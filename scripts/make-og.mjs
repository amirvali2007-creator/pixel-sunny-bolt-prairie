import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@500;800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px; height: 630px;
      background: #F3EEE4;
      font-family: Vazirmatn, Tahoma, sans-serif;
      color: #1C1917;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sheet {
      width: 1040px; height: 470px;
      background: #FFFCF7;
      border-radius: 28px;
      box-shadow: 0 18px 40px rgba(28,25,23,0.12);
      overflow: hidden;
      display: grid;
      grid-template-columns: 360px 1fr;
    }
    .bind { height: 14px; background: #2F6F7E; grid-column: 1 / -1; }
    .cal { padding: 36px 28px 28px 20px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
    }
    .cell {
      height: 36px;
      border-radius: 6px;
      background: #F3EEE4;
    }
    .cell.on { background: #D7E8EC; }
    .cell.hot { background: #F0D6D4; }
    .cell.ok { background: #D0E8DA; }
    .copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 24px 56px 40px 40px;
    }
    h1 { font-size: 84px; font-weight: 800; line-height: 1.05; letter-spacing: -0.03em; }
    .rule { width: 88px; height: 6px; background: #2F6F7E; border-radius: 99px; margin: 22px 0; }
    p { font-size: 28px; font-weight: 500; color: #6F675F; }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="bind"></div>
    <div class="cal">
      <div class="grid">
        ${Array.from({ length: 28 }, (_, i) => {
          const cls = i === 9 || i === 16 ? "hot" : i === 11 || i === 18 ? "ok" : i === 4 || i === 22 ? "on" : "";
          return `<div class="cell ${cls}"></div>`;
        }).join("")}
      </div>
    </div>
    <div class="copy">
      <h1>پلنر تحصیلی</h1>
      <div class="rule"></div>
      <p>مدیریت درس، تکلیف و امتحان</p>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630, deviceScaleFactor: 1 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/og-raw.png", type: "png" });
await browser.close();
writeFileSync("/tmp/og-source.html", html);
console.log("og raw written");
