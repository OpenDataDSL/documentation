---
slug: /odsl/stages/limit
---
## Definition
The ```limit``` stage limits the number of documents passed to the next stage in the pipeline.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/limit/)

## Syntax
```limit``` has the following form:

```js
limit integer
```

## Behaviour
```limit``` is generally used in conjunction with [skip](skip) as part of a pagination pattern, allowing you to define the page size for a list of documents.

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

The following aggregation skips the first 2 documents and returns only the next 2 documents

```js
aggregate ${object:"scores"}    
    skip 2
    limit 2
end
```