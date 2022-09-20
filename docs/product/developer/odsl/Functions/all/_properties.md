Returns an array of Objects that gives information about the properties on a variable.

The object contains 3 fields:

*   name - the name of the property    
*   description - description of the property if available    
*   type - the type of the property as returned by the **typeOf** function
    

#### Syntax
```js
properties(Any Var)
```
#### Example
```js
d = Date()
print properties(d)
```
```json
[
{
  "description": "Get the year",
  "name": "year",
  "type": "Scalar"
}
{
  "description": "Get the hour of the day from 0 to 23",
  "name": "hour",
  "type": "Scalar"
}
...
]
```
