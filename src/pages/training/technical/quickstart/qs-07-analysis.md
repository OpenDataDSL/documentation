---
slug: /training/technical/qs-analysis
title: "QuickStart: Analysis"
sidebar_position: 16
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Analysis

Using aggregation pipelines and statistical functions to analyse your data.

---

## Aggregation

Aggregation summarises portions of data to give you an overview of what is stored.

### Distinct Aggregation

Get a unique list of values for any property:

```js
//#region
// All unique IDs of public calendars
calendars = find unique _id from ${calendar:public}
print calendars
//#endregion
```

```js
//#region
use training
// Unique dataset values in your private objects
datasets = find unique dataset from ${object}
print datasets
//#endregion
```

### Aggregation Pipelines

Pipelines let you filter, group, and sort while aggregating one or more fields:

```js
//#region
use training
// Sum process executions grouped by status, sorted by quantity descending
summary = aggregate ${exec}
    match service = "ETL"
    group _id = "$status", qty = count()
    sort qty desc
end

print summary
//#endregion
```

---

## Statistical Functions

### Simple Regression

The `simpleRegression` function fits a linear model to a TimeSeries and can predict future values:

```js
//#region
// Create a TimeSeries with 5 values
input = TimeSeries("2021-10-01", "DAILY", [12.5, 12.8, 12.9, 11.5, 11.9])

// Run regression
reg = simpleRegression(input)

print reg.slope
print reg.intercept
print reg.RSquare

// Predict the next day's value
print reg.predict(Date("2021-10-06"))
//#endregion
```

:::tip Statistical Function Library
OpenDataDSL includes an ever-growing library of statistical functions for TimeSeries analysis — including `mean`, `stdev`, `min`, `max`, `sma`, `csum`, and many more.
:::

:::note Next Step
In [QuickStart: ETL](/training/technical/qs-etl) you will extract data from remote sources, transform it, and load it into the platform.
:::
