---
slug: /odsl/function/String
---
A constructor to create a String.
This function is needed when you want to retain the fact that this is to be used as a string and not automatically converted to a number or boolean. 

#### Syntax
```js
string_var = String(text)
```
#### Example
```js
// Retain the zeros at the start
print String("001234")

// Will be converted to a number
print "001234"
```
```
001234
1234
```
