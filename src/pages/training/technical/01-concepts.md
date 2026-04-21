---
slug: /training/technical/core-concepts
title: "Module 01: Core Concepts"
sidebar_position: 2
tags: [training, concepts]
---

# Module 01: Core Concepts

This module introduces the key concepts you will use throughout this training. No coding is required — focus on understanding how the platform is structured and how its parts relate to each other.

## The OpenDataDSL Data Model

OpenDataDSL organises everything around **master data objects**. An object is a record that represents a real-world entity — a commodity, a trading location, a counterparty, or a data source. Objects carry both descriptive properties (metadata) and any number of named data items.

```
Object (Master Data)
├── Properties        (name, description, category, ...)
├── TimeSeries        (regular time series values)
├── SmartTimeSeries   (expression-based, calculated on demand)
├── EventTimeSeries   (built dynamically from events)
├── Curve             (a forward curve for a specific valuation date)
├── SmartCurve        (expression-based forward curve)
├── EventCurve        (forward curve built dynamically from events)
├── CurveSeries       (a time series of forward curves)
├── Matrix            (a 2D table of values)
├── Report            (a structured report linked to the object)
└── Documentation     (reference documentation attached to the object)
```

### Services

The platform exposes data through named **services**. Each service maps to a category of data and a REST endpoint. The most important services for this training are:

| Service | Description |
|---------|-------------|
| `object` | Master data records |
| `event` | Event transactions with a time range and free-form properties |
| `data` | All time series, curves, and matrices |
| `dataset` | Managed dataset configuration and monitoring |
| `script` | ODSL scripts stored and run on the platform |
| `type` | Type definitions (schemas) for objects and events |

### Active Variables

In ODSL, you access platform services using **active variable** syntax:

```js
//#region
// Fetch an object from the object service
obj = ${object:"MY.OBJECT.ID"}

// Fetch a timeseries from the data service
ts = ${data:"MY.OBJECT.ID:MY_SERIES"}

// Fetch an event list from the event service
events = ${event:"MY.OBJECT.ID:MY_EVENTS"}
//#endregion
```

The pattern is always `${service:"identifier"}`.

---

## Events

An **Event** is a time-bounded transaction record. Unlike a timeseries observation (a single value at a point in time), an event has:

- A **start time** (`eventstart`) and optionally an **end time** (`eventend`)
- A **type** (defined by a schema in the `type` service)
- Any number of **free-form properties** — price, volume, currency, counterparty, etc.

Events are grouped into **event lists**. An event list belongs to a master data object and has a name, for example `TRADES`, `NOMINATIONS`, or `OUTAGES`.

The full identifier for an event list is: `OBJECT_ID:EVENT_LIST_NAME`

### Common Uses for Events

- Trade capture (price, volume, buyer, seller)
- Generation nominations
- Outage records
- Settlement prices with attributes
- Meter readings

---

## TimeSeries

A **TimeSeries** is a sequence of values indexed by time, with a defined **calendar** that controls what dates are valid. Common calendar types include:

| Calendar | Description |
|----------|-------------|
| `DailyCalendar()` | One value per calendar day |
| `BusinessCalendar()` | Weekdays only |
| `MonthlyCalendar()` | One value per month |
| `HourlyCalendar()` | One value per hour |

TimeSeries are stored as properties on master data objects.

---

## EventTimeSeries

An **EventTimeSeries** is a special type of timeseries that is **built dynamically from events**. Instead of storing values directly, it points to an event list and a property name. When the timeseries is requested, the platform reads the events and extracts the named property as the timeseries values.

This means:
- Events are the source of truth
- The timeseries is always up to date with the latest event data
- You can filter which events contribute to the timeseries

---

## SmartTimeSeries

A **SmartTimeSeries** is an **expression-based** timeseries. It holds a formula rather than raw values. When requested, the formula is evaluated against one or more referenced timeseries.

This is ideal for:
- Currency conversion (multiply by an FX rate series)
- Unit conversion (multiply by a fixed factor)
- Spread calculations (series A minus series B)
- Scaled or adjusted views of data

