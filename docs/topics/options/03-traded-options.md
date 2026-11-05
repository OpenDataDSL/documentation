---
title: Traded options
description: Upload the options your company holds and read only those options, with the market values and your position volume and traded price
slug: /topics/options/traded-options
sidebar_position: 3
tags:
- options
- positions
- topics
---
# Traded options

An exchange settles thousands of options a day, but a trading desk usually needs only the ones it holds. A **positions view** gives you exactly those: for an ondate it returns only the maturities, strikes and sides (call or put) you hold, with all the market values for that ondate plus your position volume and traded price.

It answers questions such as:

* What did each option we hold settle at today, and what was its volatility and delta?
* How many lots do we hold of each option, and at what average price?
* Which of our options have no market price today?

The examples follow the fictional Northgate Energy, which holds ICE Endex EUA futures options.

---

## How it works

|**Part**|**What it is**|
|-|-|
|Position events|Your own event list, for example `NGE.EUA:POSITIONS`, with one event per option held (or per trade). The event time is the **position date**|
|Position set|All the position events dated on one day. A set holds until a later set is uploaded|
|Positions view|An [EventOptions](/docs/odsl/variable/eventoptions) on the market options events, with `positions` set to your event list|

When you read the view for an ondate:

1. The latest position set dated on or before the ondate is found.
2. The positions in it are netted per option (tenor, strike, call or put).
3. The market options for the ondate are read for just those tenors and strikes.
4. Each option you hold gets its market values plus `POSITION_VOLUME` and `TRADED_PRICE`.

---

## 1. Upload your positions

Each position event holds the tenor, the strike, call or put, the volume and the traded price:

|**Property**|**Example**|**Notes**|
|-|-|-|
|`tenor`|`2026M09`|The absolute code (`2026M09`) or the relative code (`M01`)|
|`strike`|`85`|A number, or a number as text|
|`callput`|`C`|`C` or `P`, or `Call` or `Put`|
|`volume`|`10`|The volume held; negative for a short position|
|`price`|`0.80`|The traded price (optional)|

A small function makes the events. Give each event its own id: `createId()` builds the id from the event time alone, so every position dated on the same day would get the same id and replace the others.

```js
function makeOptionPosition(posdate, ref, tenor, strike, callput, volume, price)
    e = Event(posdate)
    e.id = "ID_" + format(posdate, "yyyyMMdd") + "_" + ref
    e.tenor = tenor
    e.strike = strike
    e.callput = callput
    e.volume = volume
    e.price = price
    makeOptionPosition = e
end
```

Upload the positions held on the 15th September 2026:

```js
d = Date("2026-09-15")
o = Object()
o.id = "NGE.EUA"
o.POSITIONS = []
o.POSITIONS.add(makeOptionPosition(d, "T1001", "2026M09", 85, "C", 10, 0.80))
o.POSITIONS.add(makeOptionPosition(d, "T1002", "2026M09", 85, "C", 5, 0.95))
o.POSITIONS.add(makeOptionPosition(d, "T1003", "2026M10", 87.5, "P", -20, 2.50))
o.POSITIONS.add(makeOptionPosition(d, "T1004", "2026M12", 100, "C", 3, 1.00))
save o
```

This set holds two trades in the September 85 call, a short October 87.5 put and a December 100 call.

### Uploading a new set

A new set replaces the previous one from its position date on, so it must hold **every** option you still hold. An option that is not in the new set is no longer held. Sets for earlier dates are kept, so reading an earlier ondate still gives the positions of that time.

```js
d = Date("2026-09-17")
o = Object()
o.id = "NGE.EUA"
o.POSITIONS = []
o.POSITIONS.add(makeOptionPosition(d, "T1001", "2026M09", 85, "C", 15, 0.85))
o.POSITIONS.add(makeOptionPosition(d, "T1005", "2026M09", 80, "C", 1, 5.30))
save o
```

:::caution
An empty set cannot be uploaded. To close every position, upload the options you held with a volume of 0; otherwise the previous set carries on.
:::

---

## 2. Define the positions view

