Defines a database index

#### Syntax
```js
varname = index
    (unique|sparse|hidden|ttl seconds|partial condition|collation name=value (, name=value)*)*
    field (asc|desc|text|2dsphere)
    (field (asc|desc|text|2dsphere))*
end
```

#### Description

Creates an [Index](/docs/odsl/variable/index) variable named after the variable, which you then save with the index service. Indexes make queries on the indexed fields faster.

|**Option**|**Description**|
|-|-|
|unique|No two items can have the same values of the indexed fields|
|sparse|Only index the items that have the indexed fields|
|hidden|Keep the index but don't use it for queries|
|ttl seconds|Delete items automatically this many seconds after the date in the indexed field|
|partial condition|Only index the items that match the condition|
|collation|The collation of the index, e.g. locale="en", strength=2|

#### Examples
```js
region_type = index
    region asc
    _type asc
end
save ${index:region_type}
```
