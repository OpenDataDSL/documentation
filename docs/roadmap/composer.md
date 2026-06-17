---
title: Composer
sidebar_position: 1
tags:
- composer
- curve
- timeseries
- composition
---

# Composer

Composer is a powerful OpenDataDSL feature that lets you build structured data tables — called **compositions** — by combining multiple data sources, expressions, and references into a single, unified view.

## What Is a Composition?

A **composition** is a table of data where each column is called an **element**. The table can represent either a set of forward curves or a set of timeseries, giving you a side-by-side view of related data in a single, coherent structure.

Each element in a composition can be one of the following:

| Element Type | `_type` | Description |
|---|---|---|
| **Data** | `CompositionDataElement` | A direct reference to an existing curve or timeseries by its ID |
| **Expression** | `CompositionExpressionElement` | A powerful calculated value derived from other elements using their unique element IDs — see below |
| **Link** | `CompositionLinkElement` | An element sourced from a different composition, allowing compositions to be built on top of one another |

Every element has a **unique element ID** that is used to reference it within expressions. This means you can define one element as a raw data input and then use its ID in a formula-based element, keeping your composition self-contained and easy to maintain.

### Expressions

Expressions are one of the most powerful features in Composer. They can range from something as simple as a spread between two elements:

```
BRENT - WTI
```

All the way through to complex statistical calculations using any of the **hundreds of built-in functions** available in the platform — covering areas such as averaging, interpolation, regression, and curve analytics. If the built-in functions don't cover your needs, you can write **fully custom logic in ODSL code**, giving you complete flexibility to implement any calculation your use case demands.

This makes Composer ideal for building analytical tables such as spread analyses, benchmarks, blended curves, or comparison views — all without duplicating underlying data.

## Report Infrastructure

Under the hood, a composition is stored as a **report**, which means it inherits the full set of standard report capabilities built into the platform:

- **Automation** — compositions can be triggered automatically on a schedule or in response to data events, ensuring they are always up to date
- **Mustache formatting** — report output can be formatted using Mustache templates for downstream consumption
- **Dated reports** — each run of a composition is stored against a date, giving you a historical record of how the composition looked on any given day
- **Multiple versions per day** — multiple versions of a composition can be stored within the same date, supporting intraday snapshots or restatements

This infrastructure means compositions are not just static tables — they are fully managed, versioned, and automatable data products.

## Data Normalisation

Each composition and each individual element can be configured with **conversion options** that control how the underlying data is normalised. When these settings are present, the platform performs automatic conversion so that all elements in the composition are expressed consistently.

The available conversion options are:

| Option | Description |
|---|---|
| `currencyProvider` | The currency provider to use, or `null` to use the default |
| `currency` | The currency to convert to, or `null` to use the default |
| `units` | The units to convert to, or `null` to use the default |
| `timezone` | The timezone to convert to, or `null` to use the default |
| `calendar` | The calendar to use, or `null` to use the default |
| `observed` | The observed convention to use, or `null` to use the default |
| `precision` | The number of decimal places to round to, or `null` to use the default |
| `rounding` | The rounding method to use, or `null` to use the default |
| `fill` | The fill method to use for missing values, or `null` to use the default |

Any option left as `null` simply falls through to the next level in the precedence order, rather than forcing a value.

### Conversion Factors

The `factors` object within `conversion` supplies the inputs needed for certain unit conversions where a simple lookup isn't enough — for example, converting between volume and mass, or between mass and energy. The available factors are:

| Factor | Description |
|---|---|
| `density` | The density to use when converting between volume and mass |
| `timefactor` | The time factor to use when converting between energy and power |
| `heatRate` | The heat rate to use when converting between mass and energy |
| `custom` | A custom factor for conversions not covered by the standard options |

As with the other conversion options, factors can be set at the element or composition level and follow the same precedence order — an element-level factor overrides a composition-level one.

The configuration follows a clear precedence order:

```
Element settings  →  Composition settings  →  Inherent properties of the raw data
```

Element-level settings take highest priority and override the composition-level defaults, which in turn override whatever currency, units, timezone, calendar, or precision is native to the underlying raw data. This means you can define sensible defaults at the composition level — for example, a single calendar or timezone shared by most elements — and selectively override individual options for the elements that need different treatment, such as a single element that should remain in its native currency or use a different rounding method.

## Display Configuration

Every element always appears as a column in the tabular view. Beyond that, elements can be individually configured to control how they appear across the platform's other viewing surfaces:

- **Chart** — control whether an element is plotted, along with element-specific chart configuration such as series type, colour, and axis assignment
- **Excel Add-in** — control whether an element is included when the composition is retrieved in Excel

