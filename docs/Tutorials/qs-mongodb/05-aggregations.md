---
title: Aggregating data
sidebar_position: 6
slug: /tutorials/qs/mongodb/aggregation
tags:
- quickstart
- odsl
- mongodb
- aggregation
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module gives an a comprehensive overview on aggregating data using the MongoDB aggregation pipeline." />

## Using ODSL to create aggregation pipelines

An aggregation pipeline consists of an array of stages that are executed in order to produce an output array of resultant documents.

You can easily construct a MongoDB aggregation pipeline in the ODSL language using the **aggregate** command, here is a simple example:

```js
aggregate ${object:"m101:sample_training.zips"}
    match state = "NY" and city = "ALBANY"
end
```

## Aggregation Stages
The following MongoDB Aggregation Stages are fully supported within the ODSL language:
* [addFields](/docs/odsl/stages/addFields)
* [bucket](/docs/odsl/stages/bucket)
* [bucketAuto](/docs/odsl/stages/bucketAuto)
* [count](/docs/odsl/stages/count)
* [documents](/docs/odsl/stages/documents)
* [facet](/docs/odsl/stages/facet)
* [geoNear](/docs/odsl/stages/geoNear)
* [graphLookup](/docs/odsl/stages/graphLookup)
* [group](/docs/odsl/stages/group)
* [limit](/docs/odsl/stages/limit)
* [lookup](/docs/odsl/stages/lookup)
* [match](/docs/odsl/stages/match)
* [merge](/docs/odsl/stages/merge)
* [out](/docs/odsl/stages/out)
* [project](/docs/odsl/stages/project)
* [redact](/docs/odsl/stages/redact)
* [replaceRoot](/docs/odsl/stages/replaceRoot)
* [replaceWith](/docs/odsl/stages/replaceRoot)
* [sample](/docs/odsl/stages/sample)
* [skip](/docs/odsl/stages/skip)
* [sort](/docs/odsl/stages/sort)
* [sortByCount](/docs/odsl/stages/sortByCount)
* [unwind](/docs/odsl/stages/unwind)

All other pipeline stages can be used in ODSL in JSON format, e.g.

```js
aggregate ${object}
    { "$collStats": { "storageStats": { } } }
end
```

## Examples

Below are a set of examples which show a variety of aggregations, aggregation stages and functions

### Match and count
```js
aggregate ${object:"m101:sample_training.zips"}
    match state = "NY" and city = "ALBANY" and pop > 5000
    count "zips"
end
```

### Using group and sort
```js
aggregate ${object:"m101:sample_training.companies"}
    group _id="$founded_year", num=sum(1)
    sort num asc
end
```

### Using addFields and project
```js
aggregate ${object:"m101:sample_training.companies"}
    match ipo != null
    addFields symbol="$ipo.stock_symbol"
    project name, symbol
end
```

### Using geoNear, sort and limit
```js
lands_end = Point([-5.712946243042564, 50.0692015134188])
aggregate ${object:"m101:sample_geospatial.shipwrecks"}
    geoNear near=lands_end, distanceField="distanceFromLandsEndKm", spherical=true, distanceMultiplier=0.000156786
    project name, distanceFromLandsEndKm
    sort distanceFromLandsEndKm asc
    limit 5
end
```

### Using lookup
```js
aggregate ${object:"m101:sample_mflix.movies"}
    lookup from "comments" localField "_id" foreignField "movie_id" as "comments"
    match comments > size(0)
    limit 1
end
```

### Using bucket
```js
aggregate ${object:"m101:sample_training.companies"}
    match founded_year > 1980 and number_of_employees != null
    bucket "$number_of_employees" boundaries [ 0, 20, 50, 100, 500, 1000, Infinity ] 
end
```

### Using autoBucket
```js
aggregate ${object:"m101:sample_training.companies"}
    match founded_year > 1980 and number_of_employees != null
    bucketAuto "$number_of_employees" buckets 5
end
```

### Using unwind
```js
aggregate ${object:"m101:sample_training.companies"}
    match number_of_employees>100000
    project name, city="$offices.city"
    unwind "$city"
    match city="Tokyo"
end
```