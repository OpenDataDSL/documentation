Used to delete items from the database

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
In the standard form, it deletes an item from the database, the activevar item can be one of:

*   action    
*   calendar
*   curve
*   environment
*   expiry
*   extractor
*   index
*   object
*   process
*   queue
*   script
*   subscription
*   transformer
*   type
*   workflow
    
In bulk delete form, only the following services are supported:
*   object

The optional **log** option allows you to specify a reason for the deletion which is added to the audit log

#### Example
```js
delete ${object:"TEST"}

delete ${script:"Test Script"} log "Removed TEST object"
```
