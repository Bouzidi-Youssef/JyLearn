# Part 0 — Welcome

This opening part establishes why engine architecture matters and what principles guide the design decisions you will study throughout the guide.

## Chapters

- [What is a Particle System?](foreword) — A live demo, the definition, and why particle systems expose architectural decisions
- [What is jygame?](what-is-jygame) — The engine we study and why it is the right size for learning
- [The Architecture Philosophy](philosophy) — The six principles that guided every design decision

## How to Use This Guide

Each technical chapter follows a consistent pattern:

1. **Concept** — The idea, explained without code
2. **Problem** — What need does this solve?
3. **Naive implementation** — The beginner approach and why it fails at scale
4. **Engine solution** — How jygame does it, with reasoning and tradeoffs
5. **Code walkthrough** — Actual engine files, referenced by path and line number
6. **Advanced** — Edge cases, performance implications, alternatives

You do not need to read every chapter. Each chapter lists its prerequisites at the top with links backward to earlier chapters. If you already understand a concept, skip to the code.

### Reading paths

| Background | Suggested path |
|---|---|
| Beginner | Parts 1 through 12 in order |
| Intermediate JS dev | Start wherever the prerequisites match your knowledge |
| Game developer | Focus on Parts 1, 3, 4, 6, 7, 12 |
| Performance engineer | Focus on Parts 2, 6, 8, 9, 10 |

### Prerequisites

If you are new to programming, familiarize yourself with JavaScript basics: variables, functions, arrays, objects, loops, and control flow. These are not taught in this guide.

Otherwise, start with the first chapter.
