---
slug: /odsl/variable/scalar
tags:
  - scalar
---
Scalar
======================

A scalar is a single value of either string, boolean (true/false) or numeric

## Construction

You construct a scalar variable by assigning a value to it, e.g.
```js
// Constructing a string scalar
a = "String"

// Constructing a boolean scalar
b = true

// Constructing a numeric (integer) scalar
c = 10

// Constructing a numeric (decimal) scalar
d = 3.14
```
:::note
Numeric values always obey the currently configured precision settings which default to 6 decimal places and half_up rounding
:::
