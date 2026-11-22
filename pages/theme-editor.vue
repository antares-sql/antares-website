<template>
  <div class="te flex h-screen flex-col bg-slate-900 text-slate-200">
    <Head>
      <Title>Theme Editor | Antares SQL</Title>
      <Meta name="robots" content="noindex" />
      <Meta name="description" content="Create a theme for Antares SQL with a live preview, then export it or share it in the theme gallery." />
    </Head>

    <!-- Top bar -->
    <header class="flex flex-none flex-wrap items-center gap-3 border-b border-slate-700 px-4 py-2">
      <img src="~/assets/images/logo.png" alt="" class="h-7 w-7">
      <div class="mr-auto leading-tight">
        <div class="font-bold">
          Theme Editor
        </div>
        <div class="text-xs text-slate-400">
          {{ theme.name || 'Untitled' }} · {{ theme.appearance }} · {{ editedCount }} values set
        </div>
      </div>
      <div class="relative">
        <button class="te-btn" type="button" @click="menu = menu === 'new' ? null : 'new'">
          <PlusIcon size="16" /> New
        </button>
        <div v-if="menu === 'new'" class="te-menu">
          <button type="button" @click="startNew('dark')">
            <MoonIcon size="15" /> From the built-in Dark
          </button>
          <button type="button" @click="startNew('light')">
            <SunIcon size="15" /> From the built-in Light
          </button>
        </div>
      </div>
      <button class="te-btn" type="button" @click="openGallery">
        <PaletteIcon size="16" /> Gallery
      </button>
      <button class="te-btn" type="button" @click="fileInput?.click()">
        <UploadIcon size="16" /> Import
      </button>
      <input
        ref="fileInput"
        type="file"
        accept=".json,application/json"
        class="hidden"
        @change="importFile"
      >
      <div class="relative">
        <button class="te-btn te-btn-primary" type="button" :disabled="!catalog" @click="menu = menu === 'export' ? null : 'export'">
          <DownloadIcon size="16" /> Export
        </button>
        <div v-if="menu === 'export'" class="te-menu te-menu-right w-72">
          <label class="flex items-start gap-2 px-3 py-2 text-sm">
            <input v-model="exportComplete" type="checkbox" class="mt-1">
            <span>
              Include unchanged values
              <span class="block text-xs text-slate-400">Every value, also the ones inherited from the built-in {{ theme.appearance }} theme</span>
            </span>
          </label>
          <button type="button" @click="download">
            <DownloadIcon size="15" /> Download {{ theme.id || 'theme' }}.json
          </button>
          <button type="button" @click="copy">
            <CopyIcon size="15" /> Copy JSON
          </button>
          <p class="px-3 pt-1 pb-2 text-xs text-slate-400">
            Import it in Antares from <b>Settings → Themes → Import</b>, or share it in the
            <a class="text-pink-300 underline" :href="galleryRepo" target="_blank" rel="noopener">theme gallery</a>.
          </p>
        </div>
      </div>
    </header>

    <div v-if="loadError" class="m-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-200">
      {{ loadError }}
    </div>
    <div v-else-if="!catalog" class="m-auto text-slate-400">
      Loading the theme catalog…
    </div>

    <div v-else class="flex min-h-0 flex-1 flex-col lg:flex-row" @click="menu = null">
      <!-- Preview -->
      <section class="flex min-h-[520px] min-w-0 flex-1 flex-col p-4">
        <MockApp
          ref="mock"
          class="te-preview"
          :style="{ zoom: zoom / 100 }"
          :highlight="hovered"
          :inspect="inspect"
          @select="onSelect"
        />
        <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <label class="flex items-center gap-1">
            <input v-model="inspect" type="checkbox"> Click an element to edit its colors
          </label>
          <span class="flex items-center gap-1">Zoom
            <select v-model.number="zoom" class="rounded border border-slate-700 bg-slate-800 px-1">
              <option v-for="z in [60, 75, 90, 100, 110]" :key="z" :value="z">{{ z }}%</option>
            </select>
          </span>
          <span>Right-click in the preview to open the context menu</span>
        </div>
      </section>

      <!-- Controls -->
      <aside class="flex min-h-0 w-full flex-none flex-col border-t border-slate-700 bg-slate-900/80 lg:w-[400px] lg:border-t-0 lg:border-l">
        <nav class="flex flex-none gap-1 overflow-x-auto px-3 pt-3">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="te-tab"
            :class="{ on: sideTab === tab.id }"
            @click="sideTab = tab.id; query = ''"
          >
            {{ tab.label }}
          </button>
        </nav>
        <div class="flex-none px-3 pt-3">
          <div class="relative">
            <SearchIcon size="15" class="absolute left-2 top-2 text-slate-500" />
            <input
              v-model="query"
              class="w-full rounded-md border border-slate-700 bg-black/30 py-1 pl-8 pr-2 text-sm outline-none focus:border-pink-400"
              placeholder="Search every value (e.g. border, tooltip, keyword)"
            >
          </div>
        </div>

        <div ref="sidebar" class="min-h-0 flex-1 overflow-y-auto p-3">
          <!-- Element picked in the preview -->
          <div v-if="selected.length && !query" class="mb-4 rounded-lg border border-pink-400/40 bg-pink-400/5 p-2">
            <div class="mb-1 flex items-center px-2 text-xs font-bold uppercase tracking-wide text-pink-300">
              <PointerIcon size="14" class="mr-1" /> Selected element
              <button type="button" class="ml-auto text-slate-400 hover:text-slate-200" title="Close" @click="selected = []">
                <XIcon size="14" />
              </button>
            </div>
            <TokenRow
              v-for="id in selected"
              :id="id"
              :key="`sel-${id}`"
              :active="hovered === id"
              @hover="hovered = $event"
            />
          </div>

          <!-- Search results -->
          <template v-if="query">
            <TokenRow
              v-for="id in searchResults"
              :id="id"
              :key="`q-${id}`"
              :active="hovered === id"
              @hover="hovered = $event"
              @reveal="reveal"
            />
            <p v-if="!searchResults.length" class="px-2 text-sm text-slate-400">
              Nothing matches “{{ query }}”.
            </p>
          </template>

          <template v-else-if="sideTab === 'interface'">
            <details v-for="(tokens, group) in catalog.colorGroups" :key="group" class="te-group" open>
              <summary>{{ groupLabels[group] ?? group }} <span>{{ ownCount(tokens.map(t => `c:${t}`)) }}</span></summary>
              <TokenRow
                v-for="t in tokens"
                :id="`c:${t}`"
                :key="t"
                :active="hovered === `c:${t}`"
                @hover="hovered = $event"
                @reveal="reveal"
              />
            </details>
          </template>

          <template v-else-if="sideTab === 'editor'">
            <details class="te-group" open>
              <summary>Editor <span>{{ ownCount(catalog.editorColorKeys.map(k => `e:${k}`)) }}</span></summary>
              <TokenRow
                v-for="k in catalog.editorColorKeys"
                :id="`e:${k}`"
                :key="k"
                :active="hovered === `e:${k}`"
                @hover="hovered = $event"
                @reveal="reveal"
              />
            </details>
            <details class="te-group" open>
              <summary>Syntax <span>{{ ownCount(catalog.syntaxKeys.map(k => `x:${k}`)) }}</span></summary>
              <p class="te-note">
                Each token takes its color, weight, style and decoration together: a changed token no longer follows the base theme.
              </p>
              <TokenRow
                v-for="k in catalog.syntaxKeys"
                :id="`x:${k}`"
                :key="k"
                :active="hovered === `x:${k}`"
                @hover="hovered = $event"
                @reveal="reveal"
              />
            </details>
          </template>

          <template v-else-if="sideTab === 'accent'">
            <p class="te-note">
              The accent is the color of the selected connection folder: the footer, primary buttons, active tabs.
              A theme can't replace it, but it can remap the palette, e.g. for color vision deficiencies.
              <b>Default accent</b> is used outside folders. Click a folder in the preview to try its color.
            </p>
            <TokenRow
              v-for="slot in catalog.folderColorSlots"
              :id="`a:${slot.name}`"
              :key="slot.name"
              :active="hovered === `a:${slot.name}` || previewSlot === slot.name"
              @hover="hovered = $event"
              @reveal="reveal"
            />
          </template>

          <template v-else-if="sideTab === 'shape'">
            <TokenRow
              v-for="id in shapeIds"
              :id="id"
              :key="id"
              :active="hovered === id"
              @hover="hovered = $event"
              @reveal="reveal"
            />
          </template>

          <template v-else>
            <div class="space-y-3 px-1 text-sm">
              <label class="te-field">
                <span>Name</span>
                <input v-model="theme.name" maxlength="64" @input="syncId">
              </label>
              <label class="te-field">
                <span>Id <small>lowercase letters, digits and dashes; the gallery folder name</small></span>
                <input v-model="theme.id" maxlength="64" :class="{ invalid: !idValid }" @input="idTouched = true">
              </label>
              <div class="te-field">
                <span>Appearance <small>values you don't set come from this built-in theme</small></span>
                <div class="flex gap-2">
                  <button
                    v-for="a in (['dark', 'light'] as Appearance[])"
                    :key="a"
                    type="button"
                    class="te-tab flex-1"
                    :class="{ on: theme.appearance === a }"
                    @click="theme.appearance = a"
                  >
                    {{ a === 'dark' ? 'Dark' : 'Light' }}
                  </button>
                </div>
              </div>
              <label class="te-field">
                <span>Author</span>
                <input v-model="theme.author" maxlength="100">
              </label>
              <label class="te-field">
                <span>Description</span>
                <textarea v-model="theme.description" maxlength="500" rows="3" />
              </label>
              <div class="flex gap-3">
                <label class="te-field flex-1">
                  <span>Version</span>
                  <input v-model="theme.version" maxlength="100">
                </label>
                <label class="te-field flex-1">
                  <span>License</span>
                  <input v-model="theme.license" maxlength="100">
                </label>
              </div>
              <label class="te-field">
                <span>Tags <small>comma separated, e.g. pastel, high-contrast</small></span>
                <input :value="(theme.tags ?? []).join(', ')" @change="setTags(($event.target as HTMLInputElement).value)">
              </label>
              <div class="border-t border-slate-700 pt-3">
                <button type="button" class="te-btn w-full justify-center" @click="resetAll">
                  <ArrowBackUpIcon size="15" /> Reset every value to the built-in {{ theme.appearance }} theme
                </button>
              </div>
            </div>
          </template>
        </div>
      </aside>
    </div>

    <!-- Gallery -->
    <div v-if="gallery.open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" @click.self="gallery.open = false">
      <div class="flex max-h-full w-full max-w-5xl flex-col rounded-xl border border-slate-700 bg-slate-900">
        <div class="flex items-center border-b border-slate-700 px-4 py-3">
          <b>Start from a gallery theme</b>
          <button type="button" class="ml-auto text-slate-400 hover:text-white" @click="gallery.open = false">
            <XIcon size="18" />
          </button>
        </div>
        <div class="overflow-y-auto p-4">
          <p v-if="gallery.loading" class="text-slate-400">
            Loading…
          </p>
          <p v-else-if="gallery.error" class="text-red-300">
            {{ gallery.error }}
          </p>
          <div v-else class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <button
              v-for="entry in gallery.items"
              :key="entry.id"
              type="button"
              class="overflow-hidden rounded-lg border border-slate-700 text-left hover:border-pink-400"
              @click="pickGallery(entry)"
            >
              <img v-if="entry.preview" :src="galleryAsset(entry.preview)" :alt="entry.name" loading="lazy" class="aspect-[4/3] w-full object-cover object-left-top">
              <div class="px-2 py-1 text-sm">
                {{ entry.name }}
                <span class="text-xs text-slate-400">· {{ entry.appearance }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div v-if="toast" class="fixed bottom-4 left-1/2 z-50 max-w-lg -translate-x-1/2 rounded-lg border px-4 py-2 text-sm shadow-xl" :class="toast.error ? 'border-red-500/50 bg-red-950 text-red-100' : 'border-slate-600 bg-slate-800'">
      <div>{{ toast.text }}</div>
      <ul v-if="toast.details?.length" class="mt-1 max-h-32 list-disc overflow-y-auto pl-5 text-xs opacity-80">
        <li v-for="d in toast.details" :key="d">
          {{ d }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import {
  ArrowBackUpIcon, CopyIcon, DownloadIcon, MoonIcon, PaletteIcon, PlusIcon, PointerIcon, SearchIcon, SunIcon,
  UploadIcon, XIcon
} from 'vue-tabler-icons'
import MockApp from '~/components/theme-editor/MockApp.vue'
import TokenRow from '~/components/theme-editor/TokenRow.vue'
import { colorLabels, editorLabels, groupLabels, shapeLabels, slotLabel, syntaxLabels } from '~/libs/themeEditor/labels'
import { Appearance, Catalog, emptyTheme, GalleryEntry, sanitizeTheme, Theme, useThemeEditor } from '~/libs/themeEditor/state'

definePageMeta({ bare: true })

const {
  catalog, loadError, theme, editedCount, previewSlot, load, loadGallery, galleryAsset, openGalleryTheme, exportTheme
} = useThemeEditor()

const galleryRepo = 'https://github.com/antares-sql/themes'
const tabs = [
  { id: 'interface', label: 'Interface' },
  { id: 'editor', label: 'Code editor' },
  { id: 'accent', label: 'Accent' },
  { id: 'shape', label: 'Shape' },
  { id: 'details', label: 'Details' }
]
const sideTab = ref('interface')
const query = ref('')
const menu = ref<null | 'new' | 'export'>(null)
const hovered = ref<string | null>(null)
const selected = ref<string[]>([])
const inspect = ref(true)
const zoom = ref(100)
const exportComplete = ref(true)
const mock = ref<InstanceType<typeof MockApp>>()
const sidebar = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()

onMounted(load)

// ---------------------------------------------------------------- Token lists

const shapeIds = computed(() => catalog.value
  ? [...Object.keys(catalog.value.shapeRanges), ...catalog.value.shapeColorTokens].map(t => `s:${t}`)
  : [])

const allIds = computed(() => {
  const cat = catalog.value
  if (!cat) { return [] }
  return [
    ...Object.values(cat.colorGroups).flat().map(t => `c:${t}`),
    ...cat.editorColorKeys.map(k => `e:${k}`),
    ...cat.syntaxKeys.map(k => `x:${k}`),
    ...shapeIds.value,
    ...cat.folderColorSlots.map(s => `a:${s.name}`)
  ]
})

const searchText = (id: string) => {
  const n = id.slice(2)
  const words = {
    c: colorLabels[n]?.join(' '),
    e: `editor ${editorLabels[n]}`,
    x: `syntax ${syntaxLabels[n]}`,
    s: shapeLabels[n]?.join(' '),
    a: `accent folder ${slotLabel(n)}`
  }[id[0]]
  return `${n} ${words ?? ''}`.toLowerCase()
}
const searchResults = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  return allIds.value.filter(id => words.every(w => searchText(id).includes(w)))
})

