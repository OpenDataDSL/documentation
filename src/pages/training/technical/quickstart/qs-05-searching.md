---
slug: /training/technical/qs-searching
title: "QuickStart: Searching"
sidebar_position: 14
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Searching

A comprehensive guide to finding and filtering data across all OpenDataDSL services, including geo-spatial queries.

---

## Syntax

```js
// Minimal — return all entities from a service
result = find ${service}

// Specifying source (public or private)
result = find ${service:source}

// Filtering results
result = find ${service:source} where conditions

// Return a unique list of values for a field
result = find unique field from ${service:source} where conditions

// Return a data profile
result = find profile field from ${service:source} where conditions
```

The result is a `VirtualList` — it pages results from the service rather than loading everything at once.

---

## Filter Conditions

### Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` or `==` | Exact match | `name = "test"` |
| `= []` or `== []` | Match one of a list | `name = ["test", "sample"]` |
| `<` | Less than | `timestamp < ${date:"today"}` |
| `<=` | Less than or equal | `price <= 9.99` |
| `>` | Greater than | `length > 1` |
| `>=` | Greater than or equal | `timestamp >= "2020-01-01"` |
| `!=` | Not equal | `name != "test"` |

### Logical Operators

Chain conditions with `and` and `or`, and use brackets to control precedence:

```js
//#region
use training
results = find ${object} where (category = "GAS" or category = "POWER") and name != "test"
print results
//#endregion
```

### Using Variables in Conditions

```js
//#region
use training
cat = "GAS"
results = find ${object} where category = cat
print results
//#endregion
```

---

## Unique Values

Get a distinct list of values for a specific field:

```js
//#region
use training
datasets = find unique dataset from ${object}
print datasets
//#endregion
```

---

## Data Profile Queries

Return data entities (timeseries/curves) rather than object entities:

```js
//#region
// Fetch all SPOT data for ECB FX currencies
data = find profile SPOT from ${currency:public} where source == "ECB_FX"
//#endregion
```

---

## Geo-spatial Queries

If your objects include geometry properties, you can query by location:

```js
//#region
// Find items within a 20-mile radius of a point
items = find ${object:"TestGeometry"} where location within Sphere([51.72961, 0.47612], 20 / 3963.2)
print items
//#endregion
```

```js
//#region
// Find items within a polygon
london = Polygon([[51.5386, -0.4956],[51.6445, -0.0753],[51.5205, 0.1753],[51.3479, -0.1163],[51.5386, -0.4956]])
items = find ${object:"TestGeometry"} where location within london
print items
//#endregion
```

---

## Common Service Examples

```js
//#region
// Find all public actions in the 'extractors' category
pactions = find ${action:public} where category = "extractors"
print pactions
//#endregion
```

```js
//#region
// Find all audit records for a specific entity today
records = find ${audit} where service = "action" and id = "test_send_batch" and timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
print records
//#endregion
```

```js
//#region
// Find all public calendars
pcalendars = find ${calendar:public}
print pcalendars
//#endregion
```

:::note Next Step
In [QuickStart: Data](/training/technical/qs-data) you will work with TimeSeries and Curve data in depth.
:::
