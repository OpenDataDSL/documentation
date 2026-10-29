---
slug: /odsl/variable/alert
title: Alert
tags:
- alert
---

# Alert

An **alert** is a problem with your data, such as a late dataset delivery or a failed quality check. In ODSL an alert is an object read from the [alert service](/docs/odsl/service/alert): change its fields and save it to change the alert. To raise an alert, save a `SimpleObject` with at least a `title`.

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|The alert id, such as ALR-2026-000401 (ALC- common, ALP- public)|String|
|title|Short description|String|
|message|What is wrong|String|
|description|More detail|String|
|category|A grouping, such as dataset or curve|String|
|issue|The type, such as delivery, completeness, quality, build or export|String|
|severity|critical, high, medium or low|String|
|status|open or closed|String|
|agent|Who it is with: client (your team), opendatadsl or a data vendor's name|String|
|subject|What it is about: service, id and ondate|Object|
|key|The id of the problem, used to count repeats|String|
|occurrences|How many times it was raised while open|Int|
|resolution|What was wrong and what was done|String|
|comment|Set to add a comment when saving|String|
|tags|Your own labels|List|
|timeline|Everything that happened to the alert|List|
|_version|The version read, checked when saving|Int|

See the [Alerts reference](/docs/extensions/alerts/reference) for every field.

## Example

```js
// Raise an alert about a stale broker feed
n = SimpleObject()
n.title = "NGE.BROKER.NBP prices look stale since Monday"
n.severity = "high"
n.issue = "quality"
n.subject = SimpleObject()
n.subject.service = "dataset"
n.subject.id = "NGE.BROKER.NBP"
n.key = "northgate/stale/NGE.BROKER.NBP"
save ${alert:n}

// Close an alert
a = ${alert:"ALR-2026-000402"}
a.status = "closed"
a.resolution = "Loader fixed; file reloaded at 10:15"
save ${alert:a}
```
