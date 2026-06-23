# What is jygame?

jygame is an open-source 2D game framework written in JavaScript for the browser. It provides everything needed to build a game — game loop, input handling, audio, collision detection, sprite management, a camera system, and a full particle engine — in approximately 157 source files.

It is licensed under GPL-3.0 and available at [github.com/Bouzidi-Youssef/Jygame](https://github.com/Bouzidi-Youssef/Jygame).

## The Right Size for Learning

jygame was not built as a teaching tool. It was built to solve real problems in real projects. But it happens to be the right size for learning engine architecture.

A large engine like Unity or Unreal is millions of lines of code. Most of it is closed-source. You cannot read through it and understand the reasoning behind each design decision.

A small demo project is ten lines of code. There is no architecture to study.

jygame sits between them. It is small enough that a single person can understand every file, but sophisticated enough that it demonstrates the same patterns used in high-performance engines: object pooling, structure-of-arrays storage, GPU compute pipelines, WebAssembly acceleration, composable modifier systems.

## What jygame Demonstrates

The particle system inside jygame — roughly 49 files — covers the full spectrum of engine architecture decisions:

- **Memory management**. Pre-allocated object pools instead of per-frame allocation. Active pools with swap-remove for O(1) deletion.
- **Data layout**. Structure-of-Arrays storage for cache-efficient iteration over thousands of particles.
- **GPU compute**. WebGPU compute shaders that simulate particles entirely on the GPU, handling 100,000+ particles per frame.
- **WebAssembly + SIMD**. Accelerated particle death sweeps compiled from C to WebAssembly with SIMD128 vector instructions.
- **Composable architecture**. A modifier system built on composition rather than inheritance — 15 independent modifier types composed into stacks.
- **Pluggable backends**. The same particle API works with CPU simulation, GPU operator mode, or full GPU compute, selected at runtime.
- **Three rendering paths**. Canvas2D for universal compatibility, WebGL2 instanced for performance, WebGPU storage-buffer for cutting-edge throughput.

## What jygame Is Not

jygame is not a AAA game engine. It does not have a visual editor, a physics engine, 3D support, or a component inspector. It is a focused framework for 2D games.

But none of that matters for learning. The patterns in jygame — the reasoning behind them, the tradeoffs they accept, the problems they solve — are the same patterns used in every engine that renders thousands of objects at 60 frames per second. They just appear here in a form you can read, understand, and experiment with.

## Before Continuing

You do not need to download or install jygame to follow this guide. All code references point to files in the engine, and the concepts are explained independently.

However, if you want to explore alongside the text:

```bash
git clone https://github.com/Bouzidi-Youssef/Jygame.git
```

The next chapter introduces the six architectural principles that guided every design decision in the engine. Understanding those principles first makes the code you will read later feel inevitable rather than arbitrary.
