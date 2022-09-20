Determines how errors are handled

#### Syntax
```js
on error (exit|ignore)
```
#### Description

The on error statement instructs OpenDataDSL on how you want to handle errors. You have 2 options:

*   exit - this is the default action which stops the currently running script and outputs the error message    
*   ignore - this option doesn’t stop the script running, but it places the error message into a scalar variable called **error**
    

#### Examples

Using on error exit:
```js
on error exit

// Create a date variable
d = Date()

// Call an unknown method that will force throwing an error
print d.unknown()
```

Using on error ignore:
```js
on error ignore

// Create a date variable
d = Date()

// Call an unknown method that will force throwing an error
print d.unknown()

// Script continues and we can see the error message in the variable called error
print error
```