const ownCount = (ids: string[]) => {
  const t = theme.value
  const n = ids.filter((id) => {
    const k = id.slice(2)
    return { c: t.colors, e: t.editor.colors, x: t.editor.syntax }[id[0] as 'c' | 'e' | 'x']?.[k] !== undefined
  }).length
  return n ? `${n} set` : ''
}

// ---------------------------------------------------------------- Preview ↔ controls

const onSelect = (ids: string[]) => {
  const known = new Set([...allIds.value, 'accent'])
  selected.value = ids.filter(id => known.has(id)).slice(0, 12)
  query.value = ''
  sidebar.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

const reveal = (id: string) => mock.value?.reveal(id)

// ---------------------------------------------------------------- Messages

const toast = ref<{ text: string, error?: boolean, details?: string[] } | null>(null)
let toastTimer: ReturnType<typeof setTimeout>
const notify = (text: string, opts: { error?: boolean, details?: string[] } = {}) => {
  toast.value = { text, ...opts }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = null }, opts.details?.length ? 9000 : 3500)
}

const confirmReplace = () => editedCount.value === 0 || confirm('Replace the current theme? Unsaved changes will be lost (export it first if you want to keep it).')

const useTheme = (t: Theme) => {
  theme.value = t
  selected.value = []
  idTouched.value = true
}

