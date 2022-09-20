---
slug: /odsl/variable/workflow
tags:
  - workflow
---
Workflow
========================

A workflow represents a set of [actions](./Action) and transitions that form an executable flow diagram

## Construction
A workflow variable is a structure that encapsulates the actions and routing needed to run a workflow.

### Workflow structure syntax
The basic structure of a workflow is shown below:

```js
workflowname = workflow in "category"
    // Description
    (in name as type (description)? (optional)?)*
    (out name as type (description)?)*
    exit ("transition")*

    START
    (PHASE|EVENT)*
end    
```

* workflowname is the variable name that will be the id of the workflow
* category is the group to categorise the workflow with similar workflows
* description is a user description to understand what the workflow does
* the **in** syntax represent the input arguments for this workflow
* the **out** syntax represents the output data for this workflow
* the **exit** syntax represents the list of transition names from this workflow
* START is the Start event syntax
* PHASE is the Phase syntax
* EVENT is the Event syntax

### Start event syntax
The start event represents the initial point of the workflow which then routes using a transition to the first activity to run.

The **START** event is defined as:

```js
WF_START
    TRANSITION
end
```

* TRANSITION is the Transition syntax which routes to the first activity to run.

### Phase syntax
A phase represents a section of the workflow that is independently tracked and contains all the workflow activities.

The **PHASE** structure is defined as:
 
```js
phase "name" (retries int)? (delay int timeunit)? (then reschedule in timeunit)? (external)?
    (statement|WORKFLOW_BODY)*
end
```

* retries is the number of attempts to retry this phase if it fails, default is 0
* delay is the amount of time to delay before retrying, default is 30 seconds
* reschedule will happen if the retries have been exhausted and will re-run the entire workflow
* external indicates that this phase runs external to the workflow and will be reported independently
* statement is any OpenDataDSL statement
* WORKFLOW_BODY is the Workflow body syntax

### Event syntax
Events are generally used to mark the termination of a workflow to indicate success or failure.

The **EVENT** structure is defined as:

```js
WF_EVENT name as "success|failed"
    (assign|return|TRANSITION)*
end
```

* name is the activity name which can be routed to using a transition
* assign is an assignment statement, e.g. output.message = "ok"
* return is a return statement, e.g. return "ok"
* TRANSITION is the Transition syntax indicating where to route to next

### Workflow body syntax
This is the main list of activities performed by the workflow.

The **WORKFLOW_BODY** syntax is defined as:

```js
(EVENT|ACTION|GATEWAY|WORKFLOW)
```

* EVENT is an Event syntax
* ACTION is an Action syntax
* GATEWAY is a Gateway syntax
* WORKFLOW is a Workflow syntax

### Transition syntax
A transition represents a connector between activities which defines the routing within the workflow.

The **TRANSITION** syntax is defined as:

```js
"name" -> activity_name
```

* name is the name of the transition as defined by the activity you are connecting from
* activity_name is the name of the activity you want to route to

### Action syntax
An action is a configuration of a [workflow action](./Action) within the workflow.
 
The **ACTION** syntax is defined as:

```js
WF_ACTION activity_name input
    (assign|TRANSITION)*
end
```

* activity_name is the unique name (within the workflow) that you give to this activity, this will be used to route the flow to
* input is the name of the variable to assign input data to, this will be used in the configuration of the action
* assign is an assignment statement, usually used for assigning input data to the input arguments on the action
* TRANSITION is the Transition syntax used to map the exit transitions of the action to activities in this workflow

### Gateway syntax
A gateway is a special type of [Action](./Action) used as a decision node within a workflow.

The **GATEWAY** syntax is defined as:

```js
WF_GATEWAY activity_name input
    (assign|TRANSITION)*
end
```

* activity_name is the unique name (within the workflow) that you give to this activity, this will be used to route the flow to
* input is the name of the variable to assign input data to, this will be used in the configuration of the gateway
* assign is an assignment statement, usually used for assigning input data to the input arguments on the gateway
* TRANSITION is the Transition syntax used to map the exit transitions of the gateway to activities in this workflow

### Workflow syntax
The workflow syntax within a workflow is used to configure another workflow as a sub-workflow.

The **WORKFLOW** syntax is defined as:

```js
WF_WORKFLOW activity_name input
    (assign|TRANSITION)*
end
```

* activity_name is the unique name (within the workflow) that you give to this activity, this will be used to route the flow to
* input is the name of the variable to assign input data to, this will be used in the configuration of the sub-workflow
* assign is an assignment statement, usually used for assigning input data to the input arguments on the sub-workflow
* TRANSITION is the Transition syntax used to map the exit transitions of the sub-workflow to activities in this workflow

## Properties
A workflow variable has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|category|A category is used to group similar workflows together|Scalar(String)|
|description|A description of what this workflow does|Scalar(String)|
|exits|The exit transitions from this workflow|List(String)|
|id|The ID of this action|Scalar(String)|
|inputs|The input variable [args](./Arg)|List(Arg)|
|outputs|The output variable [args](./Arg)|List(Arg)|
|script|The actual code used to create this workflow|Scalar(String)|
|version|The version of this workflow|Object|

## Methods
A workflow variable has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|run(in, out)|Runs this workflow and returns the name of the exit transition|Scalar(String)|

### Example Usage
You can run a workflow in ODSL code by creating an input object and an output object.
The input object should contain the **in** arguments required by the workflow and the output object should be empty.

When the workflow runs, it populates the output object with any output arguments defined.

```js
oi = Object()
oi.user = "World"
oo = Object()
workflow.run(oi, oo)
print oo
```

Example output:
```json
{
  "_id": "oo",
  "_type": "#Object",
  "_links": {},
  "workflow": {
    "_id": "output",
    "act_print": {
      "_id": "output",
      "message": "Hello World"
    }
  }
}
```

## Further Reading
* [Workflow service](/docs/odsl/service/workflow) for saving and using workflows in the server.