---
slug: /training/user/reports
title: "Module 07: Reports & Dashboards"
sidebar_position: 8
tags: [training, user, portal, reports, excel]
---

# Module 07: Reports & Dashboards

Reports turn platform data into something you can read at a glance: a table of the day's settlement prices, a chart of dataset deliveries, a summary of who used the system. In this module you will find and run reports in the portal, use insight reports, bring reports into Excel, and see how reports can be scheduled, emailed and shown on dashboards.

## Learning Objectives

By the end of this module you will be able to:

- Find, run and view reports on the **Reports** screen
- Explain the difference between stored reports and insight reports
- Find the insight reports for a screen or a single item
- Download a report into Excel and refresh it
- Describe the no-code ways to schedule, email and display reports

## Prerequisites

- You have completed [Module 01](/training/user/portal-overview)
- For Step 4: the Excel Add-in ([Module 03](/training/user/excel-setup))

---

## Step 1: Understand the Kinds of Report

A **report** is built from a **report configuration**, which says what to run (usually an ODSL script written by a developer) and, optionally, a template that formats the result as HTML. Each run produces a report for a date, the **ondate**.

| Type | What it means for you |
|-|-|
| **Default** | Runs a script and stores the result. You choose the date range and run it |
| **Fixed** | Updated by people or processes rather than run, for example a daily status report that several processes add to during the day |
| **Dynamic** | Runs automatically the first time a date is opened |
| **Insight** | An interactive report that reads live data and stores nothing, so it has no ondate |
| **Widget** | Like an insight, sized to sit on a dashboard, and can update in real time |

:::note Who creates reports?
Creating a new report configuration needs a script, so it is usually done by a developer or your data team. As a user you find, run, view and share reports, and you can schedule and email them as shown in Step 6.
:::

---

## Step 2: Run a Report in the Portal

1. Go to **Reports**
2. Choose **Public** for OpenDataDSL's reports, or **Private** for your company's own
3. Find the report by filtering or scrolling. Reports are grouped by **category**
4. Choose the date range with the range selector
5. Select **Run**

The result appears on screen. A stored report can be opened again for any date it was stored for.

:::tip Fixed reports cannot be run
A **Fixed** report is updated by people or processes, not run. Open it to read the latest content.
:::

---

## Step 3: Use Insight Reports

Insight reports are interactive reports that read the platform's data as you open them. You will find them in several places:

| Kind | Where it appears | Example |
|-|-|-|
| **General insights** | In the reports menu | A general audit report |
| **Service insights** | In the reports section of a screen, about every item on it | Insights on the curves screen |
| **Item insights** | In an insights menu or tab after you select one item | The **Insights** tab of a dataset in dataset monitoring (Module 06) |
| **Excel insights** | In the insights section of the Excel Add-in | Data returned straight into a worksheet |

Many extensions add their own insight reports. For example, the Automations extension adds **Automations by Target**, **Automation Failures** and others in the **Automations** category of **Insights**, each with **Refresh** and **CSV** buttons.

Some master data records also carry reports: an embedded report shows as a link on the record, and a linked report shows as its own tab when you view the record.

---

## Step 4: Bring a Report into Excel

1. In the Excel task pane, select **Download**, then **Reports**, or select **Download** on the **Reports** card
2. Search for the report
3. Select the download icon on the report, or the plus icon to add several to the selection
4. Optionally, on the **Options** tab, choose the **Ondate** to show. This option appears once you have added data to the selection

![Choosing the ondate of a report](/img/training/excel/reports-download3.png)

5. Choose the layout, **Horizontal** or **Vertical**, and select **Download**

To update it later, select **Refresh**, then **Reports**, and choose the ranges to refresh.

:::note Not every report is offered in Excel
Reports can be hidden from the Excel Add-in by the people who create them. If you cannot find a report in Excel that you see in the portal, ask its owner.
:::

---

## Step 5: Dashboards

A **dashboard** arranges widgets (charts and small reports) on a grid. You can build your own dashboard to act as your personal home screen, and dashboards can optionally be shared with colleagues.

If your company uses the **Composer** extension, its gallery has a **Save as dashboard** button. It saves the composition cards, in their order and widths, as a portal dashboard, and you choose its name, what each widget shows and whether to share it. See [Composer, getting started](/docs/extensions/composer/getting-started).

---

## Step 6: Schedule and Email a Report

You do not need to remember to run a regular report.

**With the Aggregator extension** (if installed), **Information**, **Aggregator** lets you start from a ready-made example, such as the day's dataset deliveries, run it and save it under your own name. Its report can then:

- Run on a schedule, for example weekdays at 18:00 UK time, storing the result for each date
- Email the result each time it is stored, to addresses in your organisation

Building a new aggregation from scratch uses database pipeline stages, so you may want help from your data team the first time. See [Schedule and email](/docs/extensions/aggregator/schedule-and-email).

**With an automation**, any report can be emailed when it is updated, using the email targets described in [Module 08](/training/user/alerts).

---

## Exercise

1. Go to **Reports**, choose **Public**, and browse the categories. Pick a report and run it for the last month
2. Open the **Insights** tab of a dataset in dataset monitoring and open one of its insights
3. In Excel, download one report and refresh it
4. If the Aggregator is installed, open **Information**, **Aggregator**, pick an example under **Start from an example** and select **Run**

---

## Summary

| Task | Where |
|-|-|
| Run a report | **Reports**, Public or Private, find it, choose the range, **Run** |
| Interactive insights | Reports menu, a screen's reports section, or an item's insights |
| Report in Excel | **Download**, **Reports**, **Options** for the ondate, **Download** |
| Personal or shared view | A dashboard of widgets |
| Regular delivery | Aggregator schedule and email, or an automation |

**Further reading:** [Reporting Basics](/docs/topics/reporting/basics), [Insights](/docs/odsl/insights/general), [Reports in Excel](/docs/user/excel/reports), [Aggregator](/docs/extensions/aggregator/overview)

:::note Next Step
In [Module 08](/training/user/alerts) you will set up notifications so you hear about delivery failures and quality issues without having to look.
:::
