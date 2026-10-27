Used to rollback versions or delete items from the database

#### Syntax
```js
delete activevar (log string)?
```

#### Description
In the standard form, it rolls back the version of an item from the database: the previous version becomes the current one, or the item is deleted if it has only one version. Services that do not keep versions delete the item.

You can use any [active variable service](/docs/odsl/service/services) that stores items, for example action, aiplaybook, alert, automation, calendar, curve, data, dataset, documentation, environment, event, expiry, extractor, group, index, object, policy, process, queue, report, reportconfig, script, secret, task, transformer, type, validationconfig and workflow. Your access policies decide what you can delete. To stop a running process, delete its execution with the [exec service](/docs/odsl/service/exec).

You can specify the version number to delete with the activevar syntax: ```${service:"resource":version}```

The version can also be *, in which case it will fully delete the item from the database

The optional **log** option allows you to specify a reason for the deletion which is added to the audit log

#### Examples
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

## bulk delete
Bulk delete can remove multiple records from certain supported services

#### Syntax
```js
bulk delete avservice (log string)? (where condition)?
```

In bulk delete form, the following services are supported for delete and restore, which means once the records are deleted, they can be restored using the [bulk restore](#bulk-restore) command.
* event
* object

:::note
Both the current and archived versions of the items are deleted/restored.
:::

The following services can be used to bulk delete only - no restore
* alertrecord
* audit
* automationlog
* batch
* dataset_delivery
* exec
* metric
* queuelog
* scriptlog
* validation

## bulk restore
Bulk restore is used to ```undo``` a [bulk delete](#bulk-delete)

#### Syntax
```js
bulk restore avservice (log string)? (where condition)?
```

The following services can use the bulk restore command:
* event
* object

#### Examples
```js

// To delete all object that are of type="MyType"
bulk delete ${object} where _type="MyType" 

// To restore objects of type="MyType"
bulk restore ${object} where _type="MyType" 

// To completely remove audit records prior to 1st June 2025
bulk delete ${audit} where timestamp < "2025-06-01"

```
