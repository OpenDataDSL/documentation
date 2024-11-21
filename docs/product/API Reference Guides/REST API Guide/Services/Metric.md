---
title: Metric Service
description: REST API for the metric service
slug: /api/rest/service/metric
tags:
  - api
  - service
  - metric
---
The metric resource contains all the usage metrics we gather for billing purposes

## Metric REST API

The Metric REST API is a read-only API allowing you to search and filter metrics. 
It is accessed through the following URL:

```js
https://api.opendatadsl.com/api/metric
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List metrics|
|GET|{release}/{key}|v1/673db77858834c6a164edfd7|Retrieve a single metric using it’s unique id|

## Functions
|**Function**|**Description**|
|-|-|
|listMetrics|List available metrics for a provider (you must supply a ```provider``` query parameter)|

### Examples

```js
### List metricnames
GET https://api.opendatadsl.com/api/metric/v1
	?_function=listMetrics
	&provider=AzureServiceBus
Authorization: Bearer {{token}}

### List metricnames
GET https://api.opendatadsl.com/api/metric/v1
	?_function=listMetrics
	&provider=ODSLRequest
Authorization: Bearer {{token}}
```

## Entities

### Metric Entity

The metric entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the metric|String|
|action|The action performed|String|
|application|The application supplying the metric|String|
|detail|A description of what the metric is|String|
|duration|The execution time of the request in ms|Long|
|environment|The environment the metric was taken from|String|
|httpstatus|The HTTP status code sent for the response to this request|Integer|
|invocationId|The id of the invocation of this request|String|
|method|The HTTP method of the request, usually 'get'|String|
|responseSize|The size of the response sent back to the caller in bytes|Long|
|service|The name of the REST service called|String|
|timestamp|The UTC timestamp of when the metric was taken|DateTime|
|type|The type of metric - usually one of api, message, process, storage or subscription|String|
|user|The user id or tenant id of the instigator of the metric|String|
|value|The value of the metric|Long|

## Metric Timeseries
You can add a Metric Timeseries to a master data record which can aggregate metrics from a provider into a timeseries.

Here are the properties of a Metric TimeSeries

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the TimeSeries|String|
|_type|The type of the entity - always VarMetricTimeSeries|String|
|provider|The name of the metric provider|String|
|metric|The name of the metric to read|String|
|name|The name of the TimeSeries|String|
|description|A description of the TimeSeries|String|
|calendar|The code for the calendar that you want to aggregate the metrics to|String|
|observed|The aggregation method you want to use; one of summed,averaged,high,low,beginning,end|String|

### Example

```js
### Create a metric timeseries
POST https://api.opendatadsl.com/api/object/v1
Authorization: Bearer {{token}}

{
	"_id":"AAA",
	"PROCESS_RUNS_HOURLY": {
		"_id": "PROCESS_RUNS_HOURLY",
		"_type": "VarMetricTimeSeries",
		"provider": "ODSLProcess",
		"metric": "RunRequests",
		"calendar": "#PT1H",
		"observed": "summed"
	}
}
```

## Virtual Metric Timeseries

You can create a Metric Timeseries on-the-fly to aggregate metrics into timeseries using the ```_metric``` query parameter and the metric provider: ```ODSLRequest```

### Available Metrics

The following metrics are available:

* ReadRequests - A count of the read requests
* ReadRequestDuration - The request durations in ms
* ReadRequestResponseSize - The response size in bytes
* WriteRequests - A count of the write requests
* DeleteRequests - A count of the delete requests

### Metric query parameter

The ```_metric``` query parameter takes the format provider/metric, e.g. ```ODSLRequest/ReadRequests```.

### Other parameters

The other query parameters that can be used with the ```_metric``` query parameter are:

* _calendar - The calendar to aggregate the data to
* _observed - The aggregation method used for the values, can be one of averaged, sum, high, low, beginning or end
* _range - A range query to limit the range of data
* _filter - Used to filter the metrics used in the aggregation, e.g. {"application":"api"}

### Examples

```js
### Virtual metrics for a specific calendar
GET https://api.opendatadsl.com/api/calendar/v1/public/%23HENG
	?_metric=ODSLRequest/ReadRequests
  	&_calendar=%23PT1H
  	&_observed=summed
  	&_range=from(2024-11-20)
Authorization: Bearer {{token}}

### Virtual metrics for the calendar service
GET https://api.opendatadsl.com/api/calendar/v1/private
	?_metric=ODSLRequest/ReadRequests
  	&_calendar=%23PT1H
  	&_observed=summed
  	&_range=from(2024-11-20)
Authorization: Bearer {{token}}

### Virtual metrics for a specific object
GET https://api.opendatadsl.com/api/object/v1/private/ICE.NDEX.NLB
  	?_metric=ODSLRequest/ReadRequests
	&_calendar=%23PT1H
	&_observed=summed
	&_range=2024-11-20
Authorization: Bearer {{token}}

### Virtual metrics for object service
GET https://api.opendatadsl.com/api/object/v1
  	?_metric=ODSLRequest/ReadRequests
	&_calendar=%23PT1H
	&_observed=summed
	&_range=between(T-1Dh0m0s0,T-1Dh23m59s59)
Authorization: Bearer {{token}}

### Virtual metrics for object service filtered by application
GET https://api.opendatadsl.com/api/object/v1
  	?_metric=ODSLRequest/ReadRequests
	&_calendar=%23PT1H
	&_observed=summed
	&_range=between(T-1Dh0m0s0,T-1Dh23m59s59)
	&_filter={"application":"api"}
Authorization: Bearer {{token}}

### Virtual metrics for request durations of the object service
GET https://api.opendatadsl.com/api/object/v1
  	?_metric=ODSLRequest/ReadRequestDuration
	&_calendar=%23PT1H
	&_observed=averaged
	&_range=between(T-1Dh0m0s0,T-1Dh23m59s59)
Authorization: Bearer {{token}}

### Virtual metrics for highest response sizes for the data service
GET https://api.opendatadsl.com/api/data/v1/private
  	?_metric=ODSLRequest/ReadRequestResponseSize
	&_calendar=%23PT1H
	&_observed=high
	&_range=between(T-1Dh0m0s0,T-1Dh23m59s59)
Authorization: Bearer {{token}}
```