---
slug: /odsl/function/cmax
---
Returns the cumulative maximum of the values of a List or Timeseries

#### Syntax
```js
cmax(list)
cmax(timeseries)
cmax(timeseries, calendar)
```

If you supply a Timeseries and a Calendar - the output will be cumulative maximum of the values aligned to the output calendar

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
v = cmax(input)
print v.values

v = cmax(input, MonthlyCalendar())
print v.values

testarray = [-1,6,0,-2]
print cmax(testarray)
```

```js
[
2020-10-30	10.0
2020-10-31	10.0
2020-11-01	11.0
2020-11-02	12.0
2020-11-03	12.900000
2020-11-04	12.900000
2020-11-05	12.900000
]
[
2020-10-01	10
2020-11-01	12.900000
]
[
-1.0
6.0
6.0
6.0
]
```