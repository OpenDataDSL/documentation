---
slug: /training/technical/forward-curves
title: "Module 06: Forward Curves"
sidebar_position: 7
tags: [training, curves, event-curve, smart-curve, odsl]
---

# Module 06: Forward Curves

In this module you will add forward prices to the `MY.GAS.HUB` training object as events, build an **EventCurve** from those events, and then derive further curves from it with **Smart Curve** expressions.

## Scenario

Alongside the daily nominations and settlements, the training hub now receives an end-of-day **forward price** for each of the next six delivery months. Each forward price is an event that records:

- The curve date (the valuation date, or `ondate`)
- The delivery tenor (for example `M01` for the next month)
- The price, in GBP per therm

From these events you will build a forward curve that is always in step with the event data, a EUR per MWH view of it, a premium curve and a day-on-day change curve.

---

## Background: Curve Types

OpenDataDSL has four types of forward curve:

| Type | How it is built |
|------|-----------------|
| `Curve` | A basic curve holding the contracts for a specific ondate |
| `EventCurve` | Built dynamically from the data in an event list |
| `SmartCurve` | Built from an expression over a base curve and, optionally, other data |
| `CurveSeries` | A curve held as a timeseries, usually for high frequency curves such as hourly power |

Every curve has an **ondate**, a `CurveDate` made up of a date and an expiry calendar. The expiry calendar is used to work out the delivery period and expiry of each contract on the curve.

---

## Step 1: Define the Forward Price Event Type

```js
//#region
use training

ForwardPriceType = type extends #Event
    price as Number()
    currency as String()
end

ForwardPriceType.event = true

save ${type:ForwardPriceType}
print "Forward price type saved"
//#endregion
```

---

## Step 2: Add Forward Price Events

You can create an event from a curve date and a tenor using `Event(ondate, tenor)`. This populates the `eventtime`, `eventstart`, `eventend`, `absolute`, `relative` and `expiry` fields automatically, which is exactly what an EventCurve needs.

The script below adds six monthly forward prices for two curve dates.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}
expcal = ${expiry:"#REOD"}

curveDates = ["2025-03-03", "2025-03-04"]
tenors = ["M01", "M02", "M03", "M04", "M05", "M06"]

forwards = []
dayShift = 0
for cd in curveDates
    ondate = CurveDate(cd, expcal)
    i = 0
    for tenor in tenors
        evt = Event(ondate, tenor)
        evt.id = "FWD-" + format(Date(cd), "yyyyMMdd") + "-" + tenor
        evt._dsid = "TRAINING.MYGASHUB.FORWARDS"
        evt.eventtype = "ForwardPriceType"
        evt.price = 0.85 + (i * 0.02) + dayShift
        evt.currency = "GBP"
        forwards.add(evt)
        i = i + 1
    next
    dayShift = dayShift + 0.01
next

hub.FORWARDS = forwards
save hub
print "Saved " + forwards.size() + " forward price events"
//#endregion
```

:::tip Event IDs and Datasets
As in Module 02, the `id` gives each event a stable identifier (`FWD-20250303-M01`), so re-running the script updates the events rather than duplicating them. The `_dsid` creates a third dataset, `TRAINING.MYGASHUB.FORWARDS`, which you can monitor in the same way as the settlements dataset.
:::

---

## Step 3: Create the EventCurve

The `EventCurve` constructor takes four arguments:

```js
//#region
EventCurve(eventlist, calendar, property, tenor)
//#endregion
```

| Argument | Description |
|----------|-------------|
| `eventlist` | The event list in the form `"OBJECT_ID:EVENT_LIST_NAME"` |
| `calendar` | The expiry calendar for the curve |
| `property` | The event property that holds the contract value |
| `tenor` | The event property that holds the tenor, for example `absolute` or `relative` |

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

fwd = EventCurve("MY.GAS.HUB:FORWARDS", "#REOD", "price", "absolute")
fwd.description = "End of day forward prices for the training gas hub"
fwd.currency = "GBP"
fwd.units = "therm"

hub.FORWARD_CURVE = fwd
save hub

print "FORWARD_CURVE EventCurve saved"
//#endregion
```

Like an EventTimeSeries, an EventCurve stores no values of its own. When you read it, the platform reads the matching events and assembles the curve for the requested ondate.

:::note Optional EventCurve Properties
An EventCurve also supports a `filter` to restrict which events are used, a `valueTransformation` expression such as `"value * 1.1"` to adjust every value, and `include` to add extra event properties as columns on the contracts.
:::

---

## Step 4: Read the Curve

A curve data id adds the curve date to the usual `OBJECT_ID:PROPERTY` form. You can also ask for the latest curve, or for the history of a single tenor.

```js
//#region
use training

// The curve for a specific curve date
c1 = ${data:"MY.GAS.HUB:FORWARD_CURVE:2025-03-03"}
print c1.contracts

// The latest curve
latest = ${data:"MY.GAS.HUB:FORWARD_CURVE:L"}
print latest.ondate

// A timeseries of the front month, one value per curve date
m01 = ${data:"MY.GAS.HUB:FORWARD_CURVE:M01"}
print m01
//#endregion
```

| Data id | What you get |
|---------|--------------|
| `MY.GAS.HUB:FORWARD_CURVE:2025-03-03` | The curve for that curve date |
| `MY.GAS.HUB:FORWARD_CURVE:L` | The latest curve |
| `MY.GAS.HUB:FORWARD_CURVE:L-1` | The curve one date before the latest |
| `MY.GAS.HUB:FORWARD_CURVE:M01` | A timeseries of the `M01` tenor across curve dates |

---

## Step 5: Convert the Curve with a Smart Curve

