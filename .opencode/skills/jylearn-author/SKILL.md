---
name: jylearn-author
description: Write educational content for Jylearn using the 6-layer teaching methodology. Use when writing, editing, or reviewing chapters for the JyLearn learning platform.
---

# JyLearn Author

## Overview

JyLearn teaches game engine architecture, rendering, memory management, and particle systems using the jygame engine as a real-world case study. The audience ranges from complete beginners to performance engineers.

This skill defines the writing style, teaching methodology, and content structure for JyLearn chapters. Every piece of content must follow these guidelines.

## Teaching Methodology — The 6 Layers

Every technical chapter must progress through these six layers in order. Do not skip layers. Do not reorder them.

### Layer 1 — Concept
Introduce the idea with zero code. Use intuition, analogies, and real-world examples. Answer: what is this thing?

If the term is technical (e.g., "particle", "object pool", "GPU compute"), explain:

- What the term means
- Why the concept exists
- What problem it solves
- Common alternatives
- Tradeoffs

### Layer 2 — Problem
What concrete problem does this concept solve? Why can't we use the obvious approach? Establish motivation before describing the solution.

### Layer 3 — Naive Implementation
Show the beginner approach. Short code examples (5-15 lines). Explain why it works for small cases. Then explain why it eventually fails at scale.

Always show the failure mode. Never skip this step — it justifies the engine solution.

### Layer 4 — Engine Solution
Introduce the jygame architecture. Explain:

- How it solves the naive approach's problems
- The reasoning behind the design
- What tradeoffs were accepted
- What alternatives were rejected

### Layer 5 — Code Walkthrough
Reference actual engine files with file paths and line numbers. Format as:

```
path/to/file.js:42
```

Explain responsibilities, data flow, and interactions between files. Show key code excerpts (5-30 lines). Do not reproduce entire files.

### Layer 6 — Advanced
Edge cases, performance implications, scaling limits, GPU implications, alternative architectures used by other engines. This layer is optional for beginner-focused chapters.

## Writing Style

### Purpose

This skill is for creating educational technical content.

Examples:

- Tutorials
- Architecture guides
- Learning resources
- Engine documentation
- Graphics programming guides
- System design explanations
- Performance engineering content

The goal is to **maximize understanding**.

The goal is not to maximize perceived expertise.

### Core Principle

Teach concepts through discovery.

Do not present finished conclusions immediately.

Allow the reader to arrive at conclusions naturally.

A concept should feel earned.

### Teaching Sequence

Whenever introducing a concept:

1. Present the situation.
2. Identify a limitation.
3. Explain why the limitation exists.
4. Explore possible solutions.
5. Arrive at the chosen solution.
6. Discuss tradeoffs.

Avoid starting with definitions.

Prefer arriving at definitions.

#### Example

Avoid:

"Structure of Arrays is a data-oriented memory layout."

Prefer:

"Suppose we have 10000 particles."

Explain the problem first.

Only later introduce the term.

### Voice

Write like an engineer reasoning through a problem.

Use phrases such as:

- "Let's start with the simplest version."
- "This works, but there is a problem."
- "To understand why, let's look at..."
- "We can improve this."
- "This introduces a new tradeoff."

Avoid:

- Marketing language
- Hype
- Dramatic introductions
- Motivational writing
- Corporate language

### Forbidden Patterns

Do not write:

- "You are about to learn..."
- "This powerful system..."
- "This revolutionary architecture..."
- "Industry-standard..."
- "Production-grade..."

Assume the reader is already interested.

Begin teaching immediately.

### Explanations

Prefer **concrete examples** over **abstract descriptions**.

Prefer: Examples → Observations → Conclusions

over: Definitions → Explanations

### Reader Experience

The reader should feel:

"I understand why this exists."

not:

"I was told that this exists."

The content should feel like a guided investigation rather than a presentation.

### Technical Depth

Do not avoid complexity.

Instead:

Introduce complexity gradually.

Build from simple ideas.

Each layer should justify the next.

Advanced concepts should emerge naturally from simpler concepts.

### Success Criteria

A successful chapter allows the reader to:

- Explain the problem.
- Explain the solution.
- Explain the tradeoffs.
- Reconstruct the reasoning process.

Not merely repeat the definition.

### Structure

Each chapter starts with:
- Title (H1)
- Prerequisites box linking to earlier chapters

Each 6-layer section uses H2 or H3 headings matching the layer name.

### Code Formatting

- Use fenced code blocks with language tag (`js`, `bash`, `mermaid`, etc.)
- Code snippets must be short (5-30 lines). Extract only the essential parts
- Reference file paths at the top of the section: `path/to/file.js:15`
- For JavaScript, use consistent ES module syntax (`import`/`export`)

### Diagrams — Mermaid Usage

Use Mermaid for all visual diagrams. Do not use ASCII art for anything Mermaid can render. Mermaid produces interactive SVGs that support pan and zoom. ASCII art is static, hard to read, and cannot be interacted with.

#### When to Use Each Mermaid Diagram Type

