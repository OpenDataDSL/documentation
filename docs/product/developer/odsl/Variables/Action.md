---
slug: /odsl/variable/action
tags:
  - action
---
Action
======

An action variable is the definition of an action that can be used in a [workflow](Workflow)

## Construction
An action is a structure that contains some configuration information and some code to perform a task within a workflow and takes the following form:

```js
actionname = action in "category"
    // Description
    (in name as type (description)? (optional)?)*
    (out name as type (description)?)*
    exit ("transition")*

    (statement)*
    return "transition"
end
``` 

An example of a simple greeting action:
```js
hello_message = action in "general"
    // Greets the passed-in user name
    in user as Scalar
    out message as Scalar
    exit "ok"

    output.message = "Hello " + input.user
    return "ok"
end
```

## Properties
An action has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|category|A category is used to group similar actions together|Scalar(String)|
|description|A description of what this action does|Scalar(String)|
|exits|The exit transitions from this action|List(String)|
|id|The ID of this action|Scalar(String)|
|inputs|The input variable [args](./Arg)|List(Arg)|
|outputs|The output variable [args](./Arg)|List(Arg)|
|script|The actual code used to create this action|Scalar(String)|
|version|The version of this action|Object|

## Methods
An action has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|run(in, out)|Runs this action and returns the name of the exit transition|Scalar(String)|

### Example Usage
You can run an action in ODSL code by creating an input object and an output object.
The input object should contain the **in** arguments required by the action and the output object should be empty.

When the action runs, it populates the output object with any output arguments defined.

```js
oi = Object()
oi.user = "World"
oo = Object()
hello_message.run(oi, oo)
print oo
```

This outputs:
```json
{
  "_id": "oo",
  "_type": "#Object",
  "_links": {},
  "hello_message": {
    "_id": "output",
    "message": "Hello World"
  }
}
```

## Further Reading
* [Action service](/docs/odsl/service/action) for saving and using actions in the server.