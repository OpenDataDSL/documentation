---
slug: /training/technical/gt-searching
title: "Tutorial: Searching with the find Command"
sidebar_position: 23
tags: [training, technical, odsl, search]
---

# Tutorial: Searching with the find Command

A complete reference for the `find` command syntax and examples across all OpenDataDSL services.

---

## Syntax

```js
// Minimal — return all entities from a service
result = find ${service}

// Return a small sample using the 'top' option
result = find top n ${service}

// Specifying source (public or private)
result = find ${service:source}

// Filtering results
result = find ${service:source} where conditions

// Return a unique list of values for a field
result = find unique field from ${service:source} where conditions

// Return a data profile (timeseries/curves instead of objects)
result = find profile field from ${service:source} where conditions
```

The result is always a `VirtualList` — results are paged from the service rather than loaded all at once.

**Source** can be `public` (OpenDataDSL reference data) or `private` (your own data, the default).

---

## Filter Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` or `==` | Exact match | `name = "test"` |
| `= []` or `== []` | Match one of a list | `name = ["test", "sample"]` |
| `<` | Less than | `timestamp < ${date:"today"}` |
| `<=` | Less than or equal | `price <= 9.99` |
| `>` | Greater than | `length > 1` |
| `>=` | Greater than or equal | `timestamp >= "2020-01-01"` |
| `!=` | Not equal | `name != "test"` |

Chain conditions with `and` and `or`, and use brackets to control evaluation order:

```js
//#region
use training
results = find ${object} where (category = "GAS" or category = "POWER") and name != "test"
print results
//#endregion
```

---

## Using Variables in Conditions

```js
//#region
curr = "USD"
fx = find ${object:"#ForeignExchange"} where currency = curr
print fx
//#endregion
```

---

## Unique Values

```js
//#region
// Get all unique currencies from public ECB FX data
currencies = find unique currency from ${currency:public} where source == "ECB_FX"
print currencies
//#endregion
```

---

## Data Profile Queries

Return data entities (timeseries/curves) instead of object records:

```js
//#region
// Fetch all SPOT timeseries for ECB FX currencies
data = find profile SPOT from ${currency:public} where source == "ECB_FX"
print data
//#endregion
```

---

## Examples by Service

### Actions

```js
//#region
// All public actions
pactions = find ${action:public}

// Public actions in the extractors category
extractors = find ${action:public} where category = "extractors"
print extractors
//#endregion
```

### Audit

```js
//#region
// All changes to a specific entity today
records = find ${audit} where service = "action" and id = "test_send_batch" and timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
print records

// All changes after a specific timestamp
older = find ${audit} where timestamp > "2020-11-03T12:23:40"
print older
//#endregion
```

### Calendars

```js
//#region
// All public calendars
pcalendars = find ${calendar:public}
print pcalendars
//#endregion
```

### Objects

```js
//#region
use training
// First 15 objects in a specific dataset
objects = find top 15 ${object} where dataset = "DS"
print objects
//#endregion
```
