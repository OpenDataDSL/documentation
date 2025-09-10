Used to rename a resource in the database

#### Syntax
```js
rename ${service:"resource"} as newname (log "reason")?
```
#### Description

The rename command is used to change the unique id of a specific resource in a service.

#### Examples
```js
// Rename a privat eobject
rename ${object:"OBJ1"} as UK_OBJ

// Rename a calendar id and add an audit log message
rename ${calendar:"mycal"} as UKHOURLY log "Changed to correct id"
```

#### See Also
* [Renaming Reports](/docs/topics/reporting/basics#renaming-reports)