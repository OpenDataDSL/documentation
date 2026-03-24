---
title: Curve Building Methods
sidebar_position: 2
tags: [smart-curves, bootstrapping, interpolation, methods]
---

# Curve Building Methods

OpenDataDSL supports a range of curve-building methods that can be applied individually or combined to produce a complete forward curve. Each method is suited to different market structures and data availability scenarios.

## Overview

| Method | Best For |
|---|---|
| **Bootstrapping** | Stripping continuous curves from liquid instruments |
| **Interpolation** | Filling gaps between known price points |
| **Extrapolation** | Extending a curve beyond available market data |
| **Blending** | Combining multiple source curves into one |
| **Shape / Seasonal** | Applying a seasonal profile to a base curve |
| **Spread** | Deriving a curve from the difference between two others |

---

## Bootstrapping

Bootstrapping constructs a daily (or hourly) forward curve from a set of traded instruments — such as monthly, quarterly, or seasonal contracts — by decomposing them into their constituent periods.

:::note
Bootstrapping is the most common method for building power and gas forward curves from exchange-traded products.
:::

**Example:** A Q3 gas contract covering July, August, and September is bootstrapped into three individual monthly prices, ensuring the average of the months matches the quoted quarterly price.

---

## Interpolation

Interpolation fills in missing tenors between known price points. OpenDataDSL supports several interpolation algorithms:

- **Linear** — straight-line interpolation between two points
- **Cubic spline** — smooth curve through multiple points
- **Flat forward** — holds the previous known value until the next point

```odsl
// Example: linear interpolation between monthly prices
interpolation = "linear"
```

:::tip
Cubic spline interpolation produces smoother curves and is preferred when the curve will be used for mark-to-market or risk calculations.
:::

---

## Extrapolation

Extrapolation extends the curve beyond the last available market quote. Common approaches include:

- **Flat** — holds the last known price flat
- **Seasonal repeat** — repeats the seasonal pattern from a prior year
- **Long-run marginal cost (LRMC)** — reverts to a fundamental anchor price

---

## Blending

Blending combines two or more source curves into a single output, typically using a priority or weighted approach:

- **Priority blending** — uses Source A where available, falls back to Source B
- **Weighted average** — applies configurable weights to each source


:::note
Blending is commonly used to combine exchange settlement prices in the near curve with broker or OTC quotes for longer tenors.
:::

---

## Shape / Seasonal Adjustment

A shape curve applies a multiplicative or additive seasonal profile to a base forward curve. This is useful when:

- A base curve is only available at monthly granularity
- You need a daily or hourly shape that reflects seasonal demand patterns

---

## Spread Curves

A spread curve is derived by computing the difference (or ratio) between two existing curves:

```odsl
// Example: spark spread = power price - (gas price * heat rate)
sparkSpread = POWER_CURVE - (GAS_CURVE * heatRate)
```

Common spread curves in energy markets include:

- **Spark spread** — gas-fired power generation margin
- **Dark spread** — coal-fired power generation margin  
- **Crack spread** — refinery margin between crude and products

---

## Combining Methods

Smart Curves can chain multiple methods together. A typical power curve build might:

1. **Bootstrap** exchange quarterly contracts into months
2. **Blend** with broker quotes for the far curve
3. **Interpolate** to fill any remaining gaps
4. **Apply a shape** to convert from monthly to daily resolution

## Next Steps

- See how to configure these methods in [Curve Configuration & ODSL Syntax](./03-curve-configuration.md)
