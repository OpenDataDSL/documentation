---
sidebar_position: 5
slug: /odsl/calendar/intraday
tags:
  - calendar
---
Intraday Calendar
=================

An intraday calendar represents all regular calendars that have time intervals of less than a whole day, e.g. Hourly

## Introduction

The intraday calendar is used for medium frequency data (between 1 second and 12 hour intervals) and has the following features:

*   Observations are stored at regular intervals between 1 seconds and 12 hours using a [Duration](/docs/odsl/variable/Duration)    
*   A [Holiday Calendar](holiday) can be applied which determines the days when observations are recorded    
*   You can exclude specific hours of the day, essentially limiting the range of intraday observations
    

## Creating an Intraday Calendar

There are 3 constructors for an Intraday Calendar:

```js
cal = IntradayCalendar(Duration)
cal = IntradayCalendar(Duration, HolidayCalendar)
cal = IntradayCalendar(Duration, HolidayCalendar, excludeHours)
```

Here are some examples of creating Intraday Calendars:

```js
// Create an hourly calendar
hourly = IntradayCalendar(1h)

// Create a 15 minutely calendar
fifteenmin = IntradayCalendar(15min)

/** 
 Create an hourly calendar using a holiday calendar and 
 exclude hours 0-6 and 20-23
**/
ukpeak = IntradayCalendar(1h, "HENG", [0,1,2,3,4,5,6,20,21,22,23])
ukpeak.name = "UK Electricity Peak Hours"
```
