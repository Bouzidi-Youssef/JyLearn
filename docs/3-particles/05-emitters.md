# 3.5 Emitters

## Concept

An **emitter** creates particles over time. It sets their initial position, velocity, and appearance. Without an emitter, you would call `system.emit()` manually every frame. The emitter automates this — you configure the rate and initializer once, start it, and particles stream out.

## Problem

Manual emission requires tracking time outside the system:

```js
let spawnTimer = 0

function update(dt) {
  spawnTimer += dt
  while (spawnTimer > 0.033) {
    spawnTimer -= 0.033
    system.emit(3, initParticle)
  }
  system.update(dt)
}
```

Every effect that spawns particles over time duplicates this accumulator logic. The rate, timing, and accumulation are mixed into the scene update. Changing the spawn rate means finding and editing the right accumulator.

## Naive Implementation

```js
class Emitter {
  constructor(system, rate, initializer) {
    this._system = system
    this._rate = rate
    this._initializer = initializer
    this._accumulator = 0
    this._active = false
    this.x = 0
    this.y = 0
  }

  update(dt) {
    if (!this._active) return
    this._accumulator += this._rate * dt
    const count = Math.floor(this._accumulator)
    if (count > 0) {
      this._system.emit(count, (p) => {
        p.x = this.x
        p.y = this.y
        if (this._initializer) this._initializer(p)
      })
      this._accumulator -= count
    }
  }

  start() { this._active = true }
  stop()  { this._active = false }
}
```

This works but lacks burst emission, velocity inheritance, and support for emitter shapes.

## Engine Solution

`particles/ParticleEmitter.js:4`

jygame's `ParticleEmitter` provides the accumulator pattern plus:

- **Rate-based emission** — particles per second
- **Burst emission** — emit N particles immediately
- **Emitter position** — all particles spawn from `emitter.x, emitter.y`
- **Emitter velocity** — inherited by new particles (for moving emitters)
- **Shapes** — `CircleShape`, `ConeShape`, etc. control spawn spread
- **Initializer** — callback to customize each particle
- **Follow target** — track a game object's position

## Code Walkthrough

`particles/ParticleEmitter.js:115`

The `emit` method passes the emitter's `_emitWrapper` as the system's initializer:

```js
emit(count) {
  if (this._destroyed) return
  this._system.emit(count, this._emitWrapper, this)
  this._emittedCount += count
}
```

`particles/ParticleEmitter.js:27`

The `_emitWrapper` combines shape, position, velocity, and the user initializer:

```js
this._emitWrapper = (p, i, emitter) => {
  if (this._shape) {
    this._shape.sample(p)
  } else {
    p.x = this.x + this.offsetX
    p.y = this.y + this.offsetY
  }
  p.vx = this.vx * this.velocityInheritance
  p.vy = this.vy * this.velocityInheritance
  if (this._initializer) this._initializer(p, i, emitter)
}
```

`particles/ParticleEmitter.js:158`

The `update` method handles the rate accumulator:

```js
update(dt) {
  if (this._destroyed || !this._active || this._paused) return
  if (this._target) {
    const pos = this._followGetter(this._target)
    this.x = pos.x
    this.y = pos.y
  }
  this._accumulator += this._rate * dt
  const count = Math.min(Math.floor(this._accumulator), MAX_EMIT_PER_FRAME)
  if (count > 0) {
    this.emit(count)
    this._accumulator -= count
  }
}
```

The accumulator accumulates `rate * dt` each frame. When it passes 1, one or more particles are emitted and the accumulator is decremented. `MAX_EMIT_PER_FRAME` (1000) prevents a single frame from emitting too many particles after a lag spike.

## Usage

```js
const emitter = new ParticleEmitter({
  system,
  rate: 100,
  initializer: (p) => {
    p.vx = (Math.random() - 0.5) * 200
    p.vy = -150
    p.life = 2
    p.size = 3
  },
})
emitter.x = 400
emitter.y = 300
emitter.start()

function update(dt) {
  emitter.update(dt)
  system.update(dt)
}
```

Use `emitter.burst(count)` to emit a fixed number of particles instantly — useful for one-shot effects like explosions.

## Advanced

**Velocity inheritance.** When an emitter moves (e.g., a spaceship engine exhaust), new particles should inherit the emitter's velocity. `velocityInheritance` controls how much: `0` means no inheritance (particles use only the shape's velocity), `1` means full inheritance.

Follow a game object:

```js
emitter.follow(player, (t) => t.transform)
```

The emitter's x/y are updated every frame from the target's transform. The getter function lets you extract position from any object structure.

**Shapes** control where particles spawn within a region:

```js
import { ConeShape } from 'jygame'

const shape = new ConeShape({
  angle: Math.PI / 4,
  speed: 200,
})
emitter.shape = shape
```

The shape's `sample()` method sets `p.x`, `p.y`, `p.vx`, `p.vy` on the particle. If a shape is set, the emitter does not use its own x/y as the spawn point — the shape controls position.
