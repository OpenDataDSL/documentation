---
slug: /odsl/stages/count
---
## Definition
The ```count``` stage passes a document to the next stage that contains a count of the number of documents input to the stage.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/)

## Syntax
```count``` has the following form:

```js
count string
```

## Behaviour
```count``` returns a single document with a single property named with the argument to ```count``` and a value of the number of input documents to this stage.  

## Example

A collection named ```scores``` has the following documents:

```json
{ "_id" : 1, "subject" : "History", "score" : 88 }
{ "_id" : 2, "subject" : "History", "score" : 92 }
{ "_id" : 3, "subject" : "History", "score" : 97 }
{ "_id" : 4, "subject" : "History", "score" : 71 }
{ "_id" : 5, "subject" : "History", "score" : 79 }
{ "_id" : 6, "subject" : "History", "score" : 83 }
```

The following aggregation excludes documents that have a score less than or equal to 80 and returns the count of the number of passing scores.

```js
aggregate ${object:"scores"}
    match score > 80
    count "passing_scores"
end
```
