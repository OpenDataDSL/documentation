---
slug: /training/technical/options
title: "Module 13: Options and Traded Options"
sidebar_position: 14
tags: [training, options, event-options, positions, odsl]
---

# Module 13: Options and Traded Options

In this module you will add option settlement prices to the `MY.GAS.HUB` training object as events, build **option chains** from those events with **EventOptions**, follow a single option over time, and then upload your own positions and read back only the options you hold.

## Before You Start

You need the training environment and the `MY.GAS.HUB` object from [Module 02](/training/technical/events-odsl), and the forward prices from [Module 06](/training/technical/forward-curves): the options in this module are on the hub's `M01` and `M02` forward months.

## Scenario

Alongside the forward prices, the training hub now settles **options** on its next two delivery months every day. For each month there are calls and puts at three strikes: 80, 85 and 90 pence per therm. Each option settlement is an event that records:

- The ondate (the settlement date) and the delivery tenor
- The strike and whether it is a call (`C`) or a put (`P`)
- The settlement price, the implied volatility and the delta

Your desk holds a few of these options. At the end of the module you will upload those positions and read the options you hold with their market values.

---

## Background: Options Data

An option gives the holder the right to buy (a **call**) or sell (a **put**) the underlying future at the **strike** price up to its expiry. For each delivery month there is an **option chain**: a table with one row per strike and the call and put values side by side.

| Variable | What it is |
|----------|------------|
| `EventOptions` | The definition: which events to use and which event properties hold the tenor, strike, call or put, and values. It stores no values of its own |
| `Options` | The options for one ondate: a list of tenors, each with its option chain |
| `OptionTenor` | One delivery month and its strikes, indexed by strike price |
| `OptionStrike` | One strike, with its `call` and `put` values |

Like an EventCurve, EventOptions are built from the events whenever you read them, so they are always in step with the event data.

---

## Step 1: Define the Option Price Event Type

```js
//#region
use training

OptionPriceType = type extends #Event
    strike as Number()
    callput as String()
    settle as Number()
    vol as Number()
    delta as Number()
end

OptionPriceType.event = true

save ${type:OptionPriceType}
print "Option price type saved"
//#endregion
```

---

## Step 2: Add Option Settlement Events

As in Module 06, `Event(ondate, tenor)` fills in the `eventtime`, `eventstart`, `eventend`, `absolute`, `relative` and `expiry` fields from a curve date and a tenor. The script below adds a call and a put at each of the three strikes, for two delivery months and two dates: 24 events.

The prices follow the forward prices of Module 06 (85 pence for `M01` on the first date, 2 pence more for `M02`, and 1 penny up on the second date), with a call worth the forward price above the strike plus 2 pence of time value, and a put the strike above the forward price plus 2 pence.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}
expcal = ${expiry:"#REOD"}

curveDates = ["2025-03-03", "2025-03-04"]
tenors = ["M01", "M02"]
strikes = [80, 85, 90]

options = []
dayShift = 0
for cd in curveDates
    ondate = CurveDate(cd, expcal)
    i = 0
    for tenor in tenors
        forward = 85 + (i * 2) + dayShift
        for k in strikes
            callValue = forward - k
            if callValue < 0
                callValue = 0
            end
            putValue = k - forward
            if putValue < 0
                putValue = 0
            end
            callDelta = 0.5 + ((forward - k) * 0.04)

            c = Event(ondate, tenor)
            c.id = "OPT-" + format(Date(cd), "yyyyMMdd") + "-" + tenor + "-" + k + "-C"
            c._dsid = "TRAINING.MYGASHUB.OPTIONS"
            c.eventtype = "OptionPriceType"
            c.strike = k
            c.callput = "C"
            c.settle = callValue + 2
            c.vol = 45 + (i * 2)
            c.delta = callDelta
            options.add(c)

            p = Event(ondate, tenor)
            p.id = "OPT-" + format(Date(cd), "yyyyMMdd") + "-" + tenor + "-" + k + "-P"
            p._dsid = "TRAINING.MYGASHUB.OPTIONS"
            p.eventtype = "OptionPriceType"
            p.strike = k
            p.callput = "P"
            p.settle = putValue + 2
            p.vol = 45 + (i * 2)
            p.delta = callDelta - 1
            options.add(p)
        next
        i = i + 1
    next
    dayShift = dayShift + 1
next

hub.OPTIONS_PRICES = options
save hub
print "Saved " + options.size() + " option settlement events"
//#endregion
```

:::tip One Event per Option
Every option needs its own event on each date, so the `id` includes the date, the tenor, the strike and `C` or `P`. Re-running the script updates the same 24 events rather than adding more.
:::

---

## Step 3: Create the EventOptions

`EventOptions` takes the event list. Its defaults suit exchange options events (`STRIKE_PRICE`, `CONTRACT_TYPE`, `SETTLEMENT_PRICE` and so on), so here you tell it which properties the training events use:

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

opts = EventOptions("MY.GAS.HUB:OPTIONS_PRICES")
opts.description = "Options on the training gas hub forward months"
opts.strike = "strike"
opts.callPut = "callput"
opts.value = "settle"
opts.columns = ["settle", "vol", "delta"]

hub.OPTIONS = opts
save hub

print "OPTIONS EventOptions saved"
//#endregion
```

