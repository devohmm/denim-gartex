export const SECTION_IDS = [
  'trust',
  'about',
  'services',
  'process',
  'why-us',
  'factory',
  'gallery',
  'faq',
  'contact',
]

export function getSectionFromPath() {
  const id = window.location.pathname.replace(/^\//, '')
  return SECTION_IDS.includes(id) ? id : null
}

export function scrollToSection(id, behavior = 'smooth') {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior })
  return true
}

export function navigateToSection(id) {
  const path = id ? `/${id}` : '/'
  window.history.pushState({ section: id }, '', path)
  if (id) scrollToSection(id)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function syncPathToSection(id, { replace = true } = {}) {
  const path = id ? `/${id}` : '/'
  const current = window.location.pathname
  if (current === path) return

  const state = { section: id }
  if (replace) window.history.replaceState(state, '', path)
  else window.history.pushState(state, '', path)
}

export function initSectionRouting() {
  const section = getSectionFromPath()
  if (section) {
    requestAnimationFrame(() => scrollToSection(section, 'auto'))
  }

  window.addEventListener('popstate', (event) => {
    const id = event.state?.section ?? getSectionFromPath()
    if (id) scrollToSection(id)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
