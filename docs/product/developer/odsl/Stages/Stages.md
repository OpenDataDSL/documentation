---
sidebar_position: 1
title: Aggregation stages
slug: /odsl/stages
---

## Aggregation Stages
The following MongoDB Aggregation Stages are fully supported within the ODSL language:
* [addFields](stages/addFields)
* [bucket](stages/bucket)
* [bucketAuto](stages/bucketAuto)
* [count](stages/count)
* [documents](stages/documents)
* [facet](stages/facet)
* [geoNear](stages/geoNear)
* [graphLookup](stages/graphLookup)
* [group](stages/group)
* [limit](stages/limit)
* [lookup](stages/lookup)
* [match](stages/match)
* [merge](stages/merge)
* [out](stages/out)
* [project](stages/project)
* [redact](stages/redact)
* [replaceRoot](stages/replaceRoot)
* [replaceWith](stages/replaceRoot)
* [sample](stages/sample)
* [skip](stages/skip)
* [sort](stages/sort)
* [sortByCount](stages/sortByCount)
* [unwind](stages/unwind)

All other pipeline stages can be used in ODSL in JSON format, e.g.

```js
aggregate ${object}
    { "$collStats": { "storageStats": { } } }
end
```
