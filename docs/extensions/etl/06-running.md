---
title: Deploying, running and scheduling
description: Deploying a data loader as a workflow and a process, running it now or for an earlier date, its schedule, its runs and run reports, alerts, changing it, its versions and deleting it
slug: /extensions/etl/running
sidebar_position: 6
tags: [extension, data loaders, etl, deploy, schedule, cron, runs, alerts]
---

# Deploying, running and scheduling

Everything here is on the last step, **Deploy and run**.

---

## Deploying

![The Deploy card after deploying: the checks, the actions the workflow runs and what was saved](/img/extensions/etl/deploy.png)

The checks must all pass before **Deploy** can be used: the loader is complete (each problem links to its step) and the standard ETL actions are installed in the environment. Deploying saves the workflow `etl_<code>`, the run report `ETL_<CODE>` and the process `ETL_<CODE>`, with the schedule. **The workflow ODSL** and **The settings the process passes to the workflow** show exactly what was saved.

![The workflow ODSL of the broker settlements loader](/img/extensions/etl/workflow-code.png)

A loader that has changed since it was deployed shows **changed**, here and in the list. Runs use the deployed settings until you select **Deploy again**.

---

## The schedule

![The schedule: weekdays at 18:30 UK time, with the cron it makes](/img/extensions/etl/schedule.png)

| Setting | Notes |
|-|-|
| **Run on a schedule** | Not ticked: the loader runs only when you run it. |
| **When** | **Weekdays**, **Every day**, **Every hour** (at a minute) or **Custom cron** (see [cron expressions](/docs/kb/cron)). |
| **At**, **Time zone** | UK time (EU1), Central European time (EU2) or UTC. |
| **Holiday calendar** | Optional: no runs on its holidays. |

The schedule is saved on the process when you deploy.

---

## Running now and for an earlier date

**Run now** starts the process. Leave **Date to load** empty to load today's data; enter a date to load that day's file (the `{date:...}` and `{previous:...}` placeholders and fields mapped to the run date use it). Select **Refresh** to follow the run.

![The runs of the process, and the run report of the day](/img/extensions/etl/runs.png)

### Loading a long history

Tick **Load as history** before **Run now** for a first load of many years of data, such as an EIA workbook with monthly figures back to the 1930s for dozens of series. Normally the platform reacts to every date in the events it saves: it checks automations, rebuilds event curves and updates dataset monitoring, which for a long history can take minutes for each record. A history load saves the same events without that work, so it is much faster. Events are still versioned as usual.

The option applies to that run only: scheduled runs load as usual, so automations and event curves react to the new data from then on. Rebuild any event curves on the records once the history is in. For a loader deployed before this option was added, **Run now** offers to deploy its workflow again first, then runs.

The first table is the process's runs. The second is the day's run report: for each run, the date loaded, the rows read, the events made and saved, the rows left out, the rows with problems, and why a run failed or which rows could not be loaded. The report is also stored as `ETL_<CODE>:<date>` and opens in the Reports screen. The [Data Loader Runs](/docs/public/insights/data-loader-runs) insight covers every loader over a period.

---

## Alerts

With **Raise an alert when a run fails** ticked (Destination step), a failed run raises an alert with the key `etl/<code>`, category `etl`, issue `extract` (the source could not be read) or `load` (the rows could not be made into events or saved), and the process as its subject. The next run that does not fail closes it. The Home page task **Check data loaders that failed** shows the open ones.

---

## Stages

Each loader has a stage that says where it is in its life: **Sandbox** (trying things out), **Development** (being built), **Testing** (being checked before use) or **Production** (in use). A new loader starts in Development.

![The stage badge next to a loader's name in the editor, set to Development](/img/extensions/etl/stage.png)

To change it, select the stage badge next to the loader's name and choose another stage. The loader is saved with its new stage. The stage is a label for you and your team: it does not change what the loader does, and changing it does not need a deploy.

On the list of data loaders, select a stage above the list to show only the loaders in it. Each button shows how many loaders are in that stage, and the figures under it count only the loaders shown. The screen remembers your choice in this browser. Loaders made before stages were added show **no stage** until you set one, and **No stage** lists them.

---

## Changing and deleting a loader

Open the loader from the list, change any step, and deploy again.

### Versions

Each save of a loader is a version. Select **Versions** at the top of the loader to see them all, newest first, with when each was saved and who saved it.

![The versions of a data loader, with two versions compared](/img/extensions/etl/versions.png)

- **View** shows the whole of that version.
- **Compare with now** compares that version with the loader as it is in the editor, including any changes not saved yet.
- **Changes** compares that version with the one before it, so you see what that save changed.
- Or pick any two in **Compare** and **with**. **Show** gives the changed settings in a table (each setting by its path, such as `source.url` or `mapping.fields[2].name`), or the whole document with the removed lines in red and the added lines in green.

The save stamps (the loader's version number, when and by whom) are left out of the comparison, so only real changes show.

**Restore** saves an old version again as the latest version. The versions after it stay, so you can go back again. What is deployed is not changed by a restore: if the restored settings differ from what is deployed, the loader shows **changed since deployed**, and you deploy again to use them.

### Deleting

To delete, select the bin button at the end of the loader's row in the list, or **Delete** at the top of the loader (on any step).

When the loader has more than one version, you choose what to delete:

- **Only the latest version** (the default). The loader goes back to the version before it, and stays open if you were in it. Nothing deployed is changed; if the earlier version differs from what is deployed, deploy again.
- **The data loader and all its versions**. This cannot be undone.

A loader with one version is deleted outright, after you confirm.

![Deleting a data loader: only the latest version, or the loader and all its versions](/img/extensions/etl/delete-loader.png)

Deleting the loader and all its versions removes:

- The loader's design, every version.
- For a deployed loader, the process (and so its schedule) and the workflow, and the custom action of an ODSL source.
- The run report configuration, if you tick **Also delete the run report configuration**.
- The loader's own secrets (those named `etl_<code>_...`), if you tick **Also delete this loader's secrets**. Shared secrets are never deleted.

Events already loaded, any curves and series built from them, and stored run reports stay. A new loader that has not been saved yet is simply thrown away.