| Setting | Value | What it does |
|---------|-------|--------------|
| `tenor` | `absolute` (the default) | The event property used to group the options into delivery months |
| `strike` | `strike` | The event property with the strike price |
| `callPut` | `callput` | The event property that says call or put; `callValue` and `putValue` default to `C` and `P` |
| `value` | `settle` | The main value, used for single option timeseries |
| `columns` | `settle`, `vol`, `delta` | The values shown for each call and put |

:::note Other Settings
`source` says where the events are (`common` for exchange data from OpenDataDSL), `filter` restricts the events used, and `timezone` sets the timezone of the ondates. See the [EventOptions reference](/docs/odsl/variable/eventoptions).
:::

---

## Step 4: Read the Option Chains

An options data id adds the ondate to the usual `OBJECT_ID:PROPERTY` form, just like a curve:

```js
//#region
use training

chain = ${data:"MY.GAS.HUB:OPTIONS:2025-03-03"}
print "Tenors: " + chain.size() + ", options: " + chain.count()

latest = ${data:"MY.GAS.HUB:OPTIONS:L"}
print latest.ondate

// The dates the options can be built for
print ${data:"MY.GAS.HUB:OPTIONS"}
//#endregion
```

| Data id | What you get |
|---------|--------------|
| `MY.GAS.HUB:OPTIONS` | The ondates the options can be built for |
| `MY.GAS.HUB:OPTIONS:2025-03-03` | The option chains for that date |
| `MY.GAS.HUB:OPTIONS:L` | The latest option chains |
| `MY.GAS.HUB:OPTIONS:M01:85:C` | A timeseries of the `M01` 85 call's settlement price |

---

## Step 5: Work with an Option Chain

Index the options by tenor, then the tenor by **strike price**:

```js
//#region
use training

chain = ${data:"MY.GAS.HUB:OPTIONS:2025-03-03"}

// The front month: by relative or absolute tenor
front = chain["M01"]
print front.absolute + " expires " + front.expiry

// The 85 call and put
print front[85].call.settle
print front[85].put.settle
print chain["M01"][85].call.delta

// Every strike of every tenor
for t in chain
    for s in t
        print t.relative + " " + s.strike + " call " + s.get("C", "settle") + " put " + s.get("P", "settle")
    next
next
//#endregion
```

:::caution Strikes, Not Positions
`front[85]` is the 85 strike, not the 86th row. Use `front.strikes[0]` for the first row.
:::

The tenors and strikes also have methods for analysis:

```js
//#region
use training

chain = ${data:"MY.GAS.HUB:OPTIONS:2025-03-03"}
front = chain["M01"]

// The volatility smile: strikes and call volatilities in strike order
print front.strikePrices()
print front.values("C", "vol")

// The at-the-money strike for a forward price of 86
atm = front.nearest(86)
print atm.strike

// The strikes above 82
above = front.strikes[strike > 82]
print above.size()
//#endregion
```

| Method | Example | Returns |
|--------|---------|---------|
| `tenor(code)` | `chain.tenor("M02")` | A tenor, or null |
| `value(tenor, strike, callPut, column)` | `chain.value("M01", 85, "C", "vol")` | One value |
| `strike(price)` | `front.strike(85)` | A strike row, or null |
| `nearest(price)` | `front.nearest(86)` | The strike row nearest a price |
| `values(callPut, column)` | `front.values("P", "settle")` | One column as a list in strike order |
| `strikePrices()` | `front.strikePrices()` | The strikes as a list |
| `get(callPut, column)` | `front[85].get("P", "delta")` | One value of a strike row |

---

## Step 6: Follow One Option over Time

Add the tenor, strike and `C` or `P` to the id to get a timeseries with one value per ondate. Add a column name for another value:

```js
//#region
use training

settle = ${data:"MY.GAS.HUB:OPTIONS:M01:85:C"}
print settle

vol = ${data:"MY.GAS.HUB:OPTIONS:M02:90:P:vol"}
print vol
//#endregion
```

A relative tenor such as `M01` follows the rolling front month; an absolute tenor follows one contract until it expires.

---

## Step 7: Upload Your Positions

Your desk's positions are events too, in their own event list. Each position event records the tenor, strike, call or put, volume (negative for a short position) and traded price. The **event time is the position date**: all the position events dated on one day make up a **position set**, which holds until a later set is uploaded.