Define the view once, on the market options events, with `positions` set to your event list:

```js
p = EventOptions("ICE.NDEX.EFO:OPTIONS")
p.name = "EUA option positions"
p.source = "common"
p.positions = "NGE.EUA:POSITIONS"

o = Object()
o.id = "NGE.EUA"
o.POSITIONS_VIEW = p
save o
```

The position settings:

|**Setting**|**Default**|**What it does**|
|-|-|-|
|`positions`||The event list with your position events|
|`positionSource`|private|Where the position events are: `private`, `common` or `public`|
|`positionFilter`||Optional filter (JSON) on the position events, for example one book: `'{"book": "B1"}'`|
|`positionTenor`|`tenor`|The position event property with the tenor|
|`positionStrike`|`strike`|The position event property with the strike|
|`positionCallPut`|`callput`|The position event property with call or put|
|`positionVolume`|`volume`|The position event property with the volume|
|`positionPrice`|`price`|The position event property with the traded price|

If your positions come from another system with other names, set them: for example `p.positionVolume = "quantity"`. All the [options settings](/docs/topics/options/options-data#defining-the-options), such as `columns`, apply to the market values.

---

## 3. Read the options you hold

Read the view for an ondate as you would any options:

```js
held = ${data:"NGE.EUA:POSITIONS_VIEW:2026-09-16"}
print "Positions as of " + held.properties.positionDate
c = held["2026M09"][85].call
print c.POSITION_VOLUME
print c.TRADED_PRICE
print c.SETTLEMENT_PRICE
```

There is no set on the 16th, so the set of the 15th is used. The result:

|**Tenor**|**Strike**|**Side**|**Settle**|**Vol**|**Delta**|**Open interest**|**Volume**|**Position**|**Traded price**|
|-|-|-|-|-|-|-|-|-|-|
|2026M09|85|Call|0.91|22.0791|0.4662|3695|200|15|0.85|
|2026M10|87.5|Put|2.31|23.3|-0.55|800|25|-20|2.50|
|2026M12|100|Call||||||3|1.00|

* The two September 85 call trades are netted: 10 + 5 = 15 lots at an average traded price of 0.85.
* Only the side you hold is shown: there is no 85 put, although the exchange settled one.
* The December 100 call had no market event on the 16th, so it has only its position values; it is listed last and counted in `properties.unpriced`.

The JSON is the [options JSON](/docs/topics/options/options-data#through-the-rest-api) with `POSITION_VOLUME` and `TRADED_PRICE` added to the held side and to `columns`, and these properties:

|**Property**|**What it is**|
|-|-|
|`positions`|The position event list|
|`positionDate`|The date of the position set used|
|`unpriced`|The number of held options with no market values on the ondate (only when there are any)|

Through the REST API:

```js
GET https://api.opendatadsl.com/api/data/v1/private/NGE.EUA:POSITIONS_VIEW:2026-09-16
Authorization: Bearer {{token}}
```

---

## Rules

|**Rule**|**Detail**|
|-|-|
|Which set|The latest set dated on or before the ondate. Before the first set there are no options (not found)|
|Netting|Volumes are summed per tenor, strike and call or put. The traded price is the average of the prices weighted by volume, over the events that have a price|
|Closed options|An option whose volumes net to zero is left out|
|Incomplete events|A position event with no tenor, strike, call or put, or volume is skipped|
|Held side only|A strike shows only the side you hold, with all its market columns|
|No market value|A held option with no market event on the ondate is kept with only its position values|
|Ondates|The market ondates from the first position date on. A date with no market events is not found, as for the market options|
|Single options|`NGE.EUA:POSITIONS_VIEW:2026M09:85:C` is the market timeseries of that option, without positions|

---

## Good to know

* Positions are your own private events, read with your security policies. The market events are read with your access to the exchange data too: without it the request is refused.
* The view reads only the market events for the tenors and strikes you hold, so it stays quick however large the exchange data is.
* A position given with a relative tenor (`M01`) is matched to the market tenor that is `M01` on the ondate.
