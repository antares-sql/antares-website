/**
 * State of the theme editor: the token catalog and the base themes come from the theme gallery
 * (generated from the app sources), the theme being edited lives here and in localStorage.
 */
import { computed, reactive, ref, watch } from 'vue'
import { isThemeColor, lengthToPx } from './colors'

export type Appearance = 'dark' | 'light'

export interface SyntaxStyle {
  color?: string
  backgroundColor?: string
  fontStyle?: string
  fontWeight?: string
  textDecoration?: string
}

export interface Theme {
  $schema?: string
  schemaVersion: number
  id: string
  name: string
  appearance: Appearance
  author?: string
  description?: string
  version?: string
  license?: string
  tags?: string[]
  colors: Record<string, string>
  shape: Record<string, string>
  accent: Record<string, string>
  editor: { colors: Record<string, string>, syntax: Record<string, SyntaxStyle> }
}

export interface Catalog {
  schemaVersion: number
  colorGroups: Record<string, string[]>
  shapeRanges: Record<string, { min: number, max: number }>
  shapeColorTokens: string[]
  folderColorSlots: { name: string, hex: string }[]
  editorColorKeys: string[]
  syntaxKeys: string[]
}

export interface GalleryEntry {
  id: string
  name: string
  appearance: Appearance
  author?: string
  description?: string
  tags?: string[]
  theme: string
  preview?: string
}

export const DEFAULT_GALLERY = 'https://raw.githubusercontent.com/antares-sql/themes/main'
const SCHEMA_URL = 'https://raw.githubusercontent.com/antares-sql/themes/main/schema/theme.schema.json'
const STORAGE_KEY = 'antares-theme-editor'

