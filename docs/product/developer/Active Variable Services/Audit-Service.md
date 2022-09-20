---
title: Audit Service
description: The audit service in the ODSL language
slug: /odsl/service/audit
tags:
  - service
  - audit
---
The audit service allows you to find and view audit records for actions performed in the OpenDataDSL environment.

## Finding Audit Records
You use the [find](/docs/odsl/command/data-management#find) command to find audit records in ODSL.

### Find examples
#### Getting all private audit records

```js
records = find ${audit}
print records.size
```

#### Getting all public audit records

```js
records = find ${audit:public}
print records.size
```

#### Getting all records for a specific service

```js
records = find ${audit} where service="action"
print records.size
```

#### Getting all records within a time range

```js
records = find ${audit} where timestamp > ${date:"today"} and timestamp < ${date:"tomorrow"}
print records.size
```

#### Getting all records since a specific timestamp

```js
records = find ${audit} where timestamp > "2020-11-03T12:23:40"
print records.size
```

## Summarising Audit Records

You use the [aggregate](/docs/odsl/command/structured#aggregate) command to summarise audit records in ODSL.

### Aggregation examples

#### Summarising by service

```js
summary = aggregate ${audit}
    group _id="$service", qty=count()
    sort qty desc
end

print summary
```