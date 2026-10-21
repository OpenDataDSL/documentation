---
title: Handling missing data
description: What a scheduled export does when an item has no data for its export date, and how it waits for late data
slug: /extensions/export/missing-data
sidebar_position: 4
tags: [extension, export, schedule, missing data, retry, data quality]
---

# Handling missing data

Data arrives late. A broker file is delayed, an exchange publishes after the cut-off, a smart curve waits for one of its inputs. A scheduled export has to decide what to send when that happens, and the receiving system has to be able to tell. The Export extension gives you three settings for this, on the schedule's **Missing data** section.

---

## What counts as missing

| Item | Missing when |
|-|-|
| TimeSeries | No values from the start to the end of its range. With **The export date only**, no value on the export date. |
| Curve, with **The curve for the export date** | No curve for the export date |
| Curve, with **The latest curve on or before the export date** | No curve at all on or before the export date |
| Curve, with **Every curve in the timeseries range** | No curve in the range |
| Curve, with **Tenors** set | None of its curves has a contract in the tenors. The report says so, for example `No contracts in the tenors Q05`. |
| Event list | No events in the range that meet its conditions, unless **No events is normal for this list** is ticked in its [filter](/docs/extensions/export/exporting#filter-the-events) |
| Curve saved for one ondate, master data | The item cannot be read |
| Any item | The platform returns an error, for example the item was deleted or you have no access to it. The report shows the reason. |

Gaps inside a timeseries range are a separate setting: the item has values, but not on every date.

---

## When an item has no data

| Choice | What the export does | Status in the report |
|-|-|-|
| **Leave the item out** | Exports the other items. The report lists the item with the reason. | `missing` or `error` |
| **Write a blank row for it** | Writes one row for the item with an empty value: for a timeseries at the end of its range, for a curve at the export date with no tenor | `missing` |
| **Use the latest earlier data** | For a timeseries, the latest value before the end of its range. For a curve, the latest curve before the export date, cut to the tenors. Only data from the **Look back up to** days before is used. The rows keep the export date and say where the data came from in `from`. Master data and curves saved for one ondate have no earlier data, so they are left out. | `previous`, with `from` |
| **Stop the export** | Stores nothing and sends nothing, and the run of the process fails with the list of items without data | The process run is `failed` |

Northgate Energy's ETRM must have a price for every item every day, so the team uses **Use the latest earlier data** with a look back of 10 days. On 19 October the German power base price and the TTF futures curve were late, so the report used their values of 16 October, the Friday before:

| id | ondate | index | value | status | from |
|-|-|-|-|-|-|
| `EEX_DE:BASE` | | `2026-10-19` | `111.22` | `previous` | `2026-10-16` |
| `ICE_TTF_FUT:SETTLE` | `2026-10-19` | `M01` | `32.011` | `previous` | `2026-10-16` |

The ETRM can see from `status` and `from` which prices are rolled forward.

:::note
An event list is never filled from earlier events: yesterday's trades are not today's. With **Write a blank row for it** or **Use the latest earlier data**, an event list with no events is left out and listed as `missing`. With **Try again later** the run waits for its events like any other item, and with **Stop the export** a missing event list stops the run. For a list where a quiet day is normal, such as broker confirmations on a day with no broker trades, tick **No events is normal for this list** in its filter.
:::

:::caution
**Use the latest earlier data** sends yesterday's numbers as today's. Only use it when the receiving system can handle that, or when it reads `status`. Otherwise prefer **Leave the item out**, or **Stop the export** with an automation on the process failing so someone is told.
:::

---

## Gaps inside a timeseries range

When a schedule exports more than one date of a timeseries, for example **The last days up to the export date**, some dates in the range may have no value. The dates expected are the business days of the schedule's **Calendar**.

| Choice | What happens |
|-|-|
| **Leave the gaps** | Only the values there are exported |
| **Write a blank row for each gap** | A row with an empty value and status `missing` for each date without one |
| **Fill each gap with the previous value** | The value before the gap is repeated, with status `previous` and the date it came from in `from`. A gap at the start of the range stays a gap. |

The item's status in the report is `partial` when gaps were filled, with how many. Gap filling is meant for daily timeseries: intraday values are not expected on calendar dates.

---

## Try again later

A run can wait for late data instead of deciding straight away. Set **Try again later** to every 15 minutes, 30 minutes or an hour, and **Until** to a time in UTC.

When an item has no data, the run checks whether the next try would still be before **Until**. If it would, the run stores nothing and the process is rescheduled. Otherwise the run applies **When an item has no data** and stores the report. Each try is shown in **Recent runs** with status `reschedule` and the message `Trying again in 30 minutes, until 20:00 UTC`.

| Example | Runs |
|-|-|
| Runs at 17:00 UTC, every 30 minutes until 20:00 UTC | 17:00, 17:30, 18:00, 18:30, 19:00, 19:30, and at 20:00 it decides |
| The data arrives at 18:10 UTC | 17:00, 17:30, 18:00, and at 18:30 every item has data and the report is stored |

:::note
**Until** is in UTC. UK time is UTC in winter and an hour ahead in summer, so 20:00 UTC is 20:00 UK time in winter and 21:00 in summer.
:::

A run for an earlier date (**Run for this date**) never tries again: it applies the rules straight away.

---

## Choosing the rules

| Need | Rules |
|-|-|
| The receiver must get every item, and can use the previous day's value | **Use the latest earlier data**, with retries until shortly before the receiver loads |
| The receiver must never get rolled forward prices | **Leave the item out** or **Stop the export**, with retries |
| The receiver expects a fixed set of rows | **Write a blank row for it**, and **Write a blank row for each gap** for ranges |
| Someone has to act when data is missing | **Stop the export**, and an automation on the process failing, for example an email to the data team |
