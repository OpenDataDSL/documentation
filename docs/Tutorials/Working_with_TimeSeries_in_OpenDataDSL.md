---
slug: /tutorials/workingtimeseries
tags:
  - tutorial
  - odsl
  - timeseries
---
Working with TimeSeries in OpenDataDSL
======================================

## Introduction

This tutorial explores a few aspects of TimeSeries in the OpenDataDSL language

## Prerequisites

### User requirements

This tutorial assumes some familiarity with writing code as we will be doing some basic coding in OpenDataDSL in Visual Studio Code

### System requirements

You will need to have the following:

*   An account with OpenDataDSL
*   Microsoft VS Code with the [OpenDataDSL extension](/docs/user/vscode)
    

## Tutorial Steps

### Calendars

A TimeSeries needs a calendar in order to manage the intervals between datapoints, there are a number of built in or standard calendars, but you can also create your own.

NOTE: If the data you are storing is not observed at regular intervals, you can use the special SPARSE calendar to record both the time and value of the observation

#### Daily calendar

A simple example of a calendar is a Daily Calendar where we expect a value to be recorded every calendar day, e.g.

```js
// Basic daily calendar
daily = DailyCalendar()
dates = daily.getDates("2021-01-01", "2021-01-07")
print dates
```

This is the output from that script:
```json
[
"2021-01-01",
"2021-01-02",
"2021-01-03",
"2021-01-04",
"2021-01-05",
"2021-01-06",
"2021-01-07"
]
```

#### Holiday calendar

A holiday calendar is an extension of the Daily calendar and allows us to define non-working days or days where we don’t expect to observe any data. A simple example of a holiday calendar is a Business Calendar where every Saturday and Sunday are non-working days, e.g.

```js
// Business day calendar
business = BusinessCalendar()
dates = business.getDates("2021-01-01", "2021-01-07")
print dates
```

This displays the following:

```json
[
"2021-01-01",
"2021-01-04",
"2021-01-05",
"2021-01-06",
"2021-01-07"
]
```

If we want to also exclude Mondays, we can add a rule to the calendar like this:

```js
// Add a holiday rule
business.addRule("Every Monday")
dates = business.getDates("2021-01-01", "2021-01-07")
print dates
```

This now displays:

```json
[
"2021-01-01",
"2021-01-05",
"2021-01-06",
"2021-01-07"
]
```

Note how Saturday, Sunday and Monday are now excluded from the output dates.

For further details about the rules you can use, see [Holiday Calendar](/docs/odsl/calendar/holiday).

### Creating a TimeSeries

#### Construction

To create a TimeSeries variable, we use the TimeSeries constructor method. This has various parameter combinations but the easiest is to construct the TimeSeries with a calendar, e.g.

```js
// Basic Construction with a named calendar
ts1 = TimeSeries("BUSINESS")

// Basic Construction with a pre-defined calendar
business = BusinessCalendar()
ts2 = TimeSeries(business)
```

The 2 methods shown above construct a TimeSeries which expects values for every weekday but not on weekends, if you attempt to add a value on a weekend, you will be shown an error message.

#### Data Type

By default, any scalar data (numeric, string, boolean) can be added to a TimeSeries, but you can explicitly set the data type you want to store in the TimeSeries with a second parameter like this:

```js
// Construction with a calendar and data type
ts3 = TimeSeries("BUSINESS", "string")
```

This will restrict the type of data that you add to the TimeSeries to only accepts strings.

## Adding Observations

Once you have constructed your TimeSeries, you can now add observations to it using the **add** method on the TimeSeries variable, e.g.

```js
// Add a value for the 1st of January
ts1.add("2021-01-01", 21.5)
print json(ts1)
```

This displays:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {},
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```

If we try to add a value for the 2nd of January, we will get an error message because that is a Saturday and our calendar won’t allow it, e.g

```js
ts1.add("2021-01-02", 21.5)

[9001]  Index: 2021-01-02 does not align with calendar: BUSINESS
```

We can add a value for the following Tuesday and the calendar automaticall understands that you have missed a value for the Monday which it expected, e.g.

```js
ts1.add("2021-01-05", 21.7)
print json(ts1)
```

Which displays:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {},
      "_type": "TimeValue",
      "_links": {}
    },
    {
      "time": "2021-01-04",
      "value": "NaN",
      "status": {},
      "_type": "TimeValue",
      "_links": {}
    },
    {
      "time": "2021-01-05",
      "value": 21.700000,
      "status": {},
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```

Notice how it displays “NaN” for the 4th of January to show that we are missing a value for that day.

### Setting Value Statuses

We can add some context about an observation by adding some status information. Status information is categorised as follows:

*   Quality    
*   Source    
*   Reliability
    

#### Quality Status

The quality status defines whether the value of the observation is deemed to to be representative of the TimeSeries at that point in time, so a missing value or a value that is much higher or lower than the other observations around it would be deemed to be of bad quality.

The states of the quality status are:

*   Unchecked (default)  
*   Valid
*   Failed
    

#### Source Status

The source status defines where the value came from. This documents the provenance of the observations in the TimeSeries, for example if we fill in some gaps with an interpolation algorithm or create a value based on the values from other TimeSeries etc.

The states of the source status are:

*   New (default)
*   Changed
*   Implied
*   Filled
*   Converted
*   Calculated
    

#### Reliability Status

The reliability status is used for regulatory reporting regarding the trustworthiness of the observation if it is used for accounting purposes.

The states of the reliability status are:

*   Unknown (default)   
*   Quoted
*   Observed
*   Unobserved
    

#### Examples

##### Setting the status when the value is added

