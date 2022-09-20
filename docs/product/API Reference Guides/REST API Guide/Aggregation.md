---
sidebar_position: 3
slug: /api/rest/aggregation
---
Aggregation
===========

This guide explains how to aggregate data using the REST API

## Distinct Lists

A simple form of aggregation is to get a distinct list of values for a field in a data resource, for example to get a distinct list of users from the audit resource, you can issue the following request:
```json
https://api.opendatadsl.com/service/audit/v1/private?_distinct=user
```

This can be combined with any filter expression to narrow down the set of data, e.g. to get the list of audit users within a date range:
```json
https://api.opendatadsl.com/service/audit/v1/private
  ?_distinct=user
  &timestamp=range(2021-05-01,2021-05-31)
```

## Aggregation Pipeline

You can aggregate data using the _aggregate query parameter. The _aggregate parameter requires a JSON object representing an array of MongoDB aggregation pipeline commands.

An aggregation pipeline can be used to filter, group, and summarise data. The following example shows grouping process execution information and summing up the number of executions for each execution status:
```json
[{"$group":{"_id":"$status","count":{"$sum":1}}}]
```

To send this aggregation pipeline, you can issue the following request:
```json
https://api.opendatadsl.com/service/process-exec/v1    
    ?_aggregate=[{"$group":{"_id":"$status","count":{"$sum":1}}}]
```

:::note
You will need to URL encode the _aggregate query parameter
:::
