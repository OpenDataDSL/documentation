A test to check if a variable has the specified named property

#### Syntax
```js
assertHasProperty(var, property)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.value = 23

assertHasProperty(obj, "name")
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails
