---
slug: /odsl/function/abs
tags:
- function
- statistics
- scalar
- curve
- timeseries
- list
---
Transforms all values of the input variable to absolute (positive) values.

Works with:
* [Scalars](/docs/odsl/variable/scalar)
* [Timeseries](/docs/odsl/variable/timeseries)
* [Curves](/docs/odsl/variable/curve)
* [Lists/Arrays](/docs/odsl/variable/list)

#### Syntax
```js
abs(var)
```
#### Examples

##### Timeseries
```js
at = TimeSeries("DAILY")
at.add("2020-11-01", 12.5)
at.add("2020-11-02", -12.75)
at.add("2020-11-03", 12.9)
at.add("2020-11-04", -11.5)
at.add("2020-11-05", 11.9)
absat = abs(at)
print absat.values
```

```json
[
  {"2020-11-01": 12.5},
  {"2020-11-02": 12.75},
  {"2020-11-03": 12.9},
  {"2020-11-04": 11.5},
  {"2020-11-05": 11.9}
]
```

##### List
```js
testarray = [-1,6,0,-2]
print abs(testarray)
```

##### Curve
```js
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")
ondate = CurveDate(Date("2020-12-01"), expiry)
c1 = Curve(ondate)
c1.add(Contract(ondate, "2021M01", 12.5))
c1.add(Contract(ondate, "2021M02", -12.75))
c1.add(Contract(ondate, "2021M03", 13.0))
print abs(c1)
```

##### Scalar
```js
print abs(-2)
```

```js
2
```
