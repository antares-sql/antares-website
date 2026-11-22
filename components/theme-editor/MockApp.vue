<template>
  <div class="mock-shell">
    <div class="mock-scenes">
      <div class="mock-scene-group">
        <button
          v-for="s in scenes"
          :key="s.id"
          type="button"
          :class="{ on: currentScene === s.id }"
          @click="setScene(s.id)"
        >
          {{ s.label }}
        </button>
      </div>
      <div class="mock-scene-group">
        <label><input v-model="ui.console" type="checkbox"> Console</label>
        <label><input v-model="ui.dropdown" type="checkbox"> Menu</label>
        <label><input v-model="ui.context" type="checkbox"> Context menu</label>
        <label><input v-model="ui.tooltip" type="checkbox"> Tooltip</label>
      </div>
    </div>

    <div class="mock-stage">
      <!-- ============ Simulated Antares: every element lists its tokens in data-t ============ -->
      <div
        ref="root"
        class="amock"
        :class="{ 'amock-inspect': inspect }"
        :style="vars"
        @click.capture="onInspect"
        @contextmenu.prevent="openContext"
        @mouseover="onHover"
        @mouseleave="hoverTarget = null"
      >
        <div class="am-titlebar" data-t="c:bg-titlebar c:text c:shadow-color">
          <span class="am-logo" data-t="accent" />
          <span class="am-title">SQLite chinook • main • {{ tabTitle }}</span>
          <span class="am-winbuttons">
            <span class="am-winbtn" data-t="c:bg-hover-strong"><AntaresIcon name="window-minimize" size="14" /></span>
            <span class="am-winbtn" data-t="c:bg-hover-strong"><AntaresIcon name="window-maximize" size="12" /></span>
            <span class="am-winbtn am-close"><AntaresIcon name="x" size="14" /></span>
          </span>
        </div>

        <div class="am-body">
          <!-- Setting bar -->
          <div class="am-settingbar" data-t="c:bg-settingbar c:settingbar-text c:shadow-color">
            <div class="am-connections">
              <button
                v-for="conn in connections"
                :key="conn.slot"
                type="button"
                class="am-conn"
                :class="{ active: previewSlot === conn.slot, folder: conn.folder }"
                :title="conn.name"
                data-t="s:radius-lg"
                @click="previewSlot = conn.slot"
              >
                <span
                  v-if="conn.folder"
                  class="am-folder"
                  :style="{ background: slotColor(conn.slot) }"
                  :data-t="`a:${conn.slot} s:radius-lg`"
                >
                  <img v-for="icon in conn.icons" :key="icon" :src="`/icons/${icon}.svg`" alt="">
                </span>
                <span v-else class="am-conn-icon" :style="{ '--tile': slotColor(conn.slot) }" :data-t="`a:${conn.slot}`">
                  <img :src="`/icons/${conn.icons[0]}.svg`" alt="">
                </span>
              </button>
              <span class="am-settingbar-icon"><AntaresIcon name="plus" size="22" /></span>
            </div>
            <div class="am-settingbar-bottom">
              <span class="am-settingbar-icon" @click="setScene('text')"><AntaresIcon name="notebook" size="20" /></span>
              <span class="am-settingbar-icon" @click="setScene('settings')"><AntaresIcon name="cog" size="20" /></span>
            </div>
          </div>

          <!-- Explore bar -->
          <div class="am-explorebar" data-t="c:bg-panel c:text c:shadow-color">
            <div class="am-explorebar-head">
              <span>SQLITE CHINOOK</span>
              <AntaresIcon name="refresh" size="15" />
              <AntaresIcon name="power" size="15" />
            </div>
            <div class="am-search">
              <input class="am-input" placeholder="Search for elements" data-t="c:input-bg c:border c:text-placeholder s:radius s:border-width">
              <AntaresIcon name="search" size="14" />
            </div>
            <div class="am-tree am-scroll" data-t="c:scrollbar-track c:scrollbar-thumb c:scrollbar-thumb-hover s:scrollbar-size">
              <div class="am-db" data-t="c:bg-panel c:bg-panel-hover">
                <AntaresIcon name="chevron-down" size="14" /><AntaresIcon name="database" size="15" /><b>main</b>
              </div>
              <div
                v-for="(table, i) in tables"
                :key="table.name"
                class="am-tree-item"
                :class="{ selected: i === 0 }"
                :data-t="i === 0 ? 'c:bg-hover' : 'c:bg-hover'"
              >
                <AntaresIcon name="table" size="15" />
                <span>{{ table.name }}</span>
                <span class="am-pie" :style="{ background: `conic-gradient(var(--size-chart-fill) ${table.size}%, var(--size-chart-track) 0)` }" data-t="c:size-chart-fill c:size-chart-track" />
              </div>
            </div>
          </div>

          <!-- Workspace -->
          <div class="am-workspace">
            <div class="am-tabbar" data-t="c:bg-tabbar c:text">
              <span
                v-for="tab in workspaceTabs"
                :key="tab.id"
                class="am-tab"
                :class="{ active: ui.tab === tab.id && !isModalScene, temp: tab.temp }"
                :data-t="ui.tab === tab.id ? 'accent s:border-width-lg' : null"
                @click="ui.tab = tab.id; ui.modal = null"
              >
                <AntaresIcon :name="tab.icon" size="14" />
                <span>{{ tab.label }}</span>
                <AntaresIcon v-if="ui.tab === tab.id" name="x" size="12" class="am-tab-close" />
              </span>
              <span class="am-tab am-tab-add"><AntaresIcon name="plus" size="15" /></span>
            </div>

            <!-- Query tab -->
            <div v-if="ui.tab === 'query'" class="am-query">
              <div class="am-editor-wrapper" data-t="c:separator s:border-width">
                <MockCode :sample="sqlSample" />
              </div>
              <div class="am-query-toolbar">
                <span class="am-btn am-btn-primary" data-t="accent s:radius"><AntaresIcon name="play" size="14" /> Run</span>
                <span class="am-btn am-btn-link" data-t="c:text"><AntaresIcon name="eraser" size="14" /> Clear</span>
                <span class="am-divider-vert" data-t="c:divider" />
                <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-dark-bg-hover c:btn-text s:radius"><AntaresIcon name="brush" size="14" /></span>
                <span class="am-btn-group">
                  <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-dark-bg-hover c:btn-text"><AntaresIcon name="save" size="14" /></span>
                  <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-dark-bg-hover c:btn-text"><AntaresIcon name="folder-open" size="14" /></span>
                </span>
                <span class="am-tooltip-anchor">
                  <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-dark-bg-hover c:btn-text"><AntaresIcon name="history" size="14" /></span>
                  <span v-if="ui.tooltip" class="am-tooltip" data-t="c:tooltip-bg c:tooltip-text s:radius">Query history</span>
                </span>
                <span class="am-dropdown">
                  <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-dark-bg-hover c:btn-text" @click="ui.dropdown = !ui.dropdown">
                    <AntaresIcon name="file+up" size="14" /> Export <AntaresIcon name="chevron-down" size="12" />
                  </span>
                  <ul v-if="ui.dropdown" class="am-menu" data-t="c:bg-raised c:text c:shadow-color s:radius">
                    <li data-t="c:menu-hover-bg c:menu-hover-text">JSON</li>
                    <li class="hover" data-t="c:menu-hover-bg c:menu-hover-text">CSV</li>
                    <li data-t="c:menu-hover-bg c:menu-hover-text">SQL INSERT</li>
                    <li data-t="c:menu-hover-bg c:menu-hover-text">PHP array</li>
                  </ul>
                </span>
              </div>
              <div class="am-query-info">
                <AntaresIcon name="hourglass" size="13" /> <b>0.005s</b>
                <AntaresIcon name="equal" size="13" /> <b>8</b>
                <span class="am-select am-select-sm" data-t="c:input-bg c:border s:radius"><AntaresIcon name="database" size="13" /> main <AntaresIcon name="chevron-down" size="11" /></span>
              </div>
              <div class="am-results am-scroll" data-t="c:bg-app c:scrollbar-track c:scrollbar-thumb s:scrollbar-size">
                <div class="am-grid" data-t="c:grid-border s:grid-border-width">
                  <div class="am-grid-row am-grid-head">
                    <span
                      v-for="col in gridColumns"
                      :key="col.name"
                      class="am-th"
                      data-t="c:grid-header-bg c:grid-header-border c:text"
                    >
                      <AntaresIcon v-if="col.key" name="key" size="12" class="am-key" />{{ col.name }}
                    </span>
                  </div>
                  <div v-for="(row, r) in gridRows" :key="r" class="am-grid-row">
                    <span
                      v-for="(cell, c) in row"
                      :key="c"
                      class="am-td"
                      :class="{ selected: r === 1 && c === 1 }"
                      :style="{ color: `var(--type-${gridColumns[c].type})` }"
                      :data-t="r === 1 && c === 1 ? `c:grid-cell-focus c:grid-cell-focus-bg c:type-${gridColumns[c].type}` : `c:grid-row-bg c:type-${gridColumns[c].type}`"
                    >{{ cell }}</span>
                  </div>
                </div>
              </div>
              <div v-if="ui.console" class="am-console" data-t="c:bg-surface c:separator">
                <div class="am-console-head">
                  <AntaresIcon name="terminal" size="13" /> Console <AntaresIcon name="x" size="12" class="am-ml-auto" @click="ui.console = false" />
                </div>
                <div class="am-console-log" data-t="c:bg-panel">
                  <span class="am-muted" data-t="c:text-muted">10:42:01</span> SELECT a.AlbumId, a.Title FROM albums a
                </div>
                <div class="am-console-log" data-t="c:warning">
                  <span class="am-muted" data-t="c:text-muted">10:42:03</span><span class="am-warning">Slow query: 2.4s on tracks</span>
                </div>
                <div class="am-console-log" data-t="c:error">
                  <span class="am-muted" data-t="c:text-muted">10:42:07</span><span class="am-error">no such column: t.Compozer</span>
                </div>
              </div>
            </div>

            <!-- Table structure tab -->
            <div v-else-if="ui.tab === 'structure'" class="am-structure">
              <div class="am-query-toolbar">
                <span class="am-btn am-btn-primary" data-t="accent"><AntaresIcon name="save" size="14" /> Save</span>
                <span class="am-btn am-btn-link" data-t="c:text"><AntaresIcon name="eraser" size="14" /> Clear</span>
                <span class="am-divider-vert" data-t="c:divider" />
                <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-text"><AntaresIcon name="list+plus" size="14" /> Add field</span>
                <span class="am-btn am-btn-dark" data-t="c:btn-dark-bg c:btn-text"><AntaresIcon name="key" size="14" /> Indexes</span>
              </div>
              <div class="am-table-wrap am-scroll" data-t="c:scrollbar-track c:scrollbar-thumb">
                <div class="am-table am-table-hover">
                  <div class="am-tr am-thead">
                    <span v-for="h in structureHead" :key="h" class="am-tcell am-th2" data-t="c:table-border c:text">{{ h }}</span>
                  </div>
                  <div
                    v-for="(field, i) in structureRows"
                    :key="field.name"
                    class="am-tr"
                    :class="{ selected: i === 1, active: i === 3 }"
                    :data-t="i === 1 ? 'c:table-row-selected' : i === 3 ? 'c:table-row-active' : 'c:table-row-hover'"
                  >
                    <span class="am-tcell" data-t="c:table-border">{{ i + 1 }}</span>
                    <span class="am-tcell" data-t="c:table-border">
                      <AntaresIcon v-if="field.key" name="key" size="12" class="am-key" />
                      <input v-if="i === 3" class="am-input am-input-cell" value="Title" data-t="c:input-bg c:border c:text">
                      <template v-else>{{ field.name }}</template>
                    </span>
                    <span class="am-tcell am-type" :style="{ color: `var(--type-${field.color})` }" :data-t="`c:table-border c:type-${field.color}`">{{ field.type }}</span>
                    <span class="am-tcell" data-t="c:table-border">{{ field.length }}</span>
                    <span class="am-tcell" data-t="c:table-border">
                      <span class="am-checkbox" :class="{ checked: field.nullable }" data-t="c:input-bg c:border accent" />
                    </span>
                    <span class="am-tcell" data-t="c:table-border c:type-unknown">
                      <span :style="{ color: field.default === 'NULL' ? 'var(--type-unknown)' : undefined }">{{ field.default }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Diagram tab -->
            <div v-else-if="ui.tab === 'diagram'" class="am-diagram" data-t="c:bg-app c:diagram-dot">
              <svg viewBox="0 0 760 330" preserveAspectRatio="xMinYMin meet">
                <defs>
                  <marker
                    id="am-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto"
                  >
                    <path d="M0 0 L10 5 L0 10" fill="none" class="am-rel" />
                  </marker>
                </defs>
                <path d="M300 177 C 250 177, 250 112, 222 112" class="am-rel" marker-end="url(#am-arrow)" data-t="c:diagram-relation" />
                <path d="M540 171 C 510 171, 510 129, 482 129" class="am-rel" marker-end="url(#am-arrow)" data-t="c:diagram-relation" />
                <g v-for="dt in diagramTables" :key="dt.name" :transform="`translate(${dt.x} ${dt.y})`">
                  <rect
                    class="am-dt-box"
                    width="182"
                    :height="30 + dt.fields.length * 24"
                    rx="6"
                    data-t="c:diagram-table-bg c:diagram-table-border"
                  />
                  <path class="am-dt-head" d="M0 6 a6 6 0 0 1 6 -6 h170 a6 6 0 0 1 6 6 v24 h-182 z" data-t="c:diagram-header-bg c:text" />
                  <text x="12" y="20" class="am-dt-name">{{ dt.name }}</text>
                  <g v-for="(f, i) in dt.fields" :key="f.name" class="am-dt-field" :class="{ linked: f.linked }">
                    <rect
                      x="1"
                      :y="30 + i * 24"
                      width="180"
                      height="24"
                      class="am-dt-row"
                      :data-t="f.linked ? 'c:diagram-row-linked c:diagram-row-hover' : 'c:diagram-row-hover'"
                    />
                    <text x="12" :y="46 + i * 24" class="am-dt-text">{{ f.name }}</text>
                    <text x="170" :y="46 + i * 24" text-anchor="end" class="am-dt-type" :style="{ fill: `var(--type-${f.type})` }">{{ f.label }}</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div class="am-footer" data-t="accent c:shadow-color">
          <span class="am-footer-el"><AntaresIcon name="server" size="14" /> SQLite 3.45.1 (x64 Windows_NT)</span>
          <span class="am-ml-auto am-footer-el am-footer-link" @click="ui.console = !ui.console"><AntaresIcon name="terminal" size="14" /> Console</span>
          <span class="am-footer-el am-footer-link"><AntaresIcon name="coffee" size="14" /> Donate</span>
          <span class="am-footer-el am-footer-link"><AntaresIcon name="bug" size="14" /></span>
          <span class="am-footer-el am-footer-link"><AntaresIcon name="info" size="14" /></span>
        </div>

        <!-- Context menu -->
        <div
          v-if="ui.context"
          class="am-context"
          :style="{ left: `${contextPos.x}px`, top: `${contextPos.y}px` }"
          data-t="c:context-bg c:context-text c:context-border c:shadow-color s:radius s:border-width"
        >
          <div class="am-context-el" data-t="c:context-hover">
            <AntaresIcon name="table+cog" size="14" /> Open table
          </div>
          <div class="am-context-el hover" data-t="c:context-hover">
            <AntaresIcon name="table+arrow" size="14" /> Export <AntaresIcon name="chevron-right" size="13" class="am-ml-auto" />
          </div>
          <div class="am-context-el" data-t="c:context-hover">
            <AntaresIcon name="tables" size="14" /> Duplicate
          </div>
          <div class="am-context-el" data-t="c:context-hover">
            <AntaresIcon name="table+off" size="14" /> Empty table
          </div>
          <div class="am-context-el" data-t="c:context-hover">
            <AntaresIcon name="table+minus" size="14" /> Delete
          </div>
        </div>

        <!-- Modals -->
        <div v-if="ui.modal" class="am-modal" @click.self="ui.modal = null">
          <div class="am-modal-overlay" data-t="c:bg-overlay" @click="ui.modal = null" />

          <div v-if="ui.modal === 'settings'" class="am-modal-container" data-t="c:bg-surface c:text c:shadow-color s:radius">
            <div class="am-modal-header" data-t="c:modal-header-bg c:modal-header-text">
              <AntaresIcon name="cog" size="16" /> Settings
              <AntaresIcon name="x" size="16" class="am-ml-auto am-pointer" @click="ui.modal = null" />
            </div>
            <div class="am-tabs" data-t="c:border-subtle c:text">
              <span class="am-tabs-item" :class="{ active: ui.settingsTab === 'general' }" data-t="accent s:border-width-lg" @click="ui.settingsTab = 'general'">General</span>
              <span class="am-tabs-item" :class="{ active: ui.settingsTab === 'shortcuts' }" data-t="accent s:border-width-lg" @click="ui.settingsTab = 'shortcuts'">Shortcuts</span>
              <span class="am-tabs-item">Themes</span>
              <span class="am-tabs-item">About</span>
            </div>
            <div v-if="ui.settingsTab === 'general'" class="am-modal-body">
              <div class="am-form-row">
                <label>Locale</label>
                <span class="am-select" data-t="c:input-bg c:border c:text s:radius">English <AntaresIcon name="chevron-down" size="12" /></span>
              </div>
              <div class="am-form-row">
                <label>Results limit</label>
                <input class="am-input focus" value="1000" data-t="c:input-bg c:border s:focus-ring-color s:focus-ring-width accent">
              </div>
              <div class="am-form-row">
                <label>Default schema</label>
                <input class="am-input" placeholder="e.g. public" data-t="c:input-bg c:text-placeholder">
              </div>
              <div class="am-form-row">
                <label>Data folder</label>
                <span class="am-input-group">
                  <input class="am-input" readonly value="C:\Users\me\AppData\antares" data-t="c:input-bg-readonly">
                  <span class="am-input-addon" data-t="c:input-bg-readonly c:border"><AntaresIcon name="folder-open" size="13" /></span>
                </span>
              </div>
              <div class="am-form-row">
                <label>Host</label>
                <input class="am-input" disabled value="localhost" data-t="c:input-bg-disabled">
              </div>
              <div class="am-form-row">
                <label>Port</label>
                <span>
                  <input class="am-input is-error" value="99999" data-t="c:error c:input-bg">
                  <span class="am-hint am-error" data-t="c:error">Port must be between 1 and 65535</span>
                </span>
              </div>
              <div class="am-form-row">
                <label />
                <span class="am-flex-gap">
                  <span class="am-check"><span class="am-checkbox checked" data-t="accent c:border" /> Auto-complete</span>
                  <span class="am-check"><span class="am-switch on" data-t="accent c:bg-raised" /> Line wrap</span>
                  <span class="am-check"><span class="am-switch" data-t="c:input-bg c:border c:bg-raised" /> Beep</span>
                </span>
              </div>
              <div class="am-divider" data-t="c:divider s:border-width" />
              <div class="am-card" data-t="c:bg-card s:radius">
                Run <code data-t="c:code-bg c:code-border c:code-text">npm run test:db:up</code> to start the test databases.
                <span class="am-muted" data-t="c:text-muted">Last check: 2 minutes ago</span>
              </div>
              <div class="am-labels">
                <span class="am-label am-label-success" data-t="c:success">Saved</span>
                <span class="am-label am-label-warning" data-t="c:warning">Restart needed</span>
                <span class="am-label am-label-error" data-t="c:error">Connection lost</span>
              </div>
            </div>
            <div v-else class="am-modal-body am-modal-table">
              <div class="am-table am-table-striped am-table-hover">
                <div v-for="sc in shortcuts" :key="sc[0]" class="am-tr" data-t="c:table-row-alt c:table-row-hover c:table-border">
                  <span class="am-tcell">{{ sc[0] }}</span>
                  <span class="am-tcell"><code data-t="c:code-bg c:code-text">{{ sc[1] }}</code></span>
                </div>
              </div>
            </div>
            <div class="am-modal-footer">
              <span class="am-btn am-btn-gray" data-t="c:btn-gray-bg c:btn-gray-bg-hover c:btn-text">Reset</span>
              <span class="am-btn am-btn-link" data-t="c:text" @click="ui.modal = null">Cancel</span>
              <span class="am-btn am-btn-primary" data-t="accent">Save</span>
            </div>
          </div>

          <div v-else-if="ui.modal === 'text'" class="am-modal-container am-modal-wide" data-t="c:bg-surface c:text c:shadow-color s:radius">
            <div class="am-modal-header" data-t="c:modal-header-bg c:modal-header-text">
              <AntaresIcon name="code" size="16" /> Edit "notes"
              <AntaresIcon name="x" size="16" class="am-ml-auto am-pointer" @click="ui.modal = null" />
            </div>
            <div class="am-modal-body">
              <MockCode :sample="textSamples[ui.textLang]" class="am-text-editor" />
              <div class="am-text-bar">
                <span class="am-muted">Format</span>
                <span class="am-segment" data-t="c:btn-dark-bg c:btn-text">
                  <span
                    v-for="(sample, key) in textSamples"
                    :key="key"
                    :class="{ on: ui.textLang === key }"
                    @click="ui.textLang = key"
                  >{{ sample.language }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import AntaresIcon from '~/components/theme-editor/AntaresIcon.vue'
import MockCode from './MockCode.vue'
import { lengthToPx, parseColor, readableTextOn, toHex } from '~/libs/themeEditor/colors'
import { sampleOfSyntax, sqlSample, textSamples } from '~/libs/themeEditor/samples'
import { useThemeEditor } from '~/libs/themeEditor/state'

const props = defineProps({
  /** Token id to outline in the preview (e.g. "c:bg-panel") */
  highlight: { type: String, default: null },
  inspect: { type: Boolean, default: true }
})
const emit = defineEmits<{(e: 'select', tokens: string[]): void }>()

const { effective, catalog, previewSlot } = useThemeEditor()

const ui = reactive({
  tab: 'query' as 'query' | 'structure' | 'diagram',
  modal: null as null | 'settings' | 'text',
  settingsTab: 'general' as 'general' | 'shortcuts',
  textLang: 'markdown' as keyof typeof textSamples,
  console: false,
  dropdown: false,
  context: false,
  tooltip: false
})
const contextPos = reactive({ x: 290, y: 170 })

const scenes = [
  { id: 'query', label: 'Query' },
  { id: 'structure', label: 'Table structure' },
  { id: 'diagram', label: 'Diagram' },
  { id: 'settings', label: 'Settings' },
  { id: 'text', label: 'Text editor' }
] as const
type SceneId = typeof scenes[number]['id']

const isModalScene = computed(() => ui.modal !== null)
const currentScene = computed<SceneId>(() => ui.modal ?? ui.tab)
const setScene = (id: SceneId) => {
  if (id === 'settings' || id === 'text') { ui.modal = id } else { ui.modal = null; ui.tab = id }
}

const workspaceTabs = [
  { id: 'structure', label: 'albums', icon: 'table', temp: true },
  { id: 'query', label: 'Query #1', icon: 'code' },
  { id: 'diagram', label: 'Diagram', icon: 'diagram' }
] as const
const tabTitle = computed(() => workspaceTabs.find(t => t.id === ui.tab)?.label)

const connections = [
  { name: 'SQLite chinook', slot: 'default', icons: ['sqlite'] },
  { name: 'Production', slot: 'royal-lblue', icons: ['pg', 'mysql', 'mariadb', 'pg'], folder: true },
  { name: 'Staging', slot: 'emerald', icons: ['mysql', 'mariadb'], folder: true },
  { name: 'Analytics', slot: 'grape-fruit', icons: ['pg'], folder: true },
  { name: 'Legacy', slot: 'sunflower', icons: ['firebird'], folder: true }
]

const tables = [
  { name: 'albums', size: 35 }, { name: 'artists', size: 12 }, { name: 'customers', size: 22 },
  { name: 'employees', size: 6 }, { name: 'genres', size: 3 }, { name: 'invoice_items', size: 74 },
  { name: 'invoices', size: 48 }, { name: 'media_types', size: 2 }, { name: 'playlist_track', size: 88 },
  { name: 'playlists', size: 5 }, { name: 'tracks', size: 100 }
]

const gridColumns = [
  { name: 'AlbumId', type: 'number', key: true },
  { name: 'Title', type: 'string' },
  { name: 'Released', type: 'date' },
  { name: 'Explicit', type: 'bit' },
  { name: 'Cover', type: 'blob' },
  { name: 'Genres', type: 'array' },
  { name: 'Format', type: 'enum' },
  { name: 'Notes', type: 'unknown' }
]
const gridRows = [
  ['213', 'Pure Cult: The Best Of The Cult', '1993-02-01', '0', 'BLOB 12KB', '["rock","goth"]', 'CD', 'NULL'],
  ['216', 'Hot Rocks, 1964-1971 (Disc 1)', '1971-12-20', '0', 'BLOB 18KB', '["rock"]', 'VINYL', 'NULL'],
  ['1', 'For Those About To Rock We Salute You', '1981-11-23', '1', 'BLOB 9KB', '["hard rock"]', 'CD', 'NULL'],
  ['108', 'Rock In Rio [CD1]', '2002-03-25', '0', 'BLOB 21KB', '["metal","live"]', 'CD', 'NULL'],
  ['109', 'Rock In Rio [CD2]', '2002-03-25', '0', 'BLOB 20KB', '["metal","live"]', 'CD', 'NULL'],
  ['4', 'Let There Be Rock', '1977-03-21', '1', 'BLOB 7KB', '["hard rock"]', 'TAPE', 'NULL'],
  ['59', 'Deep Purple In Rock', '1970-06-03', '0', 'BLOB 15KB', '["rock"]', 'VINYL', 'NULL'],
  ['141', 'Greatest Hits', '2004-10-12', '0', 'BLOB 11KB', '["pop"]', 'DIGITAL', 'NULL']
]

const structureHead = ['#', 'Name', 'Type', 'Length', 'Null', 'Default']
const structureRows = [
  { name: 'AlbumId', type: 'INTEGER', color: 'number', length: '', nullable: false, default: 'AUTO_INCREMENT', key: true },
  { name: 'Title', type: 'NVARCHAR', color: 'string', length: '160', nullable: false, default: '' },
  { name: 'ArtistId', type: 'INTEGER', color: 'number', length: '', nullable: false, default: '' },
  { name: 'Title', type: 'NVARCHAR', color: 'string', length: '160', nullable: false, default: '' },
  { name: 'Released', type: 'DATE', color: 'date', length: '', nullable: true, default: 'NULL' },
  { name: 'Explicit', type: 'BOOLEAN', color: 'bit', length: '', nullable: false, default: '0' },
  { name: 'Cover', type: 'BLOB', color: 'blob', length: '', nullable: true, default: 'NULL' },
  { name: 'Format', type: 'ENUM', color: 'enum', length: '', nullable: true, default: 'NULL' }
]

const diagramTables = [
  {
    name: 'artists',
    x: 40,
    y: 60,
    fields: [
      { name: 'ArtistId', label: 'INTEGER', type: 'number', linked: true },
      { name: 'Name', label: 'NVARCHAR', type: 'string' }
    ]
  },
  {
    name: 'albums',
    x: 300,
    y: 60,
    fields: [
      { name: 'AlbumId', label: 'INTEGER', type: 'number', linked: true },
      { name: 'Title', label: 'NVARCHAR', type: 'string' },
      { name: 'ArtistId', label: 'INTEGER', type: 'number', linked: true },
      { name: 'Released', label: 'DATE', type: 'date' }
    ]
  },
  {
    name: 'tracks',
    x: 540,
    y: 30,
    fields: [
      { name: 'TrackId', label: 'INTEGER', type: 'number' },
      { name: 'Name', label: 'NVARCHAR', type: 'string' },
      { name: 'AlbumId', label: 'INTEGER', type: 'number', linked: true },
      { name: 'Milliseconds', label: 'INTEGER', type: 'number' },
      { name: 'Bytes', label: 'INTEGER', type: 'number' }
    ]
  }
]

const shortcuts = [
  ['Run query', 'Ctrl+Enter'], ['Format query', 'Ctrl+B'], ['New query tab', 'Ctrl+T'], ['Close tab', 'Ctrl+W'],
  ['Next tab', 'Ctrl+PageDown'], ['Previous tab', 'Ctrl+PageUp'], ['Open settings', 'Ctrl+,'], ['Toggle console', 'Ctrl+`']
]

const slotColor = (slot: string) => effective.value.accent[slot] ?? '#e36929'

/** Every token of the theme as CSS custom properties, like the app does on #wrapper */
const vars = computed(() => {
  const e = effective.value
  const out: Record<string, string> = {}
  const value = (v: string) => v === 'accent' ? 'var(--primary-color)' : v
  for (const [token, v] of Object.entries(e.colors)) { out[`--${token}`] = value(v) }
  for (const [token, v] of Object.entries(e.shape)) {
    const px = lengthToPx(v)
    out[`--${token}`] = px !== null ? `${px}px` : value(v)
  }
  const accent = slotColor(previewSlot.value)
  const rgba = parseColor(accent)
  out['--primary-color'] = accent
  out['--primary-color-dark'] = `color-mix(in srgb, ${accent}, #000 30%)`
  out['--primary-color-shadow'] = rgba ? toHex({ ...rgba, a: 0.2 }) : accent
  out['--primary-color-text'] = readableTextOn(accent)
  for (const [key, v] of Object.entries(e.editorColors)) { out[`--ed-${key}`] = v }
  return out
})

// ---------------------------------------------------------------- Inspect

const root = ref<HTMLElement>()
const hoverTarget = ref<HTMLElement | null>(null)

/** Tokens of the clicked element and of its containers, nearest first */
const onInspect = (e: MouseEvent) => {
  if (!props.inspect) { return }
  const found: string[] = []
  let el = e.target as HTMLElement | null
  while (el && el !== root.value?.parentElement) {
    const t = el.getAttribute?.('data-t')
    if (t) { for (const id of t.split(/\s+/)) { if (id && !found.includes(id)) { found.push(id) } } }
    el = el.parentElement
  }
  if (!found.includes('c:text')) { found.push('c:text') }
  if (!found.includes('c:bg-app')) { found.push('c:bg-app') }
  emit('select', found)
}

const onHover = (e: MouseEvent) => {
  hoverTarget.value = (e.target as HTMLElement).closest?.('[data-t]') as HTMLElement | null
}
watch(hoverTarget, (el, old) => {
  old?.classList.remove('am-hover-target')
  if (props.inspect) { el?.classList.add('am-hover-target') }
})

const openContext = (e: MouseEvent) => {
  const rect = (root.value as HTMLElement).getBoundingClientRect()
  const zoom = rect.width / (root.value as HTMLElement).offsetWidth || 1
  contextPos.x = Math.min((e.clientX - rect.left) / zoom, (root.value as HTMLElement).offsetWidth - 190)
  contextPos.y = Math.min((e.clientY - rect.top) / zoom, (root.value as HTMLElement).offsetHeight - 170)
  ui.context = true
}

const applyHighlight = async () => {
  await nextTick()
  root.value?.querySelectorAll('.am-highlight').forEach(el => el.classList.remove('am-highlight'))
  if (!props.highlight) { return }
  root.value?.querySelectorAll(`[data-t~="${CSS.escape(props.highlight)}"]`).forEach(el => el.classList.add('am-highlight'))
}
watch(() => [props.highlight, ui.tab, ui.modal, ui.settingsTab, ui.textLang, ui.console, ui.context, ui.dropdown, ui.tooltip], applyHighlight)

// ---------------------------------------------------------------- Bring a token on screen

const settingsTokens = [
  'c:bg-surface', 'c:bg-overlay', 'c:modal-header-bg', 'c:modal-header-text', 'c:input-bg-readonly', 'c:input-bg-disabled',
  'c:code-bg', 'c:code-border', 'c:code-text', 'c:divider', 'c:success', 'c:btn-gray-bg', 'c:btn-gray-bg-hover', 'c:bg-card',
  'c:border-subtle', 's:focus-ring-color', 's:focus-ring-width'
]
const structureTokens = ['c:table-border', 'c:table-row-hover', 'c:table-row-active', 'c:table-row-selected']

const reveal = (id: string) => {
  if (id === 'c:table-row-alt') { ui.modal = 'settings'; ui.settingsTab = 'shortcuts'; return }
  if (settingsTokens.includes(id)) { ui.modal = 'settings'; ui.settingsTab = 'general'; return }
  if (structureTokens.includes(id)) { setScene('structure'); return }
  if (id.startsWith('c:diagram-')) { setScene('diagram'); return }
  if (id === 'c:warning' || id === 'c:error') { setScene('query'); ui.console = true; return }
  if (id.startsWith('c:context-')) { ui.context = true; return }
  if (id.startsWith('c:tooltip-')) { setScene('query'); ui.tooltip = true; return }
  if (id.startsWith('c:menu-hover') || id === 'c:bg-raised') { setScene('query'); ui.dropdown = true; return }
  if (id.startsWith('c:grid-') || id.startsWith('c:type-') || id.startsWith('c:btn-dark') || id === 'c:separator') { setScene('query'); return }
  if (id.startsWith('e:')) { setScene('query'); return }
  if (id.startsWith('x:')) {
    const sample = sampleOfSyntax(id.slice(2))
    if (sample === 'sql') { setScene('query') } else { ui.modal = 'text'; ui.textLang = sample as keyof typeof textSamples }
    return
  }
  if (id.startsWith('a:')) { previewSlot.value = id.slice(2) }
}

defineExpose({ reveal, ui })

watch(catalog, () => applyHighlight())
</script>

<style>
/* ======================= Simulated Antares (all colors from the theme tokens) ======================= */
.mock-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.mock-scenes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding: 0 0 10px;
  font-size: 13px;
  color: #cbd5e1;
}

.mock-scene-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
}

