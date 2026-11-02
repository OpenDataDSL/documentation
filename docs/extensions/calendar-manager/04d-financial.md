---
title: Financial expiry calendars
description: How to create, edit and test financial (FX and money market) expiry calendars in the Calendar Manager, with spot, the short tenors, weeks, months and years on three calendars
slug: /extensions/calendar-manager/financial
sidebar_position: 4.8
tags: [extension, calendar manager, financial, fx, spot, tenors, money market]
---

# Financial expiry calendars

FX forwards, deposits and overnight index swaps are not quoted for calendar months. They are quoted for tenors counted from spot: overnight (ON), tom-next (TN), spot-next (SN), a week, three months, a year. A **financial expiry calendar** works out the dates of these tenors. It has no rules: it is set up from three calendars and a spot offset, and it follows the usual FX and money market conventions.

| Setting | What it does |
|-|-|
| **Trading calendar** | The quoting calendar: where the tenors trade. Stored as `tradingCalendarCode`. |
| **Cross calendar** | For an FX pair, the calendar of the other currency. Stored as `crossCode`. |
| **Base calendar** | A third calendar that spot and the short and week tenors also avoid. Stored as `baseCode`. |
| **Spot** | The spot offset in business days: T+2 for most FX pairs, T+0 for overnight index rates. Stored as `offset`. |

For a single currency, such as an overnight index, use the same calendar for all three: **Use the trading calendar for all three** fills in the cross and base calendars for you.

To create one, choose **Financial expiry (FX, money markets)** in the **New other calendar...** menu in the header. To list them, choose **Financial expiry calendars** in **Type** on the **Calendars** tab. The **Based on** column shows the trading calendar, the spot offset and the other calendars.

---

## How the dates are worked out

Every tenor starts and ends on a business day, and its expiry is its end: a curve contract on a financial tenor delivers from its start to its end.

| Tenor | Starts | Ends and expires |
|-|-|-|
| **SP** (spot) | Spot | Spot |
| **ON** (overnight) | The curve date | The next business day |
| **TN** (tom-next) | The next business day after the curve date | The business day after that |
| **SN** (spot-next) | Spot | The next business day after spot |
| **SW**, **1W**, **2W**... | Spot | Spot plus the weeks, moved to the first business day on or after it |
| **1M**, **3M**, **1Y**... | Spot | Spot plus the months or years, moved to a business day by the modified following convention |

**Spot** is worked out from the curve date in three steps: add the offset in weekdays and move to a business day of the trading calendar; count the offset in business days of the cross calendar; take the later of the two, and move to the first day that is open in all three calendars.

**Modified following** moves a date that is not a business day forward to the next business day, unless that is in the next month: then it moves back to the last business day of the month. When spot is the last business day of its month, month and year tenors trade **end-end**: they end on the last business day of their month (spot on 30 April gives a one month end of 31 May).

:::caution
Month and year tenors are moved on the trading and cross calendars only, not on the base calendar. A month or year tenor can therefore end on a holiday of the base calendar. The test marks such tenors **Closed in** the base calendar. Spot, the short tenors and the week tenors avoid the holidays of all three calendars.
:::

---

## An example

At Northgate Energy, Tom Clarke keeps `NGE_GBPUSD_FX` for the GBP/USD forward curve. Its trading and base calendar is `#UKBANKHOLIDAYS`, its cross calendar `NGE_USD_SETTLEMENT` (the US settlement holidays) and spot is T+2.

