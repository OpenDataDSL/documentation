---
title: Crontab Service
description: REST API for the schedule (crontab) service
slug: /api/rest/service/crontab
tags:
  - api
  - service
  - crontab
  - schedule
---
The crontab resource lists the schedules that run in your current data environment: processes, curve build snapshots, alerts, Fusion AI agents and scheduled playbook tasks. It is read-only: schedules are created when you save the item that has the schedule, for example a process with a `cron`.

## Crontab REST API

The Crontab REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/crontab
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your schedules|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a schedule|

## Entities

### Schedule

|**Name**|**Description**|**Type**|
|-|-|-|
|name|What is scheduled: the process name, `playbook:` plus the task id, the agent id, or `AlertCheck-` plus the check frequency|String|
|type|process, curve, playbook, agent or alert|String|
|minute, hour, dom, month, dow, year|The parsed schedule|Array|
|tz|The timezone of the schedule, defaults to UTC|String|
|environment|The data environment it runs in|String|
|job|The job that runs it, if not the default|String|

Schedules are written in the platform cron format: minute hour day-of-month month day-of-week year, with an optional timezone. See [Cron](/docs/kb/cron). Each time a schedule fires it is logged in the [Crontab Log service](./crontablog).