const SYNTAX_PATTERNS: Record<string, RegExp> = {
  fontStyle: /^(normal|italic)$/,
  fontWeight: /^(normal|bold|[1-9]00)$/,
  textDecoration: /^(none|underline|line-through)$/
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRecord = (v: unknown): v is Record<string, any> => typeof v === 'object' && v !== null && !Array.isArray(v)

export const emptyTheme = (appearance: Appearance): Theme => ({
  schemaVersion: 1,
  id: `my-${appearance}-theme`,
  name: `My ${appearance === 'dark' ? 'Dark' : 'Light'} Theme`,
  appearance,
  author: '',
  description: '',
  version: '1.0.0',
  license: 'MIT',
  tags: [],
  colors: {},
  shape: {},
  accent: {},
  editor: { colors: {}, syntax: {} }
})

const galleryUrl = ref(DEFAULT_GALLERY)
const catalog = ref<Catalog | null>(null)
const bases = reactive<Partial<Record<Appearance, Theme>>>({})
const loadError = ref('')
const theme = ref<Theme>(emptyTheme('dark'))
/** Folder palette slot used as accent in the preview */
const previewSlot = ref('default')

/**
 * Parses a theme file with the rules of the app (validateTheme in src/common/themes/theme.ts):
 * unknown tokens and invalid values are dropped with a warning
 */
export const sanitizeTheme = (raw: unknown, cat: Catalog): { theme: Theme | null, errors: string[], warnings: string[] } => {
  const errors: string[] = []
  const warnings: string[] = []
  if (!isRecord(raw)) { return { theme: null, errors: ['The theme must be a JSON object'], warnings } }
  if (typeof raw.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(raw.id)) { errors.push('"id" is required: lowercase letters, digits and dashes') }
  if (typeof raw.name !== 'string' || !raw.name.trim()) { errors.push('"name" is required') }
  if (raw.appearance !== 'dark' && raw.appearance !== 'light') { errors.push('"appearance" must be "dark" or "light"') }
  if (errors.length) { return { theme: null, errors, warnings } }

  const t = emptyTheme(raw.appearance)
  t.id = raw.id
  t.name = raw.name.trim()
  for (const key of ['author', 'description', 'version', 'license'] as const) {
    t[key] = typeof raw[key] === 'string' ? raw[key] : ''
  }
  t.tags = Array.isArray(raw.tags) ? raw.tags.filter((tag: unknown) => typeof tag === 'string' && /^[a-z0-9-]{1,30}$/.test(tag)) : []

  const colorTokens = Object.values(cat.colorGroups).flat()
  for (const [token, value] of Object.entries(isRecord(raw.colors) ? raw.colors : {})) {
    if (!colorTokens.includes(token)) { warnings.push(`colors.${token}: unknown token`) } else if (!isThemeColor(value)) { warnings.push(`colors.${token}: invalid color`) } else { t.colors[token] = value.trim() }
  }
  for (const [token, value] of Object.entries(isRecord(raw.shape) ? raw.shape : {})) {
    if (cat.shapeColorTokens.includes(token)) {
      if (isThemeColor(value)) { t.shape[token] = value.trim() } else { warnings.push(`shape.${token}: invalid color`) }
    } else if (cat.shapeRanges[token]) {
      const px = lengthToPx(value)
      const { min, max } = cat.shapeRanges[token]
      if (px !== null && px >= min && px <= max) { t.shape[token] = String(value).trim() } else { warnings.push(`shape.${token}: expected ${min}px to ${max}px`) }
    } else { warnings.push(`shape.${token}: unknown token`) }
  }
  const slots = cat.folderColorSlots.map(s => s.name)
  for (const [slot, value] of Object.entries(isRecord(raw.accent) ? raw.accent : {})) {
    if (!slots.includes(slot)) { warnings.push(`accent.${slot}: unknown slot`) } else if (typeof value !== 'string' || !/^#[0-9a-f]{6}$/i.test(value.trim())) { warnings.push(`accent.${slot}: expected #rrggbb`) } else { t.accent[slot] = value.trim() }
  }
  const editor = isRecord(raw.editor) ? raw.editor : {}
  for (const [key, value] of Object.entries(isRecord(editor.colors) ? editor.colors : {})) {
    if (!cat.editorColorKeys.includes(key)) { warnings.push(`editor.colors.${key}: unknown key`) } else if (!isThemeColor(value) || value.trim() === 'accent') { warnings.push(`editor.colors.${key}: invalid color`) } else { t.editor.colors[key] = value.trim() }
  }
  for (const [key, style] of Object.entries(isRecord(editor.syntax) ? editor.syntax : {})) {
    if (!cat.syntaxKeys.includes(key) || !isRecord(style)) { warnings.push(`editor.syntax.${key}: unknown token`); continue }
    const clean: SyntaxStyle = {}
    for (const [prop, value] of Object.entries(style)) {
      if (prop === 'color' || prop === 'backgroundColor') {
        if (isThemeColor(value) && value.trim() !== 'accent') { clean[prop] = value.trim() } else { warnings.push(`editor.syntax.${key}.${prop}: invalid color`) }
      } else if (SYNTAX_PATTERNS[prop] && typeof value === 'string' && SYNTAX_PATTERNS[prop].test(value)) {
        clean[prop as keyof SyntaxStyle] = value
      } else { warnings.push(`editor.syntax.${key}.${prop}: invalid value`) }
    }
    t.editor.syntax[key] = clean
  }
  return { theme: t, errors, warnings }
}

const fetchJson = async (url: string) => {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) { throw new Error(`${res.status} ${res.statusText} (${url})`) }
  return res.json()
}

/** Only http(s) URLs are accepted as gallery override (?gallery=...) */
const safeGalleryUrl = (value: string | null) => {
  if (!value) { return null }
  try {
    const url = new URL(value)
    return ['http:', 'https:'].includes(url.protocol) ? url.href.replace(/\/+$/, '') : null
  } catch { return null }
}

const load = async () => {
  if (catalog.value) { return }
  galleryUrl.value = safeGalleryUrl(new URLSearchParams(location.search).get('gallery')) ?? DEFAULT_GALLERY
  try {
    const [cat, dark, light] = await Promise.all([
      fetchJson(`${galleryUrl.value}/schema/tokens.json`),
      fetchJson(`${galleryUrl.value}/base/dark.json`),
      fetchJson(`${galleryUrl.value}/base/light.json`)
    ])
    bases.dark = sanitizeTheme(dark, cat).theme as Theme
    bases.light = sanitizeTheme(light, cat).theme as Theme
    catalog.value = cat
  } catch (err) {
    loadError.value = `Can't load the theme catalog from the gallery: ${(err as Error).message}`
    return
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const restored = saved ? sanitizeTheme(JSON.parse(saved), catalog.value as Catalog).theme : null
    if (restored) { theme.value = restored }
  } catch { /* storage unavailable or corrupted: start from the default theme */ }

  let timer: ReturnType<typeof setTimeout>
  watch(theme, () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(theme.value)) } catch { /* storage unavailable: skip saving */ }
    }, 300)
  }, { deep: true })
}

