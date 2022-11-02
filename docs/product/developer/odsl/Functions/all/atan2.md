---
slug: /odsl/function/atan2
---
Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta). This method computes the phase theta by computing an arc tangent of y/x in the range of -pi to pi.

**Special cases:**
* If either argument is NaN, then the result is NaN.
* If the first argument is positive zero and the second argument is positive, or the first argument is positive and finite and the second argument is positive infinity, then the result is positive zero.
* If the first argument is negative zero and the second argument is positive, or the first argument is negative and finite and the second argument is positive infinity, then the result is negative zero.
* If the first argument is positive zero and the second argument is negative, or the first argument is positive and finite and the second argument is negative infinity, then the result is the double value closest to pi.
* If the first argument is negative zero and the second argument is negative, or the first argument is negative and finite and the second argument is negative infinity, then the result is the double value closest to -pi.
* If the first argument is positive and the second argument is positive zero or negative zero, or the first argument is positive infinity and the second argument is finite, then the result is the double value closest to pi/2.
* If the first argument is negative and the second argument is positive zero or negative zero, or the first argument is negative infinity and the second argument is finite, then the result is the double value closest to -pi/2.
* If both arguments are positive infinity, then the result is the double value closest to pi/4.
* If the first argument is positive infinity and the second argument is negative infinity, then the result is the double value closest to 3*pi/4.
* If the first argument is negative infinity and the second argument is positive infinity, then the result is the double value closest to -pi/4.
* If both arguments are negative infinity, then the result is the double value closest to -3*pi/4.

The computed result must be within 2 ulps of the exact result. Results must be semi-monotonic.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
atan2(ordinate, abscissa)
```
