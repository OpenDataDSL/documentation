---
slug: /odsl/function/methods
---
Returns an array of Objects that gives information about the methods of a variable.

#### Description

The object contains 4 fields:

*   name - the name of the method    
*   description - description of the method if available
*   returns - the return type of the method as returned by the **typeOf** function
*   syntax - The syntax of the method including all the parameters
    

#### Syntax
```js
methods(Any Var)
```
#### Example
```js
d = Date()
print methods(d)
```
```json
[
{
  "description": "Returns a new Date as the next calendar day after this one",
  "name": "next",
  "returns": "Date",
  "syntax": "next()"
}
{
  "description": "Returns a new Date as the previous calendar day before this one",
  "name": "previous",
  "returns": "Date",
  "syntax": "previous()"
}
{
  "description": "Returns true if this date is a holiday using the supplied calendar",
  "name": "isHoliday",
  "returns": "Scalar",
  "syntax": "isHoliday(Calendar \[Calendar or Scalar\] The calendar to calculate the holiday)"
}
]
```
