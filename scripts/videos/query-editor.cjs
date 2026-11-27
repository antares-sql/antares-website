// Card "Autocomplete or format your queries" (query-editor.webm): write a query with the autocomplete, format it, run it
const { ui, reset } = require('./ui.cjs')

module.exports.crop = { x: 350, y: 30, w: 930, h: 680 }

module.exports.setup = async ({ page, h }) => {
  const u = ui(page)
  await reset(page)
  await h.click(u.conn('Sakila'), { steps: 1, after: 800 })
  // select the sakila schema, so that the editor suggests its tables and columns
  await h.click(u.db('sakila'), { steps: 1, after: 600 })
  await h.click(u.db('sakila'), { steps: 1, after: 300 })
  await h.moveXY(560, 160, 1)
}

/** Types a prefix, waits for the autocomplete and accepts the wanted entry (columns are suggested only after FROM) */
async function complete (page, h, prefix, wanted) {
  await h.type(prefix, 90)
  await page.locator('.cm-tooltip-autocomplete li').first().waitFor({ state: 'visible', timeout: 5000 })
  await h.sleep(650)
  const labels = (await page.locator('.cm-tooltip-autocomplete li').allInnerTexts()).map(s => s.trim().split(/\s/)[0])
  const index = labels.indexOf(wanted)
  if (index === -1) {
    // not offered: finish the word by hand
    await page.keyboard.press('Escape')
    await h.type(wanted.slice(prefix.length), 90)
    return
  }
  for (let i = 0; i < index; i++) {
    await page.keyboard.press('ArrowDown')
    await h.sleep(180)
  }
  await page.keyboard.press('Enter')
  await h.sleep(250)
}

module.exports.run = async ({ page, h }) => {
  await h.sleep(500)
  await h.click('[title="Open a new tab"]', { after: 800 })
  await h.type('select title, rating, rental_rate from ', 65)
  await complete(page, h, 'fi', 'film')
  await h.type(' where ', 65)
  await complete(page, h, 'rat', 'rating')
  await h.type(' = \'PG\' order by ', 65)
  await complete(page, h, 'rental_r', 'rental_rate')
  await h.type(' desc', 65)
  await page.keyboard.press('Escape')
  await h.sleep(700)
  await h.shortcut('CommandOrControl+B', 'Ctrl + B  ·  Format')
  await h.sleep(1300)
  await h.click(page.locator('.workspace-query-buttons button:visible').filter({ hasText: 'Run' }).first(), { after: 1600 })
  await h.moveTo(page.locator('.vscroll:visible').first(), { dy: 60 })
  await h.wheel(500, 10)
  await h.sleep(1500)
}
