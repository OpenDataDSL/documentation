---
title: Aggregator examples
description: The example aggregations you can start from, and the stages each one shows
slug: /extensions/aggregator/examples
sidebar_position: 8
tags: [extension, aggregator, aggregation, examples]
---

# Aggregator examples

The **Aggregations** tab has examples under **Start from an example**. Each opens unsaved in the workspace, so you can run it, change it and save it under your own name. They are also a quick way to learn a stage: each one uses a different mix.

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

---

## From an example to Northgate Energy's report

**Dataset deliveries by status** counts the day's deliveries for each status. It is a good first look, and it answers "how many are late?". Northgate Energy's market data team wanted to know *which* ones, so they replaced its `$sortByCount` with a `$project` and a `$sort`, as in [Building an aggregation](/docs/extensions/aggregator/building), and kept the same `$match`:

```json
{"ondate": "@{ondate}"}
```

---

## Next

[Reference](/docs/extensions/aggregator/reference): where everything is saved, and what to do when something goes wrong.
