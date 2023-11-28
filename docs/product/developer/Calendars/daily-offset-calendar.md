---
title: Daily Offset Calendar 
sidebar_position: 2
slug: /odsl/calendar/daily-offset
tags:
- calendar
---

A daily offset calendar is a simple calendar that represents every calendar day but with a predetermined start point of the day

## Introduction

Standard daily calendars always start at 00:00:00, this calendar allows you to provide an hour of the day which represents the start time of the day.




## Creating a daily offset calendar

To create a daily offsey calendar use the OffsetDailyCalendar function as shown below:

```js
cal = OffsetDailyCalendar(timezone, dayoffset, hour)
```

## Examples

### Constructing

A UK Power calendar which starts at 23:00 on the previous day using the timezone 'Europe/London'
```js
UKPOWER = OffsetDailyCalendar("Europe/London", -1, 23)
```

A European GASDAY calendar which starts at 06:00 on the previous day using the timezone 'Europe/Paris'
```js
GASDAY = OffsetDailyCalendar("Europe/Paris", 0, 6)
```

### Scaling

Scaling a half-hourly series to average daily with the start of the day at 23:00 on the previous day

```js
UKPOWER = OffsetDailyCalendar("Europe/London", -1, 23)
e = ${data:"EPEX.GB.CONT.ID.RPDHH.HALFHOURLY:OFFPEAK_VOL"}
s = scale(e, UKPOWER, 'averaged')
print s.data
```

## Further Information
* Properties and methods on a [calendar](/docs/odsl/variable/calendar)
* [Timeseries timescaling](/docs/odsl/calendar/scaling)
