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
| Report properties | Fusion AI usage for one user | Fusion AI usage | `@{user}` in a `$match`, with a date range |
| Report properties | Conversations over a token threshold | Fusion AI usage | `@{minTokens}` in a `$match` after the `$group`, read as a number |
| Report properties | Runs of one playbook | Fusion AI playbook runs | `@{playbook}` in a `$match` |
| Report properties | Failures of one automation target | Automation logs | `@{target}` in a `$match`, `$sort` and `$limit` for the latest 100 |
| Report properties | Deliveries of a group of datasets | Dataset deliveries (common) | `@{datasets}` as a `$regex` on the dataset ID |

---

## Examples with report properties

The examples in the **Report properties** group each use a [report property](/docs/extensions/aggregator/how-it-works#report-properties). Save one once, then make a report for each value you need: the aggregation stays the same and each report sets its own value under **Report properties**.

| Example | Property | Test value | Reports you could make |
|-|-|-|-|
| Fusion AI usage for one user | `user` | Your own email address | One monthly report for each person, emailed to them |
| Conversations over a token threshold | `minTokens` | `100000` | A weekly check at `500000` for the finance team, and a daily one at `100000` for the platform team |
| Runs of one playbook | `playbook` | `#process-failure-triage` | One report for each playbook you run on a schedule |
| Failures of one automation target | `target` | `odsl.email` | One report for each target its owner looks after, such as `odsl.email` and `odsl.curve` |
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
