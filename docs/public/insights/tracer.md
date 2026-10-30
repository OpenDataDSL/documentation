---
title: Tracer
description: An item insight that collects audit, usage, automation and queue activity for the selected item into one log, newest first
slug: /public/insights/tracer
catalog_summary: Audit, usage, automation and queue activity for an item in one log
tags: [insight, report, tracer, audit, automations, queues, processes]
---

# Tracer

When something goes wrong, the evidence is spread over several logs: who changed the item, which automations ran, which queue messages were sent and who read it. **The Tracer report** gathers all of that for the selected item into one timeline and answers questions like:

- What happened to this curve this morning, and in what order?
- Which automations did this process run trigger, and did its queue messages get through?
- Who changed this item recently, and what did they change?
- Who read the item after it was updated?

At Northgate Energy, Tom Clarke traces last night's run of the process `NGE_EOD_CURVES` after the risk system missed a TTF price.

![The Tracer report for a run of the process NGE_EOD_CURVES](/img/insights/tracer/process.png)

---

## Opening the report

Tracer is an item insight: select an item, then open **Tracer** from its insights. It is registered as `#INSIGHT_ITEM_TRACER` in the category `*Item Insights*`.

The portal passes the item's service (`SERVICE`) and id (`ID`), or the dataset id (`DSID`) for a dataset, plus the selected execution (`EXECID`) for a process run or the selected ondate (`ONDATE`) for a curve or dataset. What the report looks for depends on the service, as described under [What is traced](#what-is-traced).

The trace runs as soon as the report opens, for **Today**, and rows appear as each log is read.

| Control | What it does |
|-|-|
| **Date range** | **Today**, **Yesterday**, **Last 3 days** or **Last 7 days**. Choosing one fills in **Start** and **End** and runs the trace again. |
| **Start**, **End** | Change either date and time to set your own range |
| **Export (CSV)** | Downloads the trace log as shown, as `trace-log.csv` |
| **Debug log** | At the bottom of the page: each step of the trace and how many entries were found |

---

## The report

The **Trace entries found** card counts the rows. The **Trace Log** table lists them newest first:

| Column | What it shows |
|-|-|
| **Date** | When it happened |
| **Service** | Which log the row comes from: `audit`, `metric`, `automationlog`, `queuelog` or `group` |
| **User** | For audit and usage rows, the user. For automation rows, the automation target, such as `odsl.email`. For queue rows, the status and the queue, such as `failed NGE_RISK_FEED`. |
| **Info** | For audit rows, the first change (`Changed properties.source to ICE Endex settlement`) or the key and description. For usage rows, the application (`app:Excel Add-in`). For automation rows, the message. For queue rows, the failure reason or the message subject. |

### Tracing a data item

![The Tracer report for the timeseries NGE.TTF:MID](/img/insights/tracer/data.png)

For the TTF mid price, the trace shows the load at 07:40, the property change and new value, the email and smart curve build automations it triggered, the message sent to the ETRM queue, and the people who read it afterwards.

---

## What is traced

For every item, the trace starts with two logs, both limited to the date range:

| Log | What is read |
|-|-|
| Audit trail | Changes to any key starting with the item's id (so a curve's stored ondates are included), from the private audit trail, or the public one for an id starting with `#` |
| Usage | Requests for the item (service and id) |

It then adds the logs that fit the kind of item:

| Selected item | Also read |
|-|-|
| Process run (`EXECID`) | Automation log entries, queue messages and audit records of that run and anything it started |
| Dataset (`ONDATE`) | The dataset's delivery for the ondate, and the automation log entries of each delivery run |
| Curve (`ONDATE`) | The curve's builds for the ondate, and for each build its automation log entries, queue messages and audit records |
| Data item | Automation log entries for the item, and queue messages whose content is the item |
| Report | Automation log entries and queue messages for the report. For a curve group report, the group and the audit trail of each curve in it. |
| Queue | Queue messages sent to the queue in the range. For a report message, the report's automation log entries and the audit records of those runs. |

:::note
Only the audit trail, usage and queue messages for a queue are limited to the date range. The run, build and delivery logs of a process, curve or dataset are read in full, because they belong to the selected run or ondate.
:::

---

## Troubleshooting

| Problem | What to do |
|-|-|
| **No trace entries found for the selected range.** | Choose a longer range. For a process, open the report from the run on the executions list, so that the run is passed to it. |
| A process trace shows only audit and usage rows | The report was opened without a run (`EXECID`). Open it from the selected execution. |

---

## Related

- [Insights](/docs/odsl/insights/general): how insight reports work
- [Usage](/docs/public/insights/item-usage)
- [Item Audit Report](/docs/public/insights/item-audit-report)
- [Automation Logs](/docs/public/insights/automation-logs)
- [Queue Log](/docs/public/insights/queue-log)
