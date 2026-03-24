---
slug: /odsl/dm/identities
sidebar_position: 8
title: Data Identities
description: Map OpenDataDSL data items to the identifiers used by downstream systems
tags:
  - data_management
  - identity
  - integration
  - topics
---

# Data Identities

Data Identities solve the problem of mismatched identifiers between OpenDataDSL and the downstream systems you push data into. Each data item — timeseries, curve, Smart Curve, matrix, or event — can carry a set of named identities that map it to the IDs used by other systems, so the receiving application always gets the reference it expects.

## The Problem

When you push data from OpenDataDSL to a downstream system via an automation, the item's OpenDataDSL ID is unlikely to match the ID that the target system uses. For example:

- OpenDataDSL ID: `ICE.NBP_M.NBP:SETTLE`
- SAP commodity ID: `GAS-UK-NBP-01`
- Internal ETRM ID: `C2`

Without identities, downstream applications must maintain their own mapping tables to translate between OpenDataDSL IDs and their own references — adding complexity and a second source of truth that can drift out of sync.

## The Solution

The `identity` property on any data item holds a simple key-value map of system names to IDs. When the data is delivered to a downstream system via an automation, the identity map travels with it, so the receiving application can look up its own identifier directly from the payload.

```
data item
└── identity
    ├── sap        → "GAS-UK-NBP-01"
    ├── molecule   → "C2"
    └── bloomberg  → "NBPGBP Comdty"
```

The identity property is fully dynamic — you define the system names yourself, and each data item can have as many or as few identities as needed.

---

## Adding Identities

### Smart Curve

```js
sc = SmartCurve("AAA_IDENTITY:CURVE", "BASE*1.1")
sc.identity.molecule = "C2"
sc.identity.sap = "S2"

AAA_IDENTITY = Object()
AAA_IDENTITY.SCURVE = sc
save AAA_IDENTITY
```

### TimeSeries

```js
ts = TimeSeries("BUSINESS")
ts.identity.molecule = "TS-MOL-01"
ts.identity.sap = "GAS-UK-TS-01"

MY_OBJECT = Object()
MY_OBJECT.PRICE = ts
save MY_OBJECT
```

### Curve

```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month")
ondate = CurveDate(Date("2024-01-15"), eombus)

c = Curve(ondate)
c.identity.molecule = "FWD-MOL-01"
c.identity.bloomberg = "NBPGBP Comdty"

MY_OBJECT = Object()
MY_OBJECT.FORWARD = c
save MY_OBJECT
```

### Smart TimeSeries

```js
st = SmartTimeSeries("MY_BASE_TS:PRICE", "BASE*1.05")
st.identity.sap = "DERIVED-SAP-ID"
st.identity.etrm = "ETRM-REF-99"

MY_OBJECT = Object()
MY_OBJECT.DERIVED = st
save MY_OBJECT
```

:::note
The system names you use as keys — `sap`, `molecule`, `bloomberg`, `etrm` — are entirely up to you. Use names that are meaningful to your team and consistent across your data objects.
:::

---

## Reading Identities

You can read back an identity from a saved data item using standard property access:

```js
// Read the full identity map
item = ${data:"MY_OBJECT:SCURVE"}
print item.identity

// Read a specific system's identity
print item.identity.sap
```

---

## Updating Identities

To update or add an identity on an existing data item, retrieve the object, set the new value, and save:

```js
// Add or update a single identity
obj = ${object:"AAA_IDENTITY"}
SCURVE = ${data:"AAA_IDENTITY:SCURVE","_raw=true"}
SCURVE.identity.bloomberg = "NEW-BLOOMBERG-ID"
obj.SCURVE = SCURVE
save obj
```

To remove an identity key, call the remove method:

```js
obj = ${object:"AAA_IDENTITY"}
SCURVE = ${data:"AAA_IDENTITY:SCURVE","_raw=true"}
SCURVE.identity.remove("bloomberg")
obj.SCURVE = SCURVE
save obj
```

---

## Identities in Downstream Delivery

When an automation delivers data to a queue, webhook, or email target, the `identity` map is included in the payload. The receiving system can read its own key directly, with no external mapping table required.

### Example automation payload (JSON)

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

### Reading the identity in a transformer script

When an automation uses a transformer (via the `@transformer` property), the script can access the identity directly:

```js
// item is the delivered data item
sapId = item.identity.sap
print "Delivering to SAP with ID: " + sapId
```

### Reading the identity in a Mustache template

If your automation target uses a Mustache template to format the payload, you can reference identities using standard Mustache syntax:

```html
<p>SAP ID: {{identity.sap}}</p>
<p>Molecule ID: {{identity.molecule}}</p>
```

---

## Multiple Data Items on One Object

A single master data object often holds several data items, each with their own identities. Each identity map is independent — different data items on the same object can map to different downstream IDs:

```js
POWER_PLANT = Object()
POWER_PLANT.name = "Hinkley Point C"

// The forward curve has an ETRM identity
fwd = SmartCurve("EEX.DE_POWER_M:SETTLE", "BASE*1.0")
fwd.identity.etrm = "HPC-FWD-001"
fwd.identity.sap = "PWR-HPC-FWD"
POWER_PLANT.FORWARD_CURVE = fwd

// The generation timeseries has a different ETRM identity
gen = TimeSeries("DAILY")
gen.identity.etrm = "HPC-GEN-TS"
POWER_PLANT.GENERATION = gen

save POWER_PLANT
```

---

## Supported Data Types

The `identity` property is supported on all data item types that can be stored as a property on a master data object:

| Data Type | Supported |
|-|-|
| TimeSeries | ✅ |
| SmartTimeSeries | ✅ |
| EventTimeSeries | ✅ |
| Curve | ✅ |
| SmartCurve | ✅ |
| EventCurve | ✅ |
| CurveSeries | ✅ |
| Matrix | ✅ |

---

## Further Reading

- [Extracting Data](/docs/poc/extracting-data) — overview of all data delivery methods including automations
- [Automation REST service](/docs/api/rest/service/automation) — full automation reference
- [SmartCurve variable reference](/docs/odsl/variable/smartcurve)
- [TimeSeries variable reference](/docs/odsl/variable/timeseries)
