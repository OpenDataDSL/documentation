Returns the natural logarithm of the sum of the argument and 1. Note that for small values x, the result of log1p(x) is much closer to the true result of ln(1 + x) than the floating-point evaluation of log(1.0+x).

**Special cases:**
* If the argument is NaN or less than -1, then the result is NaN.
* If the argument is positive infinity, then the result is positive infinity.
* If the argument is negative one, then the result is negative infinity.
* If the argument is zero, then the result is a zero with the same sign as the argument.

The computed result must be within 1 ulp of the exact result. Results must be semi-monotonic.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
log10(var)
```