.mock-scene-group button {
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid #334155;
}

.mock-scene-group button.on {
  border-color: #f472b6;
  color: #fbcfe8;
  background: rgb(244 114 182 / 12%);
}

.mock-scene-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.mock-stage {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.amock {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 560px;
  min-width: 880px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 45%);
  background: var(--bg-app);
  color: var(--text);
  font: 13px/1.4 -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  text-align: left;
  user-select: none;
}

.amock svg { display: inline-block; flex: none; }
.amock b { font-weight: 700; }
.amock .am-ml-auto { margin-left: auto; }
.amock .am-pointer { cursor: pointer; }
.amock .am-muted { color: var(--text-muted); }
.amock .am-warning { color: var(--warning); }
.amock .am-error { color: var(--error); }
.amock .am-key { color: #e0a40c; margin-right: 3px; }

.amock.amock-inspect .am-hover-target {
  outline: 1px dashed rgb(244 114 182 / 75%);
  outline-offset: -1px;
}

.amock .am-highlight {
  outline: 2px solid #f472b6 !important;
  outline-offset: -2px;
  animation: am-pulse 1.2s ease-in-out infinite;
}

.amock svg .am-highlight {
  outline: none;
  stroke: #f472b6 !important;
  stroke-width: 3px;
}

@keyframes am-pulse {
  50% { outline-color: rgb(244 114 182 / 25%); }
}

/* Scrollbars */
.amock .am-scroll { overflow: auto; }
.amock ::-webkit-scrollbar { width: var(--scrollbar-size); height: var(--scrollbar-size); }
.amock ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
.amock ::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); }
.amock ::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }
.amock ::-webkit-scrollbar-corner { background: var(--scrollbar-track); }

