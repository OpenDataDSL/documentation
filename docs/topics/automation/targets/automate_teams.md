---
slug: /topics/automations/targets/teams
title: Microsoft Teams Target
description: Send automated messages to Microsoft Teams channels using the built-in Teams automation target
sidebar_position: 5
tags:
- topics
- automation
- target
- teams
- microsoft
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Teams target posts to a Microsoft Teams channel webhook whenever an automation fires.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.teams` | Send a Teams message | `send a Teams message to [url] using [template]` | `microsoft-teams text-teams` |

The target works with any service and any action. It supports property-change filtering but not `@transformer`.

## Inputs

| Input | Description |
|---|---|
| `url` | The webhook URL of the Teams channel |
| `template` | A mustache template for the message |

:::note Message formatting
In the current automation handlers, the triggering data is posted to `url` as JSON and the `template` input is **not applied**. The receiving channel gets the raw JSON data, not a formatted message. This target also does not support `@transformer`. Set `template` because the target asks for it, but do not rely on it to format the message.
:::

---

## Example: post to Teams when a dataset is late

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "ICE.NDEX.NLB"
c.action = "late"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.teams"
a.template = "When 'ICE.NDEX.NLB' is late, send a Teams message to [url] using [template]"
a.icon = "microsoft-teams text-teams"
a.properties.url = "https://mycompany.webhook.office.com/webhookb2/your-channel-webhook"
a.properties.template = "dataset-late-message"
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.teams",
  "template": "When 'ICE.NDEX.NLB' is late, send a Teams message to [url] using [template]",
  "icon": "microsoft-teams text-teams",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "dataset",
      "id": "ICE.NDEX.NLB",
      "action": "late"
    }
  ],
  "properties": {
    "url": "https://mycompany.webhook.office.com/webhookb2/your-channel-webhook",
    "template": "dataset-late-message"
  }
}
```

</TabItem>
</Tabs>

---

## Fixing the channel URL in a custom target

For a shared channel, you can create a custom target that wraps the built-in Teams handler (`@TeamsChannelTarget`) with the `url` fixed in its properties. Users then pick the target without ever handling the webhook URL. See [Custom Targets](/docs/topics/automations/targets/custom) for how to do this.

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Webhook Target](/docs/topics/automations/targets/webhook): post to any other webhook
- [Custom Targets](/docs/topics/automations/targets/custom): fix the channel URL for your team
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
