// Hero (main.webm): browse a MySQL table, then jump to a PostgreSQL connection and open another table
const { ui, reset } = require('./ui.cjs')

module.exports.setup = async ({ page, h }) => {
  const u = ui(page)
  await reset(page)
  await h.click(u.conn('Sakila'), { steps: 1, after: 1200 })
}

module.exports.run = async ({ page, h }) => {
  const u = ui(page)
  await h.sleep(700)
  await h.click(u.db('sakila'), { after: 700 })
  await h.click(u.table('film'), { after: 1600 })
  await h.moveTo(u.grid(), { dy: 40 })
  await h.wheel(900, 14)
  await h.sleep(900)
  await h.click(u.conn('Analytics'), { after: 1200 })
  await h.click(u.db('pagila'), { after: 700 })
  await h.click(u.table('customer'), { after: 1400 })
  await h.moveTo(u.grid(), { dx: 200, dy: 60 })
  await h.wheel(700, 12)
  await h.sleep(1500)
}
