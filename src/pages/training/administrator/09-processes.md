---
slug: /training/administrator/processes
title: "Module 09: Process Monitoring"
sidebar_position: 10
tags: [training, administrator, operations, processes, portal]
---

# Module 09: Process Monitoring

Processes run your scripts and workflows in the cloud, on a schedule, from an automation or by hand. In this module you will check what ran, find out why something failed, rerun it, and look after the schedules themselves.

## Learning Objectives

By the end of this module you will be able to:

- Use the execution dashboard, process dashboard and process timeline
- Find failed executions and read their phases and logs in ODSL
- Rerun a process, with input and a reason, and stop a running execution
- Diagnose automation failures with the automation log
- Enable, disable, reschedule and roll back processes
- Get notified when a process fails

---

## Step 1: What a Process Is

A process is a scheduled or event driven workflow or script. Its key properties:

| Property | Description |
|----------|-------------|
| `name`, `service`, `description` | What it is. `service` is a category, for example `ETL` |
| `workflow` or `scriptName` | What it runs |
| `cron` | When it runs, for example `0 17 ? * MON,TUE,WED,THU,FRI *` |
| `enabled` | Whether it runs |
| `input` | An object passed in, which a manual run can override |
| `processType` | `Ristretto` for short runs (under 6 minutes), `Lungo` for longer, heavier runs |

Each run creates a **process execution** record with its trigger (`scheduled`, `manual` or `automation`), status, message and phases.

:::note
A process assumes the rights of the user who created it, at the time it was saved. If a process starts failing with permission errors after someone's access changed, save the process again as a user with the right access.
:::

---

## Step 2: The Portal Dashboards

| Dashboard | Use it to |
|-----------|-----------|
| **Execution dashboard** | Watch executions in real time. Filter by time range (12 hours to a month), trigger and status, then select an execution to see its details, phases and the timeseries and curves it updated |
| **Process dashboard** | Focus on one process: its configuration, a calendar of the days it ran with the last status of each day, total processing time and a chart of runs by status |
| **Process timeline** | See the last 12 hours and the next 12 hours of runs on one timeline, with running processes updating live |

From all three you can hover over an item and select run to open the process configuration and run it once. Changes made in that dialog apply to that run only and are not saved.

See [Execution Dashboard](/docs/user/portal/executions), [Process Dashboard](/docs/user/portal/process) and [Process Timeline](/docs/user/portal/timeline).

---

## Step 3: Find Failures in ODSL

The `exec` service gives access to the execution logs:

```js
//#region Find failed executions
failed = find ${exec} where name == "ECB_FX" and status == "failed"
for f in failed
    print f.start + " " + f.trigger + " " + f.message
next
//#endregion
```

Execution statuses are `triggered`, `start`, `running`, `waiting`, `retrying`, `reschedule`, `failed`, `success` and `warning` (successful, but warnings were logged).

---

## Step 4: Read the Phases

An execution is broken into phases, each with its own status, message and log lines. The failed phase tells you where to look:

```js
//#region Read the phases of an execution
ex = ${exec:"05f1ec1a-f2a1-4cba-87d4-b46e0f8e40b6"}
print ex.status + ": " + ex.message
for phase in ex.phases
    print phase.name + " " + phase.status + " " + phase.message
    print phase.log
next
print ex.loaderMessage
//#endregion
```

Common causes:

| Symptom | Where to look |
|---------|---------------|
| Fails in an extract phase | The source: a changed URL or file format, an expired secret, a supplier outage |
| Fails in a load phase | The data: a type that does not match, or permission to save |
| Status `warning` | The phase logs: the run worked but something was reported |
| Runs but loads nothing | `loaderMessage` and the `data` section, which list the curves and timeseries updated |

You can also search process names and phase logs with the REST API, for example `GET process-exec/v1?_search=timeout`.

---

## Step 5: Rerun or Stop

Rerun a process, optionally with input that overrides its own, and a reason for the audit log:

```js
//#region Rerun a process
run ECB_FX

ondate = Object()
ondate.date = "2026-10-26"
run WHEAT_CURVE with ondate

// Run in an hour
run ECB_FX in 1 hour
//#endregion
```

With the REST API:

```json
POST https://api.opendatadsl.com/api/process-exec/v1?_reason=supplier-fix-rerun
Authorization: Bearer {{token}}

{
  "name": "WHEAT_CURVE",
  "input": { "date": "2026-10-26" }
}
```

Stop a running execution. Its status is set to warning and any running phases to failed:

```js
//#region Stop a running execution
delete ${exec:"05f1ec1a-f2a1-4cba-87d4-b46e0f8e40b6"}
//#endregion
```

---

## Step 6: Diagnose Automation Failures

Processes triggered by automations, and automations that send to queues, email or other targets, write an entry in the **automation log** for every run: the item, the target, the status (`success`, `failed`, `running`) and the target's message.

```js
//#region Failed automation runs
runs = find ${automationlog} where status == "failed"
for r in runs
    print r.timestamp + " " + r.target + " " + r.key + " " + r.message
next
//#endregion
```

If the Automations extension is installed, its **Overview** tab shows recent failures and its **Activity** tab is the automation log with filters by period, status, target and item. See [Monitoring automations](/docs/extensions/automations/monitoring).

---

## Step 7: Manage Schedules

```js
//#region Disable and reschedule a process
p = ${process:"ECB_FX"}
print p.cron

p.enabled = false
save ${process:p}

p.cron = "30 17 ? * MON-FRI *"
p.enabled = true
save ${process:p}
//#endregion
```

Every save makes a new version. If a change goes wrong, roll back to the previous version:

```js
//#region Roll back a process
delete ${process:"ECB_FX"}
//#endregion
```

`delete ${process:"ECB_FX":*}` removes the process completely, with all its versions.

:::tip
Give operations staff `read` and `run` on the `process` service (Module 04) so they can rerun failed processes without being able to change them.
:::

---

## Step 8: Get Notified of Failures

Use an automation on the process `failed` event to email the team:

```js
//#region Email on failure
ab = AutomationBuilder("process", "private", "ECB_FX")
ab.addCondition("failed")
ab.setTarget("email")
ab.setProperty("to", "ops-team@company.com")
ab.setProperty("subject", "Process failed: ECB_FX")
ab.enabled = true
save ${automation:ab}
//#endregion
```

---

## Exercise

1. In the execution dashboard, filter to failed executions in the last week and open one.
2. Find the same execution in ODSL with `find ${exec}` and print its phases.
3. Rerun one of your processes manually from ODSL and watch it on the process timeline.
4. Create an automation that emails you when that process fails.

---

## Summary

| Task | How |
|------|-----|
| Watch runs | Execution dashboard, process timeline |
| Review one process | Process dashboard |
| Find failures | `find ${exec} where status == "failed"` |
| Rerun | `run NAME` or `POST process-exec/v1` |
| Stop | `delete ${exec:"id"}` |
| Automation failures | `find ${automationlog}` or the Automations extension |
| Roll back | `delete ${process:"NAME"}` |

:::note Next Step
In [Module 10](/training/administrator/metrics) you will track platform metrics, API usage and resource consumption.
:::
