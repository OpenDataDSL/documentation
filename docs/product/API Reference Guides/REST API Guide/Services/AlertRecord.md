---
title: Alert Record Service
description: REST API for the alert record service
slug: /api/rest/service/alertrecord
tags:
  - api
  - service
  - alertrecord
  - alert
---
The alert record resource holds the alerts that have been raised: one record per issue, open until it is closed, with a timeline of what happened.

## Alert Record REST API

The Alert Record REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/alertrecord
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/all  v1/private|List alert records. The default source is all, which includes the public system alerts|
|GET|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Retrieve an alert record|
|POST|\{release\}/\{source\}|v1/private|Raise, update or close an alert record|
|DELETE|\{release\}/\{source\}/\{key\}|v1/private/6721f0c2a4b9e85d3c0f1a77|Delete an alert record|
|DELETE|\{release\}/\{source\}?_bulk=true&_filter=...|v1/private?_bulk=true&_filter=\{"status":"closed"\}|Delete the records that match the filter|

When you list records with a filter on type DatasetAlert, only the alerts for your own datasets are returned.

## Entities

### Alert record

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the record|ObjectId|
|key|A readable key for the record|String|
|type|DatasetAlert, MetricAlert, ServiceAlert or SystemAlert (required)|String|
|name|The name of the alert|String|
|issue|What the problem is|String|
|message|The latest message|String|
|impact|critical, high, medium (the default) or low|String|
|status|open (the default) or closed|String|
|ondate|The date the alert is about|String|
|origin|What raised the alert, defaults to the request origin|String|
|timestamp|When the record was last updated|DateTime|
|closed|When the record was closed|DateTime|
|timeline|A log of each update to the record|String[]|

Saving a record that matches an open record with the same type, name, ondate and issue updates that record and adds to its timeline, rather than creating a new one. For a DatasetAlert, the dataset delivery for the ondate is updated with the number of open alerts.
