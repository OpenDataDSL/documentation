---
slug: /topics/automations/targets/report
title: Report Target
description: Automatically run reports in response to platform events using the built-in report automation targets
sidebar_position: 9
tags:
- topics
- automation
- target
- report
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The report targets run a report whenever an automation fires. There are two built-in report targets: one runs the report, the other runs it for a range you give.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.report` | Run a report | `run [report]` | `file-text text-onenote` |
| `odsl.report_range` | Run a report with a range | `run [report] for [range]` | `file-text text-onenote` |

Both targets work with any service and any action. They support property-change filtering but not `@transformer`: the output is controlled by the report itself.

## How it works

- The report named in `report` is run
- When the triggering data has an ondate, for example a dataset ondate or a curve date, the report is run for that date
- With `odsl.report_range`, the `range` property is also passed to the report

---

## odsl.report: Run a report

### Inputs

| Input | Description |
|---|---|
| `report` | The name of the report to run |

### Example: run a report when a dataset is complete

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

a.target = "odsl.report"
a.template = "When 'MY.PROVIDER.FEED' is complete, run [report]"
a.icon = "file-text text-onenote"
a.properties.report = "MY_DAILY_SUMMARY_REPORT"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.report",
  "template": "When 'MY.PROVIDER.FEED' is complete, run [report]",
  "icon": "file-text text-onenote",
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
    "report": "MY_DAILY_SUMMARY_REPORT"
  }
}
```

</TabItem>
</Tabs>

---

## odsl.report_range: Run a report with a range

### Inputs

| Input | Description |
|---|---|
| `report` | The name of the report to run |
| `range` | The range to run the report for |

### Example: run a report for a range when a curve is updated

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

a.target = "odsl.report_range"
a.template = "When 'MY_OBJECT:CURVE' is updated, run [report] for [range]"
a.icon = "file-text text-onenote"
a.properties.report = "MY_CURVE_REPORT"
a.properties.range = "between(T-1M,T)"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.report_range",
  "template": "When 'MY_OBJECT:CURVE' is updated, run [report] for [range]",
  "icon": "file-text text-onenote",
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
    "report": "MY_CURVE_REPORT",
    "range": "between(T-1M,T)"
  }
}
```

</TabItem>
</Tabs>

---

## Choosing between the two targets

| | `odsl.report` | `odsl.report_range` |
|---|---|---|
| **Range** | Not set | Set per automation |
| **Best for** | Reports run for the date of the triggering data | Reports that need a specific window |
| **Transformer support** | No | No |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Export Group Target](/docs/topics/automations/targets/curve-export): run an export group when data changes
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
