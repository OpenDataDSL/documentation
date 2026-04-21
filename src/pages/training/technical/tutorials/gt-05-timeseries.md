---
slug: /training/technical/gt-timeseries
title: "Tutorial: Working with TimeSeries"
sidebar_position: 24
tags: [training, technical, odsl, timeseries]
---

# Tutorial: Working with TimeSeries

An in-depth exploration of TimeSeries creation, calendars, observations, and value statuses in ODSL.

---

## Calendars

Every TimeSeries requires a calendar that defines which points in time are valid for observations.

### Daily Calendar

```js
//#region
daily = DailyCalendar()
dates = daily.getDates("2021-01-01", "2021-01-07")
print dates
// Returns all 7 days
//#endregion
```

### Business Calendar

```js
//#region
business = BusinessCalendar()
dates = business.getDates("2021-01-01", "2021-01-07")
print dates
// Returns weekdays only — Saturday and Sunday are excluded
//#endregion
```

### Custom Holiday Rules

Extend a calendar with additional rules to exclude specific days:

```js
//#region
business = BusinessCalendar()
business.addRule("Every Monday")
dates = business.getDates("2021-01-01", "2021-01-07")
print dates
// Saturday, Sunday, and Monday are all excluded
//#endregion
```

:::note Sparse Calendar
If observations are not at regular intervals, use the `SPARSE` calendar — it accepts any point in time as a valid index.
:::

---

## Creating a TimeSeries

```js
//#region
// Using a calendar name
ts1 = TimeSeries("BUSINESS")

// Using a calendar variable
business = BusinessCalendar()
ts2 = TimeSeries(business)

// With an explicit data type (restricts observations to strings only)
ts3 = TimeSeries("BUSINESS", "string")
//#endregion
```

---

## Adding Observations

```js
//#region
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)
print json(ts1)
//#endregion
```

Adding a value on a non-calendar day raises an error:

```js
//#region
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)

// This will error — 2021-01-02 is a Saturday
// ts1.add("2021-01-02", 21.5)

// Skipping Monday — NaN is inserted automatically for the gap
ts1.add("2021-01-05", 21.7)
print ts1.values
//#endregion
```

Missing values are stored as `NaN` (Not a Number) to preserve calendar alignment.

---

## Setting Value Statuses

Status metadata can be attached to individual observations in three categories:

| Category | Purpose |
|----------|---------|
| Quality | Is the value representative? (e.g. `Estimated`, `Missing`) |
| Source | Where did the value come from? |
| Reliability | How reliable is the value? |

```js
//#region
ts1 = TimeSeries("BUSINESS")

// Add a value with status metadata
ts1.add("2021-01-15", 15.5, ["Valid", "Calculated"])
print ts1.values
//#endregion
```

---

## Saving and Updating

```js
//#region
use training

ts = TimeSeries("2021-10-01", "BUSINESS", [12.5, 12.6, 12.7, 12.8, 12.9])

myObj = Object()
myObj.PRICE = ts
save ${object:myObj}
print "Saved myObj:PRICE"
//#endregion
```

To update — save a new mini-TimeSeries for the observation date. OpenDataDSL merges it automatically:

```js
//#region
use training

update = TimeSeries("2021-10-14", "BUSINESS", 14.8)
myObj = Object()
myObj.PRICE = update
save ${object:myObj}
print "Updated 2021-10-14 observation"
//#endregion
```

---

## Reading Back Data

```js
//#region
use training

// Read the full TimeSeries
ts = ${data:"myObj:PRICE"}
print ts

// Get a specific date range
subset = ts.range("2021-10-01", "2021-10-07")
print subset

// Get the last 5 observations
recent = ts.last(5)
print recent
//#endregion
```
