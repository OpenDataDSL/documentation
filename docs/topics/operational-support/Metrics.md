---
slug: /odsl/os/metrics
sidebar_position: 2
title: Metrics
description: Creating and using metrics to monitor the platform
tags:
- operations
- metrics
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

There are various metrics that are captured as you use the platform which can be used to help you investigate issues and pro-actively ensure that issues are caught as early as possible.

## Metric Providers

Metric providers represent a specific source of stored metrics, at present these are:

* **ODSLRequest**
> Metrics for every API request made to the platform
* **ODSLProcess**
> Metrics for process executions
* **AzureServiceBus**
> Metrics for the messaging subsystem

### ODSLRequest
With every API call to the platform, irrespective of the calling application, a metric record is stored capturing key information about the call.

#### Metrics

The following metrics are available:

|**Name**|**Description**|
|-|-|
|ReadRequestResponseSize|The size of the response returned to the client in bytes|
|ReadRequestDuration|The duration in milliseconds of the call|
|ReadRequests|The count of read requests|
|WriteRequests|The count of write requests|
|DeleteRequests|The count of delete requests|

#### Field Filters

The following fields are available to filter on:

|**Name**|**Description**|
|-|-|
|service|The name of the REST service, e.g. data|
|key|The id of the item in the request|
|action|The actual action performed by the request, e.g. list|
|application|The application making the request, e.g. portal|
|httpstatus|The HTTP status number of the request|
|user|The user id or email address of the user making the request|

### ODSLProcess
You can query the metrics stored for every process execution.

#### Metrics

The following metrics are available:

|**Name**|**Description**|
|-|-|
|RunRequests|The count of the number of process executions|
|RunRequestDuration|The overall duration in milliseconds of the call|

#### Field Filters

The following fields are available to filter on:

|**Name**|**Description**|
|-|-|
|name|The name of the process|
|trigger|The trigger for the process execution, e.g. scheduled|
|status|The final status of the process execution, e.g. success|

### AzureServiceBus

#### Metrics

The following metrics are available:

|**Name**|**Description**|
|-|-|
|SuccessfulRequests|Successful requests|
|ServerErrors|Server errors|
|UserErrors|User errors|
|ThrottledRequests|Throttled requests|
|IncomingRequests|Incoming requests|
|IncomingMessages|Incoming messages|
|OutgoingMessages|Outgoing messages|
|ActiveConnections|Active connections|
|ConnectionsOpened|Connections opened|
|ConnectionsClosed|Connections closed|
|Size|Size of an Queue/Topic in Bytes|
|Messages|Count of messages in a Queue/Topic|
|ActiveMessages|Count of active messages in a Queue/Topic|
|DeadletteredMessages|Count of dead-lettered messages in a Queue/Topic|
|ScheduledMessages|Count of scheduled messages in a Queue/Topic|
|CompleteMessage|Count of messages completed on a Queue/Topic|
|AbandonMessage|Count of messages abandoned on a Queue/Topic|
|PendingCheckpointOperationCount|Pending Checkpoint Operations Count|
|ServerSendLatency|Latency of Send Message operations for Service Bus resources|
|ReplicationLagDuration|Replication lag by time duration in seconds|
|ReplicationLagCount|Replication lag by message count|

#### Field Filters

The following fields are available to filter on:

|**Name**|**Description**|
|-|-|
|queue|The name of the queue|

## Using Metrics

Metrics can be extracted as timeseries and can be either:

* Used dynamically by passing in configuration information
* Used as a regular timeseries by saving the configuration as a MetricTimeSeries

### Dynamic metric timeseries

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
// Get the average duration of read requests for object AAA
mts = metric("ODSLRequest/ReadRequestDuration", "#PT15M", "averaged", "between(T-1Dh0m0s0,T-1Dh23m59s59)", ?service='object' and key='AAA')
print mts

// Get the total number of run requests for all processes
mts = metric("ODSLProcess/RunRequests", "#PT15M", "summed", "between(T-1Dh0m0s0,T-1Dh23m59s59)")
print mts
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
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

### Virtual metrics for calendar
GET https://api.opendatadsl.com/api/calendar/v1/public/%23HENG
	?_metric=ODSLRequest/ReadRequests
  	&_calendar=%23PT1H
  	&_observed=summed
  	&_range=from(2024-11-20)
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>


### Stored metric timeseries

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
cal = ${calendar:"#PT1H"}

AAA = Object()
AAA.id = "ODSL.METRICS.REQUEST"
AAA.name = "ODSL request metrics"

// Create a metric timeseries to sum up all requests to the user service
ReadRequests_1h = MetricTimeSeries("ODSLRequest", "ReadRequests")
ReadRequests_1h.calendar = cal
ReadRequests_1h.observed = "summed"
ReadRequests_1h.filter = ?service='user'
AAA.ReadRequests_1h = ReadRequests_1h

// Create a metric timeseries average the active messages in the etrm queue
ActiveMessages = MetricTimeSeries("AzureServiceBus", "ActiveMessages")
ActiveMessages.calendar = cal
ActiveMessages.filter = ?queue='etrm'
ActiveMessages.observed="averaged"
AAA.ActiveMessages = ActiveMessages

save AAA
```

</TabItem>
<TabItem value="rest" label="REST API">

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

</TabItem>
</Tabs>
