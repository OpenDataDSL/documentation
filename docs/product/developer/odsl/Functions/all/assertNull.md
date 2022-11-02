---
slug: /odsl/function/assertNull
---
A test to check if a variable is null

#### Syntax
```js
assertNull(var)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.value = 23

// obj doesn't have a property called description
assertNull(obj.description)
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails
