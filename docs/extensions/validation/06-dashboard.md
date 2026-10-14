---
title: Dashboard, issues and overrides
description: The validation dashboard, open issues, records and their timeline, overrides and reports
slug: /extensions/validation/dashboard
sidebar_position: 6
tags: [extension, validation, dashboard, overrides, reports]
---

# Dashboard, issues and overrides

**Information > Validation** opens on the dashboard. The filters at the top apply to every tab:

| Filter | Meaning |
|-|-|
| **Period** | The dates of the data points: today, yesterday, the last 7, 30, 90 or 365 days, all dates, or a custom range |
| **Kind** | Curves, timeseries or both |
| **Group** | The group set on the configurations |

---

## Dashboard

| KPI | Meaning |
|-|-|
| **Data items validated** | Curves and timeseries with records in the period, and how many configurations and checks are enabled |
| **Records** | Validation records in the period, and how many runs made them |
| **Pass rate** | The share of records that are valid, warning, skipped or overridden |
| **Open issues** | Failed, severe and error records, and how long the oldest one has been open |
| **Warnings**, **Overridden** | Records with those statuses |
| **Resolved** | Records that were failing and now pass, and how many were resolved by an override or by the data |
| **Average time to resolve** | From the first failure to passing |

Below the KPIs:

- **Records per day by status**: hover over a day to see its counts.
- **Data items with the most issues**: select a row to see its records.
- **Checks failing most often**.
- **Oldest open issues** and **Recent activity**: select a row to open the record.

The dashboard shows when its statistics were read. Use **Refresh** to read them again, for example after a run.

---

## Issues

**Issues** lists the open issues (failed, severe and error), oldest first, whatever their date. Tick **Only data points in the period** to apply the period filter. Filter by the start of the data id or by status.

Select records with the tick boxes, then:

| Action | Does |
|-|-|
| **Override** | Lets the selected records pass, with a reason (see below) |
| **Comment** | Adds a comment to their timelines |
| **Run again** | Runs the checks again for those data points, for example after the data was corrected |
| **Adjust checks** | Suggests new parameters for the checks that fail on those data points, and saves the ones you keep (see below) |

### Edit the checks of an issue

The pencil at the end of a row opens the checks of that data item in a panel above the list, so you can change them while you look at its issues. The panel shows the configuration's version and the item's records on the page:

- **Test on these records** runs the edited checks on those data points and shows the results; nothing is saved.
- **Save** saves the configuration as a new version; **Save and run again** also runs the checks again on those records, so issues that now pass leave the list.
- **Settings and scripts** shows the rest of the configuration, and **Full editor** opens it in the editor with its history, keeping unsaved changes.

The Records tab has the same pencil.

### Adjust checks

When data fails only because a limit is a little too tight, for example a few curves moved slightly more than the percentage change allowed, select those records and **Adjust checks**. For each data item the checks run again on the selected data points (for a curve, on its failing tenors) without saving anything, and for each check that fails or warns:

- If it is a library function with a limit (**checkRange**, **checkChange**, **checkChangePct**, **checkZScore**, **checkBand**, **checkStale**, **checkGap**, **checkCurveMinContracts** or **checkCurveArbitrage**), the limit is moved to the smallest change that lets those data points pass, plus a small margin, and rounded. For checkRange only the side that failed moves.
- Otherwise (another function, or a longer expression) it is listed so you can change it by hand.

**Last 30 days** shows how many data points of the item fail with the check now, and how many would fail with the new expression, so you can see whether the change hides other problems. Edit any expression or severity, untick what you do not want, and select **Save changes**. Each changed configuration is saved as a new version, and by default the selected records run again with the new checks.

---

## Records

**Records** lists every record in the period. Filter by the start of the data id, status, and **Failing tenor** (curves that failed for that tenor), export to **CSV**, and use the same actions as on Issues, plus **Remove override**. For a curve, the status column shows how many tenors failed or warned, and which.

### A record

Select a record to open it:

