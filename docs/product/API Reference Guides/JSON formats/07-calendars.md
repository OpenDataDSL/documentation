---
title: Calendars
description: The JSON of calendars, holiday calendars and expiry calendars
slug: /api/json/calendars
sidebar_position: 7
tags:
  - api
  - json
  - calendar
---

# Calendars

Calendars say which dates or times a timeseries has a value for (daily, business days, hourly and so on), which days are holidays, and when futures contracts expire.

---

## Calendar

Service: [Calendar](/docs/api/rest/service/calendar) (`calendar/v1/{source}`), versioned. A calendar is a wrapper with the definition in `calendar`.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The calendar code. Public calendars start with `#` |
| `_type` | String | Yes | `VarCalendar` |
| `name` | String | No | The name of the calendar |
| `calendar` | Object | Yes | The definition, see below |

The definition always has these fields:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_type` | String | The kind of calendar, for example `DailyCalendar`, `BusinessCalendar`, `HolidayCalendar`, `MonthlyCalendar`, `IntradayCalendar`, `SparseCalendar` |
| `_id` | String | The calendar code |
| `_name` | String | The name |
| `intraday` | Boolean | Output: true if the calendar has more than one value a day |

The other fields depend on the kind. See [Calendars](/docs/odsl/calendar/calendars) for the kinds and their settings, for example `period`, `holidayCalendarCode` and `timezoneCode` for an intraday calendar.

---

## Holiday calendar

A holiday calendar is a calendar whose definition has `_type` `HolidayCalendar` and a list of rules. Each rule names the holiday and says when it falls.

| **Field** | **Type** | **What it is** |
|-|-|-|
| `rule` | String | Always `HolidayCalendar` |
| `rules` | Array | The holiday rules |

### Holiday rules

Every rule has `rule` (the kind of rule), `name` and an optional `code` and `options`.

| **`rule`** | **Fields** | **What it means** |
|-|-|-|
| `Actual` | `dom`, `month`, and optionally `todom`, `tomonth` | The same date (or dates) every year, for example 25 December |
| `Every` | `day` | Every week on a day, for example `SATURDAY` |
| `Ordinal` | `ordinal`, `day`, `month` | The nth day of a month, for example the first `MONDAY` in May |
| `Last` | `day`, `month` | The last day of a month, for example the last `MONDAY` in May |
| `Penultimate` | `day`, `month` | The second last day of a month |
| `GoodFriday`, `EasterSunday`, `EasterMonday`, `MaundyThursday`, `AscensionDay`, `Pentecost`, `WhitMonday`, `CorpusChristi`, `VictoriaDay` | none | Named holidays, see [Holiday calendar](/docs/odsl/calendar/holiday) |

`options` change when a rule applies:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `shift` | Integer | Days to move the holiday |
| `shiftOnSaturday` ... `shiftOnFriday` | Integer | Days to move the holiday when it falls on that day, for example 2 on Saturday to move it to Monday |
| `validFromYear`, `validToYear` | Integer | The years the rule applies to, default 0 and 9999 |
| `repeats`, `repeatStartYear` | Integer | The rule applies every `repeats` years from `repeatStartYear` |

```json
{
  "_id": "NGE_HOLIDAYS",
  "_type": "VarCalendar",
  "name": "Northgate office holidays",
  "calendar": {
    "_type": "HolidayCalendar",
    "_id": "NGE_HOLIDAYS",
    "_name": "Northgate office holidays",
    "rule": "HolidayCalendar",
    "rules": [
      {"rule": "Every", "name": "Saturday", "day": "SATURDAY"},
      {"rule": "Every", "name": "Sunday", "day": "SUNDAY"},
      {"rule": "Actual", "name": "Christmas Day", "dom": 25, "month": 12, "options": {"shiftOnSaturday": 2, "shiftOnSunday": 2}},
      {"rule": "Actual", "name": "Boxing Day", "dom": 26, "month": 12, "options": {"shiftOnSaturday": 2, "shiftOnSunday": 2}},
      {"rule": "GoodFriday", "name": "Good Friday"},
      {"rule": "Ordinal", "name": "Early May bank holiday", "ordinal": 1, "day": "MONDAY", "month": 5}
    ]
  }
}
```

When you read a holiday calendar, every option is written, with its default value where you did not set it.

:::tip
When you save a holiday calendar, you can give `rules` as a list of rule strings in ODSL syntax, and they are turned into rule objects for you.
:::

---

## Expiry calendar

An expiry calendar works out when contracts stop trading, from rules for each kind of contract. Service: [Expiry calendar](/docs/api/rest/service/expiry) (`expiry/v1/{source}`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The expiry calendar code, for example `#REOMHENG` |
| `_type` | String | Yes | `VarExpiryCalendar` |
| `name` | String | No | The name |
| `calendar` | Object | Yes | The definition, see below |

The definition:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_type` | String | `ExpiryCalendar`, or `FinancialExpiryCalendar` for currency forwards |
| `_id` | String | The code |
| `name` | String | The name |
| `tradingCalendarCode` | String | The [calendar](#calendar) of trading days |
| `deliveryCalendarCode` | String | Optional: the calendar of delivery days |
| `rules` | Object | The rules, in `map`: for each kind of contract (`ALL`, `Day`, `Week`, `Month`, `Quarter`, `Season`, `Year` and so on) a list of rules |

Each rule in the list:

| **Field** | **Type** | **What it is** |
|-|-|-|
| `rule` | Object | The rule: `rule` is `GrammarExpiryRule` and `code` is the rule in words, see [Expiry calendar](/docs/odsl/calendar/expiry) |
| `date` | Date | Optional: the date the rule starts or stops applying |
| `before` | Boolean | With `date`: true if the rule applies before the date, false if after it |

```json
{
  "_id": "NGE_EOM",
  "_type": "VarExpiryCalendar",
  "name": "Northgate end of previous month",
  "calendar": {
    "_type": "ExpiryCalendar",
    "_id": "NGE_EOM",
    "name": "Northgate end of previous month",
    "tradingCalendarCode": "#HENG",
    "rules": {
      "map": {
        "ALL": [
          {"before": false, "rule": {"rule": "GrammarExpiryRule", "code": "go to the end of the previous month"}}
        ]
      }
    }
  }
}
```

A financial expiry calendar has `tradingCalendarCode`, `crossCode` and `baseCode` (the holiday calendars of the two currencies) and `offset` (the settlement days) instead of rules.
