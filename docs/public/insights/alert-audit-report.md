---
title: Alert Audit Report
description: An item insight that shows the audit trail of one selected alert, so you can follow who raised, acknowledged, commented on and closed it
slug: /public/insights/alert-audit-report
catalog_summary: The history of one alert, from being raised to being closed, with every field that changed along the way
tags: [insight, report, audit, alerts, item insight]
---

# Alert Audit Report

An alert passes through several hands before it is closed. The **Audit Report** on an alert shows each step, so you can answer questions like:

- When was this alert raised, and by what?
- Who acknowledged it, and how long after it was raised?
- Who was it assigned to, and what comments were added?
- When was it closed, and was that a person or the platform?

At Northgate Energy, alert `NGE-ALERT-1042` was raised at 18:42 on 26 October because the ICE Endex TTF dataset was late. Tom Clarke acknowledged it 13 minutes later, added a comment while chasing the provider, and the platform closed it when the dataset completed.

![The Audit Report for alert NGE-ALERT-1042 with the acknowledgement selected](/img/insights/alert-audit-report/report.png)

---

## Opening the report

This is an item insight: open an alert, then choose **Audit Report** from its insights (report id `#ALERTI_AUDITING`, category **Alert Insights**). The screen passes the alert's id to the report, which lists the audit entries for that alert in the chosen date range.

| Control | What it does |
|-|-|
| **Date Range** | **Today** (the default), **Yesterday**, **Last 7 days**, **Last 30 days**, **Last 60 days**, **This month**, **Last month** or **All**. Choosing one fills in **Start** and **End** and reloads the list. |
| **Start**, **End** | Change the start or end date and time yourself; the list reloads. |
| Report name | Select the report name at the top left to hide or show the description and date controls, which gives the table more room. |
| Column menus | Select the filter icon in a column header to filter the rows shown, or a column header to sort by it. |


:::tip
The report opens on **Today**. For an alert raised earlier, choose **Last 7 days** or **All** first.
:::

---

## The report

The top table lists the alert's audit entries:

| Column | What it shows |
|-|-|
| **User** | Who made the change. `data@opendatadsl.com` is the platform itself, for example a monitoring job. |
| **Action** | `create`, `update`, `delete` or `rollback` |
| **Service** | `alert` |
| **Key** | The alert id |
| **Date** | When the change was made, newest first |
| **Description** | The reason given when the change was saved |

Select a row to see its field changes in the table underneath:

| Column | What it shows |
|-|-|
| **Kind** | `E` edited, `N` added, `D` removed, `A` a change inside a list |
| **Path** | The field that changed. A nested field shows each level separated by commas. |
| **Change From** | The value before (blank for an added field) |
| **Change To** | The value after (blank for a removed field) |


---

## Where the data comes from

| What | Where |
|-|-|
| Audit entries | The `audit` service, filtered on service `alert` and the alert's id |
| Source | Public for an id starting with `#`, otherwise private |

:::note
A value that is itself a list or an object, such as a whole comment record, shows as `[object Object]` in **Change From** or **Change To**. The path still tells you which field changed.
:::

---

## Related

- [Item Audit Report](/docs/public/insights/item-audit-report): the same idea for master data, reports and other items
- [Audit Report](/docs/public/insights/audit-report): every change across all services
- [Insights](/docs/odsl/insights/general): how insight reports work
