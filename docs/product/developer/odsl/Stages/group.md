---
slug: /odsl/stages/group
---

## Definition
The ```group``` stage combines multiple documents with the same field, fields, or expression into a single document according to a group key. 
The result is one document per unique group key.

A group key is often a field, or group of fields. 
The group key can also be the result of an expression. Use the _id field in the $group pipeline stage to set the group key. 

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)

## Syntax
```group``` has the following form:

```js
group _id=field (,varname=accumulator)*
```

## _id field
The _id expression specifies the group key. 
If you specify an _id value of null, or any other constant value, the ```group``` stage returns a single document that aggregates values across all of the input documents.

## Accumulators
The ```accumulator``` operators must be one of the following:

|Name|Description|
|-|-|
|addToSet|Returns an array of unique expression values for each group. Order of the array elements is undefined|
|avg|Returns an average of numerical values. Ignores non-numeric values|
|bottom|Returns the bottom element within a group according to the specified sort order|
|bottomN|Returns an aggregation of the bottom n fields within a group, according to the specified sort order|
|concatArrays|Returns a single array that combines the elements of two or more arrays|
|count|Returns the number of documents in a group|
|first|Returns the result of an expression for the first document in a group|
|firstN|Returns an aggregation of the first n elements within a group. Only meaningful when documents are in a defined order. Distinct from the $firstN array operator|
|last|Returns the result of an expression for the last document in a group|
|lastN|Returns an aggregation of the last n elements within a group. Only meaningful when documents are in a defined order. Distinct from the $lastN array operator|
|max|Returns the highest expression value for each group|
|maxN|Returns an aggregation of the n maximum valued elements in a group. Distinct from the $maxN array operator|
|median|Returns an approximation of the median, the 50th percentile, as a scalar value|
|mergeObjects|Returns a document created by combining the input documents for each group|
|min|Returns the lowest expression value for each group|
|minN|Returns an aggregation of the n minimum valued elements in a group. Distinct from the $minN array operator|
|percentile|Returns an array of scalar values that correspond to specified percentile values|
|push|Returns an array of expression values for documents in each group|
|setUnion|Takes two or more arrays and returns an array containing the elements that appear in any input array|
|stdDevPop|Returns the population standard deviation of the input values|
|stdDevSamp|Returns the sample standard deviation of the input values|
|sum|Returns a sum of numerical values. Ignores non-numeric values|
|top|Returns the top element within a group according to the specified sort order|
|topN|Returns an aggregation of the top n fields within a group, according to the specified sort order|

## Examples
