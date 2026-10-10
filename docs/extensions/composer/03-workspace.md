---
title: The workspace
description: Columns, expressions, worksheet properties, conversion and display settings of a composition
slug: /extensions/composer/workspace
sidebar_position: 3
tags: [extension, composer, composition, expressions]
---

# The workspace

Opening a composition shows its data: the toolbar, the chart and the table. Everything else is edited in the **side panel**, which slides out from the right when you select **Columns** or **Properties**, or a column heading or chart series. On a wide screen the data moves left so you can see it while you edit.

The side panel has these tabs:

| Tab | What it edits |
|-|-|
| **Columns** | The list of columns, then one column at a time |
| **Properties** | The name, where it is stored, the worksheet settings, report settings, meta data, conversion defaults, scripts, automation and builds |
| **Inputs** | Templates only: the inputs the template asks for (see [Templates](/docs/extensions/composer/templates)) |
| **JSON** | The configuration that is saved, and the response of the last run |

Edits mark the data as out of date. Select **Run**, or close the panel, to see them. Nothing is saved until you select **Save**.

---

## Running a composition

Choose an **Ondate** and select **Run** to calculate the composition for that date. A curve composition starts at the previous weekday, the latest settled curves; a timeseries composition starts at today.

When you open a saved composition, or pick another ondate, and it has already been [built](/docs/extensions/composer/builds-and-automation) for that ondate, Composer shows the stored build straight away instead of calculating it. The line under the toolbar says so, and when the build was made. **Run** always calculates it again now.

**More**, **Export CSV** downloads what is shown.

---

## The columns list

The **Columns** tab lists the columns in order, each with its colour, caption, id and what it is calculated from. You can:

- Move a column up or down, or remove it
- Select a column to edit it
- **Add data column**, **Add expression column** or **Add linked column**
- On the Master Data screen, add one of the record's curves or timeseries in one click

Removing a column that an expression uses asks first.

---

## Data columns

A data column shows a curve or a timeseries from the platform. Start typing part of its id to search.

| Setting | |
|-|-|
| **Caption** | The column heading in the table and the series name in the chart |
| **Id** | The name used for this column in expressions, such as `BRENT`. Letters, digits and underscores, starting with a letter. Renaming it updates the expressions that use it. |
| **Curve**, or **Timeseries or curve** | The data id |

On a **curve** worksheet, every data column is a curve, read for the composition's ondate.

On a **timeseries** worksheet, the search lists both timeseries and curves:

- Choose a **timeseries** to show it as it is.
- Choose a **curve** and Composer switches **Source** to **Curve tenor** and asks for the **Tenor**, such as `M01` or `GM01`. The column shows that tenor of the curve as a timeseries, for example the front month each day. The tenor list is filled with the tenors of the curve's latest contracts.

You can also type a curve tenor in full, for example `ICIS.ESGM.NL.TTF.ASS.FUT:MID:GM01`; Composer splits it into the curve and its tenor.

On a timeseries worksheet, **Observed** says how the values are combined or spread out to the worksheet's calendar: `beginning`, `end`, `averaged`, `summed`, `high`, `low` or `delta`. Leave it empty to use the worksheet's setting, or the timeseries' own.

---

## Expression columns

An expression column is calculated with an ODSL expression from the columns before it, for example:

```js
POWER - GAS / 0.49 - CARBON * 0.202 / 0.49
```

You can use the ids of the other columns, numbers, `+ - * /` and brackets, and ODSL functions.

As you type, suggestions appear (press **Ctrl+Space** to see them all):

- the ids of the other columns,
- the functions in the scripts chosen under **Properties**, **Scripts**,
- the built-in functions that work on the worksheet: those for curves on a curve worksheet, those for timeseries on a timeseries worksheet.

Use the up and down keys to choose, and **Enter** or **Tab** to insert. A function is inserted with its opening bracket. Inside a function call, its signature is shown with the current argument highlighted and described. The chips under the field insert column ids too.

:::tip
To use a function of your own, add the script that defines it under **Properties**, **Scripts**. Its functions then appear in the suggestions.
:::

