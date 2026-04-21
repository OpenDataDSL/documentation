---
slug: /training/technical/events-odsl
title: "Module 02: Working with Events in ODSL"
sidebar_position: 3
tags: [training, events, odsl]
---

# Module 02: Working with Events in ODSL

In this module you will create a master data object, define an event type, and then add and update events using ODSL code.

## Scenario

We will model **daily gas nominations** for a fictional trading location called `MY.GAS.HUB`. Each nomination event will record:

- The gas day (start and end)
- The nominated volume (in MWh)
- The counterparty name
- The direction (`BUY` or `SELL`)

---

## Step 1: Create a Training Environment

It is best practice to work in a dedicated **training environment** so that your practice data is isolated from production. Run this script once to create it.

```js
//#region
print ">>> Creating training environment"

training = Object()
training.description = "Training environment"
save ${environment:training}
//#endregion
```

Once created, add `use training` at the top of every subsequent script to direct all reads and writes to this environment.

:::note
The training environment is a separate data space. Objects, events, and timeseries you create here do not affect your production environment.
:::

---

## Step 2: Define the Event Type

Before creating events, it is good practice to define a **type** (schema) so the platform knows what properties to expect on each event.

```js
//#region
use training

// Define a type for gas nomination events
NominationType = type extends #Event
    volume as Number()
    counterparty as String()
    direction as String()
end

NominationType.event = true

save ${type:NominationType}
print "Nomination type saved"
//#endregion
```

:::note
The `#Event` base type provides standard event fields: `eventstart`, `eventend`, `eventtype`, and `eventid`. Your custom properties extend this base.
:::

---

## Step 3: Create the Master Data Object

```js
//#region
use training

// Create the trading hub object
hub = Object("#Object")
hub._id = "MY.GAS.HUB"
hub.name = "My Gas Trading Hub"
hub.description = "Fictional gas trading location used for training"
hub.category = "GAS"
save hub
print "Hub object created"
//#endregion
```

---

## Step 4: Add Events

Events are added to an object's named event list by assigning them as a property and saving the object.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}

// Add a BUY nomination for 2025-03-01
e1 = Event("2025-03-01T06:00:00")
e1.eventstart = Date("2025-03-01")
e1.eventend = Date("2025-03-02")
e1.eventtype = "NominationType"
e1.volume = 5000
e1.counterparty = "ACME Energy Ltd"
e1.direction = "BUY"
e1.id = "NOM-20250301-001"
e1._dsid = "TRAINING.MYGASHUB.NOMINATIONS"

hub.NOMINATIONS = e1
save hub

// Add a SELL nomination for 2025-03-01
e2 = Event("2025-03-01T06:00:00")
e2.eventstart = Date("2025-03-01")
e2.eventend = Date("2025-03-02")
e2.eventtype = "NominationType"
e2.volume = 3000
e2.counterparty = "Beta Gas Corp"
e2.direction = "SELL"
e2.id = "NOM-20250301-002"
e2._dsid = "TRAINING.MYGASHUB.NOMINATIONS"

hub.NOMINATIONS = e2
save hub

print "Events saved"
//#endregion
```

:::tip Event IDs and Dataset Monitoring
Setting a specific `id` such as `"NOM-20250301-001"` gives each event a stable, human-readable identifier. Re-running the script with the same `id` will update the existing event rather than create a duplicate. Use a consistent naming convention — for example `{type}-{date}-{sequence}`.

The `_dsid` property tags each event with a dataset identifier in the format `provider.feed.product`. The platform uses this to automatically create and populate a dataset for monitoring. Without `_dsid`, events are not tracked by dataset monitoring.
:::

---

## Step 5: Read Events Back

```js
//#region
use training

// Fetch all nominations
nominations = ${event:"MY.GAS.HUB:NOMINATIONS"}
print nominations

// Fetch nominations for a specific date range
filtered = find ${event} where event = "MY.GAS.HUB:NOMINATIONS" and eventstart >= "2025-03-01" and eventstart < "2025-03-02"
print filtered
//#endregion
```

---

## Step 6: Update an Event

To update an event, fetch the object, modify the relevant event, and save the object back.

```js
//#region
use training

// Fetch the hub object
hub = ${object:"MY.GAS.HUB"}

// Fetch the nominations event list from the hub
nominations = hub.NOMINATIONS

// Find the event to update — iterate and match on a property
for evt in nominations
    if evt.direction == "BUY" and evt.eventstart == Date("2025-03-01")
        evt.volume = 5500    // Updated volume
        hub.NOMINATIONS = evt
        save hub
        print "Updated BUY nomination volume to " + evt.volume
    end
next
//#endregion
```

---

## Step 7: Add Events for Multiple Days

Use a loop to add nominations for a week of gas days. Fetch the hub once, then assign each event and save.

```js
//#region
use training

hub = ${object:"MY.GAS.HUB"}
startDate = Date("2025-03-01")

for i = 0 to 6
    gasDay = startDate + i
    nextDay = gasDay + 1
    dayStr = format(gasDay, "yyyyMMdd")

    evt = Event(gasDay)
    evt.eventstart = gasDay
    evt.eventend = nextDay
    evt.eventtype = "NominationType"
    evt.volume = 4000 + (random() * 2000)
    evt.counterparty = "ACME Energy Ltd"
    evt.direction = "BUY"
    evt.id = "NOM-" + dayStr + "-001"
    evt._dsid = "TRAINING.MYGASHUB.NOMINATIONS"

    hub.NOMINATIONS = evt
    save hub
    print "Saved nomination for " + gasDay
next
//#endregion
```

---

## Exercise

1. Add a second event list called `SETTLEMENTS` on `MY.GAS.HUB` with events that include a `price` (Number) and `currency` (String) property. Set `_dsid` to `"TRAINING.MYGASHUB.SETTLEMENTS"` on each event.
2. Add settlement events for the same week of gas days using a GBP price of around 0.85.
3. Read back the SETTLEMENTS events and print each one.

:::note Next Step
In [Module 03](/training/technical/events-excel) you will upload and update events using Excel instead of ODSL code.
:::
