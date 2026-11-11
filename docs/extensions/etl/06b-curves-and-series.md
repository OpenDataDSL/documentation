---
title: Curves and series
description: Making event timeseries, event curves and event options once from a data loader's events, kept on the same master data record
slug: /extensions/etl/curves-and-series
sidebar_position: 6.5
tags: [extension, data loaders, etl, event timeseries, event curve, event options]
---

# Curves and series

Events are often only the first step: the desk wants a timeseries of the TTF front month, or a forward curve each day. **Curves and series**, the last step of a loader, makes those once. They are saved on the loader's master data record, next to its event list, and the platform builds them from the events whenever they are read, so they keep up as the loader adds events.

The step is optional, does not change the loader and can be used before or after deploying. Come back to it to add more.

![The Curves and series step: an event timeseries for each hub, only for the 2026M12 tenor, and the three it will create](/img/extensions/etl/build-form.png)

---

## What you can make

| Kind | What it is | Needs |
|-|-|-|
| **Event timeseries** | A value of the events over time. | A number field, and a calendar: `DAILY`, `BUSINESS`, `WEEKLY`, `MONTHLY`, `YEARLY`, `HOURLY`, `HALFHOURLY`, `QUARTERHOURLY`, `GASDAY`, `SPARSE` or another calendar code. The step suggests one from how far apart the sample's event dates are, such as `MONTHLY` for monthly figures. |
| **Event curve** | A forward curve for each day: the events of a day, one per tenor. | A number field, a field with the tenor as a period code (`2026M12`, `M01`), and an expiry calendar such as `#REOMHENG`. The event time must be the curve date. |
| **Event options** | An option chain: one event per tenor, strike and call or put. | Tenor, strike, call or put and price fields, an expiry calendar, and the values that mean call and put (`C` and `P` by default). |
| **A set of series** | Your organisation's usual series for a record, made together: see [Sets of series](#sets-of-series). | A saved set, the field with the price, and the source prices' currency and units. |

---

## The settings

| Setting | Notes |
|-|-|
| **Id** | Saved as `RECORD:ID`, e.g. `NGE.BROKERS:SETTLE_TTF_FRONT`. Letters, digits, `_`, `.` and `-`. |
| **One for each value of** | Makes one for each value of a field in the sample, each only for the events with that value. Put `{value}` in the id (and the name), e.g. `SETTLE_{value}_FRONT` gives `SETTLE_TTF_FRONT`, `SETTLE_THE_FRONT` and `SETTLE_PEG_FRONT`. |
| **Value** | The number field (event timeseries and curves). |
| **Time of each value** | Event timeseries: the event start (default), end or time. |
| **Tenor** | Event curves and options: the field with the period code. |
| **Only events where ... equals** | Keeps only the events with that value, e.g. the tenor `2026M12` for a front month series. |
| **Name**, **Currency**, **Units**, **Time zone** | Shown with the data. |

**To create** lists what will be made, with the events each one uses; **What is saved** shows the definitions. An id that is already on the record is flagged: creating it again replaces it. Select **Create** to save them.

![The record's event timeseries and curves made from the page settlements](/img/extensions/etl/build-list.png)

The list under the form shows every event timeseries, curve and options definition on the record that uses the loader's event list. View, chart, change or delete them in **Information**, **Event Data** (the [Event Data extension](/docs/extensions/event-data/overview)).

### Loaders with a record for each value of a field

For a loader that saves to [a record for each value of a field](/docs/extensions/etl/building#a-record-for-each-value-of-a-field), **Make them on** chooses where: **Each record of this loader** makes the same definitions on every record the loader has made, or choose one record. The step finds them on the platform from the record id template (for example every `EIA.STOCKS.` record), so it includes series that are not in the sample, such as those whose history starts later. Run the loader once first; the step names the records the sample makes that are not there yet.

:::note
The values in **One for each value of** come from the sample. A hub that first appears in later files needs its own series: come back and create it, with **Only events where**.
:::

---

## Sets of series

Many organisations make the same series on every record: for example the source price, the same price per KG, in EUR, and in EUR per KG. A **set of series** saves that convention once; then making it on a record, or on every record of a loader, needs only the field with the price and the currency and units of the source prices.

![A set of series ready to make on each of 83 records: the source price as an event timeseries in USD per T, and three smart timeseries converting it to KG, to EUR, and to EUR per KG](/img/extensions/etl/series-set.png)

Choose **A set of series**, then the set, the **Value** field, the **Source currency** and **Source units**, the **Calendar** and, if needed, **Only events where**. The calendar is given to every series of the set, the smart ones too, unless a series has its own calendar in the set; it starts as the one the sample suggests, such as `MONTHLY`. The table shows each series with the calendar, currency and units it will have. **Create** makes them all on the record, or on each record of the loader.

| Kind of series in a set | What it is |
|-|-|
| **Event timeseries** | Built from the events, in the source currency and units, from the **Value** field or the event field the series names. A set needs at least one. |
| **Smart timeseries** | Another series of the set (**Based on**), converted to its own currency and units each time it is read, using its expression: `BASE` (the series it is based on) unless you change it, for example `BASE * 1.1`. Currencies use the platform's FX rates; units use the platform's unit conversions. |

### Making and changing sets

With no sets yet, select **New set from the example** to start from the set above, or **New empty set**. Later, **Change this set** and **New set** are under the set's name. For each series give:

- **Id**: saved as `RECORD:ID`, such as `SOURCE_PRICE` or `PRICE`.
- **Kind** and, for a smart timeseries, **Based on** (a series above it in the set) and its **expression**, `BASE` unless you change it.
- For an event timeseries, the **event field** it reads: optional, such as `settle`; empty uses the **Value** field given when the set is used. So one set can make a series from the bid and another from the ask.
- **Calendar**: optional, for a series that always has its own calendar, such as `YEARLY`; empty uses the calendar given when the set is used.
- **Currency** and **Units**: a fixed value such as `EUR` or `KG`, or `{currency}` and `{units}` for the source prices' currency and units given when the set is used. The form asks only for the ones the set uses.
- **Name**: optional; `{record}` is the record id.

Sets are saved in the object service collection `etl_series_sets` and shared by every loader. Changing or deleting a set does not change series already made with it: make the set again on the records to update them.

![Changing a set: four series with their kind, the series each is based on, currency, units and name](/img/extensions/etl/series-set-editor.png)

