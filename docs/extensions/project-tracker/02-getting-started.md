---
title: Getting started
description: Create an onboarding project from the standard plan, add the people, and see where it stands
slug: /extensions/project-tracker/getting-started
sidebar_position: 2
tags: [extension, projects, onboarding]
---

# Getting started

This page creates the Northgate Energy onboarding from the standard plan. It takes a couple of minutes, and the plan is yours to change afterwards.

---

## Creating a project

1. Open **Manage > Projects** and select **New project**.
2. Fill in the form:

| Field | Example | Notes |
|-|-|-|
| Project name | Northgate Energy onboarding | Shown everywhere the project is |
| Code | `NORTHGATE` | Short, in capitals; it starts every task id (`NORTHGATE-12`) and cannot be changed later. Filled in from the name |
| Client | Northgate Energy | Becomes the name of the client party |
| Implementor | ETRMServices | Becomes the name of the implementor party |
| Start | 12 Oct 2026 | The plan is scheduled from this day |
| Target go-live | 18 Dec 2026 | Optional; shown on the Gantt chart and the overview |
| Project owner | colin.hartley@opendatadsl.com | Added to the project's people |
| Start from | Standard onboarding (30 tasks) | The standard plan, a plan template you saved, a copy of another project, the tasks of an Excel or CSV file (see [below](#creating-a-project-from-an-excel-or-csv-file)), or no tasks |
| Fit the plan | Ticked | Stretches or squeezes the plan so its go-live milestone falls on the target go-live |
| Work streams | All ticked | Untick a work stream the project does not need; its tasks are left out |

3. Select **Create project**. The project and its tasks are created, and the project opens.

![The New project dialog for the Northgate Energy onboarding](/img/extensions/project-tracker/new-project.png)

:::tip
The standard onboarding plan takes about 12 weeks: kick-off and access, data sources and history, curve requirements to sign-off, ETRM integration and testing, reports, training, go-live and two weeks of hypercare. Every task says which party does it and what it waits for.
:::

---

## Creating a project from an Excel or CSV file

When the plan already exists as a spreadsheet, such as one agreed with the client or exported from Microsoft Project, the project can start from it: each row of the sheet becomes a task.

1. Select **New project**, fill in the name and code, and choose **Start from: Tasks from an Excel or CSV file**.
2. Drop the file on the box, or click it to choose the file. An Excel workbook (`.xlsx`) or a CSV file can be used; an older `.xls` workbook has to be saved as `.xlsx` first. Nothing is saved yet.
3. Check the sheet and the row with the headings. The first sheet with rows, and the first row with headings, are chosen for you.
4. Check which column fills each task field. The columns are matched by their headings (for example **Activity** or **Task** for the task name, **Phase** or **Work stream** for the work stream, **Predecessors** for Depends on), so usually there is little to change. Only **Task name** is needed; choose **(none)** for a field the sheet does not have.
5. Check the preview and the work streams, untick any you do not want, and select **Create project**.

![Creating a project from an Excel workbook: the columns mapped to the task fields, and the preview](/img/extensions/project-tracker/new-project-excel.png)

| Task field | What the column holds |
|-|-|
| Task name | The task's name. Rows with no name are skipped |
| Work stream | The work stream of the task. Each different value becomes a work stream of the project: a name that matches one of your default work streams (Settings > Defaults for new projects) keeps its colour, any other becomes a new work stream. **Work stream when the row has none** places the rows with an empty cell, and the tasks of every row when no column is chosen |
| Description | The task's description |
| Start, Due | Dates. Excel dates are read as they are; dates written as text can be `2027-01-04`, `04/01/2027` (day first unless the column shows otherwise), `4 Jan 2027` or `Jan 4, 2027` |
| Duration | Calendar days: `5`, `5d`, `2w` (14 days) or `1m` (30 days). Used when there is no due date |
| Milestone | `yes`, `y`, `true`, `x`, `1` or `milestone` for a milestone |
| Assigned to | An email address. Each person is added to the project's people |
| Party | A party name, such as `Client` or `ETRMServices`, or its kind (`client`, `implementor`, `provider`) |
| Status | Not started, In progress, Blocked, In review, Done or Cancelled, and common alternatives such as `To do`, `Complete` or `On hold` |
| Priority | Low, Normal, High or Critical, and alternatives such as `Medium`, `Urgent` or `P1` to `P4` |
| Progress | A percentage: `40`, `40%` or `0.4` |
| Reference | The task's own id in the sheet, such as `D2` or `1.3`. Kept on the task, and used by Depends on |
| Depends on | The tasks it waits for, separated by commas: their references, their names, or (with no Reference column) their row numbers in the sheet. Microsoft Project's `3FS+2d` is read as task 3 |

The dates of the file are kept. A task with no start ends on its due date, or else begins the day after the tasks it depends on end, or else on the project start; it lasts its duration, or 5 days, and a milestone takes one day. The project's start and target go-live are filled in from the earliest task and the last milestone, unless you type them in.

Values that cannot be used are listed under the preview with their row, for example a status the screen does not know (the task is Not started) or an assigned person who is not an email address (the task is not assigned). The task is still added; correct it afterwards. Each task's activity log records the row and file it came from, and the screen remembers your column choices for the next file with the same headings.

[Download a sample plan workbook](pathname:///file-samples/project-plan-sample.xlsx) to see the layout.

---

## The standard onboarding plan

| Work stream | Tasks |
|-|-|
| Project Management | Kick-off meeting, agree the plan, set up the tenant and users, single sign-on, go-live readiness review, **Go-live**, hypercare |
| Data Onboarding | List the data sources and licences, follow the datasets, dataset monitoring, private data sources, history, **Data signed off** |
| Custom Curves | Requirements workshop, curve definitions, build the smart curves, validation checks, parallel run, **Curves signed off** |
| Integrations | Integration requirements, map the ETRM fields, configure, test, user acceptance |
| Reports | Agree the reports, build them, user acceptance |
| Training | Administrator training, user training, hand over to support |

Milestones are in bold. To start other projects from your own plan, [save a project as a template](/docs/extensions/project-tracker/settings#plan-templates).

---

## Adding the people

Tasks are assigned to people, and reminders are emailed to them, so add everyone working on the project:

1. Open the **People** tab.
2. Select **Add a person** for each one, with their name, email address, party and role.
3. Select **Save people**.

You can also add someone while assigning a task: choose **Someone else ...** in **Assigned to**. See [People](/docs/extensions/project-tracker/people).

---

## Assigning the tasks

The plan says which party does each task, but not who. On the **Tasks** tab, choose **Not assigned** in **Show** to list the tasks with nobody on them, open each one and choose **Assigned to**. See [Tasks](/docs/extensions/project-tracker/tasks).

---

## Seeing where it stands

The **Overview** tab now shows the project: the late tasks, what is coming up in the next two weeks, progress by work stream and by party, the milestones and the latest activity. The figures at the top show how much is done against what the plan says should be done by today.

The project's state, next to its name, is:

| State | When |
|-|-|
| On track | Nothing is late and the work done is no more than 15 points behind the plan |
| Watch | A task is late, or the work done is more than 15 points behind the plan |
| At risk | A milestone is late, or more than 15% of the open tasks are late |

With **All projects** chosen, the Overview tab shows a card for every project with its state, and what is late, coming up and assigned to you across all of them.

![Every project as a card, with the late tasks across projects](/img/extensions/project-tracker/all-projects.png)

---

## Next steps

- Set up the [daily reminders](/docs/extensions/project-tracker/communication#reminders), so people hear about their tasks before they are due.
- Change the project's [status](/docs/extensions/project-tracker/settings#project-details) to **In progress** when work starts.
