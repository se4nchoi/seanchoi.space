// Prints the development-only /_print/portfolio page to a private PDF.
//
// Usage: start `pnpm dev`, then run `pnpm portfolio:pdf [baseUrl]`.
// Output goes to private/portfolio/ (git-ignored). The PDF is an application
// artifact to attach privately; it is never served by the site.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const url = `${baseUrl.replace(/\/$/, "")}/_print/portfolio`;

const chromeCandidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = chromeCandidates.find((path) => existsSync(path));
if (!chrome) {
  console.error("Chrome or Edge not found. Set CHROME_PATH.");
  process.exit(1);
}

const page = await fetch(url).catch(() => null);
if (!page || page.status !== 200) {
  console.error(`${url} is not reachable (status ${page?.status ?? "none"}). Start \`pnpm dev\` first.`);
  process.exit(1);
}

const port = 9300 + Math.floor(Math.random() * 500);
const browser = spawn(
  chrome,
  ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "pdf-"))}`, "about:blank"],
  { stdio: "ignore" }
);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let targets;
  for (let attempt = 0; attempt < 50 && !targets; attempt++) {
    targets = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json()).catch(() => undefined);
    if (!targets) await sleep(200);
  }
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve));
  let nextId = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = ++nextId;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Emulation.setEmulatedMedia", { media: "print", features: [{ name: "prefers-color-scheme", value: "light" }] });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(6000); // let images and fonts settle

  const result = await send("Page.printToPDF", { printBackground: true, preferCSSPageSize: true });
  if (!result.result?.data) throw new Error(`printToPDF failed: ${JSON.stringify(result.error)}`);

  const outDir = join(process.cwd(), "private", "portfolio");
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, `sean-choi-portfolio-${new Date().toISOString().slice(0, 10)}.pdf`);
  writeFileSync(outFile, Buffer.from(result.result.data, "base64"));
  console.log(`Wrote ${outFile}`);
  ws.close();
} finally {
  browser.kill();
}
