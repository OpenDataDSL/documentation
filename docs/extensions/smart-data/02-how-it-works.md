---
title: How smart data works
description: The parts of a smart curve or smart timeseries, the base, inputs and their ondate options, the expression and its functions, scripts, conversion and building
slug: /extensions/smart-data/how-it-works
sidebar_position: 2
tags: [extension, smart data, smart curve, smart timeseries, expression, inputs, conversion]
---

# How smart data works

A smart curve or smart timeseries is a recipe rather than stored numbers: take this base, these inputs, apply this expression. The platform follows the recipe whenever the result is read, and for smart curves it also stores the result for each ondate, so it is quick to read and keeps its history. This page explains each part of the recipe.

---

## Smart curves and smart timeseries

| | Smart curve | Smart timeseries |
|-|-|-|
| Built from | A base **curve** | A base **timeseries** |
| Calculated | For each ondate, contract by contract (tenor by tenor) | Date by date |
| Its dates | The ondates of the base curve | The dates of the base timeseries, or of a calendar you choose |
| Inputs | Curves, timeseries and values | Timeseries and values |
| Building | Built for each ondate and stored, as you choose (see [Building smart curves](/docs/extensions/smart-data/building)) | No build settings: the platform keeps a build automation for it |
| Example | `BASE - GAS / EFFICIENCY - CARBON * EMISSION_FACTOR / EFFICIENCY` | `BASE * FX` |

Northgate's `NGE_SPREADS:CLEAN_SPARK_DE` is a smart curve: for every ondate of the German power curve `NGE.POWER.DE:BASE` it takes each contract (the next day, the balance of the month, November, the first quarter of 2027 and so on), and takes off the cost of the gas and carbon a gas plant needs to make that power. `NGE_FX:POWER_DE_DA_USD` is a smart timeseries: the German day-ahead power price in dollars, the euro price multiplied by the ECB EUR/USD rate of the same day.

---

## The base

The base is the curve or timeseries the smart data is calculated from. In the expression it is always called `BASE`.

- For a smart curve, the base gives the ondates it can be built for and the contracts of each ondate. The result has the base's contracts: an input that has no value for a contract leaves that contract out.
- For a smart timeseries, the base gives the dates. Choose a **Calendar** (for example `BUSINESS`) to use another calendar instead.

The base can be any curve or timeseries you can read: private, public (ids starting with `#`) or another smart curve.

---

## Inputs

Inputs are the other data the expression uses, each with a name. There are three kinds:

| Kind | What it is | Example |
|-|-|-|
| **Curve** | Another forward curve, for the same ondate as the base (smart curves only) | `GAS` is `NGE.GAS.TTF:MID` |
| **Timeseries** | A timeseries. In a smart curve its value for the ondate being built is used, the same for every contract. In a smart timeseries the value of the same date is used | `FX` is `#ECB_FX.EURUSD:SPOT` |
| **Value** | A number or a text, such as an efficiency or a factor | `EFFICIENCY` is `0.49` |

Keep numbers such as an efficiency as value inputs rather than writing them in the expression: they can then be changed without editing the expression, and every change shows up by name in the audit trail.

Names are case sensitive and are usually written in capitals. When you rename an input, it is renamed in the expression too.

### Which curve of an input is used

A curve input has an **Ondate** option: which of its curves is used when the smart curve is built for an ondate.

| Ondate option | Which curve of the input is used |
|-|-|
| **Same ondate** (the default) | The input's curve for the ondate being built. There is no result for an ondate the input has no curve for. |
| **Latest on or before the ondate** | The curve for the ondate being built, or the latest one before it. Use it for an input that is not updated every day. |
| **Latest before the ondate** | The latest curve before the ondate being built, that is the previous curve, for example for a day-on-day change |
| **Latest on or before, by absolute period** | The latest curve on or before the ondate, moved to the ondate being built: contracts keep their absolute period (`2026M11`) and any that have expired are dropped |

---

## The expression

The expression is an ODSL formula. It can use:

