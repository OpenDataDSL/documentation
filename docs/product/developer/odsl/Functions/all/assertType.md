---
slug: /odsl/function/assertType
---
A test to check if a variable is of a certain type

#### Syntax
```js
assertType(var, type)
```
### Example
```js
greeting = "Hello"
obj = Object()
obj.name = "John"
obj.value = 23

// You can test scalars
assertType(greeting, "Scalar")

// You can test objects
assertType(obj, "Object")

// You can test object properties
assertType(obj.name, "Scalar")

// You can test custom types
example = type
    name as String()
end
eobj = object as example
    name = "John"
end
assertType(eobj, "example")
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails
