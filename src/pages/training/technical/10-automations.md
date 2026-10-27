---
slug: /training/technical/automations
title: "Module 10: Introduction to Automations"
sidebar_position: 11
tags: [training, automation, process, odsl]
---

# Module 10: Introduction to Automations

So far you have run every script by hand. In this module you will make the training hub look after itself: a **process** runs a script on a schedule, and **automations** react to changes in the platform by running checks, scripts and processes, and by sending notifications.

## Two Ways to Run Work Automatically

| Mechanism | Triggered by | Use it for |
|-----------|--------------|------------|
| **Process** | A cron schedule, an automation, or a manual run | Running a script or workflow at a set time |
| **Automation** | An action on a platform service, for example a dataset becoming late or a curve build succeeding | Reacting to events as they happen |

The two work together: an automation can start a process, and a process run fires its own `success`, `warning` and `failed` actions, which other automations can react to.

---

## Step 1: Anatomy of an Automation

Every automation has:

| Part | Description |
|------|-------------|
| **Conditions** | One or more combinations of `service`, `action`, `id` and `source`. The automation fires when **any** condition matches |
| **Target** | What happens when it fires, for example `email`, `script`, `process` or `qualitycheck` |
| **Properties** | The inputs the target needs, for example `to` and `subject` for an email |
| **Enabled** | Set to `false` to pause the automation without deleting it |

In ODSL you create automations with an `AutomationBuilder`:

```js
//#region
ab = AutomationBuilder(service, source, id)
ab.addCondition(action)
ab.setTarget(target)
ab.setProperty(name, value)
//#endregion
```

Some of the actions you can trigger on:

| Service | Actions |
|---------|---------|
| `dataset` | update, late, complete, missing, correction |
| `curve` | create, update, delete, build, success, warning, failed |
| `data` | create, update, delete, validated (curves and timeseries only). Event lists are data items too, so automations on events use the `data` service |
| `object` | create, update, delete |
| `process` | run, success, warning, failed, and others |
| `script` | run, success, warning, failed, and others |

See [Automation Basics](/docs/topics/automations/basics) for the full list.

---

## Step 2: Run Quality Checks When Data Arrives

In the Quality Checks module you attached check functions to the settlements dataset. The `qualitycheck` and `criticalcheck` targets run those checks automatically. Both apply to the `dataset` service and the `update` action.

```js
//#region
use training

// Run the quality checks whenever the settlements dataset is updated
ab = AutomationBuilder("dataset", "private", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.addCondition("update")
ab.setTarget("qualitycheck")
ab.setProperty("dsid", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}

// Run the critical checks as well
ab = AutomationBuilder("dataset", "private", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.addCondition("update")
ab.setTarget("criticalcheck")
ab.setProperty("dsid", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.icon = "ui-checks text-red"
ab.enabled = true
save ${automation:ab}

print "Dataset check automations saved"
//#endregion
```

:::note
The checks themselves are still defined on the dataset. The automation only decides when they run.
:::

---

## Step 3: Write a Script to Automate

Create a file called `my_gas_hub_daily_summary.odsl`. It reads the latest forward curve from Module 06 and the settlement events, and prints a short summary that appears in the run log.

```js
/**
 * Daily summary for the training gas hub
 * Script: my_gas_hub_daily_summary
 */
use training

latest = ${data:"MY.GAS.HUB:FORWARD_CURVE:L"}
print "Latest forward curve: " + latest.ondate
print "Contracts on the curve: " + latest.size

settlements = ${event:"MY.GAS.HUB:SETTLEMENTS"}
print "Settlement events: " + settlements.size()
```

Upload it to the training environment in the same way as the check scripts:

```js
//#region
use training

s = ${script:file/"/src/odsl-demo/Training/my_gas_hub_daily_summary.odsl"}
s._id = "my_gas_hub_daily_summary"
save s
print "Script uploaded"
//#endregion
```

:::note File Paths
Update the file path to match the location of the script in your project.
:::

---

## Step 4: Schedule the Script with a Process

A process runs a script or workflow in the cloud. Set `script` to the script name and `cron` to the schedule.

```js
//#region
use training

p = Process()
p.service = "TRAINING"
p.name = "MY_GAS_HUB_DAILY_SUMMARY"
p.description = "Daily summary of the training gas hub"
p.script = "my_gas_hub_daily_summary"
p.processType = "Ristretto"
p.cron = "30 19 ? * MON-FRI * EU1"
p.enabled = true

save ${process:p}
print "Process saved, runs weekdays at 19:30 UK time"
//#endregion
```

