---
slug: /odsl/variable/eventcurve
tags:
- curve
---
EventCurve
=====

An EventCurve is a curve that is dynamically built from events.

## Introduction

An EventCurve is a very flexible and dynamic way of expressing point-in-time based future values, both real and forecasted from events that are stored in your private database, the common database and the public database.

## Construction

To construct a new EventCurve, you use the EventCurve function as shown in the syntax below:
```js
curve = EventCurve(event, calendar, property, tenor)
```
An example of constructing a new EventCurve:
```js
curve = EventCurve("AAA:EVENTS", "#REOMHENG", "price", "absolute")
```

## Properties

An EventCurve has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|event|The name of the eventlist that this Curve uses (in the form objectId:eventListId)|String|
|property|The name of the property in the event that this Curve uses as the value|String|
|tenor|The name of the property in the event that this Curve uses as the tenor/maturity code|String|
|calendar|The expiry calendar for this Curve|String|
|holidayCalendar|The holiday calendar for this Curve - this is used to determine what dates this curve should be published on|String|
|filter|Optional filter used to filter the events used to build this Curve|String|
|source|Optional source of the events used to build this Curve. Can be private, common or public, defaults to private|String|
|valueTransformation|Optional value transformation expression to change all values in the curve, e.g. 'value * 1.1'|String|
|currency|An optional currency code|String|
|units|An optional units code|String|
|properties|Any other properties you want to add onto the curve|Object|
|precision|The [precision](/docs/kb/precision#data-precision-settings) configuration for this curve|Precision|
|include|Additional properties from an event to add as columns in the curve contracts|String or Array| 

## Examples

#### Creating and saving an event curve
```js
EC = EventCurve("AAA:EVENTS", "#REOMHENG", "price", "relative")
EC.precision.scale = 8
AAA = Object()
AAA.EC = EC
save AAA
```

#### Using value transformation
```js
EC = EventCurve("AAA:EVENTS", "#REOMHENG", "price", "relative")
EC.valueTransformation = "value * 1.1"
```

#### Additional properties
You can include additional columns in the curve from event properties, using the include property, e.g.

```js
EC = EventCurve("AAA:EVENTS", "#REOMHENG", "price", "relative")
EC.include = "vendorId"
```

To include multiple additional columns use an array, e.g.

```js
EC = EventCurve("AAA:EVENTS", "#REOMHENG", "price", "relative")
EC.include = ["vendorId", "internalId"]
```


## See Also
* [Curve](curve)