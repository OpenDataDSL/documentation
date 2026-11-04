---
title: Adding tasks
description: Add task tiles from your own extensions, choose what they open, and link alerts to them
slug: /extensions/home/adding-tasks
sidebar_position: 3
tags: [extension, home, tasks, alerts, building extensions]
---

# Adding tasks

Every extension can add tasks to the Home page. A task is a record in the **task service**: you save it in your extension's `create-extension.odsl` script and list it in the extension's resources. Installing the extension then adds the task for every tenant it is installed in, and uninstalling the extension removes it.

Tenant admins can also add tasks of their own through ODSL or the REST API.

---

## A task in ODSL

A task is a `SimpleObject` saved to the task service:

```js
t = SimpleObject()
t.set_Id("acme.positions.check-limits")
t.name = "Check position limits"
t.description = "Books that are over or close to their limits"
t.group = "check"
t.icon = "speedometer2"
t.priority = 70
t.keywords = "limit, limits, position, exposure, breach"
t.extension = "acme.positions"
t.requires = "acme.positions"
t.target = SimpleObject()
t.target.type = "view"
t.target.extension = "acme.positions"
t.target.view = "limits"
t.alerts = SimpleObject()
t.alerts.filter = '{"category": "limits"}'
t.alerts.label = "breach"
t.alerts.okLabel = "Within limits"
save ${task:t}
```

- The id needs at least one dot. For an extension's tasks use the extension id and a name: `acme.positions.check-limits`.
- Lists, such as `keywords` and `requires`, can be written as comma separated text.
- The alerts filter is written as JSON text, because a `SimpleObject` cannot hold the `$` keys a filter often needs (`$in`, `$or`).
- Only tenant admins and OpenDataDSL can save and delete tasks.

---

## Installing tasks with your extension

List each task in `e.resources.task`, by its id:

```js
e.resources.task.tile_check_limits = "acme.positions.check-limits"
```

Publishing the extension copies the task with it. Installing the extension adds the task to the tenant's task service, and upgrading it replaces the task with the published one. Uninstalling the extension removes the task.

Set `requires` to your extension's id, so the task only shows where your extension is installed.

---

## What a task opens

| Target | Fields | Opens |
|-|-|-|
| An extension view | `type` `view`, `extension`, `view` (the view id given to `e.addView`), optional `properties` | That view, with `properties` passed to it as report properties (and `ID` set to the extension id, as for a menu item) |
| A portal screen | `type` `portal`, `section`, `name`, optional `tabname` | That screen, for example `Information` > `Data` |
| A web page | `type` `url`, `url` (`https://` or `http://`), optional `newTab` (default true) | The page |

Give view properties as JSON text in ODSL: `t.target.properties = '{"STATUS": "open"}'`.

---

## Linking alerts to a task

There are two ways for alerts to count on a task. A task with open alerts shows a badge with their number and moves to **Needs you now**.

### A filter on the task

`alerts.filter` selects the open alerts that belong to the task, by the alerts' own fields, in the usual filter form:

| To count | Filter |
|-|-|
| Root cause alerts and failed loads | `{"$or": [{"root": true}, {"issue": "load"}]}` |
| Late and incomplete deliveries | `{"issue": {"$in": ["delivery", "completeness"]}}` |
| Alerts about one family of curves | `{"subject.service": "curve", "subject.id": {"$regex": "^TTF"}}` |
| Every open alert | `{}` |

Alert fields you can use include `severity`, `category`, `issue`, `root`, `agent`, `tags`, `key`, `title` and `subject` (`subject.service`, `subject.id`, `subject.ondate`). The filter supports field values, `$and`, `$or`, `$nor`, `$not`, `$eq`, `$ne`, `$in`, `$nin`, `$all`, `$exists`, `$regex` (with `$options`), `$gt`, `$gte`, `$lt`, `$lte` and `$size`.

`alerts.sources` chooses where the alerts come from: `private` (your team's own alerts), `common` and `public` (shared alerts). All three are used by default. Shared alerts are counted only for the datasets your team follows, unless you set `alerts.followedOnly` to false.

`alerts.label` is the word used to count them (**issue** shows **2 issues**) and `alerts.okLabel` is shown when none are open.

### A tag on the alert

Any alert with the tag `task:` followed by the task id counts on that task, whatever the task's filter. Use this when you raise an alert yourself:

```js
a = SimpleObject()
a.title = "Margin report for Q3 not sent"
a.severity = "high"
a.tags = ["task:acme.positions.check-limits"]
save ${alert:a}
```

See [Alerts in ODSL](/docs/extensions/alerts/odsl) for raising alerts.

---

## Groups, priority and featured tasks

- `group`: `check`, `find`, `build` or `deliver` come first, in that order. Any other short name (`data-quality`) makes a new group, shown after them with its name as the label (**Data quality**).
- `priority`: 0 to 100, default 50. Higher priority tasks come first in their group.
- `featured`: set it to false for a task that should only show under **See all tasks** or in a search.
- `keywords`: other words people might type for the task.
- `icon`: any [Bootstrap icon](https://icons.getbootstrap.com/) name, such as `graph-up` or `shield-exclamation`.
