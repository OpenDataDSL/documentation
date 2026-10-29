---
title: Smart Data reference
description: How smart curves and smart timeseries are stored, the platform calls the extension makes, permissions, what the extension contains, and troubleshooting
slug: /extensions/smart-data/reference
sidebar_position: 10
tags: [extension, smart data, reference, json, api, troubleshooting]
---

# Smart Data reference

---

## How a smart curve is stored

A smart curve is a data item of type `VarSmartCurve` on a private master data record. The extension saves it with a merge update of the record (`POST object/v1/private`) that has the item as a property, so the record's other properties are not touched. Northgate's clean spark spread is stored as:

```json
{
  "_id": "NGE_SPREADS",
  "CLEAN_SPARK_DE": {
    "_id": "CLEAN_SPARK_DE",
    "_type": "VarSmartCurve",
    "name": "German clean spark spread",
    "description": "German base power less the gas and carbon cost of a gas plant",
    "baseCurve": {"_type": "VarReference", "_service": "data", "_oid": "NGE.POWER.DE:BASE"},
    "expression": "BASE - GAS / EFFICIENCY - CARBON * EMISSION_FACTOR / EFFICIENCY",
    "currency": "EUR",
    "units": "MWh",
    "cacheOptions": {"type": "OnDependencies"},
    "category": "Spreads", "commodity": "Electricity", "market": "DE", "product": "Base", "priority": 1,
    "properties": {
      "_replace": true,
      "GAS": {"_type": "VarReference", "_service": "data", "_oid": "NGE.GAS.TTF:MID"},
      "CARBON": {"_type": "VarReference", "_service": "data", "_oid": "NGE.EUA:SETTLE"},
      "EFFICIENCY": 0.49,
      "EMISSION_FACTOR": 0.202
    }
  }
}
```

| Field | What it is |
|-|-|
| `_id` | The id on the record. The full id is `RECORD:ID`, here `NGE_SPREADS:CLEAN_SPARK_DE` |
| `name`, `description` | The name and description |
| `baseCurve` | The base: a reference to a curve (`_oid`), with `_source` when it was found in public data |
| `expression` | The ODSL expression |
| `script` | The id of the script whose functions the expression uses, when it has one |
| `currency`, `units`, `timezone` | What the result is in; inputs are converted to them |
| `cacheOptions` | `type`: `OnDependencies`, `OnDemand`, `OnSchedule` (with a cron `schedule`), `Never` or `External` |
| `category`, `commodity`, `market`, `product`, `priority` | The classification |
| `precision` | `scale` (decimal places) and `roundingMode`, when set |
| `properties` | The inputs: a reference for a curve or timeseries input, a number or text for a value input. Also the conversion settings `CCY_DATASET` and `CCY_DATASET_SOURCE` (FX provider), `density`, `timefactor`, `heatRate`, `toUnit` and `conversionFactor` |
| `properties._replace` | Sent on updates, so the stored inputs are replaced rather than merged: an input removed in the editor is removed from the stored item |

A curve input with an ondate option has it at the end of its id: `NGE.GAS.TTF:MID:-ONDATE` (latest on or before), `:<ONDATE` (latest before) or `:-ABSOLUTE` (latest by absolute period). A timeseries input of a smart curve has `"_otype": "VarTimeSeries"` on its reference.

Fields the editor does not show, such as `tenor` or `_identity`, are kept as they are when it is saved.

---

## How a smart timeseries is stored

The same, with type `VarSmartTimeSeries`, `baseTimeSeries` instead of `baseCurve`, an optional `calendar`, no `cacheOptions`, and the classification in `properties`:

```json
{
  "_id": "POWER_DE_DA_USD",
  "_type": "VarSmartTimeSeries",
  "name": "German day-ahead power in USD",
  "baseTimeSeries": {"_type": "VarReference", "_service": "data", "_oid": "NGE.POWER.DE.DA:PRICE"},
  "expression": "BASE * FX",
  "currency": "USD",
  "units": "MWh",
  "properties": {
    "_replace": true,
    "FX": {"_type": "VarReference", "_service": "data", "_source": "public", "_oid": "#ECB_FX.EURUSD:SPOT"},
    "category": "Prices", "commodity": "Electricity", "market": "DE", "product": "Day-ahead", "priority": 2
  }
}
```

---

## Smart data areas

A smart data area is a private master data record of type `smart_data_area`, created by the extension when you choose **A new smart data area** while saving.

