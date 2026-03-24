---
title: Writing Curve Building Scripts
sidebar_position: 5
tags: [smart-curves, odsl, scripting, functions, curves]
---

# Writing Curve Building Scripts

Smart Curves can use custom ODSL scripts to implement bespoke curve-building logic. This is useful when the built-in methods — bootstrapping, interpolation, blending — don't fully cover your requirements, or when you need to combine multiple steps into a reusable function.

A curve building script defines one or more **functions** that take a curve (or other inputs) and return a transformed curve. These functions are then referenced in a Smart Curve `expression`.

---

## Script Structure

A curve building script is an ODSL script file containing one or more functions. Each function typically:

1. Takes an input curve as a parameter
2. Performs calculations on the curve's contracts
3. Returns a new `Curve` object

```js
/**
 * A simple curve building function
 * @param input The input curve
 */
function myFunction(input)
    result = Curve(input.ondate)
    // ... build logic here ...
    myFunction = result
end
```

:::note
In ODSL, a function returns its value by assigning to a variable with the same name as the function — in this case `myFunction = result`.
:::

---

## Working with Curve Contracts

The key building blocks when writing curve scripts are:

| Object | Description |
|---|---|
| `Curve(ondate)` | Creates a new empty curve for the given date |
| `Contract(ondate, tenor, value)` | Creates a single contract (tenor/price pair) |
| `curve.contracts` | The list of contracts on a curve |
| `curve.add(contract)` | Adds a contract to a curve |
| `contract.tenor` | The tenor label, e.g. `"2024-01"` |
| `contract.value` | The price value of the contract |

---

## Example: Time Spread Curve

A time spread curve is derived by computing the price difference between consecutive tenors on a bootstrapped curve. This is useful for analysing the shape and roll of a forward curve.

```js
/**
 * Create a curve with spreads created from the months in the input curve
 * after bootstrapping
 * @param input The input curve
 */
function timespread(input)
    boots = bootstrapCurve(input)
    timespread = Curve(input.ondate)
    last = boots.contracts[0]
    for i = 1 to boots.contracts.size - 1
        m = boots.contracts[i]
        value = m.value - last.value
        spread = Contract(input.ondate, last.tenor + "-" + m.tenor, value)
        timespread.add(spread)
        last = m
    next
end
```

### What This Does

1. **Bootstraps** the input curve to strip it into individual monthly contracts
2. **Iterates** through consecutive contract pairs
3. **Computes the spread** — the price difference between each month and the one before it
4. **Labels each spread contract** using the tenor pair, e.g. `"2024-01-2024-02"`
5. **Returns** a new curve where each contract represents a time spread

:::tip
Time spread curves are commonly used in gas and power markets to visualise contango and backwardation across the forward curve.
:::

---

## Using a Script Function in a Smart Curve

Once your script is saved to the platform, reference it in a Smart Curve by setting the `script` property and using the function name in the expression. `BASE` is passed as the argument to your function:

```odsl
NBP_OBJECT = Object()

sc = SmartCurve("ICE.NBP_M:SETTLE", "timespread(BASE)")
sc.script = "mycompany\curve-scripts"

NBP_OBJECT.TIME_SPREAD = sc
save ${object:NBP_OBJECT}
```

:::note
The `script` property points to the ODSL script file containing your function. `BASE` in the expression refers to the primary input curve defined in the `SmartCurve()` constructor.
:::

---

## Example: Weighted Spread Curve

Here is a further example — a function that computes a weighted spread between two input curves:

```js
/**
 * Compute a weighted spread between two curves
 * @param base The base curve
 * @param other The curve to subtract
 * @param weight The weight to apply to the other curve
 */
function weightedSpread(base, other, weight)
    boots_base = bootstrapCurve(base)
    boots_other = bootstrapCurve(other)
    weightedSpread = Curve(base.ondate)
    for i = 0 to boots_base.contracts.size - 1
        b = boots_base.contracts[i]
        o = boots_other.contracts[i]
        value = b.value - (o.value * weight)
        c = Contract(base.ondate, b.tenor, value)
        weightedSpread.add(c)
    next
end
```

For a function with multiple inputs, use named variables for the additional curves. Here is how the weighted spread function above would be wired up:

```odsl
SPREAD_OBJECT = Object()

sc = SmartCurve("SOURCE_A.CURVE:PRICE", "weightedSpread(BASE, VAR1, 0.75)")
sc.VAR1 = ref("data", "SOURCE_B.CURVE:PRICE")
sc.script = "mycompany\curve-scripts"

SPREAD_OBJECT.WEIGHTED_SPREAD = sc
save ${object:SPREAD_OBJECT}
```

`BASE` maps to the `base` parameter, `VAR1` maps to `other`, and the weight `0.75` is passed as a literal in the expression.

---

:::warning
When iterating over two curves in parallel, ensure both have been bootstrapped to the same granularity and tenor set before comparing contracts by index. Mismatched tenors will produce incorrect results.
:::

---

## Best Practices

- **Document your functions** with JSDoc-style comments — describe the purpose, parameters, and return value
- **Bootstrap inputs** before iterating over contracts, unless you specifically need the raw input tenors
- **Handle edge cases** — check for empty curves or missing contracts before iterating
- **Keep functions focused** — one function per transformation makes scripts easier to test and reuse
- **Use descriptive tenor labels** on output contracts so the resulting curve is self-describing

---

## Next Steps

- Learn how to use [Fusion AI to generate and deploy Smart Curves](./06-fusion-ai-smart-curves.md) using your custom scripts
