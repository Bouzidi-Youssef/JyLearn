# Concept Derivation Examples

This document demonstrates how concepts should emerge naturally from problems.

---

# Example: Object Pooling

## Wrong Approach

Object pooling is a memory management technique that reuses objects instead of repeatedly allocating and destroying them.

## Better Approach

Suppose a bullet is fired.

A new object is created.

The bullet disappears.

The object becomes garbage.

Another bullet is fired.

Another object is created.

This process repeats thousands of times.

Eventually the garbage collector must clean up all of those discarded objects.

The more temporary objects we create, the more work the garbage collector must perform.

One solution is to stop destroying bullets entirely.

Instead, when a bullet disappears, we place it in a reusable collection.

The next bullet can reuse the same object.

This approach is called object pooling.

---

# Example: Particle Lifetime

## Wrong Approach

Particles have finite lifetimes.

## Better Approach

Consider a smoke particle.

It appears.

It drifts upward.

It fades.

Then it should disappear.

If particles never disappeared, every smoke effect would continue accumulating forever.

Eventually memory usage would grow without limit.

We need a mechanism that removes particles once they have existed long enough.

This is why particles usually store a lifetime.

---

# Example: Death Sweep

## Wrong Approach

The engine performs a death sweep to remove expired particles.

## Better Approach

Imagine 10000 particles.

Every frame, some of them die.

How do we find them?

One option is to check every particle and remove dead ones immediately.

That sounds reasonable.

However, removing elements while iterating often creates additional work.

Instead, many engines separate simulation and cleanup.

First, all particles are updated.

Then a dedicated pass searches for dead particles and removes them.

This cleanup phase is commonly called a death sweep.

---

# Example: Structure of Arrays

## Wrong Approach

The engine uses SoA storage.

## Better Approach

Suppose we want to update only particle positions.

If every particle is an object, we still load:

* position
* velocity
* color
* rotation
* life

even when some of those values are not needed.

Now imagine storing positions together:

```js
positionsX[]
positionsY[]
```

and lifetimes together:

```js
life[]
```

The update loop can read exactly the data it needs.

This storage layout is known as Structure of Arrays.

The name is introduced only after the reasoning is complete.

---

# General Rule

Avoid:

```text
Term
    ↓
Definition
    ↓
Explanation
```

Prefer:

```text
Problem
    ↓
Observation
    ↓
Solution
    ↓
Term
```

The second approach creates understanding.

The first often creates memorization.
