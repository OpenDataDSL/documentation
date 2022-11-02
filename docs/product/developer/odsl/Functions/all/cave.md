---
slug: /odsl/function/cave
---
Returns the cumulative average of the values of a List or Timeseries

#### Syntax
```js
cave(list)
cave(timeseries)
cave(timeseries, calendar)
```

If you supply a Timeseries and a Calendar - the output will be cumulative average of the values aligned to the output calendar

#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-10-30", 10)
input.add("2020-10-31", 10)
input.add("2020-11-01", 11)
input.add("2020-11-02", 12)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)
v = cave(input)
print v.values

v = cave(input, MonthlyCalendar())
print v.values

testarray = [-1,6,0,-2]
print cave(testarray)
```

```js
[
2020-10-30	10.0
2020-10-31	10.0
2020-11-01	10.333333
2020-11-02	10.750000
2020-11-03	11.180000
2020-11-04	11.233333
2020-11-05	11.328571
]
[
2020-10-01	10
2020-11-01	11.328571
]
[
-1.0
2.500000
1.666667
0.750000
]
```