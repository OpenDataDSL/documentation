---
slug: /odsl/variable/alert
title: Alert and AlertRecord
tags:
- alert
---

# Alert and AlertRecord

An **Alert** defines the conditions that raise an alert, and an **AlertRecord** is an alert that has been raised. Both are flexible objects: set any properties the alert type needs. See the [Alert](/docs/api/rest/service/alert) and [Alert Record](/docs/api/rest/service/alertrecord) services for the fields of each alert type.

## Construction

|**Function**|**Description**|
|-|-|
|Alert(name)|Creates a new Alert|
|AlertRecord(name, type)|Creates a new Alert Record|
|SystemAlert(name)|Creates a new System Alert|
|SystemAlertMessage(message)|Creates a new System Alert Record sent to the #SYSTEM.MESSAGE alert with the provided message|
|SystemAlertRecord(name)|Creates a new System Alert Record|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|name|The name of the alert|String|
|type|The alert type: DatasetAlert, MetricAlert, ServiceAlert or SystemAlert|String|
|issue|What the problem is (alert records)|String|
|message|The message for the alert (alert records)|String|
|impact|critical, high, medium or low (alert records)|String|
|status|open or closed (alert records)|String|

## Example

```js
// Raise an alert record about a late dataset
rec = AlertRecord("ICE.NDEX.NLB", "DatasetAlert")
rec.ondate = "2026-10-23"
rec.issue = "late"
rec.message = "The settlement prices have not arrived"
rec.impact = "high"
save ${alertrecord:rec}
```
