Used to delete items from the database

#### Syntax
```js
delete activevar (log string)?
```
#### Description

Deletes an item from the database, the activevar item can be one of:

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
    

The optional **log** option allows you to specify a reason for the deletion which is added to the audit log

#### Example
```js
delete ${object:"TEST"}

delete ${script:"Test Script"} log "Removed TEST object"
```
