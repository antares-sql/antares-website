/**
 * Contact sheet of a video, to review a take without playing it: one frame every <step> seconds.
 *
 *   node scripts/videos/sheet.cjs <video.webm> [step=2]
 *
 * Writes <video>-sheet.png next to the video. Frames are taken by seeking (-ss), which keeps the timestamps exact.
 */
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')

const ANTARES = process.env.ANTARES_DIR || path.resolve(__dirname, '../../../antares')
const { chromium } = require(path.join(ANTARES, 'node_modules/playwright-core'))

function findFfmpeg () {
  if (process.env.FFMPEG) return process.env.FFMPEG
  const base = process.platform === 'win32'
    ? path.join(process.env.LOCALAPPDATA, 'ms-playwright')
    : process.platform === 'darwin'
      ? path.join(os.homedir(), 'Library/Caches/ms-playwright')
      : path.join(os.homedir(), '.cache/ms-playwright')
  const dir = fs.readdirSync(base).filter(d => d.startsWith('ffmpeg-')).sort().pop()
  return path.join(base, dir, fs.readdirSync(path.join(base, dir)).find(f => f.startsWith('ffmpeg')))
}

async function main () {
  const [video, step = '2'] = process.argv.slice(2)
  const ffmpeg = findFfmpeg()
  const info = (() => {
    try {
      execFileSync(ffmpeg, ['-hide_banner', '-i', video], { encoding: 'utf8', stdio: 'pipe' })
    }
    catch (err) {
      return err.stderr
    }
  })()
  const [, hh, mm, ss] = info.match(/Duration: (\d+):(\d+):([\d.]+)/)
  const duration = +hh * 3600 + +mm * 60 + +ss
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sheet-'))
  const frames = []
  for (let t = 0; t < duration; t += +step) {
    const file = path.join(dir, `f${frames.length}.png`)
    execFileSync(ffmpeg, ['-v', 'error', '-y', '-ss', String(t), '-i', video, '-frames:v', '1', '-vf', 'scale=640:-2', file])
    frames.push({ t, file })
  }

  const browser = await chromium.launch({ channel: 'chrome' })
  const page = await browser.newPage({ viewport: { width: 1300, height: 100 } })
  await page.setContent('<body style="margin:0;background:#000;color:#fff;font:14px sans-serif;display:flex;flex-wrap:wrap;gap:6px;padding:6px">'
    + frames.map(f => `<div><img width="640" src="data:image/png;base64,${fs.readFileSync(f.file).toString('base64')}"><div>${f.t.toFixed(1)}s</div></div>`).join('')
    + '</body>')
  const out = video.replace(/\.webm$/, '-sheet.png')
  await page.screenshot({ path: out, fullPage: true })
  await browser.close()
  fs.rmSync(dir, { recursive: true, force: true })
  console.log(`${frames.length} frames -> ${out}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
