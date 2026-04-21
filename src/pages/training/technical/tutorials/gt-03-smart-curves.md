---
slug: /training/technical/gt-smart-curves
title: "Tutorial: Smart Curves"
sidebar_position: 22
tags: [training, technical, odsl, curves]
---

# Tutorial: Smart Curves

Smart Curves are expression-based forward curves that derive their values from a base curve and an optional set of named inputs. They are evaluated on demand — you define the rule, and the platform calculates the result.

---

## How Smart Curves Work

A Smart Curve requires:

- A **base curve** (`BASE`) — an existing forward curve that determines the valuation dates
- An **expression** — a formula evaluated against `BASE` and any additional named inputs
- An **object** to attach it to before saving

---

## Creating a Basic Smart Curve

```js
//#region
use training

// Create an object and attach a Smart Curve
CORN_TEST = Object()
CORN_TEST.CLOSE = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:CLOSE", "bootstrapCurve(BASE)")
CORN_TEST.category = "TUTORIAL"

save ${object:CORN_TEST}
print "CORN_TEST saved"
//#endregion
```

### Using a Type

Using a typed object is the preferred approach — it categorises your objects and implies a structure:

```js
//#region
use training

CORN_TEST_TYPE = object as #Agriculture
    CLOSE = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:CLOSE", "interpolate(BASE, 'BACKWARD')")
    category = "TUTORIAL"
end

save ${object:CORN_TEST_TYPE}
print "Typed object saved"
//#endregion
```

---

## Adding Multiple Smart Curves to One Object

```js
//#region
use training

CORN_TEST_TYPE = object as #Agriculture
    CLOSE = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:CLOSE", "interpolate(BASE, 'BACKWARD')")
    PREMIUM = SmartCurve("CORN_TEST_TYPE:CLOSE", "BASE * 1.15")
    category = "TUTORIAL"
end

save ${object:CORN_TEST_TYPE}
print "CLOSE and PREMIUM curves saved"
//#endregion
```

Here `PREMIUM` uses the `CLOSE` curve as its base and applies a 15% markup.

---

## Testing a Smart Curve Before Saving

Use the `.build()` method to evaluate the curve for a specific date without saving:

```js
//#region
CLOSE = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:CLOSE", "interpolate(BASE, 'BACKWARD')")
result = CLOSE.build("2022-01-12")
print result
//#endregion
```

---

## Smart Curves with Multiple Inputs

Some curves require more than one input — for example, a mid-price between a bid and an offer.

Add named references as properties on the Smart Curve object:

```js
//#region
use training

// Fetch the existing object
CORN_TEST_TYPE = ${object:"CORN_TEST_TYPE"}

// Create a MID curve between MIN and MAX
CORN_TEST_TYPE.MID = SmartCurve("#MATBAROFEX.ROS.CORN.FUT:MIN", "(BASE + MAX) / 2")

// Add a named reference to the MAX curve
CORN_TEST_TYPE.MID.MAX = ref("data", "#MATBAROFEX.ROS.CORN.FUT:MAX")

save ${object:CORN_TEST_TYPE}
print "MID curve saved"
//#endregion
```

The expression `(BASE + MAX) / 2` references:
- `BASE` — the MIN curve (the primary input)
- `MAX` — the named reference added as a property

---

## Summary

| Feature | What it does |
|---------|-------------|
| `SmartCurve(base, expression)` | Creates a Smart Curve with a formula |
| `BASE` | Keyword referring to the base curve in the expression |
| Named properties (e.g. `.MAX`) | Additional curve inputs referenced in the expression |
| `.build(date)` | Evaluates the Smart Curve for a specific date without saving |
| `ref("data", "ID:CURVE")` | Creates a reference to another curve on the platform |
