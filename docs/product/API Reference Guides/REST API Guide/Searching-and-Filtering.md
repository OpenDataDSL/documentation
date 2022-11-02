---
sidebar_position: 2
slug: /api/rest/searching
---
Searching and Filtering
=======================

This guide explains how to search and filter data

## Searching
Searching for items in any service is performed using the ```_search``` query parameter.
By default, the following fields are queried using a case-insensitive regex search:
* _id
* name
* description

### Single search term
You can search any resource by passing in the ```_search``` query parameter with a word or words to search for, for example to search for public objects with the term ‘europe’:
```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=europe
```

### Multiple search terms
You can search for multiple search terms by using multiple words separated by spaces, e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=europe potato
```

### AND search terms
The default search method is to find documents that match ALL search terms, known as an AND search term, e.g. 

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=europe potato
```

In this case, every object must contain both the word europe and potato (case-insensitive).

### OR search terms
If you want to find all objects with either the word europe or potato, you need to separate the words with a pipe '|', e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=europe|potato
```

### NOT search terms
If you want to find all objects with that don't contain a search term, prefix the term with '-', e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=europe potato -germany
```

This will find all objects containing both the words europe and potato, but without the word germany

### GROUP search terms
You can combine AND, OR and NOT search terms, but in order to do this effectively you will probably need to group the terms by using braces '()', e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=(europe | usa) potato
```

### Search specific named fields
As stated above, the default search locates information in the _id, name and description fields only.
If you want to search for text in a different field, you can explicitly name the field using the syntax ```field:term``` e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=location:belgium
```

You can combine this with standard search terms and named fields, e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=potato price location:belgium market:spot
```

You can also combine OR and NOT terms, e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=(potato|price) -location:belgium market:spot
```

## Filtering

There are 2 types of filtering: simple and complex.

### Simple Filtering

Simple filtering can be used when you are looking for exact matches and a few helper functions, such as range to filter to a range of dates or values. For example you want to find all public objects with currency EUR, you can send the following request:
```js
https://api.opendatadsl.com/api/object/v1/public
    ?currency=EUR
```
You can combine multiple filters, e.g. to find all public objects with currency EUR of class SPOT
```js
https://api.opendatadsl.com/api/object/v1/public
    ?currency=EUR
    &class=SPOT
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

This can be achieved using a condition expression such as: ```(currency=EUR or currency=GBP) and unit=MT```

e.g.
```js
https://api.opendatadsl.com/api/object/v1/public
    ?_filter=(currency=EUR or currency=GBP) and unit=MT
```

## Combining Search and Filter

### Simple filters
Search expressions can be combined with simple filters, for example:
```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=poultry
    &location=Belgium
```

### Search and complex filters
If both the ```_search``` and ```_filter``` query parameters are passed, both are applied with an **and** logical parameter

e.g.
```js
https://api.opendatadsl.com/api/object/v1/m121:aggregations.movies
  ?_search=title:scene
  &_filter=imdb.rating=gt(7)
  &_project=title,imdb.rating
  ```

This effectively performs a regex search in the title field for the word 'scene' and **ands** it with a filter on the imdb.rating field for any number greater than 7.

## Field Projection

By default, all fields are returned from a search query. If you want to restrict the returned fields, you use the ```_project``` query parameter, e.g.
```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=ECB
    &_project=timestamp,user,id
```
The above query returns only the _id, timestamp, user and id fields from the audit records.

## Limit, Sort and Skip
You can use the ```_limit``` query parameter to limit the number of items returned in a query.
You can use the ```_skip``` query parameter to skip some items returned in a query.
You can use the ```_sort``` query parameter to sort the items returned in a query.

### Limit
Specify the ```_limit``` parameter with a number defining the number of items you want to return, e.g.

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=location:netherlands
    &_limit=20
```

### Skip
Specify the ```_skip``` parameter with a number defining the number of items you want to skip, e.g. combined with limit

```js
https://api.opendatadsl.com/api/object/v1/public
    ?_search=location:netherlands
    &_limit=20
    &_skip=20
```

### Sort
The ```_sort``` parameter can be expressed using JSON, e.g.

```json
{"name":1,"location": -1}
```

Or as a simple string prefixing words with '-' to indicate a descending order, e.g.

```js
name,-location
```

### Combining parameters
An example of search, project, limit, skip and sort

```js
https://api.opendatadsl.com/api/object/v1/public
  ?_search=location:netherlands
  &_project=name,location
  &_limit=20
  &_skip=60
  &_sort=name,-location
```
