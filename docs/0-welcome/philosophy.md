---
next:
  text: '1.1 What is a Game Engine?'
  link: '/1-foundations/01-what-is-a-game-engine'
---

# The Architecture Philosophy

Before we study any specific file or pattern, we need to understand the principles that guided every architecture decision in jygame.

These principles are not unique to jygame. They appear in game engines, rendering frameworks, and performance-critical systems across the industry. Understanding them first makes the code you will read later feel inevitable rather than arbitrary.

## Principle 1: Ownership

Every piece of data has exactly one owner.

In jygame, a `Sprite` does not own its rendering logic. A `Group` does not own its collision logic. The `RenderSystem` owns rendering. The `CollisionSystem` owns collision.

This seems obvious, but many beginner codebases mix ownership: a sprite has an `update()` method that moves itself and a `render()` method that draws itself. These responsibilities look like they belong together, but they create problems:

- Changing how movement works requires changing every sprite
- Adding a new visual effect requires changing every sprite
- Testing movement requires creating a sprite with rendering resources

When ownership is separated, each concern can change independently.

## Principle 2: Zero-Allocation Hot Path

Games run at 60 frames per second. That means 60 opportunities per second for the garbage collector to pause your game.

The garbage collector runs when memory is allocated and released. If your game allocates memory every frame — creating temporary arrays, objects, or strings — the garbage collector will eventually run. When it runs during gameplay, the player sees a stutter.

jygame's hot path — the code that runs every frame for every particle — aims for **zero allocations**. No new arrays, no new objects, no new closures on the hot path. Memory is pre-allocated in pools. Data structures are reused. Output arrays are passed in by the caller (`out` parameters) rather than created fresh.

This is not micro-optimization. At scale — thousands of particles, hundreds of entities — allocation pressure is the difference between 60 FPS and 30 FPS.

## Principle 3: Data-Oriented Design

Object-oriented programming organizes code around objects. A `Particle` object has `x`, `y`, `vx`, `vy`, `life`, and methods that operate on them.

Data-oriented design asks a different question: what operations do we perform, and what data layout makes those operations fastest?

When a particle system updates 10,000 particles, it must:

1. Apply forces to each particle's velocity
2. Update each particle's position
3. Decrease each particle's remaining life
4. Check if each particle has died

These operations access specific fields: velocity, position, life. In an object-oriented layout, each particle's fields are scattered across memory. Iterating 10,000 particles means jumping between 10,000 memory locations.

In a data-oriented layout, all velocities are in one contiguous array, all positions in another, all lives in a third. The CPU reads them sequentially — and sequential memory access is dramatically faster than random access.

jygame's `SoAParticleStorage` implements exactly this pattern.

## Principle 4: Composition Over Inheritance

Inheritance says: a fire particle IS a particle. A smoke particle IS a particle.

Composition says: a fire particle has a fade behavior, a velocity behavior, and a color behavior.

The difference matters because real particle behaviors do not fit cleanly into inheritance hierarchies. A fire particle fades, moves, and changes color. A smoke particle also fades, moves, and changes color — but differently. An explosion particle fades, moves, changes color, and spawns child particles.

With inheritance, you quickly end up with a deep hierarchy: `MovingParticle > FadingParticle > ColoredParticle > SpawningParticle > FireParticle`. Adding one new behavior multiplies the hierarchy.

With composition, you assemble behaviors like building blocks. A particle is born with a set of *modifiers* — independent objects that each implement a small behavior. The modifier stack processes each particle through every modifier in order.

jygame's entire modifier system — 15 modifier types plus a modifier stack — is built on this principle.

## Principle 5: Progressive Complexity

jygame's particle system supports three backends: CPU, GPU operator, and GPU compute.

The CPU backend is the simplest. It simulates particles in JavaScript, builds a render command buffer, and hands it to a renderer. It handles 5,000-10,000 particles per frame on modern hardware.

The GPU operator mode keeps CPU simulation but renders with WebGL2 instancing. This offloads the rendering bottleneck to the GPU.

The GPU compute mode runs the entire simulation on the GPU using WebGPU compute shaders. It handles 100,000+ particles per frame.

Each mode is more complex than the previous. Each mode solves a scaling problem that the previous mode hits. This progressive complexity means you never pay for capability you do not need. A simple particle effect does not require a WebGPU compute pipeline.

## Principle 6: Pluggable Abstractions

When jygame needs to choose between implementations — CPU vs GPU simulation, Canvas vs WebGL vs WebGPU rendering, HTML Audio vs Web Audio — it does not hard-code the choice. It defines an abstract interface and lets the caller select the implementation.

The `ParticleRenderer` base class defines `render()`. `CanvasParticleRenderer` and `GpuParticleRenderer` each implement it differently. The particle system does not know which renderer it has. It just calls `render()`.

This is the Strategy pattern, and it appears throughout jygame: storage backends, audio backends, renderers, collision strategies.

## The Meta-Principle

Every principle above serves one goal: **the architecture should make the right thing easy and the wrong thing hard.**

It should be easy to add a new modifier. It should be hard to accidentally allocate memory on the hot path. It should be easy to switch from CPU to GPU simulation. It should be hard to couple rendering logic to particle data.

When you see a design decision in jygame that seems unnecessary or overly complex, ask yourself: what wrong thing is this preventing?

The answer to that question is where real understanding begins.