- `BASE` and the input names;
- the arithmetic operators `+ - * /` and brackets;
- built-in functions, for example `bootstrapCurve`, `shape`, `combine` and `extendCurve` for curves, or `sma`, `shift`, `diff`, `pct`, `scale` and `fill` for timeseries;
- the members of a curve or timeseries, written after a name and a dot, such as `BASE.currency` or `FX.getLast(date)`;
- the functions of the smart data's script, if it has one (see [Scripts](/docs/extensions/smart-data/scripts)).

For a smart curve the expression is worked out contract by contract: in `BASE - GAS / EFFICIENCY` each contract of the base has the gas price of the same contract taken off. For a smart timeseries it is worked out date by date, and functions such as `sma(BASE, 20)` work on the whole timeseries.

The editor suggests the names and functions as you type, shows the parameters of the function you are in, and warns about unknown names and unbalanced brackets. These are warnings: the preview is the real check, because it is the platform that builds the result.

:::tip
The [ODSL reference for smart curves](/docs/odsl/variable/smartcurve) and [for smart timeseries](/docs/odsl/variable/smarttimeseries) describes the same objects from a script's point of view.
:::

---

## Scripts

When a calculation does not fit in one expression, write it as a function in an ODSL script and call it from the expression, for example `cleanSpark(BASE, GAS, CARBON, EFFICIENCY, EMISSION_FACTOR)`. The **Script** list offers the scripts in the category `curve-build` (smart curves) or `timeseries-build` (smart timeseries), private and public, and you can type any other script id or create a new one with **New script**. A smart timeseries without a script can still use the functions of the public script `#TimeSeriesScript`. The public script `#CurveScript` has curve functions such as `timespread`, `interpolate` and `hourly`.

---

## Conversion

The **Conversion** card sets what the result is in, and how the inputs are converted to it before the expression runs.

| Field | What it does |
|-|-|
| **FX provider** | The FX rates used to convert currencies, public or private. Empty: your company's default provider |
| **Currency** | The currency of the result. Inputs in another currency are converted to it |
| **Units** | The units of the result. Inputs in other units are converted to them |
| **Timezone** | The timezone of the result. Empty: the base's own timezone. `Etc/UTC` for UTC |
| **Precision** and **Rounding mode** | The number of decimal places the result is rounded to, and how |
| **Density**, **Time factor**, **Heat rate** | Kept with the result and used when it is later converted to other units, for example in Composer or Excel |
| **Custom unit** and **Custom unit factor** | A unit of your own with its factor, kept with the result for later conversions |

---

## Classification

**Category**, **Commodity**, **Market**, **Product** and **Priority** describe the smart data so it can be found and grouped in the list. They do not change the result. Smart data in the category `ODSL` is made by OpenDataDSL and is hidden from the list unless you ask for it.

---

## Building and storing

A smart curve can be calculated each time it is read, or built once for each ondate and stored. **Build and store it** chooses when:

| Option | What happens |
|-|-|
| **When its inputs are updated** (the default) | The platform builds it for an ondate as soon as its base and inputs for that ondate are updated, and stores it |
| **The first time it is read** | It is built and stored the first time someone reads it for an ondate |
| **On a schedule** | It is built on a cron schedule, such as `0 18 * * MON-FRI` |
| **Never: always calculated when read** | Nothing is stored; it is calculated every time |
| **Built and saved by an external app** | Another application builds and saves it |

[Building smart curves](/docs/extensions/smart-data/building) explains how to build the past ondates of a new curve. Smart timeseries have no build settings: the platform keeps a build automation for each one.

---

## Where smart data is stored

Smart data is stored as a data item on a private master data record, with the id `RECORD:ID`: `NGE_SPREADS:CLEAN_SPARK_DE` is the item `CLEAN_SPARK_DE` on the record `NGE_SPREADS`. You can keep it:

- in a **smart data area**, a record made for smart data (type `smart_data_area`, with an owner and a team), such as Northgate's `NGE_SPREADS`;
- on the master data record it belongs with, such as `NGE.POWER.DE:OFFPEAK` next to `NGE.POWER.DE:BASE` and `NGE.POWER.DE:PEAK`.

---

## Next

[Creating a smart curve](/docs/extensions/smart-data/creating): Priya builds the clean spark spread from a library example.
