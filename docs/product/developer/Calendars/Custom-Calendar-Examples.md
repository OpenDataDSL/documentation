---
sidebar_position: 9
slug: /odsl/calendar/examples
tags:
  - calendar
---
Custom Calendar Examples
========================

A set of examples that showcase the flexibility of the calendars in OpenDataDSL

## Only Weekends

This calendar is the opposite of a business calendar where only the weekends are included days

```js
// Create a weekend only calendar
WEEKEND = HolidayCalendar()
WEEKEND.name = "Weekends only"
WEEKEND.addRule("Every Monday")
WEEKEND.addRule("Every Tuesday")
WEEKEND.addRule("Every Wednesday")
WEEKEND.addRule("Every Thursday")
WEEKEND.addRule("Every Friday")
save ${calendar:WEEKEND}
```

## Half-Hourly Weekend Only

This example builds on the example above by breaking the weekend only into 1/2 hourly intervals

```js
// Create a Half Hourly, weekend only calendar
HHWEEKEND = IntradayCalendar(30m, WEEKEND)
HHWEEKEND.name = "Half-hourly calendar on weekends only" 
save ${calendar:HHWEEKEND}
```
