import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ParticleDemo from '../components/ParticleDemo.vue'
import ArrowPoolDemo from '../components/ArrowPoolDemo.vue'
import SparkleExplosion from '../components/SparkleExplosion.vue'
export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('ParticleDemo', ParticleDemo)
    app.component('ArrowPoolDemo', ArrowPoolDemo)
    app.component('SparkleExplosion', SparkleExplosion)
    if (typeof window !== 'undefined') {
      initSvgViewBoxPanZoom()
    }
  },
}

function initSvgViewBoxPanZoom() {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.mermaid-wrapper svg, .mermaid svg').forEach(attachViewBoxPanZoom)
  })

  observer.observe(document.body, { childList: true, subtree: true })

  document.querySelectorAll('.mermaid-wrapper svg, .mermaid svg').forEach(attachViewBoxPanZoom)
}

function attachViewBoxPanZoom(svg) {
  if (svg.dataset.vbpanzoom) return
  svg.dataset.vbpanzoom = 'true'

  const wrapper = svg.closest('.mermaid-wrapper, .mermaid')
  if (!wrapper) return

  const vb = svg.getAttribute('viewBox')
  if (!vb) return
  let [ox, oy, ow, oh] = vb.split(/\s+/).map(Number)

  let state = { x: ox, y: oy, w: ow, h: oh, ox, oy, ow, oh }

  wrapper.style.cursor = 'grab'
  wrapper.style.overflow = 'hidden'
  svg.style.display = 'block'
  svg.style.maxWidth = '100%'
  svg.style.height = 'auto'

  svg.querySelectorAll('foreignObject').forEach(fo => {
    const h = parseFloat(fo.getAttribute('height'))
    if (h && !fo.dataset.fixed) {
      fo.dataset.fixed = 'true'
      fo.setAttribute('height', h + 8)
    }
  })

  function applyViewBox() {
    svg.setAttribute('viewBox', `${state.x} ${state.y} ${state.w} ${state.h}`)
  }

  function resetViewBox() {
    state.x = state.ox
    state.y = state.oy
    state.w = state.ow
    state.h = state.oh
    applyViewBox()
  }

  let isPanning = false
  let startX, startY, startState

  wrapper.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return
    isPanning = true
    startX = e.clientX
    startY = e.clientY
    startState = { x: state.x, y: state.y, w: state.w, h: state.h }
    wrapper.style.cursor = 'grabbing'
  })

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return
    const rect = svg.getBoundingClientRect()
    const dx = (e.clientX - startX) / rect.width * state.w
    const dy = (e.clientY - startY) / rect.height * state.h
    state.x = startState.x - dx
    state.y = startState.y - dy
    applyViewBox()
  })

  window.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false
      wrapper.style.cursor = 'grab'
    }
  })

  wrapper.addEventListener('mouseleave', () => {
    if (isPanning) {
      isPanning = false
      wrapper.style.cursor = 'grab'
    }
  })

  wrapper.addEventListener('wheel', (e) => {
    e.preventDefault()
    const rect = svg.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    const factor = e.deltaY > 0 ? 1.1 : 1 / 1.1

    const svgX = state.x + px * state.w
    const svgY = state.y + py * state.h

    state.w *= factor
    state.h *= factor
    state.x = svgX - px * state.w
    state.y = svgY - py * state.h

    applyViewBox()
  }, { passive: false })

  wrapper.addEventListener('dblclick', (e) => {
    e.preventDefault()
    resetViewBox()
  })
}
