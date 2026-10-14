export const defaultBg = '#ffe600'

const hexPattern = /^#[0-9a-f]{6}$/i

const luminance = (hex: string) => {
  const channel = (offset: number) => {
    const value = parseInt(hex.slice(offset, offset + 2), 16) / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5)
}

// Above this luminance black has the higher WCAG contrast ratio, below it white does
export const inkFor = (bg: string) => (luminance(bg) > 0.179 ? '#000' : '#fff')

export const applyColor = (bg: string) => {
  const style = document.documentElement.style
  style.setProperty('--bg', bg)
  style.setProperty('--ink', inkFor(bg))
}

export const storeColor = (bg: string) => {
  localStorage.setItem('bg', bg)
  localStorage.setItem('ink', inkFor(bg))
}

export const readStoredColor = () => {
  const bg = localStorage.getItem('bg')
  return bg && hexPattern.test(bg) ? bg : null
}
