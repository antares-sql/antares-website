<template>
  <!-- A simulated CodeMirror editor: chrome from editor.colors, tokens from editor.syntax -->
  <div class="am-code" data-t="e:background e:foreground">
    <div class="am-gutter" data-t="e:gutterBackground e:gutterForeground">
      <div
        v-for="(_, i) in sample.lines"
        :key="i"
        class="am-gutter-line"
        :class="{ active: i === sample.activeLine }"
        :data-t="i === sample.activeLine ? 'e:gutterActiveLine' : null"
      >
        {{ i + 1 }}
      </div>
    </div>
    <div class="am-code-lines">
      <div
        v-for="(line, i) in lines"
        :key="i"
        class="am-code-line"
        :class="{ active: i === sample.activeLine }"
        :data-t="i === sample.activeLine ? 'e:activeLine' : null"
      >
        <span
          v-for="(piece, j) in line"
          :key="j"
          :class="markerClasses(piece.keys)"
          :style="pieceStyle(piece.keys)"
          :data-t="pieceTokens(piece.keys) || null"
        >{{ piece.text }}</span>
        <br v-if="!line.length">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { CodeSample, parseLine } from '~/libs/themeEditor/samples'
import { useThemeEditor } from '~/libs/themeEditor/state'

const props = defineProps({
  sample: { type: Object as PropType<CodeSample>, required: true }
})

const { effective } = useThemeEditor()
const MARKERS: Record<string, string> = {
  sel: 'e:selection',
  match: 'e:selectionMatch',
  bracket: 'e:matchingBracket',
  ws: 'e:invisible',
  cursor: 'e:cursor'
}

const lines = computed(() => props.sample.lines.map(parseLine))

const markerClasses = (keys: string[]) => keys.filter(k => MARKERS[k]).map(k => `am-mk-${k}`)
const pieceTokens = (keys: string[]) => keys.map(k => MARKERS[k] ?? `x:${k}`).join(' ')
const pieceStyle = (keys: string[]) => {
  const style: Record<string, string> = {}
  for (const key of keys) {
    const s = effective.value.syntax[key]
    if (!s) { continue }
    if (s.color) { style.color = s.color }
    if (s.backgroundColor) { style.backgroundColor = s.backgroundColor }
    if (s.fontStyle) { style.fontStyle = s.fontStyle }
    if (s.fontWeight) { style.fontWeight = s.fontWeight }
    if (s.textDecoration) { style.textDecoration = s.textDecoration }
  }
  return style
}
</script>
