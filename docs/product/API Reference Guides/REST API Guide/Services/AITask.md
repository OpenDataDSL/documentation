---
title: AI Task Service
description: REST API for the Fusion AI playbook task service
slug: /api/rest/service/aitask
tags:
  - api
  - service
  - aitask
  - fusion-ai
  - playbooks
---
The AI task resource holds Fusion AI playbook tasks: a playbook with the values filled in for one piece of work, ready to run, or scheduled to run regularly. See [Running tasks](/docs/extensions/fusion-ai/playbooks/running).

## AI Task REST API

The AI Task REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/aitask
```

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List your tasks|
|GET|\{release\}/\{key\}|v1/weekly-ttf-review|Retrieve a task|
|POST|\{release\}|v1|Create or update a task, the task is the body of the POST request|
|DELETE|\{release\}/\{key\}|v1/weekly-ttf-review|Delete a task, and its schedule if it has one|

## Saving a task

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the task|String|
|playbook|The id of the playbook (required). Ids starting with # are library playbooks|String|
|version|The playbook version, defaults to the latest|Integer|
|values|The values for the playbook's inputs, by input name|Object|
|schedule|An optional schedule in the platform cron format: minute hour day-of-month month day-of-week year, and an optional timezone|String|
|enabled|False to pause a scheduled task|Boolean|
|owner|The owner of the task, defaults to you|String|

The platform checks the task against the playbook version and fills in the rest:

* The playbook must exist and have no errors, and each value must be an input of the playbook and suit it. Missing required values are allowed in a draft and checked when the task runs.
* `playbookName`, `fields`, `plan` and `outputs` are always taken from the playbook version.
* A task without a schedule is a draft (`status` draft). A task with a schedule is a template (`status` scheduled): it needs every required value, and it records you as `runAs`, because each scheduled run is a copy of the task run in the background as you.
* A task that has been run is the record of that run and cannot be changed. Save a copy to run it again.

## Examples

```js
### Run a playbook every Monday at 08:00 UK time
POST https://api.opendatadsl.com/api/aitask/v1
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "_id": "weekly-ttf-review",
  "playbook": "curve-review",
  "values": {"curve": "NGE.GAS.TTF:MID"},
  "schedule": "0 8 * * 1 * Europe/London"
}
```
