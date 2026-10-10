---
title: Quick reference
description: The composition format, ids, column types and the REST calls behind Composer
slug: /extensions/composer/reference
sidebar_position: 8
tags: [extension, composer, reference, api]
---

# Quick reference

## Ids

| Item | Stored as | Id |
|-|-|-|
| Library template | Public report configuration, `reportType: CompositionTemplate` | `#CT_<NAME>` |
| Your template | Private report configuration, `reportType: CompositionTemplate` | `CT_<NAME>` |
| Composition | Report configuration (`reportType: Composition`) held on a private master data record | `OBJECTID:KEY` |
| Build of a composition | Report output | `OBJECTID:KEY:ONDATE` |
| Composed curve | `VarComposedCurve` data item on a private master data record | `OBJECTID:DATAID` |
| Analytics area | Master data record of type `analytics_area` | for example `GAS_ANALYTICS` |

---

## Composition format

```json
{
  "_id": "COLIN_HARTLEY_BRENT_WTI",
  "_type": "VarReportConfiguration",
  "reportType": "Composition",
  "name": "Brent WTI",
  "template": "#composition-default-template",
  "enabled": true,
  "cacheOptions": {"type": "OnDemand", "store": "private"},
  "properties": {
    "composition": {
      "meta": {"owner": "colin.hartley@opendatadsl.com", "stage": "dev"},
      "scripts": [],
      "elements": [
        {"_id": "A", "_type": "CompositionDataElement", "caption": "Brent", "id": "ICE.IFEU.B:SETTLE",
         "options": {"display": {"grid": true, "chart": true, "excel": true,
           "chartOptions": {"type": "line", "colour": "#1B4F8A", "style": "Solid", "axis": 1}}}},
        {"_id": "W", "_type": "CompositionLinkElement", "caption": "WTI",
         "element": "OIL_ANALYTICS:COLIN_HARTLEY_WTI_USD/WTI"},
        {"_id": "SPREAD", "_type": "CompositionExpressionElement", "caption": "Spread", "expression": "A - W"}
      ],
      "options": {
        "index": "curve",
        "tenors": [{"type": "Month", "count": 12}, {"type": "Quarter", "count": 4}],
        "conversion": {"currency": "USD"},
        "display": {"layout": "table+chart"}
      },
      "fromTemplate": {"template": "#CT_CURVE_SPREAD", "name": "Curve spread", "revision": 1,
        "values": {"curveA": "ICE.IFEU.B:SETTLE"}}
    }
  }
}
```

A template has the same `properties.composition`, with input placeholders such as `@{input.curveA}`, plus `properties.template` with its `category`, `icon`, `tags`, `featured`, `revision`, `inputs` and, for a copy, `copiedFrom`.

---

## Column types

| `_type` | Field | Value |
|-|-|-|
| `CompositionDataElement` | `id` | A curve or timeseries id. On a timeseries worksheet, `CURVE:TENOR` is one tenor of a curve as a timeseries, for example `ICIS.ESGM.NL.TTF.ASS.FUT:MID:GM01`. |
| `CompositionExpressionElement` | `expression` | An ODSL expression using the ids of earlier columns |
| `CompositionLinkElement` | `element` | `COMPOSITION/COLUMN`, a column of another composition's stored build for the same ondate |

---

## Settings

| Setting | Field |
|-|-|
| Worksheet type | `options.index`: `curve` or `timeseries` |
| Tenor types (curve) | `options.tenors`: a list of `type` and `count` |
| Fixed ondate (curve) | `options.ondate` |
| Calendar and range (timeseries) | `options.calendar`, `options.range` |
| Observed (timeseries) | `options.observed`, or a column's `options.observed` |
| Conversion | `options.conversion` (worksheet) or a column's `options.conversion`: `fx`, `currency`, `units`, `timezone`, `precision`, `rounding`, `factors.density`, `factors.timefactor`, `factors.heatRate` and custom unit factors |
| Chart | a column's `options.display.chartOptions`: `type`, `colour`, `style`, `axis` |
| Portal layout | `options.display.layout`: `table`, `table+chart` or `chart` |
| Automatic builds | `options.autoBuild`: `false` turns the build automation off |
| Scripts | `scripts`: the scripts whose functions the expressions use |
| Meta data | `meta.owner`, `team`, `stage`, `commodity`, `product`, `location` |

---

## REST calls

| Call | What it does |
|-|-|
| `POST report/v1?_test=true&_ondate=2026-10-08` with a composition in the body | Run a composition without saving it (what **Run** does) |
| `GET report/v1/private/OBJECTID:KEY:2026-10-08?_run=true` | Build and store a saved composition for an ondate (what **Build** does) |
| `GET report/v1/private/OBJECTID:KEY:2026-10-08` | Read the stored build for an ondate |
| `GET report/v1/private/OBJECTID:KEY` | The ondates the composition has been built for |
| `GET report/v1/private/OBJECTID:KEY:2026-10-08?_element=SPREAD` | One column of a build, as a curve or a timeseries |
| `GET data/v1/private/OBJECTID:DATAID:2026-10-08` | A composed curve for an ondate |

---

## Automation

| | |
|-|-|
| Build automation | One per composition, kept by the platform when it is saved: target `odsl.composition`, `properties.report` = `OBJECTID:KEY` |
| Triggers | An update of each data item its columns read (`OBJECTID:DATAID`), and a build of each composition it links to |
| What it does | Builds the composition for the ondate of the update, or today when the update has none |
| Composed curves | Their automations run each time a build of their composition is stored |
