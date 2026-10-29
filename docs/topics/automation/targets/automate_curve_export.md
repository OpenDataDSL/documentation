---
slug: /topics/automations/targets/curve-export
title: Export Group Target
description: Run an export group automatically when data changes
sidebar_position: 5
tags:
- topics
- automation
- target
- curve
- export
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The export group target runs an export group whenever an automation fires, so that the data in the group is exported as soon as it changes.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.export_group` | Export a group of data | `run export task for [group]` | `folder-symlink text-stream` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`.

## Inputs

| Input | Description |
|---|---|
| `group` | The name of the export group to run |

## How it works

The export group named in `group` is run for the ondate of the triggering data, when there is one. See [Curve Exports](/docs/topics/curves/export) for how export groups are set up.

---

## Example: run an export group when a dataset is complete

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

a.target = "odsl.export_group"
a.template = "When 'MY.PROVIDER.FEED' is complete, run export task for [group]"
a.icon = "folder-symlink text-stream"
a.properties.group = "DAILY_SETTLEMENT_EXPORT"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.export_group",
  "template": "When 'MY.PROVIDER.FEED' is complete, run export task for [group]",
  "icon": "folder-symlink text-stream",
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
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

## Example: run an export group when a curve is updated

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

a.target = "odsl.export_group"
a.template = "When 'MY_OBJECT:CURVE' is updated, run export task for [group]"
a.icon = "folder-symlink text-stream"
a.properties.group = "DAILY_SETTLEMENT_EXPORT"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.export_group",
  "template": "When 'MY_OBJECT:CURVE' is updated, run export task for [group]",
  "icon": "folder-symlink text-stream",
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
    "group": "DAILY_SETTLEMENT_EXPORT"
  }
}
```

</TabItem>
</Tabs>

:::warning Several triggers, several exports
If you create an export group automation on several items that are updated at the same time, the whole group is exported once for each of them. Where possible, trigger the export from a single upstream event, such as the dataset that drives all the data in the group.
:::

---

## Related pages

- [Curve Build Targets](/docs/topics/automations/targets/curve): how Smart and Event Curves are built
- [TimeSeries Build Targets](/docs/topics/automations/targets/timeseries): how Smart and Event TimeSeries are built
- [Azure Storage Targets](/docs/topics/automations/targets/blob): another way to deliver data to storage
- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
