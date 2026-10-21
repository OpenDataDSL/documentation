---
title: Exporting data
description: Export timeseries, curves and master data from a group, a search or a list of ids as CSV, TSV, Excel, JSON, JSON Lines, XML or HTML
slug: /extensions/export/exporting
sidebar_position: 2
tags: [extension, export, csv, excel, json, xml, timeseries, curve, master data]
---

# Exporting data

An export reads the values of the items you choose in your browser, builds the tables, and downloads them as a file. Nothing is saved on the platform. To run the same export every day, [schedule it](/docs/extensions/export/scheduling).

---

## Open the export

There are two ways in:

| Screen | How to open it | Items |
|-|-|-|
| **Export** app | Open **Groups**, select a group, then **Apps** and **Export** | The group's items. Untick any you want to leave out. |
| **Export data** | **Information**, then **Export data** | Whatever you add on the **Items** tab |

Northgate Energy's market data team opens the group **Gas and power daily** and its **Export** app.

![The Export tab, with the date range, curve, format, layout and file settings](/img/extensions/export/export-tab.png)

---

## What each data type exports

| Type | What is exported |
|-|-|
| TimeSeries, smart timeseries, event timeseries | The values in the date range on the **Export** tab |
| Curves, smart curves, event curves, composed curves | The contracts of the curve for one ondate, the latest curve, or every curve in the date range (up to the number you set, latest first) |
| A curve saved for one ondate, such as `ICE_TTF_FUT:SETTLE:2026-10-16` | That curve's contracts |
| Master data objects | Their properties, one column each. Properties inside another property are named with a dot, such as `properties.country`. |

The type of each item is shown on the **Items** tab. An item whose type cannot be found when the list loads is shown as **Unknown** and is read with the date range: what comes back decides how it is exported.

![The Items tab after a preview: the type, name, currency, units and rows read for each item](/img/extensions/export/items.png)

---

## Add items on the Export data screen

On **Export data** the list starts empty. Use the buttons on the **Items** tab:

| Button | What it adds |
|-|-|
| **Add a group** | The items of any group you can see |
| **Add data** | Timeseries and curves whose id contains the text you search for, private, public or both |
| **Add master data** | Master data objects whose id contains the text |
| **Paste ids** | A list of ids, one per line or separated by commas. Choose whether they are data or master data. |

![Searching for data to add](/img/extensions/export/add-data.png)

Tick the results you want and select **Add ticked**. **Remove ticked** and **Clear** take items out again. The filter box above the table shows only the rows containing every word you type, and **Select the rows shown** ticks or unticks just those rows.

![The Export data screen with two data items and two master data objects](/img/extensions/export/menu-items.png)

---

## Choose the values

| Field | What it does |
|-|-|
| **Date range** | The timeseries values to export: a preset such as **Last 30 days** or **Last month**, **All values**, or **Custom** with your own **From** and **To** |
| **Curves** | **Latest curve**, **Curve for one ondate** (with the **Ondate**), or **Every ondate in the date range** |
| **Most ondates per curve** | With every ondate in the range, only the latest this many curves are read for each curve |

---

## Choose the format

| Format | What you get |
|-|-|
| **CSV** | Comma separated text. The delimiter, dates and decimal separator are set on the **Options** tab. |
| **TSV** | Tab separated text |
| **Excel** | An `.xlsx` workbook with a sheet per table, a frozen header row, filters, and real numbers and dates |
| **JSON** | The rows of the layout, or each item with its values (set on the **Options** tab) |
| **JSON Lines** | One JSON row per line |
| **XML** | Each item with its values: `timeseries` with `value` elements, `curve` with `ondate` and `contract` elements, `object` with `property` elements |
| **HTML** | A page of formatted tables to open in a browser or attach to an email |
| **Template** | The platform renders the whole group with a server export template. Only for a group with every item ticked. The standard templates export timeseries only. |

When a CSV or TSV export has more than one table, for example timeseries and curves in a column per item layout, it downloads as a zip with a file per table. **One file per item, in a zip** gives a separate file for each item in any format.

---

## Choose the layout

| Layout | Columns |
|-|-|
| **One row per value** | `id`, `type`, `ondate`, `index` and `value`. `index` is the time of a timeseries value or the tenor of a curve contract. This layout loads into most systems. |
| **A column per item** | Timeseries by `time` and curves by `ondate` and `tenor`, with a column for each item |
| **A column per ondate** | Curves by item and `tenor`, with a column for each ondate. Timeseries as a column per item. |

Master data is always its own table, with a column per property.

![The preview of the column per item layout](/img/extensions/export/preview-wide.png)

---

## Options

![The Options tab](/img/extensions/export/options.png)

| Option | What it does |
|-|-|
| **CSV delimiter** | Comma, semicolon, pipe or tab |
| **Dates** | `2026-10-31`, `31/10/2026` or `10/31/2026` in CSV, TSV and HTML. Excel shows real dates in the same format. |
| **Decimal comma** | Writes `1,25` instead of `1.25`. Use it with the semicolon delimiter. |
| **Byte order mark, for Excel** | Helps Excel open a CSV with accented characters correctly |
| **Decimal places** | Rounds numbers in every format, or leaves them as stored |
| **Item columns are named by** | The id or the name of each item, in the column layouts |
| **Header row** | Leave it out for systems that do not expect one |
| **Name, currency and units** | Extra columns in the long layout, or an Items table in the column layouts |
| **Other value fields** | Fields such as a value's status or a contract's start and end dates, in the long layout |
| **JSON shape** | **Rows of the layout**, or **Items with their values** |

---

## Preview and download

Select **Preview** to read the values and see each table, and the file text, on the **Preview** tab. **Download** saves the file and **Copy** puts a text format on the clipboard. Changing the format, layout or options rebuilds the file without reading the values again. Changing the items, dates or curve settings reads them again.

Any item that could not be read is shown on the **Items** tab with the platform's reason, and the rest are still exported.

:::tip
Your settings are remembered in your browser, so the next export starts the same way.
:::

---

## The REST calls behind an export

The **API** tab shows the calls the export makes, with your current dates and the first item of each type: timeseries values in a range, the ondates of a curve, a curve for an ondate, a master data object, and the whole group. Use them to fetch the same data from a script or another system. There is also a Python example.

![The API tab](/img/extensions/export/api.png)
