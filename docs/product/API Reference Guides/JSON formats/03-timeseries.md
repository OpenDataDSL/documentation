---
title: Timeseries
description: The JSON of timeseries, and of smart, event, metric and composed timeseries
slug: /api/json/timeseries
sidebar_position: 3
tags:
  - api
  - json
  - timeseries
---

# Timeseries

A timeseries is a list of values against times, aligned to a calendar. You save a timeseries as a property of a [master data object](./master-data#saving-an-object-with-data) and read it with the [Data service](/docs/api/rest/service/data) using its data id, `objectid:property`, for example `NGE.POWER.DE:SPOT`.

There are five kinds:

| **`_type`** | **What it is** |
|-|-|
| `VarTimeSeries` | Values you load |
| `VarSmartTimeSeries` | Calculated from other timeseries with an expression |
| `VarEventTimeSeries` | Built from the events of an event list |
| `VarMetricTimeSeries` | Built from platform usage metrics |
| `VarComposedTimeSeries` | An element of a composition |

Smart, event, metric and composed timeseries are definitions: their values are worked out when they are read (or built), so saving one with a `data` field is refused.

---

## TimeSeries

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarTimeSeries` |
| `_id` | String | No | The data id within the object. When saved in an object, the property name is used |
| `calendar` | String | No | The calendar code, for example `DAILY`, `BUSINESS`, `#HENG`, `#PT1H`. Defaults to `SPARSE` (no fixed interval) |
| `start` | Date | No | The time of the first value. Needed only when `data` is a list of plain numbers |
| `data` | Array | No | The values, see [Values](#values) |
| `name` | String | No | A name |
| `description` | String | No | A description |
| `currency` | String | No | The currency code, for example `EUR` |
| `units` | String | No | The units code, for example `MWH`, see the [Unit service](/docs/api/rest/service/unit) |
| `timezone` | String | No | The timezone of the times, for example `Europe/Berlin` |
| `observed` | String | No | How a value relates to its period, used when converting to another calendar: `end` (the default), `beginning`, `averaged`, `summed`, `high`, `low`, `delta` or `none` |
| `tenor` | String | No | A tenor [period code](/docs/odsl/calendar/period-code), for timeseries taken from a curve |
| `source` | String | No | Where the data comes from |
| `dataType` | String | No | The type of the values, defaults to `any` |
| `valueType` | String | No | `TRACKED` (the default): values are objects with a status. `BASIC`: values are written with only `time` and `value` |
| `precision` | Object | No | Decimal places and rounding, see [Numbers](./overview#numbers-and-missing-values) |
| `scaling` | Integer | Output | The scaling applied when the timeseries was read |
| `properties` | Object | No | Your own properties |
| `_status` | Object | No | The status of the whole timeseries, see [Status](./overview#status) |
| `_checks` | Array | Output | The quality checks recorded on the timeseries |
| `_identity` | Object | No | The codes other systems use for the timeseries, by provider, see [Identities](./overview#identities) |
| `_links` | Object | No | [Links](./master-data#links) |
| `_objid`, `_dataid`, `_objtype`, `_subtype` | String | Output | Set by the platform |

### Values

Each value in `data` is an object:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `time` | Date or DateTime | The time of the value |
| `value` | Number | The value, or `"NaN"` for a missing value |
| `status` | Object | Optional: the [status](./overview#status) of the value |

Responses for a tracked timeseries also have `"_type": "TimeValue"`, `"_links": {}` and `"allowLinks": true` on each value; you do not need to send them. Fields with no value (for example a timeseries with no `currency`) are left out of the JSON.

For a calendar with a fixed interval you can also send `data` as a list of plain numbers, with the time of the first one in `start`. Each number takes the next time of the calendar.

```json
{
  "_type": "VarTimeSeries",
  "calendar": "BUSINESS",
  "start": "2026-11-16",
  "data": [41.85, 42.10, 41.95, 42.60, 43.05]
}
```

A `SPARSE` timeseries must use value objects.

### Example

```json
{
  "_id": "NGE.GAS.TTF:SPOT",
  "_type": "VarTimeSeries",
  "start": "2026-11-16",
  "calendar": "BUSINESS",
  "observed": "end",
  "currency": "EUR",
  "units": "MWH",
  "name": "TTF day-ahead",
  "description": "Northgate TTF day-ahead index",
  "precision": {"roundingMode": "HALF_UP", "scale": 6, "useDefault": true, "store": false},
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "_links": {},
  "_status": {},
  "_checks": [],
  "_dataid": "SPOT",
  "_objid": "NGE.GAS.TTF",
  "_objtype": "#Object",
  "_identity": {"ETRM": "GAS_TTF_DA", "RISK": "TTF-DA-IDX"},
  "data": [
    {"time": "2026-11-16", "value": 41.85, "status": {}, "_type": "TimeValue", "_links": {}, "allowLinks": true},
    {"time": "2026-11-17", "value": 42.10, "status": {}, "_type": "TimeValue", "_links": {}, "allowLinks": true},
    {"time": "2026-11-18", "value": "NaN", "status": {"quality": "FAILED:missing"}, "_type": "TimeValue", "_links": {}, "allowLinks": true}
  ],
  "_oid": "NGE.GAS.TTF:SPOT",
  "_version": 12,
  "_user": "priya.shah@northgate-energy.com",
  "_timestamp": "2026-11-18T18:05:44.120",
  "_tag": []
}
```

---

## Smart timeseries

A smart timeseries calculates its values from a base timeseries (and optionally other inputs) with an expression. It has the descriptive fields of a timeseries (`name`, `description`, `currency`, `units`, `timezone`, `precision`, `properties`) and:

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarSmartTimeSeries` |
| `baseTimeSeries` | Reference or String | Yes | The timeseries it is built on: a [reference](./master-data#reference), or a data id |
| `expression` | String | Yes | The ODSL expression, for example `BASE * 1.1` |
| `script` | String | No | A script whose functions the expression can use |
| `calendar` | String | No | Convert the result to this calendar |
| `properties` | Object | No | Other inputs. A string that is a data id (it contains a colon) is turned into a reference to that data |

```json
{
  "_id": "SPOT_GBP",
  "_type": "VarSmartTimeSeries",
  "name": "TTF day-ahead in GBP",
  "currency": "GBP",
  "units": "THM",
  "baseTimeSeries": {
    "_type": "VarReference",
    "_service": "data",
    "_source": "private",
    "_oid": "NGE.GAS.TTF:SPOT"
  },
  "expression": "BASE * FX",
  "properties": {
    "FX": {
      "_type": "VarReference",
      "_service": "data",
      "_source": "public",
      "_oid": "#ECB_FX.EURGBP:SPOT"
    }
  }
}
```

See [Smart Data](/docs/extensions/smart-data/overview) for building smart timeseries and curves.

---

## Event timeseries

An event timeseries takes one property of the events in an event list as its values.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarEventTimeSeries` |
| `event` | String | Yes | The event list, as `objectid:eventlist` |
| `property` | String | Yes | The event property used as the value |
| `filter` | String | No | A filter on the events, for example `{'side': 'ASK'}` |
| `index` | String | No | The event date used as the time: `eventtime`, `eventstart` or `eventend` |
| `calendar` | String | No | The calendar, defaults to `SPARSE` |

```json
{
  "_id": "FILL_PRICE",
  "_type": "VarEventTimeSeries",
  "event": "NGE.TRADES:FILLS",
  "property": "price",
  "filter": "{'product': 'TTF'}"
}
```

---

## Metric timeseries

A metric timeseries totals or averages platform usage metrics into a timeseries.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarMetricTimeSeries` |
| `provider` | String | Yes | The metric provider, for example `ODSLRequest` or `ODSLProcess` |
| `metric` | String | Yes | The metric name, for example `ReadRequests` |
| `filter` | String | No | A filter on the metrics |
| `calendar` | String | No | The calendar to aggregate to, for example `#PT1H` |
| `observed` | String | No | How to aggregate: `summed`, `averaged`, `high`, `low`, `beginning` or `end` |

```json
{
  "_id": "PROCESS_RUNS_HOURLY",
  "_type": "VarMetricTimeSeries",
  "provider": "ODSLProcess",
  "metric": "RunRequests",
  "calendar": "#PT1H",
  "observed": "summed"
}
```

See the [Metric service](/docs/api/rest/service/metric) for the providers and metrics.

---

## Composed timeseries

A composed timeseries is one element of a [composition report](/docs/extensions/composer/overview), saved so it can be read like any other timeseries.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarComposedTimeSeries` |
| `composition` | String | Yes | The id of the composition |
| `element` | String | Yes | The element (column) of the composition |
| `name`, `description` | String | No | Descriptive fields |
| `properties` | Object | No | Your own properties |

```json
{
  "_id": "SPARK_SPREAD",
  "_type": "VarComposedTimeSeries",
  "composition": "NGE_SPARK_SPREADS",
  "element": "spread",
  "name": "German clean spark spread"
}
```
