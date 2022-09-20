---
title: SmartTimeSeries
description: A Smart TimeSeries is an expression that builds TimeSeries on demand
slug: /odsl/variable/smarttimeseries
tags:
- timeseries
- smarttimeseries
---

A Smart TimeSeries is an expression that is used to build TimeSeries on demand

## Introduction
Smart TimeSeries are an easy but powerful way of defining TimeSeries derivations.

A Smart TimeSeries consists of the following:

### Base TimeSeries
The base TimeSeries is mandatory and can be either a real TimeSeries or another Smart TimeSeries.
The base TimeSeries is usually used in the expression using the variable name ```BASE```.

### Expression
The expression is also mandatory and is a string formula used to build the TimeSeries.

* It can be a simple operation like ```BASE*1.2```
* It can use built-in functions like ```scale(BASE, 'MONTHLY', 'summed')```
* It can use functions in the #TimeSeriesScript (if you have not specified a custom script) like ```fill(BASE, 'LINEAR')```
* It can use your own functions in a specified custom script like ```myfunction(BASE)```

### Script
The script is an optional saved custom script with user defined functions.
These functions can then be used in the expression.
The function script can also `import` the default #TimeSeriesScript, so your functions can use those too.

### References to other TimeSeries
You can optionally add references to other TimeSeries or Smart TimeSeries that can also be used in your expression

## Construction

You construct a Smart TimeSeries using one of the following constructors:

```js
// Specify base TimeSeries id and expression
st = SmartTimeSeries("CORN:CLOSE", "fill(BASE,'LINEAR')")

// Specify a start date, calendar and expression
// This can be used to create a TimeSeries that has the same scalar value from the start date till now
// Or you can use an expression to build a TimeSeries
st = SmartTimeSeries("2022-01-01", "MONTHLY", "12.5")
```

## Properties

A SmartTimeSeries has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|baseTimeSeries|The TimeSeries that this Smart TimeSeries uses for a base|ID String, TimeSeries or Reference|
|expression|The expression used to generate the TimeSeries|String|
|script|Optional custom script name used with the expression|String|
|currency|Optional currency of the TimeSeries, defaults to base TimeSeries currency|String|
|units|Optional units of the TimeSeries, defaults to base TimeSeries units|String|

:::info
If a currency and/or units are set, the base TimeSeries and any other TimeSeries added to this Smart TimeSeries will be converted to the specified currency and units
:::

A SmartTimeSeries also supports adding dynamic properties, e.g.

```js
sc = SmartTimeSeries("SMART_TEST:CLOSE", "BASE*1.02")
sc.product = "CORN"
```

Any dynamic properties added to a SmartTimeSeries can be used in the expression including references to other TimeSeries.
Here are some examples of using properties within the Smart TimeSeries expression:

```js
// Example using another TimeSeries
st1 = SmartTimeSeries("TEST_SMART_TS:ASK", "(BASE+BID)/2")
st1.BID = ref("data","TEST_SMART_TS:BID")

// Example using a numeric factor
st2 = SmartTimeSeries("TEST_SMART_TS:CLOSE", "BASE*factor")
st2.factor=1.2
```

## Methods

A SmartTimeSeries has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|build()|Builds a TimeSeries|TimeSeries|

Below is an example of creating a Smart TimeSeries and building a TimeSeries using it:

```js
st1 = SmartTimeSeries("TEST_SMART_TS:CLOSE", "BASE*factor)
st1.factor=1.2

t1 = st1.build()
print t1.values
```

## Adding to an object and saving
A SmartTimeSeries needs to be added to an object in order to save it to the database, e.g.

```js
CORN_TEST = Object()
CORN_TEST.category = "TEST"

cf = SmartTimeSeries("TEST_SMART_TS:CLOSE", "interpolate(BASE,'LINEAR')")
CORN_TEST.FILLED = cf

save ${object: CORN_TEST}
```