---

## Linked columns

A linked column shows a column of another saved composition of the same type. Choose the **Composition**, then the **Column**. It is stored as `COMPOSITION/COLUMN`, for example `OIL_ANALYTICS:COLIN_HARTLEY_BRENT_WTI/SPREAD`.

A linked column reads the other composition's **stored build** for the same ondate, so build that composition for the ondates you run this one for. If it has not been built for the ondate, the column shows an error saying so. On a timeseries worksheet, only the dates within this composition's range are used, aligned to this calendar.

Linked columns can be used in expressions like any other column. See [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation).

---

## Display

Each column has display settings:

| Setting | |
|-|-|
| **Table and Excel grid**, **Chart**, **Excel** | Where the column appears. Hide a working column that only feeds an expression. |
| **Chart type** | line, spline, area, areaspline, column, scatter or step |
| **Line style** | Solid, Dash, Dot and others |
| **Axis** | 1 (left) or 2 (right), for example a spread on axis 2 under two prices on axis 1 |
| **Colour** | The series colour |

---

## Conversion

Values can be converted to another currency or unit. Settings cascade: a **column**'s setting is used first, then the **worksheet**'s (Properties, **Conversion defaults**), then the curve or timeseries' own.

| Setting | |
|-|-|
| **FX provider** | The exchange rates to use for currency conversion; empty for your organisation's default |
| **Currency** | Convert to this currency, for example `EUR` |
| **Units** | Convert to these units, for example `MWH` or `BBL` |
| **Timezone** | Convert to this timezone |
| **Precision** | The number of decimal places |
| **Rounding mode** | How values are rounded, `HALF_UP` unless set |
| **Density**, **Time factor**, **Heat rate** | Conversion factors, for example a density to convert tonnes of a product to barrels |
| **Custom unit factors** | A factor for a unit of your own, for example therm |

---

## Properties

| Section | Settings |
|-|-|
| Name and description | Shown in the list, the portal and Excel |
| **Stored in** | The master data record it is stored on, with **Move to...**, and the template it was created from |
| **Worksheet** | **Type** (curve or timeseries) and how it is shown in the portal. For a curve worksheet: a fixed **Ondate** (blank for the report's ondate), and the **tenor types** to show and how many of each, for example 12 months, 4 quarters and 2 years. For a timeseries worksheet: the **Calendar** (for example `#REOD` or `MONTHLY`) and the **Range**. |
| **Report** | Enabled, hide in the report list, hide in Excel, Excel output |
| **Meta data** | Owner, team, stage (dev, test, production), commodity, product and location, used to find and filter compositions |
| **Conversion defaults** | The worksheet's conversion settings, inherited by the columns |
| **Scripts** | Scripts whose functions the expressions use. Composer lists your platform's build scripts for the worksheet type (category `curve-build` or `timeseries-build`, private and public), each with the functions it defines, and you can add any other script by id. |
| **Automation** | Whether it is built automatically when its inputs change, and what triggers it (see [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation)) |
| **Builds** | How many ondates it has been built for, the first and the latest, the composed curves made from it, and **Build for a range of ondates** |

The **Range** of a timeseries worksheet is relative to the ondate:

| Range | Dates |
|-|-|
| `last(31)` | The 31 days up to the ondate |
| `from(2026-01-01)` | From that date to the ondate |
| `between(2026-01-01, 2026-06-30)` | Between two dates |
| `within(...)` | Within a date or period |
| empty | The 31 days up to the ondate |

---

## Other actions

From **More** in the toolbar:

| Action | |
|-|-|
| **Ask Fusion AI to change it** | Describe a change; Fusion shows it as a difference for you to apply (see [Designing with Fusion AI](/docs/extensions/composer/fusion-ai)) |
| **Export CSV** | Download the table |
| **Clone** | Save a copy under a new name |
| **Move to...** | Store it on another analytics area or record |
| **Save as template** | Make a template from it in My templates |
| **Delete** | Remove it from the record it is stored on |
