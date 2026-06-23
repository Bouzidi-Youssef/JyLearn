# What is a Particle System?

<ClientOnly>
  <ParticleDemo />
</ClientOnly>

A **particle system** is a technique for rendering many small, semi-transparent objects — particles — to simulate complex visual effects. Fire, smoke, rain, sparks, explosions, magic spells, trails, and starfields are all particle systems.

Each particle has a position, velocity, color, size, and a remaining lifetime. The particle system updates all particles each frame: it moves them, ages them, applies forces, and removes them when they die. It also spawns new particles at a configured rate, keeping the total count stable.

The individual particles are simple. The collective behavior is not.

## Why Particle Systems Matter

Particle systems are the first place where engine architecture stops being optional.

A single particle is a few bytes of data. A hundred particles is a loop. Ten thousand particles is a memory layout problem. A hundred thousand particles is a simulation architecture problem.

The transition from "it works" to "it breaks" happens at different thresholds depending on how the system is built. That threshold is the subject of this guide.

## Where This Is Going

The jygame engine contains a complete particle system — CPU simulation, GPU compute, WebAssembly acceleration, multiple renderers, composable modifiers, and configurable storage backends. Every part of it exists because the naive approach fails at some threshold.

This guide will walk through each part, starting with the foundations and building up to the full system.

## Prerequisites

Basic JavaScript: variables, functions, arrays, objects, loops.
