---
sidebar_position: 2
slug: /api/rest/searching
---
Searching and Filtering
=======================

This guide explains how to search and filter data

## Searching

You can search any resource by passing in the **_search** query parameter with a word or words to search for, for example to search for public objects with the term ‘europe’:
```json
https://api.opendatadsl.com/service/object/v1/public?_search=europe
```

Search expressions can be combined with filters, for example:
```json
https://api.opendatadsl.com/service/object/v1/public?_search=poultry&location=Belgium
```

### Field Projection

By default, except for the [object service](./service/Object), all fields are returned from a search query. If you want to restrict the returned fields, you use the _project query parameter, e.g.
```json
https://api.opendatadsl.com/service/audit/v1/public?\_search=ECB&\_project=timestamp,user,id
```
The above query returns only the _id, timestamp, user and id fields from the audit records.

## Filtering

There are 2 types of filtering: simple and complex.

### Simple Filtering

Simple filtering can be used when you are looking for exact matches and a few helper functions, such as range to filter to a range of dates or values. For example you want to find all public objects with currency EUR, you can send the following request:
```json
https://api.opendatadsl.com/service/object/v1/public?currency=EUR
```
You can combine multiple filters, e.g. to find all public objects with currency EUR of class SPOT
```json
https://api.opendatadsl.com/service/object/v1/public?currency=EUR&class=SPOT
```

#### Simple functions

There are functions that you use with your query as follows:

|**Function**|**Example**|**Description**|
|-|-|-|
|range|timestamp=range(2021-01-01,2021-12-31)|Filter the search list using a date field where you can restrict the range of dates|
|range|quantity=range(0,10)|Filter the search list using a numeric field where you can restrict the range of values|
|equal|location=Europe|Filter the search list using a field and value|
|ne|location=ne(null)|Filter the search list where a field is not equal to a value|
|in|location=in(England, Germany)|Filter the results where a field is one of a list of values|
|gt|value=gt(4)|Filter the results where a field value is greater than a supplied value|
|gte|value=gte(4)|Filter the results where a field value is greater than or equal to a supplied value|
|lt|value=lt(4)|Filter the results where a field value is less than a supplied value|
|lte|value=lte(4)|Filter the results where a field value is less than or equal to a supplied value|
|regex|name=regex(.\*type.\*)|Filter a field using a [regex](https://en.wikipedia.org/wiki/Regular_expression) expression|
|within|geolocation=within(sphere(\[-2.6, 49.45\], 0.007))|Filter the search list where the geolocation is within a sphere denoted as sphere(\[longitude, latitude\], distance)|

:::note
Using within or any other geolocation queries, the distance is radians. To convert to distance use:

miles / 3963.2
km / 6378.1
:::

### Complex Filtering

Complex filtering is used when you want to express a query which involves more complex logic, such as logic ands and logic ors.

