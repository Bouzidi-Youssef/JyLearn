# Bad vs Good Technical Writing

This document contains examples of writing patterns to avoid and writing patterns to emulate.

---

# Example 1: Introducing a Topic

## Bad

You are about to learn how modern particle systems work.

Particle systems are a powerful and scalable architecture used throughout the game industry. Understanding them is essential for any game developer.

## Why It Is Bad

The paragraph teaches nothing.

It attempts to generate excitement rather than understanding.

The reader still does not know what a particle system is.

---

## Good

Imagine you want to create smoke.

One approach is to create hundreds of tiny sprites and move them individually.

This works.

However, each sprite needs its own position, velocity, lifetime, rendering logic, and update logic.

Managing thousands of these objects quickly becomes expensive.

This is where particle systems come in.

## Why It Is Better

The reader encounters the problem first.

The concept appears as a solution.

---

# Example 2: Defining a Concept

## Bad

A particle emitter is an object responsible for spawning particles.

Emitters are a fundamental component of particle architectures.

## Why It Is Bad

The reader receives a definition without context.

The definition has little meaning.

---

## Good

Particles do not appear by themselves.

Something must decide:

* when they are created
* where they appear
* how many are created

Eventually we need a dedicated object to handle these responsibilities.

That object is called an emitter.

## Why It Is Better

The need appears before the definition.

---

# Example 3: Performance Concepts

## Bad

Structure of Arrays improves cache locality and memory access efficiency.

## Why It Is Bad

The explanation assumes prior knowledge.

The reader learns terminology but not understanding.

---

## Good

Suppose every particle is stored as an object:

```js
{
  x,
  y,
  velocity,
  color,
  life
}
```

To update 10000 particles, the CPU repeatedly jumps between thousands of objects in memory.

Now imagine storing all x positions together:

```js
x = [...]
y = [...]
life = [...]
```

Instead of jumping around memory, the CPU can read large continuous chunks.

This layout is called Structure of Arrays.

## Why It Is Better

The observation comes before the terminology.

---

# Example 4: Architecture

## Bad

The engine uses a sophisticated backend abstraction layer.

## Why It Is Bad

The statement communicates almost nothing.

---

## Good

A particle system may run on:

* the CPU
* WebGL
* WebGPU

Each backend updates particles differently.

Without an abstraction layer, the rest of the engine would need separate code paths for every backend.

Instead, the engine places a common interface in front of all implementations.

## Why It Is Better

The problem appears first.

The architecture becomes justified.
