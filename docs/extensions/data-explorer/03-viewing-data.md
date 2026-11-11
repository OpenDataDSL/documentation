---
title: Looking at data
description: Open a curve, timeseries, matrix or master data record to chart it, compare it with its previous curve or ondate and see what changed
slug: /extensions/data-explorer/viewing-data
sidebar_position: 3
tags: [extension, data explorer, curves, timeseries, matrices, correlation, master data, changes]
---

# Looking at data

Select a result to open it in place. The header shows its name, kind, id, source and its main facts (currency and units, calendar, timezone, the event list it is built from). **Results** goes back to the list as you left it.

| Button | What it does |
|-|-|
| The star | Stars it or unstars it (see [Starred items](/docs/extensions/data-explorer/finding-data#starred-items)) |
| **Add to the board** | Puts a curve or timeseries on the [chart board](/docs/extensions/data-explorer/chart-board) |
| **Add to group** | Adds it to a group or a new group |
| **Add an automation** | Something the platform does when it changes (see [Automations](/docs/extensions/data-explorer/actions#automations)) |
| **More** | What other extensions do with it, **Open its master data** and **Copy the id** |

The tabs depend on what it is: the Data Explorer's own tabs come first, then the tabs other extensions add (their extension is named beside the tab), then **Details**. See [What other extensions add](/docs/extensions/data-explorer/extensions).

---

## Curves

A curve opens on the **Curve** tab with its latest curve compared with the previous one. Priya opens `NGE.POWER.DE:BASE`, the German power base curve:

![The German power base curve against the previous curve](/img/extensions/data-explorer/curve.png)

| Control | What it does |
|-|-|
| **Ondate** | **Latest**, or one of the last 90 ondates |
| **Or a date** | Any date: the curve on that date, or the last one before it |
| **Compare with** | **Nothing**, **The previous curve** (the last curve before this one, so Friday for a Monday), or another ondate |
| **Style** | How each curve is drawn: **Periods** (a flat line over each delivery period), **Line**, **Column**, **Area** or **Points** |
| **Covered periods** | Untick to hide quarters and years whose months are all shown |
| **CSV** | The grid below the chart as a CSV file |

Contracts are drawn over their delivery periods, so months, quarters and years line up on one date axis: the shorter periods are on top and the longer ones thinner and lighter behind them. Periods of a week or less get a marker. Intraday and gas periods are shown in the curve's timezone. The grid lists every contract by period type, with its start, end and length, and a column per curve. Values implied from another tenor (for example months shaped from a quarter) are in italics.

### What changed

When the curve is compared with another, **What changed** below it shows how many contracts were compared, how many went up and down, the average change and the biggest move, a chart of the change of each contract (**Change** or **%**), and a table with both values, the change and the change in percent. Contracts that are new or gone are marked. **CSV** downloads the table.

![What changed in the German power base curve](/img/extensions/data-explorer/changes.png)

:::tip
To watch a curve change every day, put it on the chart board **Against the previous curve**: the board shows its changes too, next to other curves.
:::

---

## Tenor history

**Tenor history** shows how the value of tenors moved from one ondate to the next. The first three tenors of the latest curve are chosen; select tenors to add or remove them, or type another (for example `2027M01`) and select **Add**. Relative tenors such as `M01` and `Q01` roll forward with the ondate; absolute ones such as `2027M01` are one contract. Choose the range above the chart. **Add to the board** puts the chosen tenors on the chart board.

![The history of the front months and next year](/img/extensions/data-explorer/tenor-history.png)

---

## Timeseries

A timeseries opens on **Chart**, with its values over the last year and the table below. Choose **1M** to **5Y**, **All**, or **Dates** for a range of your own, and how it is drawn: **Line**, **Column**, **Area**, **Steps** or **Points**. **CSV** downloads the values.

---

## Matrices

A matrix (a `VarMatrix`) is a table of numbers with labels down the side and across the top, kept for each ondate as a curve is. It is usually a correlation or covariance matrix, but it can be any table of statistics. A matrix opens on the **Matrix** tab with its latest ondate.

The line above the table says how big it is and what it looks like: **a correlation matrix** when it is symmetric with ones on the diagonal, **a covariance matrix** when it is symmetric with variances on the diagonal, otherwise **a table**. Hover over a cell for its row and column. A value the matrix does not have (stored as `NaN`) is left empty. When the matrix has a precision, its values are shown to that many decimal places.

| Choice | What it does |
|-|-|
| **Ondate** | The matrix of another ondate; **Latest** is the newest |
| **Compare with** | **The previous ondate** or any other: the table shows the change in each value, and **The biggest changes** lists the largest moves with what they were and are now |
| **Show** | For a covariance matrix: **As correlations** divides each covariance by the two standard deviations |
| **Colours** | How the cells are coloured. **Automatic** colours a correlation matrix from -1 to 1, changes centred on nought, a statistics table each column on its own, and anything else from its lowest to its highest value; **No colours** turns it off |
| **Lower half only** | For a symmetric matrix: hides the half above the diagonal, which repeats the half below |
| **CSV** | Downloads what is shown, with the labels: the values, or the changes when comparing |

Priya opens `NGE.RISK:CORRELATION`, the correlations of the hub prices, with the lower half only:

![The hub price correlations](/img/extensions/data-explorer/matrix-correlation.png)

She compares it with the previous ondate. The correlation of German power with TTF fell the most:

![The changes in the correlations since the previous ondate](/img/extensions/data-explorer/matrix-changes.png)

A statistics table is not square: here each hub has a row and each statistic a column, so each column is coloured on its own. FR BASE has no skew:

![A table of statistics for each hub](/img/extensions/data-explorer/matrix-statistics.png)

---

## Master data

A master data record opens on **Overview**: its data on the left (select one to open it, or **Chart them** to put its curves and timeseries on the chart board) and its properties and tags on the right. Select a tag to find everything with that tag.

![The TTF record with the tabs and actions other extensions add](/img/extensions/data-explorer/record.png)

---

## Details

**Details** lists the item's properties and shows it as it is stored, as JSON, with **Copy**.

---

## Next

[Options](/docs/extensions/data-explorer/options)
