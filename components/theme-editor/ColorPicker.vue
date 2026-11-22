<template>
  <div class="cp" @pointerdown.stop>
    <div
      ref="area"
      class="cp-area"
      :style="{ background: `hsl(${hsv.h} 100% 50%)` }"
      @pointerdown="drag($event, pickArea)"
    >
      <div class="cp-area-thumb" :style="{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: opaque }" />
    </div>
    <div ref="hue" class="cp-slider cp-hue" @pointerdown="drag($event, pickHue)">
      <div class="cp-slider-thumb" :style="{ left: `${hsv.h / 360 * 100}%` }" />
    </div>
    <div
      v-if="alpha"
      ref="alphaBar"
      class="cp-slider cp-alpha"
      @pointerdown="drag($event, pickAlpha)"
    >
      <div class="cp-alpha-fill" :style="{ background: `linear-gradient(to right, transparent, ${opaque})` }" />
      <div class="cp-slider-thumb" :style="{ left: `${a * 100}%` }" />
    </div>
    <div class="cp-row">
      <span class="cp-swatch"><span :style="{ background: current }" /></span>
      <code>{{ current }}</code>
      <span v-if="alpha" class="cp-alpha-value">{{ Math.round(a * 100) }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { hsvToRgb, parseColor, rgbToHsv, toHex } from '~/libs/themeEditor/colors'

const props = defineProps({
  value: { type: String, required: true },
  /** Allow transparency (#rrggbbaa) */
  alpha: { type: Boolean, default: true }
})
const emit = defineEmits<{(e: 'input', value: string): void }>()

const area = ref<HTMLElement>()
const hue = ref<HTMLElement>()
const alphaBar = ref<HTMLElement>()
const hsv = reactive({ h: 0, s: 0, v: 0 })
const a = ref(1)
let lastEmitted = ''

const sync = (value: string) => {
  if (value === lastEmitted) { return }
  const rgba = parseColor(value)
  if (!rgba) { return }
  const next = rgbToHsv(rgba)
  // Keep the hue on grays, where it is undefined
  if (next.s > 0 && next.v > 0) { hsv.h = next.h }
  hsv.s = next.s
  hsv.v = next.v
  a.value = props.alpha ? rgba.a : 1
}
watch(() => props.value, sync, { immediate: true })

const rgb = computed(() => hsvToRgb(hsv.h, hsv.s, hsv.v))
const opaque = computed(() => toHex({ ...rgb.value, a: 1 }))
const current = computed(() => toHex({ ...rgb.value, a: Math.round(a.value * 100) / 100 }))

const emitValue = () => {
  lastEmitted = current.value
  emit('input', current.value)
}

const ratio = (el: HTMLElement | undefined, e: PointerEvent) => {
  const rect = (el as HTMLElement).getBoundingClientRect()
  return {
    x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
    y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
  }
}
const pickArea = (e: PointerEvent) => {
  const { x, y } = ratio(area.value, e)
  hsv.s = x
  hsv.v = 1 - y
}
const pickHue = (e: PointerEvent) => { hsv.h = ratio(hue.value, e).x * 360 }
const pickAlpha = (e: PointerEvent) => { a.value = ratio(alphaBar.value, e).x }

const drag = (start: PointerEvent, pick: (e: PointerEvent) => void) => {
  start.preventDefault()
  pick(start)
  emitValue()
  const move = (e: PointerEvent) => { pick(e); emitValue() }
  const up = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
}
</script>

<style scoped>
.cp {
  width: 232px;
  padding: 10px;
  border-radius: 10px;
  background: #1e293b;
  box-shadow: 0 10px 30px rgb(0 0 0 / 50%);
  border: 1px solid #334155;
  user-select: none;
}

.cp-area {
  position: relative;
  height: 140px;
  border-radius: 6px;
  cursor: crosshair;
  /* The hue is the inline background color, under these two gradients */
  background-image: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent) !important;
}

.cp-area-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 40%);
  pointer-events: none;
}

.cp-slider {
  position: relative;
  height: 12px;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
}

.cp-hue {
  background: linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red);
}

.cp-alpha {
  background: repeating-conic-gradient(#888 0 25%, #ccc 0 50%) 0 0 / 8px 8px;
}

.cp-alpha-fill {
  position: absolute;
  inset: 0;
  border-radius: 6px;
}

.cp-slider-thumb {
  position: absolute;
  top: -2px;
  width: 8px;
  height: 16px;
  margin-left: -4px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 50%);
  pointer-events: none;
}

.cp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-size: 12px;
  color: #cbd5e1;
}

.cp-swatch {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  overflow: hidden;
  background: repeating-conic-gradient(#888 0 25%, #ccc 0 50%) 0 0 / 8px 8px;
}

.cp-swatch span {
  display: block;
  width: 100%;
  height: 100%;
}

.cp-alpha-value {
  margin-left: auto;
}
</style>
