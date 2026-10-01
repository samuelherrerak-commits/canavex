// Exporta todo el contenido de octubre listo para subir:
//   reels  → exports/reels/reel-01-es.mp4 (1080×1920, 30 fps, H.264) + portada .jpg
//   carruseles → exports/carruseles/carrusel-01-es/01.png … (1080×1350)
//   historias  → exports/historias/2026-10-01-es-1.png … (1080×1920)
// Uso: npm run export [reels|carruseles|historias]   (requiere ffmpeg en el PATH para los reels)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "exports");
const RENDER = pathToFileURL(path.join(ROOT, "render.html")).href;
const FPS = 30;
const LANGS = ["es", "en"];
const only = process.argv[2];
const pad = (n) => String(n).padStart(2, "0");

// Leer el contenido con los mismos archivos que usa el sitio
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of ["brand.js", "icons.js", "content.js"]) {
  vm.runInContext(await readFile(path.join(ROOT, "assets/js", f), "utf8"), ctx);
}
const CX = ctx.window.CX;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.error("  error en página:", e.message));

async function open(query) {
  await page.goto(`${RENDER}?${query}`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });
}
async function shot(file) {
  const el = await page.$(".frame");
  await el.screenshot({ path: file, type: "png" });
}

if (!only || only === "reels") {
  const dir = path.join(OUT, "reels");
  await mkdir(dir, { recursive: true });
  for (const reel of CX.reels) {
    for (const lang of LANGS) {
      const name = `reel-${pad(reel.id)}-${lang}`;
      await open(`type=reel&id=${reel.id}&lang=${lang}&t=0`);
      const duration = await page.evaluate(() => window.__reel.duration);
      const frames = Math.round((duration / 1000) * FPS);
      const ff = spawn("ffmpeg", [
        "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
        "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        path.join(dir, `${name}.mp4`),
      ], { stdio: ["pipe", "inherit", "inherit"] });
      const done = new Promise((res, rej) => ff.on("close", (c) => (c === 0 ? res() : rej(new Error("ffmpeg " + c)))));
      for (let i = 0; i < frames; i++) {
        await page.evaluate((ms) => window.__reel.seek(ms), (i * 1000) / FPS);
        const buf = await page.screenshot({ type: "jpeg", quality: 95, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
        if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
      }
      ff.stdin.end();
      await done;
      // Portada: el momento en que el titular del gancho ya está completo
      await page.evaluate(() => window.__reel.seek(1300));
      await page.screenshot({ path: path.join(dir, `${name}.jpg`), type: "jpeg", quality: 90, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
      console.log("✓", name, `${frames} cuadros`);
    }
  }
}

if (!only || only === "carruseles") {
  for (const car of CX.carousels) {
    for (const lang of LANGS) {
      const dir = path.join(OUT, "carruseles", `carrusel-${pad(car.id)}-${lang}`);
      await mkdir(dir, { recursive: true });
      for (let i = 0; i < car.slides.length; i++) {
        await open(`type=carousel&id=${car.id}&slide=${i}&lang=${lang}`);
        await shot(path.join(dir, `${pad(i + 1)}.png`));
      }
      console.log("✓ carrusel", car.id, lang, car.slides.length, "láminas");
    }
  }
}

if (!only || only === "historias") {
  const dir = path.join(OUT, "historias");
  await mkdir(dir, { recursive: true });
  for (const st of CX.stories) {
    for (const lang of LANGS) {
      for (let f = 0; f < 2; f++) {
        await open(`type=story&id=${st.id}&frame=${f}&lang=${lang}`);
        await shot(path.join(dir, `${st.id}-${lang}-${f + 1}.png`));
      }
    }
    console.log("✓ historia", st.id);
  }
}

await browser.close();
