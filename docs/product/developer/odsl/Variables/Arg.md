---
slug: /odsl/variable/arg
tags:
  - action
---
Arg
===================

An arg variable is a configuration of an input or output argument of a [workflow](Workflow) or [action](Action)

## Construction
An arg is only constructed as part of an action, gateway or workflow.
The syntax for the arg is as follows:

```js
name as type (description)? (optional)?
```

* name is the variable id that you want to know this argument by
* type is the expected type of the variable
* description is the user description of the argument
* optional is a boolean that indicates this is not a mandatory argument (only relevant for input arguments)

## Properties
An arg has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The id of the argument|Scalar(String)|
|argType|The expected variable type of the argument|Scalar(String)|
|description|The user description of the argument|Scalar(String)|
|optional|A boolean indicating if this is optional or mandatory|Scalar(Boolean)|

## Further Reading
* [Workflow](Workflow)
* [Action](Action)
