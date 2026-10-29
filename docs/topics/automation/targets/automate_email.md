---
slug: /topics/automations/targets/email
title: Email Target
description: Send automated email notifications and data attachments using the built-in email automation targets
sidebar_position: 2
tags:
- topics
- automation
- target
- email
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The email targets send an email whenever an automation fires. There are two built-in email targets: one sends the data in the body of the email, the other sends it as an attachment.

| Id | Name | Template | Icon |
|---|---|---|---|
| `odsl.email` | Send an email | `send an email to [to] with subject [subject]` | `envelope-at text-outlook` |
| `odsl.email_attachment` | Send an email with an attachment | `send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]` | `envelope-paper text-outlook` |

Both targets work with any service and any action, and both support the `@transformer` property and property-change filtering.

## How it works

- With `attachment` set to `false`, the body of the email is the triggering data, after any `@transformer` has been applied
- With `attachment` set to `true`, the body is "Your message is attached" and the data is attached as a file named `attachmentName`
- If `attachment` is missing it **defaults to true**, so a plain email automation must include `attachment: false`
- `subject` and `attachmentName` can contain dates, which are filled in from the ondate of the triggering data when there is one, for example `${date:yyyy-MM-dd}`

:::warning Recipients must be in your domain
Recipients must be in your tenant's own email domain, for example `@mycompany.com`, unless your tenant has the `UNRESTRICTED_EMAILS` setting set to true. You can send to several recipients by separating the addresses with a comma, semicolon or space.
:::

---

## odsl.email: Send an email

### Inputs

| Input | Description |
|---|---|
| `to` | The email address(es) of the recipients |
| `subject` | The subject of the email, can include dates |

### Default properties

| Property | Value |
|---|---|
| `attachment` | `false` |

### Example: email when a dataset is late

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

a.target = "odsl.email"
a.template = "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "ops@mycompany.com;data-team@mycompany.com"
a.properties.subject = "ICE.NDEX.NLB is late for ${date:yyyy-MM-dd}"
a.properties.attachment = false
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
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
    "to": "ops@mycompany.com;data-team@mycompany.com",
    "subject": "ICE.NDEX.NLB is late for ${date:yyyy-MM-dd}",
    "attachment": false
  }
}
```

</TabItem>
</Tabs>

### Using the builder shortcut

When the template is exactly one of the offers the platform makes for the item, `withAutomationTemplate` copies the target, icon, conditions and default properties (including `attachment: false`) for you:

```js
ab = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB")
ab.withAutomationTemplate("When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]")
ab.set("to", "ops@mycompany.com")
ab.set("subject", "ICE.NDEX.NLB is late")
a = ab.build()
save ${automation:a}
```

:::warning
The shortcut only works when the text matches an offer exactly. If it does not match, no error is raised and the automation is left empty. Use the explicit pattern above when in doubt.
:::

---

## odsl.email_attachment: Send an email with an attachment

### Inputs

| Input | Description |
|---|---|
| `to` | The email address(es) of the recipients |
| `subject` | The subject of the email, can include dates |
| `attachmentName` | The file name of the attachment. Defaults to the id of the triggering item, can include dates |

### Default properties

| Property | Value |
|---|---|
| `attachment` | `true` |

### Example: send a dataset as an attachment when it is complete

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

a.target = "odsl.email_attachment"
a.template = "When 'MY.PROVIDER.FEED' is complete, send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]"
a.icon = "envelope-paper text-outlook"
a.properties.to = "analyst@mycompany.com"
a.properties.subject = "MY.PROVIDER.FEED for ${date:yyyy-MM-dd}"
a.properties.attachmentName = "MY.PROVIDER.FEED_${date:yyyyMMdd}.json"
a.properties.attachment = true
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email_attachment",
  "template": "When 'MY.PROVIDER.FEED' is complete, send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
  "icon": "envelope-paper text-outlook",
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
    "to": "analyst@mycompany.com",
    "subject": "MY.PROVIDER.FEED for ${date:yyyy-MM-dd}",
    "attachmentName": "MY.PROVIDER.FEED_${date:yyyyMMdd}.json",
    "attachment": true
  }
}
```

</TabItem>
</Tabs>

---

## Transforming the data before sending

Set `@transformer` to the name of a mustache script, or to inline mustache text, to reshape the data before it is put in the email body or attachment, for example to produce CSV. The template then includes the transform step:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
ab = AutomationBuilder("dataset", "private", "MY.PROVIDER.FEED")
ab.set("@transformer", "dataset-to-csv")
a = ab.build()

c = SimpleObject()
c.source = "private"
c.service = "dataset"
c.id = "MY.PROVIDER.FEED"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.email_attachment"
a.template = "When 'MY.PROVIDER.FEED' is complete, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]"
a.icon = "envelope-paper text-outlook"
a.properties.to = "analyst@mycompany.com"
a.properties.subject = "MY.PROVIDER.FEED for ${date:yyyy-MM-dd}"
a.properties.attachmentName = "MY.PROVIDER.FEED_${date:yyyyMMdd}.csv"
a.properties.attachment = true
a.enabled = true
save ${automation:a}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email_attachment",
  "template": "When 'MY.PROVIDER.FEED' is complete, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
  "icon": "envelope-paper text-outlook",
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
    "to": "analyst@mycompany.com",
    "subject": "MY.PROVIDER.FEED for ${date:yyyy-MM-dd}",
    "attachmentName": "MY.PROVIDER.FEED_${date:yyyyMMdd}.csv",
    "attachment": true,
    "@transformer": "dataset-to-csv"
  }
}
```

</TabItem>
</Tabs>

In this example `dataset-to-csv` is the name of a mustache script in your tenant. In ODSL, `@` properties are set with the builder's `set` method before calling `build()`.

---

## Choosing between the two targets

| | `odsl.email` | `odsl.email_attachment` |
|---|---|---|
| **Use when** | You want the data in the email body | You want to deliver the data as a file |
| **attachment property** | `false` | `true` |
| **Attachment name** | Not used | `attachmentName`, defaults to the item id |
| **Icon** | `envelope-at text-outlook` | `envelope-paper text-outlook` |

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
