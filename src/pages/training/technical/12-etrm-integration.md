---
slug: /training/technical/etrm-integration
title: "Module 12: ETRM Integration"
sidebar_position: 13
tags: [training, etrm, integration, identity, export]
---

# Module 12: ETRM Integration

The training hub now has curves, timeseries, quality checks and automations. The last step is to get that data into the systems that use it. In this module you will map the `MY.GAS.HUB` data items to the identifiers used by a downstream **ETRM** (Energy Trading and Risk Management) system, and deliver them with those identifiers attached.

## The Problem

The ETRM does not know the item `MY.GAS.HUB:FORWARD_CURVE_EUR`. It has its own code for the curve, and without help every integration has to keep its own mapping table between the two, a second source of truth that can drift out of sync.

**Data identities** solve this. The `identity` property on a data item holds a simple map of system names to the ids those systems use. When the item is delivered downstream, the identity map travels with it, so the receiving system can find its own id directly in the payload.

```
MY.GAS.HUB:FORWARD_CURVE_EUR
└── identity
    ├── etrm   → "MGH-FWD-EUR"
    └── risk   → "GAS.MGH.FWD.EUR"
```

You choose the system names yourself. Use names that are meaningful to your team and consistent across your data.

Identities can be added to `TimeSeries`, `SmartTimeSeries`, `Curve`, `SmartCurve`, `CurveSeries`, `EventTimeSeries` and `EventCurve` items.

---

## Step 1: Agree the Mapping

For this module, our fictional ETRM uses the following codes:

| OpenDataDSL data item | Type | ETRM id |
|-----------------------|------|---------|
| `MY.GAS.HUB:FORWARD_CURVE` | EventCurve | `MGH-FWD-GBP` |
| `MY.GAS.HUB:FORWARD_CURVE_EUR` | SmartCurve | `MGH-FWD-EUR` |
| `MY.GAS.HUB:SETTLEMENT_PRICE` | EventTimeSeries | `MGH-SETTLE-GBP` |

In a real project, agree this list with the ETRM team before you start, and decide who owns it.

---

## Step 2: Add Identities to Existing Items

To add an identity to an item that already exists, fetch the object with the `_raw=true` option so that any existing identity data is preserved, set the new values and save it.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB", "_raw=true"}

hub.FORWARD_CURVE.identity.etrm = "MGH-FWD-GBP"
hub.FORWARD_CURVE_EUR.identity.etrm = "MGH-FWD-EUR"
hub.FORWARD_CURVE_EUR.identity.risk = "GAS.MGH.FWD.EUR"
hub.SETTLEMENT_PRICE.identity.etrm = "MGH-SETTLE-GBP"

save hub
print "Identities saved"
//#endregion
```

:::tip Setting Identities When You Create an Item
For new items, set the identity at the same time as the other properties, for example `sc.identity.etrm = "MGH-FWD-EUR"` before attaching the Smart Curve to the object and saving it.
:::

---

## Step 3: Read the Identities Back

```js
//#region
use training

item = ${data:"MY.GAS.HUB:FORWARD_CURVE_EUR"}

// The full identity map
print item.identity

// One system's id
print item.identity.etrm
//#endregion
```

---

## Step 4: Look Up Data by ETRM Id

When you know the ETRM id but not the OpenDataDSL id, search on the identity:

```js
//#region
use training

items = find ${data} where _identity.etrm = "MGH-FWD-EUR"
print items
//#endregion
```

You can also read an item directly using an identity value. The path is `"private.identity.<key>"/"<value>"`, and for a curve you can add `_ondate` to choose the curve date:

```js
//#region
use training

curve = ${data:"private.identity.etrm"/"MGH-FWD-EUR", "_ondate=2025-03-04"}
print curve.contracts
//#endregion
```

This is useful for support teams who are asked about a curve by its ETRM code.

---

## Step 5: Deliver Curves to a Queue

A message queue is a common way to hand data to an ETRM integration: the platform publishes each update, and the integration reads the queue at its own pace. First create a queue:

```js
//#region
use training

q = Queue("MY_GAS_HUB_ETRM")
q.description = "Training gas hub curves for the ETRM"
save q
print "Queue saved"
//#endregion
```

Then add an automation that publishes the EUR curve to the queue each time it builds successfully:

```js
//#region
use training

