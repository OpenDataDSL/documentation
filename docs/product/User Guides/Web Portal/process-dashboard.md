---
title: Processes
description: The Processes screen in the web portal, for your processes, their schedules and the history of their runs
sidebar_position: 7
slug: /user/portal/process
tags:
  - portal
  - dashboard
  - process
---
**Monitor** > **Processes** lists your processes: the scheduled or triggered jobs that run your data loaders, workflows and scripts. Where [Executions](/docs/user/portal/executions) is about individual runs, Processes is about the process itself: how it is set up, when it runs and how it has been running.

![The Processes screen](/img/portal/processes.png)

---

## The list of processes

The list on the left shows every process, with its name, description and service. Choose a service from the list at the top to show only its processes, or type an expression in **Type expression to filter results**.

Point at a process to see its buttons:

| Button | What it does |
|-|-|
| **Edit** | Changes the process |
| **Run** | Opens the process's configuration so you can change it for this one run, then runs it. The changes are not saved to the process. |
| **Copy** | Copies the process name |

**Automations** at the top of the screen opens the automations for the selected process.

---

## The details of a process

Select a process to see its details on the right.

### Configuration tab
| Field | What it is |
|-|-|
| **Name** and **Description** | The process name and what it does |
| **Service** | The service it belongs to, for example ETL |
| **Status** | **Enabled** or **Disabled** |
| **Last modified** | When it was last changed, and by whom |
| **Cron** | The schedule, as a cron expression with its calendar |
| **Next run** | When it runs next |
| **Workflow** | The workflow it runs |
| **Inputs** | The values passed into the process when it runs |

### Executions tab
The history of the process's runs:

- The number of runs that **Failed**, ended in **Success**, are **Running** or are **Waiting**.
- A calendar month showing the days the process ran, coloured by the status of the day's last run. **Previous month** and **Next month** move the calendar, and **Go to current selection** returns to the run you are looking at. Select a day to see its last run.
- The total processing time of the process this month, this year and of all time.
- **Execution Details** of the selected run, with its phases and warnings, as on the [Executions](/docs/user/portal/executions#execution-tab) screen.

### Insights tab
Reports about the process, such as its execution history, audit records and automations.

### Documentation tabs
Some processes have more tabs, named after the provider or the data set, with documentation about the data they load.