![The GBP/USD forward calendar: trading and base calendar #UKBANKHOLIDAYS, cross calendar NGE_USD_SETTLEMENT, spot T+2, and its tenors from 26 August 2026](/img/extensions/calendar-manager/financial-editor.png)

From the curve date 26 August 2026, spot is Friday 28 August. Monday 31 August is the UK summer bank holiday, so 28 August is the last business day of the month and the month tenors trade end-end: 1M ends on 30 September, 6M on 26 February 2027 (28 February is a Sunday).

---

## Testing a financial expiry calendar

| Setting | What it does |
|-|-|
| **Curve date** | The date spot and the tenors are worked out from. It starts as today. |
| **Tenors** | The groups of tenors to list: **Short dated** (SP, ON, TN, SN, SW), **Weeks** (1W to 3W), **Months** (1M to 12M and 18M) and **Years** (2Y to 10Y) |
| **Other tenors** | More tenors to list, such as `15M, 15Y` |

### Summary cards

| Card | What it shows |
|-|-|
| **Spot** | The spot date, its day and the offset |
| **End-end** | **Yes** when spot is the last business day of its month |
| **Moved** | Tenors whose end is not the plain date (spot plus the tenor), because that is not a business day |
| **Not a business day** | Tenors that end on a holiday of one of the three calendars (see the caution above) |
| **Errors** | Tenors that could not be worked out, such as a code that is not a financial tenor |

### Tenors

One row per tenor: its start, its end (which is also its expiry), the number of days, how it was moved and whether its end is open in all three calendars. Click a tenor to trace it.

![The tenors of the GBP/USD calendar from 26 August 2026: end-end month tenors, and the spot-next moved over the weekend and the bank holiday](/img/extensions/calendar-manager/financial-tenors.png)

| Column | What it shows |
|-|-|
| **Start** | Spot, the curve date (ON) or the next business day (TN) |
| **End and expiry** | The end of the tenor, which is its expiry |
| **Days** | Calendar days from the start to the end |
| **Moved** | **End-end** with the plain date it replaces, or **forward from** or **back from** the plain date |
| **Business day** | *open in all three*, or **Closed in** and the calendar whose holiday it is |

### Trace a tenor

The steps that give spot and the end of one tenor, with the days passed over and the calendar that closed each of them. Type a tenor, or click one on the **Tenors** tab.

![The trace of the 1M tenor: spot two business days after the curve date, then one month, end-end to the last business day of September](/img/extensions/calendar-manager/financial-trace.png)

### Changes

When you change the settings of a saved calendar, the **Changes** tab shows the settings before and after, and every tenor whose start or end changes from the curve date. In version 1 of `NGE_GBPUSD_FX` the cross calendar was `#UKBANKHOLIDAYS`, so the US Labor Day was ignored. From 3 September 2026, the version 2 settings move spot from 7 to 8 September, and every tenor with it:

![Changing the cross calendar back to #UKBANKHOLIDAYS: spot moves from 8 to 7 September and every tenor moves with it](/img/extensions/calendar-manager/financial-changes.png)

---

## Creating and saving

A new financial expiry calendar starts with spot T+2 and no calendars. Give it an **ID**, a **Name** and a **Description**, choose the three calendars and the spot offset, check the test and select **Save**.

![A new EUR/USD calendar on #TARGET and NGE_USD_SETTLEMENT, tested before it is saved](/img/extensions/calendar-manager/financial-new.png)

Each calendar must exist and be a holiday calendar (a calendar of business days, such as `#BUSINESS`), and spot must be 0 to 10 business days. The test lists anything wrong, and a save that breaks one of these is refused with the reason.

Copying, history, public calendars and deleting work as for every other calendar: see [Managing calendars](/docs/extensions/calendar-manager/managing). The public financial expiry calendars, such as `#FEXPEONIA`, can be tested and copied by everyone and changed only by OpenDataDSL users.

![The Calendars tab filtered to financial expiry calendars](/img/extensions/calendar-manager/financial-list.png)

:::note
This release also fixes the start and end of financial curve contracts. They were worked out separately from the expiry: spot ignored the cross and base calendars (so a contract could start on a holiday of either), month and year ends rolled into the next month instead of back, and end-end was missed (a one month contract from spot on 27 February ended on 27 March instead of 31 March). The start and end now come from the financial expiry calendar, so they always agree with the expiry. Expiries are unchanged.
:::
