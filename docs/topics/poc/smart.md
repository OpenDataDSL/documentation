---
slug: /poc/smart
title: Smart Data
description: Detailed information about Smart Curves and Smart Timeseries
sidebar_position: 5
tags:
- poc
- smartcurve
- smarttimeseries
---

# Smart Data

Smart Data refers to derived curves and timeseries that are built automatically using an expression. Rather than manually assembling values, you define the logic once and the platform applies it whenever the underlying data changes.

:::tip
For a deeper dive into Smart Curves specifically — including configuration, scheduling, and building with Fusion AI — see the [Smart Curves topic guide](/docs/topics/smart-curves/01-what-is-a-smart-curve).
:::

## What is Smart Data?

Smart Data comes in two forms:

| Type | Description |
|-|-|
| **Smart Curve** | A forward curve built from an expression. Saved and cached by the platform; automatically regenerated when input data updates. |
| **Smart Timeseries** | A timeseries built from an expression. Calculated dynamically each time it is requested. |

The expression defines how the output is derived from one or more input curves or timeseries, using `BASE` to refer to the primary input.

## Expressions

### Simple scalar adjustment

Add a fixed value to every point in a curve or timeseries:

```
BASE + 10
```

### Spread between two inputs

Subtract one curve or timeseries from another:

```
BASE - OTHER
```

Where `OTHER` is a named reference to a second input.

### Using functions

Expressions can call any of the [built-in functions](/docs/product/developer/odsl/Functions/all), as well as functions from [public scripts](/docs/public/scripts/curve-building) or your own private scripts uploaded to the platform.

#### Bootstrap a curve

Construct an arbitrage-free monthly curve from monthly, quarterly, seasonal, and yearly tenors:

```
bootstrapCurve(BASE)
```

#### Combine with a fallback source

Use a primary input and fill any missing values from an alternate source:

```
combine(BASE, OTHER, true)
```

#### Conditional floor

Apply a minimum floor value to every point — using the `iif` function from the public script library:

```
iif(BASE < 2300, 2300, BASE)
```

The `iif` function evaluates a condition for each contract and returns one value if true, another if false. Here is the function definition for reference:

```js
function iif(condition, valid, invalid)
    // Iterate through all curve contracts
    for contract in condition.contracts
        if contract.value == true
            // Use the valid value if true
            v = valid
            if typeOf(valid) == "Curve"
                v = valid[contract.tenor].value
            end
            contract.setValue(v)
        else
            // Use the invalid value if false
            v = invalid
            if typeOf(invalid) == "Curve"
                v = invalid[contract.tenor].value
            end
            contract.setValue(v)
        end
    next
    // Return the result
    iif = condition
end
```

:::tip Extend the platform without upgrades
The public script library is continually expanded, and you can push your own proprietary scripts to the platform at any time. Any function you upload is immediately available as an expression in Smart Data — no platform upgrade required.
:::

## Saving Smart Data

### Smart Curve

Saving a Smart Curve stores the expression and configuration. A new curve version is then automatically generated and cached whenever the input data changes.

### Smart Timeseries

Saving a Smart Timeseries stores the expression and configuration. The expression is executed dynamically each time the timeseries is requested — results are not cached between requests.

## Further Reading

* [Smart Curves topic guide](/docs/topics/smart-curves/01-what-is-a-smart-curve) — configuration, scheduling, Fusion AI
* [SmartCurve variable reference](/docs/odsl/variable/smartcurve)
* [Built-in curve building functions](/docs/product/developer/odsl/Functions/all)
* [Public curve building scripts](/docs/public/scripts/curve-building)
* [ODSL language reference](/docs/odsl)
