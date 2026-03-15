import { describe, expect, it } from "vitest"

import { DICE, Dice } from "../src/index.js"

describe("Dice", () => {
  it("produces deterministic integer rolls for the same seed", () => {
    const left = new Dice("6616826c")
    const right = new Dice("6616826c")

    expect(left.randint(1, 20)).toBe(right.randint(1, 20))
    expect(left.uniform(5, 10)).toBe(right.uniform(5, 10))
    expect(left.shuffle([1, 2, 3, 4])).toEqual(right.shuffle([1, 2, 3, 4]))
  })

  it("supports weighted choice and unique weighted samples", () => {
    const dice = new Dice("abc123")
    const dist = [
      { v: "a", w: 1 },
      { v: "b", w: 3 },
      { v: "c", w: 10 },
    ]

    expect(["a", "b", "c"]).toContain(dice.weightedChoice(dist))
    expect(new Set(dice.weightedSample(dist, 2)).size).toBe(2)
  })

  it("uses a module-local active die and restores it after swap", () => {
    const current = DICE.spawn("root")

    const swapped = DICE.swap("child", (dice) => dice)

    expect(swapped).toBeDefined()
    expect(swapped).not.toBe(current)
    expect(DICE.current()).toBe(current)
  })
})
