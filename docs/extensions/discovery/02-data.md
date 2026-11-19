---
title: Discover Data
description: "How the data on OpenDataDSL fits together: master data, events, curves, timeseries, reports and automations."
slug: /extensions/discovery/data
sidebar_position: 2
tags: [extension, discovery, data]
---

# Discover Data

**Discover Data** is the first item of the **Data** menu. How the data on OpenDataDSL fits together: master data, events, curves, timeseries, reports and automations.

![Discover Data](/img/extensions/discovery/data.png)

---

## What is on the screen

### 1. Define

The blueprints: what things look like and how time works.

| Part | What it is | Comes with |
|-|-|-|
| **Types** | The blueprint of master data | The platform |
| **Event types** | The blueprint of an event | The platform |
| **Calendars** | Holidays, expiries and deliveries | The platform |

### 2. Describe and capture

The things you track, and what happens to them.

| Part | What it is | Comes with |
|-|-|-|
| **Master data** | The things you track, with their data | The platform |
| **Events** | Things that happened at a point in time | The platform |
| **Event lists** | Where related events are kept | The platform |

### 3. Data

The values held on master data: series, curves, options and matrices.

| Part | What it is | Comes with |
|-|-|-|
| **Timeseries** (timeseries) | Stored values over time | The platform |
| **Smart timeseries** (timeseries) | Calculated from other data | The platform |
| **Event timeseries** (timeseries) | Read from events | The platform |
| **Composed timeseries** (timeseries) | Published from Composer | Composer |
| **Metric timeseries** (timeseries) | Built from platform usage | The platform |
| **Curve** (forward curves) | Stored forward curves by ondate | The platform |
| **Smart curve** (forward curves) | Built by an expression | The platform |
| **Event curve** (forward curves) | Built from events | The platform |
| **Composed curve** (forward curves) | Published from Composer | Composer |
| **Curve series** (forward curves) | A curve kept as a series | The platform |
| **Options** (options) | Option chains by ondate | The platform |
| **Event options** (options) | Option chains from events | The platform |
| **Matrix** (matrices) | Correlations, covariances, statistics | The platform |

### 4. Use and automate

Turn data into reports and react when it changes.

| Part | What it is | Comes with |
|-|-|-|
| **Reports** | Configured views of your data | The platform |
| **Stored reports** | Each run kept by ondate | The platform |
| **Automations** | When this happens, do that | The platform |
| **Automation targets** | What an automation does | The platform |

Click any part to read about it: what it is, how it connects, key facts, where to find it and the guides to read. Parts that come with an extension your company does not have say **Not installed**.

---

## Flows

| Flow | What it shows |
|-|-|
| **Exchange prices to your systems** | How a settlement price from an exchange reaches your trading system, with no one pressing a button. |
| **Broker quotes to a curve** | How individual broker quotes become a forward curve you can report on. |
| **A daily report by email** | How a scheduled report gathers data each morning and lands in people's inboxes. |

---

## Read more

- [Data modelling: types and objects](/docs/odsl/dm/modelling)
- [Loading data using events](/docs/odsl/dm/events)
- The other Discover screens: [Discover Monitor](/docs/extensions/discovery/monitor), [Discover Deliver](/docs/extensions/discovery/deliver), [Discover Build](/docs/extensions/discovery/build), [Discover AI](/docs/extensions/discovery/ai), [Discover Manage](/docs/extensions/discovery/manage)
