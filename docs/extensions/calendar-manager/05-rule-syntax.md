---
title: Rule syntax
description: Every kind of plain English holiday rule and expiry or delivery rule the platform understands, with examples, and the grammars behind them
slug: /extensions/calendar-manager/rule-syntax
sidebar_position: 5
tags: [extension, calendar manager, rules, syntax, grammar, holidays, expiry]
---

# Rule syntax

Calendar rules are plain English, but they follow a grammar: an ANTLR 4 grammar for holiday rules (`HolidayRule.g4`) and one for expiry and delivery rules (`ExpiryRule.g4`). The **Syntax guide** tab of the Calendar Manager has this page's tables, examples you can add to the open calendar, and both grammars.

![The Syntax guide tab with holiday rules on the left and expiry rules on the right](/img/extensions/calendar-manager/syntax-guide.png)

Write one rule a line. Grammar words are in small letters; month and day names can start with a capital or a small letter.

---

## Holiday rules

| Kind | Form | Example |
|-|-|-|
| Fixed date (actual) | DAY with st, nd, rd or th, `of` MONTH | `25th of December named 'Christmas Day'` |
| Nth weekday (ordinal) | `First`, `Second`, `Third` or `Fourth` WEEKDAY `in` MONTH | `First Monday in May named 'Early May Bank Holiday'` |
| Last weekday | `Last` WEEKDAY `in` MONTH | `Last Monday in August named 'Summer Bank Holiday'` |
| Last but one weekday | `Penultimate` WEEKDAY `in` MONTH | `Penultimate Friday in November named 'Staff day'` |
| Weekly closure | `Every` WEEKDAY | `Every Saturday` |
| Easter and related (named) | `Easter Sunday`, `Easter Monday`, `Good Friday`, `Maundy Thursday`, `Ascension Day`, `Pentecost`, `Whit Monday`, `Corpus Christi`, `Victoria Day` | `Good Friday` |

A fixed date, nth, last or penultimate rule can have a name: `named` and the name in single quotes. The name ends at the next single quote, so write an apostrophe as a typographic apostrophe (U+2019).

### Options

Add options after the rule, separated by spaces or `and`.

| Option | Meaning | Example |
|-|-|-|
| `on Saturday shift` N `days` | When it falls on a Saturday, move it N days (also Sunday, Monday, Tuesday, Wednesday, Thursday, Friday) | `on Saturday shift 2 days and on Sunday shift 1 day` |
| `shift` N `days` | Always move it, for example a day a fixed number of days from Easter | `Easter Sunday shift 49 days` |
| `from` YEAR | Only from this year | `from 2027` |
| `to` YEAR | Only up to this year. A one-off holiday is from and to the same year. | `8th of May named 'VE Day 75' from 2020 to 2020` |
| `repeating every` N `years` | Only every N years | `repeating every 4 years starting 2024` |
| `starting` YEAR | The first year of a repeating holiday | |

---

## Expiry and delivery rules

An expiry rule starts at the first day of the contract's period and moves to the last trading day, one step at a time, with `then` between steps. A delivery rule says when delivery starts or ends.

```
STEP then STEP ... (except if | unless CONDITION then STEP ...) (for TENOR) (before | after yyyy-mm-dd)
delivery starts | ends on the PLACE then STEP ... (for TENOR)
```

### Steps

| Step | Meaning | Example |
|-|-|-|
| `go to the` PLACE `of the` previous, current or next PERIOD | PLACE is `beginning`, `end`, a day such as `15th`, `last` WEEKDAY, `penultimate` WEEKDAY or `last trading day`. Add `using calendar` to move back to a business day. | `go to the end of the previous month` |
| `go back` or `go forward` N PERIODS | Move by N periods. With `days using calendar`, N business days of the trading calendar. From a date that is not a business day, the count starts from the business day before it (after it, going forward); add `without aligning` to count from the date itself. | `go back 2 days using calendar without aligning` |
| `align` | Move back to the nearest business day; `align forwards` moves forward | `go to the 15th of the previous month then align` |

PERIOD is one of `day`, `calendar day`, `week`, `weekend`, `month`, `quarter`, `season`, `halfyear`, `year`, `hour`, `half hour`, `quarter hour`, `first halfmonth`, `second halfmonth`, with an `s` for more than one.

:::tip
Write *days* in the plural with *using calendar* to count business days, even for one day: `go back 1 days using calendar`. With the singular, the date moves one calendar day and is then aligned, which is not always the same.
:::

:::caution
Mind where the count starts. For the TTF rule *two business days before the first day of the delivery month*, `go to the beginning of the current month then go back 2 days using calendar` gives 23 December 2026 for the January 2027 contract when 1 January, 31 December and 28 December are closed: it first moves back to the business day before 1 January (30 December) and counts from there. `... go back 2 days using calendar without aligning` counts from 1 January itself and gives 29 December. The [trace](/docs/extensions/calendar-manager/testing#trace-a-contract) shows which one a rule does.
:::

### Exceptions

| Condition | True when | Example |
|-|-|-|
| `there is a holiday within` N `days before` or `after` | A holiday is within N days of the date reached | `except if there is a holiday within 1 days after then go back 1 days using calendar` |
| `there is a non-business day within` N `days before` or `after` | Any non-business day is within N days | |
| `the last day of the` PERIOD `is a` WEEKDAY | Also `the first day of the` | `unless the last day of the month is a Saturday then ...` |
| `the month is` N | The contract's month (1 to 12) | `unless the month is 12 then go back 5 days using calendar` |

`except if` carries on from the date reached and adds the steps after `then`. `unless` goes back to the start of the contract and uses the steps after `then` instead.

### Tenors and time limits

| Ending | Meaning |
|-|-|
| `for months` | The rule is for month contracts only. Also `for days`, `for weekends`, `for weeks`, `for quarters`, `for seasons`, `for halfyears`, `for years`, `for balance` and `for all`. A rule with no `for` is for every tenor. |
| `before 2026-01-01` | Only for contracts that start before this date |
| `after 2025-12-31` | Only for contracts that start after this date |

A pair of rules with `before` and `after` the same date lets a calendar follow a market that changed its expiry rule.

:::note
There is no `for hours`. Hour, half hour and quarter hour contracts use the rules with no `for`. The grammar accepts `for hours`, but the platform reads it as every tenor, so the rule details under it show *applies to all tenors*. Give an intraday calendar a rule with no `for`, such as `go back 1 hours`, and put `for months` and so on on the rules of the longer tenors.
:::

### Examples

| Rule | What it gives |
|-|-|
| `go to the beginning of the current month then go back 2 days using calendar without aligning for months` | Two business days before delivery starts, counted from the 1st (TTF month contracts) |
| `go to the end of the previous month then go back 1 days using calendar` | One business day before the end of the month before delivery |
| `go to the last Friday of the previous month then align` | The last Friday of the month before, or the business day before it |
| `go to the end of the previous quarter then go back 2 days using calendar for quarters` | Quarter contracts |
| `go back 1 hours` | Hour contracts: an hour before delivery starts. Also `go back 2 half hours`, `go back 3 quarter hours`. |
| `go back 1 days using calendar for days` | Day contracts: the business day before |
| `delivery starts on the 1st of the current month` | Delivery starts on the first of the month |
| `delivery ends on the last trading day of the current month` | Delivery ends on the contract's expiry |

---

## The grammars

The grammars are part of the platform's calendar module (`odsl-calendar`, in `src/main/resources`). The Syntax guide tab shows the version the extension was published with, under **The holiday rule grammar** and **The expiry rule grammar**.
