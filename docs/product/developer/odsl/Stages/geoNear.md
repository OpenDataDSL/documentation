---
slug: /odsl/stages/geoNear
---
## Definition
The ```geoNear``` stage outputs documents in order of nearest to farthest from a specified point.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/)

## Syntax
```geoNear``` has the following form:

```js
geoNear options
```

Where options are:
* near - The point for which to find the closest documents.
* distanceField - the output field that contains the calculated distance
* distanceMultiplier - an optional factor that all distances are multiplied by
* includeLocs - an optional field to output the location used to calculate the distance
* key - Optional. Specify the geospatial indexed field to use when calculating the distance
* maxDistance - Optional. The maximum distance from the center point that the documents can be
* minDistance - Optional. The minimum distance from the center point that the documents can be
* query - An optional query to limit the result to match the query
* spherical - An optional boolean to indicate that you want to use spherical geometry rather than planar geometry

## Behaviour
```geoNear``` requires a geospatial index to be added to the collection you want to perform the calculation on

## Examples

### Using a static array
This example takes 3 documents and buckets them

```js
aggregate ${object}
    documents [{x:10}, {x:2}, {x:5}]
    bucketAuto "$x" buckets 4 
end
```

### Using a List variable
This example uses the objects in a list variable to perform the aggregation

```js
docs = List()
for i=1 to 10
    o = Object()
    o.size = i
    docs.add(o)
next
aggregate ${object}
    documents docs
    bucketAuto "$size" buckets 4 
end
```