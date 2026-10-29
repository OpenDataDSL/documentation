---
title: Alert Service
description: REST API for the alert service
slug: /api/rest/service/alert
tags:
  - api
  - service
  - alert
---
The alert resource holds alerts: problems with your data, raised by the platform (a late or incomplete dataset delivery, a failed quality check, a curve that did not build) or by people. An alert stays open until it is closed with a resolution, is always with someone (your team, OpenDataDSL or a data vendor), and keeps a timeline of everything that happened to it. See the [Alerts extension](/docs/extensions/alerts/overview) for the screen and how alerts work.

## Alert REST API

The Alert REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/alert
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|v1/private|List alerts. Lists do not include the timeline|
|GET|\{release\}/\{source\}/\{id\}|v1/private/ALR-2026-000401|Retrieve an alert with its timeline|
|POST|\{release\}/\{source\}|v1/private|Raise an alert. An open alert with the same key counts another occurrence instead|
|POST|\{release\}/\{source\}|v1/private|With the alert's `_id` in the body: change that alert, as PATCH does|
|PATCH|\{release\}/\{source\}/\{id\}|v1/private/ALR-2026-000401|Change the status, resolution, agent, severity, title, description, assignee or tags, optionally with a comment|
|POST|\{release\}/\{source\}/\{id\}/comment|v1/private/ALR-2026-000401/comment|Add a comment|
|PATCH|\{release\}/\{source\}/\{id\}/comment/\{entry\}|v1/private/ALR-2026-000401/comment/2|Edit a comment|
|DELETE|\{release\}/\{source\}/\{id\}/comment/\{entry\}|v1/private/ALR-2026-000401/comment/2|Delete a comment|
|DELETE|\{release\}/\{source\}/\{id\}|v1/private/ALR-2026-000401|Delete an alert (administrators only)|

Sources:

|**Source**|**Alerts**|
|-|-|
|private|Your company's alerts, in the data environment of the request (send `x-odsl-environment` for an environment other than production). Ids start `ALR-`|
|common|Shared alerts about common data, ids start `ALC-`|
|public|Shared alerts about public data, ids start `ALP-`|

Only OpenDataDSL can raise and change shared alerts. You can comment on them: your comments are only seen by your company and OpenDataDSL.

Changes take the `_version` you read: if the alert has changed since, the request is refused with HTTP 409.

Automations can be set on alerts with the actions raised, closed, reopened, agent, severity and comment. See [Notifications and automations](/docs/extensions/alerts/automations).

## Entities

See the [Alerts reference](/docs/extensions/alerts/reference#alert-fields) for the fields of an alert and its timeline entries, and the [Alerts REST API](/docs/extensions/alerts/rest-api) for examples.
