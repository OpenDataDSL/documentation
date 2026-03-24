---
slug: /topics/curves/export
title: Curve Exports
description: How to configure and manage curve exports to downstream systems
sidebar_position: 4
tags:
- curve_management
- curve
- topics
- export
- integration
---

# Curve Exports

Curve exports allow you to push forward curves to downstream systems on a scheduled basis — for example, delivering end-of-day curves to an ETRM, risk system, or data warehouse automatically after market close.

Exports are configured using **Export Groups**, which define the schedule, the target system, and the curves to include.

---

## How It Works

```
Export Group (schedule + script) → attached to curves → triggers automatically → delivers to downstream system
```

1. Create an **Export Group** defining when and how to export
2. **Attach** the group to any curves you want included
3. The platform **triggers the export automatically** according to the cron schedule

---

## Configuring an Export Group

An Export Group brings together the scheduling, calendar, and script logic for a set of curve exports.

| Property | Description |
|---|---|
| `name` | Unique name for the group |
| `description` | Human-readable description |
| `category` | Always `curve` |
| `enabled` | Set to `true` to activate the group |
| `shared` | Always `true` |
| `cron` | Cron schedule defining when the export runs |
| `calendar` | Holiday calendar controlling when exports should and should not run |
| `offset` | Day offset from the cron schedule — use `-1` if running early morning for the prior day's curves |
| `script` | Path to the ODSL export script |
| `expression` | The function to call in the script, e.g. `export()` |

### Example

```js
g = ExportGroup()
g.name = "Example Export Group"
g.description = "Daily EOD curve export to downstream system"
g.category = "curve"
g.enabled = true
g.shared = true
g.cron = "00 23 ? * MON-FRI *"
g.calendar = "BUSINESS"
g.offset = 0
g.script = "odsl-example\export-curves"
g.expression = "export()"
save ${curve:g}
```

:::info Why save using the curve service?
Saving the export group via `${curve:g}` automatically creates a scheduled process to trigger the export at the defined cron time — no separate process configuration required.
:::

:::tip
Use `offset = -1` when your cron schedule runs in the early hours of the morning but you want to export curves from the previous business day.
:::

---

## Writing a Curve Export Script

The export script contains the logic for retrieving and delivering each curve. When the export runs, the platform injects three context variables for the script to use:

| Variable | Type | Description |
|---|---|---|
| `#CURVES` | List | The curves attached to this export group — see below |
| `#ONDATE` | String | The export date in `yyyy-MM-dd` format |
| `#GROUP` | Object | The export group configuration |

### The `#CURVES` Variable

Each item in `#CURVES` can be one of three types depending on whether the curve was found and what form it takes:

| Type | Description |
|---|---|
| `Curve` | A standard forward curve |
| `CurveSeries` | A curve series |
| `SimpleObject` | A placeholder representing a missing curve |

:::note
Always handle all three types in your export script. The `SimpleObject` case allows you to log or alert on missing curves rather than silently skipping them.
:::

### Standard Script Pattern

```js
for curve in #CURVES
    if typeOf(curve) == "Curve"
        // Export the curve to your downstream system

    elseif typeOf(curve) == "CurveSeries"
        // Export the curve series

    elseif typeOf(curve) == "SimpleObject"
        // Log or alert on the missing curve

    end
next
```

:::warning
If a curve is missing on the export date, `#CURVES` will contain a `SimpleObject` with the curve ID rather than omitting it entirely. Make sure your script handles this case to avoid silent failures in your downstream system.
:::
