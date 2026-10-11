---
slug: /odsl/os/alerts
title: Alerts 🆕
description: Creating and using alerts for pro-active monitoring
tags:
- operations
- alerts
- topics
- new
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

Alerts are issues that happen outside the scope of user interaction.

The following alert types are defined in the platform:

|Type|Description|
|-|-|
|MetricAlert|User definable metrics that alert you when a threshold has been breached|
|DatasetAlert|Both system generated alerts about late or bad quality data and manually curated messages about datasets|
|SystemAlert|Issues raised by the platform about incorrect configuration or general issues|
|ServiceAlert|Service specific alerts that are raised by the system|

## Alerts and Alert Records
An alert is the configuration information for an alert type whereas an alert record is an actual alert that been raised against an alert type.

### Alert Configuration
The configuration of an alert is alert type specific as defined in this section.

#### MetricAlert
A MetricAlert has the following properties:

|Name|Type|Description|
|-|-|-|
|id|uid|Unique id for this alert|
|type|String|Always MetricAlert|
|name|String|The unique name of this MetricAlert|
|description|String|A description of this alert|
|impact|String|The default impact of this alert|
|checkFrequency|String|How often to test the metric to see if it has breached the threshold, e.g. 15m|
|metric|String|The name of the [metric](/docs/odsl/os/metrics) in the format provider/metric|
|lookback|String|The duration to look back to aggregate the metrics, e.g. 5m|
|observed|String|The aggregation method, e.g. summed|
|operator|String|The operator to use to check the threshold, one of gt, gte, lt, lte|
|absoluteThreshold|Double|The absolute threshold to validate against|
|dynamicThresholdFunction|String|The threshold function to use if calculating a dynamic threshold, one of min, max, mean, median|
|dynamicThresholdRange|String|The range to calculate the dynamic threshold, usually a between function|
|filter|String (json)|An optional filter used to filter the metrics|

#### DatasetAlert
A DatasetAlert has the following properties:

|Name|Type|Description|
|-|-|-|
|id|uid|Unique id for this alert|
|type|String|Always MetricAlert|
|name|String|The unique name of this MetricAlert|
|description|String|A description of this alert|
|impact|String|The default impact of this alert|
|dsid|String|The dataset id|

#### SystemAlert
A SystemAlert has the following properties:

|Name|Type|Description|
|-|-|-|
|id|uid|Unique id for this alert|
|type|String|Always MetricAlert|
|name|String|The unique name of this MetricAlert|
|description|String|A description of this alert|
|impact|String|The default impact of this alert|

#### ServiceAlert
A ServiceAlert has the following properties:

|Name|Type|Description|
|-|-|-|
|id|uid|Unique id for this alert|
|type|String|Always MetricAlert|
|name|String|The unique name of this MetricAlert|
|description|String|A description of this alert|
|impact|String|The default impact of this alert|
|service|String|The name of the service|
|key|String|An optional key for alerts about a specific entity within the service|

## Getting notified about alerts
To be notified when something goes wrong, create an automation on the event that raises the alert. For example, a dataset alert is raised when a dataset is late or missing, so an automation on those dataset events sends you a notification at the same time.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL">

```js
ab = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB")
ab.addCondition("late")
ab.addCondition("missing")
ab.setTarget("email")
ab.setProperty("to", "user@opendatadsl.com")
ab.setProperty("subject", "ALERT: ICE.NDEX.NLB")
ab.enabled = true
save ${automation:ab}
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/automation/v1
Authorization: Bearer {{token}}

{
  "target": "email",
  "enabled": true,
  "conditions": [
    { "service": "dataset", "action": "late", "id": "ICE.NDEX.NLB", "source": "private" },
    { "service": "dataset", "action": "missing", "id": "ICE.NDEX.NLB", "source": "private" }
  ],
  "properties": {
    "to": "user@opendatadsl.com",
    "subject": "ALERT: ICE.NDEX.NLB"
  }
}
```

</TabItem>
</Tabs>

See [Creating Automations](/docs/topics/automations/creating) for more examples, including sending notifications to Microsoft Teams.
