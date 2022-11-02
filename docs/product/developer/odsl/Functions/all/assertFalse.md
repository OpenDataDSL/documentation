---
slug: /odsl/function/assertFalse
---

A test to check if an expression is false (not true)

#### Syntax
```js
assertFalse(expression, optional message)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.value = 23

// You can test a variable or variable property
b = obj.value > 25
obj.test = b
assertFalse(b)
assertFalse(obj.test)

// You can test an expression
assertFalse(12>13)
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails
