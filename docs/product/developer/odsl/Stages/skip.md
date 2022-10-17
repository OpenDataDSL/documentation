---
slug: /odsl/stages/skip
---
## Definition
The ```skip``` stage skips over the specified number of documents that pass into the stage and passes the remaining documents to the next stage in the pipeline.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/skip/)

## Syntax
```skip``` has the following form:

```js
skip integer
```

## Behaviour
```skip``` is generally used in conjunction with [limit](limit) as part of a pagination pattern, allowing you to skip through pages of documents.

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

The following aggregation excludes the first 2 documents and returns the remaining 4

```js
aggregate ${object:"scores"}
    skip 2
end
```
