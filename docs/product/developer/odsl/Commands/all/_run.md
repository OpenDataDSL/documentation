Runs a process remotely

#### Syntax
```js
run processname (with input)? (log reason)? (in delay TIMEUNIT)?
```
#### Description

The run command remotely triggers a manual run of a process. You can optionally provide a variable with input run parameters, a reason log message that will be added to the audit log and a delay for when to run the process.

#### Options

##### With input

You can optionally provide a variable with some input information which will override or provide specific context to the process, e.g.
```js
// Run a curve
ondate = Object()
ondate.date = "2021-04-26"
run CURVE_TEST with ondate
```

##### Log reason

You can optionally give a reason for manually triggering a process, this will be logged in the audit log

##### Run on another service

Some services run their own functions with run: give the service name before the id, e.g.
```js
// Run the validation checks of a curve
result = run validation "ICE.IFEU.B:SETTLE" with "2026-10-19"
```
See [Validation: ODSL](/docs/extensions/validation/reference#odsl) for the validation functions.

##### In delay

You can optionally delay the starting of the process, e.g.
```js
run MY_PROCESS in 1 hour
```
The timeunit parameter can be one of:

*   second    
*   seconds    
*   minute    
*   minutes    
*   hour    
*   hours
    