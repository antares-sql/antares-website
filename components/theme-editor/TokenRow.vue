<template>
  <!-- One editable token, by id: c:<ui color> s:<shape> e:<editor color> x:<syntax> a:<palette slot> / accent -->
  <div :data-token="id" @mouseenter="$emit('hover', id)" @mouseleave="$emit('hover', null)" @focusin="$emit('reveal', id)">
    <!-- Shape length -->
    <div v-if="kind === 'length'" class="tr-shape" :class="{ 'cf-active': active }">
      <div class="tr-shape-head">
        <span class="tr-label" :class="{ modified: ownValue !== undefined }">{{ label }}</span>
        <span class="tr-px">{{ px }}px</span>
        <button
          v-if="ownValue !== undefined"
          type="button"
          class="tr-reset"
          title="Reset to the base theme value"
          @click="reset"
        >
          <ArrowBackUpIcon size="14" />
        </button>
      </div>
      <div class="tr-hint">
        {{ hint }}
      </div>
      <input
        type="range"
        :min="range.min"
        :max="range.max"
        step="0.5"
        :value="px"
        class="tr-range"
        @input="set(`${($event.target as HTMLInputElement).value}px`)"
      >
    </div>

    <!-- Syntax token: color + style -->
    <div v-else-if="kind === 'syntax'" class="tr-syntax">
      <ColorField
        :name="id"
        :label="label"
        :value="ownSyntax?.color"
        :fallback="effectiveSyntax.color || editorForeground"
        :active="active"
        :contrast="contrast"
        @set="setSyntax('color', $event)"
        @reset="resetSyntax"
      />
      <div class="tr-styles">
        <button
          v-for="opt in styleOptions"
          :key="opt.prop"
          type="button"
          :class="{ on: effectiveSyntax[opt.prop] === opt.on }"
          :title="opt.title"
          :style="{ [opt.css]: opt.on }"
          @click="toggleStyle(opt.prop, opt.on, opt.off)"
        >
          {{ opt.text }}
        </button>
        <button
          type="button"
          :class="{ on: !!effectiveSyntax.backgroundColor }"
          title="Background color"
          @click="toggleBackground"
        >
          bg
        </button>
        <input
          v-if="effectiveSyntax.backgroundColor"
          class="tr-bg-input"
          :value="effectiveSyntax.backgroundColor"
          spellcheck="false"
          @change="setBackground(($event.target as HTMLInputElement).value)"
        >
      </div>
    </div>

    <!-- Colors -->
    <ColorField
      v-else
      :name="id"
      :label="label"
      :hint="hint"
      :value="ownValue"
      :fallback="fallback"
      :allow-accent="allowAccent"
      :accent-hex="accentHex"
      :alpha="kind !== 'slot'"
      :hex-only="kind === 'slot'"
      :active="active"
      :contrast="contrast"
      @set="set"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowBackUpIcon } from 'vue-tabler-icons'
import ColorField from './ColorField.vue'
import type { Rgba } from '~/libs/themeEditor/colors'
import { contrastRatio, isThemeColor, lengthToPx, over, parseColor, toHex } from '~/libs/themeEditor/colors'
import { colorLabels, editorLabels, shapeLabels, slotLabel, syntaxLabels } from '~/libs/themeEditor/labels'
import type { SyntaxStyle } from '~/libs/themeEditor/state'
import { useThemeEditor } from '~/libs/themeEditor/state'

const props = defineProps({
  id: { type: String, required: true },
  active: { type: Boolean, default: false }
})
defineEmits<{(e: 'hover', id: string | null): void, (e: 'reveal', id: string): void }>()

const { theme, effective, bases, catalog, previewSlot } = useThemeEditor()

const prefix = computed(() => props.id === 'accent' ? 'a' : props.id.slice(0, 1))
const name = computed(() => props.id === 'accent' ? previewSlot.value : props.id.slice(2))

const kind = computed(() => {
  switch (prefix.value) {
    case 'c': return 'color'
    case 's': return catalog.value?.shapeRanges[name.value] ? 'length' : 'shapeColor'
    case 'e': return 'editor'
    case 'x': return 'syntax'
    default: return 'slot'
  }
})

