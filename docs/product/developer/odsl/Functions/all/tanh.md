---
slug: /odsl/function/tanh
---
Returns the hyperbolic tangent of a double value. The hyperbolic tangent of x is defined to be (ex - e-x)/(ex + e-x), in other words, sinh(x)/cosh(x). Note that the absolute value of the exact tanh is always less than 1.

**Special cases:**
* If the argument is NaN, then the result is NaN.
* If the argument is zero, then the result is a zero with the same sign as the argument.
* If the argument is positive infinity, then the result is +1.0.
* If the argument is negative infinity, then the result is -1.0.

The computed result must be within 2.5 ulps of the exact result. The result of tanh for any finite input must have an absolute value less than or equal to 1. Note that once the exact result of tanh is within 1/2 of an ulp of the limit value of ±1, correctly signed ±1.0 should be returned.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
tanh(var)
```
