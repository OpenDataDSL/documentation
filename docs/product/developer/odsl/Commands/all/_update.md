Used to bulk update items in the database

#### Syntax
```js
bulk update avservice (where condition)? (upsert)?
    (log string)?
    ( (updateoperator|comment)* | (pipelineOperator|comment)* )
end
```

#### Description
Only the following services are supported:
*   object

The optional **where condition** limits the documents that are updated, if ommitted, all documents are updated

The optional **upsert** option will insert a document if there is no matching document

The optional **log** option allows you to specify a reason for the update which is added to the audit log

#### Examples
Example using update operators
```js
bulk update ${object}
    set(name="test",type="real")
    set(description=Hello)
    inc(count=1,test=5)    
    rename(temp="real")
    unset(test)    
end
```

Example using pipeline operators
```js
bulk update ${object}
    addFields status="Modified", comments=["$misc1", "$misc2"]
    project misc1, misc2
end
```

Example using upsert
```js
bulk update ${object} where _id=1 upsert
    set(item="apple")
    setOnInsert(defaultQty=100)
end
```

Example using a log message
```js
bulk update ${object} where name="b4"
    log "Audit record 123456"
    set(test="Hello Again")
    inc(count=1)
end
```