const label = computed(() => {
  switch (prefix.value) {
    case 'c': return colorLabels[name.value]?.[0] ?? name.value
    case 's': return shapeLabels[name.value]?.[0] ?? name.value
    case 'e': return `Editor: ${editorLabels[name.value] ?? name.value}`
    case 'x': return syntaxLabels[name.value] ?? name.value
    default: return `${slotLabel(name.value)}${props.id === 'accent' ? ' (accent in the preview)' : ''}`
  }
})

const hint = computed(() => {
  const own = prefix.value === 'c' ? colorLabels[name.value]?.[1] : prefix.value === 's' ? shapeLabels[name.value]?.[1] : ''
  return [own, name.value].filter(Boolean).join(' · ')
})

const accentHex = computed(() => effective.value.accent[previewSlot.value])
const allowAccent = computed(() => prefix.value === 'c' || props.id === 's:focus-ring-color')
const editorForeground = computed(() => effective.value.editorColors.foreground)

const ownValue = computed<string | undefined>(() => {
  const t = theme.value
  switch (prefix.value) {
    case 'c': return t.colors[name.value]
    case 's': return t.shape[name.value]
    case 'e': return t.editor.colors[name.value]
    default: return t.accent[name.value]
  }
})

const fallback = computed(() => {
  const base = bases[theme.value.appearance]
  switch (prefix.value) {
    case 'c': return base?.colors[name.value] ?? ''
    case 's': {
      if (base?.shape[name.value]) { return base.shape[name.value] }
      // The focus ring follows the accent, at 20% (--primary-color-shadow)
      const rgba = parseColor(accentHex.value)
      return rgba ? toHex({ ...rgba, a: 0.2 }) : ''
    }
    case 'e': return base?.editor.colors[name.value] ?? ''
    default: return catalog.value?.folderColorSlots.find(s => s.name === name.value)?.hex ?? ''
  }
})

const section = () => {
  const t = theme.value
  switch (prefix.value) {
    case 'c': return t.colors
    case 's': return t.shape
    case 'e': return t.editor.colors
    default: return t.accent
  }
}
const set = (value: string) => { section()[name.value] = value }
// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
const reset = () => { delete section()[name.value] }

// Shape lengths
const range = computed(() => catalog.value?.shapeRanges[name.value] ?? { min: 0, max: 20 })
const px = computed(() => lengthToPx(ownValue.value ?? fallback.value) ?? 0)

// Syntax
const ownSyntax = computed(() => theme.value.editor.syntax[name.value] as SyntaxStyle | undefined)
const effectiveSyntax = computed<SyntaxStyle>(() => effective.value.syntax[name.value] ?? {})
/** Editing a syntax token copies the base style first: a theme replaces the whole style of a token */
const editSyntax = () => {
  if (!theme.value.editor.syntax[name.value]) { theme.value.editor.syntax[name.value] = { ...effectiveSyntax.value } }
  return theme.value.editor.syntax[name.value]
}
const setSyntax = (prop: keyof SyntaxStyle, value: string) => { editSyntax()[prop] = value }
// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
const resetSyntax = () => { delete theme.value.editor.syntax[name.value] }
const styleOptions = [
  { prop: 'fontWeight', on: 'bold', off: 'normal', text: 'B', css: 'fontWeight', title: 'Bold' },
  { prop: 'fontStyle', on: 'italic', off: 'normal', text: 'I', css: 'fontStyle', title: 'Italic' },
  { prop: 'textDecoration', on: 'underline', off: 'none', text: 'U', css: 'textDecoration', title: 'Underline' }
] as const
const toggleStyle = (prop: keyof SyntaxStyle, on: string, off: string) => {
  // The own style is a full copy of the base one (editSyntax), so the opposite value is explicit
  const style = editSyntax()
  style[prop] = style[prop] === on ? off : on
}
const toggleBackground = () => {
  const style = editSyntax()
  if (style.backgroundColor) { delete style.backgroundColor } else { style.backgroundColor = 'rgba(255, 255, 255, 0.1)' }
}
const setBackground = (value: string) => {
  if (isThemeColor(value) && value.trim() !== 'accent' && parseColor(value)) { editSyntax().backgroundColor = value.trim() }
}