This per-element display configuration lets you tailor the same composition for different audiences — for example, including a full set of inputs and derived columns in the table while surfacing only the final outputs in a chart.

## ComposedCurve

Any individual element within a composition can be **promoted to a standalone ComposedCurve** in the platform. This turns the element into a first-class forward curve object that can be referenced, automated, and shared like any other curve in the system.

This means you can use a composition as a design surface to build and refine derived curves, then publish the results as standalone platform objects that participate in automations, downstream reports, and further compositions.

## How Compositions Are Created

You can create a composition in four ways:

- **Web Portal** — use the Composer UI to build your composition interactively, adding and configuring elements through a guided interface
- **Fusion AI** — describe what you need in natural language and let the built-in AI assistant create the composition for you
- **ODSL code** — define a composition programmatically using the OpenDataDSL scripting language, giving you full control and the ability to automate creation
- **REST API** — integrate composition creation into external systems and workflows using the platform's REST API

The example below creates a composition with three elements: a day-ahead electricity price (data element), a derived premium (expression element), and a gas price linked from another composition (link element).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="create-composition">
<TabItem value="odsl" label="ODSL" default>

```js
comp = Composition()
comp.id = "IBEX"
comp.composition.options.index = "curve"
comp.composition.options.calendar = "#REOD"

DA = comp.composition.addDataElement()
DA.caption = "DA"
DA.id = "#IBEX.EL.BG.HOURLY.DA:PRICE:-ONDATE"

PREMIUM = comp.composition.addExpressionElement()
PREMIUM.caption = "Premium"
PREMIUM.expression = "DA * 1.1"

GAS = comp.composition.addLinkElement()
GAS.caption = "GAS"
GAS.element = "TEST_COMPOSITION/gas"

save comp
```

</TabItem>
<TabItem value="rest" label="REST API">

```
POST https://api.opendatadsl.com/api/reportconfig/v1
```

```json
{
  "_id": "IBEX",
  "_type": "VarReportConfiguration",
  "reportType": "Composition",
  "template": "#composition-default-template",
  "enabled": false,
  "hideExcel": false,
  "hideList": false,
  "properties": {
    "composition": {
      "elements": [
        {
          "_id": "DA",
          "_type": "CompositionDataElement",
          "caption": "DA",
          "id": "#IBEX.EL.BG.HOURLY.DA:PRICE",
          "options": {
            "conversion": { "factors": {} },
            "display": { "chart": true, "excel": true }
          }
        },
        {
          "_id": "PREMIUM",
          "_type": "CompositionExpressionElement",
          "caption": "Premium",
          "expression": "DA * 1.1",
          "options": {
            "conversion": { "factors": {} },
            "display": { "chart": true, "excel": true }
          }
        },
        {
          "_id": "GAS",
          "_type": "CompositionLinkElement",
          "caption": "GAS",
          "element": "TEST_COMPOSITION/gas",
          "options": {
            "conversion": { "factors": {} },
            "display": { "chart": true, "excel": true }
          }
        }
      ],
      "options": {
        "calendar": "#REOD",
        "conversion": {},
        "display": { "chart": true, "excel": true },
        "index": "curve"
      }
    }
  },
  "tags": [],
  "cacheOptions": { "type": "OnDemand", "store": "private" }
}
```

</TabItem>
</Tabs>

## How Compositions Are Accessed

Once created, a composition can be viewed and consumed through several interfaces:

- **Web Portal** — view and explore compositions in an interactive table format
- **Fusion AI** — ask questions in natural language to read, analyse, and summarise composition data without writing any code
- **Excel Add-in** — retrieve composition data directly into Excel for further analysis
- **ODSL code** — query and work with composition data in scripts
- **REST API** — access composition data programmatically from external applications
- **Cloud Connect** — expose compositions as Parquet files so that BI tools such as Databricks, Snowflake, and others can read them directly

## Viewing a Composition

When a composition is retrieved, it is returned as a `VarReport` containing both the configuration and the evaluated data. The `data` section contains two arrays:

- **`data`** — the rows of the composition table, each identified by a tenor or period ID (e.g. `H01[+02]`, `GM01`) with a value per element column
- **`elements`** — metadata for each element describing its caption, currency, units, and timezone after normalisation

### Retrieving the Configuration

To fetch the report configuration for a composition:

<Tabs groupId="view-composition">
<TabItem value="odsl" label="ODSL" default>

```js
rc = ${reportconfig:"IBEX"}
```

</TabItem>
<TabItem value="rest" label="REST API">

