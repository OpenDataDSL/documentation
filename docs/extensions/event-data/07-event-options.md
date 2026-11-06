---
title: Event options
description: Build an option chain for each day from option events, such as the licensed ICE Endex TTF options, and view it strike by strike
slug: /extensions/event-data/event-options
sidebar_position: 7
tags: [extension, event data, event options, options, option chain, ice]
---

# Event options

Event options build an **option chain** for each day from option events: for every tenor, a table of strikes with the call and put values side by side. Each event is one option on one day: a tenor, a strike, call or put, and its values, such as settlement price, volatility and delta. See [Options](/docs/topics/options/intro) for how options data works on the platform.

Northgate reads the ICE Endex TTF options from common data, in the list `ICE.NDEX.EFO:OPTIONS` (dataset `ICE.NDEX_OPT.EFO`). Priya has already defined `NGE.GAS.TTF:EFO_OPTIONS` on the TTF gas record.

---

## Defining event options

Open the list and select the **Event options** tab, then **New** (or select a saved one to change it).

| Field | Example | Notes |
|-|-|-|
| **Keep it on the master data record** | `NGE.GAS.TTF` | A private record. The ICE list is in common data, so a record must be chosen. |
| **Tenor field** | `absolute` | The contract of each option, such as `2026M12`. |
| **Strike field** | `STRIKE_PRICE` | |
| **Call or put field** | `CONTRACT_TYPE` | |
| **Call value** and **Put value** | `C`, `P` | The values of that field for calls and puts. `CALL` and `PUT` are also understood. |
| **Main value** | `SETTLEMENT_PRICE` | The value charted against the strike. |
| **Columns** | `SETTLEMENT_PRICE, OPTION_VOLATILITY, DELTA_FACTOR, OPEN_INTEREST` | The fields shown for each call and put, in order. |
| **Holiday calendar**, **Timezone**, **Currency**, **Units** | `EUR`, `MWh` | |
| **Only events where** | | Optional JSON filter on the events. |

The fields are filled in from the list's events when you select **New**: the ICE field names are recognised.

---

## The option chain

When a saved definition is opened, **Built option chain** shows what the platform builds. Choose the **Ondate** and the **Tenor**. The chart plots the main value of the calls and the puts against the strike, and the table below shows the chain: the call columns on the left, the strike in the middle and the put columns on the right.

![The TTF option chain for December 2026 on 5 November](/img/extensions/event-data/options-chain.png)

**CSV (all tenors)** downloads every tenor, strike and side with the columns.

---

## Previewing from the events

**Preview from the events** builds the chain in the browser from one day's events, as for event curves, so a new or changed definition can be checked before it is saved.

![The TTF option chain previewed from the events of 5 November](/img/extensions/event-data/options-preview.png)

:::note
If the preview finds no options, check the tenor, strike and call or put fields, and the call and put values.
:::

---

## Next

[Reference](/docs/extensions/event-data/reference)