/* Title bar */
.am-titlebar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 30px;
  flex: none;
  background: var(--bg-titlebar);
  box-shadow: 0 0 1px 0 var(--shadow-color);
}

.am-logo {
  width: 16px;
  height: 16px;
  margin: 0 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffb36b, var(--primary-color) 60%, var(--primary-color-dark));
}

.am-title {
  flex: 1;
  text-align: center;
  opacity: 0.9;
}

.am-winbuttons { display: flex; height: 100%; }

.am-winbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  opacity: 0.7;
}

.am-winbtn:hover { opacity: 1; background: var(--bg-hover-strong); }
.am-winbtn.am-close:hover { background: red; color: #fff; }

.am-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* Setting bar */
.am-settingbar {
  position: relative;
  z-index: 1;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 64px;
  padding: 6px 0;
  background: var(--bg-settingbar);
  color: var(--settingbar-text);
  box-shadow: 0 0 1px 0 var(--shadow-color);
}

.am-connections,
.am-settingbar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.am-conn {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2px 0;
}

.am-conn.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--settingbar-text);
}

.am-folder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
  width: 44px;
  height: 44px;
  padding: 5px;
  border-radius: var(--radius-lg);
}

.am-folder img {
  width: 15px;
  height: 15px;
  padding: 1px;
  border-radius: 3px;
  background: rgb(0 0 0 / 25%);
}

