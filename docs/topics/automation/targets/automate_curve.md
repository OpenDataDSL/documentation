---
slug: /topics/automations/targets/curve
title: Curve Build Targets
description: How Smart Curve and Event Curve builds are triggered by automations
sidebar_position: 4
tags:
- topics
- automation
- target
- curve
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The curve build targets build a Smart or Event Curve when the data it depends on is updated.

| Id | Name | Template | Services | Actions |
|---|---|---|---|---|
| `odsl.curve` | Build a Smart Curve | `build Smart Curve [curve]` | data | update |
| `odsl.ecurve` | Build an Event Curve | `build Event Curve [curve]` | event, data | update |

Neither target supports `@transformer` or property-change filtering. The `event` service is mapped to `data`, so conditions on event lists use the `data` service. The icons are `graph-up text-success` for Smart Curves and `graph-up-arrow text-primary` for Event Curves.

## Inputs

| Input | Description |
|---|---|
| `curve` | The id of the Curve to build |

## Created for you by the platform

You don't normally create these automations yourself. When you save a [Smart Curve](/docs/odsl/variable/smartcurve) or an [Event Curve](/docs/odsl/variable/eventcurve), the platform creates its build automations, and when you delete it the platform removes them.

You can list them with ODSL:

```js
find ${automation} where target = "odsl.curve"
find ${automation} where target = "odsl.ecurve"
```

## What an Event Curve build automation looks like

Event lists are data items, so an Event Curve build automation has a condition on the **event list** with the `data` service and the `update` action. The condition also has `did` set to the id of the Event Curve, so the platform knows which item the automation belongs to. For an Event Curve `MY_OBJECT:CURVE` built from the event list `MY_OBJECT:TRADES`, the automation looks like this:

```json
{
  "target": "odsl.ecurve",
  "template": "When 'MY_OBJECT:TRADES' is updated, build Event Curve [curve]",
  "icon": "graph-up-arrow text-primary",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:TRADES",
      "action": "update",
      "did": "MY_OBJECT:CURVE"
    }
  ],
  "properties": {
    "curve": "MY_OBJECT:CURVE"
  }
}
```

## Reacting to a build

A built curve is saved like any other data, so you can create your own automations on it with the `data` service and the `update` action. Use the id of the built Curve, not the id of its inputs. For example, to email the team each time the Event Curve is rebuilt:

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

a.target = "odsl.email"
a.template = "When 'MY_OBJECT:CURVE' is updated, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "trading@mycompany.com"
a.properties.subject = "MY_OBJECT:CURVE has been rebuilt"
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
  "template": "When 'MY_OBJECT:CURVE' is updated, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
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
    "to": "trading@mycompany.com",
    "subject": "MY_OBJECT:CURVE has been rebuilt",
    "attachment": false
  }
}
```

</TabItem>
</Tabs>

---

## Related pages

- [Automation Basics](/docs/topics/automations/basics): how automations work, conditions and templates
- [Creating Automations](/docs/topics/automations/creating): step-by-step guide to setting up automations
- [TimeSeries Build Targets](/docs/topics/automations/targets/timeseries): the equivalent targets for Smart and Event TimeSeries
- [Email Target](/docs/topics/automations/targets/email): send a notification when a build completes
- [Export Group Target](/docs/topics/automations/targets/curve-export): export data when it changes
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