This script records the desk's positions on the 3rd March: two trades in the `M01` 85 call and a short `M02` 90 put. It reads the absolute tenor codes from the option chain, so the positions keep pointing at the same contracts as the months roll on.

```js
//#region
use training

function makeOptionPosition(posdate, ref, tenor, strike, callput, volume, price)
    e = Event(posdate)
    e.id = "POS-" + format(posdate, "yyyyMMdd") + "-" + ref
    e.tenor = tenor
    e.strike = strike
    e.callput = callput
    e.volume = volume
    e.price = price
    makeOptionPosition = e
end

chain = ${data:"MY.GAS.HUB:OPTIONS:2025-03-03"}
m1 = chain["M01"].absolute
m2 = chain["M02"].absolute

d = Date("2025-03-03")
hub = ${object:"MY.GAS.HUB"}
hub.OPTION_POSITIONS = []
hub.OPTION_POSITIONS.add(makeOptionPosition(d, "T1001", m1, 85, "C", 10, 2.10))
hub.OPTION_POSITIONS.add(makeOptionPosition(d, "T1002", m1, 85, "C", 5, 2.40))
hub.OPTION_POSITIONS.add(makeOptionPosition(d, "T1003", m2, 90, "P", -20, 4.00))
save hub
print "Positions saved"
//#endregion
```

:::tip Unique Ids
`createId()` builds an event id from the event time only, so every position dated the same day would get the same id and replace the others. Setting `id` from the date and a trade reference keeps each trade.
:::

---

## Step 8: Read the Options You Hold

A **positions view** is an EventOptions on the market events with `positions` set to your position event list. The position events use `tenor`, `strike`, `callput`, `volume` and `price` by default, as here:

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

view = EventOptions("MY.GAS.HUB:OPTIONS_PRICES")
view.description = "The options the desk holds"
view.strike = "strike"
view.callPut = "callput"
view.value = "settle"
view.columns = ["settle", "vol", "delta"]
view.positions = "MY.GAS.HUB:OPTION_POSITIONS"

hub.OPTIONS_HELD = view
save hub

held = ${data:"MY.GAS.HUB:OPTIONS_HELD:2025-03-04"}
print "Positions as of " + held.properties.positionDate
for t in held
    for s in t
        print t.relative + " " + s.strike
    next
next

c = held["M01"][85].call
print c.POSITION_VOLUME
print c.TRADED_PRICE
print c.settle
//#endregion
```

There are no positions dated the 4th, so the set of the 3rd is used, and you get only the options you hold:

| Tenor (relative) | Strike | Side | settle | vol | delta | POSITION_VOLUME | TRADED_PRICE |
|------------------|--------|------|--------|-----|-------|-----------------|--------------|
| `M01` | 85 | Call | 3 | 45 | 0.54 | 15 | 2.2 |
| `M02` | 90 | Put | 4 | 47 | -0.58 | -20 | 4 |

- The two trades in the 85 call are **netted**: 10 + 5 = 15 lots at an average traded price of 2.20
- Only the side you hold is shown: the 85 put and the other strikes are left out
- Each held option has all its market values for the 4th, plus your volume and traded price

| Rule | Detail |
|------|--------|
| Which positions | The latest set dated on or before the ondate |
| Netting | Volumes are summed per option; the traded price is weighted by volume |
| Closed options | An option that nets to zero is left out |
| No market price | A held option with no market event on the ondate is kept with only its position values |

:::caution Replacing a Set
A new set replaces the previous one from its date on, so it must include every option you still hold. To close everything, upload your options with a volume of 0.
:::

---

## Summary

| Data item | Type | Definition |
|-----------|------|------------|
| `OPTIONS_PRICES` | Event list | One event per date, tenor, strike and call or put |
| `OPTIONS` | EventOptions | The option chains, using `strike`, `callput` and `settle` |
| `OPTION_POSITIONS` | Event list | The desk's positions, one event per trade |
| `OPTIONS_HELD` | EventOptions | A positions view: only the options held, with `POSITION_VOLUME` and `TRADED_PRICE` |

## Exercise

1. Upload a new position set dated `2025-03-04` that keeps the 85 call (15 lots at 2.20) and adds 5 lots of the `M02` 85 call at 3.10, then read `MY.GAS.HUB:OPTIONS_HELD:2025-03-04` and check that the short put has gone
2. Read `MY.GAS.HUB:OPTIONS_HELD:2025-03-03` again and confirm it still shows the positions of the 3rd
3. Print the call volatility smile of `M02` on the 4th with `values("C", "vol")` and find the at-the-money strike for a forward price of 88

For more detail, see the [Options topic](/docs/topics/options/intro), [Traded options](/docs/topics/options/traded-options) and the [Options variable reference](/docs/odsl/variable/options).

:::note Next Step
Return to the [Technical Training home](/training/technical) to continue with the QuickStart Developer track or the General Tutorials.
:::
