---
slug: /topics/automations/targets/webhook
title: Webhook Target
description: Send automation data to any external system via a webhook
sidebar_position: 10
tags:
- topics
- automation
- target
- webhook
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The webhook target posts to any HTTP webhook endpoint whenever an automation fires. Any external system that accepts incoming webhooks can be connected to OpenDataDSL automations this way.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.webhook` | Send a webhook message | `send a message to a webhook at [url] using [template]` | `wifi text-orange` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`.

## Inputs

| Input | Description |
|---|---|
| `url` | The webhook URL to post to |
| `template` | A mustache template for the message |

:::note Message formatting
In the current automation handlers, the triggering data is posted to `url` as JSON and the `template` input is **not applied**. The receiving system gets the raw JSON data, not a formatted message. This target also does not support `@transformer`. Set `template` because the target asks for it, but do not rely on it to format the payload.
:::

---

## Example: notify an external system when a dataset is complete

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

a.target = "odsl.webhook"
a.template = "When 'MY.PROVIDER.FEED' is complete, send a message to a webhook at [url] using [template]"
a.icon = "wifi text-orange"
a.properties.url = "https://integration.mycompany.com/hooks/odsl"
a.properties.template = "dataset-complete-message"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.webhook",
  "template": "When 'MY.PROVIDER.FEED' is complete, send a message to a webhook at [url] using [template]",
  "icon": "wifi text-orange",
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
    "url": "https://integration.mycompany.com/hooks/odsl",
    "template": "dataset-complete-message"
  }
}
```

</TabItem>
</Tabs>

---

## Choosing between webhook and other targets

| Target | Best for |
|---|---|
| `odsl.webhook` | Any external system with an incoming webhook |
| `odsl.teams` | Microsoft Teams channels |
| `odsl.jira` | Creating JIRA tasks |
| `odsl.email` | Email notifications |
| `odsl.queue` | Your tenant's message queues |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Teams Target](/docs/topics/automations/targets/teams): post to a Microsoft Teams channel
- [Queue Target](/docs/topics/automations/targets/queue): send data to a queue for downstream systems
- [Custom Targets](/docs/topics/automations/targets/custom): fix the webhook URL for your team
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
