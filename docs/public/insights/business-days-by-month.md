---
title: Business Days by Month
description: An insight report of the Calendar Manager that counts the business days each calendar you pick has in each month of a year
slug: /public/insights/business-days-by-month
catalog_summary: How many business days each calendar has in each month of a year
tags: [insight, report, calendars, business days, calendar manager]
---

# Business Days by Month

Volumes, budgets and monthly averages depend on the number of business days in each month, and that depends on the calendar. **Business Days by Month** counts them for the calendars you pick and answers questions like:

- How many business days does each month of next year have in our trading calendar?
- In which months do the UK and the exchange calendar differ, and by how many days?
- How many business days does the year have?

At Northgate Energy, Tom Clarke takes next year's counts for `NGE_TRADING` to the volume team before they set the monthly hedge volumes, next to the TARGET2 and EEX power calendars the euro and power desks use.

![Business days in each month of 2027 for three calendars, with the months they differ highlighted](/img/insights/business-days-by-month/overview.png)

---

## Opening the report

The report is on the **Insights** tab of **Manage**, **Calendars** (the [Calendar Manager](/docs/extensions/calendar-manager/overview)), as **Business Days by Month** (`odsl.calendar_manager.workdays`).

It opens with this year and your first two private holiday calendars picked.

| Control | What it does |
|-|-|
| **Calendars** | The holiday calendars to count, private and public |
| **Year** | The year to count |
| **Refresh**, **CSV**, **Help** | Count again, download the table, open this page |

---

## Summary cards

| Card | What it shows |
|-|-|
| **Calendars** | How many calendars are picked |
| **Most business days**, **Fewest business days** | The highest and lowest yearly totals of the picked calendars |
| **Months they differ** | Months where the picked calendars do not have the same count |

---

## The table

One row per month and one column per calendar, with the number of business days and a bar to compare them. Months where the calendars differ are highlighted. The last row is the year's total.

A business day is a date the calendar gives: a day no rule closes, so a weekday that is not a holiday for the usual calendars.

---

## Where the data comes from

The business days are the dates (indexes) of each calendar for the year, from the calendar service's `index-report` function, counted by month.

---

## Related

- [Holiday Calendar Comparison](/docs/public/insights/holiday-calendar-comparison)
- [Calendar Report](/docs/public/insights/calendar-report), every date of the calendars you pick
- [The Calendar Manager](/docs/extensions/calendar-manager/overview): the **Business days** tab of its test panel counts the days of a calendar you are editing
- [Insights](/docs/odsl/insights/general)
