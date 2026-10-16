---
title: Running every day
description: Run trade reconciliation models on a schedule or when a new exchange, broker or bank file is loaded
slug: /extensions/data-reconciliation/automation
sidebar_position: 6
tags: [extension, data reconciliation, trade reconciliation, automation, process]
---

# Running every day

A model does not need anyone to open the **Manage** view: the extension's task runner runs it for a date and saves the result, so the [dashboard](/docs/extensions/data-reconciliation/dashboard) is up to date when the desk starts the day.

---

## What a run does

1. Reads the model, the matching functions and the model's custom scripts.
2. Reads the saved [mappings](/docs/extensions/data-reconciliation/reconciling#review-the-mappings) for the model.
3. Reads the ETRM trades for the date. If there are none, for example on a day the desk did not trade, the run logs a warning and stops.
4. Reads each source's records for the date.
5. Runs the reconciliation and saves the result for the date, replacing any result already saved for it.

The run takes two inputs:

| Input | Meaning |
|-|-|
| `model` | The id of the model, such as `TRADE.RECON` |
| `ondate` | The trade date: a date such as `2026-10-14`, or a relative date such as `yesterday`. Left empty, it is the previous day |

---

## On a schedule

Create a process that runs the task runner script, `odsl.data_reconciliation.task_runner_node`, with the model and date as inputs, and give it a schedule for when the files have arrived. For example, weekdays at 16:30 for the trades of the day before:

```js
p = Process()
p.name = "GAS_TRADE_RECON"
p.description = "Gas trade reconciliation for the previous business day"
p.script = "odsl-extensions\extensions\data_reconciliation\odsl.data_reconciliation.task_runner_node"
p.input.model = "TRADE.RECON"
p.cron = "30 16 ? * MON,TUE,WED,THU,FRI * EU2"
p.enabled = true
save ${process:p}
```

With `ondate` left empty the process reconciles the previous day. See [CRON expressions](/docs/kb/cron) for the schedule format and timezones.

---

## When a file is loaded

The extension installs an automation target, **Run a data reconciliation task**, shown as "run data reconciliation model [model]". Add an automation with this target and the model id that fires on the **update** action when the last of the day's files is loaded, such as the clearing statement. The model then runs as soon as the file is in.

See [Automations](/docs/topics/automations/basics) for how to create an automation.

---

## The saved result as a report

Each model has a report configuration, `REPORT`, added when the model is saved: a Fixed report using the extension's results chart template. A saved result can be opened like any other report, by its id `TRADE.RECON:REPORT:2026-10-14`, and shows the same chart as the dashboard.
