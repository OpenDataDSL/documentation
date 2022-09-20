---
sidebar_position: 3
slug: /odsl/calendar/holiday
tags:
  - calendar
---
Holiday Calendar
================

A holiday or trading calendar is a [daily calendar](daily) with rules that determine which days are non-working or holiday days

## Introduction

The holiday calendar is a [daily calendar](daily) with holiday rules.

## Holiday Rules

A holiday rule is an algorithm that determines if a specific day is a holiday. There are a number of built in standard algorithms which cater for all possible holiday dates. All rules can be written in plain English following a specific syntax for each rule.

### Actual Rule

The **actual** rule defines a specific absolute day of a specific month like the 5th of May.

#### Syntax
```
DOM (OF)? MONTHNAME (named 'rule name')? (OPTION)*
```
#### Examples
```js
5th of May named 'Labour Day'
8th of may named 'VE Day' from 2020 to 2020
25th of december named 'Christmas Day' on saturday shift 3 days and on sunday shift 2 days
```
### Last Rule

The **last** rule represents the last specific named day of a specific month.

#### Syntax
```
last DOW in MONTHNAME (named 'rule name')? (OPTION)*
```
#### Examples
```js
last monday in may named 'Spring Bank Holiday'
last monday in august named 'Summer Bank Holiday'
```
### Every Rule

The **every** rule represents every named day line every Saturday

#### Syntax
```
every DOW (OPTION)*
```
#### Examples
```js
every Saturday
every Sunday
```
### Ordinal Rule

The **ordinal** rule is defined by the 1st, 2nd, 3rd or 4th specific named day of a specific month

#### Syntax
```
(FIRST|SECOND|THIRD|FOURTH) DOW IN MONTHNAME (named 'rule name')? (OPTION)*
```
#### Examples
```js
first monday in may named 'Early May' to 2019
1st of January named 'New Years Day' on saturday shift 2 days and on sunday shift 1 day
```
### Named Rule

The **named** rule represents a set of hard coded holidays such as Easter

:::note
Options are also supported on named rules
::: 

#### Syntax
```
(
Easter Sunday|
Easter Monday|
Good Friday|
Ascension Day|
Corpus Christi|
Pentecost|
Victoria Day|
Whit Monday
)
```

### Supported Options

Some of the holiday rules support options which you can use to customise or add offsets, here is a list of the supported options in those rules:

|**Option**|**Description**|**Example**|
|-|-|-|
|on Saturday shift|If the holiday falls on a Saturday, shift it by x days|on Saturday shift 2 days|
|on Sunday shift|If the holiday falls on a Sunday, shift it by x days|on Sunday shift 1 day|
|on Monday shift|If the holiday falls on a Monday, shift it by x days|on Monday shift 1 day|
|from|Specifies that the holiday is valid from the specified year|from 2012|
|to|Specifies that the holiday is valid to the specified year|to 2020|
|repeating every|The holiday normally repeats every year, but specifying this enables you to only repeat a holiday every x years|repeating every 5 years|
|starting|Along with repeating, starting states when the repeating starts|starting 2012|

## Creating a calendar with your own rules

To create a new holiday calendar, use the constructor for a holiday calendar and add your rules. An example is shown below:

```js
my_calendar = HolidayCalendar()
my_calendar.addRule("Every Saturday")
my_calendar.addRule("Every Sunday")
my_calendar.addRule("Good Friday")
my_calendar.addRule("Easter Monday")
my_calendar.addRule("First Monday in May named 'Early May'")
my_calendar.addRule("Last Monday in May named 'Spring Bank Holiday'")
my_calendar.addRule("Last Monday in August named 'Summer Bank Holiday'")
my_calendar.addRule("25th of december named 'Christmas Day' on saturday shift 3 days and on sunday shift 2 days")
my_calendar.addRule("26th of december named 'Boxing Day' on saturday shift 2 days and on sunday shift 1 day")
```

## Saving and re-using your calendar

Once you have created your holiday calendar, you can save it to the calendar service using the save command on the calendar active variable service as follows:

```js
save ${calendar:my_calendar}
```

Now, whenever you need to use your calendar in a script, you can simply use the active variable which will read your calendar from the calendar service as follows:

```js
cal = ${calendar:"my_calendar"}
```
