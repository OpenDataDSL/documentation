---
slug: /topics/automations/basics
title: Automation Basics
description: The basics of event-driven programming in OpenDataDSL
sidebar_position: 1
tags:
- topics
- automation
- basics
- event-driven
---

Automations in OpenDataDSL are **event-driven data flows**: when something happens in the platform, such as data being updated, a process failing or a dataset becoming late, an automation runs an action automatically.

## What are automations?

An automation watches one or more items and listens for specific actions on them. When a matching action happens, the automation sends the item's data to an **automation target**, which does the work: send an email, publish to a queue, run a process, build a curve and so on.

This makes automations the main way to build reactive data pipelines without polling or extra scheduling.

You can create and manage automations in three ways:

- In the portal, from the **Automations** panel of an item, or with the [Automations extension](/docs/extensions/automations/overview)
- In ODSL, using the [Automation](/docs/odsl/variable/automation) type and the `automation` service
- With the [Automation REST API](/docs/api/rest/service/automation)

## Triggering events

Every automation is triggered by an **action** on an item in a **service**. The table below lists the services you will use most and the actions each one raises.

| Service | Actions |
|---|---|
| alert | raised, closed, reopened, agent, severity, comment |
| curve | create, update, delete, build, success, warning, failed |
| data | create, update, delete, validated, invalid |
| dataset | update, late, complete, missing, correction |
| extension | create, update, delete, late, complete, missing, install, upgrade, uninstall |
| group | create, update, delete, itemadded, itemremoved, itemupdated |
| process | create, update, delete, rollback, promote, tag, untag, rename, run, success, warning, failed |
| queue | create, update, delete, message |
| report | create, update, delete, run, success, warning, failed |
| script | create, update, delete, rollback, promote, tag, untag, rename, run, success, warning, failed |
| scriptlog | create |
| validation | create, update, delete, success, warning, failed |

Other services, for example `object`, `calendar`, `type`, `action`, `workflow`, `extractor`, `transformer`, `reportconfig`, `dashboard`, `documentation` and `policy`, raise `create`, `update` and `delete`.

A few points to know:

- **Timeseries, curves and event lists are all in the `data` service.** An event list is a data item with the id `OBJECT:EVENTLIST`, so automations on events use the `data` service.
- `validated` and `invalid` are only raised for curves and timeseries, by the [Validation](/docs/extensions/validation/overview) extension.
- Dataset actions are raised by dataset monitoring with source `private`, using the dataset id (`provider.feed.product`) as the item id.
- A `create` condition always uses the id `*`, because the item does not exist yet.

## Anatomy of an automation

An automation is stored as a JSON document in the `automation` service. Here is an example that emails the operations team when a dataset is late:

```json
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

### Fields

#### `target`
The id of the [automation target](/docs/topics/automations/targets) that receives the data and acts on it, for example `odsl.email`, `odsl.queue` or `odsl.process`. Target ids are `publisher.code`; all the targets provided by OpenDataDSL start with `odsl.`.

#### `template`
The sentence that describes the automation. It is required. The platform creates the automation's `name` from it by replacing each `[property]` with that property's value, so the example above is named:

*When 'ICE.NDEX.NLB' is late, send an email to 'ops-team@mycompany.com' with subject 'ICE Endex NLB settlement prices are late'*

The portal's Automations panel offers a fixed set of templates for each item, made from the action and the target's own template (see [Templates](#templates) below). Use exactly one of those texts, otherwise the automation still runs but is not shown in the item's Automations panel.

#### `icon`
The [Bootstrap Icons](https://icons.getbootstrap.com/) name shown next to the automation in the portal, usually the target's icon. You can add a colour class, for example `envelope-at text-outlook`.

#### `enabled`
Set to `false` to pause the automation without deleting it. The default is `true`.

#### `conditions`
A list of trigger conditions. The automation runs when **any** condition matches. Each condition has:

| Field | Required | Description |
|---|---|---|
| `service` | Yes | The service to watch, for example `dataset` |
| `action` | Yes | The action that triggers the automation, for example `late` |
| `id` | Yes | The id of the item to watch, or `*` for any item |
| `source` | Yes | The source of the item: `private`, `public` or `common` |
| `did` | No | A dependent id. When set, the target is sent the dependent item instead of the item that triggered it. The platform uses this to build an event curve when its event list is updated |

#### `properties`
The values the target needs, named after the inputs in the target's template, for example `to` and `subject` for an email. Some targets also need fixed properties: an email needs `attachment` set to `false` (or `true` to attach the data). Each target's page lists what it needs.

When the automation runs, the platform also adds these properties for the target:

| Property | Description |
|---|---|
| `id` | The id of the item that triggered the automation |
| `ondate` | The curve date of a curve, or the delivery date of a dataset |
| `range` | The range of observations of a timeseries update |

Properties starting with `@` change when and how the automation runs, see [Advanced features](/docs/topics/automations/creating).

#### `name`, `owner`
These are set by the platform when the automation is saved. The **owner** is whoever saved the automation last: the automation runs with the owner's security policies, so the owner needs access to the item and to whatever the target does.

## Templates

The templates offered for an item are made like this:

| Kind | Template |
|---|---|
| Standard | `When '<id>' <action text>, <target template>` |
| With a transformer | `When '<id>' <action text>, transform the data using [@transformer], then <target template>` |
| Property change (update) | `When property [@propertyName] on '<id>' is set to [@propertyValue], <target template>` |
| Property set (create, delete) | `When 'anything' is created with property [@propertyName] set to [@propertyValue], <target template>` |
| Alerts | `When an alert <action text> for '<id>', <target template>` |

`<id>` is the item id, or `anything` for `*`. The action text is:

| Action | Text | Action | Text |
|---|---|---|---|
| create | is created | complete | is complete |
| update | is updated | correction | has a correction |
| delete | is deleted | success | is successful |
| rename | is renamed | warning | has a warning |
| rollback | is rolled back | failed | has failed |
| promote | is promoted | validated | passes validation (or its failure is overridden) |
| tag | is version tagged | invalid | fails validation |
| untag | is version un-tagged | itemadded | has an item added |
| late | is late | itemremoved | has an item removed |
| missing | is missing | itemupdated | has an item updated |

For alerts: raised (is raised), closed (is closed), reopened (is reopened), agent (is handed to a different agent), severity (changes severity) and comment (has a comment added, edited or deleted).

The transformer form is only offered for targets that allow transformation, and the property change form only for targets that allow property checks. The [targets page](/docs/topics/automations/targets) lists both for every target.

:::tip Get the exact text from the platform
The `listAutomations` [special function](/docs/api/rest/special_functions) returns the offers for an item, with the exact template, target, icon, conditions and default properties:

```
GET https://api.opendatadsl.com/api/dataset/v1/private/ICE.NDEX.NLB?_function=listAutomations
```
:::

## Automations created for you

Some automations are created and kept up to date by the platform or by extensions, and you do not normally create them yourself:

- **Build automations:** saving a Smart Curve, Event Curve, Smart TimeSeries or Event TimeSeries creates the automation that rebuilds it when its inputs change, and deleting the item removes it
- **Validation checks:** the Validation extension keeps an `odsl.validation` automation for each validation configuration
- **Compositions:** Composer keeps an `odsl.composition` automation for each composition

## Next steps

- [Creating Automations](/docs/topics/automations/creating): create, change, test and delete automations in ODSL and the REST API
- [Automation Targets](/docs/topics/automations/targets): the available targets and the properties each one needs
- [Automations extension](/docs/extensions/automations/overview): manage and monitor automations in the portal
