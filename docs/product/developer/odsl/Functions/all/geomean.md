---
slug: /odsl/function/geomean
---
Returns the geometric average value from a list of values.

Geometric mean, sometimes referred to as compounded annual growth rate or time-weighted rate of return, is the average rate of return of a set of values calculated using the products of the terms.

Geometric mean is an important tool for calculating portfolio performance for many reasons, but one of the most significant is it takes into account the effects of compounding.
#### Syntax
var = geomean(List or TimeSeries)
#### Result
A number representing the geometric average value from the input List or TimeSeries
#### Example
```js
data = [1,2,3]
print geomean(data)
```
```
1.817121
```
