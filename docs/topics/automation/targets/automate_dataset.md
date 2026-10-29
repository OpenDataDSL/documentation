---
slug: /topics/automations/targets/dataset-checks
title: Dataset Check Targets
description: Automatically trigger dataset quality and critical checks using automation targets
sidebar_position: 6
tags:
- topics
- automation
- target
- dataset
- quality
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The dataset check targets run the checks defined on a dataset whenever it is updated. They keep data quality checks running as part of an event-driven pipeline.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.qualitycheck` | Run dataset quality checks | `run quality checks on [dsid]` | `ui-checks text-red` |
| `odsl.criticalcheck` | Run dataset critical checks | `run critical checks on [dsid]` | `ui-checks text-red` |

Both targets only work with the `dataset` service and the `update` action. Neither supports `@transformer` or property-change filtering.

## Inputs

| Input | Description |
|---|---|
| `dsid` | The id of the dataset whose checks should run |

## How it works

The target runs the dataset's quality or critical checks for the ondate of the update. The checks themselves are defined on the dataset, not on the automation; the automation only decides when they run.

Dataset automations use the `dataset` service, the `private` source, and the dataset id (`provider.feed.product`) as the condition id.

---

## Example: run quality checks when a dataset is updated

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.qualitycheck"
a.template = "When 'MY.PROVIDER.FEED' is updated, run quality checks on [dsid]"
a.icon = "ui-checks text-red"
a.properties.dsid = "MY.PROVIDER.FEED"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.qualitycheck",
  "template": "When 'MY.PROVIDER.FEED' is updated, run quality checks on [dsid]",
  "icon": "ui-checks text-red",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "update"
    }
  ],
  "properties": {
    "dsid": "MY.PROVIDER.FEED"
  }
}
```

</TabItem>
</Tabs>

## Example: run critical checks when a dataset is updated

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.criticalcheck"
a.template = "When 'MY.PROVIDER.FEED' is updated, run critical checks on [dsid]"
a.icon = "ui-checks text-red"
a.properties.dsid = "MY.PROVIDER.FEED"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.criticalcheck",
  "template": "When 'MY.PROVIDER.FEED' is updated, run critical checks on [dsid]",
  "icon": "ui-checks text-red",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "MY.PROVIDER.FEED",
      "action": "update"
    }
  ],
  "properties": {
    "dsid": "MY.PROVIDER.FEED"
  }
}
```

</TabItem>
</Tabs>

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Email Target](/docs/topics/automations/targets/email): send a notification when a dataset is late, missing or complete
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
