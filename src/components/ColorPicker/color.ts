export const defaultBg = '#ffe600'

export const presets = [
  { name: 'Yellow', hex: '#ffe600' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Orange', hex: '#ff4d00' },
  { name: 'Pink', hex: '#ff3fa4' },
  { name: 'Acid', hex: '#c6ff00' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
]

const hexPattern = /^#[0-9a-f]{6}$/i

const toRgb = (hex: string) =>
  [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255) as [number, number, number]

const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

const luminance = (hex: string) => {
  const [r, g, b] = toRgb(hex)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

// Above this luminance black has the higher WCAG contrast ratio, below it white does
export const inkFor = (hex: string) => (luminance(hex) > 0.179 ? '#000' : '#fff')

export const hexToHsv = (hex: string) => {
  const [r, g, b] = toRgb(hex)
  const max = Math.max(r, g, b)
  const delta = max - Math.min(r, g, b)
  let h = 0
  if (delta > 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h = (h * 60 + 360) % 360
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max }
}

export const hsvToHex = (h: number, s: number, v: number) => {
  const channel = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1))
  }
  return '#' + [5, 3, 1].map(n => Math.round(channel(n) * 255).toString(16).padStart(2, '0')).join('')
}

type ColorState = { hex: string; hue: number }

const defaultState: ColorState = { hex: defaultBg, hue: hexToHsv(defaultBg).h }
let state: ColorState | undefined
const listeners = new Set<() => void>()

const readStored = () => {
  const hex = localStorage.getItem('bg')
  return hex && hexPattern.test(hex) ? hex.toLowerCase() : defaultBg
}

export const getSnapshot = () => {
  if (!state) {
    const hex = readStored()
    state = { hex, hue: hexToHsv(hex).h }
  }
  return state
}

export const getServerSnapshot = () => defaultState

export const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const setColor = (hex: string, hue = hexToHsv(hex).h) => {
  state = { hex, hue }
  const ink = inkFor(hex)
  const style = document.documentElement.style
  style.setProperty('--bg', hex)
  style.setProperty('--ink', ink)
  localStorage.setItem('bg', hex)
  localStorage.setItem('ink', ink)
  listeners.forEach(listener => listener())
}