.am-conn.active .am-folder,
.am-conn.active .am-conn-icon {
  box-shadow: 0 0 0 var(--border-width-lg) var(--settingbar-text);
}

.am-conn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--tile) 25%, transparent);
}

.am-conn-icon img { width: 28px; height: 28px; }

.am-settingbar-icon {
  display: flex;
  justify-content: center;
  padding: 8px 0;
  width: 100%;
  opacity: 0.85;
  cursor: pointer;
}

.am-settingbar-icon:hover { opacity: 1; }

/* Explore bar */
.am-explorebar {
  flex: none;
  display: flex;
  flex-direction: column;
  width: 230px;
  background: var(--bg-panel);
  box-shadow: 0 0 1px 0 var(--shadow-color);
}

.am-explorebar-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px 6px;
  font-size: 11px;
  font-weight: 700;
}

.am-explorebar-head span { flex: 1; }

.am-search {
  position: relative;
  padding: 0 8px 6px;
}

.am-search .am-input { width: 100%; padding-right: 24px; }

.am-search svg {
  position: absolute;
  right: 15px;
  top: 7px;
  opacity: 0.7;
}

.am-tree { flex: 1; padding-bottom: 6px; }

.am-db,
.am-tree-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  cursor: pointer;
}

.am-db { background: var(--bg-panel); }
.am-db:hover { background: var(--bg-panel-hover); }
.am-tree-item { padding-left: 30px; }
.am-tree-item:hover,
.am-tree-item.selected { background: var(--bg-hover); }
.am-tree-item span:nth-child(2) { flex: 1; }