```
GET https://api.opendatadsl.com/api/reportconfig/v1/private/IBEX
```

</TabItem>
</Tabs>

### Running a Composition

To trigger a composition to run and generate a dated report:

<Tabs groupId="run-composition">
<TabItem value="odsl" label="ODSL" default>

```js
run report "IBEX:2026-06-10"
```

</TabItem>
<TabItem value="rest" label="REST API">

```
GET https://api.opendatadsl.com/api/report/v1/private/IBEX:2026-06-10?_run=true
```

</TabItem>
</Tabs>

### Retrieving a Report

To fetch an already-generated report for a specific date:

<Tabs groupId="get-report">
<TabItem value="odsl" label="ODSL" default>

```js
r = ${report:"IBEX:2026-06-10"}
```

</TabItem>
<TabItem value="rest" label="REST API">

```
GET https://api.opendatadsl.com/api/report/v1/private/IBEX:2026-06-10
```

</TabItem>
</Tabs>

The returned report data for the `IBEX` composition on `2026-06-10` looks like the following. Notice how the three elements — `DA`, `PREMIUM`, and `GAS` — use different tenors reflecting the different index types of each element: the DA and PREMIUM elements are hourly curves (`H01[+02]` through `H24[+02]`), while the GAS link element carries forward curve tenors (`GWD`, `GM01`, `GQ01`, etc.):

| Tenor | DA | PREMIUM | GAS |
|---|---|---|---|
| H01[+02] | 100.55 | 110.605 | |
| H02[+02] | 95.59 | 105.149 | |
| H03[+02] | 96.83 | 106.513 | |
| H08[+02] | 265.96 | 292.556 | |
| H19[+02] | 355.79 | 391.369 | |
| H20[+02] | 367.91 | 404.701 | |
| … | … | … | |
| GWD | | | 48.13 |
| GBOM | | | 49.08 |
| GM01 | | | 49.14 |
| GQ01 | | | 49.27 |
| GY02 | | | 37.33 |
| … | | | … |

The element metadata in the response confirms the normalisation that was applied to each element:

| Element | Caption | Currency | Units | Timezone |
|---|---|---|---|---|
| DA | DA | EUR | MWH | Europe/Amsterdam |
| PREMIUM | Premium | | | UTC |
| GAS | GAS | EUR | MWH | Europe/Madrid |

:::note
Each element only populates the columns relevant to its own tenor set. Rows where an element has no value are simply absent from that column, keeping the output clean and sparse rather than filled with nulls.
:::

### Error Handling

If an element fails to load its data or evaluate its expression, the error is reported per element in the `elements` array rather than failing the entire composition. This means a partial result is always returned — any elements that did resolve successfully will still contain their data.

The `error` field on an element describes what went wrong:

```json
"elements": [
  {
    "_id": "DA",
    "caption": "DA",
    "error": "[404] data Not Found:  for date: 2026-06-10",
    "input": "#IBEX.EL.BG.HOURLY.DA:PRICE"
  },
  {
    "_id": "PREMIUM",
    "caption": "Premium",
    "error": "Unable to run expression: DA * 1.1"
  },
  {
    "_id": "GAS",
    "caption": "GAS",
    "currency": "EUR",
    "timezone": "Europe/Madrid",
    "units": "MWH"
  }
]
```

In this example, `DA` failed because no data was found for the requested date. As a consequence, `PREMIUM` also failed because its expression `DA * 1.1` depends on `DA`. The `GAS` link element resolved successfully and its metadata is returned as normal.

:::tip
When troubleshooting a composition, always check the `elements` array first — it will tell you precisely which element failed and why, making it straightforward to identify whether the issue is a missing data source, a bad expression, or a broken link to another composition.
:::

## Why Use Composer?

Composer is designed for situations where you need to:

- **Compare multiple data sources side by side**, such as several price assessments for the same commodity
- **Build derived analytics** — spreads, ratios, blended prices — without writing custom loaders
- **Normalise data automatically** — bring together data in different currencies, units, or timezones and let the platform handle the conversion
- **Centralise related data** into a single structure that is easy to share and consume across the web portal, Excel, and APIs
- **Promote calculated outputs** to standalone ComposedCurve objects that can participate in automations, reports, and downstream processes
- **Feed BI platforms directly** — use Cloud Connect to expose compositions as Parquet files, making them immediately consumable by Databricks, Snowflake, and other analytics tools without any intermediate ETL

:::tip
Because a composition is built on the report infrastructure, it benefits from full automation and versioning out of the box. You can schedule a composition to regenerate whenever its underlying data updates, and retain a complete dated history of every snapshot.
:::

