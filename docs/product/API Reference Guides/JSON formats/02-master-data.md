---
title: Master data and types
description: The JSON of master data objects, types, references, links and currency pairs
slug: /api/json/master-data
sidebar_position: 2
tags:
  - api
  - json
  - object
  - type
---

# Master data and types

Master data objects describe the things your data is about: a product, a location, a company, a trade. Each object has a [type](#type) that defines its properties. The data of an object (timeseries, curves, events and so on) is saved with the object and kept in the [Data service](/docs/api/rest/service/data) and the [Event service](/docs/api/rest/service/event).

Service: [Object](/docs/api/rest/service/object) (`object/v1/{source}`). Sources: public, private and common.

---

## Object

An object is a JSON document with an `_id`, a `_type` and any properties you like. Properties defined on its type are checked when you save it.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The object id. Public ids start with `#` |
| `_type` | String | No | The id of the object's type, defaults to `#Object`. Saving an existing object with `#Object` keeps its type |
| `_links` | Object | No | Links to other entities, see [Links](#links) |
| `_access` | String | No | A data role used by security policies |
| (any name) | Any | No | A property: a string, number, boolean, list, object, or a data entity such as a [timeseries](./timeseries) or a [curve](./curves) |

### Saving an object with data

Put each data entity in a property of the object, with its `_type`. The name of the property is the data id: the timeseries below is saved as `NGE.POWER.DE:SPOT` and the curve as `NGE.POWER.DE:BASE:2026-11-18`.

```json
{
  "_id": "NGE.POWER.DE",
  "_type": "#Object",
  "name": "German Power",
  "commodity": "Power",
  "location": "Germany",
  "currency": "EUR",
  "units": "MWH",
  "SPOT": {
    "_type": "VarTimeSeries",
    "calendar": "DAILY",
    "units": "MWH",
    "currency": "EUR",
    "data": [
      {"time": "2026-11-17", "value": 98.42},
      {"time": "2026-11-18", "value": 101.07}
    ]
  },
  "BASE": {
    "_type": "VarCurve",
    "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"},
    "currency": "EUR",
    "units": "MWH",
    "contracts": [
      {"tenor": "M01", "value": 104.25},
      {"tenor": "M02", "value": 109.80},
      {"tenor": "Q01", "value": 101.15}
    ]
  }
}
```

A property that is a list of [events](./events) is saved as an event list.

### Reading an object

When you read the object, each data property is a [reference](#reference) to the data, not the data itself. Read the data with the Data service, or add `_profile=SPOT` to read it through the Object service.

```json
{
  "_id": "NGE.POWER.DE",
  "_type": "#Object",
  "name": "German Power",
  "commodity": "Power",
  "location": "Germany",
  "currency": "EUR",
  "units": "MWH",
  "SPOT": {
    "_type": "VarReference",
    "_service": "data",
    "_source": "private",
    "_oid": "NGE.POWER.DE:SPOT",
    "_otype": "VarTimeSeries"
  },
  "BASE": {
    "_type": "VarReference",
    "_service": "data",
    "_source": "private",
    "_oid": "NGE.POWER.DE:BASE",
    "_otype": "VarCurve"
  },
  "_links": {},
  "_oid": "NGE.POWER.DE",
  "_version": 3,
  "_user": "priya.shah@northgate-energy.com",
  "_timestamp": "2026-11-18T17:42:10.311",
  "_tag": []
}
```

Objects whose type is not versioned have no version fields.

---

## Reference

A reference points at another entity. The platform writes one for each data property of an object, and you can use one anywhere an entity is expected, for example as the base of a smart curve.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_type` | String | Always `VarReference` |
| `_service` | String | The service of the entity, for example `data`, `object` or `event` |
| `_source` | String | `public`, `private` or `common` |
| `_oid` | String | The id of the entity |
| `_otype` | String | The `_type` of the entity, for example `VarCurve` |
| `_version` | Integer | Optional: a version number |
| `_tag` | String | Optional: a version tag, used instead of `_version` |
| `name`, `description` | String | Copied from the entity |
| (any name) | String | Options passed when the reference is read |

---

## Links

`_links` is an object of named references. Each key is the name of the link and each value is a [reference](#reference). Use links to connect an object to related objects, for example a product to its exchange.

```json
"_links": {
  "exchange": {
    "_type": "VarReference",
    "_service": "object",
    "_source": "public",
    "_oid": "#EEX"
  }
}
```

---

## Type

A type defines the properties of objects or events. Service: [Type](/docs/api/rest/service/type) (`type/v1/{source}`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The type id. Public types start with `#` |
| `_type` | String | Yes | Always `Type` |
| `_name` | String | No | The name of the type |
| `_description` | String | No | A description |
| `_extends` | String | No | The id of the type this one extends: it inherits its properties |
| `_versioned` | Boolean | No | Keep versions of objects of this type, defaults to false |
| `_event` | Boolean | No | True for an event type |
| `_mergeEvent` | Boolean | No | For an event type: merge a saved event into the existing event with the same id instead of replacing it |
| `_allowLinks` | Boolean | No | Objects of this type can have `_links` |
| `_showId`, `_showType`, `_showStatus` | Boolean | No | Write `_id`, `_type` and `_status` when an object of this type is written as JSON |
| `_system` | Boolean | No | Set on platform types |
| `_script` | String | No | Base64 encoded ODSL that the type was created from |
| `_editor` | Object | No | Settings for the master data editor |
| (property name) | Object | No | A property of the type, see below |

When you read a type, `_superType` holds the type it extends, in full.

### Type properties

Every other key of a type is a property definition. `_ptype` says what kind of property it is.

| **Field** | **Applies to** | **What it is** |
|-|-|-|
| `_ptype` | All | `Property`, `Expression`, `Method`, `Constraint` or `SmartData` |
| `name` | All | The property name |
| `type` | All | The value type: `String`, `Number`, `Boolean`, `Date`, a dimension, or another type id |
| `displayName` | All | The label shown in screens |
| `description` | All | A description |
| `errorText` | All | An expression that gives the message shown when the value is not valid |
| `qualifier` | Property | A qualifier the type needs, for example a dimension |
| `defaultValue` | Property | An expression that gives the value when none is sent |
| `sortIndex` | Property, Expression | The order of the property in screens |
| `fieldGroup` | Property | A section that groups fields in the editor |
| `bucket` | Property | A bucketing expression used when filtering on this property |
| `notnull` | Property | True if the property must have a value |
| `children` | Property | Child properties, as property definitions by name |
| `expression` | Expression, SmartData | Expression: a Base64 encoded expression that calculates the value. SmartData: the formula of the smart data created on each object |
| `method` | Method | Base64 encoded ODSL of the method |
| `conditions`, `mark`, `qualityCheck` | Constraint | The conditions the object must meet, whether to mark rather than reject failures, and the quality check to record |

```json
{
  "_id": "NGEPowerProduct",
  "_type": "Type",
  "_name": "Northgate power product",
  "_description": "A power product traded by the Northgate desks",
  "_extends": "#Object",
  "_versioned": true,
  "name": {"_ptype": "Property", "name": "name", "type": "String", "displayName": "Name", "sortIndex": 1, "notnull": true},
  "country": {"_ptype": "Property", "name": "country", "type": "String", "displayName": "Country", "sortIndex": 2},
  "peakHours": {"_ptype": "Property", "name": "peakHours", "type": "Number", "displayName": "Peak hours", "defaultValue": "12", "sortIndex": 3}
}
```

---

## Currency pair

A currency pair is a master data object of type `#ForeignExchange`, read through the [Currency service](/docs/api/rest/service/currency) (`currency/v1/{source}`, read-only).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The object id |
| `_type` | String | Always `#ForeignExchange` |
| `base` | String | The base currency code |
| `currency` | String | The quote currency code |
| `source` | String | The code of the currency provider, for example `ECB` |
| `SPOT` and other data | Reference | The rates, as [timeseries](./timeseries) |

```json
{
  "_id": "#ECB_FX.EURGBP",
  "_type": "#ForeignExchange",
  "base": "EUR",
  "currency": "GBP",
  "source": "ECB",
  "SPOT": {
    "_type": "VarReference",
    "_service": "data",
    "_source": "public",
    "_oid": "#ECB_FX.EURGBP:SPOT",
    "_otype": "VarTimeSeries"
  }
}
```
