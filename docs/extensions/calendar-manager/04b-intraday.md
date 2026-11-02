---
title: Intraday calendars
description: How to create, edit and test intraday calendars in the Calendar Manager, with their interval, time zone, the hours they keep and their holiday calendar
slug: /extensions/calendar-manager/intraday
sidebar_position: 4.5
tags: [extension, calendar manager, intraday, hourly, peak, off-peak]
---

# Intraday calendars

Hourly, half-hourly and quarter-hourly data follows an **intraday calendar**: day-ahead power prices by hour, GB settlement periods, peak and off-peak block hours. An intraday calendar has no rules. It is every interval of the day, in its own time zone, less the hours you leave out, on the days its holiday calendar allows.

At Northgate Energy, Tom Clarke looks after the German power hour calendars: `NGE_DE_PEAK_HOURS` (08:00 to 20:00, Berlin time, on EEX trading days) and `NGE_DE_OFFPEAK_HOURS` (the other hours, and the whole of weekends and EEX holidays).

![The Calendar Manager with the German power peak hours calendar open: its interval, time zone, hours and holiday calendar on the left, and the days of Christmas week on the right](/img/extensions/calendar-manager/intraday-editor.png)

---

## Creating an intraday calendar

Select **New intraday calendar** in the header. A new calendar starts as every hour of every day in UK time. Give it an **ID**, a **Name** and a **Description**, set the fields below and select **Save**.

To open one, click it on the **Calendars** tab: choose **Intraday calendars** in **Type** to list only them.

---

## The definition

![The definition of the peak hours calendar: hourly, Europe/Berlin, the hours 08 to 19 kept, and the EEX power holiday calendar](/img/extensions/calendar-manager/intraday-form.png)

| Field | What it does |
|-|-|
| **Interval** | The length of each interval: 1, 5, 10, 15 or 30 minutes, or 1, 2, 3, 4, 6 or 12 hours. It must divide a day exactly. |
| **Time zone** | The time zone the hours are in, such as `Europe/Berlin` or `Europe/London`. Pick one from the list or type its name. The hours follow the clocks, so a day has 23 or 25 hours when they change. |
| **Holiday calendar** | Optional. The calendar that decides which days are open, such as `#EEX_POWER` or `#UKBANKHOLIDAYS`. Leave it empty for every day. |
| **On holidays and closed days** | **No intervals (peak, base)**: the days the holiday calendar closes (weekends and holidays) have no intervals. **Every interval of the day (off-peak)**: those days keep every interval, whatever the hours below. |
| **Hours kept** | Click an hour to keep it or leave it out. The hours are in the calendar's time zone: `08` is 08:00 to 09:00. The text under the hours says which ones are kept. |

The buttons under the hours set common blocks:

| Button | Hours kept |
|-|-|
| **All hours (base)** | 00:00 to 24:00 |
| **Peak 08-20** | 08:00 to 20:00 |
| **Off-peak (not 08-20)** | 00:00 to 08:00 and 20:00 to 24:00 |
| **Off-peak 1 (00-08)** | 00:00 to 08:00 |
| **Off-peak 2 (20-24)** | 20:00 to 24:00 |

:::tip
For an off-peak calendar, keep the off-peak hours, set the holiday calendar and choose **Every interval of the day (off-peak)**: weekends and holidays are then off-peak all day, as the market defines them.
:::

The platform checks the definition when you test and when you save: an interval that does not divide a day, a time zone it does not know, a holiday calendar that does not exist (or is itself intraday) and a calendar with every hour left out are refused, with the reason.

---

## Testing an intraday calendar

The **Test** panel works out the intervals with the definition as it is in the editor, saved or not. **From** and **To** are days in the calendar's time zone, up to 92 days. It starts with the next seven days.

| Card | What it shows |
|-|-|
| **Intervals** | Intervals in the range |
| **Days with intervals** | Days that have at least one interval |
| **Closed days** | Days the holiday calendar closes. For an off-peak calendar the card is **Whole days (closed days)**: those days are kept whole. |
| **Clock changes** | Days of 23 or 25 hours in the calendar's time zone |

### Days

One row per day: the number of intervals, when the first starts and when the last ends, with **closed day** (or **closed day: whole day kept**) and **23 hour day** or **25 hour day** marks. In the example, 24 to 27 December and New Year's Eve are closed on `#EEX_POWER`, so the peak calendar has no hours on those days.

![The days of Christmas week for the peak hours calendar: twelve hours on open days, none on closed days](/img/extensions/calendar-manager/intraday-days.png)

### Hours

A grid of the days and the 24 hours of each, in the calendar's time zone: blue for the hours with intervals, purple for a closed day kept whole.

![The hours grid of the peak calendar over Christmas](/img/extensions/calendar-manager/intraday-hours.png)

The off-peak calendar over the same days keeps the night hours on open days, and every hour of the closed days:

![The hours grid of the off-peak calendar, with the closed days kept whole](/img/extensions/calendar-manager/intraday-offpeak-hours.png)

### Intervals

Each interval: its local time, its offset from UTC and the time in UTC, which is how a timeseries on the calendar stores its index. At most 3,000 are listed; **CSV** downloads them.

### Changes

For a saved calendar: the definition against the saved version, line by line, then the days whose intervals change in the test range. At Northgate Energy, Tom tries starting peak at 07:00: the tab shows one more hour on each open day before he decides.

![The Changes tab after keeping hour 07: the definition change, and thirteen hours instead of twelve on each open day](/img/extensions/calendar-manager/intraday-changes.png)

---

## Public intraday calendars

Public intraday calendars, such as `#EPEX_DA_OFFPEAK2_CALENDAR` (the EPEX day-ahead Offpeak-2 block, 20:00 to 24:00 Paris time), can be tested but not changed. Use **Save as copy** to make a private version.

---

## History

**History** compares the definition of any version with the editor, and **Load into the editor** puts it back, as for other calendars. See [Editing rules](/docs/extensions/calendar-manager/editing#history).
