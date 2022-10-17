---
slug: /odsl/stages/documents
---
## Definition
The ```documents``` stage returns literal documents from input values.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/documents/)

:::note
Only available for MongoDB 5.1 or later
:::

## Syntax
```documents``` has the following form:

```js
documents arrayExpression
```

## Behaviour
```documents``` can take the following as the **arrayExpression**
* A Json array expression, e.g. ```[{x:2},{x:3}]```
* A variable which evaluates to an array, e.g. a [List](/docs/odsl/variable/list) variable 

## Examples

### Using a static array
This example takes 3 documents and buckets them

```js
aggregate ${object}
    documents [{x:10}, {x:2}, {x:5}]
    bucketAuto "$x" buckets 4 
end
```

### Using a List variable
This example uses the objects in a list variable to perform the aggregation

```js
docs = List()
for i=1 to 10
    o = Object()
    o.size = i
    docs.add(o)
next
aggregate ${object}
    documents docs
    bucketAuto "$size" buckets 4 
end
```