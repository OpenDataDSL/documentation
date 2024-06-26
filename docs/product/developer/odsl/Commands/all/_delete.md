Used to rollback versions or delete items from the database

#### Syntax
Standard form:
```js
delete activevar (log string)?
```
Bulk delete form:
```js
delete activevar (log string)? (where condition)?
```

#### Description
In the standard form, it rolls back the version of an item from the database, the activevar item can be one of:

*   action    
*   calendar
*   critical (future use)
*   curve
*   dashboard
*   data (curve, timeseries, matrix)
*   dataset (dataset, dataset_feed, dataset_delivery)
*   environment
*   event
*   expiry
*   extractor
*   index
*   object
*   policy
*   process
*   queue
*   reportconfig
*   report
*   script
*   secret
*   subscription
*   task
*   transformer
*   type
*   user
*   workflow
    
In bulk delete form, only the following services are supported:
*   object

You can specify the version number to delete with the activevar syntax: ```${service:"resource":version}```

The version can also be *, in which case it will fully delete the item from the database

The optional **log** option allows you to specify a reason for the deletion which is added to the audit log

#### Example
```js
// To rollback to the previous version
delete ${object:"TEST"}

// To rollback to the previous version, specifying an audit log message 
delete ${script:"Test Script"} log "Removed TEST object"

// To delete a specific version
delete ${object:"TEST":1}

// To delete all versions
delete ${object:"TEST":*}

```
