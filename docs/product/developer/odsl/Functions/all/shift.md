---
slug: /odsl/function/shift
---
Returns a TimeSeries that is shifted in time by the number of specified observations.

The function takes a Timeseries as the first parameter and an integer (positive or negative).

#### Syntax
```js
shift(series, number)
```

#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-11-01", 10)
input.add("2020-11-02", 12)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

prior = shift(input, -1)
print prior.values
```

```js
[
2020-10-31	10
2020-11-01	12
2020-11-02	12.900000
2020-11-03	11.500000
2020-11-04	11.900000
]
```