.am-pie {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

/* Workspace */
.am-workspace {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.am-tabbar {
  display: flex;
  flex: none;
  background: var(--bg-tabbar);
}

.am-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: 32px;
  border-bottom: var(--border-width-lg) solid transparent;
  color: var(--text);
  opacity: 0.7;
  cursor: pointer;
}

.am-tab:hover { opacity: 1; }
.am-tab.temp span { font-style: italic; }

.am-tab.active {
  opacity: 1;
  border-bottom-color: var(--primary-color);
}

.am-tab-close { opacity: 0.6; }
.am-tab-add { opacity: 0.9; }

.am-query,
.am-structure {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.am-editor-wrapper {
  flex: none;
  border-bottom: var(--border-width) solid var(--separator);
}

/* Code editor */
.am-code {
  display: flex;
  overflow: hidden;
  background: var(--ed-background);
  color: var(--ed-foreground);
  font: 13px/20px ui-monospace, Consolas, "Liberation Mono", monospace;
}

.am-gutter {
  flex: none;
  min-width: 36px;
  padding: 4px 0;
  background: var(--ed-gutterBackground);
  color: var(--ed-gutterForeground);
  text-align: right;
}

.am-gutter-line { padding: 0 8px 0 10px; }
.am-gutter-line.active { background: var(--ed-gutterActiveLine, transparent); }

.am-code-lines {
  flex: 1;
  min-width: 0;
  padding: 4px 0;
}

.am-code-line {
  padding: 0 8px;
  white-space: pre;
}

.am-code-line.active { background: var(--ed-activeLine, transparent); }
.am-mk-sel { background-color: var(--ed-selection); }
.am-mk-match { background-color: var(--ed-selectionMatch, transparent); }
.am-mk-bracket { background-color: var(--ed-matchingBracket, transparent); }
.am-mk-ws { color: var(--ed-invisible, currentcolor) !important; }

.am-mk-cursor {
  display: inline-block;
  width: 0;
  height: 17px;
  margin-right: -2px;
  vertical-align: text-bottom;
  border-left: 2px solid var(--ed-cursor);
  animation: am-blink 1.1s steps(1) infinite;
}

@keyframes am-blink { 50% { border-left-color: transparent; } }

/* Toolbar and buttons */
.am-query-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px 4px;
  flex: none;
}

.am-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 9px;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius);
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s;
}

