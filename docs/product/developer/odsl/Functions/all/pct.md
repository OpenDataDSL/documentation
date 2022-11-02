---
slug: /odsl/function/pct
---
Returns a TimeSeries with the percentage change values from one observation to the next.

#### Syntax
```js
pct(var)
```
#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-11-01", 10)
input.add("2020-11-02", 12)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

d = pct(input)
print d.values
```

```js
[
2020-11-02	0.200000
2020-11-03	0.075000
2020-11-04	-0.108527
2020-11-05	0.034783
]
```
