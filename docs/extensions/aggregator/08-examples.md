---
title: Aggregator examples
description: The example aggregations you can start from, and the stages each one shows
slug: /extensions/aggregator/examples
sidebar_position: 8
tags: [extension, aggregator, aggregation, examples]
---

# Aggregator examples

The **Aggregations** tab has examples under **Start from an example**. Each opens unsaved in the workspace, so you can run it, change it and save it under your own name. They are also a quick way to learn a stage: each one uses a different mix. The **Report properties** group shows aggregations that one report or another can fill in differently.

---

## The examples

| Group | Example | Service | Shows |
|-|-|-|-|
| Fusion AI | Fusion AI tokens by user | Fusion AI usage | `$match` on a date range, `$group`, `$sort`, `$project` |
| Fusion AI | Fusion AI tokens by day | Fusion AI usage | Counting distinct users with `$addToSet` and `$size` |
| Fusion AI | Heaviest Fusion AI conversations | Fusion AI usage | `$first`, `$sort` and `$limit` for a top 20 |
| Fusion AI | Playbook runs by status | Fusion AI playbook runs | Grouping by two fields |
| Fusion AI | Scheduled playbook tasks | Fusion AI tasks | A filtered list without grouping |
| Automations | Automation failures by target | Automation logs | `$max` for the latest failure, `$last` for its message |
| Automations | Automation runs by day | Automation logs | `$set` with `$dateToString` to group by day |
| Automations | Automations by target and service | Automations | Grouping the automation conditions |
| Automations | Automation success rate by target | Automation logs | `$cond`, `$divide` and `$round` to calculate a percentage |
| Data and master data | Data by type | Data | A count per type |
| Data and master data | Master data by type | Master data objects | A count per type, top 50 |
| Data and master data | Data overview in one row | Data | `$facet`: a total, a count per type and the latest updates together |
| Data and master data | Dataset deliveries by status | Dataset deliveries (common) | `$sortByCount` for the deliveries of the ondate |
| Platform | Scripts by category | Scripts | A count and the latest change per category |
| Platform | Recently changed scripts | Scripts | `$sort`, `$limit` and renaming fields |
| Platform | Reports by type and schedule | Report configurations | `$cond` and `$ifNull` |
| Logs and metrics | Changes by user and action | Audit log | Grouping by two fields, `$max` for the latest change |
| Logs and metrics | Changes by service | Audit log | `$addToSet` and `$size` to count the users |
| Logs and metrics | Failed changes | Audit log | `$match` on the status (400 and above), the latest 100 with the reason |
| Logs and metrics | API requests by service | Request metrics | `$avg`, `$max` and `$sum` on the duration and size, rounded with `$round` |
| Logs and metrics | Slowest API requests | Request metrics | `$sort` on the duration and `$limit` for a top 50 |
| Logs and metrics | API errors by status | Request metrics | `$match` on the HTTP status, grouped by status and service |
| Logs and metrics | Scheduled runs by schedule | Schedule logs | `$min` and `$max` for the first and last trigger time |
| Report properties | Fusion AI usage for one user | Fusion AI usage | `@{user}` in a `$match`, with a date range |
| Report properties | Conversations over a token threshold | Fusion AI usage | `@{minTokens}` in a `$match` after the `$group`, read as a number |
| Report properties | Runs of one playbook | Fusion AI playbook runs | `@{playbook}` in a `$match` |
| Report properties | Failures of one automation target | Automation logs | `@{target}` in a `$match`, `$sort` and `$limit` for the latest 100 |
| Report properties | Change history of one item | Audit log | `@{key}` in a `$match`, the latest 50 changes |
| Report properties | Deliveries of a group of datasets | Dataset deliveries (common) | `@{datasets}` as a `$regex` on the dataset ID |

---

## Logs and metrics

The platform keeps a record of what happens in it. The examples in the **Logs and metrics** group summarise three of these records:

| Service | One record for | Fields the examples use |
|-|-|-|
| **Audit log** (`audit`, private) | Each change made through the platform: a create, update or delete | `timestamp`, `user`, `action`, `service`, `key` (the item's ID), `status` (the HTTP status, 400 and above when the change was refused), `description` |
| **Request metrics** (`metric`) | Each API request made by a user | `timestamp`, `user`, `method` (get, post, put, delete), `service`, `key`, `duration` (milliseconds), `responseSize` (bytes), `httpstatus` |
| **Schedule logs** (`crontablog`) | Each time a schedule fired | `timestamp`, `trigger` (the time it was due), `name` (the schedule) |

Request metrics and schedule logs are kept for the whole platform, and the platform only lets you see your organisation's records. These services are also why some stages, such as `$documents`, cannot run first on them: the platform puts its own filter first. See [Where a stage can run](/docs/extensions/aggregator/how-it-works#stages).

:::tip
These make good scheduled reports. For example, **API errors by status** as a daily report emailed to whoever looks after your integrations, or **Failed changes** each morning for the data team.
:::

---

## Examples with report properties

The examples in the **Report properties** group each use a [report property](/docs/extensions/aggregator/how-it-works#report-properties). Save one once, then make a report for each value you need: the aggregation stays the same and each report sets its own value under **Report properties**.

| Example | Property | Test value | Reports you could make |
|-|-|-|-|
| Fusion AI usage for one user | `user` | Your own email address | One monthly report for each person, emailed to them |
| Conversations over a token threshold | `minTokens` | `100000` | A weekly check at `500000` for the finance team, and a daily one at `100000` for the platform team |
| Runs of one playbook | `playbook` | `#process-failure-triage` | One report for each playbook you run on a schedule |
| Failures of one automation target | `target` | `odsl.email` | One report for each target its owner looks after, such as `odsl.email` and `odsl.curve` |
| Change history of one item | `key` | `ECB_FX` | A weekly report of the changes to each important item, such as a key curve or a master data record |
| Deliveries of a group of datasets | `datasets` | `.*` (every dataset) | `^ICE_` for the ICE desk, `^EEX_` for the power desk, as in [One aggregation, several reports](/docs/extensions/aggregator/reports#one-aggregation-several-reports) |

:::tip
A threshold such as `minTokens` is written in the stage as a string, `"@{minTokens}"`. The platform reads a string that looks like a number as a number, so the comparison works. See [How values are read](/docs/extensions/aggregator/how-it-works#how-values-are-read).
:::

---

## From an example to Northgate Energy's report

**Dataset deliveries by status** counts the day's deliveries for each status. It is a good first look, and it answers "how many are late?". Northgate Energy's market data team wanted to know *which* ones, so they replaced its `$sortByCount` with a `$project` and a `$sort`, as in [Building an aggregation](/docs/extensions/aggregator/building), and kept the same `$match`:

```json
{"ondate": "@{ondate}"}
```

---

## Next

[Reference](/docs/extensions/aggregator/reference): where everything is saved, and what to do when something goes wrong.