const startNew = (appearance: Appearance) => {
  menu.value = null
  if (!confirmReplace()) { return }
  useTheme(emptyTheme(appearance))
  idTouched.value = false
  notify(`New theme from the built-in ${appearance} theme`)
}

const resetAll = () => {
  if (!confirm('Reset every color, shape and editor value?')) { return }
  const t = theme.value
  t.colors = {}
  t.shape = {}
  t.accent = {}
  t.editor = { colors: {}, syntax: {} }
}

// ---------------------------------------------------------------- Import / gallery

const importFile = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) { return }
  try {
    const result = sanitizeTheme(JSON.parse(await file.text()), catalog.value as Catalog)
    if (!result.theme) { return notify('This is not a valid theme', { error: true, details: result.errors }) }
    if (!confirmReplace()) { return }
    useTheme(result.theme)
    notify(`Imported “${result.theme.name}”`, { details: result.warnings })
  } catch (err) {
    notify(`Can't read the file: ${(err as Error).message}`, { error: true })
  }
}

const gallery = reactive({ open: false, loading: false, error: '', items: [] as GalleryEntry[] })
const openGallery = async () => {
  gallery.open = true
  if (gallery.items.length) { return }
  gallery.loading = true
  try {
    gallery.items = await loadGallery()
  } catch (err) {
    gallery.error = `Can't load the gallery: ${(err as Error).message}`
  } finally {
    gallery.loading = false
  }
}
const pickGallery = async (entry: GalleryEntry) => {
  if (!confirmReplace()) { return }
  try {
    const result = await openGalleryTheme(entry)
    if (!result.theme) { return notify('This gallery theme is not valid', { error: true, details: result.errors }) }
    // A derived theme: keep the values, ask for a new identity
    result.theme.id = `${entry.id}-custom`
    result.theme.name = `${entry.name} Custom`
    useTheme(result.theme)
    gallery.open = false
    notify(`Started from “${entry.name}”: rename it in Details`)
  } catch (err) {
    notify(`Can't load the theme: ${(err as Error).message}`, { error: true })
  }
}

