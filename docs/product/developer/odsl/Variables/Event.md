---
slug: /odsl/variable/event
tags:
- event
---
Event
======

An event variable is an object that has happened or will happen at a point in time or over a period of time.

## Construction
An event can be constructed in one of 2 ways

### Standard construction

This creates an event with an eventtime specified as the constructor argument.

```js
evtemp = Event(${date:"now"})
``` 


### Curve contract construction

This creates an event with all the properties of a curve contract (ondate, absolute, relative, expiry, start and end of delivery)

```js
cd = CurveDate("2024-02-02", "#REOMHENG")
e = Event(cd, "2024M06")
```



## Properties
An event has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|eventtime|The time of the event message|String|
|eventstart|The point in time when the event started/starts - defaults to the time of the event message|String|
|eventend|The point in time when the event ended/ends - default to the eventstart|String|
|timezone|The timezone of the event message|String|
|eventtype|The type of event - defaults to #Event|String|
|event|The identifier for this group of events|String|
|eventid|The unique identifier for this specific event|String|
|*|Any other properties|Any|

## Methods
An event has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|createId()|Creates a unique id for this event based on the event start and end time|Void|

## Example Usage
An event or list of events are always associated with a Master Data Record (Object)

### Saving events

```js
evtemp = Event(${date:"now"})
evtemp.eventtype = "#Metric"
evtemp.type = "temperature"
evtemp.value = 14
evtemp.id = ObjectId()
evhum = Event(${date:"now"})
evhum.eventtype = "#Metric"
evhum.type = "humidity"
evhum.value = 25
evhum.id = ObjectId()
s9754 = ${object:"s9754"}
s9754.MESSAGE = [evtemp, evhum]
save ${object:s9754}
```

## Further Reading
* [Event service](/docs/odsl/service/event) for saving and using events in the server.