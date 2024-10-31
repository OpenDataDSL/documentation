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

