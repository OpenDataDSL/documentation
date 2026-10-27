Create an aggregation pipeline to group and summarise data

#### Syntax
```js
varname = (aggregate|pipeline) service (save)? (allowDiskUse)?
  (pipelineItem)* 
end

pipelineItem: (addFields|bucket|bucketAuto|count|documents|facet|geoNear|graphLookup
    |group|limit|lookup|match|merge|out|project|redact|replaceRoot|replaceWith
    |sample|skip|sort|sortByCount|unwind|jsonObject|comment|NL);
pipelineMatch: match (condition)+;
pipelineGroup: group assign (, assign)*;
pipelineSort: sort sortItem (, sortItem)*;
sortItem: (assign|varname (asc|desc)?);
```

Each stage is described in [Aggregation Stages](/docs/odsl/stages). You can also write a stage as a MongoDB JSON stage, e.g. `{"$count": "total"}`. **pipeline** is another name for **aggregate**. **allowDiskUse** lets large aggregations use disk space on the database server, and **save** also saves the pipeline as a database view named after the output variable.
#### Description

The aggregate command creates an aggregation pipeline to group and summarise data from any service.

##### Explanation of the syntax

*   The **match** pipeline item allows you to filter out data using a condition clause    
*   The **group** pipeline item groups or summarises data using one or more of the following summarising functions:    
    *   count() - counts the number of occurances        
*   The **sort** pipeline item sorts the results according to the specified field and asc(ending) or desc(ending) order
    

#### Examples

The following example summarises the status of process executions filtered for a specific service
```js
summary = aggregate ${exec}
    match service="ETL"
    group _id="$status", qty=count()
    sort qty desc
end
```

#### More about aggregation
* [More details about aggregation stages](/docs/odsl/stages)