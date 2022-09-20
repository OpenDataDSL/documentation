A test to check if 2 variables or values are exactly equal

#### Syntax
```js
assertEquals(expected, value, optional message)
```
#### Example
```js
greeting = "Hello"
obj = Object()
obj.name = "John"
obj.value = 23

// You can directly test variables
assertEquals("Hello", greeting)

// You can test properties
assertEquals(23, obj.value)

// You can test expressions
assertEquals(23, 14 + 9)
```
If the test fails, an exception is thrown

The optional message on each function is a custom exception message that can be used if the test fails

