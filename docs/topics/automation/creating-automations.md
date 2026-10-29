---
slug: /topics/automations/creating
title: Creating Automations
description: How to create, change, test and delete automations in OpenDataDSL using ODSL or the REST API
sidebar_position: 2
tags:
- topics
- automation
- creating
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can create automations in the portal, in ODSL scripts, or with the REST API. This guide shows common scenarios with worked examples in ODSL and the REST API. To create automations in the portal, see the [Automations extension](/docs/extensions/automations/creating).

## Before you start

You need to know:

- The **service**, **source** and **id** of the item to watch, and the **action** that should trigger the automation: see the [trigger reference](/docs/topics/automations/basics#triggering-events)
- The **target** to send the data to, and the properties it needs: see [Automation Targets](/docs/topics/automations/targets)
- The **template** text for the automation: see [Templates](/docs/topics/automations/basics#templates)

The automation runs with the security policies of the user who saved it, so that user needs access to the item and to whatever the target does.

## Two ways to create an automation in ODSL

**1. Set every field yourself.** Build an empty automation, then set its target, template, conditions and properties. This always works and is the way used in the rest of this guide.

```js
//#region Set every field
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()

c = SimpleObject()
c.service = "dataset"
c.source = "private"
c.id = "ICE.NDEX.NLB"
c.action = "late"
conds = []
conds.add(c)

a.conditions = conds
a.target = "odsl.email"
a.template = "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "ops-team@mycompany.com"
a.properties.subject = "ICE Endex NLB settlement prices are late"
a.properties.attachment = false
a.enabled = true
save ${automation:a}
//#endregion
```

**2. Start from one of the item's offers.** `withAutomationTemplate` looks up the automations the item offers (the same list the portal shows) and copies the target, icon, conditions and default properties of the offer whose template matches the text exactly. You then only set the properties.

```js
//#region Start from an offer
ab = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB")
ab.withAutomationTemplate("When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]")
ab.set("to", "ops-team@mycompany.com")
ab.set("subject", "ICE Endex NLB settlement prices are late")
a = ab.build()
save ${automation:a}
//#endregion
```

:::warning
If the text does not match an offer exactly, `withAutomationTemplate` does nothing and the save fails because the automation has no target. Use the `listAutomations` [special function](/docs/api/rest/special_functions) to see the exact texts.
:::

## Creating a basic automation

This automation emails the operations team when a dataset is late. The `attachment` property must be `false` for a plain email; without it the data is sent as an attachment.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Email when a dataset is late
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()
c = SimpleObject()
c.service = "dataset"
c.source = "private"
c.id = "ICE.NDEX.NLB"
c.action = "late"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.email"
a.template = "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "ops-team@mycompany.com"
a.properties.subject = "ICE Endex NLB settlement prices are late"
a.properties.attachment = false
save ${automation:a}
//#endregion
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
      "service": "dataset",
      "action": "late",
      "id": "ICE.NDEX.NLB",
      "source": "private"
    }
  ],
  "properties": {
    "to": "ops-team@mycompany.com",
    "subject": "ICE Endex NLB settlement prices are late",
    "attachment": false
  }
}
```

</TabItem>
</Tabs>

If a request fails, the reason is in the `x-odsl-error` response header.

## Multiple conditions on one automation

An automation runs when **any** of its conditions matches, so one automation can watch several items or actions. This one emails the curves team when a curve build succeeds or fails.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Email on curve build success or failure
a = AutomationBuilder("curve", "private", "MY.GAS.HUB:FORWARD_CURVE").build()
conds = []
actions = ["success", "failed"]
for act in actions
    c = SimpleObject()
    c.service = "curve"
    c.source = "private"
    c.id = "MY.GAS.HUB:FORWARD_CURVE"
    c.action = act
    conds.add(c)
next
a.conditions = conds
a.target = "odsl.email"
a.template = "When 'MY.GAS.HUB:FORWARD_CURVE' is successful, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "curves-team@mycompany.com"
a.properties.subject = "Forward curve build finished"
a.properties.attachment = false
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When 'MY.GAS.HUB:FORWARD_CURVE' is successful, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    { "service": "curve", "action": "success", "id": "MY.GAS.HUB:FORWARD_CURVE", "source": "private" },
    { "service": "curve", "action": "failed", "id": "MY.GAS.HUB:FORWARD_CURVE", "source": "private" }
  ],
  "properties": {
    "to": "curves-team@mycompany.com",
    "subject": "Forward curve build finished",
    "attachment": false
  }
}
```

