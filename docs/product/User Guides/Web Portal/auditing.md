---
title: Auditing
description: Auditing dashboard in the web portal
sidebar_position: 6
slug: /user/portal/auditing
tags:
  - portal
  - dashboard
  - audit
---
The auditing dashboard in the Web Portal allows you to drill-down into specific events that have happened by specific users or on specific entities.

## Layout
The auditing dashboard is a paged, filterable list of audit records in reverse time-order.

### Filtering
There is a top-level filter that allows you to show either public or private audit records, defaulting to private.

You can then filter on the following:
* Service
* Action
* User

## Audit Records
The following information is displayed for audit records:

|Name|Description|
|-|-|
|Service|The name of the service submitting the audit record|
|Action|The action that was performed|
|Time|The timestamp of when the action occurred|
|User|The email address of the user or the ID of the application that performed the action|
|Reason|The reason the action was taken|
|Description|A description of the audit record|