```
SmartTimeSeries = BASE timeseries + expression formula + optional named inputs
```

---

## Curve

A **Curve** is a forward curve — a snapshot of prices or values for future delivery periods, taken on a specific valuation date (the `ondate`). Each entry on the curve is a **Contract** with a period code (e.g. `M01`, `Q02`, `Y01`) and a value.

Curves are stored on master data objects and versioned by ondate — each day's curve is a new version.

---

## SmartCurve

A **SmartCurve** is an **expression-based** forward curve. Like a SmartTimeSeries, it holds a formula evaluated against a base curve and optional named inputs rather than storing raw contract values.

Common uses:
- Spread curves (spark spread, dark spread)
- Premium or discount curves (base × factor)
- Interpolated or bootstrapped curves
- Blended curves from multiple inputs

```
SmartCurve = BASE curve + expression formula + optional named inputs
```

---

## EventCurve

An **EventCurve** is a forward curve **built dynamically from events**. It points to an event list and extracts one property as the contract value and another as the tenor code. When requested, the platform reads the matching events and assembles the curve on the fly.

This keeps the events as the single source of truth for curve data, mirroring how EventTimeSeries works for time series.

---

## CurveSeries

A **CurveSeries** is a **timeseries with an ondate**. The `ondate` is the date that the curve or timeseries represents — the valuation date from which all future delivery values are observed. Each value in the series represents the price of the asset at some future delivery point in time.

CurveSeries is commonly used for intraday curves with a large number of observations, such as an hourly power curve extending five years into the future. Storing this as a standard curve would be impractical due to the volume of contracts; the CurveSeries structure handles this efficiently by combining the timeseries storage model with the concept of an ondate.

---

## Matrix

A **Matrix** is a **2D table of values** with labelled rows and columns. It is used for data that does not fit naturally into a timeseries or curve structure, such as:

- Volatility surfaces (strike × expiry)
- Correlation matrices
- Scenario grids

Matrices are stored on master data objects just like timeseries and curves.

---

## Report

A **Report** is a structured output — a formatted view of data — that can be attached to a master data object. Reports are generated from report configurations and can be used to publish summaries, quality snapshots, or analytical outputs linked to a specific object.

---

## Documentation

**Documentation** allows reference material to be attached directly to a master data object. This can be:

- A description of the data source or methodology
- Links to external documentation URLs
- Inline markdown content stored on the platform

This makes it easy for consumers of an object to understand what the data represents and how it is produced.

---

## Datasets

A **Dataset** is a monitoring configuration for a group of related data items. It defines:

- Which timeseries or curves are expected
- How many values are expected per delivery date
- Quality and critical check scripts to run on delivery

The platform tracks daily delivery against the dataset configuration and provides a dashboard showing completeness, quality, and any failures.

---

## Quality Checks

**Quality checks** are validation rules applied to timeseries data. They can be:

- **Built-in checks** — such as `missing` (checks for missing values), or range checks
- **Script-based checks** — custom ODSL functions that implement your own business rules

Quality check scripts are attached to a dataset and run automatically when new data arrives.

---

## Summary

| Concept | What it is |
|---------|-----------|
| Object | A master data record — the container for all related data |
| Event | A time-bounded transaction with free-form properties |
| TimeSeries | A regular sequence of values indexed by a calendar |
| SmartTimeSeries | A timeseries defined by a formula over other timeseries |
| EventTimeSeries | A timeseries built dynamically from event properties |
| Curve | A forward curve snapshot for a specific valuation date |
| SmartCurve | An expression-based forward curve |
| EventCurve | A forward curve built dynamically from events |
| CurveSeries | A timeseries with an ondate — each value is an asset price at a future delivery point, used for intraday curves such as hourly power going out 5 years |
| Matrix | A 2D table of values with labelled rows and columns |
| Report | A structured formatted output linked to an object |
| Documentation | Reference material attached to an object |
| Dataset | A monitoring configuration for expected daily data delivery |
| Quality Check | A validation rule run against delivered event data |

:::note Next Step
In [Module 02](/training/technical/events-odsl) you will write ODSL code to create and update events.
:::