</TabItem>
</Tabs>

:::note
The template can only describe one action, so the item's Automations panel shows this automation as the "is successful" offer. If you want each case to show separately in the portal, create one automation per action.
:::

## Triggering a process from an automation

Run a process when a dataset's delivery is complete. The process receives the dataset delivery as its input data.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Run a process when a dataset is complete
a = AutomationBuilder("dataset", "private", "ICE.NDEX.NLB").build()
c = SimpleObject()
c.service = "dataset"
c.source = "private"
c.id = "ICE.NDEX.NLB"
c.action = "complete"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.process"
a.template = "When 'ICE.NDEX.NLB' is complete, run [process]"
a.icon = "play-fill text-success"
a.properties.process = "MY_ENRICHMENT_PROCESS"
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.process",
  "template": "When 'ICE.NDEX.NLB' is complete, run [process]",
  "icon": "play-fill text-success",
  "enabled": true,
  "conditions": [
    { "service": "dataset", "action": "complete", "id": "ICE.NDEX.NLB", "source": "private" }
  ],
  "properties": {
    "process": "MY_ENRICHMENT_PROCESS"
  }
}
```

</TabItem>
</Tabs>

## Sending data to a queue

Send a curve to a downstream system's queue each time it is updated. Curves and timeseries are in the `data` service, with ids of the form `OBJECT:DATA`.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Send a curve to a queue on update
a = AutomationBuilder("data", "private", "MY.GAS.HUB:FORWARD_CURVE").build()
c = SimpleObject()
c.service = "data"
c.source = "private"
c.id = "MY.GAS.HUB:FORWARD_CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.queue"
a.template = "When 'MY.GAS.HUB:FORWARD_CURVE' is updated, send a message to [queue]"
a.icon = "send text-red"
a.properties.queue = "etrm-curves"
a.properties.subject = ""
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.queue",
  "template": "When 'MY.GAS.HUB:FORWARD_CURVE' is updated, send a message to [queue]",
  "icon": "send text-red",
  "enabled": true,
  "conditions": [
    { "service": "data", "action": "update", "id": "MY.GAS.HUB:FORWARD_CURVE", "source": "private" }
  ],
  "properties": {
    "queue": "etrm-curves",
    "subject": ""
  }
}
```

</TabItem>
</Tabs>

## Automations on events

An event list is a data item with the id `OBJECT:EVENTLIST`, so an automation on events watches the `data` service. Updating events in the list raises an `update` on the event list.

```js
//#region Email the trades when the trade events are updated
a = AutomationBuilder("data", "private", "MY.PORTFOLIO:TRADES").build()
c = SimpleObject()
c.service = "data"
c.source = "private"
c.id = "MY.PORTFOLIO:TRADES"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.email_attachment"
a.template = "When 'MY.PORTFOLIO:TRADES' is updated, send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]"
a.icon = "envelope-paper text-outlook"
a.properties.to = "risk-team@mycompany.com"
a.properties.subject = "New trades"
a.properties.attachmentName = "trades.json"
a.properties.attachment = true
save ${automation:a}
//#endregion
```

### Dependent ids

A condition can have a dependent id, `did`. When it is set, the target is sent the dependent item rather than the item that triggered the automation. The platform uses this for the build automations of event curves and event timeseries: the condition watches the event list, and `did` is the curve to build.

```json
{
  "target": "odsl.ecurve",
  "template": "When 'MY.GAS.HUB:FORWARD_EVENTS' is updated, build Event Curve [curve]",
  "conditions": [
    {
      "service": "data",
      "action": "update",
      "id": "MY.GAS.HUB:FORWARD_EVENTS",
      "did": "MY.GAS.HUB:FORWARD_CURVE",
      "source": "private"
    }
  ],
  "properties": {
    "curve": "MY.GAS.HUB:FORWARD_CURVE"
  }
}
```

