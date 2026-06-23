<template>
  <div ref="wrapperRef" class="particle-demo-wrapper">
    <canvas ref="canvasRef" class="particle-demo-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ParticleSystem, Colors } from 'jygame'

const canvasRef = ref(null)
const wrapperRef = ref(null)

let system = null
let rafId = null
let lastTime = 0
let colorTime = 0

let mouseX = -9999
let mouseY = -9999
let targetVx = 0
let targetVy = 0
let smoothVx = 0
let smoothVy = 0
let isMouseOver = false

const palette = [
  Colors.Red,
  Colors.Orange,
  Colors.Yellow,
  Colors.Green,
  Colors.Blue,
  Colors.Purple,
]

function lerpColor(a, b, t) {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)
  return {
    r: Math.round(ar + (br - ar) * t),
    g: Math.round(ag + (bg - ag) * t),
    b: Math.round(ab + (bb - ab) * t),
  }
}

function getColorAt(phase) {
  const len = palette.length
  const i1 = Math.floor(phase) % len
  const i2 = (i1 + 1) % len
  return lerpColor(palette[i1], palette[i2], phase - Math.floor(phase))
}

function resizeCanvas() {
  const canvas = canvasRef.value
  const wrapper = wrapperRef.value
  if (!canvas || !wrapper) return
  const dpr = window.devicePixelRatio || 1
  const w = wrapper.clientWidth
  const h = 420
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
}

function initDemo() {
  resizeCanvas()

  const dpr = window.devicePixelRatio || 1
  const canvas = canvasRef.value
  const w = canvas.width / dpr
  const h = canvas.height / dpr

  system = new ParticleSystem()

  system.emit(200, (p) => {
    p.x = Math.random() * w
    p.y = Math.random() * h
    p.maxLife = 999
    p.life = 999
    p.size = 2 + Math.random() * 3
    p.vx = (Math.random() - 0.5) * 60
    p.vy = (Math.random() - 0.5) * 60
    p.seed = Math.random() * palette.length
    const c = getColorAt(p.seed)
    p.r = c.r
    p.g = c.g
    p.b = c.b
  })

  const canvasEl = canvasRef.value
  canvasEl.addEventListener('mousemove', onMouseMove)
  canvasEl.addEventListener('mouseenter', () => { isMouseOver = true })
  canvasEl.addEventListener('mouseleave', () => {
    isMouseOver = false
    targetVx = 0
    targetVy = 0
  })

  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

let prevMouseX = null
let prevMouseY = null
let prevMouseTime = null

function onMouseMove(e) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top

  if (prevMouseX !== null) {
    const dt = (performance.now() - prevMouseTime) / 1000
    if (dt > 0) {
      targetVx = (mouseX - prevMouseX) / dt
      targetVy = (mouseY - prevMouseY) / dt
    }
  }

  prevMouseX = mouseX
  prevMouseY = mouseY
  prevMouseTime = performance.now()
}

function loop(timeStamp) {
  const dt = Math.min((timeStamp - lastTime) / 1000, 0.05)
  lastTime = timeStamp
  colorTime += dt * 0.3

  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const w = canvas.width / dpr
  const h = canvas.height / dpr

  smoothVx += (targetVx - smoothVx) * Math.min(1, dt * 8)
  smoothVy += (targetVy - smoothVy) * Math.min(1, dt * 8)
  targetVx = 0
  targetVy = 0

  system.update(dt)

  const particles = system.particles

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]

    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10
    if (p.y < -10) p.y = h + 10
    if (p.y > h + 10) p.y = -10

    const dx = p.x - mouseX
    const dy = p.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (isMouseOver && dist < 200) {
      const falloff = 1 - dist / 200
      p.vx += smoothVx * falloff * dt * 3
      p.vy += smoothVy * falloff * dt * 3
    }

    const phase = p.seed + colorTime
    const c = getColorAt(phase)
    p.r = c.r
    p.g = c.g
    p.b = c.b
  }

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, w, h)
  system.render(ctx)
  ctx.restore()

  rafId = requestAnimationFrame(loop)
}

function cleanup() {
  if (rafId) cancelAnimationFrame(rafId)
  if (system) {
    system.clear()
    system.destroy()
  }
}

onMounted(initDemo)
onBeforeUnmount(cleanup)
</script>

<style scoped>
.particle-demo-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5em 0;
  cursor: default;
}

.particle-demo-canvas {
  display: block;
  width: 100%;
  height: 420px;
  background: #0f172a;
}
</style>
