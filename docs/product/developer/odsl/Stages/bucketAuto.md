---
slug: /odsl/stages/bucketAuto
---

## Definition
The ```bucketAuto``` stage categorises incoming documents into groups, called buckets, based on a specified expression.
Bucket boaundaries are automatically determined in an attempt to evenly distribute the documents into the specified number of buckets

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/)

## Syntax
```bucketAuto``` has the following form:

```js
bucketAuto expression buckets int (granularity ('R5'|'R10'|'R20'|'R40'|'R80'|'1-2-5'|'E6'|'E12'|'E24'|'E48'|'E96'|'E192'|'POWERSOF2'))? (output varname=expression (,varname=expression)*)?
```

## Behaviour
There may be less than the specified number of buckets if:

* The number of input documents is less than the specified number of buckets.
* The number of unique values of the groupBy expression is less than the specified number of buckets.
* The granularity has fewer intervals than the number of buckets.
* The granularity is not fine enough to evenly distribute documents into the specified number of buckets.

The even distribution of documents across buckets depends on the cardinality, or the number of unique values, of the expression field. 
If the cardinality is not high enough, the ```bucketAuto``` stage may not evenly distribute the results across buckets.

### Granularity

See the [MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucketAuto/#granularity) on how granularity option works

## Examples

### Aggregating artwork by price

```js
json = `[
  { "_id" : 1, "title" : "The Pillars of Society", "artist" : "Grosz", "year" : 1926,
      "price" : 199.99 },
  { "_id" : 2, "title" : "Melancholy III", "artist" : "Munch", "year" : 1902,
      "price" : 280.00 },
  { "_id" : 3, "title" : "Dancer", "artist" : "Miro", "year" : 1925,
      "price" : 76.04 },
  { "_id" : 4, "title" : "The Great Wave off Kanagawa", "artist" : "Hokusai",
      "price" : 167.30 },
  { "_id" : 5, "title" : "The Persistence of Memory", "artist" : "Dali", "year" : 1931,
      "price" : 483.00 },
  { "_id" : 6, "title" : "Composition VII", "artist" : "Kandinsky", "year" : 1913,
      "price" : 385.00 },
  { "_id" : 7, "title" : "The Scream", "artist" : "Munch", "year" : 1893
      /* No price*/ },
  { "_id" : 8, "title" : "Blue Flower", "artist" : "O'Keefe", "year" : 1918,
      "price" : 118.42 }
]`
objects = ${json:json}
save ${object:"artwork"/objects}

aggregate ${object:"artwork"}
    bucketAuto "$price" buckets 4 
end
```