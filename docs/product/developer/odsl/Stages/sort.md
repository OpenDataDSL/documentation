---
slug: /odsl/stages/sort
---
## Definition
The ```sort``` stage sorts all input documents and returns them to the pipeline in sorted order.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)

## Syntax
```sort``` has the following form:

```js
sort field asc|desc (, field asc|desc)*
```

## Behaviour
### Limits
You can sort on a maximum of 32 keys.

### Sort Consistency
MongoDB does not store documents in a collection in a particular order. When sorting on a field which contains duplicate values, documents containing those values may be returned in any order.

If consistent sort order is desired, include at least one field in your sort that contains unique values. The easiest way to guarantee this is to include the _id field in your sort query.

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

The following aggregation sorts the documents by the score field and returns the first 2 (_id: 4 and 5) 

```js
aggregate ${object:"scores"}
    sort score asc    
    limit 2
end
```