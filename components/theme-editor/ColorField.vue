<template>
  <div
    class="cf"
    :class="{ 'cf-modified': modified, 'cf-active': active }"
    @mouseenter="$emit('hover', true)"
    @mouseleave="$emit('hover', false)"
  >
    <button
      ref="swatch"
      class="cf-swatch"
      type="button"
      :title="`Pick a color for ${label}`"
      @click="togglePicker"
    >
      <span :style="{ background: shown }" />
    </button>
    <div class="cf-body">
      <div class="cf-head">
        <span class="cf-label" :title="name">{{ label }}</span>
        <span
          v-if="contrast"
          class="cf-contrast"
          :class="contrast.level"
          :title="`Contrast with ${contrast.against}: ${contrast.ratio.toFixed(2)}:1 (WCAG AA needs 4.5:1 for text, 3:1 for large text and UI)`"
        >{{ contrast.ratio.toFixed(1) }}:1</span>
      </div>
      <div v-if="hint" class="cf-hint">
        {{ hint }}
      </div>
      <div class="cf-input-row">
        <input
          class="cf-input"
          :class="{ 'cf-invalid': invalid }"
          :value="text"
          spellcheck="false"
          @input="onText(($event.target as HTMLInputElement).value)"
          @blur="text = effectiveValue; invalid = false"
        >
        <button
          v-if="allowAccent"
          type="button"
          class="cf-chip"
          :class="{ on: effectiveValue === 'accent' }"
          title="Use the connection folder color (accent)"
          @click="$emit('set', 'accent')"
        >
          accent
        </button>
        <button
          v-if="modified"
          type="button"
          class="cf-reset"
          title="Reset to the base theme value"
          @click="$emit('reset')"
        >
          <ArrowBackUpIcon size="14" />
        </button>
      </div>
    </div>
    <div v-if="pickerOpen" ref="popover" class="cf-popover">
      <ColorPicker :value="pickerValue" :alpha="alpha" @input="$emit('set', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { ArrowBackUpIcon } from 'vue-tabler-icons'
import ColorPicker from './ColorPicker.vue'
import { isThemeColor, parseColor } from '~/libs/themeEditor/colors'

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  hint: { type: String, default: '' },
  /** Own value of the theme (undefined: falls back to the base) */
  value: { type: String as PropType<string | undefined>, default: undefined },
  fallback: { type: String, default: '' },
  allowAccent: { type: Boolean, default: false },
  accentHex: { type: String, default: '#e36929' },
  alpha: { type: Boolean, default: true },
  /** Hex only (#rrggbb), e.g. the accent palette */
  hexOnly: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  contrast: { type: Object as PropType<{ ratio: number, level: string, against: string } | null>, default: null }
})
const emit = defineEmits<{(e: 'set', value: string): void, (e: 'reset'): void, (e: 'hover', on: boolean): void }>()

const effectiveValue = computed(() => props.value ?? props.fallback)
const modified = computed(() => props.value !== undefined)
const shown = computed(() => effectiveValue.value === 'accent' ? props.accentHex : effectiveValue.value)
const pickerValue = computed(() => shown.value || '#000000')

const text = ref(effectiveValue.value)
const invalid = ref(false)
watch(effectiveValue, (v) => { if (!invalid.value) { text.value = v } })

const onText = (raw: string) => {
  text.value = raw
  const v = raw.trim()
  const ok = props.hexOnly
    ? /^#[0-9a-f]{6}$/i.test(v)
    : (v === 'accent' ? props.allowAccent : isThemeColor(v) && parseColor(v) !== null)
  invalid.value = !ok
  if (ok) { emit('set', v) }
}

const pickerOpen = ref(false)
const swatch = ref<HTMLElement>()
const popover = ref<HTMLElement>()
const outside = (e: PointerEvent) => {
  const target = e.target as Node
  if (!popover.value?.contains(target) && !swatch.value?.contains(target)) { pickerOpen.value = false }
}
const togglePicker = () => {
  pickerOpen.value = !pickerOpen.value
  if (pickerOpen.value) { window.addEventListener('pointerdown', outside) } else { window.removeEventListener('pointerdown', outside) }
}
watch(pickerOpen, (open) => { if (!open) { window.removeEventListener('pointerdown', outside) } })
onBeforeUnmount(() => window.removeEventListener('pointerdown', outside))
</script>

<style scoped>
.cf {
  position: relative;
  display: flex;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
}

.cf:hover,
.cf-active {
  background: rgb(148 163 184 / 10%);
}

.cf-active {
  box-shadow: inset 0 0 0 1px rgb(244 114 182 / 70%);
}

.cf-swatch {
  flex: none;
  width: 30px;
  height: 30px;
  margin-top: 2px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #475569;
  background: repeating-conic-gradient(#888 0 25%, #ccc 0 50%) 0 0 / 10px 10px;
  cursor: pointer;
}

.cf-swatch span {
  display: block;
  width: 100%;
  height: 100%;
}

.cf-body {
  flex: 1;
  min-width: 0;
}

.cf-head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cf-label {
  font-size: 13px;
  color: #e2e8f0;
}

.cf-modified .cf-label::after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-left: 6px;
  border-radius: 50%;
  background: #f472b6;
  vertical-align: middle;
}

.cf-contrast {
  margin-left: auto;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 16px;
}

.cf-contrast.good { background: rgb(34 197 94 / 20%); color: #86efac; }
.cf-contrast.fair { background: rgb(234 179 8 / 20%); color: #fde047; }
.cf-contrast.poor { background: rgb(239 68 68 / 25%); color: #fca5a5; }

.cf-hint {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.3;
}

.cf-input-row {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.cf-input {
  flex: 1;
  min-width: 0;
  padding: 2px 6px;
  border-radius: 5px;
  border: 1px solid #334155;
  background: #0f172a;
  color: #e2e8f0;
  font: 12px ui-monospace, monospace;
}

.cf-input:focus {
  outline: none;
  border-color: #f472b6;
}

.cf-invalid,
.cf-invalid:focus {
  border-color: #ef4444;
}

.cf-chip,
.cf-reset {
  padding: 0 6px;
  border-radius: 5px;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 11px;
}

.cf-chip.on {
  border-color: #f472b6;
  color: #f9a8d4;
}

.cf-reset {
  display: flex;
  align-items: center;
}

.cf-chip:hover,
.cf-reset:hover {
  color: #e2e8f0;
}

.cf-popover {
  position: absolute;
  z-index: 50;
  top: 100%;
  left: 8px;
}
</style>
