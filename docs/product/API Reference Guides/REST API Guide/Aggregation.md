---
sidebar_position: 3
slug: /api/rest/aggregation
---
Aggregation
===========

This guide explains how to aggregate data using the REST API

## Distinct Lists

A simple form of aggregation is to get a distinct list of values for a field in a data resource, for example to get a distinct list of users from the audit resource, you can issue the following request:
```js
https://api.opendatadsl.com/api/audit/v1/private
    ?_distinct=user
```

This can be combined with any filter expression to narrow down the set of data, e.g. to get the list of audit users within a date range:
```js
https://api.opendatadsl.com/api/audit/v1/private
  ?_distinct=user
  &timestamp=range(2021-05-01,2021-05-31)
```

## Field Buckets
Another simple form of aggregation, especially when using for user interfaces is to create buckets of values along with information about how many elements are contained in the bucket and how to filter for those elements.

### Default buckets
You can use the ```_fieldinfo``` query parameter to perform some basic bucketing, e.g.

```js
https://api.opendatadsl.com/api/audit/v1/private
    ?_fieldinfo=user
```

This creates an output similar to the following:

```json
[
  {
    "_id": "fred.bloggs@opendatadsl.com",
    "count": 1987,
    "filter": {
      "user": "fred.bloggs@opendatadsl.com"
    }
  },
  {
    "_id": "john.smith@opendatadsl.com",
    "count": 1023,
    "filter": {
      "user": "john.smith@opendatadsl.com"
    }
  }
]
```

## Aggregation Pipeline

You can aggregate data using the _aggregate query parameter. The _aggregate parameter requires a JSON array of MongoDB aggregation pipeline commands.

An aggregation pipeline can be used to filter, group, and summarise data. The following example shows grouping process execution information and summing up the number of executions for each execution status:
```json
[{"$group":{"_id":"$status","count":{"$sum":1}}}]
```

To send this aggregation pipeline, you can issue the following request:
```js
https://api.opendatadsl.com/api/process-exec/v1    
    ?_aggregate=[{"$group":{"_id":"$status","count":{"$sum":1}}}]
```

:::note
You will need to URL encode the _aggregate query parameter
:::
