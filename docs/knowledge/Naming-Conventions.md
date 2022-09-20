---
slug: /kb/naming
tags:
  - naming
---
Naming Conventions
==================

## Variables
Variables have a specific set of rules in terms of what characters are allowed:
* It can start with a '_' or a letter (any case)
* If it starts with an '_', the second character must be a letter
* It can start with a '#' if it is a public variable - see note below
* It can contain numbers, letters or '_'

Syntax code:
```js
ID: [_]? [a-zA-Z] [a-zA-Z0-9_]*
PUBLICID: '#' ID
```

### Public and private names
In OpenDataDSL, you can have both public and private data and objects, so it is important to understand how you reference these in your scripts and objects.

If an id is prefixed with a '#' character denotes that an object is public - which is available to everyone. If not, then the object is private - which is visible only to users within your own tenancy.

Below is an example of how this works with types and objects
```js
// private type
pritype = ${type:"Person"}
// public type
pubtype = ${type:"#Location"}
// private object
johndoe = ${object:"JohnDoe"}
// public object
gb = ${object:"#LOC_GBR"}
```
