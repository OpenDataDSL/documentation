Used to save items to the database

#### Syntax
```js
save varname   (log reason) (replace)
save activevar (log reason) (replace)
```
#### Description

The save command saves an item to the database.

There are 2 forms:
* Simply save using the variable name and let OpenDataDSL determine the service to use, e.g. ```save x```
* Explicitly state the service using an activevar, e.g. ```save ${object:x}```

##### Log
The optional log reason is to give a human-readable reason why this item is being saved and this is stored in the audit log.

##### Replace
The optional replace statement is used with the object service to signify that you want to replace the stored object with the passed in object. This overrides the default action which is to merge the contents of the supplied object with the stored object.

##### Services
The following active variable services can be used with the save command:

* action    
* calendar    
* curve    
* environment    
* expiry    
* extractor    
* index    
* object    
* process    
* queue    
* script    
* subscription 
* task
* transformer    
* type    
* workflow
    

#### Example
```js
// Create private type
TypeExample = type
    name as String() default "test"
end

// Save the type
save TypeExample

// Create a private object
ObjExample = object as TypeExample
    name = "Hello"
end

// Save the object
save ObjExample log "Created the new object"

// Change the object
ObjExample.name = "Hello World"

// Save the object using replace option to replace the stored object
save ObjExample log "Changed the object" replace
```
