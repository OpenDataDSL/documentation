---
title: Alerts in ODSL
description: Find, read, raise, comment on, hand over and close alerts from ODSL scripts with the alert service
slug: /extensions/alerts/odsl
sidebar_position: 4
tags: [extension, alerts, odsl]
---

# Alerts in ODSL

Scripts work with alerts through the [alert service](/docs/odsl/service/alert). An alert is read as an object: change its fields and save it to change the alert. The same rules apply as in the portal: you can change your own alerts, and only comment on shared ones.

---

## Find alerts

```js
// Your open alerts in the environment the script runs in
open = find ${alert:private} where status == "open"
for a in open
    print a._id + " " + a.severity + " " + a.title
next

// Your critical alerts waiting on your team
mine = find ${alert:private} where status == "open" and agent == "client" and severity == "critical"

// Open shared alerts about common data (common in quotes) and public data
common = find ${alert:"common"} where status == "open"
public = find ${alert:public} where status == "open"
```

`find` returns the alerts without their timelines. Read an alert by its id to get the timeline.

---

## Read an alert

```js
a = ${alert:"ALR-2026-000401"}
print a.title
print a.status + ", with " + a.agent
for e in a.timeline
    print e.type + " by " + e.by
next
```

Ids starting `ALC-` are read from common and ids starting `ALP-` from public, so a shared alert is read the same way:

```js
s = ${alert:"ALC-2026-000407"}
```

---

## Comment

Set `comment` and save:

```js
a = ${alert:"ALR-2026-000401"}
a.comment = "Settlement run repeated at 21:30 with the republished contracts"
save ${alert:a}
```

On a shared alert the comment is only seen by your team and OpenDataDSL. A comment is the only change you can save to a shared alert.

---

## Change an alert

Change any of these fields and save. Add a `comment` in the same save to say why.

| Field | Values |
|-|-|
| `status` | `open` or `closed`. Closing needs `resolution` |
| `resolution` | What was wrong and what was done |
| `agent` | Who the alert is with: `client` (your team), `opendatadsl`, or a data vendor's name |
| `severity` | `critical`, `high`, `medium` or `low` |
| `title`, `description`, `assignee` | Text |
| `tags` | A list of text |

```js
// Hand an alert to OpenDataDSL
a = ${alert:"ALR-2026-000402"}
a.agent = "opendatadsl"
a.comment = "The broker file is in our SFTP folder but did not load. Can you check the loader?"
save ${alert:a}

// Close it
a = ${alert:"ALR-2026-000402"}
a.status = "closed"
a.resolution = "Loader fixed by OpenDataDSL; file reloaded at 10:15"
save ${alert:a}
```

:::note Read before every change
The alert you read carries its version (`_version`). If anyone changes the alert after you read it, your save is refused with `has been changed by someone else, reload it and try again`. Read the alert again before each change, as in the example above, rather than saving the same object twice.
:::

---

## Raise an alert

Build an object with at least a `title` and save it to the alert service. It is raised as one of your alerts in the environment the script runs in.

```js
n = SimpleObject()
n.title = "NGE.BROKER.NBP prices look stale since Monday"
n.message = "The broker NBP Day-ahead and Month+1 have not changed for three days"
n.severity = "high"
n.issue = "quality"
n.agent = "opendatadsl"
n.subject = SimpleObject()
n.subject.service = "dataset"
n.subject.id = "NGE.BROKER.NBP"
n.key = "northgate/stale/NGE.BROKER.NBP"
save ${alert:n}
```

| Field | Notes |
|-|-|
| `title` | Required |
| `message` | What is wrong. The title is used when left out |
| `severity` | `medium` when left out |
| `agent` | `client` when left out (your team tracks it). Use `opendatadsl` to ask for help |
| `issue` | The type, such as `delivery`, `completeness`, `quality`, `build` or `export` |
| `category` | A grouping of your own. The subject's service when left out |
| `subject` | What the alert is about: `service` (dataset, curve, data, process and so on), `id`, and `ondate` for one day's delivery or build |
| `key` | An id for the problem itself (see below) |
| `comment` | A first comment |
| `description`, `assignee`, `tags` | Optional |

### Raising the same problem again

A script that checks something every hour should not raise a new alert every hour. Give the alert a `key`, as in the example above: while an alert with that key is open, raising it again adds one to its `occurrences` (and raises its priority if the new one is higher) instead of creating another alert. If the alert with that key closed in the last 7 days, it is reopened.

The object you saved is not given the new alert's id. Find the alert by its key:

```js
found = find ${alert:private} where key == "northgate/stale/NGE.BROKER.NBP" and status == "open"
for a in found
    print a._id + " occurred " + a.occurrences + " times"
next
```

---

## Next

[Alerts in Python](/docs/extensions/alerts/python)
