Command to create actions that can be used in workflows

#### Syntax
```js
varname = (action|gateway) in "category"
  (comment)? 
  (actionInput|actionOutput)* 
  (actionExit)? 
  (statement)* 
end

actionInput: in varname as declaredType ("desc")? (optional)?
actionOutput: out varname as declaredType ("desc")?
actionExit: exit "name" (, "name")*
```
#### Description

A workflow action is a small block or snippet of code that performs a specific task and can be used in your own custom workflows. They can have input and output data and 1 or more exit transitions which can be configured in a workflow.

##### Explanation of the syntax

*   **action** or **gateway** \- This command can create actions or gateways:    
    *   An action takes optional inputs, performs a task and creates optional outputs        
    *   A gateway takes an input and based on that input takes a specific exit transition        
*   The **category** is a string that is used to place the action in a specific category    
*   The **comment** on the first line of the action is used as the description of the action    
*   Action inputs can have an **optional** directive    
*   The action **exits** are simply string exit names, such as “ok” or “failed”
    

#### Examples

A simple send batch action
```js
test_send_batch = action in "loaders"
    // Send a batch of data to the server to be updated
    in batch as Object "The batch to upload"
    exit "ok","failed"
    
    on error ignore
    send input.batch
    if error
        return "failed"
    else
        return "ok"
    end
end

// Save the action to the server
save ${action:test_send_batch}
```

An action to read an object from the object service

```js
read_object = action in "general"
    // Read an object
    in id as Scalar "The ID of the object to read"
    out obj as Object "The ODSL Object"
    exit "ok", "failed" 

    on error ignore 
    output.obj=${object:input.id}
    if error
        print error
        return "failed"
    else
        return "ok"
    end        
end
```
