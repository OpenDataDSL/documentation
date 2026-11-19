---
title: Matrices and options
description: The JSON of matrices, option chains and event options definitions
slug: /api/json/matrix-and-options
sidebar_position: 6
tags:
  - api
  - json
  - matrix
  - options
---

# Matrices and options

---

## Matrix

A matrix is a two dimensional table of numbers with labelled rows and columns, for example a volatility surface or a set of hourly shapes by month. It is saved as a property of a [master data object](./master-data#saving-an-object-with-data) and read with the [Data service](/docs/api/rest/service/data).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarMatrix` |
| `_id` | String | No | The data id within the object |
| `ondate` | Date | Yes | The date of the matrix. A matrix is kept for each date, like a curve: `NGE.GAS.TTF:VOL_SURFACE:2026-11-18` |
| `xLabels` | String[] | Yes | The column labels |
| `yLabels` | String[] | Yes | The row labels |
| `xSize`, `ySize` | Integer | Output | The number of columns and rows |
| `data` | Number[][] | Yes | One list per row (in `yLabels` order), each with one number per column (in `xLabels` order). `"NaN"` for a missing value |
| `name`, `description` | String | No | Descriptive fields |
| `currency`, `units`, `timezone` | String | No | The currency, units and timezone of the values |
| `precision` | Object | No | Decimal places and rounding, see [Numbers](./overview#numbers-and-missing-values) |
| `properties` | Object | No | Your own properties |
| `_identity` | Object | No | External codes |

```json
{
  "_id": "VOL_SURFACE",
  "_type": "VarMatrix",
  "name": "TTF option volatility surface",
  "ondate": "2026-11-18",
  "units": "PCT",
  "xLabels": ["80", "90", "100", "110", "120"],
  "yLabels": ["M01", "M02", "Q01"],
  "data": [
    [58.2, 54.1, 51.7, 53.0, 56.4],
    [55.0, 51.3, 49.2, 50.5, 53.8],
    [49.6, 46.8, 45.1, 46.2, 48.9]
  ]
}
```

The platform also keeps the list of its dates (`VarMatrixDates`) under the id without the date, as it does for [curves](./curves#curve-dates).

---

## Event options

An event options definition (`VarEventOptions`) builds option chains from an event list with one event per option. Only the definition is saved; the chains are built from the events when you read them. See [Options data](/docs/topics/options/options-data) for what each setting does.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarEventOptions` |
| `event` | String | Yes | The event list, as `objectid:eventlist` |
| `source` | String | No | Where the events are: `private`, `common` or `public` |
| `tenor` | String | No | The event property with the tenor [period code](/docs/odsl/calendar/period-code), defaults to `absolute` |
| `strike` | String | No | The event property with the strike price, defaults to `STRIKE_PRICE` |
| `callPut` | String | No | The event property that says call or put, defaults to `CONTRACT_TYPE` |
| `callValue`, `putValue` | String | No | The values of `callPut` for a call and a put, default `C` and `P` |
| `value` | String | No | The main value column, defaults to `SETTLEMENT_PRICE` |
| `columns` | String[] | No | The event properties shown for each call and put |
| `filter` | String | No | A filter (JSON) on the events |
| `timezone` | String | No | The timezone of the dates, defaults to UTC |
| `holidayCalendar` | String | No | The calendar of single option timeseries |
| `calendar` | String | No | An expiry calendar |
| `currency`, `units` | String | No | The currency and units of the prices |
| `name`, `description` | String | No | Descriptive fields |
| `positions` and the `position...` fields | | No | Turn the options into a positions view, see [Traded options](/docs/topics/options/traded-options) |
| `properties` | Object | No | Your own properties |

Saving a definition that has `tenors` is refused: the chains are never stored.

```json
{
  "_id": "OPTIONS",
  "_type": "VarEventOptions",
  "name": "EUA futures options",
  "event": "ICE.NDEX.EFO:OPTIONS",
  "source": "common",
  "currency": "EUR",
  "units": "t"
}
```

---

## Option chains

Reading event options for a date (for example `NGE.EUA:OPTIONS:2026-09-16`) returns the option chains for that date.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_type` | String | `VarOptions` |
| `_id` | String | The id with the date |
| `ondate` | Date | The date of the options |
| `name`, `description`, `currency`, `units`, `timezone` | String | From the definition |
| `value` | String | The main value column |
| `columns` | String[] | The columns of each call and put, in order |
| `tenors` | Array | The tenors in delivery order: `tenor`, `absolute` and `relative` (the [period codes](/docs/odsl/calendar/period-code)), `start`, `end` (the delivery period), `expiry` and `strikes` |
| `tenors[].strikes` | Array | The strikes in ascending order: `strike`, and `call` and `put` with a value per column. A side with no option is left out |
| `properties` | Object | From the definition, plus `modified`: when the latest event used was saved |
| `_subtype` | String | `VarEventOptions` |

```json
{
  "_type": "VarOptions",
  "_id": "NGE.EUA:OPTIONS:2026-09-16",
  "ondate": "2026-09-16",
  "name": "EUA futures options",
  "currency": "EUR",
  "units": "t",
  "value": "SETTLEMENT_PRICE",
  "columns": ["SETTLEMENT_PRICE", "OPTION_VOLATILITY", "DELTA_FACTOR", "OPEN_INTEREST", "TOTAL_VOLUME"],
  "tenors": [
    {
      "tenor": "2026M09",
      "absolute": "2026M09",
      "relative": "M00",
      "start": "2026-09-01",
      "end": "2026-09-30",
      "expiry": "2026-09-23",
      "strikes": [
        {
          "strike": 85,
          "call": {"SETTLEMENT_PRICE": 0.91, "OPTION_VOLATILITY": 22.0791, "DELTA_FACTOR": 0.4662, "OPEN_INTEREST": 3695, "TOTAL_VOLUME": 200},
          "put": {"SETTLEMENT_PRICE": 1.05, "OPTION_VOLATILITY": 22.5, "DELTA_FACTOR": -0.5338, "OPEN_INTEREST": 1200}
        }
      ]
    }
  ],
  "properties": {"event": "ICE.NDEX.EFO:OPTIONS", "modified": "2026-09-16T12:37:21"},
  "_subtype": "VarEventOptions"
}
```

The list of dates for event options has the type `VarOptionsDates`.
