---
title: Reference
description: The platform functions behind the Calendar Manager, how calendars are stored, the extension's contents and troubleshooting
slug: /extensions/calendar-manager/reference
sidebar_position: 7
tags: [extension, calendar manager, reference, api]
---

# Reference

---

## Where calendars are kept

| Kind | Service | Sources | Notes |
|-|-|-|-|
| Holiday, intraday and other calendars | `calendar` | `private`, `public` | Versioned. A holiday calendar keeps its rules in `calendar.rules`, each with its plain English text in `code`. An intraday calendar keeps its definition in `calendar`. |
| Expiry calendars | `expiry` | `private`, `public` | Versioned. The rules are in `calendar.rules.map`, by tenor, each with its plain English text in `rule.code`. |

Every save makes a new version: `SERVICE/v1/SOURCE/ID/*` lists the versions and `SERVICE/v1/SOURCE/ID/N` reads version N.

---

## Saving from plain English

### Holiday calendar

`POST calendar/v1/private`

```json
{
  "_id": "NGE_TRADING",
  "_type": "HolidayCalendar",
  "name": "Northgate trading days",
  "description": "UK bank holidays and office closures",
  "rules": ["Every Saturday", "Every Sunday", "Good Friday"]
}
```

| Field | Description |
|-|-|
| `_id` | The calendar id |
| `_type` | `HolidayCalendar` |
| `name`, `description` | Optional |
| `rules` | The rules: a string is a plain English rule; an object is a stored rule (such as an embedded calendar) and is kept as it is |

Every plain English rule must follow the grammar, or nothing is saved and the error names each rule that does not.

### Intraday calendar

`POST calendar/v1/private`

```json
{
  "_id": "NGE_DE_PEAK_HOURS",
  "_type": "VarCalendar",
  "name": "German power peak hours",
  "description": "Hours 08:00 to 20:00 on EEX trading days",
  "calendar": {
    "_type": "IntradayCalendar",
    "period": 3600000,
    "timezoneCode": "Europe/Berlin",
    "holidayCalendarCode": "#EEX_POWER",
    "useHolidays": false,
    "withoutHours": [0, 1, 2, 3, 4, 5, 6, 7, 20, 21, 22, 23]
  }
}
```

| Field | Description |
|-|-|
| `calendar._type` | `IntradayCalendar` (`BlockCalendar` and `HourBlockCalendar` are intraday calendars too, and are kept as they are) |
| `period` | The interval in milliseconds: at least one minute, at most 12 hours, and it must divide a day exactly |
| `timezoneCode` | The time zone of the hours. Defaults to `UTC`. |
| `holidayCalendarCode` | Optional. The calendar that decides which days are open. It must exist and must not be an intraday calendar. |
| `useHolidays` | `false`: days the holiday calendar closes have no intervals. `true`: those days keep every interval (off-peak). |
| `withoutHours` | The hours of the day (0 to 23, in the time zone) to leave out. At least one hour must be kept. |

The calendar's own `_id` and `_name` are set from the record's `_id` and `name`. A definition that breaks one of these rules is refused with the reason.

:::note
Until this release, the holiday calendar of a stored intraday calendar was not looked up when the calendar was read, so every day was open whatever `holidayCalendarCode` said. It is now applied. A calendar whose holiday calendar is `DAILY` (every day) does not change; check any other stored intraday calendar with a holiday calendar before the release, because its indexes on weekends and holidays will change.
:::

### Monthly, weekly and offset daily calendars

`POST calendar/v1/private` with a `VarCalendar` record, as for an intraday calendar, and one of these as `calendar`:

```json
{"_type": "MonthlyCalendar", "period": 1, "dom": 32, "holidayCalendarCode": "NGE_TRADING", "rollBackwards": true}
{"_type": "WeeklyCalendar", "period": 2, "dow": 5, "refdate": "2026-01-02", "holidayCalendarCode": "NGE_TRADING", "rollBackwards": true}
{"_type": "OffsetDailyCalendar", "timezone": "Europe/London", "hour": 5, "dayOffset": 0}
```