a = AutomationBuilder("curve", "private", "MY.GAS.HUB:FORWARD_CURVE_EUR").build()
c = SimpleObject()
c.service = "curve"
c.source = "private"
c.id = "MY.GAS.HUB:FORWARD_CURVE_EUR"
c.action = "success"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.queue"
a.template = "When 'MY.GAS.HUB:FORWARD_CURVE_EUR' is successful, send a message to [queue]"
a.icon = "send text-red"
a.properties.queue = "MY_GAS_HUB_ETRM"
a.properties.subject = ""
save ${automation:a}
print "ETRM queue automation saved"
//#endregion
```

When an automation delivers data to a queue, webhook or script target, the `_identity` map is included in the message payload, so the integration reads `_identity.etrm` to find its own curve code without any mapping table.

:::note Message Lifetime
A message stays on the queue until the consumer deletes it after processing, or until the retention period ends. The default retention is 4 days.
:::

---

## Step 6: Export Curves on a Schedule

Some ETRM systems expect a complete set of end-of-day curves at a fixed time rather than a message per update. For this, use a curve **export group**: a schedule and an export script, attached to the curves to export.

### The export script

When the export runs, the platform provides three variables to the script:

| Variable | Description |
|----------|-------------|
| `#CURVES` | The curves in the export group |
| `#ONDATE` | The export date in `yyyy-MM-dd` format |
| `#GROUP` | The export group configuration |

Each item in `#CURVES` is a `Curve`, a `CurveSeries`, or a `SimpleObject` placeholder for a curve that could not be found. Handle all three, so that a missing curve is reported rather than silently skipped.

Create a file called `my_gas_hub_etrm_export.odsl` and upload it as `my_gas_hub_etrm_export`, in the same way as the scripts in Module 10:

```js
/**
 * ETRM export for the training gas hub
 * Script: my_gas_hub_etrm_export
 */
function export()
    for curve in #CURVES
        if typeOf(curve) == "Curve"
            etrmId = curve.identity.etrm
            print "Exporting " + etrmId + " for " + #ONDATE + " with " + curve.size + " contracts"
            // Send the curve to the ETRM here, using etrmId as its code

        elseif typeOf(curve) == "CurveSeries"
            print "Curve series found, not exported by this group"

        elseif typeOf(curve) == "SimpleObject"
            log warn "Curve missing for " + #ONDATE
        end
    next
end
```

### The export group

```js
//#region
use training

g = ExportGroup()
g.name = "MY_GAS_HUB_ETRM"
g.description = "End of day training gas hub curves for the ETRM"
g.category = "curve"
g.enabled = true
g.shared = true
g.cron = "00 20 ? * MON-FRI * EU1"
g.calendar = "BUSINESS"
g.offset = 0
g.script = "my_gas_hub_etrm_export"
g.expression = "export()"
g.items = ["MY.GAS.HUB:FORWARD_CURVE", "MY.GAS.HUB:FORWARD_CURVE_EUR"]

save ${curve:g}
print "Export group saved"
//#endregion
```

Saving the export group with the curve service creates the scheduled process that runs the export at the cron time, so no separate process is needed. If the export runs in the early hours for the previous day's curves, set `offset = -1`.

:::tip Exporting as Soon as a Curve Builds
To export a curve straight after its build rather than at a fixed time, add an automation on the curve with the `curve_export` target and the `group` property set to the export group name.
:::

---

## Step 7: Use Identities in Templates

Email, webhook and queue targets can format their output with a mustache template. Identities are available to the template in the usual way:

```html
<p>ETRM curve: {{identity.etrm}}</p>
<p>Risk curve: {{identity.risk}}</p>
```

---

## Step 8: Change or Remove an Identity

If the ETRM changes a code, fetch the raw object, update the value and save. To remove a system's identity, use `remove()`:

```js
//#region
use training

hub = ${object:"MY.GAS.HUB", "_raw=true"}

// Update the ETRM code
hub.FORWARD_CURVE.identity.etrm = "MGH-FWD-GBP-V2"
save hub

// Remove the risk system identity
hub = ${object:"MY.GAS.HUB", "_raw=true"}
hub.FORWARD_CURVE_EUR.identity.remove("risk")
save hub
//#endregion
```

---

## Summary

| What you did | How |
|--------------|-----|
| Mapped items to ETRM codes | `identity.etrm` on each data item |
| Looked up items by ETRM code | `find ${data} where _identity.etrm = ...` and `"private.identity.etrm"` paths |
| Delivered each curve build | `curve` `success` automation → `queue` target |
| Delivered a scheduled export | An export group with an export script reading `#CURVES` |

## Exercise

1. Add an `etrm` identity to `MY.GAS.HUB:FORWARD_PREMIUM` and confirm you can find it by that code
2. Add the premium curve to the export group and save it again
3. Change the export script so that it logs a warning for any curve that has no `etrm` identity

For more detail, see [Data Identities](/docs/odsl/dm/identities), [Curve Exports](/docs/topics/curves/export) and the [Queue target](/docs/topics/automations/targets/queue).

## Track Complete

You have now completed the core modules of the Technical track:

| Module | What You Did |
|--------|--------------|
| 01 to 03 | Learned the core concepts and worked with events in ODSL and Excel |
| 04 to 06 | Built EventTimeSeries, SmartTimeSeries and forward curves |
| 07 to 09 | Monitored datasets, wrote quality checks and set up alerts |
| 10 to 12 | Automated scripts and checks, loaded external data and integrated with an ETRM |

:::note Next Step
Return to the [Technical Training home](/training/technical) to continue with the QuickStart Developer track or the General Tutorials.
:::
