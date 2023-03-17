---
slug: /odsl/function/IntradayCalendar
---
A constructor to create an intraday [calendar](/docs/odsl/variable/calendar)

An intraday calendar is a regular calendar with a period size of less than a day, e.g. hourly

#### Syntax
```js
cal = IntradayCalendar(duration)
cal = IntradayCalendar(duration, holiday)
cal = IntradayCalendar(duration, holiday, withouthours)
cal = IntradayCalendar(duration, holiday, withouthours, timezone)
cal = IntradayCalendar(duration, holiday, withouthours, timezone, useHolidays)
```

#### Examples
```js
// Create an hourly calendar
hourly = IntradayCalendar(1h)

// Create a half-hourly calendar
hh = IntradayCalendar(30m)

// Create an hourly calendar from 07:00 to 19:00 inclusive
peak = IntradayCalendar(1h, hcal, [0,1,2,3,4,5,6,20,21,22,23])

// Using a timezone
#NERC = ${calendar:"#NERC"}
PJMPEAK = IntradayCalendar(1h, #NERC, [0,1,2,3,4,5,22,23], "US/Central")

// Using a timezone and marking holiday days as full day
PJMOFFPEAK = IntradayCalendar(1h, #NERC, [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], "US/Central", true)
```

Also see: [BlockCalendar](BlockCalendar) and [HourlyBlockCalendar](HourlyBlockCalendar)
