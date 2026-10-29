---
slug: /topics/automations/targets/jira
title: JIRA Target
description: Automatically create JIRA tasks from OpenDataDSL automation events
sidebar_position: 7
tags:
- topics
- automation
- target
- jira
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The JIRA target posts to a JIRA incoming webhook whenever an automation fires, so that a JIRA automation rule can create a task. Use it to raise issues automatically, for example when a dataset is late.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.jira` | Create a JIRA task | `create a JIRA task at [url] using [template]` | `clipboard-plus text-primary` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`.

## Inputs

| Input | Description |
|---|---|
| `url` | The JIRA incoming webhook URL |
| `template` | A mustache template for the task, can be left empty |

:::note Message formatting
In the current automation handlers, the triggering data is posted to `url` as JSON and the `template` input is **not applied**. The receiving JIRA webhook gets the raw JSON data, not a formatted message. This target also does not support `@transformer`. Set `template` because the target asks for it, but do not rely on it to format the task.
:::

:::tip
Because the data arrives as JSON, configure your JIRA automation rule to read the fields it needs from the incoming JSON.
:::

---

## Example: raise a JIRA task when a dataset is missing

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "ICE.NDEX.NLB"
c.action = "missing"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.jira"
a.template = "When 'ICE.NDEX.NLB' is missing, create a JIRA task at [url] using [template]"
a.icon = "clipboard-plus text-primary"
a.properties.url = "https://automation.atlassian.com/pro/hooks/your-webhook-id"
a.properties.template = ""
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.jira",
  "template": "When 'ICE.NDEX.NLB' is missing, create a JIRA task at [url] using [template]",
  "icon": "clipboard-plus text-primary",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "ICE.NDEX.NLB",
      "action": "missing"
    }
  ],
  "properties": {
    "url": "https://automation.atlassian.com/pro/hooks/your-webhook-id",
    "template": ""
  }
}
```

</TabItem>
</Tabs>

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Webhook Target](/docs/topics/automations/targets/webhook): post to any other webhook
- [Custom Targets](/docs/topics/automations/targets/custom): fix the JIRA webhook URL for your team
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
