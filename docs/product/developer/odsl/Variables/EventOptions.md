---
slug: /odsl/variable/eventoptions
title: EventOptions
tags:
- options
- event
---
EventOptions
=====

An EventOptions is options data (an option chain for each maturity) that is dynamically built from events.

## Introduction

An EventOptions says which events hold the options data and how to read them: one event for each ondate, tenor, call or put, and strike. It is saved as a data item of an object, and the options are built from the events each time you read them. With `positions` set it becomes a positions view, which returns only the options you hold. See the [Options topic](/docs/topics/options/intro).

## Construction

To construct a new EventOptions, use the EventOptions function:
```js
options = EventOptions(eventlist)
```
An example of constructing EventOptions on the ICE Endex EUA futures options:
```js
options = EventOptions("ICE.NDEX.EFO:OPTIONS")
options.source = "common"
```

## Properties

An EventOptions has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|event|The name of the eventlist that these options use (in the form objectId:eventListId)|String|
|source|Optional source of the events: private, common or public (default private, public for # event lists)|String|
|filter|Optional filter (JSON) used to filter the events|String|
|tenor|The name of the property in the event with the tenor/maturity code of the option (default absolute)|String|
|strike|The name of the property in the event with the strike price (default STRIKE_PRICE)|String|
|callPut|The name of the property in the event that says if the option is a call or a put (default CONTRACT_TYPE)|String|
|callValue|The value of the callPut property for a call option (default C)|String|
|putValue|The value of the callPut property for a put option (default P)|String|
|value|The main value column, used when no column is given (default SETTLEMENT_PRICE)|String|
|columns|The event properties shown in the strike table (default SETTLEMENT_PRICE, OPTION_VOLATILITY, DELTA_FACTOR, OPEN_INTEREST, TOTAL_VOLUME)|List or String|
|timezone|The timezone of the ondates (default UTC)|String|
|calendar|The optional expiry calendar of the options|String|
|holidayCalendar|The optional holiday calendar, the calendar of the single option timeseries (default daily)|String|
|currency|An optional currency code|String|
|units|An optional units code|String|
|name|The name of the options|String|
|description|A description of the options|String|
|positions|Optional eventlist with the positions held; when set only the held options are returned|String|
|positionSource|The source of the position events: private (default), common or public|String|
|positionFilter|Optional filter (JSON) used to filter the position events, e.g. on a book or product|String|
|positionTenor|The property in the position events with the tenor, absolute or relative (default tenor)|String|
|positionStrike|The property in the position events with the strike price (default strike)|String|
|positionCallPut|The property in the position events that says if it is a call or a put (default callput)|String|
|positionVolume|The property in the position events with the volume held, negative for a short position (default volume)|String|
|positionPrice|The property in the position events with the traded price (default price)|String|
|identity|The configured identity for these options|Object|
|properties|Any other properties you want to add onto the options|Object|

## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|build(ondate)|Builds these options for an ondate on the server; in your own scripts read `${data:"ID:YYYY-MM-DD"}` instead|Options|
|ondates()|Gets the ondates these options can be built for (on the server)|OptionsDates|

## Reading the options

|**Id**|**What you get**|
|-|-|
|`OBJ:ID`|The ondates (OptionsDates)|
|`OBJ:ID:YYYY-MM-DD`, `OBJ:ID:L`|The [Options](/docs/odsl/variable/options) for an ondate, or the latest|
|`OBJ:ID:TENOR:STRIKE:C`|A [TimeSeries](/docs/odsl/variable/timeseries) of the call's main value, one value per ondate (P for the put)|
|`OBJ:ID:TENOR:STRIKE:C:COLUMN`|A TimeSeries of one column of the call|

## Examples

#### Creating and saving event options
```js
o = EventOptions("ICE.NDEX.EFO:OPTIONS")
o.name = "EUA futures options"
o.source = "common"
o.columns = ["SETTLEMENT_PRICE", "OPTION_VOLATILITY", "DELTA_FACTOR"]
NGE = Object()
NGE.id = "NGE.EUA"
NGE.OPTIONS = o
save NGE
```

#### Reading the options for an ondate
```js
eua = ${data:"NGE.EUA:OPTIONS:2026-09-16"}
print eua["2026M09"][85].call.SETTLEMENT_PRICE
```

#### A positions view
```js
p = EventOptions("ICE.NDEX.EFO:OPTIONS")
p.source = "common"
p.positions = "NGE.EUA:POSITIONS"
NGE = Object()
NGE.id = "NGE.EUA"
NGE.POSITIONS_VIEW = p
save NGE
```
See [Traded options](/docs/topics/options/traded-options) for uploading positions.
