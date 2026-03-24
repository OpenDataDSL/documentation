---
title: What is a Smart Curve?
sidebar_position: 1
tags: [smart-curves, forward-curves, concepts]
---

# What is a Smart Curve?

A **Smart Curve** is a forward curve that is automatically built, maintained, and versioned by the OpenDataDSL platform. Rather than manually assembling price curves from raw market data, Smart Curves define the *logic* for how a curve should be constructed — and the platform executes that logic on demand or on a schedule.

## The Problem with Manual Curves

In traditional energy and commodity trading workflows, forward curves are often built by:

- Exporting raw market data from multiple sources
- Running spreadsheet models or scripts to blend and interpolate prices
- Manually publishing the resulting curve to downstream systems

This process is time-consuming, error-prone, and difficult to audit.

:::warning
Manual curve processes introduce operational risk — particularly around data lineage, versioning, and consistency across teams.
:::

## How Smart Curves Solve This

Smart Curves move the curve-building logic into the platform itself. You define:

1. **What data to use** — which input timeseries or curves to source
2. **How to build it** — the mathematical method (bootstrapping, interpolation, etc.)
3. **When to build it** — triggered by data arrival or a fixed schedule

The platform then handles execution, versioning, and storage automatically.

:::tip
Every time a Smart Curve is built, the result is stored as a versioned snapshot — giving you a full audit trail of how the curve looked at any point in time.
:::

## Key Benefits

| Benefit | Description |
|---|---|
| **Automation** | Curves rebuild automatically when source data changes |
| **Consistency** | One definition, one result — no divergence between teams |
| **Auditability** | Full version history with timestamps and build metadata |
| **Flexibility** | Supports a wide range of curve-building methods |
| **Integration** | Output curves are immediately available via API or subscription |

## Typical Use Cases

- **Energy forward curves** — power, gas, oil products blended from exchange and OTC data
- **Blended benchmark curves** — combining multiple market sources into a single reference curve
- **Spread curves** — spark spreads, dark spreads, crack spreads derived from component curves
- **Seasonal adjustment curves** — applying shape factors to a base curve

## Next Steps

- Learn about the [curve building methods](./02-curve-building-methods.md) available in OpenDataDSL
- See how to [configure a Smart Curve](./03-curve-configuration.md) using ODSL syntax
- Understand how to [schedule and automate](./04-scheduling-and-automation.md) curve builds
