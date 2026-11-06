---
title: What is Event Data?
description: An introduction to the Event Data extension, one screen to find, view, import and chart events and to build curves, timeseries and option chains from them
slug: /extensions/event-data/overview
sidebar_position: 1
tags: [extension, event data, events, event list, event curve, event timeseries, event options, csv import]
---

# What is Event Data?

A lot of market data arrives as **events**: a broker quote, a trade, a settlement price for one option strike, a meter reading. On the platform they are kept in **event lists**, such as `NGE.POWER.DE:BROKER_QUOTES`, one event per quote. Events are the raw material for curves and timeseries: an **event curve** takes the latest quote for each contract and turns a day's events into a forward curve, an **event timeseries** turns a value on each event into a series over time, and **event options** turn option settlements into an option chain. **Event Data** is the extension for working with all of it, and answers questions like:

- Which event lists do we have for German power, and what is in them?
- Which of the licensed ICE events can we see, and which list holds the TTF options?
- What did our brokers quote for the December contract last week, and how has the mid moved?
- Can I load this spreadsheet of readings as events, without writing a script?
- Can I make a forward curve from our broker quotes, and see what it gives before I save it?
- What does the TTF option chain look like today, strike by strike?

Throughout these pages we follow Northgate Energy, a fictional gas and power trader. Its market data team keeps end of day broker quotes for German power in `NGE.POWER.DE:BROKER_QUOTES`, the daily output of its wind farms in `NGE.WIND.DE:OUTPUT`, and reads the licensed ICE Endex TTF options in `ICE.NDEX.EFO:OPTIONS`. Priya Shah, a market data analyst, uses Event Data to check the quotes, load new readings and build curves from them.

![The German power broker quotes open in Event Data, with the event lists found on the left and the quotes on the right](/img/extensions/event-data/overview.png)

---

## Key ideas

| Idea | What it means |
|-|-|
| **Event** | One record with a time (`eventtime`), an optional start and end (`eventstart`, `eventend`), an id (`eventid`) and any fields of its own, such as `absolute`, `bid`, `ask` and `mid`. |
| **Event list** | The events of one kind, kept as a property of a master data record: `NGE.POWER.DE:BROKER_QUOTES` is the `BROKER_QUOTES` list on the record `NGE.POWER.DE`. |
| **Where the events are** | Events can be private (your own), public, or **common**: the licensed data OpenDataDSL loads for its clients, such as ICE and EEX settlements. The list itself always sits on a private or public master data record, and says where its events are. |
| **Dataset id** | Events loaded from a dataset carry its id in `_dsid`, for example `ICE.NDEX_OPT.EFO` for the ICE Endex TTF options. |
| **Event curve** | A forward curve built on the fly from the events of each day: one contract per tenor, from the value of the latest event for that tenor. |
| **Event timeseries** | A timeseries built from one value of each event, at its start, end or time. |
| **Event options** | An option chain built for each day: for each tenor, a table of strikes with call and put values. |
| **Preview** | What a curve, timeseries or option chain would look like, worked out in the browser from the events before you save it. |

---

## What you get

| Screen | Where | What it is for |
|-|-|-|
| **Event Data** | **Information** menu | Find event lists in private, common and public data, look at their events, import CSV files and build from them. |
| **Event Data** tab | **Master Data** screen | The event lists on the record you are looking at, with the same tools. A CSV file dropped here goes on that record by default. |

Each open list has five tabs:

| Tab | What it shows |
|-|-|
| **Events** | The events, page by page, with filters, a row filter and CSV export. |
| **Chart** | Any number field of the events over time, with a line for each value of another field. |
| **Event curves** | The event curves built from the list: create, change, preview, delete, and the curves the platform builds. |
| **Event timeseries** | The same for event timeseries. |
| **Event options** | The same for option chains. |

---

## Where next

- [Finding event lists](/docs/extensions/event-data/finding-lists): by master data, by dataset id or event fields, and on a master data record.
- [Viewing and charting events](/docs/extensions/event-data/events): filters, paging, CSV export and charts.
- [Importing events from a CSV file](/docs/extensions/event-data/importing): drop a file, map its columns and choose where the events go.
- [Event curves](/docs/extensions/event-data/event-curves): build a forward curve from broker quotes.
- [Event timeseries](/docs/extensions/event-data/event-timeseries): a daily series from wind output readings.
- [Event options](/docs/extensions/event-data/event-options): the TTF option chain from the ICE events.
- [Reference](/docs/extensions/event-data/reference): how things are stored, the platform calls, and troubleshooting.
