---
slug: /odsl/stages/bucket
---

## Definition
The ```bucket``` stage categorises incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/)

## Syntax
```bucket``` has the following form:

```js
bucket expression boundaries [value (,value)*] (default varname)? (output varname=expression (,varname=expression)*)?
```

## Behaviour
```bucket``` requires at least one of the following conditions to be met, or the operation throws an error:

* Each input document resolves the expression to a value within one of the bucket ranges specified by boundaries
* A default value is specified to bucket documents whose values are outside the boundaries or of a different BSON type than the values in boundaries.

## Examples

### Bucket by year and filter by bucket results

The following operation create a sample collection named ```artists``` and then groups the documents into buckets according to the ```year_born``` field and filters based on the count of documents in the buckets:

:::note
The aggregation in the example below makes use of a built-in function called ```doc``` which converts the parameters into JSON elements and returns a JSON Object
:::

```js
json = `[
  { "_id" : 1, "last_name" : "Bernard", "first_name" : "Emil", "year_born" : 1868, "year_died" : 1941, "nationality" : "France" },
  { "_id" : 2, "last_name" : "Rippl-Ronai", "first_name" : "Joszef", "year_born" : 1861, "year_died" : 1927, "nationality" : "Hungary" },
  { "_id" : 3, "last_name" : "Ostroumova", "first_name" : "Anna", "year_born" : 1871, "year_died" : 1955, "nationality" : "Russia" },
  { "_id" : 4, "last_name" : "Van Gogh", "first_name" : "Vincent", "year_born" : 1853, "year_died" : 1890, "nationality" : "Holland" },
  { "_id" : 5, "last_name" : "Maurer", "first_name" : "Alfred", "year_born" : 1868, "year_died" : 1932, "nationality" : "USA" },
  { "_id" : 6, "last_name" : "Munch", "first_name" : "Edvard", "year_born" : 1863, "year_died" : 1944, "nationality" : "Norway" },
  { "_id" : 7, "last_name" : "Redon", "first_name" : "Odilon", "year_born" : 1840, "year_died" : 1916, "nationality" : "France" },
  { "_id" : 8, "last_name" : "Diriks", "first_name" : "Edvard", "year_born" : 1855, "year_died" : 1930, "nationality" : "Norway" }
]`
objects = ${json:json}
save ${object:"artists"/objects}

aggregate ${object:"artists"}
    bucket "$year_born" boundaries [1840, 1850, 1860, 1870, 1880] default "Other" output count=sum(1), artists=push(doc(name=concat("$first_name", "$last_name"), year_born="$year_born"))
    match count > 3
end
```

### Use ```bucket``` with [facet](facet) to bucket by multiple fields

You can use the [facet](facet) stage to perform multiple ```bucket``` aggregations in a single stage.

The following operation creates a collection called ```artwork``` and then uses two ```bucket``` stages within a [facet](facet) stage to create two groupings, one by price and the other by year

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
  facet price 
        bucket "$price" boundaries [0, 200, 400] default "Other" output count=sum(1), artwork=push(doc(title="$title",price="$price")), averagePrice=avg("$price")      
      ,year
        bucket "$year" boundaries [1890, 1910, 1920, 1940] default "Unknown" output count=sum(1), artwork=push(doc(title="$title",year="$year"))
  end
end
```