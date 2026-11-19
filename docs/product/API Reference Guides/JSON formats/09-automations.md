---
title: Automations
description: The JSON of automations, automation targets and automation log entries
slug: /api/json/automations
sidebar_position: 9
tags:
  - api
  - json
  - automation
---

# Automations

An automation does something when data changes: it watches for an action (such as `update`) on an item and then calls an automation target (such as sending an email or running a process). See [Automations](/docs/topics/automations/basics).

---

## Automation

Service: [Automation](/docs/api/rest/service/automation) (`automation/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | An object id, made for you when you create an automation |
| `_type` | String | Platform | `VarAutomation` |
| `target` | String | Yes | The id of the [automation target](#automation-target) to call, for example `odsl.email_attachment` |
| `template` | String | Yes | The sentence that describes the automation, with the property names in square brackets |
| `properties` | Object | Yes | The values for the target, by name. Names that start with `@` are options of the automation itself, for example `@transformer` |
| `conditions` | Array | Yes | What fires the automation, see below |
| `enabled` | Boolean | No | Defaults to true |
| `icon` | String | No | The icon shown with the automation |
| `group` | String | No | A group, used to keep related automations together |
| `name` | String | Platform | The template with the property values filled in |
| `owner` | String | Platform | Who saved it: the automation runs with their access |
| `tid`, `environment` | String | Platform | Your tenant and the data environment |

### Condition

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `source` | String | Yes | `private`, `public` or `common` |
| `service` | String | Yes | The service of the item, for example `data`, `object`, `event` or `dataset` |
| `id` | String | Yes | The id of the item |
| `action` | String | Yes | The action that fires it, for example `create`, `update` or `delete` |
| `did` | String | No | A dependent id: when `id` is an event list, the event curve or timeseries built from it |
| `key` | String | No | A name for the item in the target system: the data's `_id` is changed to this |

```json
{
  "_type": "VarAutomation",
  "target": "odsl.email_attachment",
  "enabled": true,
  "template": "When 'NGE.POWER.DE:BASE' is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
  "properties": {
    "to": "risk@northgate-energy.com",
    "subject": "German power curve updated",
    "attachment": true,
    "attachmentName": "de_power_${date:yyyy-MM-dd}.csv",
    "@transformer": "#VarCurve_CSV"
  },
  "conditions": [
    {"source": "private", "service": "data", "id": "NGE.POWER.DE:BASE", "action": "update"}
  ]
}
```

---

## Automation target

An automation target is what an automation calls: a script with the information it needs. Service: [Automation Target](/docs/api/rest/service/automationtarget) (`automationtarget/v1/{source}`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Platform | `publisher.code` |
| `_type` | String | Platform | `VarAutomationTarget` |
| `publisher` | String | Yes | The publisher |
| `code` | String | Yes | The code of the target |
| `script` | String | Yes | The script that does the work |
| `name` | String | No | The name |
| `description` | String | No | What it does |
| `icon` | String | No | The icon shown with the target |
| `template` | String | No | The sentence used to collect the information, with input names in square brackets |
| `inputs` | Object | No | The inputs the user fills in, by name |
| `properties` | Object | No | Fixed values sent to the script |
| `services` | String[] | No | The services the target works with, `*` for all |
| `actions` | String[] | No | The actions the target works with, `*` for all |
| `tags` | String[] | No | Tags for finding the target |
| `allowTransformation` | Boolean | No | True to let users choose a transformer for the data |
| `allowPropertyChange` | Boolean | No | True to let users fire the automation when a property changes to a value |

See the [Automation Target service](/docs/api/rest/service/automationtarget) for the format of `inputs` and full examples.

---

## Automation log entry

Each time an automation fires, the platform writes a log entry. Service: [Automation Log](/docs/api/rest/service/automationlog) (`automationlog/v1`), read-only.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | An object id |
| `_type` | String | `VarAutomationLogEntry` |
| `source`, `service`, `key` | String | The item that fired the automation |
| `ondate` | String | The date of the data, if any |
| `property` | String | The property that changed, for a property change |
| `action` | String | The action |
| `method` | String | How it was fired, for example `Direct (api)` |
| `reason` | String | Why it was fired |
| `target` | String | The target called |
| `automation` | String | The automation id |
| `timestamp` | DateTime | When it fired |
| `status` | String | `success`, `failed` or `running` |
| `message` | String | The answer from the target |
| `invocationId`, `rootInvocationId`, `trace` | String | The request that fired it, the request that started the chain, and the trace |

```json
{
  "_id": "685526aa1001b079c8ed0c7e",
  "_type": "VarAutomationLogEntry",
  "source": "private",
  "service": "data",
  "key": "NGE.POWER.DE:BASE",
  "action": "update",
  "method": "Direct (api)",
  "target": "odsl.email_attachment",
  "automation": "68527adfe438ee467f057624",
  "timestamp": "2026-11-18T18:13:22.757",
  "status": "success",
  "message": "Successfully sent email(German power curve updated) to risk@northgate-energy.com"
}
```
