Used to save items to the database

#### Syntax
```js
save activevar (log reason) (replace)
```
#### Description

The save command saves an item to the database.

The optional log reason is to give a human readable reason why this item is being saved and this is stored in the audit log.

The optional replace statement is used with the object service to signify that you want to replace the stored object with the passed in object. This overrides the default action which is to merge the contents of the supplied object with the stored object.

The following active variable services can be used with the save command:

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
    

#### Example
```js
// Create private type
TypeExample = type
    name as String() default "test"
end

// Save the type
save ${type:TypeExample}

// Create a private object
ObjExample = object as TypeExample
    name = "Hello"
end

// Save the object
save ${object:ObjExample} log "Created the new object"

// Change the object
ObjExample.name = "Hello World"

// Save the object using replace option to replace the stored object
save ${object:ObjExample} log "Changed the object" replace
```