- Its status, the data point and the value, and when it was last run, by whom and how (on update, on a build, manually or in the background).
- The result of each check, with its message, every failure and the details the check recorded.
- For a curve, its **Tenors**: every contract with its value, status and the checks it failed, failing and warning tenors first.
- The **timeline**: each run (with the status before and after), override, removed override and comment, with who and when. The last 100 entries are kept.
- **Override**, **Remove override**, **Comment** and **Run again**.

---

## Overrides

An override lets a failing data point pass, so the data can be used, for example when a price spike is real. It needs a reason, which goes in the timeline with your name.

An override applies to the data as it was overridden:

| Then | What happens |
|-|-|
| The checks run again and the data has not changed | The record stays **Overridden** |
| The data changes, for example a corrected price is loaded | The override is removed and the record gets the new result |
| The checks pass | The override is removed: it is no longer needed |

The timeline says when and why an override was removed. You can also remove an override yourself with **Remove override**; the record goes back to the result of its last run.

Only failing records (failed, severe and error) can be overridden. Warnings already pass. A curve is overridden as a whole, for its ondate: any change to any of its values removes the override.

---

## Configurations

**Configurations** lists every validation configuration, with its checks (hover over one to see its expression), whether it is enabled and runs on update, its version and when it was last changed. Select the version number to open its history. For each one:

| Button | Does |
|-|-|
| Edit | Opens the configuration in the editor, with **Test**, **Run and save** and **Save** |
| Test | Runs the checks without saving anything |
| Run | Runs the checks and stores the records |
| Switch | Enables or disables the configuration |
| Delete | Deletes the configuration. Its records are kept |

To run several at once, tick them (the box in the heading ticks every configuration shown, so search or filter first) and select **Run selected**. Pick the latest data point, one date (for example the same ondate for many curves) or a date range. The latest data point or one date runs straight away and lists each data item with its status, its failing tenors and its message; open a record from there. A date range, or more than 100 data items, runs in the background.

### Versions and history

Every save of a configuration keeps a version. The editor shows the version number, and **History**, below the settings, lists the versions newest first with when and by whom each was saved and what changed from the version before: checks added or removed, and changes to an expression, severity, scope or setting (old value struck through, new value after it). Up to the 20 newest versions are shown.

- **Compare** shows the differences between a version and what is in the editor, saved or not.
- **Restore** loads a version into the editor as unsaved changes. Save to make it the current version (a new version), or go back to leave it.

**New validation** asks for a data id (type part of it to search) and opens the editor for a curve or a timeseries. **Bulk changes** changes many at once: see [Bulk changes](/docs/extensions/validation/bulk).

---

## Functions

**Functions** lists the validation scripts: the library and your private scripts. Select one to see its functions, what they do and their parameters, and its code. Private scripts can be edited, saved and deleted here; see [Writing your own checks](/docs/extensions/validation/writing-checks).

Use **Refresh** to read the scripts again when they were changed somewhere else, for example uploaded from ODSL. The open script stays open; if it has unsaved changes you are asked first.

---

## Reports

The reports are insights of the extension, listed with your other insights:

| Insight | Shows |
|-|-|
| **Validation by Data Item** | Records, open issues, warnings, overrides, pass rate, the last data point and the last run of each curve and timeseries (up to the 200 with the most issues) |
| **Validation by Check** | How often each check ran, passed, failed, warned, could not run or was skipped, and its pass rate |
| **Validation by Day** | A chart and a table of records, open issues, warnings, overrides and pass rate per data point date |
| **Validation Configurations** | Every configuration with its checks, expressions, scopes and severities |
| **Validation Automations** | Every automation on the **validated** and **invalid** actions: the data item, the action, what the automation does, its target and owner, whether it is enabled, and whether the data item's validation runs (on update, manual runs only, off, or no validation, in which case the automation is never raised) |

Each has KPIs at the top, filters for the period (data point dates; not for configurations or automations), kind and group, and exports to **CSV**. Validation Automations also filters by action and by text; with a kind or group filter it only lists data items that have a validation configuration. See [Sending only validated data](/docs/extensions/validation/reference#sending-only-validated-data) and [When data fails validation](/docs/extensions/validation/reference#when-data-fails-validation).
