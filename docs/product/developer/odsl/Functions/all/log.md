---
slug: /odsl/function/log
---
Returns the natural logarithm (base e) of a double value. 

**Special cases:**
* If the argument is NaN or less than zero, then the result is NaN.
* If the argument is positive infinity, then the result is positive infinity.
* If the argument is positive zero or negative zero, then the result is negative infinity.

The computed result must be within 1 ulp of the exact result. Results must be semi-monotonic.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
log(var)
```
