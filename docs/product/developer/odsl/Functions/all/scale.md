---
slug: /odsl/function/scale
---
Rescales a TimeSeries to a different calendar

#### Syntax
```js
ts = scale(input, calendar)
ts = scale(input, calendar, observed)
ts = scale(input, calendar, observed, distribution)
```

##### Observed
Observed relates to the way the value is recorded and can be one of the following:
* beginning
* end
* averaged
* summed
* high
* low
* delta
* none

##### Distribution
Distribution relates to the way a value is distributed across observations when you are scaling from lower to a higher frequency calendar and can be one of the following:
* constant
* linear
* cubic 

:::info
For more information and examples of scaling TimeSeries, see [here](/docs/odsl/calendar/scaling)
:::

#### Example
```js
// Daily to Weekly
tsd = TimeSeries("2021-10-01", "DAILY", [12.5,13,14,15.5,14.2])
tsw = scale(tsd, WeeklyCalendar("Friday"))
print tsw.values
```
```
[
2021-09-24	12.500000
2021-10-01	14.200000
]
```
