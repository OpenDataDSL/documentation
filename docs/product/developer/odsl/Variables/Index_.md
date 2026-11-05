---
slug: /odsl/variable/index
title: Index
tags:
- index
---

# Index

An **Index** defines a database index on a service, which makes queries on the indexed fields faster. Indexes are saved with the [index service](/docs/api/rest/service/index).

## Construction

|**Function**|**Description**|
|-|-|
|Index()|Creates a new Database Index|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|hidden|Hidden indexes are not visible to the query planner and cannot be used to support a query.  By hiding an index from the planner, users can evaluate the potential impact of dropping an index without actually dropping the index. If the impact is negative, the user can unhide the index instead of having to recreate a dropped index.|Boolean|
|keys|The list of keys and index type to use in the index|Object|
|partialCondition|Partial indexes only index the documents in a collection that meet a specified filter expression. By indexing a subset of the documents in a collection, partial indexes have lower storage requirements and reduced performance costs for index creation and maintenance.|String|
|sparse|If set to true, the index only references objects with the indexed keys|Boolean|
|ttl|TTL indexes are special single-field indexes that MongoDB can use to automatically remove documents from a collection after a certain amount of time or at a specific clock time. Data expiration is useful for certain types of information like machine generated event data, logs, and session information that only need to persist in a database for a finite amount of time.|Integer|
|unique|If set to true, it constrains all values in the keys of the index to be unique|Boolean|


## Example

```js
idx = Index()
idx.id = "region_1"
idx.keys = Object()
idx.keys.region = 1
save ${index:idx}
```