// Contrast with the background the color sits on
const CONTRAST_BG: Record<string, string> = {
  'c:text': 'c:bg-app',
  'c:text-muted': 'c:bg-panel',
  'c:text-placeholder': 'c:input-bg',
  'c:settingbar-text': 'c:bg-settingbar',
  'c:modal-header-text': 'c:modal-header-bg',
  'c:context-text': 'c:context-bg',
  'c:tooltip-text': 'c:tooltip-bg',
  'c:btn-text': 'c:btn-dark-bg',
  'c:code-text': 'c:code-bg',
  'c:menu-hover-text': 'c:menu-hover-bg',
  'e:foreground': 'e:background',
  'e:gutterForeground': 'e:gutterBackground'
}
const LABEL_OF: Record<string, string> = { 'c:bg-app': 'the app background', 'c:grid-row-bg': 'the result cells', 'e:background': 'the editor background' }

const resolve = (id: string): string => {
  const [p, n] = [id.slice(0, 1), id.slice(2)]
  const e = effective.value
  const v = p === 'c' ? e.colors[n] : e.editorColors[n]
  return v === 'accent' ? accentHex.value : v
}

const contrast = computed(() => {
  let bgId = CONTRAST_BG[props.id]
  if (!bgId && props.id.startsWith('c:type-')) { bgId = 'c:grid-row-bg' }
  if (!bgId && prefix.value === 'x') { bgId = 'e:background' }
  if (!bgId) { return null }
  const fgValue = prefix.value === 'x' ? (effectiveSyntax.value.color || editorForeground.value) : resolve(props.id)
  const appBg = parseColor(resolve('c:bg-app')) ?? { r: 0, g: 0, b: 0, a: 1 }
  const bgRaw = parseColor(resolve(bgId))
  const fgRaw = parseColor(fgValue)
  if (!bgRaw || !fgRaw) { return null }
  const bg = over(bgRaw, over(appBg, { r: 0, g: 0, b: 0, a: 1 }) as Rgba)
  const ratio = contrastRatio(over(fgRaw, bg), bg)
  const level = ratio >= 4.5 ? 'good' : ratio >= 3 ? 'fair' : 'poor'
  return { ratio, level, against: LABEL_OF[bgId] ?? (colorLabels[bgId.slice(2)]?.[0] ?? editorLabels[bgId.slice(2)] ?? bgId).toLowerCase() }
})
</script>

<style scoped>
.tr-shape {
  padding: 7px 8px;
  border-radius: 8px;
}

.tr-shape:hover,
.tr-shape.cf-active {
  background: rgb(148 163 184 / 10%);
}

.tr-shape.cf-active {
  box-shadow: inset 0 0 0 1px rgb(244 114 182 / 70%);
}

.tr-shape-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tr-label {
  font-size: 13px;
  color: #e2e8f0;
}

.tr-label.modified::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 6px;
  border-radius: 50%;
  background: #f472b6;
  vertical-align: middle;
}

.tr-px {
  margin-left: auto;
  font: 12px ui-monospace, monospace;
  color: #cbd5e1;
}

.tr-hint {
  font-size: 11px;
  color: #94a3b8;
}

.tr-reset {
  color: #94a3b8;
}

.tr-reset:hover {
  color: #e2e8f0;
}

.tr-range {
  width: 100%;
  accent-color: #f472b6;
}

.tr-styles {
  display: flex;
  gap: 4px;
  padding: 0 8px 6px 48px;
  margin-top: -2px;
}

.tr-styles button {
  min-width: 24px;
  height: 20px;
  padding: 0 5px;
  border-radius: 4px;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 12px;
}

.tr-styles button.on {
  border-color: #f472b6;
  color: #fbcfe8;
}

.tr-bg-input {
  flex: 1;
  min-width: 0;
  padding: 0 6px;
  border-radius: 4px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  font: 11px ui-monospace, monospace;
}
</style>
