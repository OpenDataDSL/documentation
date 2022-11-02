---
slug: /odsl/function/diff
---
Returns a TimeSeries with the absolute change values from one observation to the next.

#### Syntax
```js
diff(var)
```
#### Example
```js
input = TimeSeries("DAILY")
input.add("2020-11-01", 12.5)
input.add("2020-11-02", 12.75)
input.add("2020-11-03", 12.9)
input.add("2020-11-04", 11.5)
input.add("2020-11-05", 11.9)

d = diff(input)
print d.values
```

```js
[
2020-11-02	0.250000
2020-11-03	0.150000
2020-11-04	-1.400000
2020-11-05	0.400000
]
```
