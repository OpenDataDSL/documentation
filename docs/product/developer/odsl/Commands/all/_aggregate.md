Create an aggregation pipeline to group and summarise data

#### Syntax
```js
varname = aggregate service 
  (pipelineItem)* 
end

pipelineItem: (pipelineMatch|pipelineGroup|pipelineSort|NL|comment);
pipelineMatch: match (condition)+;
pipelineGroup: group assign (, assign)*;
pipelineSort: sort sortItem (, sortItem)*;
sortItem: (assign|varname (asc|desc)?);
```
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
