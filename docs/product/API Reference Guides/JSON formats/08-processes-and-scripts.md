---
title: Processes and scripts
description: The JSON of processes, process executions, scripts, actions, workflows, transformers, extractors, batches, task tiles, queues and their logs
slug: /api/json/processes-and-scripts
sidebar_position: 8
tags:
  - api
  - json
  - process
  - script
---

# Processes and scripts

---

## Process

A process runs a script or a workflow, on demand or on a schedule. Service: [Process](/docs/api/rest/service/process) (`process/v1`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarProcess` |
| `name` | String | Yes | The process name. It is also the `_id` |
| `service` | String | No | A grouping for the process, for example `ETL`, defaults to `default` |
| `description` | String | No | A description |
| `script` | String | One of | The script the process runs |
| `workflow` | String | One of | The workflow the process runs |
| `cron` | String | No | The schedule, see [Cron](/docs/kb/cron) |
| `enabled` | Boolean | No | False to stop the schedule |
| `input` | Object | No | Values passed to the script or workflow |
| `properties` | Object | No | Your own information about the process |
| `settings` | Object | No | How and where the process runs, see below |
| `tags` | String[] | No | Tags used to find the process |
| `dataPackage` | Boolean | Output | True for a data package process |
| `processType` | String | Output | `Ristretto` |
| `runAs` | Object | Platform | The person whose access the process runs with: the person who saved it |
| `environment` | String | Platform | The data environment it was saved in |

### Settings

| **Field** | **Type** | **Default** | **What it is** |
|-|-|-|-|
| `job` | String | Your tenant's job | The Azure Batch job to run the process in |
| `batchAccount` | String | OpenDataDSL | A client batch account registered for your tenant. Needs `image` |
| `image` | String | | A container image to run instead of the standard runtime |
| `commandline` | String | Runs the ODSL process runner | The command line; `${taskid}` is replaced with the execution id |
| `maxTime` | String | `PT1H` | The longest the process can run, as a [duration](/docs/kb/duration) |
| `retention` | String | `PT10M` | How long the task files are kept after it ends |
| `retries` | Integer | 0 | Retries of a failed task |

```json
{
  "_type": "VarProcess",
  "name": "NGE_TTF_SETTLEMENT_LOADER",
  "service": "ETL",
  "description": "Loads the ICE Endex TTF settlement prices",
  "script": "northgate\\loaders\\ttf-settlement",
  "cron": "30 18 * * 1-5 * Europe/London",
  "enabled": true,
  "input": {"product": "TFM", "dataset": "ICE.NDEX.TFM"},
  "settings": {"maxTime": "PT30M", "retries": 1},
  "tags": ["gas", "ice"]
}
```

---

## Process execution

Each run of a process is recorded in the [Process execution service](/docs/api/rest/service/process-execution) (`process-exec/v1`). To run a process, POST `{"name": "NGE_TTF_SETTLEMENT_LOADER"}`, with values for the run in `body` (or `input`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The execution id |
| `name` | String | The process name |
| `service` | String | The process service |
| `environment` | String | The data environment |
| `trigger` | String | `scheduled`, `manual` or `automation` |
| `reason` | String | Why it ran |
| `runAs` | String | Who it ran as |
| `start`, `end` | DateTime | When it started and ended |
| `status` | String | `triggered`, `start`, `running`, `waiting`, `retrying`, `reschedule`, `failed`, `success` or `warning` |
| `message` | String | The latest message |
| `phases` | Array | For a workflow: each phase with `name`, `start`, `end`, `status`, `message` and `log` |
| `loaderMessage` | String | For a loader: the load summary |
| `data` | Object | For a loader: the data updated, by date, in `curves`, `series`, `events` and `matrix` |

```json
{
  "_id": "05f1ec1a-f2a1-4cba-87d4-b46e0f8e40b6",
  "service": "ETL",
  "name": "NGE_TTF_SETTLEMENT_LOADER",
  "environment": "production",
  "trigger": "scheduled",
  "status": "success",
  "message": "Completed Successfully",
  "start": "2026-11-18T18:30:07.858",
  "end": "2026-11-18T18:30:24.445",
  "runAs": "priya.shah@northgate-energy.com",
  "loaderMessage": "Updated 1 curve for 2026-11-18",
  "data": {
    "curves": {"2026-11-18": ["NGE.GAS.TTF:SETTLE"]},
    "series": {}
  }
}
```

---

## Script

Service: [Script](/docs/api/rest/service/script) (`script/v1/{source}`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The script id. Private ids often have folders separated by backslashes, for example `northgate\curves\build-spark-spreads` |
| `_type` | String | No | `VarScript` |
| `script` | String | Yes | The code, [Base64 encoded](./overview#encoded-scripts) |
| `scriptType` | String | No | The language: `odsl` (the default), `mustache`, `html`, `mermaid`, `python`, `javascript` and so on |
| `category` | String | No | A category. For ODSL, an `@category` tag in the first comment sets it |
| `description` | String | No | A description. For ODSL, taken from the first comment |
| `name` | String | No | For `html`, `mustache` and `mermaid` scripts, from an `@name` line in the first comment |
| `outputFormat` | String | No | For `html`, `mustache` and `mermaid` scripts, from an `@content` line: the content type the template makes |

```json
{
  "_id": "northgate\\curves\\build-spark-spreads",
  "_type": "VarScript",
  "scriptType": "odsl",
  "category": "curves",
  "description": "Builds the German clean spark spread",
  "script": "LyoqIEJ1aWxkcyB0aGUgR2VybWFuIGNsZWFuIHNwYXJrIHNwcmVhZCBAY2F0ZWdvcnkgY3VydmVzICovCg=="
}
```

---

## Action, workflow, transformer and extractor

These are compiled from ODSL scripts. Each has the source in `script`, Base64 encoded, plus:

| **`_type`** | **Service** | **Other fields** |
|-|-|-|
| `VarAction` | [Action](/docs/api/rest/service/action) | `category`, `description`, `inputs`, `outputs`, `exits` |
| `VarWorkflow` | [Workflow](/docs/api/rest/service/workflow) | `category`, `description`, `phases`, `inputs`, `outputs`, `exits` |
| `VarTransformer` | [Transformer](/docs/api/rest/service/transformer) | `category`, `description`, `transformer` (the compiled transformer) |
| `VarExtractor` | [Extractor](/docs/api/rest/service/extractor) | `category`, `description`, `extractor` (the compiled extractor) |

`inputs` and `outputs` are lists of arguments:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The argument name |
| `_type` | String | `VarArg` |
| `argType` | String | The variable type of the argument |
| `optional` | Boolean | True if the argument can be left out |
| `description` | String | A description |

`exits` is a list of the names of the action's or workflow's exit transitions, for example `["ok", "fail"]`, and `phases` the names of the workflow's phases.

---

## Batch

A batch saves many objects in one request. Service: [Batch](/docs/api/rest/service/batch) (`batch/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Yes | `VarBatch` |
| `_id` | String | No | An id for the batch |
| `elements` | Array | Yes | The [objects](./master-data#object) to save, each with its data |
| `name` | String | No | The name of the loader, shown in the summary |
| `service` | String | No | The service of the loader |
| `loader` | String | No | The loader |
| `correlationId` | String | No | An id to match the batch with your own records |
| `history` | Boolean | No | Load as history: faster, and no automations run |
| `fast` | Boolean | No | Fast mode |

```json
{
  "_type": "VarBatch",
  "name": "NGE_TTF_SETTLEMENT_LOADER",
  "elements": [
    {"_id": "NGE.GAS.TTF", "SETTLE": {"_type": "VarCurve", "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"}, "contracts": [{"tenor": "M01", "value": 42.15}]}},
    {"_id": "NGE.GAS.NBP", "SETTLE": {"_type": "VarCurve", "ondate": {"curveDate": "2026-11-18", "expiryCalendar": "#REOMHENG"}, "contracts": [{"tenor": "M01", "value": 104.30}]}}
  ]
}
```

Reading the Batch service returns batch summaries:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The batch id |
| `user` | String | Who sent it |
| `environment` | String | The data environment |
| `timestamp` | DateTime | When it was loaded |
| `service`, `name` | String | The loader |
| `reason` | String | Why it was loaded |
| `source` | String | The source it was loaded to |
| `status`, `message` | String | The result |
| `summary` | Object | What was loaded, by date: `curves`, `series`, `events`, `matrix` and `failures` |

---

## Task tile

A task tile is a task people start their day from, shown on the portal home page by the Home extension. Service: [Task](/docs/api/rest/service/task) (`task/v1`). Everyone in your company can read tiles; changing them needs a tenant admin.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The tile id, with at least one dot, for example `nge.home.check-overnight-loads` |
| `_type` | String | No | `VarTaskTile` |
| `name` | String | Yes | The task, up to 120 characters |
| `description` | String | No | More about it, up to 400 characters |
| `group` | String | No | `check`, `find`, `build`, `deliver` or another short name, defaults to `other` |
| `icon` | String | No | A Bootstrap icon name, defaults to `check2-square` |
| `priority` | Integer | No | 0 to 100, higher shows first, defaults to 50 |
| `featured` | Boolean | No | False to show it only under **See all tasks** |
| `enabled` | Boolean | No | False to hide it |
| `keywords` | String[] | No | Extra words the task search matches |
| `extension` | String | No | The extension that added the tile |
| `requires` | String[] | No | Only show the tile when these extensions are installed |
| `roles` | String[] | No | The roles the tile is suggested to |
| `target` | Object | No | What the tile opens: `{type: "view", extension, view, properties}`, `{type: "url", url, newTab}` or `{type: "portal", section, name, tabname}` |
| `alerts` | Object | No | Which open alerts badge the tile: `filter` (stored as JSON text), `sources`, `followedOnly`, `label`, `okLabel` |
| `properties` | Object | No | Anything else to keep with the tile |
| `created`, `createdBy`, `updated`, `updatedBy` | | Platform | When and by whom the tile was made and changed |

```json
{
  "_id": "nge.home.check-overnight-loads",
  "_type": "VarTaskTile",
  "name": "Check for overnight production issues",
  "description": "Failed, late or partial loads since the last close",
  "group": "check",
  "icon": "exclamation-triangle",
  "priority": 80,
  "featured": true,
  "enabled": true,
  "keywords": ["load", "failed", "late"],
  "roles": ["operations"],
  "target": {"type": "view", "extension": "odsl.alerts", "view": "Manage"},
  "alerts": {"filter": "{\"issue\": {\"$in\": [\"delivery\", \"completeness\"]}}", "sources": ["private"], "label": "issue", "okLabel": "All on time"}
}
```

:::note
The Task service used to keep personal to-do tasks (`VarTask`). Those are no longer listed by the service.
:::

---

## Queue

A message queue. Service: [Queue](/docs/api/rest/service/queue) (`queue/v1`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `queue` | String | Yes | The queue name: letters, numbers, `-`, `.` and `_`, starting and ending with a letter or number |
| `description` | String | No | A description |
| `retention` | String | No | How long messages are kept, as a [duration](/docs/kb/duration), defaults to `P14D` |
| `timeout` | String | No | How long a reader has to process a message, defaults to `PT1M`, at most `PT5M` |
| `handler` | String | No | What handles the messages |
| `_id`, `tid`, `tenant` | String | Platform | The full queue id and your tenant |

```json
{
  "queue": "nge-trades",
  "description": "Trades from the Northgate ETRM",
  "retention": "P7D",
  "timeout": "PT2M"
}
```

---

## Logs

These records are written by the platform and are read-only.

### Script log

[Script Log service](/docs/api/rest/service/scriptlog) (`scriptlog/v1`): one record per run of a script.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `script`, `scriptVersion`, `scriptType` | | The script that ran |
| `function`, `region`, `regionLine` | String | The function or region run, if any |
| `status` | String | `success`, `warning` or `failed` |
| `message` | String | A summary, or the error |
| `trigger` | String | What ran it |
| `log` | String[] | The log messages |
| `timestamp` | DateTime | When it ran |
| `invocationId`, `rootInvocationId` | String | The request that ran it, and the one that started the chain |

### Queue log

[Queue Log service](/docs/api/rest/service/queuelog) (`queuelog/v1`): one record per message sent to a queue, with `timestamp`, `queue`, `queueid`, `messageId`, `subject`, `size`, `contentType`, `contentId`, `trigger`, `origin`, `status`, `statusMessage`, `reason` and `invocationId`.

### Schedules and schedule log

[Crontab service](/docs/api/rest/service/crontab) (`crontab/v1`): the schedules that run in your data environment.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `name` | String | What is scheduled: a process name, `playbook:` and a task id, an agent id, or `AlertCheck-` and a frequency |
| `type` | String | `process`, `curve`, `playbook`, `agent` or `alert` |
| `minute`, `hour`, `dom`, `month`, `dow`, `year` | Array | The parsed schedule |
| `tz` | String | The timezone, defaults to UTC |
| `environment` | String | The data environment |
| `job` | String | The job that runs it, if not the default |

[Crontab Log service](/docs/api/rest/service/crontablog) (`crontablog/v1`): one record each time a schedule fires, with `name`, `event` (the schedule id), `trigger` (the time it fired for), `timestamp`, `environment` and `invocationId`.
