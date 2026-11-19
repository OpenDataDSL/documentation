---
title: Fusion AI
description: The JSON of Fusion AI agents, assistants, playbooks, tasks, runs, tools, conversations, usage and feedback
slug: /api/json/fusion-ai
sidebar_position: 12
tags:
  - api
  - json
  - fusion ai
---

# Fusion AI

These entities hold the work of [Fusion AI](/docs/extensions/fusion-ai/overview). Fields marked Platform are set for you when you save.

---

## Agent

A saved list of questions that Fusion answers in order, on demand or on a schedule. Service: [AI Agent](/docs/api/rest/service/aiagent) (`aiagent/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | The agent id |
| `name` | String | Yes | The name |
| `messages` | Array | Yes | The questions, in order, each `{"content": "..."}` |
| `cron` | String | No | A schedule, see [Cron](/docs/kb/cron) |
| `enabled` | Boolean | No | False to stop the schedule, defaults to true |
| `icon` | String | No | Defaults to `person-circle text-success` |
| `user`, `_user`, `tid`, `runAs` | | Platform | Who saved it, your tenant, and who scheduled runs act as |

```json
{
  "_id": "morning-gas-check",
  "name": "Morning gas check",
  "cron": "30 7 * * 1-5 * Europe/London",
  "messages": [
    {"content": "Did the ICE Endex TTF settlement prices arrive yesterday?"},
    {"content": "Summarise the change in the TTF front month over the last week"}
  ]
}
```

---

## Assistant

Service: [AI Assistant](/docs/api/rest/service/aiassistant) (`aiassistant/v1/{source}`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The assistant id |
| `name` | String | The name |
| `description` | String | What it is for. Fusion uses this to choose the assistant |
| `systemPrompt` | String | The instructions given to Fusion when it uses the assistant |
| `icon` | String | The icon |
| `model` | String | The Claude model, if not the default |
| `effort` | String | The effort level, if not the default |
| `onlyUseCustomTools` | Boolean | True to use only your custom tools |

```json
{
  "_id": "EPR",
  "name": "EPR Assistant",
  "icon": "recycle",
  "description": "Answers questions about extended producer responsibility obligations",
  "systemPrompt": "You help the Northgate compliance team with their EPR obligations..."
}
```

---

## Playbook

A playbook is a markdown document that describes a piece of work step by step. Service: [AI Playbook](/docs/api/rest/service/aiplaybook) (`aiplaybook/v1/{source}`), versioned.

To save a playbook, send just the markdown in `source`. The id comes from its front matter, and the other fields are worked out from it.

```json
{"source": "---\nid: ttf-curve-review\nname: TTF curve review\n---\n..."}
```

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | From the front matter. Public ids start with `#`, private ids must not |
| `source` | String | The markdown |
| `name`, `category`, `description`, `assistant`, `icon` | String | From the front matter |
| `tags` | String[] | From the front matter |
| `featured` | Boolean | Shown as featured in the library |
| `template` | Object | The input `fields`, the `plan` of steps and the `outputs` |
| `stepCount`, `inputCount`, `gateCount`, `checkCount`, `transitionCount` | Integer | Counts of steps, inputs, approval gates, checks and transitions |
| `tools` | String[] | The tools the steps can use |
| `changesPlatform` | Boolean | True if a step can change platform data |
| `maxTokens` | Integer | The most tokens a run may use |
| `warnings` | String[] | Warnings from the markdown, with line numbers |
| `copiedFrom` | Object | For a copy of a library playbook: `playbook` and `version` |

See the [playbook syntax](/docs/extensions/fusion-ai/playbooks/syntax) for the markdown.

---

## Task

A playbook with its values filled in for one piece of work, or scheduled to run regularly. Service: [AI Task](/docs/api/rest/service/aitask) (`aitask/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | The task id |
| `playbook` | String | Yes | The playbook id |
| `version` | Integer | No | The playbook version, defaults to the latest |
| `values` | Object | No | The values for the playbook's inputs, by input name |
| `schedule` | String | No | A schedule in the cron format with 6 or 7 parts |
| `enabled` | Boolean | No | False to pause a scheduled task |
| `owner` | String | No | Defaults to you |
| `playbookName`, `fields`, `plan`, `outputs` | | Platform | Copied from the playbook version |
| `status` | String | Platform | `draft`, or `scheduled` for a task with a schedule |
| `runAs` | Object | Platform | For a scheduled task: the person each run acts as |
| `lastRun` | | Platform | Set once the task has run. A task that has run cannot be changed |

```json
{
  "_id": "weekly-ttf-review",
  "playbook": "ttf-curve-review",
  "values": {"curve": "NGE.GAS.TTF:SETTLE"},
  "schedule": "0 8 * * 1 * Europe/London"
}
```

---

## Run

The record of one playbook run, written by Fusion AI. Service: [AI Run](/docs/api/rest/service/airun) (`airun/v1`), read-only.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The run id |
| `playbook` | String | The playbook run |
| `user` | String | Who started it |
| `status` | String | `running`, `awaiting_approval`, `done`, `failed`, `rejected`, `cancelled` or `stopped` |
| `mode` | String | `interactive` or `background` |
| `steps` | Array | Each step's result, checks, approvals and error |
| `outputs` | Object | The outputs |
| `tokens`, `maxTokens` | Integer | The billed tokens used, and the most allowed |
| `error` | String | Why a failed or stopped run ended |
| `scheduledFrom` | String | For a scheduled run: the task it was copied from |
| `_created` | DateTime | When it started |

---

## Tool

A function in one of your scripts that Fusion can call. Service: [AI Tool](/docs/api/rest/service/aitool) (`aitool/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The tool id |
| `name` | String | The function name: letters, numbers, `_` and `-` |
| `script` | String | The private script, with category `aitool`, that has the function |
| `description` | String | What the tool does. Fusion uses this to decide when to call it |
| `properties` | Array | The inputs, each with `name`, `type`, `description` and `required` |
| `assistant` | String | Limits the tool to one assistant |
| `icon` | String | The icon |

```json
{
  "_id": "nge-position",
  "name": "nge_position",
  "script": "northgate\\ai\\position-tools",
  "description": "Returns the Northgate net position for a product and month",
  "properties": [
    {"name": "product", "type": "string", "description": "The product, for example TTF", "required": true},
    {"name": "month", "type": "string", "description": "The delivery month as yyyy-MM", "required": true}
  ]
}
```

---

## Conversation

A conversation in the Fusion AI studio, saved as you chat. Service: [AI Studio](/docs/api/rest/service/aistudio) (`aistudio/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The conversation id |
| `name` | String | The name of the conversation |
| `category` | String | A category |
| `icon` | String | The icon, `chat-right-text` |
| `messages` | Array | The messages: `role` (`user`, `assistant` or `log`), `content`, `assistant` (which assistant answered), `timestamp`, `usage` (the tokens used) and `feedback` |
| `user`, `_user` | String | Whose conversation it is |
| `agent` | String | For an agent run: the agent id, instead of a user |
| `tid` | String | Your tenant |
| `_created`, `_updated` | DateTime | When it started and last changed |

A conversation you save yourself must have a `prompt` (the first question) and `text`.

---

## Usage

Token usage, one record per conversation per day. Service: [AI Usage](/docs/api/rest/service/aiusage) (`aiusage/v1`), read-only.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `conversation` | String | The conversation id |
| `user` | String | Who had the conversation |
| `tid` | String | The tenant id |
| `date` | String | The day |
| `timestamp` | DateTime | When the record was last updated |
| `input`, `output` | Long | Input and output tokens |
| `cacheWrite`, `cacheRead` | Long | Tokens written to and read from the prompt cache |
| `billedTokens` | Long | The billed tokens, see [Billing](/docs/extensions/fusion-ai/billing) |

---

## Feedback

A rating of a Fusion AI answer. Service: [Feedback](/docs/api/rest/service/feedback) (`feedback/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | A UUID |
| `conversation` | String | The conversation id |
| `assistant` | String | The assistant that answered |
| `question` | String | The question asked |
| `content` | String | The answer rated |
| `message` | String | The comment given with the rating |
| `positive` | Boolean | True for a thumbs up, false for a thumbs down |
| `user`, `_user`, `tid` | String | Who gave it, and your tenant |
| `_created` | DateTime | When it was given |
