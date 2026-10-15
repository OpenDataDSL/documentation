---
title: Getting started
description: Set up, test and run the checks of a timeseries, and look at the results
slug: /extensions/validation/getting-started
sidebar_position: 2
tags: [extension, validation, getting-started]
---

# Getting started

This walk-through sets up validation for a timeseries from the **Data** screen, tests it, runs it and looks at the results. A curve works the same way, with checks on each tenor and on the whole curve.

---

## 1. Open the Validation tab

On the **Data** screen, select a timeseries and open its **Validation** tab. A data item without validation shows **No validation for this data yet** with two choices:

| Choice | What you get |
|-|-|
| **Start with suggested checks** | Checks to start from. Timeseries: Missing, Outlier, Stale and Gap. Curves: Missing and Change on each tenor, Gaps and Stale curve on the whole curve |
| **Start empty** | No checks |

Select **Start with suggested checks**.

---

## 2. Review the checks

The **Checks** tab shows the checks in a table:

| Column | Meaning |
|-|-|
| **On** | Run this check. Untick it to switch a check off without removing it |
| **Name** | Shown in results and reports |
| **Expression** | The ODSL that runs, usually a function call such as `checkZScore(4)` |
| **Scope** (curves) | **Tenor**: the check runs on each contract. **Curve**: it runs once on the whole curve |
| **Severity** | What a failure counts as: Warning, Failed or Severe |

Change the values to suit the data. For example, the suggested `checkGap(5)` allows at most 5 days between observations; for a monthly series use `checkGap(35)`.

To add a check, select **Add check from a function**, pick a function and fill in its parameters. **Add an expression** adds a row for your own ODSL, such as `#VALUE > 0`. See [Check functions](/docs/extensions/validation/functions) for what each function does.

Select **Save**. From now on the checks run every time the timeseries is saved.

![The Validation tab of a curve on the Data screen](/img/extensions/validation/data-tab.png)

---

## 3. Test the checks

Open **Test and run**. Choose the data points:

| Data points | Checks |
|-|-|
| **The latest observation** (the latest curve for a curve) | One data point |
| **One observation** (one ondate) | The date you pick |
| **A date range** | Every observation, or every ondate of the curve, in the range |

Select **Test**. Test runs the checks as they are in the editor, including changes you have not saved, and saves nothing. The results list each data point with its status and message; select a row to see the result of each check. For a curve, each row is an ondate: it shows how many tenors failed or warned, and selecting it shows every tenor.

:::tip
Some checks need history. `checkZScore` needs 5 earlier values and `checkStale(5)` needs 5, so on a new series they come back **Skipped** until there is enough data.
:::

---

## 4. Run and save

Select **Run and save** to run the saved checks and store the results as validation records. The quality status of the timeseries is updated too. A run over more data points than the **Background above** setting (250 by default) runs in the background.

---

## 5. Look at the records

![A validation record: its checks, its tenors and its timeline](/img/extensions/validation/record.png)

Open the **Records** tab. It shows counts at the top (records, open issues, warnings, overridden and the pass rate) and the records of this timeseries, newest first. Filter by status or date, export to CSV, or select a record to see its checks and its timeline.

Open **Information > Validation** to see the dashboard for all your data: see [Dashboard, issues and overrides](/docs/extensions/validation/dashboard).

---

## The Validation tab on the Data screen

| Tab | What it does |
|-|-|
| **Checks** | Edit the checks and [settings](/docs/extensions/validation/checks#settings). **Save**, **Discard changes**, and **Delete validation** (the records already made are kept) |
| **Test and run** | Test the checks as edited, or run the saved checks, for the latest data point, one date or a range. For a curve you can limit a test or run to some tenors |
| **Records** | The records of this data item, with counts, filters (status, dates, and for a curve the failing tenor), bulk override, comment and run again, and CSV |
| **JSON** | The configuration as it is saved |
