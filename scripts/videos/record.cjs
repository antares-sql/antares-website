/**
 * Records a scene of the running Antares app as a webm for the website (public/videos).
 *
 *   node scripts/videos/record.cjs <scene.cjs> <output.webm>
 *
 * The app must be running through antares/scripts/appDriver.js (CDP on port 9339, see the
 * run-app skill of the antares repo). A scene module exports:
 *   - setup({ page, h })  optional, runs before recording (reset tabs, select the connection...)
 *   - run({ page, h })    the recorded part
 *   - crop                optional { x, y, w, h } of the window to keep (default: whole window)
 *   - hold                optional seconds kept after the last change (default 1.5)
 *   - teardown({ page, h }) optional, cleans up after recording
 *
 * Env: ANTARES_DIR (default ../antares next to this repo, for playwright-core),
 *      FFMPEG (default: the ffmpeg downloaded by Playwright, VP8 only, which is enough for webm).
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawn } = require('child_process')

const ANTARES = process.env.ANTARES_DIR || path.resolve(__dirname, '../../../antares')
const { chromium } = require(path.join(ANTARES, 'node_modules/playwright-core'))
const FPS = 30
const CDP_PORT = +(process.env.ANTARES_DRIVER_PORT || 9339)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

function findFfmpeg () {
  if (process.env.FFMPEG) return process.env.FFMPEG
  const base = process.platform === 'win32'
    ? path.join(process.env.LOCALAPPDATA, 'ms-playwright')
    : process.platform === 'darwin'
      ? path.join(os.homedir(), 'Library/Caches/ms-playwright')
      : path.join(os.homedir(), '.cache/ms-playwright')
  const dir = fs.readdirSync(base).filter(d => d.startsWith('ffmpeg-')).sort().pop()
  if (!dir) throw new Error('ffmpeg not found: run `npx playwright install ffmpeg` in the antares repo or set FFMPEG')
  const exe = fs.readdirSync(path.join(base, dir)).find(f => f.startsWith('ffmpeg'))
  return path.join(base, dir, exe)
}

// Fake cursor and click ripple: the screencast does not capture the real pointer
const CURSOR_JS = `(() => {
  if (window.__recCursor) return;
  const c = document.createElement('div');
  c.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2.5l15 10.2-6.6 1.2 3.9 7.3-2.9 1.4-3.8-7.3L4.9 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none', transform: 'translate(-3px,-2px)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))' });
  const r = document.createElement('div');
  Object.assign(r.style, { position: 'fixed', width: '28px', height: '28px', marginLeft: '-14px', marginTop: '-14px', borderRadius: '50%', background: 'rgba(255,255,255,.35)', zIndex: 2147483646, pointerEvents: 'none', opacity: '0', transform: 'scale(.4)' });
  document.documentElement.append(r, c);
  window.addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
  window.addEventListener('mousedown', e => {
    r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px';
    r.style.transition = 'none'; r.style.opacity = '1'; r.style.transform = 'scale(.4)';
    requestAnimationFrame(() => { r.style.transition = 'opacity .45s, transform .45s'; r.style.opacity = '0'; r.style.transform = 'scale(1.4)'; });
  }, true);
  window.__recCursor = c;
})()`

/** Hand-like input helpers: eased cursor paths, short pauses, per-key typing */
function helpers (page) {
  let pos = { x: 640, y: 400 }
  const loc = target => typeof target === 'string' ? page.locator(target).locator('visible=true').first() : target

  const h = {
    sleep,
    loc,
    async moveTo (target, { steps = 14, dx = 0, dy = 0 } = {}) {
      const l = loc(target)
      await l.waitFor({ state: 'visible', timeout: 15000 })
      const b = await l.boundingBox()
      const to = { x: b.x + b.width / 2 + dx, y: b.y + b.height / 2 + dy }
      for (let i = 1; i <= steps; i++) {
        const e = ease(i / steps)
        await page.mouse.move(pos.x + (to.x - pos.x) * e, pos.y + (to.y - pos.y) * e)
      }
      pos = to
    },
    async moveXY (x, y, steps = 20) {
      for (let i = 1; i <= steps; i++) {
        await page.mouse.move(pos.x + (x - pos.x) * i / steps, pos.y + (y - pos.y) * i / steps)
        await sleep(12)
      }
      pos = { x, y }
    },
    async click (target, opts = {}) {
      await h.moveTo(target, opts)
      await sleep(opts.pause ?? 180)
      await page.mouse.down()
      await sleep(70)
      await page.mouse.up()
      await sleep(opts.after ?? 350)
    },
    async rightClick (target, opts = {}) {
      await h.moveTo(target, opts)
      await sleep(200)
      await page.mouse.click(pos.x, pos.y, { button: 'right' })
      await sleep(opts.after ?? 500)
    },
    /** Press on target, move by dx/dy, release */
    async drag (target, dx, dy, { steps = 22, grab = {} } = {}) {
      await h.moveTo(target, grab)
      await sleep(200)
      await page.mouse.down()
      const from = { ...pos }
      for (let i = 1; i <= steps; i++) {
        const e = ease(i / steps)
        await page.mouse.move(from.x + dx * e, from.y + dy * e)
        await sleep(16)
      }
      pos = { x: from.x + dx, y: from.y + dy }
      await sleep(120)
      await page.mouse.up()
      await sleep(400)
    },
    /**
     * App shortcut. Shortcuts are native menu accelerators that synthetic key events never reach,
     * so the menu item is clicked (like appDriver press); a keycap badge shows the keys to the viewer.
     */
    async shortcut (key, label = key) {
      await page.evaluate((label) => {
        const b = document.createElement('div')
        b.textContent = label
        Object.assign(b.style, {
          position: 'fixed', left: '50%', bottom: '64px', transform: 'translateX(-50%)', zIndex: 2147483647,
          padding: '6px 14px', borderRadius: '8px', background: 'rgba(20,20,20,.85)', color: '#fff',
          font: '600 15px system-ui, sans-serif', border: '1px solid rgba(255,255,255,.25)',
          boxShadow: '0 2px 10px rgba(0,0,0,.5)', pointerEvents: 'none', transition: 'opacity .4s'
        })
        document.documentElement.append(b)
        setTimeout(() => {
          b.style.opacity = '0'
          setTimeout(() => b.remove(), 450)
        }, 1100)
      }, label)
      await sleep(250)
      const done = await page.evaluate((key) => {
        const norm = k => k.split('+').map(p => p.trim().toLowerCase().replace(/^(commandorcontrol|cmdorctrl|ctrl)$/, 'control')).sort().join('+')
        const wanted = norm(key)
        const find = (items) => {
          for (const item of items) {
            if (item.accelerator && norm(item.accelerator) === wanted) return item
            const found = item.submenu && find(item.submenu.items)
            if (found) return found
          }
        }
        const item = find(require('@electron/remote').Menu.getApplicationMenu().items)
        if (item) item.click()
        return !!item
      }, key)
      if (!done) await page.keyboard.press(key)
    },
    async type (text, delay = 55) {
      for (const ch of text) {
        await page.keyboard.type(ch)
        await sleep(delay + Math.random() * 40)
      }
    },
    async wheel (dy, steps = 10) {
      for (let i = 0; i < steps; i++) {
        await page.mouse.wheel(0, dy / steps)
        await sleep(30)
      }
    }
  }
  return h
}

