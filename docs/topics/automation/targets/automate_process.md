---
slug: /topics/automations/targets/process
title: Process Target
description: Trigger an OpenDataDSL process to run automatically in response to a platform event
sidebar_position: 8
tags:
- topics
- automation
- target
- process
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The process target starts a process whenever an automation fires. Use it to run a loader, calculation or other workflow as soon as the data it depends on arrives, without polling or waiting for a schedule.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.process` | Run a process | `run [process]` | `play-fill text-success` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`.

## Inputs

| Input | Description |
|---|---|
| `process` | The name of the process to run |

## How it works

- The process named in `process` is started, and runs as the process's own run-as user
- The triggering data and the automation properties are passed to the process
- The process's own input values are merged into the triggering data passed to the process
- The automation properties include `id` and, when there is one, `ondate` of the triggering item

---

## Example: run a process when a dataset is complete

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.process"
a.template = "When 'MY.PROVIDER.FEED' is complete, run [process]"
a.icon = "play-fill text-success"
a.properties.process = "MY_ENRICHMENT_PROCESS"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.process",
  "template": "When 'MY.PROVIDER.FEED' is complete, run [process]",
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "complete"
    }
  ],
  "properties": {
    "process": "MY_ENRICHMENT_PROCESS"
  }
}
```

</TabItem>
</Tabs>

## Example: run a process when a curve is updated

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("data", "private", "MY_OBJECT:CURVE").build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.process"
a.template = "When 'MY_OBJECT:CURVE' is updated, run [process]"
a.icon = "play-fill text-success"
a.properties.process = "MY_RISK_CALCULATION"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.process",
  "template": "When 'MY_OBJECT:CURVE' is updated, run [process]",
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:CURVE",
      "action": "update"
    }
  ],
  "properties": {
    "process": "MY_RISK_CALCULATION"
  }
}
```

</TabItem>
</Tabs>

:::tip Process or script?
Use the process target when you want the run tracked as a process execution with its own run-as user and inputs. For a lightweight response that only needs a single script, use the [Script Target](/docs/topics/automations/targets/script).
:::

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Script Target](/docs/topics/automations/targets/script): run a single ODSL script instead of a process
- [Custom Targets](/docs/topics/automations/targets/custom): fix the process name in a target for your team
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
