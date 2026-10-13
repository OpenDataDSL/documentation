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
| **Period** | The dates of the data points: the last 7, 30, 90 or 365 days, all dates, or a custom range |
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

---

## Issues

**Issues** lists the open issues (failed, severe and error), oldest first, whatever their date. Tick **Only data points in the period** to apply the period filter. Filter by the start of the data id or by status.

Select records with the tick boxes, then:

| Action | Does |
|-|-|
| **Override** | Lets the selected records pass, with a reason (see below) |
| **Comment** | Adds a comment to their timelines |
| **Run again** | Runs the checks again for those data points, for example after the data was corrected |

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

**Configurations** lists every validation configuration, with its checks (hover over one to see its expression), whether it is enabled and runs on update, and when it was last changed. For each one:

| Button | Does |
|-|-|
| Edit | Opens the configuration in the editor, with **Test**, **Run and save** and **Save** |
| Test | Runs the checks without saving anything |
| Run | Runs the checks and stores the records |
| Switch | Enables or disables the configuration |
| Delete | Deletes the configuration. Its records are kept |

To run several at once, tick them (the box in the heading ticks every configuration shown, so search or filter first) and select **Run selected**. Pick the latest data point, one date (for example the same ondate for many curves) or a date range. The latest data point or one date runs straight away and lists each data item with its status, its failing tenors and its message; open a record from there. A date range, or more than 100 data items, runs in the background.

**New validation** asks for a data id (type part of it to search) and opens the editor for a curve or a timeseries. **Bulk changes** changes many at once: see [Bulk changes](/docs/extensions/validation/bulk).

---

## Functions

**Functions** lists the validation scripts: the library and your private scripts. Select one to see its functions, what they do and their parameters, and its code. Private scripts can be edited, saved and deleted here; see [Writing your own checks](/docs/extensions/validation/writing-checks).

---

## Reports

The reports are insights of the extension, listed with your other insights:

| Insight | Shows |
|-|-|
| **Validation by Data Item** | Records, open issues, warnings, overrides, pass rate, the last data point and the last run of each curve and timeseries (up to the 200 with the most issues) |
| **Validation by Check** | How often each check ran, passed, failed, warned, could not run or was skipped, and its pass rate |
| **Validation by Day** | A chart and a table of records, open issues, warnings, overrides and pass rate per data point date |
| **Validation Configurations** | Every configuration with its checks, expressions, scopes and severities |

Each has KPIs at the top, filters for the period (data point dates; not for configurations), kind and group, and exports to **CSV**.
