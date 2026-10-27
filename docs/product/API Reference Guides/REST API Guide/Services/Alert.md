---
title: Alert Service
description: REST API for the alert service
slug: /api/rest/service/alert
tags:
  - api
  - service
  - alert
---
The alert resource holds alert definitions: the conditions that raise an alert, for example a metric crossing a threshold or a dataset arriving late. Each time an alert is raised or closed, an [alert record](./alertrecord) is written.

## Alert REST API

The Alert REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/alert
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/private|List alert definitions|
|GET|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Retrieve an alert definition|
|POST|\{release\}/\{source\}|v1/private|Create or update an alert definition. An existing alert with the same type and name is updated|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Delete an alert definition|

Automations can be set on alerts with the actions raised and closed.

## Entities

### Alert

Every alert has a `type` and a `name`. The other fields depend on the type:

|**Type**|**Required fields**|**Description**|
|-|-|-|
|MetricAlert|name, metric, observed, operator, checkFrequency, lookback, and either absoluteThreshold or dynamicThresholdFunction with dynamicThresholdRange|Checks a platform metric on a schedule|
|DatasetAlert|name, dsid|An alert about a dataset|
|ServiceAlert|name, service|An alert about a platform service|
|SystemAlert|name|An alert raised by OpenDataDSL that you can follow|

For a MetricAlert:

|**Name**|**Description**|
|-|-|
|metric|The metric to check|
|observed|How the metric is observed over the lookback: summed, averaged, beginning, end, high or low|
|operator|How it is compared with the threshold: gt, gte, lt or lte|
|checkFrequency|How often to check: 1m, 5m, 10m, 15m, 30m, 1h, 4h, 8h, 12h, 1D or 1M. The platform sets the `cron` from it|
|lookback|The period to look back over, as a duration|
|absoluteThreshold|A fixed threshold|
|dynamicThresholdFunction|min, max, mean, median or stdev of the metric over the dynamicThresholdRange, used as the threshold|
|impact|critical, high, medium (the default) or low|
