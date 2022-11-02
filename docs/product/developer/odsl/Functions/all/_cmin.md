Returns the cumulative minimum of the values of a List or Timeseries

#### Syntax
```js
cmin(list)
cmin(timeseries)
cmin(timeseries, calendar)
```

If you supply a Timeseries and a Calendar - the output will be cumulative minimum of the values aligned to the output calendar

#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-10-30", 10)
input.add("2020-10-31", 10)
input.add("2020-11-01", 11)
input.add("2020-11-02", 9.9)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)
v = cmin(input)
print v.values

v = cmin(input, MonthlyCalendar())
print v.values

testarray = [-1,6,0,-2]
print cmin(testarray)
```

```js
[
2020-10-30	10.0
2020-10-31	10.0
2020-11-01	10.0
2020-11-02	9.900000
2020-11-03	9.900000
2020-11-04	9.900000
2020-11-05	9.900000
]
[
2020-10-01	10
2020-11-01	9.900000
]
[
-1.0
-1.0
-1.0
-2.0
]
```