| Field | What it is |
|-|-|
| `_id` | The record id, such as `NGE_SPREADS` |
| `name` | Its name, such as `Northgate spreads` |
| `owner` | The email of the person who created it |
| `team` | Optional, the team it belongs to |

---

## The platform calls

| What | Call |
|-|-|
| List smart curves or timeseries | `GET data/v1/private` with a `_filter` on `_type` `VarSmartCurve` or `VarSmartTimeSeries` |
| Read one | `GET data/v1/private/RECORD:ID?_raw=true` |
| Preview a smart curve | `GET data/v1/{source}/BASE:ONDATE?expression=...&script=...&currency=...&units=...&GAS=private/NGE.GAS.TTF:MID&__EFFICIENCY=0.49`: a data input is `NAME=source/ID`, a value input `__NAME=value` |
| Preview a smart timeseries | `GET data/v1/{source}/BASE?_range=last(90)&expression=...&FX=public/#ECB_FX.EURUSD:SPOT` |
| Read the saved version | `GET data/v1/private/RECORD:ID:ONDATE` (curve) or `RECORD:ID?_range=...` (timeseries) |
| Build and store a smart curve for an ondate | `GET data/v1/private/RECORD:ID:ONDATE?_run=true` |
| Stored builds | `GET data/v1/private` with `_filter` `{"_smartcurve": "RECORD:ID"}` |
| The ondates it can be built for | `GET data/v1/private/RECORD:ID?_range=between(FROM,TO)` |
| Versions | `GET data/v1/private/RECORD:ID/*` (list) and `.../RECORD:ID/N?_raw=true` (one) |
| What uses it | `GET data/v1/private/RECORD:ID?_function=dependents` |
| Roll back | `DELETE data/v1/private/RECORD:ID` (deletes the current version) |
| Delete completely | `DELETE data/v1/private/RECORD:ID/*` |
| Audit trail | `GET audit/v1/private` with `_filter` `{"service": "data", "key": "RECORD:ID"}` |

The preview and the builds are made by the platform itself, so what you see in the preview is what the saved smart data gives.

---

## Permissions

| What | Needs |
|-|-|
| The Smart Data screen and the Master Data tab | The feature policy `extension.odsl.smart_data` (features `odsl.smart_data.manage` and `odsl.smart_data.master_data`) |
| Saving and deleting | Permission to update the master data record it is stored on, and its data |
| Reading the base and inputs | Read access to that data, private or public |
| The Script tab | The same rights as the Script Manager: **update** on the script to save it, **run** to run or debug it |

---

## What the extension contains

| Item | Id | What it is |
|-|-|-|
| Extension | `odsl.smart_data` | Smart Data, with the icon `magic` |
| View | **Information**, **Smart Data** | Script `odsl.smart_data.manage`, feature `odsl.smart_data.manage` |
| View | **Master Data**, tab **Smart Data** | Script `odsl.smart_data.master_data`, feature `odsl.smart_data.master_data` |
| Scripts | `odsl.smart_data.common`, `odsl.smart_data.workspace`, `odsl.smart_data.code` | The shared parts of both views: the model, preview, library, chart and grid, the workspace, and the Script tab |
| Type | `smart_data_area` | The record type of smart data areas |
| Feature policy | `extension.odsl.smart_data` | Gives access to both views |

Your choices on the screens (the kind shown, the record filter, chart styles, period types, the grid order and date order) are kept in your browser only.

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| The preview shows the base unchanged | The live preview of a smart curve is built on a stored base curve. When the base is itself a smart, event or composed curve, save it and use **Saved, as the platform builds it** |
| `The expression returned no values` | Every contract was missing: the inputs have no tenors in common with the base, have no curve for this ondate, or the expression divides by zero. Check the inputs' **Ondate** option |
| A timeseries input has no value | A timeseries input of a smart curve needs a value for the ondate being built. Its chip in the **Show** row says so and gives the latest value before it |
| `Unknown function` after changing the script | The preview uses the saved script: save the script first |
| A build failed for some ondates | The summary gives the platform's reason, most often an input with no curve for that ondate. Use **Latest on or before the ondate** for an input that is not updated every day |
| The curve did not change for past ondates after a save | Saving does not rebuild stored builds. Use **Build** with **Build them again** |
| Delete is refused | Another smart curve or timeseries uses it: the dialog lists them |
| Smart data made by OpenDataDSL is missing from the list | It is in the category `ODSL`: tick **Show ODSL** |
