# Bug: ParticleEmitter overrides shape velocity

## Observed

When using a `ConeShape` with `speed` through a `ParticleEmitter`, particles have zero velocity.

## Root Cause

`particles/ParticleEmitter.js:34-35`

```js
p.vx = this.vx * this.velocityInheritance
p.vy = this.vy * this.velocityInheritance
```

The `_emitWrapper` unconditionally assigns `p.vx`/`p.vy` from the emitter's own velocity, overriding whatever the shape's `sample()` method set.

When `this.vx` is 0 (default) and `this.velocityInheritance` is 1 (default), the shape's speed is always wiped out.

## Expected

The shape's velocity should be additive or preserved. Options:

1. Make emitter velocity additive: `p.vx += this.vx * this.velocityInheritance`
2. Only apply emitter velocity when non-zero
3. Or add a flag to control whether shape or emitter velocity takes priority

## Workaround

Set velocity in the emitter's `initializer` callback (runs after the `_emitWrapper` override).
