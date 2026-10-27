---
title: MetricTimeSeries
description: A Metric TimeSeries dynamically pulls metrics from a metric provider
slug: /odsl/variable/metrictimeseries
tags:
- timeseries
- metrictimeseries
---

## Introduction
Metric Timeseries represent a timeseries of metrics from various metric providers.

A metric timeseries consists of the following:

### Provider
The name of the metric provider

### Metric
The name of the metric to read from the provider

:::info
See [Metrics](/docs/it/metrics) for full details on providers and metric names
:::

### Filter
An optional filter to filter the metrics in the value calculation

### Calendar
This is the interval frequencies for value aggregation, usually one of:

* #PT1M - 1 minutely
* #PT5M - 5 minutely
* #PT15M - 15 minutely
* #PT30M - 30 minutely
* #PT1H - hourly
* #PT6H - 6 hourly
* #PT12H - 12 hourly
* #P1D - daily

### Observed
The aggregation method, usually one of:

* summed - Sum up all the values for the interval
* averaged - Average the values for the interval
* high - The maximum value during the interval
* low - The minimum value during the interval

## Creating a MetricTimeSeries

### Azure Service Bus Metrics
An example of creating a metric timeseries for the average number of active messages on a queue named etrm aggregated 5 minutely
```js
ActiveMessages_1h = MetricTimeSeries("AzureServiceBus", "ActiveMessages")
ActiveMessages_1h.calendar = ${calendar:"#PT5M"}
ActiveMessages_1h.queue = "etrm"
ActiveMessages_1h.observed="averaged"
```

### ODSL User Request Metrics
An example of creating metric timeseries  for the total user read requests for the service 'user' aggregated hourly 
```js
ReadRequests_1h = MetricTimeSeries("ODSLRequest", "ReadRequests")
ReadRequests_1h.calendar = ${calendar:"#PT1H"}
ReadRequests_1h.observed = "summed"
ReadRequests_1h.filter = ?service='user'
```

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|calendar|The calendar that this timeseries uses|Calendar|
|currency|The ISO currency of this timeseries|String|
|description|The description of this timeseries|String|
|filter|Filter the metrics|String|
|identity|The configured identities|Object|
|localValues|The list of time observations for this timeseries, returned as a list of TimeValues in the local timezone of this TimeSeries|List|
|metric|The name of the metric|String|
|name|The name of the timeseries|String|
|observations|The list of values for this timeseries, returned as a list of Vars|List|
|observed|The observed setting of the timeseries used for aggregating|TimeSeriesObserved|
|precision|The precision configuration for this timeseries|Precision|
|provider|The name of the metric provider|String|
|source|The source of this timeseries|String|
|start|The starting date/time of the timeseries|Date|
|tenor|The tenor of this timeseries|String|
|timezone|The timezone of this timeseries, defaults to UTC|String|
|units|The ISO units of this timeseries|String|
|valueType|The value type of the timeseries (TRACKED or BASIC)|TimeValueType|
|values|The list of time observations for this timeseries, returned as a list of TimeValues|List|

## Methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|addCheck(check)|Add a quality check directly to this Timeseries|TimeSeries|
|addValue(value)|Adds a new value to the end of the timeseries using the calendar|TimeSeries|
|applyPrecision()|Apply the precision defined to all the observations of this timeseries|Void|
|convert(currency, units)|Convert this timeseries using currency and units|TimeSeries|
|from(start)|Creates a new TimeSeries from a specified start date|TimeSeries|
|getLast(date)|Get the value at the supplied date or the latest value before that date|Var|
|getLastNValues(n)|Returns a list of the last N values from this TimeSeries|List|
|last(n)|Creates a new TimeSeries using the last n values from this TimeSeries|TimeSeries|
|range(start, end)|Creates a new TimeSeries from a range of values from this TimeSeries|TimeSeries|
|withRange(start, end)|Changes this timeseries to match the provided date range|Void|

