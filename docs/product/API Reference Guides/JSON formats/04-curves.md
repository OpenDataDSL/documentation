---
title: Curves
description: The JSON of forward curves, contracts, smart, event and composed curves, curve dates and curve management
slug: /api/json/curves
sidebar_position: 4
tags:
  - api
  - json
  - curve
---

# Curves

A forward curve is a set of contracts (tenors) with a value each, for one curve date. You save a curve as a property of a [master data object](./master-data#saving-an-object-with-data) and read it with the [Data service](/docs/api/rest/service/data).

| **Id** | **What you read** |
|-|-|
| `NGE.POWER.DE:BASE:2026-11-18` | The curve for one date (`VarCurve`) |
| `NGE.POWER.DE:BASE` | The list of curve dates (`VarCurveDates`), see [Curve dates](#curve-dates) |

There are four kinds of curve definition:

| **`_type`** | **What it is** |
|-|-|
| `VarCurve` | Contracts and values you load for a curve date |
| `VarSmartCurve` | Calculated from a base curve with an expression |
| `VarEventCurve` | Built from the events of an event list |
| `VarComposedCurve` | An element of a composition |

Smart, event and composed curves are definitions: saving one with `contracts` is refused.

---

## Curve

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarCurve` |
| `_id` | String | No | The data id within the object. When saved in an object, the property name is used |
| `ondate` | Object | Yes | The curve date: `curveDate` (the date) and `expiryCalendar` (the code of the [expiry calendar](./calendars#expiry-calendar) that turns [relative tenors](/docs/odsl/calendar/period-code) into delivery periods) |
| `contracts` | Array | Yes | The contracts, see [Contract](#contract) |
| `name` | String | No | A name |
| `description` | String | No | A description |
| `currency` | String | No | The currency code |
| `units` | String | No | The units code |
| `timezone` | String | No | The timezone of the delivery periods, for example `Europe/Berlin`. It sits beside `ondate`, not inside it |
| `precision` | Object | No | Decimal places and rounding, see [Numbers](./overview#numbers-and-missing-values) |
| `properties` | Object | No | Your own properties |
| `_status` | Object | No | The [status](./overview#status) of the curve |
| `_merge` | Boolean | No | True to merge these contracts into the saved curve for the date instead of replacing it |
| `_substituted` | Boolean | Output | True if the curve was substituted by the curve build cut-off |
| `_identity` | Object | No | External codes, see [Identities](/docs/api/rest/service/data#identities) |
| `_objid`, `_dataid`, `_objtype`, `_subtype` | String | Output | Set by the platform |

### Contract

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `tenor` | String | Yes | The tenor, as a [period code](/docs/odsl/calendar/period-code): a relative code such as `M01`, `Q01`, `Y01`, or an absolute code such as `2026M12` |
| `value` | Number | Yes | The value, or `"NaN"` for a missing value |
| `status` | Object | No | The [status](./overview#status) of the value |
| `properties` | Object | No | Your own properties, for example a vendor contract code |
| `_type` | String | Output | The period type: `Day`, `Week`, `Weekend`, `Month`, `Quarter`, `Season`, `HalfYear`, `Year`, `Balance`, `Custom` and so on |
| `_createdFromTenor` | String | Output | The tenor the contract was sent with, when it was converted |
| `ondate` | Object | Output | The curve date, copied from the curve |

### Example

What you send, inside an object:

```json
{
  "_type": "VarCurve",
  "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"},
  "timezone": "Europe/Berlin",
  "currency": "EUR",
  "units": "MWH",
  "contracts": [
    {"tenor": "M01", "value": 104.25},
    {"tenor": "M02", "value": 109.80},
    {"tenor": "Q01", "value": 101.15},
    {"tenor": "Y01", "value": 88.40}
  ]
}
```

What you read back for `NGE.POWER.DE:BASE:2026-11-18` (two contracts shown):

```json
{
  "_type": "VarCurve",
  "_id": "NGE.POWER.DE:BASE:2026-11-18",
  "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"},
  "currency": "EUR",
  "units": "MWH",
  "timezone": "Europe/Berlin",
  "precision": {"roundingMode": "HALF_UP", "scale": 6, "useDefault": true, "store": false},
  "_status": {},
  "_identity": {},
  "contracts": [
    {
      "tenor": "M01",
      "_createdFromTenor": "M01",
      "_type": "Month",
      "value": 104.25,
      "status": {},
      "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"},
      "properties": {}
    },
    {
      "tenor": "Q01",
      "_createdFromTenor": "Q01",
      "_type": "Quarter",
      "value": 101.15,
      "status": {},
      "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"},
      "properties": {}
    }
  ],
  "properties": {},
  "_objid": "NGE.POWER.DE",
  "_dataid": "BASE",
  "_objtype": "#Object",
  "_oid": "NGE.POWER.DE:BASE:2026-11-18",
  "_version": 1,
  "_user": "priya.shah@northgate-energy.com",
  "_timestamp": "2026-11-18T18:12:03.557",
  "_tag": []
}
```

---

## Curve dates

When a curve is saved for a date, the platform also keeps a timeseries of the dates the curve exists for, under the curve's id without a date. Its values are [references](./master-data#reference) to the curve for each date. You do not save it yourself.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_type` | String | `VarCurveDates` |
| `_id` | String | The curve's data id, for example `NGE.POWER.DE:BASE` |
| `calendar` | String | `DAILY` |
| `expiryCalendar` | String | The expiry calendar of the curve |
| `_subtype` | String | The kind of curve: `VarCurve`, `VarEventCurve`, `VarSmartCurve` |
| `name`, `description`, `timezone`, `precision` | | Copied from the curve |
| `data` | Array | One value per curve date: `time` is the date and `value` a reference to `NGE.POWER.DE:BASE:2026-11-18` |

