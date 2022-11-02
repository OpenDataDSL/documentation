---
slug: /odsl/function/assertTrue
---
Tests to see if a value or expression is true

#### Syntax
```js
assertTrue(var, optional message)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.value = 23

// You can test a variable or variable property
b = obj.value < 25
obj.test = b
assertTrue(b)
assertTrue(obj.test)

// You can test an expression
assertTrue(12<13)
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails

