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

The webhook target is a **built-in automation target** that sends a message to any HTTP webhook endpoint whenever an automation condition fires. It is the most general-purpose integration target — any external system that accepts incoming webhooks can be connected to OpenDataDSL automations using this target.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@WebhookTarget`). They are available to all tenants without any additional configuration.
:::

---

## `webhook` — Send a webhook message

### Inputs

| Input | Required | Description |
|---|---|---|
| `url` | ✅ | The webhook URL to send the message to |
| `template` | ✅ | The ID of a mustache script stored in the platform, used to format the message payload |

The payload sent to the webhook is always formatted using the mustache template — the raw entity is not sent directly. This ensures the webhook receives exactly the structure the external system expects.

---

## Using this target in an automation

### Notify an external system when a dataset completes

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a webhook notification when a dataset completes
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("webhook")
ab.setProperty("url", "https://external-system.example.com/hooks/dataset-ready")
ab.setProperty("template", "my-scripts\\templates\\DatasetWebhookPayload")
ab.icon = "wifi text-orange"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "webhook",
  "icon": "wifi text-orange",
  "enabled": true,
  "conditions": [
    {
      "service": "dataset",
      "action": "complete",
      "id": "MY_PROVIDER.FEED.PRODUCT",
      "source": "private"
    }
  ],
  "properties": {
    "url": "https://external-system.example.com/hooks/dataset-ready",
    "template": "my-scripts\\templates\\DatasetWebhookPayload"
  }
}
```

</TabItem>
</Tabs>

### Notify an external system when a curve build fails

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a webhook alert when a curve build fails
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("failed")
ab.setTarget("webhook")
ab.setProperty("url", "https://external-system.example.com/hooks/alerts")
ab.setProperty("template", "my-scripts\\templates\\CurveFailedWebhookPayload")
ab.icon = "wifi text-orange"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "webhook",
  "icon": "wifi text-orange",
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
    "url": "https://external-system.example.com/hooks/alerts",
    "template": "my-scripts\\templates\\CurveFailedWebhookPayload"
  }
}
```

</TabItem>
</Tabs>

---

## Formatting the webhook payload

The `template` input points to a mustache script stored in the platform. The script receives the triggered entity as its data context and should produce a JSON payload in the format the receiving webhook expects.

A simple example template for a dataset completion event:

```
{
  "event": "dataset.complete",
  "id": "{{_id}}",
  "timestamp": "{{_updated}}"
}
```

The exact payload structure depends entirely on what the receiving system requires — consult its webhook documentation for the expected format.

---

## Pre-configured webhook target

For webhooks where the URL is fixed — such as a shared integration endpoint for a specific external system — you can create a custom target with the URL pre-filled. Users setting up automations then only need to select the target and supply a template.

### Creating the pre-configured target

```js
//#region Create a pre-configured webhook target for an external monitoring system
at = AutomationTarget()
at.publisher = "myorg"
at.code = "webhook-monitoring"
at.name = "Send to external monitoring system"
at.description = "Send a webhook notification to the external monitoring system"
at.icon = "wifi text-orange"
at.script = "@WebhookTarget"
at.template = "send a webhook message to the monitoring system using [template]"
at.allowTransformation = false
at.allowPropertyChange = true
at.services = ["*"]
at.actions = ["*"]

at.properties.url = "https://external-system.example.com/hooks/opendatadsl"

at.tags = ["Application"]
save at
//#endregion
```

### Using the pre-configured target in an automation

Once saved, automations using `webhook-monitoring` only need a `template` property:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify the monitoring system when a dataset becomes late
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("late")
ab.setTarget("webhook-monitoring")
ab.setProperty("template", "my-scripts\\templates\\DatasetLateWebhookPayload")
ab.icon = "wifi text-orange"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "webhook-monitoring",
  "icon": "wifi text-orange",
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
    "template": "my-scripts\\templates\\DatasetLateWebhookPayload"
  }
}
```

</TabItem>
</Tabs>

---

## Choosing between webhook and other notification targets

The webhook target is the right choice when integrating with external systems that have their own incoming webhook support. For common platforms, dedicated targets are also available:

| Target | Best for |
|---|---|
| `webhook` | Any external system with an incoming webhook endpoint |
| `teams` | Microsoft Teams channels |
| `jira` | Creating JIRA tasks |
| `email` | Email notifications |
| `queue` | Internal OpenDataDSL message queues |

---

## Related pages

- [Custom Targets](/docs/topics/automations/targets/custom) — pre-configure a webhook URL for a dedicated integration target
- [Microsoft Teams Target](/docs/topics/automations/targets/teams) — dedicated target for Teams channel webhooks
- [JIRA Target](/docs/topics/automations/targets/jira) — dedicated target for JIRA task creation
- [Queue Target](/docs/topics/automations/targets/queue) — publish to an internal message queue instead of an external webhook
- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide including advanced `@` properties
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
