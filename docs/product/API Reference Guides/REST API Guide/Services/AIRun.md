---
title: AI Run Service
description: REST API for the Fusion AI playbook run service
slug: /api/rest/service/airun
tags:
  - api
  - service
  - airun
  - fusion-ai
  - playbooks
---
The AI run resource holds the record of each Fusion AI playbook run: its status, the steps it took, their checks and approvals, and the tokens it used. Runs are written by Fusion AI as a task runs; you can read them but not change them. See [Running tasks](/docs/extensions/fusion-ai/playbooks/running).

## AI Run REST API

The AI Run REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/airun
```

Runs belong to your tenant.

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}|v1|List playbook runs|
|GET|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Retrieve a run|
|DELETE|\{release\}/\{key\}|v1/6721f0c2a4b9e85d3c0f1a77|Delete a run record, if your policies allow it (the FusionAIRuns policy installed with Fusion AI is read only)|

A POST to this service is always rejected: runs are written by the Fusion AI backend.

## Entities

### Run

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the run|String|
|playbook|The id of the playbook that was run|String|
|user|The person who started the run|String|
|status|running, awaiting_approval, done, failed, rejected, cancelled or stopped|String|
|mode|interactive or background|String|
|steps|Each step's result, checks, approvals and error|Object[]|
|outputs|The outputs of the run|Object|
|tokens|The billed tokens the run used|Integer|
|maxTokens|The most tokens the run was allowed|Integer|
|error|Why a failed or stopped run ended|String|
|scheduledFrom|For a scheduled run: the task it was copied from|String|
|_created|When the run started|DateTime|

## Examples

```js
### Failed runs this month
GET https://api.opendatadsl.com/api/airun/v1
    ?_filter={"status":"failed"}
    &_sort={"_created":-1}
Authorization: Bearer {{token}}
```
