---
slug: /odsl/variable/timeseries
tags:
  - timeseries
  - curve
---
TimeSeries
==========

A timeseries is a list of values which are indexed by dates. A timeseries could be the price of a particular stock recorded at a certain time of each day (say the time that the stock exchange closes)

## Introduction

A TimeSeries represents a list of observations or metrics where each observed value is indexed by a point in time. Every TimeSeries has a [calendar](calendar) which helps align the observations and make working with TimeSeries much easier.

## Construction

You construct a timeseries using one of the following constructors:

```js
// Creates a TimeSeries aligned to the business calendar
ts1 = TimeSeries("business")

/**
 Creates a TimeSeries aligned to the business calendar 
 with the first value of 12.5 on the 1st October 2020
**/
ts2 = TimeSeries("2020-10-01", "business", 12.5)

/**
 Creates a TimeSeries aligned to the business calendar 
 with a list of values starting on the 1st October 2020
**/
ts3 = TimeSeries("2020-10-01", "business", [12.5,12.6,12.7,12.8,12.9])

/**
 Creates a TimeSeries aligned to the business calendar 
 with the first value of Hello on the 1st October 2020.
 The fourth parameter is the data type
**/
ts4 = TimeSeries("2020-10-01", "business", "Hello", "any")

// Creates a TimeSeries with multiple observations at various time points
ts = TimeSeries(["2020-11-21T08:40:12","2020-09-11T19:27:22"], "SPARSE", [12.5,15.5])
```

## Properties

A timeseries has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|start|The first index of this timeseries|Date|
|calendar|The calendar that this timeseries uses|Calendar|
|observations|The list of values without the indexes|List|
|values|The list of dates and values|List(TimeValue)|
|description|A description of this timeseries|Scalar(String)|
|source|The source of this timeseries|Scalar(String)|

A timeseries also supports adding dynamic properties, e.g.

```js
/**
 Creates a TimeSeries aligned to the business calendar 
 with the first value of 12.5 on the 1st October 2020
**/
ts2 = TimeSeries("2020-10-01", "business", 12.5)

// Add a product property
ts2.product = "Crude Oil"
```

## Methods

A timeseries has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|add(Date, value)|Adds a new value to the timeseries at the specified index|This timeseries|
|add(timeseries)|Adds the values of the supplied timeseries to this timeseries|This timeseries|
|add(Date, List)|Adds a list of values to the timeseries starting at the specified index|This timeseries|

## Accessing Observations

You can treat a timeseries like a special list in order to access the observations using the date as an index, e.g.

```js
/**
 Creates a TimeSeries aligned to the business calendar 
 with a list of values starting on the 1st October 2020
**/
ts3 = TimeSeries("2020-10-01", "business", [12.5,12.6,12.7,12.8,12.9])

// Print out the value for the 2nd October 2020
print ts3["2020-10-02"]
```

If the requested index doesn’t exist, you will get a Missing Value or NaN, e.g.

```js
/**
 Creates a TimeSeries aligned to the business calendar 
 with a list of values starting on the 1st October 2020
**/
ts3 = TimeSeries("2020-10-01", "business", [12.5,12.6,12.7,12.8,12.9])

// The 3rd October 2020 is a Saturday, so there is no value 
print ts3["2020-10-03"]
```

You can also use numeric indexes to retrieve values from a timeseries, e.g.

```js
/**
 Creates a TimeSeries aligned to the business calendar 
 with a list of values starting on the 1st October 2020
**/
ts3 = TimeSeries("2020-10-01", "business", [12.5,12.6,12.7,12.8,12.9])

// Print out the value for the first index
print ts3[0].value
```