---

## Curve series

A curve series (`VarCurveSeries`) is a curve held as a timeseries of delivery times, for example quarter-hourly power prices for the next days. It has the fields of a [timeseries](./timeseries#timeseries) plus `ondate`, the curve date, and needs a `calendar`.

```json
{
  "_type": "VarCurveSeries",
  "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOD"},
  "calendar": "#PT15M",
  "timezone": "Europe/Berlin",
  "start": "2026-11-19T00:00:00",
  "data": [96.2, 95.8, 94.9, 94.1]
}
```

---

## Smart curve

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarSmartCurve` |
| `baseCurve` | Reference or String | Yes | The curve it is built on: a [reference](./master-data#reference) or a data id |
| `expression` | String | Yes | The ODSL expression, for example `BASE * 1.1` or `BASE - GAS * 2` |
| `script` | String | No | A script whose functions the expression can use |
| `name`, `description` | String | No | Descriptive fields |
| `currency`, `units` | String | No | The currency and units of the result |
| `timezone` | String | No | Only when it differs from the base curve |
| `category`, `commodity`, `market`, `product` | String | No | Classification used to find and group smart curves |
| `priority` | Integer | No | The build priority: 1 high, 2 medium (the default), 3 low |
| `precision` | Object | No | Decimal places and rounding |
| `properties` | Object | No | Other inputs to the expression. A string that is a data id (it contains a colon) is turned into a reference to that data |
| `cacheOptions` | Object | No | When the curve is built and stored: `type` is `Never`, `OnDemand`, `OnDependencies` (the default), `OnSchedule` or `External`, and `schedule` is the cron schedule for `OnSchedule` |

```json
{
  "_id": "CLEAN_SPARK_DE",
  "_type": "VarSmartCurve",
  "name": "German clean spark spread",
  "category": "Spread",
  "commodity": "Power",
  "currency": "EUR",
  "units": "MWH",
  "baseCurve": {
    "_type": "VarReference",
    "_service": "data",
    "_source": "private",
    "_oid": "NGE.POWER.DE:BASE"
  },
  "expression": "BASE - (GAS / 0.49) - (EUA * 0.37)",
  "properties": {
    "GAS": "NGE.GAS.TTF:MID",
    "EUA": "NGE.EUA:SETTLE"
  },
  "cacheOptions": {"type": "OnDependencies"}
}
```

---

## Event curve

An event curve builds a curve for each date from the events of an event list: one event per contract.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarEventCurve` |
| `event` | String | Yes | The event list, as `objectid:eventlist` |
| `property` | String | Yes | The event property used as the contract value |
| `tenor` | String | No | The event property that holds the tenor [period code](/docs/odsl/calendar/period-code), for example `relative` or `absolute` |
| `calendar` | String | No | The expiry calendar code. Note: not inside an `ondate` object |
| `holidayCalendar` | String | No | The holiday calendar: the dates the curve is published on |
| `filter` | String | No | A filter on the events |
| `source` | String | No | The source of the events |
| `valueTransformation` | String | No | An expression applied to every value, for example `value * 1.1` |
| `name`, `description`, `currency`, `units`, `timezone`, `precision`, `properties` | | No | As for a curve. `properties.include` names event properties copied onto each contract |

```json
{
  "_id": "SETTLE",
  "_type": "VarEventCurve",
  "event": "NGE.GAS.ZTP:EVENTS",
  "property": "SETTLEMENT_PRICE",
  "tenor": "absolute",
  "calendar": "#REOD",
  "timezone": "Europe/Brussels",
  "properties": {"include": "contractCode"}
}
```

---

## Composed curve

A composed curve is one element of a [composition report](/docs/extensions/composer/overview).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarComposedCurve` |
| `composition` | String | Yes | The id of the composition |
| `element` | String | Yes | The element (column) of the composition |
| `name`, `description` | String | No | Descriptive fields |
| `properties` | Object | No | Your own properties |

---

## Curve management

The [Curve service](/docs/api/rest/service/curve) keeps the management information of your curves: their configuration, the result of each day's build, and the groups that control building, quality, approval and export.

### Curve configuration

`curve/v1/info`

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The curve id, for example `NGE.POWER.DE:BASE` |
| `_type` | String | The kind of curve |
| `name`, `description` | String | Copied from the curve |
| `parents`, `children` | String[] | The curves this curve is built from, and the curves built from it |
| `buildGroup` | String | The [build group](#curve-groups) |
| `qualityGroup` | String | The quality group |
| `approvalGroup` | String | The approval group |
| `exportGroups` | String[] | The export groups |
| `tags` | String[] | Your own tags |

### Curve build

`curve/v1/build`, one record per curve per date.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `objectid:curve:date`, for example `NGE.POWER.DE:BASE:2026-11-18` |
| `curve` | String | The curve id |
| `ondate` | String | The curve date |
| `status` | Object | `build`, `quality` and `approval` status, with messages such as `buildMessage` |
| `message` | String | The status message |
| `score` | Integer | 4 no issues, 3 failed checks, 2 substituted, 1 failed, 0 holiday |
| `scoreInfo` | String | About the score |
| `builds` | Object | Each build attempt by id: `status`, `message`, `log` |
| `lastBuildId` | String | The id of the last build attempt |
| `checks` | Object | The quality checks performed |
| `timeline` | String[] | Everything that happened to the build |
| `timestamp` | DateTime | When it last changed |
| `notes`, `tags` | | Your own notes and tags |

```json
{
  "_id": "NGE.POWER.DE:BASE:2026-11-18",
  "builds": {
    "af1b4366-8752-4446-90c5-ca176eccec6f": {
      "log": ["complete"],
      "message": "Built by the Northgate curve engine",
      "status": "built"
    }
  },
  "status": {"build": "built", "buildMessage": "Built by the Northgate curve engine"}
}
```

### Curve groups

`curve/v1/group`. Every group has `type`, `name` and `description`. The other fields depend on the type:

| **`type`** | **Fields** |
|-|-|
| `build` | `cron` (the cut-off), `offset` (days from the cron date to the curve date, 0 or -1), `useLatest` (substitute the latest valid build), `script` (used to build a substitute when `useLatest` is false), `calendar`, `timezone` |
| `quality` | `script` and `checks`, a list of `{name, expression}` |
| `approval` | `approvers` (emails) and `version` (the tag put on an approved curve) |
| `export` | `cron`, `offset`, `script`, `expression` (the function to run, for example `export()`), `calendar` |

```json
{
  "type": "build",
  "name": "NGE_POWER_EOD",
  "description": "Northgate power curves, end of day",
  "cron": "30 18 * * 1-5 * Europe/London",
  "offset": 0,
  "useLatest": true,
  "calendar": "#HENG",
  "timezone": "Europe/London"
}
```
