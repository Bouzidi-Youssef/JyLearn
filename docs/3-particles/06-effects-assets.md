# 3.6 Effects and Assets

## Concept

An **effect** is a ready-to-use particle system plus an emitter. An **asset** is a reusable configuration that spawns effects. Together they turn particle configuration into a deployable unit.

## Problem

Without effects and assets, every particle effect requires manual setup:

```js
const fireSystem = new ParticleSystem()
fireSystem.addModifier(new GravityModifier({ gravity: 80 }))

const fireEmitter = new ParticleEmitter({
  system: fireSystem,
  rate: 30,
  initializer: fireInit,
})
fireEmitter.x = 400
fireEmitter.y = 300
fireEmitter.start()

// In update:
fireEmitter.update(dt)
fireSystem.update(dt)
// In render:
fireSystem.render(ctx)
```

For a single fire effect, this is acceptable. For a game with fire, smoke, sparks, rain, snow, explosions, trails, and muzzle flashes, this duplication becomes unmanageable. Each effect has a system, an emitter, modifiers, and an initializer that must be created, configured, and tracked.

## Naive Implementation

```js
function createFireEffect(system, x, y) {
  const emitter = new ParticleEmitter({
    system,
    rate: 30,
    initializer: fireInit,
  })
  emitter.x = x
  emitter.y = y
  emitter.start()
  return emitter
}
```

This is better but still requires passing the system and manually pairing emitter + system. Every effect must be manually cleaned up on scene exit.

## Engine Solution

`particles/ParticleEffect.js:4`

`ParticleEffect` wraps one `ParticleSystem` and one `ParticleEmitter` into a single object:

```js
class ParticleEffect {
  constructor({ asset, x, y }) {
    this._system = new ParticleSystem({ … })
    this._emitter = new ParticleEmitter({
      system: this._system,
      rate: asset.rate,
      shape: asset.shape,
      initializer: asset.initializer,
    })
    this._emitter.setPosition(x, y)
  }

  update(dt) {
    this._emitter.update(dt)
    this._system.update(dt)
  }

  render(ctx) {
    this._system.render(ctx)
  }
}
```

`particles/ParticleAsset.js:8`

`ParticleAsset` stores the configuration and spawns effects:

```js
const fireAsset = new ParticleAsset({
  capacity: 500,
  modifiers: [new GravityModifier(80), new ColorLifetimeModifier({ … })],
  shape: new CircleShape(5),
  emitter: { rate: 30 },
  initializer: fireInit,
})
```

## Code Walkthrough

`particles/ParticleAsset.js:44`

Spawning an effect from an asset:

```js
spawn(options = {}) {
  return new ParticleEffect({
    asset: this,
    x: options.x ?? 0,
    y: options.y ?? 0,
    renderer: options.renderer,
    backend: options.backend,
  })
}
```

The effect clones the asset's modifier stack into its own system, warms up the storage, and returns a ready-to-use effect.

`particles/ParticleAsset.js:54`

Burst emission — spawn, emit once, auto-destroy:

```js
burst(options = {}) {
  const effect = this.spawn(options)
  effect.emit(options.count)
  effect.destroyWhenFinished()
  return effect
}
```

`burst` is the simplest way to create a one-shot effect: spawn particles, let them play out, auto-clean.

`particles/ParticleEffect.js:106`

Auto-destroy when all particles finish:

```js
destroyWhenFinished(callback) {
  this._autoDestroy = true
  this._onFinishCallback = callback
}
```

The effect's `update` method checks `activeCount === 0` and auto-destroys when no particles remain. The optional callback fires before destruction.

`particles/ParticleAsset.js:62`

Creating variants of an asset:

```js
variant(overrides = {}) {
  return new ParticleAsset({ …this._config, …overrides })
}

const redFire = fireAsset.variant({
  emitter: { rate: 40 },
  initializer: redInit,
})
```

`variant` merges overrides with the base configuration. This allows deriving effects without duplicating config.

## Usage

```js
// Define once
const explosionAsset = new ParticleAsset({
  capacity: 200,
  modifiers: [new ScaleModifier({ start: 2, end: 0 })],
  shape: new CircleShape(10),
  emitter: { rate: 0 },  // no auto-emit
})

// Use anywhere
function onEnemyDeath(x, y) {
  explosionAsset.burst({ x, y, count: 80 })
  // Auto-destroys when particles fade
}
```

Define the asset at load time. Call `burst` at runtime. No setup, no cleanup.

## Advanced

Assets can be **serialized to JSON** and **deserialized**:

```js
const json = fireAsset.toJSON()
// Store in a file, send over the network

const loaded = ParticleAsset.fromJSON(json)
```

Modifiers and shapes use a registry pattern (`ModifierRegistry`, `ShapeRegistry`) to resolve string names back to classes. This makes assets portable across builds and platforms.

The asset also stores metadata:

```js
const fireAsset = new ParticleAsset({
  displayName: 'Fire',
  description: 'A simple fire effect',
})
```

These are useful for editor tooling and debugging.