| Field | Calendar | Description |
|-|-|-|
| `period` | Monthly | 1, 2, 3, 4, 6 or 12 months, counted from January |
| `dom` | Monthly | The day of the month, 1 to 31, or 32 for the last day of the month |
| `period` | Weekly | 1 to 52 weeks |
| `dow` | Weekly | The day of the week, 1 (Monday) to 7 (Sunday) |
| `refdate` | Weekly | A date (yyyy-mm-dd) in one of the weeks the calendar keeps; needed when `period` is more than 1 |
| `holidayCalendarCode` | Monthly, weekly | Optional. A holiday calendar; a date that is not one of its business days is moved |
| `rollBackwards` | Monthly, weekly | `true` to move such a date to the business day before, `false` (the default) to the next business day |
| `timezone`, `hour` | Offset daily | The time zone, and the hour (0 to 23) each day starts in it |
| `dayOffset` | Offset daily | Moves the index of each day by this many days (-7 to 7) |

A definition that breaks one of these rules is refused with the reason. The calendar's own id and name are set from the record (an offset daily calendar keeps them in `code` and `name`).

:::note
This release also fixes three platform bugs in these calendars:

- **Monthly calendars with a period of more than a month or a holiday calendar.** The dates of a range were stepped on from the previous date after any holiday move, so they drifted (half-yearly on the last day: 2 February, then 1 September instead of 31 July), and a month whose date was moved into the next month could be missed. A range starting in a month outside the period started the period there (quarterly from February: February, May, August, November). Monthly on the 1st with holidays moved back could also loop forever when the 1st was a holiday. Each date now comes from its own month. Monthly calendars without a holiday calendar and with a period of one month give exactly the same dates as before.
- **Weekly calendars of more than two weeks, and dates before the reference date.** A date off the cycle was moved by the remainder rather than to the next week of the cycle, so a 3 week calendar could land off its cycle, and before the reference date it moved backwards. Weekly calendars of one week, and of two weeks after their reference date, give the same dates as before.
- **A monthly or weekly calendar whose holiday calendar is not a holiday calendar** (such as `DAILY`) could not be read at all. Such a holiday calendar is now ignored when the calendar is read, and refused when it is saved.
:::

### Expiry calendar

`POST expiry/v1/private`

```json
{
  "_id": "NGE_TTF_EXPIRY",
  "_type": "ExpiryCalendar",
  "name": "TTF expiries",
  "tradingCalendar": "NGE_TRADING",
  "deliveryCalendar": "NGE_TRADING",
  "rules": ["go to the beginning of the current month then go back 2 days using calendar for months"]
}
```

| Field | Description |
|-|-|
| `tradingCalendar` | Required. The calendar the expiry rules move on. It must exist. |
| `deliveryCalendar` | Optional. Defaults to the trading calendar. |
| `rules` | At least one plain English rule; every rule must follow the grammar |

### Financial expiry calendar

`POST expiry/v1/private`

```json
{
  "_id": "NGE_GBPUSD_FX",
  "_type": "FinancialExpiryCalendar",
  "name": "GBP/USD FX forwards",
  "tradingCalendar": "#UKBANKHOLIDAYS",
  "crossCalendar": "NGE_USD_SETTLEMENT",
  "baseCalendar": "#UKBANKHOLIDAYS",
  "offset": 2
}
```

| Field | Description |
|-|-|
| `tradingCalendar` | Required. The trading (quoting) calendar. |
| `crossCalendar` | Required. The cross calendar: for an FX pair, the calendar of the other currency. |
| `baseCalendar` | Required. The base calendar. |
| `offset` | The spot offset, 0 to 10 business days (default 0) |

Each calendar must exist and be a holiday calendar (a calendar of business days). It is stored as a `VarExpiryCalendar` whose `calendar` is `{"_type": "FinancialExpiryCalendar", "tradingCalendarCode", "crossCode", "baseCode", "offset"}`, as before. The stored names `tradingCalendarCode`, `crossCode` and `baseCode` are accepted in the body too.