You don't need to create build automations yourself: the platform creates them when you save an event curve, smart curve, event timeseries or smart timeseries, and removes them when you delete it.

## Finding automations

```js
//#region Find automations
// All automations that send email
emails = find ${automation} where target = "odsl.email"
for a in emails
    print a.name
next
//#endregion
```

The list has one entry per condition, so an automation with two conditions is listed twice. Reading one automation by its id returns the whole automation:

```js
a = ${automation:"6718d2c4e5f1a20b3c4d5e6f"}
```

In the REST API, list with `GET https://api.opendatadsl.com/api/automation/v1` (with `_filter` as usual) and read one with `GET https://api.opendatadsl.com/api/automation/v1/{id}`.

## Changing or disabling an automation

Read the automation, change it and save it again. Set `enabled` to `false` to pause it without deleting it.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Disable an automation
a = ${automation:"6718d2c4e5f1a20b3c4d5e6f"}
a.enabled = false
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

Read the automation, change `enabled`, and post the whole document back with its `_id`:

```json
GET https://api.opendatadsl.com/api/automation/v1/6718d2c4e5f1a20b3c4d5e6f

POST https://api.opendatadsl.com/api/automation/v1

{
  "_id": "6718d2c4e5f1a20b3c4d5e6f",
  "target": "odsl.email",
  "template": "When 'ICE.NDEX.NLB' is late, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": false,
  "conditions": [
    { "service": "dataset", "action": "late", "id": "ICE.NDEX.NLB", "source": "private" }
  ],
  "properties": {
    "to": "ops-team@mycompany.com",
    "subject": "ICE Endex NLB settlement prices are late",
    "attachment": false
  }
}
```

</TabItem>
</Tabs>

:::note
Saving an automation makes you its owner, so it then runs with your security policies.
:::

## Testing an automation

A test run runs the automation once, now, for the item in its first condition as it is at the moment, whether the automation is enabled or not. It is logged with the reason `Test Run`.

```
GET https://api.opendatadsl.com/api/automation/v1/6718d2c4e5f1a20b3c4d5e6f?_run=true
```

Add `&_ondate=2026-10-28` to run it for a curve date or delivery date. An automation whose condition id is `*` cannot be test run.

Every run, test or real, is recorded in the `automationlog` service with its status and message:

```js
logs = find ${automationlog} where status = "failed"
```

## Deleting an automation

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Delete an automation
delete ${automation:"6718d2c4e5f1a20b3c4d5e6f"}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```
DELETE https://api.opendatadsl.com/api/automation/v1/6718d2c4e5f1a20b3c4d5e6f
```

</TabItem>
</Tabs>

:::tip Finding your automation id
The platform gives each automation an id when it is first saved. Find it with `find ${automation}`, in the item's Automations panel, or in the Automations extension.
:::

---

## Advanced features

Properties that start with `@` change when an automation runs and what data the target receives.

### Transforming data with a mustache template

