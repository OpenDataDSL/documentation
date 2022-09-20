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

```json
https://api.opendatadsl.com/service/metric
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}|v1|List metrics|
|GET|{release}/{key}|v1/001f87a5-2927-4efc-96cd-e2ab2f20b088|Retrieve a single metric using it’s unique id|

## Entities

### Metric Entity

The metric entity contains the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the metric|String|
|type|The type of metric - usually one of api, message, process, storage or subscription|String|
|timestamp|The UTC timestamp of when the metric was taken|String(Date/Time)|
|detail|A description of what the metric is|String|
|value|The value of the metric|Long|
|user|The user id or tenant id of the instigator of the metric|String|
|tid|The tenant id|String|
|tenant|The internal tenant name|String|
|application|The application supplying the metric|String|
|environment|The environment the metric was taken from|String|