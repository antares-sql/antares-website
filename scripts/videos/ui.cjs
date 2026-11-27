/** Locators of the Antares UI shared by the scenes (always the first visible match: hidden workspaces stay in the DOM) */
const visible = l => l.locator('visible=true').first()
const exact = s => new RegExp(`^\\s*${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`)

const PINIA = 'document.querySelector("#app").__vue_app__.config.globalProperties.$pinia._s'

/** Closes every tab of every workspace and collapses the explorer trees, so every take starts from the same state */
const reset = page => page.evaluate(`(() => {
  const ws = ${PINIA}.get('workspaces');
  for (const w of ws.workspaces)
    for (const t of [...w.tabs]) ws.removeTab({ uid: w.uid, tab: t.uid });
  document.querySelectorAll('.workspace-explorebar-database .database-name[aria-expanded="true"]').forEach(s => s.click());
})()`)

const ui = page => ({
  /** Connection in the setting bar, by its name */
  conn: name => visible(page.locator('.settingbar-element').filter({ has: page.locator('.settingbar-element-name', { hasText: exact(name) }) })),
  /** Schema in the explorer */
  db: name => visible(page.locator('.workspace-explorebar-database .database-name').filter({ hasText: exact(name) })),
  /** Table of an expanded schema in the explorer */
  table: name => visible(page.locator('.workspace-explorebar-database .table-name').filter({ hasText: exact(name) })),
  /** Results grid */
  grid: () => visible(page.locator('.vscroll')),
  /** Element matching a selector with exactly that text (or matching a RegExp) */
  text: (sel, text) => visible(page.locator(sel).filter({ hasText: typeof text === 'string' ? exact(text) : text }))
})

module.exports = { ui, reset, exact }