Targets that allow transformation (email, queue and storage targets) accept an `@transformer` property: the name of a mustache script, or inline mustache text. The data is transformed with it before it is sent to the target. This example sends a curve as a CSV attachment using a mustache script `mycompany\templates\curve_csv` that you have saved in the script service.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Email a curve as CSV
a = AutomationBuilder("data", "private", "MY.GAS.HUB:FORWARD_CURVE").build()
c = SimpleObject()
c.service = "data"
c.source = "private"
c.id = "MY.GAS.HUB:FORWARD_CURVE"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.email_attachment"
a.template = "When 'MY.GAS.HUB:FORWARD_CURVE' is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]"
a.icon = "envelope-paper text-outlook"
a.properties.to = "analysts@mycompany.com"
a.properties.subject = "Forward curve"
a.properties.attachmentName = "forward_curve.csv"
a.properties.attachment = true
a.properties.add("@transformer", "mycompany\templates\curve_csv")
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email_attachment",
  "template": "When 'MY.GAS.HUB:FORWARD_CURVE' is updated, transform the data using [@transformer], then send an email to [to] with subject [subject], add the data as an attachment named [attachmentName]",
  "icon": "envelope-paper text-outlook",
  "enabled": true,
  "conditions": [
    { "service": "data", "action": "update", "id": "MY.GAS.HUB:FORWARD_CURVE", "source": "private" }
  ],
  "properties": {
    "to": "analysts@mycompany.com",
    "subject": "Forward curve",
    "attachmentName": "forward_curve.csv",
    "attachment": true,
    "@transformer": "mycompany\\templates\\curve_csv"
  }
}
```

</TabItem>
</Tabs>

### Running only when a property changes

For `update`, set both `@propertyName` and `@propertyValue` to run the automation only when that property of the item changes to that value. Use `*` as the value to run on any change of the property. This example emails the data team when a master data record's `status` changes to `retired`.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Email when status changes to retired
a = AutomationBuilder("object", "private", "MY.GAS.HUB").build()
c = SimpleObject()
c.service = "object"
c.source = "private"
c.id = "MY.GAS.HUB"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.email"
a.template = "When property [@propertyName] on 'MY.GAS.HUB' is set to [@propertyValue], send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "data-team@mycompany.com"
a.properties.subject = "MY.GAS.HUB has been retired"
a.properties.attachment = false
a.properties.add("@propertyName", "status")
a.properties.add("@propertyValue", "retired")
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When property [@propertyName] on 'MY.GAS.HUB' is set to [@propertyValue], send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    { "service": "object", "action": "update", "id": "MY.GAS.HUB", "source": "private" }
  ],
  "properties": {
    "to": "data-team@mycompany.com",
    "subject": "MY.GAS.HUB has been retired",
    "attachment": false,
    "@propertyName": "status",
    "@propertyValue": "retired"
  }
}
```

</TabItem>
</Tabs>

### Running only for items with a property value

For `create` and `delete`, `@propertyName` and `@propertyValue` run the automation only when the created or deleted item has that property value. Combined with the id `*`, this lets you react to a kind of item. This example emails the data team whenever a master data record of type `#Commodity` is created.

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
//#region Email when a commodity is created
a = AutomationBuilder("object", "private").build()
c = SimpleObject()
c.service = "object"
c.source = "private"
c.id = "*"
c.action = "create"
conds = []
conds.add(c)
a.conditions = conds
a.target = "odsl.email"
a.template = "When 'anything' is created with property [@propertyName] set to [@propertyValue], send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "data-team@mycompany.com"
a.properties.subject = "New commodity created"
a.properties.attachment = false
a.properties.add("@propertyName", "_type")
a.properties.add("@propertyValue", "#Commodity")
save ${automation:a}
//#endregion
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "odsl.email",
  "template": "When 'anything' is created with property [@propertyName] set to [@propertyValue], send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    { "service": "object", "action": "create", "id": "*", "source": "private" }
  ],
  "properties": {
    "to": "data-team@mycompany.com",
    "subject": "New commodity created",
    "attachment": false,
    "@propertyName": "_type",
    "@propertyValue": "#Commodity"
  }
}
```

</TabItem>
</Tabs>

### Summary of `@` properties

| Property | Applies to | Description |
|---|---|---|
| `@transformer` | Targets that allow transformation | The name of a mustache script, or inline mustache text, used to transform the data before the target receives it |
| `@propertyName` and `@propertyValue` | `update` | Run only when the named property changes to the value, or changes at all with `*` |
| `@propertyName` and `@propertyValue` | `create`, `delete` | Run only when the created or deleted item's property equals the value |

Both `@propertyName` and `@propertyValue` must be set for either to have an effect.

---

## Next steps

- [Automation Targets](/docs/topics/automations/targets): all the targets and the properties each one needs
- [Automations extension](/docs/extensions/automations/monitoring): monitor automation runs and failures in the portal
- [Automation Basics](/docs/topics/automations/basics): the trigger reference and how templates are made
