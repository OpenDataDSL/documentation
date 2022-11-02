---
slug: /odsl/function/cbrt
---
Returns the cube root of a double value. For positive finite x, cbrt(-x) == -cbrt(x); that is, the cube root of a negative value is the negative of the cube root of that value's magnitude. 

**Special cases:**

* If the argument is NaN, then the result is NaN.
* If the argument is infinite, then the result is an infinity with the same sign as the argument.
* If the argument is zero, then the result is a zero with the same sign as the argument.

The computed result must be within 1 ulp of the exact result.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
cbrt(var)
```
