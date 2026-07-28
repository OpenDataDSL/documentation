---
title: Event Curve Versioning
description: How versions work on event curves - intraday snapshots and forecasts, and adhoc versions from corrections.
---

# Event Curve Versioning

Event curves are built dynamically from the events attached to a master data object. Because those events change throughout the day and can be corrected after the fact, a single event curve can have many *versions* for the same ondate.

There are two types of versioning for an event curve:

1. **Intraday versions** - snapshots or forecasts that each represent a new curve at a specific point in time *within* the ondate.
2. **Adhoc versions** - versions created by corrections, either from the data vendor or made internally.

Which type you get is controlled by a single property. If you configure intraday versioning, the curve uses it. If you don't, the curve automatically falls back to adhoc (correction-based) versioning.

:::note
Versioning applies to how the curve is *read back* over time. It does not change how you attach events to the object - events are always saved through the hub object as normal.
:::

## Intraday versions (snaps and forecasts)

An intraday version is a full curve captured at a moment in time during the ondate. This is used for things like intraday market snaps or successive forecast runs, where you want to keep and retrieve each distinct point-in-time curve rather than only the latest state.

### Configuring intraday versioning

To enable this behaviour, add the `versioned` property to the event curve. When `versioned` is set, the curve uses the `eventtime` property of the underlying events to determine the different intraday versions - each distinct event time produces a separate version of the curve.

```js
//#region Configure intraday versioning
// Fetch the object that holds the event curve
obj = ${object:"ICE.BRN"}

// Define the event curve
obj.FORWARD = EventCurve("ICE.BRN:EVENTS", "ICE_EXPIRY", "price", "tenor")

// Enable intraday versioning - versions are derived from the events' eventtime
obj.FORWARD.versioned = true

save ${object:obj}
//#endregion
```

With `versioned` enabled:

- Each unique `eventtime` within an ondate is treated as its own version of the curve.
- Reading the curve for a given ondate returns the latest intraday version by default, and earlier snapshots remain individually retrievable.
- New snaps or forecast runs simply arrive as events with a new `eventtime`, which automatically creates the next version.

:::tip
Use intraday versioning when the *sequence of point-in-time curves* is meaningful - for example comparing an 09:00 snap against a 16:00 close, or reviewing how a forecast evolved across successive runs during the day.
:::

## Adhoc versions (corrections)

If the `versioned` property is **not** configured on the event curve, it automatically becomes an adhoc-versioned curve. No extra setup is required.

In this mode there is a single logical curve per ondate, and its versions are driven entirely by *corrections*. A correction is a change to a data point in the managed dataset behind the events, and corrections come from two places:

- **Vendor corrections** - a data provider restates or amends a previously published value.
- **Internal corrections** - a value is changed within your own environment.

Rather than storing each state as an explicit snapshot, adhoc versions are queried dynamically from the corrections data. When you request an earlier version of the curve, the platform reconstructs it from the correction history so you can see the curve as it stood before a given change.

:::note
Adhoc versioning is the default. Any event curve without `versioned` set will expose its history through corrections automatically.
:::

## Choosing between the two

| | Intraday versions | Adhoc versions |
|---|---|---|
| **Enabled by** | Setting `versioned` on the event curve | Default - `versioned` not set |
| **Versions represent** | Point-in-time snaps / forecast runs within the ondate | Corrections to previously published values |
| **Version driver** | The `eventtime` property of the events | Correction history (vendor or internal) |
| **Storage model** | A distinct curve per event time | Single curve, reconstructed from corrections |
| **Typical use** | Intraday market snaps, evolving forecasts | Restatements and data fixes |

In short: set `versioned` when you care about capturing the curve at successive moments in the day; leave it unset when you only need to track and reconstruct corrections to the published curve.
