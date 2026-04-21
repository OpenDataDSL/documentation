---
slug: /training/technical/qs-data
title: "QuickStart: Data"
sidebar_position: 15
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Data

An in-depth guide to working with TimeSeries and Curve data in ODSL.

---

## TimeSeries

A TimeSeries is an array of values where each is aligned to a point in time, indexed by a calendar.

### Creating a TimeSeries

```js
//#region
// Using a calendar name string
ts1 = TimeSeries("DAILY")

// Using a calendar constructor
ts2 = TimeSeries(DailyCalendar())

// With a start date and values
ts3 = TimeSeries("2021-10-01", "BUSINESS", [12.5, 12.6, 12.7, 12.8, 12.9])
print ts3.values
//#endregion
```

:::note Sparse Calendar
If the intervals are not predetermined, use a `Sparse` calendar — it accepts any point in time as a valid index.
:::

### Adding Values

```js
//#region
ts3 = TimeSeries("2021-10-01", "BUSINESS", [12.5, 12.6, 12.7, 12.8, 12.9])

// Add at a specific date index
ts3.add("2021-10-12", 14)

// Add at the next calendar position
ts3.addValue(14.5)

print ts3.values
//#endregion
```

:::warning Calendar Alignment
When using `add`, the date index must align with the TimeSeries calendar — otherwise you will get an error.
:::

### Saving a TimeSeries

A TimeSeries must be attached to an object before it can be saved:

```js
//#region
use training
ts3 = TimeSeries("2021-10-01", "BUSINESS", [12.5, 12.6, 12.7, 12.8, 12.9])

QS01 = Object()
QS01.DATA = ts3
save ${object:QS01}
print "Saved QS01:DATA"
//#endregion
```

### Updating a TimeSeries

To add new values to an existing TimeSeries, save a mini-TimeSeries for the new date. OpenDataDSL merges it automatically:

```js
//#region
use training
ts3 = TimeSeries("2021-10-14", "BUSINESS", 14.8)
QS01 = Object()
QS01.DATA = ts3
save ${object:QS01}
print "Updated QS01:DATA"
//#endregion
```

### Setting Value Status

You can attach status metadata to individual observations:

```js
//#region
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-10-15", 15.5, ["Valid", "Calculated"])
print ts1.values
//#endregion
```

---

## Curves

A Curve holds an array of contracts representing future delivery periods.

### Creating a Curve

```js
//#region
ondate = CurveDate("2021-10-01", "#REOMB")
curve = Curve(ondate)

curve.add(Contract(ondate, "2021M11", 25.75))
curve.add(Contract(ondate, "2021M12", 25.85))
curve.add(Contract(ondate, "2022M01", 25.90))
curve.add(Contract(ondate, "2022M02", 25.92))
curve.add(Contract(ondate, "2022M03", 25.93))

print curve.contracts
//#endregion
```

### Contract Properties

When a contract is created, the platform computes relative period code, start date, end date, and expiry date:

```js
//#region
ondate = CurveDate("2021-10-01", "#REOMB")
c1 = Contract(ondate, "2021M11", 25.75)
print c1.relative   // M01
print c1.start      // 2021-11-01
print c1.end        // 2021-11-30
print c1.expiry     // 2021-10-31
//#endregion
```

### Saving a Curve

```js
//#region
use training
ondate = CurveDate("2021-10-01", "#REOMB")
curve = Curve(ondate)
curve.add(Contract(ondate, "2021M11", 25.75))
curve.add(Contract(ondate, "2021M12", 25.85))
curve.add(Contract(ondate, "2022M01", 25.90))

QS01 = Object()
QS01.CURVE = curve
save ${object:QS01}
print "Saved QS01:CURVE"
//#endregion
```

:::tip Curve vs TimeSeries
A Curve represents a complete valuation — you send the whole curve each time, and new curves for the same date are stored as a new version. A TimeSeries is updated incrementally, one observation at a time.
:::

:::note Next Step
In [QuickStart: Analysis](/training/technical/qs-analysis) you will use aggregation pipelines and statistical functions to analyse your data.
:::
