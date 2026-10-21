---
title: What is the Export extension?
description: An introduction to the Export extension, which exports timeseries, curves and master data in the format other systems need, on demand or on a schedule
slug: /extensions/export/overview
sidebar_position: 1
tags: [extension, export, csv, excel, schedule, automation]
---

# What is the Export extension?

Prices and curves rarely stay in one place. A trading system, a risk engine, a spreadsheet or a partner needs them in its own format, usually every day, and usually before someone notices they are missing. **The Export extension** gets your data out of the platform in the shape the other side expects, and keeps doing it on a schedule. It answers questions like:

- Can I get the settlement prices for these ten timeseries as a CSV for last week?
- Can I send this evening's forward curves to our ETRM as JSON, every weekday?
- What happens to the export when one curve is late, and does the receiving system know?
- Can the market data team get the same export as an Excel file, with real dates and numbers?

Throughout these pages we follow Northgate Energy, a fictional gas and power trader. Every weekday evening its market data team sends six items from its group **Gas and power daily** to the ETRM: front month settlement prices for TTF and NBP, the German power base day-ahead price, the EUR/GBP reference rate, the TTF futures curve and the NBP mid curve.

![The Export app on the Groups screen, with the group's six items read and previewed](/img/extensions/export/preview.png)

---

## Key ideas

| Idea | What it means |
|-|-|
| **Items** | What you export: timeseries, curves (including smart, event and composed curves), curves saved for one ondate, and master data objects. They come from a group, a search or a list of ids. |
| **Format** | CSV, TSV, Excel, JSON, JSON Lines, XML or HTML, or a server export template for a whole group. |
| **Layout** | One row per value, a column per item, or a column per ondate for curves. |
| **Schedule** | A process on the platform that runs the export at set times and stores the result as a report for each export date. |
| **Missing data rules** | What a scheduled export does when an item has no data: leave it out, write a blank row, use the latest earlier data, or stop. It can also wait and try again. |
| **Delivery** | An automation on the scheduled export's report: the platform turns each stored report into a file format and sends it to a target, such as an email address, a queue or a webhook. |

---

## What you get

| Screen | Where | What it does |
|-|-|-|
| **Export** app | **Groups**, then a group, then **Apps** | Exports the selected group |
| **Export data** | **Information** menu | Exports anything you add: groups, data found by id, master data and pasted ids |
| **Schedules** tab | Both screens | Lists the scheduled exports and creates, runs and changes them, with their deliveries |
| Export reports | **Reports** | One report per scheduled export, stored for each export date |

---

## Where next

- [Exporting data](/docs/extensions/export/exporting): choose items, a format and a layout, preview and download.
- [Scheduling an export](/docs/extensions/export/scheduling): run the export on the platform every day.
- [Handling missing data](/docs/extensions/export/missing-data): what a scheduled export does when data is late or missing.
- [Delivering exports](/docs/extensions/export/deliveries): send each export by email or to any automation target, in the format you need.
- [Export reference](/docs/extensions/export/reference): where everything is kept, the report data, the output formats and troubleshooting.