/** Encodes the screencast frames at a constant frame rate (each frame lasts until the next change) */
async function encode (frames, out, start, end, crop) {
  const args = [
    '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', 'pipe:0',
    ...(crop ? ['-vf', `crop=${crop.w}:${crop.h}:${crop.x}:${crop.y}`] : []),
    '-c:v', 'libvpx', '-b:v', '2M', '-crf', '8', '-qmin', '0', '-qmax', '40', '-deadline', 'good', '-cpu-used', '1',
    '-auto-alt-ref', '0', '-pix_fmt', 'yuv420p', '-an', out
  ]
  const ff = spawn(findFfmpeg(), args, { stdio: ['pipe', 'ignore', 'inherit'] })
  const done = new Promise((resolve, reject) => ff.on('close', code => code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))))
  let i = 0
  for (let t = start; t <= end; t += 1 / FPS) {
    while (i + 1 < frames.length && frames[i + 1].t <= t) i++
    if (!ff.stdin.write(frames[i].buf))
      await new Promise(resolve => ff.stdin.once('drain', resolve))
  }
  ff.stdin.end()
  await done
}

async function main () {
  const [sceneFile, out] = process.argv.slice(2)
  if (!sceneFile || !out) {
    console.error('Usage: node scripts/videos/record.cjs <scene.cjs> <output.webm>')
    process.exit(1)
  }
  const scene = require(path.resolve(sceneFile))
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${CDP_PORT}`)
  const page = browser.contexts().flatMap(c => c.pages()).find(p => !p.url().startsWith('devtools'))
  const h = helpers(page)
  await page.evaluate(CURSOR_JS)
  if (scene.setup) await scene.setup({ page, h })

  const cdp = await page.context().newCDPSession(page)
  const frames = []
  cdp.on('Page.screencastFrame', (f) => {
    frames.push({ t: f.metadata.timestamp, buf: Buffer.from(f.data, 'base64') })
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {})
  })
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1280, maxHeight: 800, everyNthFrame: 1 })
  await sleep(400)
  await scene.run({ page, h })
  await cdp.send('Page.stopScreencast')
  // No browser.close(): over CDP it could close the app, which stays open between scenes

  if (!frames.length) throw new Error('no frames recorded')
  // Frames only arrive when the page changes: start just before the first change, stop shortly after the last one
  const first = frames.length > 1 ? Math.max(frames[0].t, frames[1].t - 0.35) : frames[0].t
  const last = frames[frames.length - 1].t + (scene.hold ?? 1.5)
  await encode(frames, out, first, last, scene.crop)
  if (scene.teardown) await scene.teardown({ page, h })
  console.log(`${out}: ${(last - first).toFixed(1)}s, ${(fs.statSync(out).size / 1024).toFixed(0)} KiB`)
}

main().then(() => process.exit(0), (err) => {
  console.error(err)
  process.exit(1)
})
