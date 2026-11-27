// Card "Import and export" (import-export.webm): export sakila from MySQL, import the dump into an empty schema on MariaDB
const fs = require('fs')
const os = require('os')
const path = require('path')
const { execFileSync } = require('child_process')
const { ui, reset } = require('./ui.cjs')

// The folder is shown in the export modal: a neutral one, not the user's Downloads (it would show the account name)
const DEMO_DIR = process.platform === 'win32' ? 'C:\\Users\\Public\\antares-demo' : path.join(os.tmpdir(), 'antares-demo')

module.exports.crop = { x: 60, y: 30, w: 1000, h: 680 }

module.exports.setup = async ({ page, h }) => {
  const u = ui(page)
  fs.rmSync(DEMO_DIR, { recursive: true, force: true })
  fs.mkdirSync(DEMO_DIR, { recursive: true })
  execFileSync('docker', ['exec', 'antares-test-mariadb-1', 'mariadb', '-uroot', '-pantares', '-e',
    'DROP DATABASE IF EXISTS sakila_copy; CREATE DATABASE sakila_copy;'])

  // File dialogs are native windows: answer them in the renderer (default export folder, then the dump to import)
  await page.evaluate((dir) => {
    const { ipcRenderer } = require('electron')
    if (!ipcRenderer.__recOrig) ipcRenderer.__recOrig = ipcRenderer.invoke.bind(ipcRenderer)
    ipcRenderer.invoke = (channel, ...args) => {
      if (channel === 'get-download-dir-path') return Promise.resolve(dir)
      if (channel === 'show-open-dialog') {
        const file = require('fs').readdirSync(dir).find(f => f.endsWith('.sql'))
        return Promise.resolve({ canceled: false, filePaths: [require('path').join(dir, file)] })
      }
      return ipcRenderer.__recOrig(channel, ...args)
    }
  }, DEMO_DIR)

  await reset(page)
  // show the new empty schema in the MariaDB explorer
  await h.click(u.conn('Shop'), { steps: 1, after: 800 })
  await h.click(page.locator('.workspace-explorebar-tools [title="Refresh"]:visible').first(), { steps: 1, after: 1500 })
  await h.click(u.conn('Sakila'), { steps: 1, after: 800 })
  await h.moveXY(500, 400, 1)
}

module.exports.run = async ({ page, h }) => {
  const u = ui(page)
  await h.sleep(400)
  // export
  await h.rightClick(u.db('sakila'), { after: 600 })
  await h.click(u.text('.context-element', 'Export'), { after: 1400 })
  await h.click(page.locator('.modal-footer button:visible').filter({ hasText: 'Export' }).first(), { after: 300 })
  await page.locator('.modal :text("Completed")').first().waitFor({ timeout: 60000 })
  await h.sleep(1400)
  await h.click(page.locator('.modal-footer button:visible').filter({ hasText: 'Close' }).first(), { after: 600 })
  // import into MariaDB
  await h.click(u.conn('Shop'), { after: 900 })
  await h.rightClick(u.db('sakila_copy'), { after: 600 })
  await h.click(u.text('.context-element', 'Import'), { after: 400 })
  await page.locator('.modal .progress-status:has-text("Completed")').first().waitFor({ timeout: 120000 })
  await h.sleep(1600)
  await h.click(page.locator('.modal-footer button:visible').filter({ hasText: 'Close' }).first(), { after: 700 })
  await h.click(u.db('sakila_copy'), { after: 1000 })
  await h.click(u.table('film'), { after: 1800 })
}

module.exports.teardown = () => {
  fs.rmSync(DEMO_DIR, { recursive: true, force: true })
  execFileSync('docker', ['exec', 'antares-test-mariadb-1', 'mariadb', '-uroot', '-pantares', '-e', 'DROP DATABASE IF EXISTS sakila_copy;'])
}
