---
title: The workspace
description: Columns, expressions, worksheet properties, conversion and display settings of a composition
slug: /extensions/composer/workspace
sidebar_position: 3
tags: [extension, composer, composition, expressions]
---

# The workspace

Opening a composition shows its data: the toolbar, the chart and the table. Everything else is edited in the **side panel**, which slides out from the right when you select **Columns**, **Properties** or **Indicators**, or a column heading or chart series. On a wide screen the data moves left so you can see it while you edit.

![The workspace, with a column open in the side panel](/img/extensions/composer/composer-workspace.png)

The side panel has these tabs:

| Tab | What it edits |
|-|-|
| **Columns** | The list of columns, then one column at a time |
| **Properties** | The name, where it is stored, the worksheet settings, report settings, meta data, conversion defaults, scripts, automation and builds |
| **Indicators** | Trend lines, levels and averages drawn on the chart (see [Chart indicators](#chart-indicators)) |
| **Inputs** | Templates only: the inputs the template asks for (see [Templates](/docs/extensions/composer/templates)) |
| **JSON** | The configuration that is saved, and the response of the last run |

Edits mark the data as out of date. Select **Run**, or close the panel, to see them. Nothing is saved until you select **Save**, and you can undo any change until then (see [Undo and redo](#undo-and-redo)).

---

## Undo and redo

**Undo** and **Redo**, beside **Save** in the toolbar, step back through your changes and forward again. Every change to a composition or template can be undone: adding, removing, moving or editing a column, the properties, the layout, the inputs of a template, and a change made by Fusion AI.

| Keys | |
|-|-|
| **Ctrl+Z** | Undo |
| **Ctrl+Y** or **Ctrl+Shift+Z** | Redo |

- Typing in a field is one step, not one step per letter. While the cursor is in a text field, Ctrl+Z undoes your typing in that field as usual; click outside the field to undo whole changes.
- Undoing back to the version you last saved clears **Unsaved changes**, and saving keeps the history, so you can still undo past a save.
- Making a new change after undoing drops the changes you could have redone.
- With the side panel closed, the data is shown again after each undo or redo; with it open, select **Run**.
- The history is kept while the composition is open, up to the last 100 changes, and starts again when you open it.

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

A data column shows a curve or a timeseries from the platform. Start typing part of its id for suggestions, or select **Find** to look it up by its dimensions.

### Finding data

**Find** opens the data finder, which works the same way as finding data in the portal:

1. Choose **Public** or **Private** data, and, on a timeseries worksheet, whether to look for curves, timeseries or both.
2. Select **Filter by...** and choose a dimension, such as **source**. Its values are listed, for example `ICE` and `EEX`. Pick one or more.
3. Add another dimension, such as **location**, and pick `Germany`. Each dimension only lists the values that are left after the filters before it, and the list shows the data that matches all of them.
4. Narrow it further by typing part of the id in **Id contains**.
5. To check the data before you use it, select the eye at the end of a row. For a curve it shows the latest curve, on today or the most recent date before it, with each tenor and its value. For a timeseries it shows the last 10 values. Select it again to close it.
6. Click a row, or **Use this** in the preview, to use it.

The list shows the currency and units of each curve and timeseries next to its name and kind.

When there are too many matches to count, the finder says **More than** the number shown so far; select the next page to see more, or add a filter to narrow it down.

The dimensions are the ones defined on the types of the master data, such as source, commodity, product and location. Remove a value with the cross on its chip, or select **Clear filters** to start again. Composer remembers your filters for the next time you open the finder.

Curve and timeseries inputs, when you use a template, have a **Find** button too.

### Data column settings

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

:::note
On a curve worksheet the rows are lined up by tenor. Gas curves often use tenors that start with **G**, such as `GM01` for gas month 01, and these line up with the same tenor of other curves: `GM01` with `M01`, `GD01` with `D01`, `GQ01` with `Q01`, and so on for weeks, seasons, years and balance of month. A power curve and a gas curve therefore share the rows `M01`, `M02`, and so on.
:::

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
| **Table and Excel grid**, **Chart**, **Excel** | Where the column appears: the table, the chart, and the Excel Add-in (see [Compositions in Excel](#compositions-in-excel)). Hide a working column that only feeds an expression. |
| **Chart type** | line, spline, area, areaspline, column, scatter or step |
| **Line style** | Solid, Dash, Dot and others |
| **Axis** | 1 (left) or 2 (right), for example a spread on axis 2 under two prices on axis 1. Each axis is labelled with the currency and units of the columns on it, such as EUR/MWh |
| **Draw order** | Normal draws the columns in their order, so later columns are on top. Choose **Behind the other columns** to put a column at the back, for example an area or columns behind price lines, or **In front of the other columns** to bring it forward |
| **Colour** | The series colour |

---

## Chart indicators

Indicators are lines drawn on the chart: a trend line or a level you draw yourself, or an indicator calculated from a column, such as a moving average, Bollinger bands, a VaR envelope or an oscillator like RSI or MACD. They are saved with the composition and shown in the portal too. They only add to the chart: the data, the table and Excel are unchanged.

Select **Indicators** in the toolbar to open them in the side panel.

![A 20-day moving average, a trend line and a resistance level on a timeseries composition](/img/extensions/composer/composer-indicators.png)

| Indicator | How to add it |
|-|-|
| **Trend line** | Select **Draw trend line**, then drag on the chart from its start to its end, or click its start and then its end. Each click snaps to the nearest tenor or date. The line carries on to the end of the chart unless you clear **Extend to the end of the chart**. |
| **Level** | Select **Draw level**, then click the chart at the price, for example a support or resistance level. |
| **Calculated indicators** | Choose one from **Add an indicator...**, then choose the column and its settings, such as the period, the number of points. |

The calculated indicators are drawn on the chart, on the axis of their column, or in a pane of their own below it:

| Indicator | Where | What it shows |
|-|-|-|
| **Moving average** | On the chart | The average of the last points of a column. |
| **Exponential moving average** | On the chart | As a moving average, weighted towards the latest values. |
| **Bollinger bands** | On the chart | A moving average with bands a number of standard deviations above and below it. |
| **Donchian channel** | On the chart | The highest and lowest value over the period, and the middle of the two. |
| **Parabolic SAR** | On the chart | Dots that trail the trend and change side when it reverses. |
| **VaR envelope** | On the chart | The range each value was expected to stay within at a confidence level, such as 95%, from the value a horizon earlier and the volatility of the changes over the window before it. Red dots mark the values outside it. |
| **Linear regression** | On the chart | The straight line that best fits a column. |
| **Relative strength index (RSI)** | Below the chart | Momentum from 0 to 100. Above 70 is often read as overbought, below 30 as oversold. |
| **MACD** | Below the chart | The fast exponential moving average less the slow one, its signal line, and a histogram of the difference. |
| **Stochastic oscillator** | Below the chart | Where the value sits in its range over the period, from 0 to 100, and its average. |
| **Momentum** | Below the chart | The change in the column over the period. |

![Parabolic SAR and a 95% VaR envelope on the chart, with RSI and MACD in panes below it](/img/extensions/composer/composer-oscillators.png)

Each indicator below the chart gets a pane of its own, and the chart grows to make room. A composition holds one value per tenor or date, with no high, low or open, so the Parabolic SAR, the Donchian channel and the stochastic oscillator use the highest and lowest values of the column itself. The VaR envelope works in the units of the column, so it also suits spreads that go negative.

The chart does not zoom while you draw. Press **Esc** to stop drawing. Click an indicator in the list, or its line on the chart, to change its label, column, settings, values, axis, line style or colour. **Draw again on the chart** redraws a trend line, and **Pick the level on the chart** moves a level.

### Indicators on later ondates

An indicator is added on the ondate you are looking at. With **Keep on later ondates** ticked, which is the default, it is shown on every later ondate too. So a trend line you draw on yesterday's composition is also on today's, and on every build made from now on. Clear it for an indicator that belongs to one ondate only.

| Ondate shown | Indicator added on 13 October, kept on later ondates | Indicator added on 13 October, this ondate only |
|-|-|-|
| 12 October | Not shown | Not shown |
| 13 October | Shown | Shown |
| 14 October and later | Shown | Not shown |

To remove an indicator inherited from an earlier ondate, choose whether to remove it **from this ondate onwards**, so the earlier builds keep it, or **from every ondate**. The **Ondates** section of an indicator shows when it was **Added on** and, if it was, **Removed from**; you can change both. Indicators not shown on the ondate you are looking at are listed under **Not on this ondate**.

On a curve composition the trend line is anchored to tenors, such as M02 to M06, so on a later ondate it is drawn between the same tenors of that day's curve.

:::note
Save the composition to keep its indicators. Saving indicators does not make its stored builds out of date, and changing them does not need a **Run**. A template keeps the indicators shown when it is saved, and compositions made from it show them on every ondate.
:::

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
| **Worksheet** | **Type** (curve or timeseries) and how it is shown in the portal. For a curve worksheet: a fixed **Ondate** (blank for the report's ondate), and the **tenor types** to show and how many of each, for example 12 months, 4 quarters and 2 years. For a timeseries worksheet: the **Calendar** the timeseries are aligned to (**BUSINESS**, business days, when empty; or for example `DAILY`, `HOURLY` or `MONTHLY`, but not an expiry calendar such as `#REOD`) and the **Range**. |
| **Report** | Enabled, hide in the report list, hide in Excel, Excel output |
| **Meta data** | Owner, team, stage (dev, test, production), commodity, product and location, used to find and filter compositions |
| **Conversion defaults** | The worksheet's conversion settings, inherited by the columns |
| **Scripts** | Scripts whose functions the expressions use. Composer lists your platform's build scripts for the worksheet type (category `curve-build` or `timeseries-build`, private and public), each with the functions it defines, and you can add any other script by id. |
| **Automation** | Whether it is built automatically when its inputs change, and what triggers it (see [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation)) |
| **Builds** | How many ondates it has been built for, the first and the latest, the composed curves or timeseries made from it, and **Build for a range of ondates** |

The **Range** of a timeseries worksheet is relative to the ondate:

| Range | Dates |
|-|-|
| `last(31)` | The 31 days up to the ondate |
| `from(2026-01-01)` | From that date to the ondate |
| `between(2026-01-01, 2026-06-30)` | Between two dates |
| `within(...)` | Within a date or period |
| empty | The 31 days up to the ondate |

---

## Compositions in Excel

Every saved composition is a report, so it can be opened in the OpenDataDSL **Excel Add-in** alongside your other reports. Tick **Hide in Excel** under **Properties**, **Report** to leave it out of the Excel list.

In Excel, a composition is a table for the ondate you choose:

- A heading row: **Index**, then the caption of each column.
- A row for each tenor of a curve worksheet, or each date of a timeseries worksheet.
- Only the columns with **Excel** ticked under **Display**. Untick it for working columns, such as the inputs of a spread, to keep just the results.
- Numbers as plain values that Excel can calculate with, dates as `yyyy-mm-dd` (with the time when it is not midnight), and empty cells where a column has no value.

Excel reads the stored builds, so build the ondates you need first (see [Builds, composed curves and automation](/docs/extensions/composer/builds-and-automation)). A composition that is built automatically is ready in Excel as soon as its inputs update.

---

## Other actions

From **More** in the toolbar:

| Action | |
|-|-|
| **Ask Fusion AI to change it** | Describe a change; Fusion shows it as a difference for you to apply (see [Designing with Fusion AI](/docs/extensions/composer/fusion-ai)) |
| **Export CSV** | Download the table |
| **Clone** | Save a copy under a new name |
| **Move to...** | Store it on another analytics area or record. Its builds, report dates and build automation move with it; links to the old id, composed curves made from it and compositions that link to it need updating |
| **Save as template** | Make a template from it in My templates |
| **Delete** | Remove it from the record it is stored on |
