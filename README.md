# @rayoung/dice

Deterministic randomization utilities for simulations, games, generators, and other seed-driven workflows.

## Install

```bash
npm install @rayoung/dice
```

## Features

- Seeded pseudo-random number generation
- Uniform, integer, and normal distributions
- Weighted choice and weighted sampling
- Array shuffling and sampling helpers
- Dice rolling, color generation, and stable ID helpers
- Optional module-local active die helpers

## Usage

```ts
import { DICE, Dice } from "@rayoung/dice"

const dice = new Dice("6616826c")
const pick = dice.weightedChoice([
  { v: "forest", w: 3 },
  { v: "desert", w: 1 },
])

const active = DICE.spawn("world-seed")
const eventRoll = active.roll(3, 6, 1)
const result = DICE.swap("encounter-seed", (encounterDice) => {
  return encounterDice.weightedSample(
    [
      { v: "bandits", w: 2 },
      { v: "merchant", w: 1 },
      { v: "ruins", w: 3 },
    ],
    1,
  )
})
```

## API

`Dice` provides instance methods for deterministic random behavior from a seed.

`DICE.id()` generates a compact random identifier.

`DICE` also exposes a module-local active die with:

- `current()` to read the active `Dice`
- `spawn(seed)` to replace it
- `swap(seed, fn)` to run work with a temporary scoped `Dice`
