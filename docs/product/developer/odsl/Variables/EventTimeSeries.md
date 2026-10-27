---
slug: /odsl/variable/eventtimeseries
title: EventTimeSeries
tags:
- event
- timeseries
---

# EventTimeSeries

An **EventTimeSeries** is a timeseries built from the events in an event list, using one property of the events as the value. It is built when it is read, so it always reflects the latest events. See also [EventCurve](/docs/odsl/variable/eventcurve).

## Construction

|**Function**|**Description**|
|-|-|
|EventTimeSeries(eventlist, property)|Creates a new Event TimeSeries using an EventList and the name of the property to use for the TimeSeries values|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|calendar|The calendar that this timeseries uses|Calendar|
|currency|The ISO currency of this timeseries|String|
|description|The description of this timeseries|String|
|event|The name of the eventlist that this TimeSeries uses (in the form objectId:eventListId)|String|
|filter|Optional filter used to filter the events used to build this TimeSeries|String|
|identity|The configured identities|Object|
|index|Optional date field to use for the index used to build this TimeSeries, defaults to start|String|
|name|The name of the timeseries|String|
|observed|The observed setting of the timeseries used for aggregating|TimeSeriesObserved|
|precision|The precision configuration for this timeseries|Precision|
|property|The name of the property in the event that this TimeSeries uses as the value|String|
|source|The source of this timeseries|String|
|start|The starting date/time of the timeseries|Date|
|tenor|The tenor of this timeseries|String|
|timezone|The timezone of this timeseries, defaults to UTC|String|
|units|The ISO units of this timeseries|String|
|valueType|The value type of the timeseries (TRACKED or BASIC)|TimeValueType|


## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|build()|Builds this Event TimeSeries|TimeSeries|


It also has all the methods of a [TimeSeries](/docs/odsl/variable/timeseries).

## Example

```js
obj = ${object:"NGE.TRADES"}
obj.FILL_PRICE = EventTimeSeries("NGE.TRADES:FILLS", "price")
save obj
```
