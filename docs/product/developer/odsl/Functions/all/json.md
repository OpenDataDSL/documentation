---
slug: /odsl/function/json
---
Converts the input variable of any type to a JSON formatted string

#### Syntax
```js
string = json(var)
```
#### Example
```js
obj = Object()
obj.name = "John"
obj.age = 43

print json(obj)
```
Displays
```json
> {
  "_id": "obj",
  "age": "43",
  "name": "John"
}
```
