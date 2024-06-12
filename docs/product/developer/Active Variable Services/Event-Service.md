---
slug: /odsl/service/event
tags:
- service
- event
---
Event Service
=================

The event service allows you to read all the [events](/docs/odsl/variable/event) in the system

## Introduction

The event service is the interface for the event repository.

Events are either:

*   Public - they are available to everybody and maintained by OpenDataDSL
*   Private - they are proprietary and only available to you and your colleagues

An event is always connected to a Master Data Record (Object)

## Finding events
You use the find command to find events in the system.

### Using the event property
You would usually use the ```event``` property in the query to filter to the specific event list you want to find, e.g.

```js
find ${event:public} where event = "#ABN.FX:SPOT"
```

### Using a date range
You can filter the objects by eventtime - the time the event is recorded for.

```js
find ${event:public} 
    where event = "#ABN.FX:SPOT" 
    and eventtime >= "2024-06-03" 
    and eventtime <= "2024-06-07"
```

You can also filter the objects by eventstart and eventend - the time period the event represents.

```js
find ${event:public} 
    where event = "#DCE.CN.Y.SOYBEAN_OIL:FUTURES" 
    and eventstart >= "2024-01-01" 
    and eventend <= "2024-01-31"
```

## Creating events
An example of creating some metrics, adding onto a Master Data Record and saving

```js
// Create the temperature metric
evtemp = Event(${date:"now"})
evtemp.eventtype = "#Metric"
evtemp.type = "temperature"
evtemp.value = 14
evtemp.id = ObjectId()

// Create the humidity metric
evhum = Event(${date:"now"})
evhum.eventtype = "#Metric"
evhum.type = "humidity"
evhum.value = 25
evhum.id = ObjectId()

// Add the events to an object and save it
s9754 = new Object()
s9754.MESSAGE = [evtemp, evhum]
save ${object:s9754}
```