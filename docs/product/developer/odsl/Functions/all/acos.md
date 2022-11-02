---
slug: /odsl/function/acos
---
Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi. 

**Special case:** If the argument is NaN or its absolute value is greater than 1, then the result is NaN.

The computed result must be within 1 ulp of the exact result. Results must be semi-monotonic.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
acos(var)
```
