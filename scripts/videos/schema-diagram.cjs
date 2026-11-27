// Card "Simple, but complete" (schema-diagram.webm): schema diagram of sakila, workspace area only
const { ui, reset } = require('./ui.cjs')

module.exports.crop = { x: 350, y: 30, w: 930, h: 680 }

const tableBox = (page, name) => page.locator('.diagram-table:visible')
  .filter({ has: page.locator('.table-name', { hasText: new RegExp(`^${name}$`) }) }).first()

module.exports.setup = async ({ page, h }) => {
  const u = ui(page)
  await reset(page)
  await h.click(u.conn('Sakila'), { steps: 1, after: 1000 })
  await h.rightClick(u.db('sakila'), { steps: 1, after: 500 })
  await h.click(u.text('.context-element', 'Schema diagram'), { steps: 1, after: 2500 })
  await h.moveXY(900, 420, 1)
}

module.exports.run = async ({ page, h }) => {
  await h.sleep(700)
  // Ctrl+wheel zooms around the cursor (plain wheel pans): zoom in on the film table
  await h.moveTo(tableBox(page, 'film'), { dy: -20 })
  await h.sleep(300)
  await page.keyboard.down('Control')
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, -43)
    await h.sleep(70)
  }
  await page.keyboard.up('Control')
  await h.sleep(900)
  // move the film table into free space: its relations follow it and light up
  await h.drag(tableBox(page, 'film').locator('.table-name').first(), -90, 110)
  await h.sleep(1200)
  // select other tables to highlight their relations
  await h.click(tableBox(page, 'staff').locator('.table-name').first(), { after: 1500 })
  await h.click(tableBox(page, 'address').locator('.table-name').first(), { after: 1800 })
}