### Reading the cron expression

The cron expression has the fields `MINUTE HOUR DOM MONTH DOW YEAR [TZ]`:

| Field | Value | Meaning |
|-------|-------|---------|
| Minute | `30` | At 30 minutes past the hour |
| Hour | `19` | At 19:00 |
| Day of month | `?` | Any day of the month, the day of week decides |
| Month | `*` | Every month |
| Day of week | `MON-FRI` | Monday to Friday |
| Year | `*` | Every year |
| Timezone | `EU1` | UK time, with daylight saving |

The optional timezone can be `UTC`, `EU1` (UK and Portugal) or `EU2` (most of Western Europe). See [CRON expressions](/docs/kb/cron) for the full syntax.

:::tip Process Types
`Ristretto` is for short running processes (less than 6 minutes) and costs less to run. `Lungo` is for longer running processes with higher resource demands.
:::

---

## Step 5: Run the Process Manually

You do not need to wait for the schedule to test the process. Use the `run` command with the process name:

```js
//#region
use training
run MY_GAS_HUB_DAILY_SUMMARY
//#endregion
```

---

## Step 6: Start the Process from an Automation

A schedule is a good fit when you know when the data will arrive. When you don't, start the process as soon as the dataset is complete using the `process` target.

```js
//#region
use training

ab = AutomationBuilder("dataset", "private", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.addCondition("complete")
ab.setTarget("process")
ab.setProperty("process", "MY_GAS_HUB_DAILY_SUMMARY")
ab.icon = "play-fill text-success"
ab.enabled = true

save ${automation:ab}
print "Dataset complete automation saved"
//#endregion
```

To run a single script directly instead, use the `script` target with the `script` property set to the script name.

---

## Step 7: Chain Automations into a Pipeline

Because a process run fires `success`, `warning` and `failed` actions, you can add a second stage that reacts to the outcome. Here a failed run sends an email.

```js
//#region
use training

ab = AutomationBuilder("process", "private", "MY_GAS_HUB_DAILY_SUMMARY")
ab.addCondition("failed")
ab.setTarget("email")
ab.setProperty("to", "your.name@example.com")
ab.setProperty("subject", "Process failed: MY_GAS_HUB_DAILY_SUMMARY")
ab.icon = "envelope-at text-outlook"
ab.enabled = true

save ${automation:ab}
print "Process failure automation saved"
//#endregion
```

The pipeline you have built looks like this:

```
dataset:update    →  [qualitycheck / criticalcheck]
dataset:complete  →  [process]  →  process:failed  →  [email]
cron schedule     →  [process]
```

The same pattern works for curves. For example, an automation on the `curve` service with the `success` and `failed` actions for `MY.GAS.HUB:FORWARD_CURVE_EUR` tells you about every build of that curve.

---

## Step 8: Manage Your Automations

```js
//#region
use training

// List your automations
autos = find ${automation}
for a in autos
    print a._id + " " + a.name
next

// Review the log of automation runs
logs = find ${automationlog}
print logs.size() + " automation log entries"
//#endregion
```

To pause an automation, set `enabled` to `false` and save it. To remove it, delete it by id:

```js
//#region
use training

auto = ${automation:"MY_AUTOMATION_ID"}
auto.enabled = false
save ${automation:auto}

// delete ${automation:"MY_AUTOMATION_ID"}
//#endregion
```

Replace `MY_AUTOMATION_ID` with an `_id` from the list above. The `name` of an automation is generated by the platform from its target and properties, so it is a readable description of what the automation does.

---

## Summary

| What | Configuration |
|------|---------------|
| Quality checks on arrival | `dataset` `update` → `qualitycheck` and `criticalcheck` |
| Scheduled summary | Process `MY_GAS_HUB_DAILY_SUMMARY`, cron `30 19 ? * MON-FRI * EU1` |
| Summary on completion | `dataset` `complete` → `process` |
| Failure notification | `process` `failed` → `email` |

## Exercise

1. Add an automation that emails you when the `MY.GAS.HUB:FORWARD_CURVE_EUR` curve build fails
2. Change the process schedule to run at 18:45 on weekdays and save it again
3. Disable the dataset complete automation, then re-enable it

For more detail, see [Creating Automations](/docs/topics/automations/creating), [Automation Targets](/docs/topics/automations/targets) and [Workflows and Processes](/docs/odsl/dm/workflow).

:::note Next Step
In [Module 11](/training/technical/loading-data) you will load data from external sources using extractors and transformers, ready to be scheduled with the techniques from this module.
:::
