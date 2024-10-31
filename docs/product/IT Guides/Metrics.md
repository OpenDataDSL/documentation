---
title: Metrics
description: IT guide to system metrics
slug: /it/metrics
sidebar_position: 3
tags:
- security
- metrics
---

## Introduction
Metrics allow you to monitor the activity and status of various resources that you use.

Metrics are provided by various providers, from which you can create virtual timeseries call [MetricTimeSeries](/docs/odsl/variable/metrictimeseries).


## Providers
This sections detail the metrics available from the providers.

### AzureServiceBus
Azure service bus queue message metrics.

#### Additional property - queue
The AzureServiceBus metric provider requires the name of the queue to which the metrics correspond to. 
See [this example](/docs/odsl/variable/metrictimeseries#azure-service-bus-metrics)

#### Metric names

|Name|Description|
|-|-|
|SuccessfulRequests|Successful Requests|
|ServerErrors|Server Errors|
|UserErrors|User Errors|
|ThrottledRequests|Throttled Requests|
|IncomingRequests|Incoming Requests|
|IncomingMessages|Incoming Messages|
|OutgoingMessages|Outgoing Messages|
|ActiveConnections|Total Active Connections|
|ConnectionsOpened|Connections Opened|
|ConnectionsClosed|Connections Closed|
|Size|Size of a Queue/Topic in Bytes|
|Messages|Count of messages in a Queue/Topic|
|ActiveMessages|Count of active messages in a Queue/Topic|
|DeadletteredMessages|Count of dead-lettered messages in a Queue/Topic|
|ScheduledMessages|Count of scheduled messages in a Queue/Topic|
|CompleteMessage|Count of messages completed on a Queue/Topic|
|AbandonMessage|Count of messages abandoned on a Queue/Topic|
|PendingCheckpointOperationCount|Pending Checkpoint Operations Count|
|ServerSendLatency|Latency of Send Message operations for Service Bus resources|
|ReplicationLagDuration|Replication lag by time duration|
|ReplicationLagCount|Replication lag by message count|

### ODSLRequests
ODSL user request metrics

#### Metric names

|Name|Description|
|-|-|
|ReadRequests|The number of read requests|
|WriteRequests|The number of write (create/update) requests|
|DeleteRequests|The number of delete requests|

