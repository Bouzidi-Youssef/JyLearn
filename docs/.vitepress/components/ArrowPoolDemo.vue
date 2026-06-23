<template>
  <div ref="wrapperRef" class="arrow-demo-wrapper">
    <canvas ref="canvasRef" class="arrow-demo-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ParticleSystem, ParticleEmitter } from 'jygame'

const canvasRef = ref(null)
const wrapperRef = ref(null)

let system = null
let emitter = null
let arrowImg = null
let rafId = null
let lastTime = 0

const CONE_ANGLE = Math.PI / 3
const MIN_SPEED = 250
const MAX_SPEED = 450
const ARROW_WIDTH = 72
const RATE = 75

function resizeCanvas() {
  const canvas = canvasRef.value
  const wrapper = wrapperRef.value
  if (!canvas || !wrapper) return
  const dpr = window.devicePixelRatio || 1
  const w = wrapper.clientWidth
  const h = 360
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
}

function initDemo() {
  resizeCanvas()

  arrowImg = new Image()
  arrowImg.src = '/images/arrow.png'
  arrowImg.onload = () => {
    const canvas = canvasRef.value
    const h = canvas.height / (window.devicePixelRatio || 1)

    system = new ParticleSystem()
    emitter = new ParticleEmitter({
      system,
      rate: RATE,
      initializer: (p) => {
        const angle = (Math.random() - 0.5) * CONE_ANGLE
        const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED)
        p.vx = Math.cos(angle) * speed
        p.vy = Math.sin(angle) * speed
        p.texture = arrowImg
        p.rotation = Math.atan2(p.vy, p.vx)
        p.life = 2.5
        p.maxLife = p.life
        p.originX = 0
        p.originY = 0.5
        p.width = ARROW_WIDTH
        p.height = ARROW_WIDTH * (arrowImg.naturalHeight / arrowImg.naturalWidth)
        p.alpha = 0.8 + Math.random() * 0.2
        p.size = 1
      },
    })

    emitter.x = 0
    emitter.y = h * 0.5
    emitter.start()

    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)
  }
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

  emitter.update(dt)
  system.update(dt)

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.imageSmoothingEnabled = false
  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, w, h)
  system.render(ctx)
  ctx.restore()

  rafId = requestAnimationFrame(loop)
}

function cleanup() {
  if (rafId) cancelAnimationFrame(rafId)
  if (emitter) emitter.destroy()
  if (system) system.destroy()
}

onMounted(initDemo)
onBeforeUnmount(cleanup)
</script>

<style scoped>
.arrow-demo-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5em 0;
}

.arrow-demo-canvas {
  display: block;
  width: 100%;
  height: 360px;
  background: #0f172a;
}
</style>
