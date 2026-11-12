---
title: Auditing reference
description: The fields of each log, how the filters and following work, permissions, the extension contents and troubleshooting
slug: /extensions/auditing/reference
sidebar_position: 4
tags: [extension, auditing, reference, audit, logs]
---

# Auditing reference

---

## The fields of each log

Use these names in **More conditions** on the Logs tab, for example `{"status": "failed", "target": "odsl.email"}`. Times are filtered with UTC text such as `"2026-11-12T08:00:00"`, which the platform turns into a date.

| Log | Read from | Ordered by | Main fields |
|-|-|-|-|
| Process runs | `process-exec/v1` | `start` | `name`, `status`, `trigger`, `reason`, `start`, `end`, `message`, `runAs`, `phases` (`name`, `status`, `log`), `trace` |
| Schedules fired | `crontablog/v1` | `timestamp` | `name`, `trigger` (when it was due), `timestamp` (when it fired), `event`, `invocationId` |
| Script runs | `scriptlog/v1` | `timestamp` | `script`, `function`, `region`, `scriptType`, `status`, `message`, `trigger`, `log`, `invocationId`, `rootInvocationId` |
| Automations | `automationlog/v1` | `timestamp` | `automation`, `target`, `service`, `source`, `key`, `action`, `ondate`, `status`, `message`, `method`, `reason`, `invocationId`, `rootInvocationId`, `trace` |
| Queue messages | `queuelog/v1` | `timestamp` | `queue`, `subject`, `contentType`, `contentId`, `status` (`success` or `fail`), `statusMessage`, `origin`, `reason`, `size`, `invocationId`, `messageId`, `trace` |
| Changes | `audit/v1/private` | `timestamp` | `service`, `source`, `key`, `action`, `status` (HTTP status, 400 or more when refused), `user`, `description`, `changes` (`kind`, `path`, `lhs`, `rhs`), `invocationId` |
| Dataset deliveries | `dataset_delivery/v1/private` | `ondate` | `dsid`, `ondate`, `status`, `statusinfo`, `score`, `complete`, `timestamp` (loaded), `lastAttempt`, `qualityStatus`, `criticalStatus`, `timeline`, `deliveries`, `traces` |
| Alerts | `alert/v1/private` | `created.at` | `title`, `message`, `status`, `severity`, `agent`, `category`, `issue`, `key`, `subject` (`service`, `id`, `ondate`), `created`, `closed`, `timeline`, `root`, `trace`, `traces` |
| Fusion AI runs | `airun/v1` | `_created` | `playbook`, `task`, `name`, `user`, `status`, `mode`, `trigger`, `current`, `steps`, `tokens`, `error` |
| API requests | `metric/v1` | `timestamp` | `method`, `service`, `key`, `action`, `httpstatus`, `duration` (ms), `responseSize`, `application`, `user`, `dsid`, `invocationId` |

---

## How the filters work

| Filter | Logs and fields |
|-|-|
| **Time window** | The log's ordering field above. Dataset deliveries are filtered on their ondate by day |
| **Item** | Matches the start of: Process runs `name`; Schedules `name`; Script runs `script`; Automations `key`, `automation` or `target`; Queue messages `contentId`, `subject` or `queue`; Changes `key`; Deliveries `dsid`; Alerts `subject.id` or `key`; Fusion AI runs `playbook`, `task` or `name`; API requests `key` or `dsid` |
| **User** | Changes `user`, Process runs `runAs`, Alerts `created.by`, Fusion AI runs `user`, API requests `user`. Any part, any case |
| **Problems only** | Process runs, Script runs, Automations and Fusion AI runs with a failed, error, warning or stopped status; Queue messages `fail`; Changes with status 400 or more; Deliveries late, missing or partial; every Alert; API requests with status 400 or more. Schedules fired record no failures |

---

## How a run is linked

| From | To | Through |
|-|-|-|
| Schedule fired | Process run | The fire id is the run's execution id |
| Process run | Script runs, automations | Their `rootInvocationId` is the run's execution id |
| Process run | Changes saved in the run | Their `invocationId` |
| Process run | Automations, queue messages, deliveries, alerts | The run's `trace`, carried by everything it sets off |
| Automation | Queue messages it sent | Its `invocationId` and `trace` |

---

## Permissions

Every log is read through the normal platform services with your own access, so you see the same records you could read through the API. Process runs, schedules, Fusion AI runs and API requests are limited to your company. Dataset deliveries and alerts are read from your private data: shared (common) delivery status and shared alerts are not included; use the **Alerts** extension for shared alerts.

The menu item and the two tabs are features of the feature policy `extension.odsl.auditing`, which gives them to everyone when installed.

---

## Extension contents

| Kind | Id |
|-|-|
| Extension | `odsl.auditing` |
| Feature policy | `extension.odsl.auditing` (features `odsl.auditing.manage`, `odsl.auditing.master_data`, `odsl.auditing.data`) |
| Menu view | **Monitor > Auditing** |
| Tabs | **Auditing** on the **Data** and **Master Data** screens |
| Home page tasks | `odsl.auditing.problems`, `odsl.auditing.follow`, `odsl.auditing.changes` |

The menu view takes these properties, for links and Home page tasks:

| Property | Example | What it does |
|-|-|-|
| `TAB` | `timeline` | Opens `overview`, `timeline`, `logs` or `follow` |
| `WINDOW` | `24h` | `1h`, `6h`, `24h`, `3d`, `7d` or `30d` |
| `ITEM` | `ICE.ENDEX.TTF` | Fills in **Item** |
| `USER` | `tom.clarke` | Fills in **User** |
| `PROBLEMS` | `true` | Ticks **Problems only** |
| `LOGS` | `process-exec,automationlog` | The logs shown |
| `LOG` | `audit` | The log on the Logs tab |
| `TRACE` | an id | Opens **Follow a run** and follows it |

---

## Indexes

The logs grow quickly, so the platform keeps indexes on the fields Auditing filters, sorts and follows by: each log's time field, its item fields, status, user and correlation ids (`invocationId`, `rootInvocationId`, `trace`, `traces`, `messageId`). It creates them the first time a log is read, in the background, so the first searches on a big log can be slower while they are built.

To make sure of them now, select **Check the log indexes** at the bottom of the **Overview**. It lists each log collection with the indexes made and any that could not be. Your company's own logs are checked for you; the shared logs (API requests, schedules, Fusion AI runs, shared dataset deliveries and alerts) are looked after by OpenDataDSL.

The same check through the API:

```
GET https://api.opendatadsl.com/api/audit/v1/private?_function=ensureIndexes&force=true
```

---

## Troubleshooting

| You see | Why, and what to do |
|-|-|
| A log chip with a warning sign | That log could not be read. Hover the sign, or read the status line, for the platform's reason (often a missing permission) |
| **n/a** on a log chip | The log cannot answer the filters: it records no user, or no failures for **Problems only** |
| **many** instead of a count | The platform did not count the matches. Narrow the window |
| **Follow a run** finds nothing | Check the id, and that the portal is on the data environment the run was in |
| The first search on a log is slow | Its indexes are being built. Wait a minute and search again, or select **Check the log indexes** on the Overview |
| Problems over time is not shown | The platform refused the aggregation; the reason is shown. The rest of the overview still works |
