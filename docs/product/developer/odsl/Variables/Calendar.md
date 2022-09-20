---
slug: /odsl/variable/calendar
tags:
  - calendar
---
Calendar
========

A calendar variable type represents an [ODSL Calendar](/docs/odsl/calendar/calendars). It is used with [timeseries](TimeSeries), curves and other time-bound resources. See [here](/docs/odsl/calendar/calendars) for more detailed information on ODSL Calendars

## Introduction

The calendar variable wraps a standard [ODSL calendar](/docs/odsl/calendar/Calendars) and allows you to use the calendar in your scripts.

## Construction

Calendars are usually read from the [Calendar Service](/docs/odsl/service/calendar) and referenced using their code, e.g. “business”, but some basic calendars can be constructed as follows:
```js
// Create a daily calendar
daily = DailyCalendar()

// Create a business (Monday to Friday) calendar
business = BusinessCalendar()

// Create an empty holiday calendar
holiday = HolidayCalendar()

// Create a monthly calendar
monthly = MonthlyCalendar()

// Create an hourly calendar
hourly = IntradayCalendar(1h)

/** 
 Create an hourly calendar using a holiday calendar and 
 exclude hours 0-6 and 20-23
**/
peak = IntradayCalendar(1h, holiday, [0,1,2,3,4,5,6,20,21,22,23])
```

## Properties

A calendar has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|code|The code of the underlying ODSL Calendar|Scalar(String)|
|name|The name of the underlying ODSL Calendar|Scalar(String)|

## Methods

A calendar has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|getDates(start, end)|Gets a list of dates from this calendar for the supplied date range|List(Date)|
|getDates(start, number)|Gets number + 1 list of dates from the supplied start date|List(Date)|
|includes(Date)|Tests to see if the supplied date aligns with this calendar|Scalar(Boolean)|
|next(Date)|Gets the next date after the supplied date|Date|
|previous(Date)|Gets the previous date before the supplied date|Date|
|addRule(String)|Adds a holiday rule (Only applicable for holiday calendars)|void|

### Some example usage

```js
// Create a daily calendar
daily = DailyCalendar()

first = Date("2020-10-01")
last = Date("2020-10-31")

print daily.next(first)

// Create an empty holiday calendar
holiday = HolidayCalendar()

// Add some rules
holiday.addRule("Every Saturday")
holiday.addRule("Every Sunday")
holiday.addRule("First Tuesday in October")

// Get the list of dates for October 2020
dates = holiday.getDates(first, last)

print dates
```
