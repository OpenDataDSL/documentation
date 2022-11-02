---
slug: /odsl/function/asin
tags:
- function
- statistics
- scalar
- curve
- timeseries
- list
---
Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2. 

**Special cases:**
* If the argument is NaN or its absolute value is greater than 1, then the result is NaN.
* If the argument is zero, then the result is a zero with the same sign as the argument.

Works with:
* [Scalars](/docs/odsl/variable/scalar)
* [Timeseries](/docs/odsl/variable/timeseries)
* [Curves](/docs/odsl/variable/curve)
* [Lists/Arrays](/docs/odsl/variable/list)

#### Syntax
```js
asin(var)
```
