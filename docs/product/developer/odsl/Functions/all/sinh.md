---
slug: /odsl/function/sinh
---
Returns the hyperbolic sine of a double value. The hyperbolic sine of x is defined to be (ex - e-x)/2 where e is Euler's number.

**Special cases:**
* If the argument is NaN, then the result is NaN.
* If the argument is infinite, then the result is an infinity with the same sign as the argument.
* If the argument is zero, then the result is a zero with the same sign as the argument.

The computed result must be within 1 ulp of the exact result. Results must be semi-monotonic.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
sinh(var)
```
