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

The Teams target is a **built-in automation target** that sends a message to a Microsoft Teams channel via an incoming webhook whenever an automation condition is triggered. A pre-configured variant can also be created to hard-code the webhook URL for a specific channel, so users only need to select the target — no URL handling required.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@TeamsChannelTarget`). They are available to all tenants without any additional configuration.
:::

---

## `teams` — Send a Teams message

Use this target when you want to post a notification to any Teams channel by supplying the webhook URL and a mustache template at automation configuration time.

### Inputs

| Input | Required | Description |
|---|---|---|
| `url` | ✅ | The incoming webhook URL for the Teams channel |
| `template` | ✅ | The ID of a mustache script stored in the platform, used to format the message body |

:::tip Creating a Teams webhook
Incoming webhook URLs are configured in Microsoft Teams under **Channel settings → Connectors → Incoming Webhook**. Each channel has its own unique URL.
:::

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a Teams message when a dataset becomes late
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("late")
ab.setTarget("teams")
ab.setProperty("url", "https://myorg.webhook.office.com/webhookb2/...")
ab.setProperty("template", "my-scripts\templates\DatasetLateMessage")
ab.icon = "microsoft-teams text-teams"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "teams",
  "icon": "microsoft-teams text-teams",
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
    "url": "https://myorg.webhook.office.com/webhookb2/...",
    "template": "my-scripts\\templates\\DatasetLateMessage"
  }
}
```

</TabItem>
</Tabs>

### Message formatting with mustache templates

The `template` input points to a mustache script stored in the platform. The script receives the triggered entity as its data context and should produce a valid [Teams Adaptive Card](https://adaptivecards.io/) or message payload.

A simple example mustache template for a dataset late notification might look like:

```
{
  "type": "message",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            "text": "Dataset {{_id}} is late",
            "weight": "Bolder"
          }
        ]
      }
    }
  ]
}
```

---

## Pre-configured Teams channel target

For shared channels where the webhook URL is fixed — such as a team operations channel — you can create a custom target that pre-fills the URL. Users setting up automations then only need to select the target and supply a template, without needing access to the webhook URL itself.

See [Custom Targets](/docs/topics/automations/targets/custom) for the full pattern. A Teams-specific example is shown below.

### Creating the pre-configured target

```js
//#region Create a pre-configured target for the TEST Teams channel
at = AutomationTarget()
at.publisher = "test"
at.code = "teams-test"
at.name = "Send a message to the TEST Teams channel"
at.description = "Send a message to a Teams channel"
at.icon = "microsoft-teams text-teams"
at.script = "@TeamsChannelTarget"
at.template = "send a Teams message to the test channel"
at.allowTransformation = true
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.url = "https://myorg.webhook.office.com/webhookb2/..."

at.tags = ["Application", "Teams"]
save at
//#endregion
```

### Using the pre-configured target in an automation

Once saved, the `teams-test` target can be used in any automation without specifying the URL:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify the TEST Teams channel when a curve build fails
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("failed")
ab.setTarget("teams-test")
ab.setProperty("template", "my-scripts\\templates\\CurveFailedMessage")
ab.icon = "microsoft-teams text-teams"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "teams-test",
  "icon": "microsoft-teams text-teams",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "failed",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "template": "my-scripts\\templates\\CurveFailedMessage"
  }
}
```

</TabItem>
</Tabs>

---

## Choosing between the two approaches

| | `teams` (built-in) | Pre-configured custom target |
|---|---|---|
| **Webhook URL** | Supplied per automation | Pre-filled in the target definition |
| **Best for** | Ad hoc or per-user channel notifications | Shared team channels with a fixed URL |
| **Template** | Supplied per automation | Supplied per automation |
| **URL visible to users** | Yes | No |

---

## Related pages

- [Custom Targets](/docs/topics/automations/targets/custom) — how to create pre-configured targets for shared channels
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Email Target](/docs/topics/automations/targets/email) — send notifications by email instead of Teams
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
