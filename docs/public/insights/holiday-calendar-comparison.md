---
title: Holiday Calendar Comparison
description: An insight report of the Calendar Manager that shows the holidays of the calendars you pick side by side for a year, and the dates they disagree on
slug: /public/insights/holiday-calendar-comparison
catalog_summary: The holidays of several calendars side by side for a year, and where they disagree
tags: [insight, report, calendars, holidays, calendar manager]
---

# Holiday Calendar Comparison

A company calendar often starts as a copy of a public one and then drifts: an office closure is added, an exchange holiday is missed. When two desks use different calendars, a price expected on one desk's business day is missing on the other's. **The Holiday Calendar Comparison** shows the holidays of the calendars you pick side by side and answers questions like:

- Does our trading calendar include every UK bank holiday?
- Which days does the ICE Endex calendar close that our calendar does not?
- Do these calendars agree on Easter and Christmas this year?

At Northgate Energy, Priya Shah compares `NGE_TRADING` with the public UK bank holiday calendar `#UKBANKHOLIDAYS` and the ICE Endex calendar `#ICE_ENDEX`. They agree on eight holidays; Christmas Eve and New Year's Eve are closed for Northgate and ICE Endex but are not bank holidays.

![Three holiday calendars compared for 2026, with the two dates they disagree on highlighted](/img/insights/holiday-calendar-comparison/overview.png)

---

## Opening the report

The report is on the **Insights** tab of **Manage**, **Calendars** (the [Calendar Manager](/docs/extensions/calendar-manager/overview)), as **Holiday Calendar Comparison** (`odsl.calendar_manager.compare`).

It opens with this year and your first two private holiday calendars picked (or the first two calendars if you have no private ones).

| Control | What it does |
|-|-|
| **Calendars** | The holiday calendars to compare, private and public. Search the list and tick the ones you want; the picked calendars stay at the top. |
| **Year** | The year to compare |
| **Only dates they disagree on** | Hides the dates every picked calendar has |
| **Refresh**, **CSV**, **Help** | Read the holidays again, download the table, open this page |

---

## Summary cards

| Card | What it shows |
|-|-|
| **Calendars** | How many calendars are picked |
| **Holiday dates** | Dates that are a holiday in at least one picked calendar |
| **In every calendar** | Dates that are a holiday in all of them |
| **They disagree on** | Dates that are a holiday in some but not all |

---

## The table

One row per holiday date, one column per calendar. A cell has a tick and the holiday's name when the date is a holiday in that calendar, and a dash when it is not. Rows the calendars disagree on are highlighted. The last row counts each calendar's holidays.

Weekly closures, such as every Saturday, are not listed.

---

## Where the data comes from

The calendar list comes from the calendar service, filtered to holiday calendars. The holidays come from each calendar's rules, through the calendar service's `holiday-report` function for the year.

---

## Related

- [Holiday Report](/docs/public/insights/holiday-report), the holidays of several calendars as a list for any range
- [Business Days by Month](/docs/public/insights/business-days-by-month)
- [The Calendar Manager](/docs/extensions/calendar-manager/overview)
- [Insights](/docs/odsl/insights/general)
