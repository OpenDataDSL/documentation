---
slug: /odsl/function/HourlyBlockCalendar
---
A constructor to create an hourly [calendar](/odsl/variable/calendar) for a period of the day.

This is usually used for electricity blocks, such as peak, off-peak, morning etc.

#### Syntax
```js
cal = HourlyBlockCalendar(holiday, start, end)
cal = HourlyBlockCalendar(holiday, start, end, timezone)
```

#### Examples
```js
#OP1 = HourlyBlockCalendar(DailyCalendar(), 0, 7)
#OP1.name = "Off-Peak 1"
```

Also see: [IntradayCalendar](IntradayCalendar) and [BlockCalendar](BlockCalendar)