const loadGallery = async (): Promise<GalleryEntry[]> => {
  const index = await fetchJson(`${galleryUrl.value}/index.json`)
  return index.themes ?? []
}

const galleryAsset = (relative: string) => `${galleryUrl.value}/${relative}`

const openGalleryTheme = async (entry: GalleryEntry) => {
  const raw = await fetchJson(galleryAsset(entry.theme))
  return sanitizeTheme(raw, catalog.value as Catalog)
}

/** The theme with the base values filled in: what the app shows */
const effective = computed(() => {
  const base = bases[theme.value.appearance]
  const t = theme.value
  const slots = catalog.value?.folderColorSlots ?? []
  return {
    colors: { ...base?.colors, ...t.colors } as Record<string, string>,
    shape: { ...base?.shape, ...t.shape } as Record<string, string>,
    accent: Object.fromEntries(slots.map(s => [s.name, t.accent[s.name] || s.hex])) as Record<string, string>,
    editorColors: { ...base?.editor.colors, ...t.editor.colors } as Record<string, string>,
    syntax: { ...base?.editor.syntax, ...t.editor.syntax } as Record<string, SyntaxStyle>
  }
})

/** The theme file: own values only, or every value with `complete` */
const exportTheme = (complete: boolean) => {
  const t = theme.value
  const cat = catalog.value as Catalog
  const base = bases[t.appearance] as Theme
  const ordered = <T>(keys: string[], values: Record<string, T>) =>
    Object.fromEntries(keys.filter(k => values[k] !== undefined).map(k => [k, values[k]]))
  const colors = ordered(Object.values(cat.colorGroups).flat(), complete ? { ...base.colors, ...t.colors } : t.colors)
  const shape = ordered([...Object.keys(cat.shapeRanges), ...cat.shapeColorTokens], complete ? { ...base.shape, ...t.shape } : t.shape)
  const accent = ordered(cat.folderColorSlots.map(s => s.name), t.accent)
  const editorColors = ordered(cat.editorColorKeys, complete ? { ...base.editor.colors, ...t.editor.colors } : t.editor.colors)
  const syntax = ordered(cat.syntaxKeys, complete ? { ...base.editor.syntax, ...t.editor.syntax } : t.editor.syntax)

  const out: Record<string, unknown> = {
    $schema: SCHEMA_URL,
    schemaVersion: cat.schemaVersion,
    id: t.id,
    name: t.name,
    appearance: t.appearance
  }
  for (const key of ['author', 'description', 'version', 'license'] as const) {
    if (t[key]?.trim()) { out[key] = t[key]?.trim() }
  }
  if (t.tags?.length) { out.tags = t.tags }
  if (Object.keys(colors).length) { out.colors = colors }
  if (Object.keys(shape).length) { out.shape = shape }
  if (Object.keys(accent).length) { out.accent = accent }
  if (Object.keys(editorColors).length || Object.keys(syntax).length) {
    out.editor = {
      ...(Object.keys(editorColors).length ? { colors: editorColors } : {}),
      ...(Object.keys(syntax).length ? { syntax } : {})
    }
  }
  return out
}

const editedCount = computed(() => {
  const t = theme.value
  return Object.keys(t.colors).length + Object.keys(t.shape).length + Object.keys(t.accent).length +
    Object.keys(t.editor.colors).length + Object.keys(t.editor.syntax).length
})

export const useThemeEditor = () => ({
  galleryUrl,
  catalog,
  bases,
  loadError,
  theme,
  previewSlot,
  effective,
  editedCount,
  load,
  loadGallery,
  galleryAsset,
  openGalleryTheme,
  exportTheme
})
