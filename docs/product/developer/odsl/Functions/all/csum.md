---
slug: /odsl/function/csum
---
Returns the cumulative sum of the values of a List or Timeseries

#### Syntax
```js
csum(list)
csum(timeseries)
csum(timeseries, calendar)
```

If you supply a Timeseries and a Calendar - the output will be cumulative sums of the values aligned to the output calendar

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
sum = csum(input)
print sum.values

sum = csum(input, MonthlyCalendar())
print sum.values

testarray = [-1,6,0,-2]
print csum(testarray)
```

```js
[
2020-10-30	10.0
2020-10-31	20.0
2020-11-01	31.0
2020-11-02	43.0
2020-11-03	55.900000
2020-11-04	67.400000
2020-11-05	79.300000
]
[
2020-10-01	20
2020-11-01	79.300000
]
[
-1.0
5.0
5.0
3.0
]
```