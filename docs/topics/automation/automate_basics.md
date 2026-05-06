---
slug: /topics/automations/basics
title: Automation Basics
description: The basics of event-driven programming in OpenDataDSL
sidebar_position: 1
tags:
- topics
- automation
- basics
- event-driven
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Automations in OpenDataDSL are **event-driven data flows** that trigger automatic actions whenever something changes in the platform — such as data being updated, a process completing, or a dataset becoming late.

## What are automations?

An automation monitors one or more platform services and listens for specific events. When a matching event occurs, the automation executes a configured action — for example, sending a notification, publishing data to a queue, or triggering a downstream process.

This makes automations the primary mechanism for building reactive, real-time data pipelines without writing polling logic or scheduling workarounds.

## Triggering events

Every automation is triggered by an **action** performed on a specific **service**. The table below lists all services that support automation triggers and the actions available for each.

| Service | Actions |
|---|---|
| action | create, update, delete |
| aiagent | create, update, delete |
| aiassistant | create, update, delete |
| aitool | create, update, delete |
| alert | raised, closed |
| alertrecord | create, update, delete |
| audit | create |
| automation | create, update, delete |
| automationlog | create, update, delete |
| automationtarget | create, update, delete |
| batch | create, update, delete |
| calendar | create, update, delete |
| curve | create, update, delete, build, success, warning, failed |
| dashboard | create, update, delete |
| data | create, update, delete |
| dataset | update, late, complete, missing, correction |
| documentation | create, update, delete |
| environment | create, update, delete |
| event | create, update, delete |
| expiry | create, update, delete |
| extension | create, update, delete, install, upgrade, uninstall |
| extractor | create, update, delete |
| group | create, update, delete, itemadded, itemremoved, itemupdated |
| object | create, update, delete |
| policy | create, update, delete |
| process | create, update, delete, rollback, tag, untag, rename, run, success, warning, failed |
| queue | create, update, delete, message |
| reportconfig | create, update, delete |
| report | create, update, delete, run, success, warning, failed |
| script | create, update, delete, rollback, tag, untag, rename, run, success, warning, failed |
| scriptlog | create |
| secret | create, update, delete |
| tenant | update |
| transformer | create, update, delete |
| type | create, update, delete |
| unit | create, update, delete |
| workflow | create, update, delete |

## Anatomy of an automation

An automation is defined as a JSON configuration object. Here is a representative example:

```json
{
  "target": "email",
  "icon": "bell-fill text-primary",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "late",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "to": "ops-team@example.com",
    "subject": "Dataset late: {{id}}"
  }
}
```

### Fields

#### `target`
The ID of the automation target that will receive and act on the event — for example, `email`, `queue`, or `process`.

#### `icon`
The [Bootstrap Icons](https://icons.getbootstrap.com/) name to use when displaying this automation in the portal. You can also append a Bootstrap colour utility class, e.g. `alarm-fill text-success`.

#### `enabled`
A boolean that controls whether the automation is active. Set to `false` to pause the automation without deleting it.

#### `conditions`
An array of trigger conditions. The automation fires when **any** condition matches. Each condition has the following fields:

| Field | Required | Description |
|---|---|---|
| `service` | ✅ | The platform service to monitor, e.g. `dataset` |
| `action` | ✅ | The action that triggers the automation, e.g. `late` |
| `id` | ✅ | The ID of the specific entity to watch |
| `source` | ✅ | The data source, e.g. `private` or `public` |
| `did` | ❌ | An optional dependent ID — for example, an event that triggers an event curve build |

#### `properties`
Target-specific configuration used to parameterise the action. The available properties depend on the chosen `target` — for example, an email target requires `to` and `subject`, while a queue target requires a queue name.

#### `template` and `name`
These fields are **dynamically generated** by the platform based on the entity, action, and target details. You do not need to set them manually.

## Next steps

- [Automation Targets](/docs/topics/automations/targets) — learn about the available targets and their configuration
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide to setting up your first automation
- [Automation Logs](/docs/topics/automations/logs) — monitoring and troubleshooting automation executions
