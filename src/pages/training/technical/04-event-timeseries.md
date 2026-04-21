---
slug: /training/technical/event-timeseries
title: "Module 04: Creating EventTimeSeries"
sidebar_position: 5
tags: [training, event-timeseries, odsl]
---

# Module 04: Creating EventTimeSeries

In this module you will attach **EventTimeSeries** to the `MY.GAS.HUB` master data object. An EventTimeSeries is built dynamically from an event list — when you request the timeseries, the platform reads the events and extracts the nominated property as the timeseries values.

## Why Use EventTimeSeries?

Events are the source of truth for transactional data. An EventTimeSeries gives you a timeseries view of that data without duplicating values. The timeseries automatically reflects any updates to the underlying events.

---

## Step 1: Understand the Construction

The `EventTimeSeries` constructor takes two arguments:

```js
//#region
EventTimeSeries(eventlist, property)
//#endregion
```

| Argument | Description |
|----------|-------------|
| `eventlist` | The event list identifier in the form `"OBJECT_ID:EVENT_LIST_NAME"` |
| `property` | The name of the event property to use as the timeseries value |

By default the timeseries is indexed by `eventstart`. You can override this with the `index` property.

---

## Step 2: Create a BUY Volume TimeSeries

We will create a timeseries of the BUY nomination volumes from the `NOMINATIONS` event list.

```js
//#region
use training

// Fetch the hub object
hub = ${object:"MY.GAS.HUB"}

// Create an EventTimeSeries for BUY nomination volumes
buyVol = EventTimeSeries("MY.GAS.HUB:NOMINATIONS", "volume")
buyVol.description = "Daily BUY nomination volumes in MWh"
buyVol.units = "MWh"
buyVol.calendar = "DAILY"

// Filter to BUY direction only
buyVol.filter = ?"direction == 'BUY'"

// Attach to the hub object and save
hub.BUY_VOLUME = buyVol
save hub

print "BUY_VOLUME EventTimeSeries saved"
//#endregion
```

:::tip Filtering Events
The `filter` property accepts a condition expression. Only events that match the filter contribute to the timeseries. Without a filter, all events in the list are included.
:::

---

## Step 3: Create a SELL Volume TimeSeries

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

sellVol = EventTimeSeries("MY.GAS.HUB:NOMINATIONS", "volume")
sellVol.description = "Daily SELL nomination volumes in MWh"
sellVol.units = "MWh"
sellVol.calendar = "DAILY"
sellVol.filter = ?"direction == 'SELL'"

hub.SELL_VOLUME = sellVol
save hub

print "SELL_VOLUME EventTimeSeries saved"
//#endregion
```

---

## Step 4: Create a Settlement Price TimeSeries

Now create a timeseries from the `SETTLEMENTS` event list using the `price` property.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

settlementTs = EventTimeSeries("MY.GAS.HUB:SETTLEMENTS", "price")
settlementTs.description = "Daily settlement price"
settlementTs.units = "therm"
settlementTs.currency = "GBP"
settlementTs.calendar = "DAILY"

hub.SETTLEMENT_PRICE = settlementTs
save hub

print "SETTLEMENT_PRICE EventTimeSeries saved"
//#endregion
```

---

## Step 5: Read the TimeSeries

An EventTimeSeries is evaluated dynamically — reading it automatically fetches all the events it needs and extracts the values. No explicit build step is required.

```js
//#region
use training

// Reading the series directly evaluates it against the current events
buyData = ${data:"MY.GAS.HUB:BUY_VOLUME"}

print "BUY volume timeseries:"
print buyData
//#endregion
```

---

## Step 6: Use a Custom Index Field

By default the EventTimeSeries uses `eventstart` as the date index. If your events use a different date field you can override this:

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

// Use the eventend date as the timeseries index
altTs = EventTimeSeries("MY.GAS.HUB:NOMINATIONS", "volume")
altTs.index = "eventend"
altTs.calendar = "DAILY"
altTs.filter = ?"direction == 'BUY'"
altTs.description = "BUY volumes indexed by gas day end"

hub.BUY_VOLUME_END = altTs
save hub
//#endregion
```

---

## Step 7: Calculate Net Position

```js
//#region
use training

// Get both series
buyData  = ${data:"MY.GAS.HUB:BUY_VOLUME"}
sellData = ${data:"MY.GAS.HUB:SELL_VOLUME"}

// Calculate net position (BUY minus SELL)
netPosition = buyData - sellData

print "Net nomination position:"
print netPosition.data
//#endregion
```

---

## Summary

You have created three EventTimeSeries on `MY.GAS.HUB`:

| Series Name | Event List | Property | Filter |
|-------------|-----------|----------|--------|
| `BUY_VOLUME` | `NOMINATIONS` | `volume` | `direction == 'BUY'` | none |
| `SELL_VOLUME` | `NOMINATIONS` | `volume` | `direction == 'SELL'` | none |
| `SETTLEMENT_PRICE` | `SETTLEMENTS` | `price` | none | GBP / therm |

## Exercise

1. Verify the three series in the portal under **Master Data → MY.GAS.HUB → Data**
2. View each EventTimeSeries in the portal and confirm the values match what you entered in Modules 02 and 03
3. Add one more `BUY` nomination event via ODSL (any date) and re-read `BUY_VOLUME` to confirm it picks up the new event

:::note Next Step
In [Module 05](/training/technical/smart-timeseries) you will use SmartTimeSeries to apply currency and unit conversions.
:::