.am-btn-primary {
  background: var(--primary-color);
  border-color: var(--primary-color-dark);
  color: var(--primary-color-text);
}

.am-btn-primary:hover { background: var(--primary-color-dark); }

.am-btn-link { color: color-mix(in srgb, var(--text) 80%, transparent); }
.am-btn-link:hover { color: var(--text); }

.am-btn-dark {
  background: var(--btn-dark-bg);
  border-color: var(--btn-dark-bg);
  color: var(--btn-text);
}

.am-btn-dark:hover { background: var(--btn-dark-bg-hover); }

.am-btn-gray {
  background: var(--btn-gray-bg);
  color: var(--btn-text);
}

.am-btn-gray:hover { background: var(--btn-gray-bg-hover); }

.am-btn-group { display: inline-flex; }
.am-btn-group .am-btn:first-child { border-radius: var(--radius) 0 0 var(--radius); }
.am-btn-group .am-btn:last-child { border-radius: 0 var(--radius) var(--radius) 0; }
.am-btn-group .am-btn + .am-btn { margin-left: 1px; }

.am-divider-vert {
  width: 0;
  height: 18px;
  margin: 0 4px;
  border-left: var(--border-width) solid var(--divider);
}

.am-tooltip-anchor,
.am-dropdown { position: relative; }