:::note
This release also fixes the start and end of financial tenors (`Financial` in `odsl-calendar`), which are the delivery start and end of financial curve contracts. They were worked out separately from the expiry and could disagree with it: spot ignored the cross and base calendars, month and year ends rolled into the next month instead of back (modified following), and end-end was missed. They now come from the financial expiry calendar, as the expiry always has. Expiries do not change. In a comparison of every tenor from SP to 5Y over two years of curve dates, a few percent of start and end dates change, each to the date of the expiry.
:::

---

## The calendar manager functions

| Request | Body or parameters | Returns |
|-|-|-|
| `POST calendar/v1/private?_function=validate` | `_id` (any), `rules` | `rules`: a check per rule; `valid` |
| `POST expiry/v1/private?_function=validate` | `_id` (any), `rules` | The same, for expiry rules |
| `POST calendar/v1/private?_function=test` | A holiday calendar as for saving, plus `start`, `end` (default this year and next) and `check` (dates) | `rules` (checks with `count`, and `weekly` for weekly closures), `holidays`, `months`, `years`, `checks` |
| `GET calendar/v1/SOURCE/ID?_function=test` | `start`, `end` | The same, for a stored calendar |
| `POST expiry/v1/private?_function=test` | An expiry calendar as for saving, plus `ondate`, `tenors` (default Month), `start`, `end` | `rules` (checks with `count`), `rows` (one per contract) |
| `GET expiry/v1/SOURCE/ID?_function=test` | `ondate`, `tenor` (comma separated), `start`, `end` | The same, for a stored calendar |
| `POST expiry/v1/private?_function=test` | A financial expiry calendar as for saving, plus `ondate` and `codes` (tenors, default SP to 10Y) | `valid`, `problems`, `spot`, `spotDow`, `endEnd`, `offset`, the three calendars, `rows` (one per tenor: `code`, `group`, `start`, `end`, `expiry`, `dow`, `days`, `nominal`, `move`, `endEnd`, `closed`, `error`) |
| `GET expiry/v1/SOURCE/ID?_function=test` on a financial expiry calendar | `ondate`, `codes` (comma separated) | The same, for the stored calendar |
| `POST expiry/v1/private?_function=trace` | An expiry calendar, `ondate`, `contract` | The contract's dates, and the steps of its expiry, delivery start and delivery end rules. For a financial expiry calendar, `contract` is a tenor (SP, ON, 3M...) and the result has `spot`, `spotRule` and `expiryRule` steps |
| `GET calendar/v1/SOURCE?_function=health&_id=A,B` | Calendar ids | A health check per calendar |
| `GET expiry/v1/SOURCE?_function=health&_id=A,B` | Expiry calendar ids | A health check per expiry calendar |
| `GET calendar/v1/private?_function=access` (or `expiry`) | | `admin`: the user is an OpenDataDSL user; `publicEdit`: the user can create, change and delete public calendars |
| `GET calendar/v1/private?_function=usage-indexes` | `force=true` to check every collection again | `indexes`: per collection, the indexes made sure of (`ok`) and any that failed. Indexes the calendar fields that [Calendar Usage Across Services](/docs/public/insights/calendar-usage-across-services#speed) searches: private collections for every user, public ones for OpenDataDSL users |
| `POST calendar/v1/private?_function=test` | A calendar that is not a holiday calendar, as for saving (`_id`, `name`, `calendar`), plus `start` and `end` (days in its time zone; default the next 7 days, at most 92, for an intraday calendar) | `valid`, `problems`, `total`, `days` (one per day: `count`, `first`, `last`, `hours`, `holiday`, `dayHours`), `intervals` (at most 3,000: `local`, `offset`, `utc`) |
| `GET calendar/v1/SOURCE/ID?_function=test` on a calendar that is not a holiday calendar | `start`, `end` | The same, for the stored calendar |

### A rule check

| Field | Description |
|-|-|
| `index` | The rule's position (from 1) |
| `rule` | The rule text |
| `valid` | Whether the rule follows the grammar and could be built |
| `kind` | `actual`, `ordinal`, `last`, `every`, `named`, `penultimate`; or `expiry`, `delivery start`, `delivery end` |
| `errors` | Each error: `column` (from 0), `length`, `message` and `expected` (the words the grammar accepts there) |
| `details` | What was understood: `name`, `validFrom`, `validTo`, `repeats`, `repeatStart`; or `periodType`, `limit`, `limitBefore` |

### A trace

| Field | Description |
|-|-|
| `contract`, `absolute` | The period code asked for and its absolute code |
| `periodStart`, `expiry`, `deliveryStart`, `deliveryEnd` | The contract's dates |
| `expiryRule`, `deliveryStartRule`, `deliveryEndRule` | Each with `rule`, `ruleNumber` and `steps`: `step` (the text of the step), `date` (after it) and `note` |
| `notes` | What is not ruled, or could not be worked out |

---

## Who can change public calendars

Public calendars and expiry calendars are saved with `POST calendar/v1/public` and `POST expiry/v1/public` (the Calendar Manager uses the source that matches the id: `public` for an id starting with `#`), and deleted with `DELETE .../public/ID`. The platform allows it for:

| User | Why |
|-|-|
| Users of the OpenDataDSL tenant | The built-in policies `ManagePublic-calendar-Built-In` and `ManagePublic-expiry-Built-In`: create, read, update and delete on the public calendar and expiry services |
| Users with the admin role | The built-in policy `ManageAllPublicData-Built-In`, which covers every public service |

Everyone else can only read public calendars: a save or delete is refused.

---

## Extension contents

| Item | Id |
|-|-|
| Extension | `odsl.calendar_manager` (preview until the functions above are released) |
| View | **Calendars**, in **Manage**, with the Insights tab |
| Feature | `odsl.calendar_manager.manage`, granted to everyone by the feature policy `extension.odsl.calendar_manager` |
| Insight reports | `odsl.calendar_manager.health`, `odsl.calendar_manager.compare`, `odsl.calendar_manager.workdays`, `odsl.calendar_manager.changes` |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| *The rules could not be checked* | The platform does not have the calendar manager functions yet (the extension is a preview), or the request failed: the message gives the reason. |
| *Choose a trading calendar to test the rules* | An expiry calendar needs its trading calendar. Pick one from the list. |
| *Trading calendar ... Not Found* | The trading or delivery calendar id does not exist. Check the spelling and the `#` of public ids. |
| *This expiry calendar has no rule for ...* | No rule covers that tenor: add a rule with no `for`, or one `for` that tenor. |
| A rule gives no holidays in the test range | Its `from` and `to` years are outside the range, or another rule gives the same date. |
| A holiday is marked *on a closed day* | It falls on a weekend. Add an `on Saturday shift` or `on Sunday shift` option if a substitute day is needed. |
| Save is not shown | The calendar is public, or another calendar with nothing to edit. Use **Save as copy** for a public calendar. |
| *... is not a financial tenor* | A financial expiry calendar only has financial tenors: SP, ON, TN, SN, SW, or a number of weeks, months or years such as 2W, 3M, 1Y. |
| A month tenor of a financial expiry calendar is **Closed in** its base calendar | Month and year tenors are moved on the trading and cross calendars only: see [Financial expiry calendars](/docs/extensions/calendar-manager/financial#how-the-dates-are-worked-out). |
| *The interval must divide a day exactly* | An intraday interval such as 7 minutes leaves part of a day over. Choose one from the list. |
| *... is not a time zone* | Use a time zone name such as `Europe/Paris`, not an abbreviation such as CET. |
| An intraday calendar has intervals on weekends | It has no holiday calendar, or its holidays setting is **Every interval of the day (off-peak)**. |
| *... is not a holiday calendar* | A monthly or weekly calendar's holiday calendar must have holiday rules, such as `#BUSINESS`, not a daily calendar. |
| *A calendar of every N weeks needs a reference date* | Give a date in one of the weeks the calendar keeps. |
| A quarterly calendar gives January, April, July and October | Periods are counted from January, so a quarterly calendar cannot start in another month. |
| *Request failed (403)* when saving | Your security policies do not allow you to update calendars, or the calendar is public and you are not an OpenDataDSL user. |