A **SmartCurve** takes a base curve and an expression. In the expression, `BASE` refers to the base curve. If you set `currency` and/or `units` on a Smart Curve, the base curve and any other curves it uses are converted to them, so a plain `BASE` expression gives you a converted copy of the curve.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

fwdEur = SmartCurve("MY.GAS.HUB:FORWARD_CURVE", "BASE")
fwdEur.description = "Forward prices in EUR per MWH"
fwdEur.currency = "EUR"
fwdEur.units = "MWH"

hub.FORWARD_CURVE_EUR = fwdEur
save hub

print "FORWARD_CURVE_EUR SmartCurve saved"
//#endregion
```

### Test before saving

Use the `build(date)` method to evaluate a Smart Curve for one curve date without saving anything:

```js
//#region
use training

test = SmartCurve("MY.GAS.HUB:FORWARD_CURVE", "BASE")
test.currency = "EUR"
test.units = "MWH"

result = test.build("2025-03-03")
print result.contracts
//#endregion
```

---

## Step 6: A Premium Curve with a Named Value

Any dynamic property you add to a Smart Curve can be used in its expression. Here a numeric `factor` property applies a 5% premium.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

premium = SmartCurve("MY.GAS.HUB:FORWARD_CURVE", "BASE * factor")
premium.factor = 1.05
premium.description = "Forward curve with a 5% premium"

hub.FORWARD_PREMIUM = premium
save hub

print "FORWARD_PREMIUM SmartCurve saved"
//#endregion
```

---

## Step 7: A Day-on-Day Change Curve

A named input is normally read for the same ondate as the curve being built. Adding `:<ONDATE` to the reference reads the latest curve strictly **before** that ondate, so `BASE - VAR1` gives the change in each tenor since the previous curve.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

change = SmartCurve("MY.GAS.HUB:FORWARD_CURVE", "BASE - VAR1")
change.VAR1 = ref("data", "MY.GAS.HUB:FORWARD_CURVE:<ONDATE")
change.description = "Day-on-day change in the forward curve"

hub.FORWARD_CHANGE = change
save hub

// The 2025-03-04 build compares against the 2025-03-03 curve
print change.build("2025-03-04").contracts
//#endregion
```

:::tip ONDATE suffixes
`:-ONDATE` reads the curve for the ondate or the latest one before it. `:<ONDATE` reads the latest curve strictly before the ondate.
:::

---

## Step 8: Control When Smart Curves Are Built

A Smart Curve is built and cached according to its `cacheOptions.type`. For an end-of-day curve that depends on incoming data, `OnDependencies` rebuilds the curve whenever its inputs are updated.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

// Redefine the EUR curve from Step 5 with a cache type
fwdEur = SmartCurve("MY.GAS.HUB:FORWARD_CURVE", "BASE")
fwdEur.description = "Forward prices in EUR per MWH"
fwdEur.currency = "EUR"
fwdEur.units = "MWH"
fwdEur.cacheOptions.type = "OnDependencies"

hub.FORWARD_CURVE_EUR = fwdEur
save hub
//#endregion
```

| Cache type | Behaviour |
|------------|-----------|
| `Never` | Never cached, always calculated on demand |
| `OnDemand` | Calculated and cached the first time it is read |
| `OnDependencies` | Built and cached whenever its dependencies are updated |
| `OnSchedule` | Rebuilt on a cron schedule, typically for realtime curves |
| `External` | Built and saved by an external application |

---

## Step 9: Monitor Curve Builds

For each date that a curve should be built, the curve dashboard in the portal shows a status:

| Status | Meaning |
|--------|---------|
| **Waiting** | The curve is waiting for one or more inputs |
| **Built** | The curve has built, possibly with log messages or warnings |
| **Failed** | The build failed, with error information to help you fix it |
| **Complete** | The curve built and passed its validation |
| **Invalid** | The curve built but failed one or more validation checks |

If a build fails, work through the failure message, then the build log, then the audit records. Module 10 shows how to be notified automatically when a curve build succeeds or fails.

:::note Intraday Curves
If you need to keep several curves for the same ondate, for example intraday snaps, set `versioned = true` on the EventCurve. Each distinct `eventtime` then becomes its own version of the curve. Without it, the history of an EventCurve comes from corrections to its events.
:::

---

## Summary

| Curve | Type | Definition |
|-------|------|------------|
| `FORWARD_CURVE` | EventCurve | `FORWARDS` events, `#REOD` calendar, `price` value, `absolute` tenor |
| `FORWARD_CURVE_EUR` | SmartCurve | `BASE`, converted to EUR per MWH |
| `FORWARD_PREMIUM` | SmartCurve | `BASE * factor` with `factor = 1.05` |
| `FORWARD_CHANGE` | SmartCurve | `BASE - VAR1`, where `VAR1` is the previous curve |

## Exercise

1. Add forward price events for a third curve date, `2025-03-05`, and confirm `MY.GAS.HUB:FORWARD_CURVE:L` returns the new curve
2. Read `MY.GAS.HUB:FORWARD_CHANGE:2025-03-05` and check the values against the two underlying curves
3. Create a `FORWARD_MID` Smart Curve that averages `FORWARD_CURVE` and `FORWARD_PREMIUM` using a named reference and the expression `(BASE + PREM) / 2`

For more detail, see the [EventCurve](/docs/odsl/variable/eventcurve) and [SmartCurve](/docs/odsl/variable/smartcurve) references and the [Smart Curves tutorial](/training/technical/gt-smart-curves).

:::note Next Step
In [Module 07](/training/technical/dataset-monitoring) you will configure dataset monitoring in the portal to track daily delivery of your data.
:::
