---
slug: /odsl/variable/transition
tags:
  - transition
  - workflow
---
Transition
==========================

A transition variable is the definition of a transition that is used in a [workflow](Workflow)

## Construction
A transition is only constructed as part of a workflow.
The syntax for the transition is as follows:

```js
"name" -> activity_name
```

* name is the name of the transition as defined by the activity you are connecting from
* activity_name is the name of the activity you want to route to

## Properties
A transition has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The name of the transition|Scalar(String)|
|transition|The activity name to transition to|Scalar(String)|

## Further Reading
* [Workflow](Workflow)
* [Action](Action)

