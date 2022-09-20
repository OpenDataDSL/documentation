Outputs a message to the console and to a process execution log

#### Syntax
```js
log LEVEL message
```
#### Description

If the script is running in a process, the message is output into the process execution log. The message is also output to the console.

The **LEVEL** option allows you to specify the log level of the message from one of:

*   debug    
*   info    
*   warn    
*   fatal
    

#### Examples
```js
log debug "This is a debug message"
log info "This is an info message"
log warn "This is a warning message"
log fatal "This is a fatal message"

a = 12.2
log debug "The value is " + a
```