// ---------------------------------------------------------------- Export

const idValid = computed(() => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(theme.value.id))
const nameValid = computed(() => !!theme.value.name.trim())

const exportable = () => {
  menu.value = null
  if (!idValid.value || !nameValid.value) {
    sideTab.value = 'details'
    notify('Give the theme a name and a valid id (lowercase letters, digits and dashes)', { error: true })
    return null
  }
  return JSON.stringify(exportTheme(exportComplete.value), null, 2) + '\n'
}

const download = () => {
  const json = exportable()
  if (!json) { return }
  const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${theme.value.id}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const copy = async () => {
  const json = exportable()
  if (!json) { return }
  try {
    await navigator.clipboard.writeText(json)
    notify('Theme JSON copied to the clipboard')
  } catch {
    notify('The browser blocked the clipboard: use Download', { error: true })
  }
}

// ---------------------------------------------------------------- Details

const idTouched = ref(false)
const syncId = () => {
  if (idTouched.value) { return }
  theme.value.id = theme.value.name.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64)
}
const setTags = (value: string) => {
  theme.value.tags = value.split(',').map(t => t.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')).filter(Boolean).slice(0, 10)
}
</script>

<style scoped>
.te-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid #334155;
  font-size: 14px;
}

.te-btn:hover {
  background: #1e293b;
}

