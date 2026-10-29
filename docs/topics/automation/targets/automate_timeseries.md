---
slug: /topics/automations/targets/timeseries
title: TimeSeries Build Targets
description: How Smart TimeSeries and Event TimeSeries builds are triggered by automations
sidebar_position: 5
tags:
- topics
- automation
- target
- timeseries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The timeseries build targets build a Smart or Event TimeSeries when the data it depends on is updated.

| Id | Name | Template | Services | Actions |
|---|---|---|---|---|
| `odsl.timeseries` | Build a Smart TimeSeries | `build Smart Timeseries [timeseries]` | data | update |
| `odsl.etimeseries` | Build an Event TimeSeries | `build Event Timeseries [timeseries]` | data | update |

Neither target supports `@transformer` or property-change filtering. The `odsl.etimeseries` target is used by the platform for Event TimeSeries builds.

## Inputs

| Input | Description |
|---|---|
| `timeseries` | The id of the TimeSeries to build |

## Created for you by the platform

You don't normally create these automations yourself. When you save a [Smart TimeSeries](/docs/odsl/variable/smarttimeseries) or an [Event TimeSeries](/docs/odsl/variable/eventtimeseries), the platform creates its build automations, and when you delete it the platform removes them.

You can list them with ODSL:

```js
find ${automation} where target = "odsl.timeseries"
find ${automation} where target = "odsl.etimeseries"
```

## What an Event TimeSeries build automation looks like

Event lists are data items, so an Event TimeSeries build automation has a condition on the **event list** with the `data` service and the `update` action. The condition also has `did` set to the id of the Event TimeSeries, so the platform knows which item the automation belongs to. For an Event TimeSeries `MY_OBJECT:EVENT_SERIES` built from the event list `MY_OBJECT:TRADES`, the automation looks like this:

```json
{
  "target": "odsl.etimeseries",
  "template": "When 'MY_OBJECT:TRADES' is updated, build Event Timeseries [timeseries]",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:TRADES",
      "action": "update",
      "did": "MY_OBJECT:EVENT_SERIES"
    }
  ],
  "properties": {
    "timeseries": "MY_OBJECT:EVENT_SERIES"
  }
}
```

## Reacting to a build

A built timeseries is saved like any other data, so you can create your own automations on it with the `data` service and the `update` action. Use the id of the built TimeSeries, not the id of its inputs. For example, to email the team each time the Event TimeSeries is rebuilt:

<Tabs>
<TabItem value="odsl" label="ODSL">

```js
a = AutomationBuilder("data", "private", "MY_OBJECT:EVENT_SERIES").build()

c = SimpleObject()
c.source = "private"
c.service = "data"
c.id = "MY_OBJECT:EVENT_SERIES"
c.action = "update"
conds = []
conds.add(c)
a.conditions = conds

a.target = "odsl.email"
a.template = "When 'MY_OBJECT:EVENT_SERIES' is updated, send an email to [to] with subject [subject]"
a.icon = "envelope-at text-outlook"
a.properties.to = "trading@mycompany.com"
a.properties.subject = "MY_OBJECT:EVENT_SERIES has been rebuilt"
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
  "template": "When 'MY_OBJECT:EVENT_SERIES' is updated, send an email to [to] with subject [subject]",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    {
      "source": "private",
      "service": "data",
      "id": "MY_OBJECT:EVENT_SERIES",
      "action": "update"
    }
  ],
  "properties": {
    "to": "trading@mycompany.com",
    "subject": "MY_OBJECT:EVENT_SERIES has been rebuilt",
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
- [Curve Build Targets](/docs/topics/automations/targets/curve): the equivalent targets for Smart and Event Curves
- [Email Target](/docs/topics/automations/targets/email): send a notification when a build completes
- [Export Group Target](/docs/topics/automations/targets/curve-export): export data when it changes
- [Automation Targets](/docs/topics/automations/targets): overview of all available targets
