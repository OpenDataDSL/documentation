---
slug: /odsl/function/abs
---
Transforms all values of the input variable to absolute (positive) values.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
abs(var)
```
#### Example
```js
// Timeseries
at = TimeSeries("DAILY")
at.add("2020-11-01", 12.5)
at.add("2020-11-02", -12.75)
at.add("2020-11-03", 12.9)
at.add("2020-11-04", -11.5)
at.add("2020-11-05", 11.9)
print abs(at)

// List
testarray = [-1,6,0,-2]
print abs(testarray)

// Curve
expiry = ExpiryCalendar(BusinessCalendar())
expiry.addRule("go back 1 day using calendar")
ondate = CurveDate(Date("2020-12-01"), expiry)
c1 = Curve(ondate)
c1.add(Contract(ondate, "2021M01", 12.5))
c1.add(Contract(ondate, "2021M02", -12.75))
c1.add(Contract(ondate, "2021M03", 13.0))
print abs(c1)

// Scalar
print abs(-2)
```
