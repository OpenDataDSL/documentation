---
slug: /odsl/function/BlockCalendar
---
A constructor to create a [calendar](/docs/odsl/variable/calendar) for a period of the day.

This is usually used for electricity blocks, such as peak, off-peak, morning etc.

#### Syntax
```js
cal = BlockCalendar(holiday, observed, start, end)
cal = BlockCalendar(holiday, observed, start, end, timezone)
```

#### Examples
```js
qh = IntradayCalendar("15m")
bc = BlockCalendar(null, qh, 4, 5)
```

Also see: [IntradayCalendar](IntradayCalendar) and [HourlyBlockCalendar](HourlyBlockCalendar)
