/**
 * Color helpers of the theme editor. Validation rules mirror src/common/themes/theme.ts of the app:
 * a theme is data only, never free CSS.
 */

export interface Rgba { r: number, g: number, b: number, a: number }

const CSS_WIDE_KEYWORDS = ['inherit', 'initial', 'unset', 'revert', 'currentcolor']

/** Same rule as isThemeColor() in the app: hex, rgb()/hsl() with plain numbers, named colors or `accent` */
export const isThemeColor = (value: unknown): value is string => {
  if (typeof value !== 'string' || value.length > 64) { return false }
  const v = value.trim().toLowerCase()
  if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(v)) { return true }
  if (/^(rgb|rgba|hsl|hsla)\(\s*[-+0-9.%,/\s]*(deg|turn|rad)?[-+0-9.%,/\s]*\)$/.test(v)) { return true }
  return /^[a-z]{3,20}$/.test(v) && !CSS_WIDE_KEYWORDS.includes(v)
}

/** A length in px or rem (1rem = 20px in Antares), converted to px; null if not a plain length */
export const lengthToPx = (value: unknown): number | null => {
  if (typeof value !== 'string') { return null }
  const match = /^(\d*\.?\d+)(px|rem)?$/.exec(value.trim())
  if (!match) { return null }
  const n = parseFloat(match[1])
  if (match[2] === 'rem') { return n * 20 }
  return match[2] === 'px' || n === 0 ? n : null
}

let ctx: CanvasRenderingContext2D | null = null

/** Any CSS color the browser understands → rgba (null if invalid). Browser only */
export const parseColor = (value: string): Rgba | null => {
  if (!value || typeof document === 'undefined') { return null }
  if (!ctx) { ctx = document.createElement('canvas').getContext('2d') }
  if (!ctx) { return null }
  // An invalid value leaves fillStyle untouched: test it against two different sentinels
  ctx.fillStyle = '#010203'
  ctx.fillStyle = value
  const first = ctx.fillStyle
  ctx.fillStyle = '#040506'
  ctx.fillStyle = value
  if (ctx.fillStyle !== first) { return null }
  const out = String(first)
  if (out.startsWith('#')) {
    return { r: parseInt(out.slice(1, 3), 16), g: parseInt(out.slice(3, 5), 16), b: parseInt(out.slice(5, 7), 16), a: 1 }
  }
  const m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/.exec(out)
  if (!m) { return null }
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] }
}

const hex2 = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0')

/** #rrggbb, or #rrggbbaa when transparent */
export const toHex = ({ r, g, b, a }: Rgba): string =>
  `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a * 255) : ''}`

export const rgbToHsv = ({ r, g, b }: Rgba) => {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b)
  const d = max - Math.min(r, g, b)
  let h = 0
  if (d) {
    if (max === r) { h = ((g - b) / d) % 6 } else if (max === g) { h = (b - r) / d + 2 } else { h = (r - g) / d + 4 }
    h *= 60
    if (h < 0) { h += 360 }
  }
  return { h, s: max ? d / max : 0, v: max }
}

export const hsvToRgb = (h: number, s: number, v: number): Omit<Rgba, 'a'> => {
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255 }
}

// WCAG helpers, same as src/common/libs/colorContrast.ts
const channel = (c: number) => {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}
export const luminance = ({ r, g, b }: Rgba) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
export const contrastRatio = (a: Rgba, b: Rgba) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Alpha-composites a color over an opaque background */
export const over = (top: Rgba, bottom: Rgba): Rgba => ({
  r: top.r * top.a + bottom.r * (1 - top.a),
  g: top.g * top.a + bottom.g * (1 - top.a),
  b: top.b * top.a + bottom.b * (1 - top.a),
  a: 1
})

export const LIGHT_TEXT = '#fdfdfd'
export const DARK_TEXT = '#303742'

/** Text on the accent, as computed by the app: white while it keeps 3:1, dark text otherwise */
export const readableTextOn = (background: string): string => {
  const bg = parseColor(background)
  if (!bg) { return LIGHT_TEXT }
  return contrastRatio(bg, parseColor(LIGHT_TEXT) as Rgba) >= 3 ? LIGHT_TEXT : DARK_TEXT
}
