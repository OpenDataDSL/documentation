---
slug: /odsl/service/memory
tags:
  - service
  - memory
---
Memory Service
==============================

Recreate the current session by saving all variables in memory, then re-loading them later

## Saving the current session

At any point in a scripting or CLI session, you can save the current state of all the variables using the following syntax:
```js
save ${memory:location/"name"}
```
For example, to save to a local file named session.json in the /temp directory:
```js
save ${memory:"/temp/session.json"}
```

## Loading a saved session

To load a saved session, you need to do the following:
```js
var=${memory:location/"name"}
```
The returned var is ignored and the entire memory is replaced with the saved session

For example, to retrieve the session.json memory from the /temp directory:
```js
x=${memory:"/temp/session.json"}
```
