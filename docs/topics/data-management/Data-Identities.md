---
slug: /odsl/dm/identities
sidebar_position: 8
title: Data Identities 🆕
description: Map OpenDataDSL data items to the identifiers used by downstream systems
tags:
- data_management
- identity
- integration
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Data Identities

## The Problem

When you push data from OpenDataDSL to a downstream system via a queue, webhook, or subscription, the item's OpenDataDSL ID is unlikely to match the ID that the target system uses. For example:

- OpenDataDSL ID: `ICE.NBP_M.NBP:SETTLE`
- SAP commodity ID: `GAS-UK-NBP-01`
- Internal ETRM ID: `C2`

Without identities, downstream applications must maintain their own mapping tables to translate between OpenDataDSL IDs and their own references — adding complexity and a second source of truth that can drift out of sync.

## The Solution

The `identity` property on any data item holds a simple key-value map of system names to IDs. When the data is delivered to a downstream system, the identity map travels with it, so the receiving application can look up its own identifier directly from the payload.

```
data item
└── identity
    ├── sap        → "GAS-UK-NBP-01"
    ├── molecule   → "C2"
    └── bloomberg  → "NBPGBP Comdty"
```

The identity property is fully dynamic — you define the system names yourself, and each data item can have as many or as few identities as needed.

---

## Supported Types

Identities can be added to the following data item types:

| Type | Description |
|------|-------------|
| `TimeSeries` | Regular time series |
| `SmartTimeSeries` | Derived / calculated time series |
| `Curve` | Forward curve |
| `SmartCurve` | Derived / calculated forward curve |
| `CurveSeries` | Series of curves |
| `EventTimeSeries` | Time series of events |
| `EventCurve` | Curve of events |

---

## Adding Identities

### Smart Curve

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
sc = SmartCurve("AAA_IDENTITY:CURVE", "BASE*1.1")
sc.identity.molecule = "C2"
sc.identity.sap = "S2"

AAA_IDENTITY = Object()
AAA_IDENTITY.SCURVE = sc
save AAA_IDENTITY
```

</TabItem>
<TabItem value="rest" label="REST">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "AAA_IDENTITY",
  "SCURVE": {
    "_type": "VarSmartCurve",
    "expression": "BASE*1.1",
    "input": "AAA_IDENTITY:CURVE",
    "_identity": {
      "molecule": "C2",
      "sap": "S2"
    }
  }
}
```

</TabItem>
</Tabs>

### TimeSeries

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ts = TimeSeries("BUSINESS")
ts.identity.molecule = "TS-MOL-01"
ts.identity.sap = "GAS-UK-TS-01"

MY_OBJECT = Object()
MY_OBJECT.PRICE = ts
save MY_OBJECT
```

</TabItem>
<TabItem value="rest" label="REST">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MY_OBJECT",
  "PRICE": {
    "_type": "VarTimeSeries",
    "calendar": "BUSINESS",
    "_identity": {
      "molecule": "TS-MOL-01",
      "sap": "GAS-UK-TS-01"
    }
  }
}
```

</TabItem>
</Tabs>

### Curve

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ondate = CurveDate(Date("2026-03-02"), "#REOMHENG")
c = Curve(ondate)
c.add("M01", 1.4)
c.add("M02", 2.2)
c.add("M03", 3.3)
c.identity.molecule = "C1"
c.identity.sap = "S1"

AAA_IDENTITY = Object()
AAA_IDENTITY.FORWARD = c
save AAA_IDENTITY
```

</TabItem>
<TabItem value="rest" label="REST">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "AAA_IDENTITY",
  "FORWARD": {
    "_type": "VarCurve",
    "ondate": {
      "curveDate": "2024-01-15",
      "expiryCalendar": "#REOMHENG"
    },
    "contracts": [
      {"tenor": "M01", "value": 1.4},
      {"tenor": "M02", "value": 2.2},
      {"tenor": "M03", "value": 3.3}
    ],    
    "_identity": {
      "molecule": "FWD-MOL-01",
      "bloomberg": "NBPGBP Comdty"
    }
  }
}
```

</TabItem>
</Tabs>

### Smart TimeSeries

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
st = SmartTimeSeries("MY_BASE_TS:PRICE", "BASE*1.05")
st.identity.sap = "DERIVED-SAP-ID"
st.identity.etrm = "ETRM-REF-99"

MY_OBJECT = Object()
MY_OBJECT.DERIVED = st
save MY_OBJECT
```

</TabItem>
<TabItem value="rest" label="REST">

```json
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MY_OBJECT",
  "DERIVED": {
    "_type": "VarSmartTimeSeries",
    "input": "MY_BASE_TS:PRICE",
    "expression": "BASE*1.05",
    "_identity": {
      "sap": "DERIVED-SAP-ID",
      "etrm": "ETRM-REF-99"
    }
  }
}
```

</TabItem>
</Tabs>

:::note
The system names you use as keys — `sap`, `molecule`, `bloomberg`, `etrm` — are entirely up to you. Use names that are meaningful to your team and consistent across your data objects.
:::

---

## Reading Identities

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
// Read the full identity map
item = ${data:"MY_OBJECT:SCURVE"}
print item.identity

// Read a specific system's identity
print item.identity.sap
```

</TabItem>
<TabItem value="rest" label="REST">

```js
// Read the full data item — identity is included in the response
GET https://api.opendatadsl.com/api/data/v1/private/MY_OBJECT:SCURVE
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

---

## Searching Using an Identity

You can search for data items by matching against an identity value using the `find` command:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ts = find ${data} where _identity.molecule="C1"
```

