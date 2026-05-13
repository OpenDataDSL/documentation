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

Build structured, multi-column tables of curve and timeseries data.

Composer is a powerful OpenDataDSL feature that lets you build structured data tables — called **compositions** — by combining multiple data sources, expressions, and references into a single, unified view.

:::info
Expected date for MVP: Mid June 2026
:::


## What Is a Composition?

A **composition** is a table of data where each column is called an **element**. The table can represent either a set of forward curves or a set of timeseries, giving you a side-by-side view of related data in a single, coherent structure.

Each element in a composition can be one of the following:

| Element Type | Description |
|---|---|
| **Raw data** | A direct reference to an existing curve or timeseries by its ID |
| **Expression** | A powerful calculated value derived from other elements using their unique element IDs — see below |
| **Reference to another composition** | An element sourced from a different composition, allowing compositions to be built on top of one another |

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

Each composition and each individual element can be configured with **currency, units, timezone, precision, and rounding method**. When these settings are present, the platform performs automatic conversion so that all elements in the composition are expressed consistently.

The configuration follows a clear precedence order:

```
Element settings  →  Composition settings  →  Inherent properties of the raw data
```

Element-level settings take highest priority and override the composition-level defaults, which in turn override whatever currency, units, or timezone is native to the underlying raw data. This means you can define sensible defaults at the composition level and selectively override them for individual elements that need different treatment.

## Display Configuration

Elements can be individually configured to control how they appear across the platform's viewing surfaces:

- **Table** — control whether an element appears as a column in the tabular view
- **Chart** — control whether an element is plotted, along with element-specific chart configuration such as series type, colour, and axis assignment
- **Excel Add-in** — control whether an element is included when the composition is retrieved in Excel

This per-element display configuration lets you tailor the same composition for different audiences — for example, showing a full set of inputs and derived columns in the table while surfacing only the final outputs in a chart.

## ComposedCurve

Any individual element within a composition can be **promoted to a standalone ComposedCurve** in the platform. This turns the element into a first-class forward curve object that can be referenced, automated, and shared like any other curve in the system.

This means you can use a composition as a design surface to build and refine derived curves, then publish the results as standalone platform objects that participate in automations, downstream reports, and further compositions.

## How Compositions Are Created

You can create a composition in three ways:

- **Web Portal** — use the Composer UI to build your composition interactively, adding and configuring elements through a guided interface
- **Fusion AI** — describe what you need in natural language and let the built-in AI assistant create the composition for you
- **ODSL code** — define a composition programmatically using the OpenDataDSL scripting language, giving you full control and the ability to automate creation
- **REST API** — integrate composition creation into external systems and workflows using the platform's REST API

## How Compositions Are Accessed

Once created, a composition can be viewed and consumed through several interfaces:

- **Web Portal** — view and explore compositions in an interactive table format
- **Fusion AI** — ask questions in natural language to read, analyse, and summarise composition data without writing any code
- **Excel Add-in** — retrieve composition data directly into Excel for further analysis
- **ODSL code** — query and work with composition data in scripts
- **REST API** — access composition data programmatically from external applications
- **Cloud Connect** — expose compositions as Parquet files so that BI tools such as Databricks, Snowflake, and others can read them directly

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

