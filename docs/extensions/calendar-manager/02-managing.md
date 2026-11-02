---
title: Managing calendars
description: The Calendars tab of the Calendar Manager, and how to open, create, copy and delete calendars
slug: /extensions/calendar-manager/managing
sidebar_position: 2
tags: [extension, calendar manager, calendars]
---

# Managing calendars

Open **Manage**, **Calendars** from the portal menu. The Calendar Manager opens on the **Calendars** tab.

---

## The Calendars tab

The tab lists every holiday calendar, expiry calendar and other calendar you can read, private and public, in one table.

![The Calendars tab listing private and public holiday, expiry and other calendars](/img/extensions/calendar-manager/calendars-list.png)

| Control | What it does |
|-|-|
| **Search** | Shows the calendars whose id, name or description contains the words you type |
| **Type** | All calendars, holiday calendars, expiry calendars or other calendars (business, daily, monthly...) |
| **Source** | Private and public, private only or public only |
| **Sort by** | ID, name, or the last changed first |
| **Export** | Downloads the calendars that match the filters as CSV |
| **Refresh** | Reads the lists again |

### Summary cards

| Card | What it shows |
|-|-|
| **Holiday calendars**, **Expiry calendars**, **Other calendars** | How many of each you can read |
| **Private** | Your company's own calendars, which you can change |
| **Public** | Calendars maintained by OpenDataDSL |

### Columns

| Column | What it shows |
|-|-|
| **ID** | The calendar id. Public ids start with `#`. |
| **Name** | The name, with the description under it |
| **Type** | **Holiday**, **Expiry**, or the kind of other calendar (Business, Daily...) |
| **Source** | **Private** or **Public** |
| **Rules** | How many rules an expiry calendar has (the calendar lists do not include the rules of holiday calendars: open one to see them) |
| **Trading calendar** | For an expiry calendar, the calendar its rules move on, and the delivery calendar when it is different |
| **Last changed** | When the current version was saved, and by whom |
| **Version** | The current version number |

Click a row to open the calendar in the **Editor** tab. The copy button at the end of a row opens the calendar as a new private copy.

---

## Opening a calendar

When you open a calendar, the editor shows its rules, checks each one against the grammar and runs the test, so you see its dates straight away.

| Calendar | What you can do |
|-|-|
| A private holiday or expiry calendar | Edit, test, save, save as a copy, delete, history |
| A public calendar | Test, save as a copy, history. A note explains it is maintained by OpenDataDSL. |
| A financial (FX) expiry calendar | Test only: it is defined by cross and base calendars, not rules |
| Another calendar (business, daily...) | See its dates and definition |

---

## Creating a calendar

Select **New holiday calendar** or **New expiry calendar** in the header.

- A new holiday calendar starts with `Every Saturday` and `Every Sunday`.
- A new expiry calendar starts with a common month rule: `go to the end of the previous month then go back 1 days using calendar`. Choose its **Trading calendar** before you test it.

Give it an **ID** (letters, digits, dots, underscores and dashes; no spaces and no `#`, which is for public calendars), a **Name** and a **Description**, write the rules and select **Save**. See [Editing rules](/docs/extensions/calendar-manager/editing).

At Northgate Energy, Priya creates `NGE_TRADING` with the weekend rules, the UK bank holidays and two office closures:

```
Every Saturday
Every Sunday
1st of January named 'New Year Holiday' on Saturday shift 2 days and on Sunday shift 1 day
Good Friday
Easter Monday
First Monday in May named 'Early May Bank Holiday'
Last Monday in May named 'Spring Bank Holiday'
Last Monday in August named 'Summer Bank Holiday'
24th of December named 'Christmas Eve (office closed)'
25th of December named 'Christmas Day' on Saturday shift 2 days and on Sunday shift 2 days
26th of December named 'Boxing Day' on Saturday shift 2 days and on Sunday shift 2 days
31st of December named 'New Year Eve (office closed)'
```

---

## Copying a calendar

Select **Save as copy** in the editor, or the copy button in the list. The copy is a new, unsaved private calendar with the same rules, an id ending in `_COPY` and the name followed by `(copy)`. Change the id if you want, then select **Save**.

This is how you change a public calendar: copy it, change the copy, and point your timeseries, curves or expiry calendars at the copy.

---

## Deleting a calendar

Select **Delete** in the editor of a private calendar and confirm. Timeseries, curves and expiry calendars that use the calendar no longer find it, so check the [Calendar Usage Report](/docs/public/insights/calendar-usage) first.

:::caution
Deleting cannot be undone from the Calendar Manager.
:::

---

## Unsaved changes

The title shows **Changed** once you change anything. Opening another calendar, closing the editor or leaving the page asks you to confirm before your changes are lost.