</TabItem>
<TabItem value="rest" label="REST">

```js
GET https://api.opendatadsl.com/api/data/v1/private?_filter={"_identity.molecule":"C1"}
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

This returns all data items where the `molecule` identity key equals `"C1"`, regardless of their OpenDataDSL ID. This is particularly useful when you know the downstream system's identifier but not the native OpenDataDSL path.

---

## Retrieving a TimeSeries by Identity

You can retrieve a time series directly using an identity value as the lookup key:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ts1 = ${data:"private.identity.molecule"/"test"}
```

</TabItem>
<TabItem value="rest" label="REST">

```js
GET https://api.opendatadsl.com/api/data/v1/private.identity.molecule/test
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

The path format is `"private.identity.<key>"/"<value>"`, where:
- `<key>` is the identity system name (e.g. `molecule`, `sap`)
- `<value>` is the identifier you are looking up

---

## Retrieving a Curve by Identity

You can retrieve a curve using an identity value, with an optional `_ondate` parameter to specify the curve date:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
c1a = ${data:"private.identity.molecule"/"C1","_ondate=2026-03-02"}
```

</TabItem>
<TabItem value="rest" label="REST">

```js
GET https://api.opendatadsl.com/api/data/v1/private.identity.molecule/C1?_ondate=2026-03-02
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

The same `"private.identity.<key>"/"<value>"` path format applies. Add `_ondate=<date>` to retrieve the curve as of a specific date.

---

## Updating Identities


<Tabs>
<TabItem value="odsl" label="ODSL">

To update or add an identity on an existing data item, fetch the raw data item, set the new value, and save it back:

```js
// Fetch the data item with raw flag to preserve identity data
obj = ${object:"AAA_IDENTITY", "_raw=true"}

// Add or update a single identity
obj.SCURVE.identity.bloomberg = "NEW-BLOOMBERG-ID"
save obj
```

</TabItem>
<TabItem value="rest" label="REST">

To add/update an identity key, use the `identity` function with the `PUT` action:

```json
PUT https://api.opendatadsl.com/api/data/v1/private?_function=identity
Authorization: Bearer {{token}}

{
  "action":"PUT",
  "data": [
      "_id":"AAA_IDENTITY:SCURVE",
      "bloomberg":"NEW-BLOOMBERG-ID"  
  ]
}
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="odsl" label="ODSL">

To remove an identity key, use the `.remove()` method:

```js
obj = ${object:"AAA_IDENTITY", "_raw=true"}
obj.SCURVE.identity.remove("bloomberg")
save obj
```

</TabItem>
<TabItem value="rest" label="REST">

To remove an identity key, use the `identity` function with the `DELETE` action:

```json
PUT https://api.opendatadsl.com/api/data/v1/private?_function=identity
Authorization: Bearer {{token}}

{
  "action":"DELETE",
  "_id": ["AAA_IDENTITY:SCURVE"],
  "identity":["bloomberg"]
}
```

</TabItem>
</Tabs>

---

## Identities in Downstream Delivery

When a subscription delivers data to a queue, webhook, or script target, the `_identity` map is included in the message payload. The receiving system can read its own key directly, with no external mapping table required.

### Example queue message payload (JSON)

```json
{
  "_id": "AAA_IDENTITY:SCURVE",
  "_type": "VarSmartCurve",
  "expression": "BASE*1.1",
  "_identity": {
    "molecule": "C2",
    "sap": "S2"
  }
}
```

### Reading the identity in a receiving script

If your subscription uses a Script target, you can access the identity directly:

```js
// input.data contains the delivered data item
item = input.data
sapId = item.identity.sap
print "Delivering to SAP with ID: " + sapId
```

### Reading the identity in a Mustache template

If your subscription uses an Email, Webhook, or Queue target with a Mustache template, reference identities using standard Mustache syntax:

```html
<p>SAP ID: {{identity.sap}}</p>
<p>Molecule ID: {{identity.molecule}}</p>
```

---

## Multiple Data Items on One Object

A single master data object often holds several data items, each with their own identities:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
MY_OBJECT = Object()

ts = TimeSeries("BUSINESS")
ts.identity.molecule = "TS-MOL-01"
ts.identity.sap = "GAS-UK-TS-01"
MY_OBJECT.PRICE = ts

c = Curve(ondate)
c.identity.molecule = "FWD-MOL-01"
c.identity.bloomberg = "NBPGBP Comdty"
MY_OBJECT.FORWARD = c

save MY_OBJECT
```

</TabItem>
<TabItem value="rest" label="REST">

```json
PUT https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
  "_id": "MY_OBJECT",
  "PRICE": {
    "_type": "VarTimeSeries",
    "calendar": "BUSINESS",
    "_identity": {
      "molecule": "TS-MOL-01",
      "sap": "GAS-UK-TS-01"
    }
  },
  "FORWARD": {
    "_type": "VarCurve",
    "ondate": "2024-01-15",
    "_identity": {
      "molecule": "FWD-MOL-01",
      "bloomberg": "NBPGBP Comdty"
    }
  }
}
```

</TabItem>
</Tabs>

Each data item carries its own independent identity map, so downstream systems receiving either item can resolve their own identifier without any additional configuration.


## Further Reading

- [Extracting Data](/docs/poc/extracting-data) — overview of all data delivery methods including automations
- [Automation REST service](/docs/api/rest/service/automation) — full automation reference
- [SmartCurve variable reference](/docs/odsl/variable/smartcurve)
- [TimeSeries variable reference](/docs/odsl/variable/timeseries)
