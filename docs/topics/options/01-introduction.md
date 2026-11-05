---
title: Introduction to options
description: What options data is in OpenDataDSL and how it is built from events
slug: /topics/options/intro
sidebar_position: 1
tags:
- options
- topics
---
# Introduction to options

This topic explains how OpenDataDSL holds exchange traded options data, and how you read it as option chains, as timeseries of a single option, and filtered to the options your company holds.

---

## What is options data?

An option gives the holder the right, but not the obligation, to buy (a **call**) or sell (a **put**) an underlying future at a set price (the **strike**) up to an expiry date. An exchange settles thousands of them every day: for each maturity (tenor) of the underlying future there is a row of strikes, each with a call and a put.

For each option, the exchange publishes values such as:

|**Value**|**Example property**|**What it is**|
|-|-|-|
|Settlement price|`SETTLEMENT_PRICE`|The official closing price of the option|
|Implied volatility|`OPTION_VOLATILITY`|The volatility that makes the pricing model give the settlement price|
|Delta|`DELTA_FACTOR`|How much the option price moves for a move in the underlying|
|Open interest|`OPEN_INTEREST`|The number of open contracts|
|Volume|`TOTAL_VOLUME`|The number of contracts traded that day|

---

## How options data is stored

Options data is stored as [events](/docs/odsl/variable/event), one event for each ondate, tenor, call or put, and strike. For example, the ICE Endex EUA futures options are in the event list `ICE.NDEX.EFO:OPTIONS` in the common database, and the September 2026 85 call settled on the 16th September 2026 is this event:

```js
{
  _id: 'ICE.NDEX.EFO:OPTIONS:ID_2026M09_85_C_20260916000000',
  eventtime: ISODate('2026-09-16T00:00:00.000Z'),
  eventstart: ISODate('2026-09-01T00:00:00.000Z'),
  eventend: ISODate('2026-09-30T00:00:00.000Z'),
  absolute: '2026M09',
  relative: 'M00',
  expiry: '2026-09-23',
  STRIKE_PRICE: 85,
  CONTRACT_TYPE: 'C',
  SETTLEMENT_PRICE: 0.91,
  OPTION_VOLATILITY: 22.0791,
  DELTA_FACTOR: 0.4662,
  OPEN_INTEREST: 3695,
  TOTAL_VOLUME: 200,
  ...
}
```

The event time is the ondate, `absolute` and `relative` are the tenor, and `STRIKE_PRICE` and `CONTRACT_TYPE` say which option it is.

---

## Options built from events

Rather than storing a copy of the data, you define an [EventOptions](/docs/odsl/variable/eventoptions) data item that says which events to use, in the same way as an [EventCurve](/docs/odsl/variable/eventcurve) builds a forward curve from events. When you read it for an ondate, the options are built from the events of that day:

```js
o = EventOptions("ICE.NDEX.EFO:OPTIONS")
o.source = "common"
NGE = Object()
NGE.id = "NGE.EUA"
NGE.OPTIONS = o
save NGE

eua = ${data:"NGE.EUA:OPTIONS:2026-09-16"}
print eua["2026M09"][85].call.SETTLEMENT_PRICE
```

The result is an [Options](/docs/odsl/variable/options) variable: a list of tenors in delivery order, each with an **option chain**, a table with one row per strike and the call and put values side by side:

|**Strike**|**Call settle**|**Call vol**|**Call delta**|**Put settle**|**Put vol**|**Put delta**|
|-|-|-|-|-|-|-|
|80|5.20|24.10|0.91||||
|85|0.91|22.08|0.4662|1.05|22.50|-0.5338|
|90||||5.00|21.00|-0.95|

A strike only has a call or a put when the exchange published one.

---

## Ways to read options data

|**Id**|**Example**|**What you get**|
|-|-|-|
|options|`NGE.EUA:OPTIONS`|The ondates the options can be built for|
|options:date|`NGE.EUA:OPTIONS:2026-09-16`|The option chains for that ondate|
|options:L|`NGE.EUA:OPTIONS:L`|The latest option chains|
|options:tenor:strike:C or P|`NGE.EUA:OPTIONS:2026M09:85:C`|A timeseries of one option's main value (settlement price), one value per ondate|
|options:tenor:strike:C or P:column|`NGE.EUA:OPTIONS:2026M09:85:C:OPTION_VOLATILITY`|A timeseries of one option's column|

---

## Traded options

Most users do not need the whole exchange: they need the options their company holds. A **positions view** is an EventOptions that also points at your own position events. It returns only the maturities, strikes and sides you hold, with the market values for the ondate plus your position volume and traded price. See [Traded options](/docs/topics/options/traded-options).

---

## Where next

* [Options data](/docs/topics/options/options-data): defining options, the settings, reading them in ODSL and the REST API
* [Traded options](/docs/topics/options/traded-options): uploading positions and reading the options you hold
* [EventOptions variable](/docs/odsl/variable/eventoptions) and [Options variable](/docs/odsl/variable/options)
* [Options data type](/docs/odsl/topics/options)
* [Options pricing functions](/docs/odsl/function/functions-options)
* [Data REST service](/docs/api/rest/service/data#options)