```js
// Setting the status when the value is added
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5, ["Valid", "Calculated"])
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {
        "quality": "VALID",
        "source": "CALCULATED"
      },
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```

##### Setting the value on an observation in a TimeSeries

```js
// Setting the status on a value
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)
ts1["2021-01-01"].status.quality = "Valid"
print json(ts1)
```

##### Setting additional information

```js
// Setting the status and info on a value
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)
ts1["2021-01-01"].status.quality = "Valid"
ts1["2021-01-01"].status.quality.info = "Tested for missing and spikes"
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {
        "quality": "VALID:Tested for missing and spikes"
      },
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```

### Properties on TimeSeries

There are some standard properties on TimeSeries, but you can also add your own custom properties on a TimeSeries.

#### Standard properties

Standard Properties are:

*   currency   
*   units
*   timezone
*   tenor
*   source
*   description
    

Here is an example of setting these properties:

```js
// Standard properties
ts1 = TimeSeries("BUSINESS")
ts1.currency = "GBP"
ts1.units = "KG"
ts1.timezone = "Europe/London"
ts1.tenor = "SPOT"
ts1.source = "Trader A"
ts1.description = "My Timeseries"
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "My Timeseries",
  "start": "",
  "calendar": "BUSINESS",
  "currency": "GBP",
  "units": "KG",
  "timezone": "Europe/London",
  "tenor": "SPOT",
  "source": "Trader A",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": []
}
```

#### Custom properties

Adding custom properties is similar to adding properties to an Object, e.g.

```js
// Custom properties
ts1 = TimeSeries("BUSINESS")
ts1.name = "My TimeSeries"

// You can add any type of variable
ts1.geolocation = Point([51.51958, -0.12695])

// You can also nest properties
ts1.address = Object()
ts1.address.city = "London"
ts1.address.country = "England"
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {
    "address": {
      "_id": "address",
      "city": "London",
      "country": "England"
    },
    "geolocation": {
      "type": "Point",
      "coordinates": [
        51.51958,
        -0.12695
      ]
    },
    "name": "My TimeSeries"
  },
  "data": []
}
```

### TimeSeries operations and functions

You can perform mathematical operations and functions on TimeSeries, this section of the tutorial explorers some of the things you can do.

#### Operations

TimeSeries can be used in expressions involving other TimeSeries and scalars with the following operators:

*   + (add)   
*   - (subtract)    
*   / (divide)
*   * (multiply)
*   ^ (power)
    
#### Scalar operations

If operated on using a scalar, all observations of the TimeSeries will be operated on using that scalar, e.g.

```js
// Create a TimeSeries
t1 = TimeSeries("BUSINESS")

// Add some values
t1.add("2021-01-01", [21.5, 22.6, 23.5, 24.1])

// Create a new TimeSeries with the value 2 added to all values of t1
t2 = t1 + 2

// Display the values
print t2.values
```

Results:

```
[
2021-01-01	23.500000
2021-01-04	24.600000
2021-01-05	25.500000
2021-01-06	26.100000
]
```

#### TimeSeries operations

if operated on using another TimeSeries, only observations that are present at the same index in both TimeSeries are operated on, e.g.

```js
// Create a TimeSeries
t1 = TimeSeries("BUSINESS")

// Add some values
t1.add("2021-01-01", [21.5, 22.6, 23.5, 24.1])

// Create another TimeSeries
t2 = TimeSeries("BUSINESS")

// Add some values
t2.add("2021-01-01", [1.5, 2.6, 2.5])

// Add them together
t3 = t1 + t2

// Display the values
print t3.values
```

Results:

```
[
2021-01-01	23.0
2021-01-04	25.200000
2021-01-05	26.0
]

### Functions

There are various functions in OpenDataDSL that work with TimeSeries - all of them are listed [here].

#### Basic Statistics

In this tutorial we will take a look at some of the statistics functions which allow you to statistically analyse the observations of a TimeSeries.

```js
// Create a TimeSeries
t1 = TimeSeries("2021-01-01", "BUSINESS", [12.5,12.6,12.7,12.8,12.9])

// Print out some statistics
print min(t1)
print max(t1)
print mean(t1)
print geomean(t1)
print count(t1)
print sum(t1)
print sumsq(t1)
print stdev(t1)
print var(t1)
```

Results:

```
12.500000
12.900000
12.700000
12.699213
5
63.500000
806.550000
0.158114
0.025000
```

#### Regression

Some TimeSeries functions produce an object with multiple resultant values, and example of this is the [simpleRegression](/docs/odsl/function/statistics) function.

```js
// Create a TimeSeries
t1 = TimeSeries("2021-01-01", "BUSINESS", [12.5,12.6,12.7,12.8,12.9])

// Execute and print out the results of the simple regression
sr = simpleRegression(t1)
print sr
```
Results:

```json
{
  "_id": "sr",
  "properties": {
    "N": 5.0,
    "R": 0.961524,
    "RSquare": 0.924528,
    "XSumSquares": 1.58257152E11,
    "intercept": -1217.688679,
    "interceptStdErr": 202.961497,
    "meanSquareError": 0.002516,
    "regressionSumSquares": 0.092453,
    "significance": 0.009007,
    "slope": 1.0E-6,
    "slopeConfidenceInterval": 0.0,
    "slopeStdErr": 0.0,
    "sumOfCrossProducts": 120960.0,
    "sumSquaredErrors": 0.007547,
    "totalSumSquares": 0.1
  },
  "_version": {
    "version": 0,
    "tag": []
  },
  "_type": "VarObjectWrapper",
  "_links": {}
}
```

The individual values can be extracted simply using the name, e.g.

```js
print sr.intercept

> -1217.688679
```

