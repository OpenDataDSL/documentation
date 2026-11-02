---
title: Calendar Health Check
description: An insight report of the Calendar Manager that checks every holiday, expiry, intraday, monthly, weekly and offset daily calendar for rules that no longer follow the grammar, missing calendars, ended rules and missing holidays
slug: /public/insights/calendar-health
catalog_summary: Holiday and expiry calendars with broken rules, missing trading calendars or no holidays next year
tags: [insight, report, calendars, holidays, expiry, calendar manager]
---

# Calendar Health Check

Calendars are set up once and then trusted for years. Meanwhile a market adds a holiday, a rule written with a typo was stored half understood, or an expiry calendar still points at a trading calendar that was renamed. **The Calendar Health Check** checks every holiday, expiry and intraday calendar, and every monthly, weekly and offset daily calendar, at once and answers questions like:

- Do all our calendar rules still follow the rule grammar?
- Does every expiry calendar's trading and delivery calendar exist?
- Which holiday calendars have no holidays next year, because their rules have ended?
- When is the next expiry of each expiry calendar?
- Does every intraday calendar have a valid interval, time zone and holiday calendar?

At Northgate Energy, Priya Shah runs the check every December, before the new year's curves are built on `NGE_TRADING` and `NGE_TTF_EXPIRY`. It finds two problems: the old gas desk calendar `NGE_GAS_OLD` has a rule with stray words that was stored half understood, and the old NBP expiry calendar points at a trading calendar that no longer exists.

![The Calendar Health Check of the private calendars, with the issues found](/img/insights/calendar-health/overview.png)

---

## Opening the report

The report is on the **Insights** tab of **Manage**, **Calendars** (the [Calendar Manager](/docs/extensions/calendar-manager/overview)), as **Calendar Health Check** (`odsl.calendar_manager.health`). It is not in the general report list.

It opens checking your private calendars.

| Control | What it does |
|-|-|
| **Calendars** | Private, public, or private and public |
| **Refresh** | Checks the calendars again |
| **CSV** | Downloads the table on the tab shown |
| **Help** | Opens this page |

---

## Key ideas

| Idea | What it means |
|-|-|
| **Follows the grammar** | The rule's plain English text reads correctly with the holiday or expiry rule grammar, all the way to the end. A rule that does not was stored half understood, so the calendar may be missing holidays or give the wrong expiries. |
| **Ended rule** | A holiday rule valid only to this year or an earlier year (`to 2026`) |
| **Error**, **Warning**, **Note** | How serious an issue is: an error gives wrong dates or stops the calendar working; a warning is very likely a mistake; a note is worth knowing |
| **Healthy** | No errors or warnings |

---

## Summary cards

| Card | What it shows |
|-|-|
| **Calendars checked** | Holiday and expiry calendars checked |
| **Healthy** | Calendars with no errors or warnings |
| **With errors**, **With warnings** | Calendars whose worst issue is an error or a warning |
| **Rules failing the grammar** | Stored rules that do not follow the grammar |
| **Missing calendars** | Trading, delivery, cross or base calendars named by an expiry calendar that do not exist |

---

## The tabs

### Issues

One row per issue, errors first.

| Column | What it shows |
|-|-|
| **Level** | **Error**, **Warning** or **Note** |
| **Calendar** | The id and name |
| **Type** | Holiday or expiry, private or public |
| **Issue** | What is wrong |
| **Last changed** | When the calendar was last saved, and by whom |

| Issue | Level |
|-|-|
| N rules do not pass the rule grammar | Error |
| Trading (delivery, cross, base) calendar ... could not be found | Error |
| The calendar could not be read | Error |
| The next expiry could not be worked out | Error |
| The calendar (or expiry calendar) has no rules | Warning |
| An intraday calendar's interval does not divide a day, its time zone is unknown, its holiday calendar is missing or intraday, or every hour is left out | Error |
| A monthly, weekly or offset daily calendar has a setting out of range, a weekly calendar of several weeks has no reference date, or its holiday calendar is missing or not a holiday calendar | Error |
| No holidays next year: the rules may have ended | Warning |
| Fewer holidays next year than this year | Note |
| N rules end this year or earlier | Note |

### Rules failing the grammar

Each stored rule that does not follow the grammar: the calendar, the rule number, the rule text and the problem. Open the calendar in the Calendar Manager to fix it: the editor marks the mistake where it is.

![A stored rule that does not follow the grammar: the words in England after the holiday name](/img/insights/calendar-health/rules.png)

### All calendars

Every calendar checked: its type, number of rules, holidays this year and next year (holiday calendars), its trading calendar and next expiry (expiry calendars), its holiday calendar, interval and time zone (intraday calendars), and its status.

![Every private calendar checked, with its holidays, next expiry and status](/img/insights/calendar-health/all-calendars.png)

---

## Where the data comes from

The calendar lists come from the calendar and expiry services. Each calendar is checked by the platform's `health` function on the same service, which reads each stored rule's plain English text with the rule grammar, looks up the calendars an expiry calendar names, counts the holidays of this year and next, and works out the next expiry from today.

---

## Related

- [The Calendar Manager](/docs/extensions/calendar-manager/overview), to fix what the check finds
- [Calendar Usage Report](/docs/public/insights/calendar-usage), to see what uses a calendar
- [Insights](/docs/odsl/insights/general)