| Diagram Type | Mermaid Code | Use For |
|---|---|---|
| **Flowchart** | `graph LR`, `graph TD` | Architecture overviews, module relationships, data flow, component hierarchies |
| **Flowchart (LR)** | `graph LR` | Pipelines with left-to-right progression, render pipelines, data transformation chains |
| **Flowchart (TD)** | `graph TD` | Dependency trees, class hierarchies, nested module structures |
| **Sequence diagram** | `sequenceDiagram` | Interaction flows, function call sequences, frame-by-frame execution order |
| **State diagram** | `stateDiagram-v2` | Lifecycle states (particle birth→update→death), scene transitions, object state machines |
| **Class diagram** | `classDiagram` | Inheritance relationships, interface contracts, abstract base class patterns |
| **Block diagram** | `blockDiagram` | Memory layouts, data structure visualizations, storage architecture |

#### Diagram Rules

- Style nodes with the site's dark theme colors. Use `style nodeName fill:#1e293b,stroke:#64748b,color:#fff` for modules, `fill:#0f172a,stroke:#64748b,color:#94a3b8` for sub-components, and `fill:#3b82f6,stroke:#2563eb,color:#fff` for the entry point.
- Keep each diagram focused on one concept. If a diagram needs more than 15 nodes, split it.
- Use readable labels. Multi-line labels use `<br/>` inside double quotes.
- Do not use ASCII box-drawing (```, ┌───┐, ├──, └──, etc.) for anything Mermaid can render. The only exception is small inline terminal output or code structure listings that are too detailed for a diagram.

#### Before and After

Avoid:
```
┌──────────┐     ┌──────────┐
│  Module  │────>│  Module  │
│    A     │     │    B     │
└──────────┘     └──────────┘
```

Prefer:
```mermaid
graph LR
    A["Module A"] --> B["Module B"]
    style A fill:#1e293b,stroke:#64748b,color:#fff
    style B fill:#1e293b,stroke:#64748b,color:#fff
```

### Technical Terms

The first time a technical term appears, define it inline before using it. Use bold for the term itself:

**Object pool.** A collection of pre-allocated objects that are reused rather than created and destroyed. This avoids garbage collection pressure.

Do not assume the reader knows any term. Define everything.

## Content Rules

### No API Documentation

Do not list every function parameter. Do not generate reference pages within chapters. Reference pages belong in the Reference section only.

### No Code Comments

Do not add explanatory comments to code examples to explain what they do. The surrounding prose does that.

### No Emoji

Never use emoji in content. The UI is rendered in monospace on a CLI.

### Progressive Disclosure

Never reference a concept before it has been taught. Every concept must have a prerequisite chapter or be defined inline.


### Engine Files Must Exist

All referenced jygame engine file paths must be real. Verify file existence before writing code walkthroughs. File paths must be relative to the jygame root.

## Anti-Rationalization Table

| Rationalization | Reality |
|---|---|
| "The reader already knows this" | You cannot assume. Define every term on first use. |
| "I'll just add comments to explain the code" | Prose explains the code. Comments are for implementation details, not teaching. |
| "The naive implementation and engine solution are the same" | Then the architecture decision is not worth a chapter. Find a deeper angle. |
| "I can skip Layer 3 because the naive approach is obvious" | The failure mode is the best teacher. Show it. |
| "This code is self-explanatory" | No code is self-explanatory to a beginner. Walk through it. |
| "I'll add a short code comment for clarity" | Comments in examples imply the prose isn't doing its job. Improve the prose. |
| "The engine doesn't have a file for this" | Do not fabricate references. Say "jygame does not implement this directly" and explain the conceptual approach. |

## Verification Checklist

Before considering a chapter complete:

- [ ] Every technical term is defined on first use
- [ ] No concept is used before it is taught
- [ ] Prerequisites are listed with backlinks at the chapter start
- [ ] All 6 layers are present (or a valid reason documented for omission)
- [ ] The naive implementation shows the failure mode
- [ ] The engine solution explains tradeoffs, not just code
- [ ] All referenced file paths exist in the jygame engine
- [ ] Code snippets are 5-30 lines and include only essential context
- [ ] No API documentation or parameter listings
- [ ] No emoji
- [ ] No comments in code examples
- [ ] Mermaid diagrams use dark theme styling
- [ ] No ASCII art for anything Mermaid can render
- [ ] Correct Mermaid diagram type chosen for each use case
- [ ] Build passes with `npm run build`
- [ ] Chapter reads clearly when the code examples are removed (concepts first)

## Directory Structure

Content lives under `docs/` in the learning-platform project:

```
docs/
  .vitepress/            — Config, theme, components
  public/                — Static assets (SVGs, images)
  0-welcome/             — Part 0: Welcome
  1-foundations/         — Part 1: Foundations
  2-memory/              — Part 2: Memory Management
  3-particles/           — Part 3: Particles
  4-modifiers/           — Part 4: Modifiers
  5-shapes/              — Part 5: Shapes
  6-storage/             — Part 6: Storage Architectures
  7-cpu-simulation/      — Part 7: CPU Simulation
  8-gpu-simulation/      — Part 8: GPU Simulation
  9-webgpu/              — Part 9: WebGPU
  10-wasm-simd/          — Part 10: WASM & SIMD
  11-rendering/          — Part 11: Rendering
  12-walkthrough/        — Part 12: Full System Walkthrough
  reference/             — Reference section
```

Each part has an `index.md` (the part landing page) and numbered chapter files.

Sidebar links are defined in `docs/.vitepress/config.mjs`. When adding a new chapter, add it to the sidebar config and create the corresponding file.
