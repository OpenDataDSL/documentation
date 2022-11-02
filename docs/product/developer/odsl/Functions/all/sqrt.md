---
slug: /odsl/function/sqrt
---
Returns the correctly rounded positive square root of a double value. 

**Special cases:**
* If the argument is NaN or less than zero, then the result is NaN.
* If the argument is positive infinity, then the result is positive infinity.
* If the argument is positive zero or negative zero, then the result is the same as the argument.
* Otherwise, the result is the double value closest to the true mathematical square root of the argument value.

Works with:
* Scalars
* Timeseries
* Curves
* Lists/Arrays

#### Syntax
```js
sqrt(var)
```
