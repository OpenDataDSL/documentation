---
slug: /topics/automations/targets/email
title: Email Target
description: Send automated email notifications and data attachments using the built-in email automation target
sidebar_position: 2
tags:
- topics
- automation
- target
- email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The email target is a **built-in automation target** that sends an email notification whenever an automation condition is triggered. A variant is also available that delivers the triggered data as a file attachment.

:::note Built-in targets
Built-in targets are provided by OpenDataDSL and referenced using the `@` prefix on their script name (e.g. `@EmailTarget`). They are available to all tenants without any additional configuration.
:::

## Available email targets

| Code | Name | Description |
|---|---|---|
| `email` | Send an email | Sends a notification email to one or more recipients |
| `email_attachment` | Send an email with an attachment | Sends the triggered data as a file attached to an email |

---

## `email` — Send an email

Use this target to send a plain notification email when an automation fires. The email body is generated from the event data using the configured template.

### Inputs

| Input | Required | Description |
|---|---|---|
| `to` | ✅ | The email address(es) of the recipient(s). Separate multiple addresses with `,`, `;`, or a space |
| `subject` | ✅ | The subject line of the email |

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify on dataset late
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("late")
ab.setTarget("email")
ab.setProperty("to", "ops-team@example.com")
ab.setProperty("subject", "Dataset late: MY_PROVIDER.FEED.PRODUCT")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
"target": "email",
"icon": "envelope-at text-outlook",
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
"subject": "Dataset late: MY_PROVIDER.FEED.PRODUCT"
}
}
```

</TabItem>
</Tabs>

### Sending to multiple recipients

You can notify several recipients by separating addresses with a comma, semicolon, or space in the `to` field.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Notify multiple recipients on curve build failure
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("failed")
ab.setTarget("email")
ab.setProperty("to", "ops-team@example.com,data-team@example.com")
ab.setProperty("subject", "Curve build failed: MY_CURVE_OBJECT:CLOSE")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "envelope-at text-outlook",
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
    "to": "ops-team@example.com,data-team@example.com",
    "subject": "Curve build failed: MY_CURVE_OBJECT:CLOSE"
  }
}
```

</TabItem>
</Tabs>

---

## `email_attachment` — Send an email with an attachment

Use this target when you want to deliver the triggered data as a downloadable file. The data is serialised and attached to the email using the name you configure.

### Inputs

| Input | Required | Description |
|---|---|---|
| `to` | ✅ | The email address(es) of the recipient(s). Separate multiple addresses with `,`, `;`, or a space |
| `subject` | ✅ | The subject line of the email |
| `attachmentName` | ❌ | The filename used for the attachment. Defaults to the ID of the triggered entity. Supports embedded date expressions |

:::tip Attachment names with dates
You can embed date expressions in the `attachmentName` to make filenames dynamic — for example, `MY_DATASET_${yyyyMMdd}.csv` will resolve the date at the time the automation fires.
:::

### Using this target in an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send dataset data as an email attachment on completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("email_attachment")
ab.setProperty("to", "analyst@example.com")
ab.setProperty("subject", "Dataset ready: MY_PROVIDER.FEED.PRODUCT")
ab.setProperty("attachmentName", "MY_PROVIDER.FEED.PRODUCT_${yyyyMMdd}.csv")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email_attachment",
  "icon": "envelope-paper text-outlook",
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
    "to": "analyst@example.com",
    "subject": "Dataset ready: MY_PROVIDER.FEED.PRODUCT",
    "attachmentName": "MY_PROVIDER.FEED.PRODUCT_${yyyyMMdd}.csv"
  }
}
```

</TabItem>
</Tabs>

### Using the default attachment name

If you omit `attachmentName`, the attachment is named after the ID of the triggered entity. This is useful for quick setups where a fixed name is sufficient.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send curve data as an email attachment on successful build
ab = AutomationBuilder("curve", "private", "MY_CURVE_OBJECT:CLOSE")
ab.addCondition("success")
ab.setTarget("email_attachment")
ab.setProperty("to", "analyst@example.com")
ab.setProperty("subject", "Curve ready: MY_CURVE_OBJECT:CLOSE")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email_attachment",
  "icon": "envelope-paper text-outlook",
  "enabled": true,
  "conditions": [
    {
      "service": "curve",
      "action": "success",
      "id": "MY_CURVE_OBJECT:CLOSE",
      "source": "private"
    }
  ],
  "properties": {
    "to": "analyst@example.com",
    "subject": "Curve ready: MY_CURVE_OBJECT:CLOSE"
  }
}
```

</TabItem>
</Tabs>

---

## Transforming data before sending

Both email targets support the `@transformer` property, which lets you reshape the triggered data using a mustache script before it is attached or embedded in the email. This is useful when recipients expect a specific format such as CSV or HTML.

Set `@transformer` to the ID of a mustache script stored in the platform:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a CSV-formatted attachment on dataset completion
ab = AutomationBuilder("dataset", "private", "MY_PROVIDER.FEED.PRODUCT")
ab.addCondition("complete")
ab.setTarget("email_attachment")
ab.setProperty("to", "analyst@example.com")
ab.setProperty("subject", "Dataset ready: MY_PROVIDER.FEED.PRODUCT")
ab.setProperty("attachmentName", "MY_PROVIDER.FEED.PRODUCT_${yyyyMMdd}.csv")
ab.setProperty("@transformer", "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV")
ab.icon = "envelope-paper text-outlook"
ab.enabled = true
save ${automation:ab}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email_attachment",
  "icon": "envelope-paper text-outlook",
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
    "to": "analyst@example.com",
    "subject": "Dataset ready: MY_PROVIDER.FEED.PRODUCT",
    "attachmentName": "MY_PROVIDER.FEED.PRODUCT_${yyyyMMdd}.csv",
    "@transformer": "example-odsl\\0.DEMO\\DefaultTemplates\\AutomationObject_CSV"
  }
}
```

</TabItem>
</Tabs>

See [Advanced automation features](/docs/topics/automations/creating#advanced-features) for more detail on the full set of `@` properties available.

---

## Choosing between the two targets

| | `email` | `email_attachment` |
|---|---|---|
| **Use when** | You need a notification only | You need to deliver the data itself |
| **Attachment** | None | Data serialised as a file |
| **Attachment name** | N/A | Configurable, defaults to entity ID |
| **Icon** | `envelope-at text-outlook` | `envelope-paper text-outlook` |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics) — how automations work and the full trigger reference
- [Creating Automations](/docs/topics/automations/creating) — step-by-step guide to setting up automations
- [Automation Targets](/docs/topics/automations/targets) — overview of all available targets
