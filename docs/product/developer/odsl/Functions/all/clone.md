---
slug: /odsl/function/clone
---
Creates a new exact copy of another variable

#### Syntax
```js
var = clone(other)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.value = 23

// Clone the obj variable
clone = clone(obj)

// Check to see that it is exactly the same
assertEquals("John", clone.name)
assertEquals(23, clone.value)

// Note - this will fail as they are not the same object
assertEquals(obj, clone)
```
