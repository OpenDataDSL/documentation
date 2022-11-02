---
slug: /odsl/function/variables
---
Returns an array of Objects that gives information about all the variables in the current session.

The object contains 3 fields:

*   name - the name of the variable    
*   scope - the scope of the variable, **Global** being the main scope    
*   type - the type of the variable as returned by the **typeOf** function

#### Syntax
```js
variables()
```
#### Example
```js
a = "Hello"
d = Date()
print variables()
```
```json
[
{
  "name": "a",
  "scope": "Global",
  "type": "Scalar"
}
{
  "name": "d",
  "scope": "Global",
  "type": "Date"
}
{
  "name": "PROCESS",
  "scope": "Global",
  "type": "Process"
}
]
```