.am-tooltip {
  position: absolute;
  z-index: 5;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  padding: 3px 8px;
  border-radius: var(--radius);
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  font-size: 12px;
  white-space: nowrap;
}

.am-menu {
  position: absolute;
  z-index: 5;
  top: calc(100% + 4px);
  left: 0;
  min-width: 130px;
  padding: 4px;
  border-radius: var(--radius);
  background: var(--bg-raised);
  box-shadow: 0 1px 6px var(--shadow-color);
  list-style: none;
}

.am-menu li {
  padding: 3px 8px;
  border-radius: var(--radius);
  cursor: pointer;
}

.am-menu li:hover,
.am-menu li.hover {
  background: var(--menu-hover-bg);
  color: var(--menu-hover-text);
}

.am-query-info {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px 8px;
  flex: none;
}

.am-query-info b { margin-right: 8px; }

/* Inputs */
.am-input,
.am-select {
  height: 26px;
  padding: 0 8px;
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  background: var(--input-bg);
  color: var(--text);
  font: inherit;
  outline: none;
}

.am-input::placeholder { color: var(--text-placeholder); }

.am-input:focus,
.am-input.focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
}

.am-input[readonly] { background: var(--input-bg-readonly); }

.am-input:disabled {
  background: var(--input-bg-disabled);
  opacity: 0.5;
}

.am-input.is-error { border-color: var(--error); }

.am-select {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 140px;
}

.am-select svg:last-child { margin-left: auto; }
.am-select-sm { min-width: 0; height: 22px; margin-left: 4px; }

.am-input-group { display: flex; }
.am-input-group .am-input { flex: 1; border-radius: var(--radius) 0 0 var(--radius); }

.am-input-addon {
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: var(--border-width) solid var(--border);
  border-left: 0;
  border-radius: 0 var(--radius) var(--radius) 0;
  background: var(--input-bg-readonly);
}

.am-input-cell { height: 20px; width: 110px; }

.am-checkbox {
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  border: var(--border-width) solid var(--border);
  border-radius: calc(var(--radius) / 2);
  background: var(--input-bg);
  vertical-align: middle;
}

.am-checkbox.checked {
  border-color: var(--primary-color);
  background: var(--primary-color);
}

.am-checkbox.checked::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid var(--primary-color-text);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.am-switch {
  position: relative;
  display: inline-block;
  width: 28px;
  height: 16px;
  border: var(--border-width) solid var(--border);
  border-radius: 8px;
  background: var(--input-bg);
  vertical-align: middle;
}

.am-switch::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-raised);
  transition: left 0.2s;
}

.am-switch.on {
  border-color: var(--primary-color);
  background: var(--primary-color);
}

.am-switch.on::before { left: 13px; }

