---
title: Executions
description: The Executions screen in the web portal, for following process runs and finding out why one failed
sidebar_position: 6
slug: /user/portal/executions
tags:
  - portal
  - dashboard
  - process
  - execution
---
**Monitor** > **Executions** shows your process runs (executions) as they happen. Use it to check that your loaders and other processes ran, and to find out why and where one failed.

![The Executions screen](/img/portal/executions.png)

The screen has two parts: the list of executions on the left, and the details of the one you select on the right.

---

## The list of executions

### Filters
| Filter | What it does |
|-|-|
| **Range** | Executions in the last **12H**, **24H**, **48H**, week (**1W**) or month (**1M**), or a date range you choose with the calendar button |
| **Type** | The kind of process, for example ETL |
| **Trigger** | How the run started: scheduled, manual, by an event and so on |
| **Status** | The coloured buttons count the runs in the range that **Failed**, ended with a **Warning**, ended in **Success** or are **Running**. Select one to show or hide those runs. |
| **Search** and **Type expression to filter results** | Find runs by name, or filter them with an expression |

### Each execution
Each run in the list shows:
- its status icon
- the name of the process
- its service and type, and when it started
- the loader message if there is one (what was loaded), otherwise the status message

Point at a run to see its buttons:

| Button | What it does |
|-|-|
| **Run** | Opens the process's configuration so you can change it for this one run, then runs it. The changes are not saved to the process. |
| **Stop** | Stops a run that is still going |
| **Copy** | Copies the execution id |

---

## The details of an execution

Select a run to see its details on the right.

### Execution tab
| Field | What it is |
|-|-|
| **Job** | The job that ran it |
| **Started** and **Ended** | When the run started and finished |
| **Duration** | How long it took |
| **Status** | The status of the run; for a finished run, its final status |
| **Trigger** | How the run started |
| **Trigger time** | When it was due to start, for a scheduled or triggered run |
| **Reason** | Why it ran |
| **Message** | The status message |
| **Loader message** | For a data loader, what it loaded |

Below them, **Phases** breaks the run down into the phases of its workflow, for example **EXTRACT**, **TRANSFORM** and **LOAD**. Each phase shows its status, its log lines with their level (for example **DEBUG** or **INFO**) and how long it took. **Warnings** lists the warnings raised during the run. **Previous** and **Next** move between the runs. **Data Changes** shows the timeseries and curves the run changed.

### Details tab
The process itself: its name, description, service, status (enabled or disabled), when and by whom it was last changed, its schedule (**Cron**), when it runs next and its **Workflow**.

### Assistant tab
Ask Fusion AI about the run, for example **Why did this process fail?** or **Can you find all processes that failed overnight?**

### Insights tab
Reports about the process, such as its **Execution History**, **Audit Report**, **Automations**, **Automation Logs** and **Cron Schedule Diagnostics** (what the schedule expected, what was fired and what ran). Select one to run it.

---

## See also
- [Processes](/docs/user/portal/process): the processes themselves and their schedules
- [Alerts](/docs/extensions/alerts/overview): alerts raised when a process fails
