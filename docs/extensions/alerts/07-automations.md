---
title: Notifications and automations
description: Get an email or Teams message, or run anything else, when an alert is raised, closed, handed over, changes priority or gets a comment
slug: /extensions/alerts/automations
sidebar_position: 7
tags: [extension, alerts, automations, notifications]
---

# Notifications and automations

The Alerts screen shows changes as they happen while it is open. To be told when you are not looking, add an [automation](/docs/topics/automations/basics) on the alert service: it sends an email or a Microsoft Teams message, or starts any other [automation target](/docs/topics/automations/targets), when something happens to an alert.

---

## Alert actions

| Action | When |
|-|-|
| `raised` | A new alert is raised |
| `closed` | An alert is closed |
| `reopened` | An alert is reopened, by someone or because the platform raised it again within 7 days |
| `agent` | An alert is handed over |
| `severity` | An alert's priority changes |
| `comment` | A comment is added, edited or deleted |

The **id** of the condition is what the alert is about (its subject id, such as a dataset or curve id), or `*` for every alert. An alert about nothing in particular is matched by its own id.

| Source | Alerts |
|-|-|
| `private` | Your alerts |
| `common`, `public` | Shared alerts. Comments your team adds to a shared alert trigger your own `comment` automations only |

---

## Example: email the desk when an ICE Endex alert is raised

```js
//#region Email the gas desk about new alerts on ICE.NDEX.NLB
a = AutomationBuilder("alert", "private", "ICE.NDEX.NLB").build()
conds = []
actions = ["raised", "reopened"]
for act in actions
    c = SimpleObject()
    c.service = "alert"
    c.source = "private"
    c.id = "ICE.NDEX.NLB"
    c.action = act
    conds.add(c)
next
a.conditions = conds
a.target = "odsl.email"
a.template = "When an alert is raised for 'ICE.NDEX.NLB', send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "gas-desk@northgate-energy.com"
a.properties.subject = "Alert on ICE.NDEX.NLB"
a.properties.attachment = false
save ${automation:a}
//#endregion
```

The same with the REST API:

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When an alert is raised for 'ICE.NDEX.NLB', send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    {"service": "alert", "source": "private", "id": "ICE.NDEX.NLB", "action": "raised"},
    {"service": "alert", "source": "private", "id": "ICE.NDEX.NLB", "action": "reopened"}
  ],
  "properties": {
    "to": "gas-desk@northgate-energy.com",
    "subject": "Alert on ICE.NDEX.NLB",
    "attachment": false
  }
}
```

The `template` is the text the alert's Automations panel offers ("When an alert is raised for 'ICE.NDEX.NLB', " followed by the target's template), and `attachment` must be `false` for a plain email. See [Creating Automations](/docs/topics/automations/creating) for more.

---

## Other useful automations

| To be told when | Service, source, id | Action |
|-|-|-|
| Any of your alerts is raised | alert, private, `*` | `raised` |
| An alert is handed to your team | alert, private, `*` | `agent` |
| OpenDataDSL comments on your alerts | alert, private, `*` | `comment` |
| A shared alert about a common dataset you use is raised | alert, common, the dataset id | `raised` |
| Your alerts are closed | alert, private, `*` | `closed` |

You can also see, test and change these automations in the [Automations extension](/docs/extensions/automations/overview).

---

## Next

[Insights](/docs/extensions/alerts/insights)
