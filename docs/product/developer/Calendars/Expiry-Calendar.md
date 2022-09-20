---
sidebar_position: 7
slug: /odsl/calendar/expiry
tags:
  - calendar
---
Expiry Calendar
===============

An expiry calendar is used to calculate the last trading date, delivery dates and the conversion of absolute and relative futures contracts

## Introduction

The expiry calendar is used with forward curves to calculate the last trading day and the delivery period of a financially traded [contract](/docs/odsl/variable/contract). It uses expiry rules for date calculation which can be different for specific [period code](Period-Code) types.

## Expiry Rules

An expiry rule is a set of instructions in English that are used to determine a date from a period code. There are a number of pre-defined words that can be used to describe the actions to take and these are described in detail below.

Each rule starts with the word **go** and the starting point for each calculation is the start of delivery for the period code the calculation is for.

### Expiry rule syntax

The basic syntax for an expiry rule is as follows:

```js
expiry: move (move|align)* (exception THEN (move|align)*)? ("for" periodcode)? (timelimit)?

move: (moverel|moveabs)
```

### Relative movement

The syntax for a relative movement is as follows:

```js
("then") "go" ("back"|"forward") t TIME ("using calendar")

TIME: ('day'|'days'|'week'|'weeks'|'month'|'months'|'quarter'|'quarters'|'season'|'seasons'|'year'|'years')
```

An example instruction to move back 1 day from the start of delivery using the trading calendar:

```js
go back 1 day using calendar
```

### Absolute movement

The syntax for an absolute movement is as follows:

```js
("then") "go to the" ("beginning"|"end"|date suffix) "of the" ("previous"|"current"|"next")? TIME
```

An example instruction to go to the end of the previous month:

```js
go to the end of the previous month
```

### Alignment

After each movement, you can optionally align the current calculated date using the following syntax:

```js
("then")? ("align"|"align forwards")
```

An example instruction to go to the end of the previous month and then align to the trading calendar:

```js
go to the end of the previous month then align
```

### Rules for specific period codes

You can specify a period code type in the rule that will specify to use this rule specifically for those types of period codes, e.g

```js
go to the end of the previous month then align for quarters
```

### Time limited rules

You can specify that a rule is applicable after or before a certain point in time

```js
go to the end of the previous month then align for quarters after 2021-01-01
```

### Exceptions and complex rules

Sometimes, the trading rules for a calendar include some complex rules that determine when trading of a certain product ceases. These can be mostly handled using an **except** clause in the expiry rule. The except clause syntax is as follows

```js
except if (exception information) then
```

#### Proximity to a holiday date

The exception information can involve proximity to a holiday date:

```js
there is a holiday (within)? t time (before|after)
```

This checks to see if there is a holiday day either within or specifically on a number of days/weeks before or after.

e.g.

```js
... except if there is a holiday within 7 days after then ...
```

#### The week/month/quarter/season/year ends on a specific day

You can make an exception for when the period ends on a specific day:

```js
the last day of the (week|month|quarter|season|year) is a DOW
```

e.g.

```js
... except if the last day of the month is a Monday then ...
```

#### The week/month/quarter/season/year starts on a specific day

You can make an exception for when the period starts on a specific day:

```js
the first day of the (week|month|quarter|season|year) is a DOW
```

e.g.

```js
... except if the first day of the month is a Monday then ...
```

## Delivery Rules
You can override the logic for calculating the start and end of delivery for specific period codes using the delivery rule syntax:

```js
delivery (starts|ends) (on)? (at)? (the)? moveperiod (align)? (for periodcode)? (timelimit)?;

moveperiod: ("beginning"|"end"|date suffix) "of the" ("previous"|"current"|"next")? TIME
```

An example for ICE Low Sulphur Gasoil Futures where the start of delivery is always the 16th of the delivery month:
```js
delivery starts on the 16th of the current month
```

## Creating an expiry calendar

To create an expiry calendar and add your specific expiry rules to it, use the ExpiryCalendar function with a [daily](/docs/odsl/calendar/daily), [business](/docs/odsl/calendar/business) or [holiday](/docs/odsl/calendar/holiday) calendar as a parameter.

```js
eombus = ExpiryCalendar(BusinessCalendar())
eombus.addRule("go to the end of the previous month then align")
```

The example above creates an expiry calendar using a business calendar where the expiries for all period codes is the last business day of the month prior to delivery.

## Saving and re-using your calendar

Once you have created your expiry calendar, you can save it to the expiry calendar service using the save command on the [expiry service](/docs/odsl/service/expiry) as follows:

```js
save ${expiry:my_calendar}
```

Now, whenever you need to use your calendar in a script, you can simply use the active variable which will read your calendar from the expiry calendar service as follows:

```js
cal = ${expiry:"my_calendar"}
```
