<template>
  <div class="sparkle-wrapper">
    <canvas ref="canvasRef" class="sparkle-canvas"></canvas>
    <div class="sparkle-counter">{{ alive }} alive</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ParticleSystem } from 'jygame'

const canvasRef = ref(null)
const alive = ref(0)

let system = null
let rafId = null
let lastTime = 0

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  const w = canvas.parentElement.clientWidth
  const h = 360
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
}

function init() {
  resizeCanvas()
  system = new ParticleSystem()

  const canvas = canvasRef.value
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top

    system.emit(120, (p) => {
      const angle = Math.random() * Math.PI * 2
      const speed = 80 + Math.random() * 200
      p.x = cx
      p.y = cy
      p.vx = Math.cos(angle) * speed
      p.vy = Math.sin(angle) * speed
      p.life = 1.2 + Math.random() * 0.8
      p.maxLife = p.life
      p.size = 3 + Math.random() * 4
      p.alpha = 1
      p.seed = Math.random()
    })
  })

  lastTime = performance.now()
  rafId = requestAnimationFrame(loop)
}

function loop(timeStamp) {
  const dt = Math.min((timeStamp - lastTime) / 1000, 0.05)
  lastTime = timeStamp

  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const w = canvas.width / dpr
  const h = canvas.height / dpr

  system.update(dt)

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, w, h)

  const particles = system.particles
  const len = system.activeCount
  for (let i = 0; i < len; i++) {
    const p = particles[i]
    const t = 1 - p.life / p.maxLife
    const size = p.size * (1 - t * 0.7)
    const alpha = 1 - t
    const hue = (p.seed * 360 + t * 60) % 360
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.fillStyle = `hsl(${hue}, 100%, 60%)`
    ctx.beginPath()
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  ctx.restore()

  alive.value = len
  rafId = requestAnimationFrame(loop)
}

function cleanup() {
  if (rafId) cancelAnimationFrame(rafId)
  if (system) system.destroy()
}

onMounted(init)
onBeforeUnmount(cleanup)
</script>

<style scoped>
.sparkle-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5em 0;
  cursor: crosshair;
  position: relative;
}

.sparkle-canvas {
  display: block;
  width: 100%;
  height: 360px;
  background: #0f172a;
}

.sparkle-counter {
  position: absolute;
  top: 10px;
  right: 12px;
  font-family: ui-monospace, monospace;
  font-size: 13px;
  color: #64748b;
  pointer-events: none;
  font-variant-numeric: tabular-nums;
}
</style>
