---
slug: /odsl/function/acos
tags:
- function
- statistics
- scalar
- curve
- timeseries
- list
---
Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi. 

**Special case:** If the argument is NaN or its absolute value is greater than 1, then the result is NaN.

The computed result must be within 1 ulp of the exact result. Results must be semi-monotonic.

Works with:
* [Scalars](/docs/odsl/variable/scalar)
* [Timeseries](/docs/odsl/variable/timeseries)
* [Curves](/docs/odsl/variable/curve)
* [Lists/Arrays](/docs/odsl/variable/list)

#### Syntax
```js
acos(var)
```
