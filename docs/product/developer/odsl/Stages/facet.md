---
slug: /odsl/stages/facet
---
## Definition
The ```facet``` stage processes multiple aggregation pipelines within a single stage on the same set of input documents. Each sub-pipeline has its own field in the output document where its results are stored as an array of documents.

[Read the official MongoDB documentation](https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/)

## Syntax
```facet``` has the following form:

```js
facet 
    name (pipelineitem)* 
    (, name (pipelineitem)*)*
end
```

## Behaviour
```facet``` can use any pipeline stages except:
* collStats
* facet
* geoNear
* indexStats
* out
* merge
* planCacheStats

Each sub-pipeline within ```facet``` is passed the exact same set of input documents. 
These sub-pipelines are completely independent of one another and the document array output by each is stored in separate fields in the output document. 
The output of one sub-pipeline can not be used as the input for a different sub-pipeline within the same ```facet stage```. 
If further aggregations are required, add additional stages after ```facet``` and specify the field name of the desired sub-pipeline output.

## Example
The following example takes a json array of objects and feeds them into an aggregation pipeline using the [documents](documents) pipeline stage.
It then uses MongoDB's faceting features to provide customers with the store's inventory categorized across multiple dimensions such as tags, price, and year created. 
This ```facet``` stage has three sub-pipelines that use
* [sortByCount](sortByCount)
* [bucket](bucket)
* [bucketAuto](bucketAuto)

to perform this multi-faceted aggregation. 

```js
json = `[{ "_id" : 1, "title" : "The Pillars of Society", "artist" : "Grosz", "year" : 1926,
  "price" : 199.99,
  "tags" : [ "painting", "satire", "Expressionism", "caricature" ] },
{ "_id" : 2, "title" : "Melancholy III", "artist" : "Munch", "year" : 1902,
  "price" : 280.00,
  "tags" : [ "woodcut", "Expressionism" ] },
{ "_id" : 3, "title" : "Dancer", "artist" : "Miro", "year" : 1925,
  "price" : 76.04,
  "tags" : [ "oil", "Surrealism", "painting" ] },
{ "_id" : 4, "title" : "The Great Wave off Kanagawa", "artist" : "Hokusai",
  "price" : 167.30,
  "tags" : [ "woodblock", "ukiyo-e" ] },
{ "_id" : 5, "title" : "The Persistence of Memory", "artist" : "Dali", "year" : 1931,
  "price" : 483.00,
  "tags" : [ "Surrealism", "painting", "oil" ] },
{ "_id" : 6, "title" : "Composition VII", "artist" : "Kandinsky", "year" : 1913,
  "price" : 385.00,
  "tags" : [ "oil", "painting", "abstract" ] },
{ "_id" : 7, "title" : "The Scream", "artist" : "Munch", "year" : 1893,
  "tags" : [ "Expressionism", "painting", "oil" ] },
{ "_id" : 8, "title" : "Blue Flower", "artist" : "O'Keefe", "year" : 1918,
  "price" : 118.42,
  "tags" : [ "abstract", "painting" ] }]`
docs = ${json:json}

aggregate ${object}
    documents docs
    facet categorizedByTage
        unwind "$tags"
        sortByCount "$tags"
    , categorizedByPrice
        match price != null
        bucket "$price" boundaries [0, 150, 200, 300, 400] default "Other" output count=sum(1), titles=push("$title") 
    , "categorizedByYears(Auto)"
        bucketAuto "$year" buckets 4 
    end
end
```