.te-btn-primary {
  border-color: #db2777;
  background: #db2777;
  color: #fff;
}

.te-btn-primary:hover {
  background: #be185d;
}

.te-menu {
  position: absolute;
  z-index: 40;
  top: calc(100% + 6px);
  left: 0;
  min-width: 220px;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #334155;
  background: #1e293b;
  box-shadow: 0 10px 30px rgb(0 0 0 / 50%);
}

.te-menu-right {
  left: auto;
  right: 0;
}

.te-menu > button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
}

.te-menu > button:hover {
  background: #334155;
}

.te-preview {
  flex: 1;
  min-height: 0;
}

.te-tab {
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 13px;
  white-space: nowrap;
  color: #94a3b8;
}

.te-tab:hover {
  color: #e2e8f0;
}

.te-tab.on {
  border-color: #f472b6;
  color: #fbcfe8;
  background: rgb(244 114 182 / 10%);
}

.te-group {
  margin-bottom: 8px;
}

.te-group > summary {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #94a3b8;
  cursor: pointer;
}

.te-group > summary span {
  margin-left: auto;
  font-weight: 400;
  text-transform: none;
  color: #f9a8d4;
}

.te-note {
  padding: 0 8px 8px;
  font-size: 12px;
  color: #94a3b8;
}

.te-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.te-field > span {
  font-size: 12px;
  color: #cbd5e1;
}

.te-field small {
  color: #64748b;
}

.te-field input,
.te-field textarea {
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #020617;
  color: #e2e8f0;
  outline: none;
}

.te-field input:focus,
.te-field textarea:focus {
  border-color: #f472b6;
}

.te-field input.invalid {
  border-color: #ef4444;
}
</style>
