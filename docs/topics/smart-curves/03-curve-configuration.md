---
title: Curve Configuration & ODSL Syntax
sidebar_position: 3
tags: [smart-curves, odsl, configuration, syntax]
---

# Curve Configuration & ODSL Syntax

Smart Curves are defined using **ODSL** — the OpenDataDSL domain-specific language. A curve definition specifies the inputs, the build method, and the output structure. This page walks through how to configure a Smart Curve from scratch.

## Basic Structure

A Smart Curve is always stored as a property on a master data object. The `SmartCurve()` constructor takes two arguments — the base data reference and the build expression — and the result is saved via the object service.

```odsl
// Create or reference the master data object
MY_OBJECT = Object()

// Define the Smart Curve: SmartCurve(baseDataRef, expression)
sc = SmartCurve("MY_EXCHANGE.GAS_FRONT_MONTH:CLOSE", "BASE")

// Attach to the master data object and save
MY_OBJECT.CURVE = sc
save ${object:MY_OBJECT}
```

### Key Concepts

| Concept | Description |
|---|---|
| **Base data reference** | The primary input curve, passed as the first argument to `SmartCurve()` — referenced as `BASE` in the expression |
| **Expression** | A string defining the build logic, using `BASE` for the primary input and named variables for additional inputs |
| **Named variables** | Additional input curves, added as properties on the SmartCurve and referenced by name in the expression |
| **Master data object** | The Smart Curve is stored as a property on an object and saved via `${object:...}` |

:::tip
`BASE` always refers to the first argument passed to `SmartCurve()`. Additional inputs are defined as named variables on the SmartCurve and referenced by their property name in the expression.
:::

---

## Adding Named Variable Inputs

When your expression needs more than one input, define additional curves as named properties using `ref()`:

```odsl
MY_OBJECT = Object()

sc = SmartCurve("SOURCE_A.CURVE:PRICE", "BASE-VAR1")
sc.VAR1 = ref("data", "SOURCE_B.CURVE:PRICE")

MY_OBJECT.CURVE = sc
save ${object:MY_OBJECT}
```

Here `BASE` is the primary input (`SOURCE_A`) and `VAR1` is the second input (`SOURCE_B`). The expression `BASE-VAR1` computes the spread between them.

:::note
You can define as many named variables as your expression requires. Each is added as a property on the SmartCurve using `ref("data", "OBJECT_ID:PROPERTY")`.
:::

---

## Bootstrapping Configuration

To bootstrap a curve, use `bootstrapCurve(BASE)` as the expression. The base data reference is the primary contract series passed into `SmartCurve()`:

```odsl
GAS_OBJECT = Object()

sc = SmartCurve("ICE.NBP_M:SETTLE", "bootstrapCurve(BASE)")

GAS_OBJECT.CURVE = sc
save ${object:GAS_OBJECT}
```

To bootstrap from multiple contract tenors, add the additional series as named variables:

```odsl
GAS_OBJECT = Object()

sc = SmartCurve("ICE.NBP_M:SETTLE", "bootstrapCurve(BASE, VAR1)")
sc.VAR1 = ref("data", "ICE.NBP_Q:SETTLE")

GAS_OBJECT.CURVE = sc
save ${object:GAS_OBJECT}
```

:::note
When multiple contract tenors are provided, the bootstrapper resolves overlaps automatically, preferring the most granular (shortest tenor) instrument.
:::

---

## Interpolation Configuration

Wrap the expression with `interpolate()` to produce a smoother or higher-granularity output curve:

```odsl
DAILY_OBJECT = Object()

sc = SmartCurve("MY_EXCHANGE.CURVE:PRICE", "interpolate(BASE, 'cubicspline', 'daily')")

DAILY_OBJECT.CURVE = sc
save ${object:DAILY_OBJECT}
```

Supported interpolation methods:

| Value | Description |
|---|---|
| `linear` | Straight-line between points |
| `cubicspline` | Smooth spline through all points |
| `flatforward` | Hold previous value until next point |

---

## Blending Configuration

Use named variables to define the curves to blend, then reference them in the expression:

```odsl
BLENDED_OBJECT = Object()

sc = SmartCurve("ICE.NBP:SETTLE", "blendCurves(BASE, VAR1, 'priority')")
sc.VAR1 = ref("data", "BROKER.NBP:MID")

BLENDED_OBJECT.CURVE = sc
save ${object:BLENDED_OBJECT}
```

For weighted blending, supply weights in the expression:

```odsl
sc = SmartCurve("SOURCE_A.CURVE:PRICE", "weightedBlend(BASE, 0.7, VAR1, 0.3)")
sc.VAR1 = ref("data", "SOURCE_B.CURVE:PRICE")
```

---

## Spread Curve Configuration

Spread curves use arithmetic expressions with `BASE` and named variables:

```odsl
SPREAD_OBJECT = Object()

// Spark spread = power - (gas * heat rate)
sc = SmartCurve("EPEX.POWER_CAL:SETTLE", "BASE-(VAR1*0.45)")
sc.VAR1 = ref("data", "ICE.TTF_CAL:SETTLE")

SPREAD_OBJECT.SPARK_SPREAD = sc
save ${object:SPREAD_OBJECT}
```

:::tip
ODSL supports standard arithmetic operators (`+`, `-`, `*`, `/`) directly in Smart Curve expressions, making spread and ratio curves straightforward to define.
:::

---

## Seasonal Shape Configuration

Apply a seasonal shape to a base curve using a named variable for the shape input:

```odsl
SHAPED_OBJECT = Object()

sc = SmartCurve("MY_EXCHANGE.BASE_CURVE:PRICE", "applyShape(BASE, VAR1, 'multiplicative')")
sc.VAR1 = ref("data", "MY_COMPANY.SEASONAL_SHAPE:FACTOR")

SHAPED_OBJECT.CURVE = sc
save ${object:SHAPED_OBJECT}
```

---

## Full Example: Power Forward Curve

Here is a complete example combining blending, bootstrapping, and interpolation using the correct SmartCurve pattern:

```odsl
// Reference the master data object for EEX German power
POWER_OBJECT = Object()
POWER_OBJECT.description = "German Power Forward Curve - Daily"

// Step 1: blend EEX and broker (EEX = BASE, broker = VAR1)
// Step 2: bootstrap the blended result
// Step 3: interpolate to daily
sc = SmartCurve(
    "EEX.DE_POWER_M:SETTLE",
    "interpolate(bootstrapCurve(blendCurves(BASE, VAR1, 'priority')), 'cubicspline', 'daily')"
)
sc.VAR1 = ref("data", "BROKER.DE_POWER_M:MID")

POWER_OBJECT.CURVE = sc
save ${object:POWER_OBJECT}
```

:::tip
Expressions can be nested — `interpolate(bootstrapCurve(...))` chains the two operations in a single expression string. Break complex expressions into readable lines using ODSL string concatenation if needed.
:::

---

## Next Steps

- Learn how to [schedule and automate](./04-scheduling-and-automation.md) Smart Curve builds
