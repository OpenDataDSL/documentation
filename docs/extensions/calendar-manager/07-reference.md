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
| Holiday and other calendars | `calendar` | `private`, `public` | Versioned. A holiday calendar keeps its rules in `calendar.rules`, each with its plain English text in `code`. |
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

---

## The calendar manager functions

| Request | Body or parameters | Returns |
|-|-|-|
| `POST calendar/v1/private?_function=validate` | `_id` (any), `rules` | `rules`: a check per rule; `valid` |
| `POST expiry/v1/private?_function=validate` | `_id` (any), `rules` | The same, for expiry rules |
| `POST calendar/v1/private?_function=test` | A holiday calendar as for saving, plus `start`, `end` (default this year and next) and `check` (dates) | `rules` (checks with `count`, and `weekly` for weekly closures), `holidays`, `months`, `years`, `checks` |
| `GET calendar/v1/SOURCE/ID?_function=test` | `start`, `end` | The same, for a stored calendar |
| `POST expiry/v1/private?_function=test` | An expiry calendar as for saving, plus `ondate`, `tenors` (default Month), `start`, `end` | `rules` (checks with `count`), `rows` (one per contract) |
| `GET expiry/v1/SOURCE/ID?_function=test` | `ondate`, `tenor` (comma separated), `start`, `end` | The same, for a stored calendar (including financial calendars) |
| `POST expiry/v1/private?_function=trace` | An expiry calendar, `ondate`, `contract` | The contract's dates, and the steps of its expiry, delivery start and delivery end rules |
| `GET calendar/v1/SOURCE?_function=health&_id=A,B` | Calendar ids | A health check per calendar |
| `GET expiry/v1/SOURCE?_function=health&_id=A,B` | Expiry calendar ids | A health check per expiry calendar |

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
| Save is not shown | The calendar is public, financial or has no rules. Use **Save as copy** for a public calendar. |
| *Request failed (403)* when saving | Your security policies do not allow you to update calendars. |
