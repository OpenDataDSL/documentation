---
title: Options data
description: Defining options built from events, their settings, and reading option chains and single options in ODSL and the REST API
slug: /topics/options/options-data
sidebar_position: 2
tags:
- options
- topics
---
# Options data

This page shows how to define options built from events, what each setting does, and how to read the option chains and single options in ODSL and through the REST API. The examples use the ICE Endex EUA futures options (`ICE.NDEX.EFO:OPTIONS`) read by the fictional Northgate Energy.

---

## Defining the options

Create an [EventOptions](/docs/odsl/variable/eventoptions) with the event list, set any options that differ from the defaults, and save it as a property of an object:

```js
o = EventOptions("ICE.NDEX.EFO:OPTIONS")
o.name = "EUA futures options"
o.source = "common"
o.currency = "EUR"
o.units = "t"

NGE = Object()
NGE.id = "NGE.EUA"
NGE.OPTIONS = o
save NGE
```

Only the definition is saved. The options are built from the events each time you read them, so new or corrected events show straight away.

The defaults suit the ICE options events, so for those you usually only set `source`.

|**Setting**|**Default**|**What it does**|
|-|-|-|
|`event`||The event list with one event per option (set by `EventOptions(eventlist)`)|
|`source`|private (public for # event lists)|Where the events are: `private`, `common` or `public`. Exchange data from OpenDataDSL is in `common`|
|`tenor`|`absolute`|The event property with the tenor (maturity) code. The tenors are grouped by this property|
|`strike`|`STRIKE_PRICE`|The event property with the strike price, a number or a number as text|
|`callPut`|`CONTRACT_TYPE`|The event property that says if the option is a call or a put|
|`callValue`|`C`|The value of `callPut` for a call (`CALL` is also accepted, in any case)|
|`putValue`|`P`|The value of `callPut` for a put (`PUT` is also accepted)|
|`value`|`SETTLEMENT_PRICE`|The main value column, used when a single option timeseries asks for no column|
|`columns`|`SETTLEMENT_PRICE`, `OPTION_VOLATILITY`, `DELTA_FACTOR`, `OPEN_INTEREST`, `TOTAL_VOLUME`|The event properties shown for each call and put. A list, or text with the names separated by commas|
|`filter`||Optional filter (JSON) on the events, for example to use one product of a shared event list|
|`timezone`|UTC|The timezone of the ondates: the events whose event time falls on the date in this timezone make up that ondate|
|`holidayCalendar`||The calendar of single option timeseries (daily when not set)|
|`calendar`||An optional expiry calendar, kept with the ondates|
|`currency`, `units`||The currency and units of the prices|
|`positions` and the `position...` settings||Turn the options into a positions view, see [Traded options](/docs/topics/options/traded-options)|

Any other property you set, such as `o.desk = "Carbon"`, is kept in the options' `properties`.

---

## Reading the option chains for an ondate

Read the options with the ondate on the end of the id. Use `L` for the latest ondate, `L-1` for the one before, or `-YYYY-MM-DD` for the ondate on or before a date:

```js
eua = ${data:"NGE.EUA:OPTIONS:2026-09-16"}
latest = ${data:"NGE.EUA:OPTIONS:L"}
```

The result is an [Options](/docs/odsl/variable/options) variable. Index it by tenor, then by strike:

```js
sep = eua["2026M09"]
print sep.expiry
print sep[85].call.SETTLEMENT_PRICE
print sep[85].put.OPTION_VOLATILITY
print eua["2026M09"][85].call.DELTA_FACTOR
```

A tenor can be given as the tenor property's value, its absolute code or its relative code, so `eua["M00"]` is the same as `eua["2026M09"]` on the 16th September 2026.

:::note
A tenor is indexed by **strike price**, not by position: `sep[85]` is the 85 strike, not the 86th row. Use `sep.strikes[0]` for the first row.
:::

### Going through every option

```js
for t in eua
    for s in t
        print t.tenor + " " + s.strike
        print s.call
        print s.put
    next
next
```

A strike only has the side the exchange published: `s.call` or `s.put` is empty when there is none.

### Useful methods

|**Method**|**Example**|**What you get**|
|-|-|-|
|`tenor(code)`|`eua.tenor("M01")`|A tenor, or null when it is not there|
|`value(tenor, strike, callPut, column)`|`eua.value("2026M09", 85, "C", "OPTION_VOLATILITY")`|One value|
|`count()`|`eua.count()`|The number of options (a call and a put at a strike count as two)|
|`strike(price)`|`sep.strike(85)`|A strike row, or null when it is not there|
|`nearest(price)`|`sep.nearest(86.4)`|The strike row nearest a price, for example the at-the-money strike for the futures price|
|`values(callPut, column)`|`sep.values("C", "OPTION_VOLATILITY")`|One column of the calls or puts as a list in strike order, for a volatility smile|
|`strikePrices()`|`sep.strikePrices()`|The strikes as a list in ascending order|
|`get(callPut, column)`|`sep[85].get("P", "DELTA_FACTOR")`|One value of a strike row|

Lists of strikes can be filtered with a condition, for example the strikes above 82:

```js
above = sep.strikes[strike > 82]
```

:::tip
`strike` is held as exact text (`85`, `87.5`), so `sep.strikes[strike == 85]` works. Printed or joined to text, numbers show the usual six decimals (`87.500000`).
:::

---

## A single option over time

Add the tenor, the strike and `C` or `P` to the id for a daily timeseries of the option's main value, with one value for each ondate. Add a column name to choose another value:

```js
settle = ${data:"NGE.EUA:OPTIONS:2026M09:85:C"}
vol = ${data:"NGE.EUA:OPTIONS:2026M09:85:C:OPTION_VOLATILITY"}
```

If there are several events for the option on an ondate, the one with the latest event time is used. The timeseries uses the `holidayCalendar` when it is set, otherwise a daily calendar, and carries the tenor, strike, call or put and column in its properties. A relative tenor (`M01`) follows the rolling maturity; an absolute tenor (`2026M09`) follows one contract until it expires.

:::note
Asking for a tenor only, such as `NGE.EUA:OPTIONS:2026M09`, is an error: options need a strike and a call or put.
:::

---

## The ondates

Reading the id on its own gives the ondates the options can be built for: the dates with events, in the options' timezone. It works like the dates of a curve, including `_range`:

```js
dates = ${data:"NGE.EUA:OPTIONS"}
```

The list has the type `VarOptionsDates`.

---

## Through the REST API

Options are read through the [Data service](/docs/api/rest/service/data#options) with the same ids:

```js
### The option chains for an ondate
GET https://api.opendatadsl.com/api/data/v1/private/NGE.EUA:OPTIONS:2026-09-16
Authorization: Bearer {{token}}

### The volatility of one option over time
GET https://api.opendatadsl.com/api/data/v1/private/NGE.EUA:OPTIONS:2026M09:85:C:OPTION_VOLATILITY?_range=from(2026-09-01)
Authorization: Bearer {{token}}
```

The options for an ondate come back as JSON with one entry per tenor and one per strike:

```json
{
  "_type": "VarOptions",
  "_id": "NGE.EUA:OPTIONS:2026-09-16",
  "ondate": "2026-09-16",
  "name": "EUA futures options",
  "currency": "EUR",
  "units": "t",
  "value": "SETTLEMENT_PRICE",
  "columns": ["SETTLEMENT_PRICE", "OPTION_VOLATILITY", "DELTA_FACTOR", "OPEN_INTEREST", "TOTAL_VOLUME"],
  "tenors": [
    {
      "tenor": "2026M09",
      "absolute": "2026M09",
      "relative": "M00",
      "start": "2026-09-01",
      "end": "2026-09-30",
      "expiry": "2026-09-23",
      "strikes": [
        {
          "strike": 85,
          "call": {"SETTLEMENT_PRICE": 0.91, "OPTION_VOLATILITY": 22.0791, "DELTA_FACTOR": 0.4662, "OPEN_INTEREST": 3695, "TOTAL_VOLUME": 200},
          "put": {"SETTLEMENT_PRICE": 1.05, "OPTION_VOLATILITY": 22.5, "DELTA_FACTOR": -0.5338, "OPEN_INTEREST": 1200}
        }
      ]
    }
  ],
  "properties": {"event": "ICE.NDEX.EFO:OPTIONS", "modified": "2026-09-16T12:37:21"},
  "_subtype": "VarEventOptions"
}
```

|**Field**|**What it is**|
|-|-|
|`ondate`|The ondate of the options|
|`value`, `columns`|The main value column and the columns of each call and put, in order|
|`tenors`|The tenors in delivery order|
|`tenor`, `absolute`, `relative`|The tenor codes (`tenor` is the value of the tenor property)|
|`start`, `end`|The delivery period (the end is the last day)|
|`expiry`|The expiry date of the options|
|`strikes`|The strikes in ascending order, each with `call` and `put` values; a side with no option is left out, and so is a column with no value (for example an empty volume)|
|`properties.modified`|When the latest event used was saved|

---

## Good to know

* The options for an ondate are built from the events whose event time falls on that date. If an option has several events that day, the latest event time wins.
* Events with no strike, or with a call or put value that is neither the call nor the put value, are left out.
* There is no stored copy of the options and no versions: correct an event and the options change.
* To price options yourself, see the [options pricing functions](/docs/odsl/function/functions-options) (`blackScholesCall`, `blackScholesPut`).

---

## Next

[Traded options](/docs/topics/options/traded-options): read only the options your company holds, with your positions.