.am-check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.am-flex-gap {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Results grid */
.am-results {
  flex: 1;
  min-height: 0;
  padding: 0 10px 6px;
  background: var(--bg-app);
}

.am-grid {
  display: table;
  border-spacing: var(--grid-border-width);
  background: var(--grid-border);
  font-size: 12.5px;
}

.am-grid-row { display: table-row; }

.am-th,
.am-td {
  display: table-cell;
  padding: 3px 8px;
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.am-th {
  position: sticky;
  top: 0;
  background: var(--grid-header-bg);
  box-shadow: 0 0 0 var(--grid-border-width) var(--grid-header-border);
  color: var(--text);
  font-weight: 700;
}

.am-td { background: var(--grid-row-bg); }

.am-td.selected {
  box-shadow: inset 0 0 0 2px var(--grid-cell-focus);
  background: var(--grid-cell-focus-bg);
}

/* Console */
.am-console {
  flex: none;
  height: 110px;
  overflow: auto;
  border-top: var(--border-width) solid var(--separator);
  background: var(--bg-surface);
  font: 12px/1.6 ui-monospace, Consolas, monospace;
}

.am-console-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  font-family: system-ui, sans-serif;
  font-weight: 700;
}

.am-console-log {
  display: flex;
  gap: 10px;
  padding: 1px 10px;
}

.am-console-log:hover { background: var(--bg-panel); }

/* Tables (structure, settings) */
.am-table-wrap {
  flex: 1;
  min-height: 0;
  padding: 4px 10px;
}

.am-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.am-tr { display: table-row; }

.am-tcell {
  display: table-cell;
  padding: 5px 8px;
  border-bottom: var(--border-width) solid var(--table-border);
  vertical-align: middle;
  white-space: nowrap;
}

.am-th2 { font-weight: 700; }
.am-type { font-weight: 600; }
.am-table-hover .am-tr:not(.am-thead):hover { background: var(--table-row-hover); }
.am-table-striped .am-tr:nth-of-type(odd) { background: var(--table-row-alt); }
.am-table .am-tr.active { background: var(--table-row-active); }
.am-table .am-tr.selected { background: var(--table-row-selected) !important; }

/* Diagram */
.am-diagram {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background-color: var(--bg-app);
  background-image: radial-gradient(var(--diagram-dot) 1px, transparent 1px);
  background-size: 20px 20px;
}

.am-diagram svg { width: 100%; min-width: 700px; height: auto; }
.am-dt-box { fill: var(--diagram-table-bg); stroke: var(--diagram-table-border); stroke-width: 1; }
.am-dt-head { fill: var(--diagram-header-bg); }
.am-dt-name { fill: var(--text); font-weight: 700; font-size: 13px; }
.am-dt-text { fill: var(--text); font-size: 12px; }
.am-dt-type { font-size: 10px; }
.am-dt-row { fill: transparent; }
.am-dt-field.linked .am-dt-row { fill: var(--diagram-row-linked); }
.am-dt-field:hover .am-dt-row { fill: var(--diagram-row-hover); }
.am-rel { stroke: var(--diagram-relation); stroke-width: 1.5; fill: none; }

/* Footer */
.am-footer {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  flex: none;
  height: 28px;
  padding: 0 4px;
  background: var(--primary-color);
  color: var(--primary-color-text);
  box-shadow: 0 0 1px 0 var(--shadow-color);
  font-size: 12px;
}

.am-footer-el {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 100%;
  padding: 0 8px;
}

.am-footer-link { cursor: pointer; }
.am-footer-link:hover { background: rgb(255 255 255 / 10%); }

/* Context menu */
.am-context {
  position: absolute;
  z-index: 20;
  min-width: 180px;
  padding: 4px 0;
  border: var(--border-width) solid var(--context-border);
  border-radius: var(--radius);
  background: var(--context-bg);
  color: var(--context-text);
  box-shadow: 0 0 2px 0 var(--shadow-color);
}

.am-context-el {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  cursor: pointer;
}

.am-context-el:hover,
.am-context-el.hover { background: var(--context-hover); }

/* Modals */
.am-modal {
  position: absolute;
  z-index: 10;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.am-modal-overlay {
  position: absolute;
  inset: 0;
  background: var(--bg-overlay);
}

.am-modal-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 560px;
  max-height: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--bg-surface);
  color: var(--text);
  box-shadow: 0 0 1px 0 var(--shadow-color);
}

.am-modal-wide { width: 640px; }

.am-modal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--modal-header-bg);
  color: var(--modal-header-text);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
}

.am-tabs {
  display: flex;
  gap: 4px;
  padding: 0 12px;
  border-bottom: var(--border-width) solid var(--border-subtle);
}

.am-tabs-item {
  padding: 7px 8px;
  border-bottom: var(--border-width-lg) solid transparent;
  opacity: 0.7;
  cursor: pointer;
}

.am-tabs-item:hover { opacity: 1; }

.am-tabs-item.active {
  opacity: 1;
  border-bottom-color: var(--primary-color);
}

.am-modal-body {
  padding: 12px;
  overflow: auto;
}

.am-modal-table { padding-top: 4px; }

.am-form-row {
  display: grid;
  grid-template-columns: 130px 1fr;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.am-form-row .am-input { width: 100%; }
.am-form-row > span > .am-input { width: 100%; }

.am-hint {
  display: block;
  font-size: 11px;
  margin-top: 2px;
}

.am-divider {
  margin: 10px 0;
  border-top: var(--border-width) solid var(--divider);
}

.am-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border-radius: var(--radius);
  background: var(--bg-card);
}

.am-card code,
.am-tcell code {
  padding: 1px 4px;
  border: var(--border-width) solid var(--code-border);
  border-radius: calc(var(--radius) / 2);
  background: var(--code-bg);
  color: var(--code-text);
  font: 12px ui-monospace, Consolas, monospace;
  align-self: flex-start;
}

.am-labels {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

.am-label {
  padding: 1px 7px;
  border-radius: var(--radius);
  color: #fff;
  font-size: 12px;
}

.am-label-success { background: var(--success); }
.am-label-warning { background: var(--warning); }
.am-label-error { background: var(--error); }

.am-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding: 10px 12px;
}

.am-text-editor {
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius);
  min-height: 190px;
}

.am-text-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.am-segment {
  display: inline-flex;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--btn-dark-bg);
  color: var(--btn-text);
}

.am-segment span {
  padding: 2px 10px;
  cursor: pointer;
}

.am-segment span.on {
  background: var(--primary-color);
  color: var(--primary-color-text);
}
</style>
