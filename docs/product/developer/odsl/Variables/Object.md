---
slug: /odsl/variable/object
tags:
  - object
---
Object
======================

An object is a very versatile variable type that allows you to add any other variables to it including Object variable types. This creates a dynamic JSON type structure

## Construction

You can construct an object using a constructor function.
```js
// Create a new empty object
obj = Object()
```

## Properties

All properties on an object are dynamic, which means you can add any properties you like, e.g.

```js
// Create a new empty object
obj = Object()
obj.name = "ODSL"
obj.weight = 264.5
obj.start = Date("2020-10-08")
obj.children = List()
obj.children.addAll(["O","D","S","L"])
obj.address = Object()
obj.address.city = "London"
print json(obj)
```

This produces the following JSON output:
```json
{
  "_id": "obj",
  "address": {
    "_id": "address",
    "city": "London"
  },
  "children": [
    "O",
    "D",
    "S",
    "L"
  ],
  "name": "ODSL",
  "start": {
    "_id": "start",
    "value": "2020-10-08T00:00:00",
    "_type": "VarDate"
  },
  "weight": "264.5"
}
```
