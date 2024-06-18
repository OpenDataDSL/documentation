---
slug: /odsl/dm/workflow
sidebar_position: 7
title: Workflows and Processes
description: Creating and using actions, workflows, scripts and processes
tags:
  - data_management
  - workflow
  - process
  - topics
---

This guide gives detailed instructions on creating and using actions, workflows, scripts and processes

## Introduction

This guide is concerned with automation of all your data tasks: collection, transformation, derivation and loading. You can create scripts or workflows which can be scheduled of triggered by an event in order to automate a specific process.

In here, we describe how to:

*   Create and use custom actions in workflows    
*   Define workflows
*   Create processes using workflows or scripts
    
## Actions

An action is a specific technical task written in the [OpenDataDSL language](/docs/odsl) which is used as a component in a workflow. There is a public library of actions readily available to use which you can see examine, change and save to your private action library to create your own custom version.

### Creating an action

To create a new action, you need to use the action syntax in ODSL as follows:

```js
name = action in category
  // Optional comment used as the description
  (in varname as type (description)? (OPTIONAL)?)*
  (out varname as type (description)?)*
  (exit name (, name)*)?
  
  code...
  
end
```

### Action definition

The first line of an action defines the name and category of the action and an option comment can be added as the next line which will be used as the description of the action.

### Input variables

You can define all the input variables that your action requires in order to work, you can also add optional variables that could be used. The variables are properties of an Object called input, so for example if you have defined an input variable called ‘url’ you would access that in your code as 'input.url'.

### Output variables

You can define the output variables that your action produces, these variables can then be used as input variables to other actions. You set the output data on an object called output, so for example if you have defined an output variable called ‘data’, you would set data on the output variable, e.g. output.data = value

### Exit transitions

You can define all of the exit paths that your action supports

### Example action

The following action extracts XML data from a HTTP url:

```js
xml_url = action in "extractors"
    // Extract XML from a HTTP URL
    in url as Scalar "The URL to read the XML from"
    out xml as Object "The XML file converted to an ODSL Object"
    exit "ok", "failed"
    assertType(input.url, "Scalar")
    on error ignore
    output.xml=${xml:input.url}
    if error
        print error
        return "failed"
    else
        return "ok"
    end
end
```

In the above example action, we have (by line number):

1.  Defined our action called xml_url in the category “extractors”    
2.  Set a description of Extract XML from a HTTP URL    
3.  Defined an input variable called url which is used as the HTTP url to extract the XML from    
4.  Defined an output variable called xml which we will set out output xml data to    
5.  Defined 2 exit transitions: ok and failed    
6.  Check that the url input variable is a Scalar    
7.  Stop errors from being thrown by setting the 'on error ignore' statement    
8.  Attempt to get the xml from the url using the [XML active variable service](/docs/odsl/service/xml) and place the result on the output xml variable    
9.  Check to see if there was an error    
10.  Print out the error - this outputs to the process log when running as a process    
11.  Exit from the action via the failed transition    
12.  else    
13.  Exit from the action via the ok transition
    

### Saving your action

To save your [action](/docs/odsl/variable/action), you simply need to use the save statement with the [action active variable service](/docs/odsl/service/action) as shown below:

```js
save ${action:xml_url}
```

## Workflow

A workflow is configuration of actions, data and routing which performs an automated flow to process some input data through a set of coordinated steps. You can utilise actions from the public library or your own custom private library in a workflow.

### Creating a workflow

To create a workflow in code, you use the workflow syntax as shown:

```js
name = workflow in category
  // Optional comment used as the description
  (in varname as type (description)? (OPTIONAL)?)*
  (out varname as type (description)?)*
  (exit name (, name)*)?
  
  WF_START
    "name" -> startaction
  end
  
  (phase)*
  
  (WF_EVENT name as "success"
        return "ok"
  end)*
end
```

The first section of the workflow definition is exactly the same as an action. This is because a workflow can also be used as an action in another workflow and therefore it behaves the same as an action.

### WF_START

The WF_START token is mandatory and defines the first action that is called. There can only be one defined transition in the start token, the name of the transition is ignored, but the destination must match a named action in the workflow.

### PHASE

A workflow consists of 1 or more phases which are used to break a workflow down into logical stages. A phase represents the smallest level of metric reporting in the workflow, so in the workflow dashboard, you can see the individual phases, the timing information and any log messages produced in that phase.

A phase can also be used to handle errors and retries, the syntax for a phase is as follows:

```js
phase "name" (retries r)? (delay d TIMEUNIT)? (then reschedule r TIMEUNIT)? (external)?
  workflowBody
end

TIMEUNIT: (seconds|minutes|hours)
```

An explanation of the settings in the phase command:

*   Retries - this is the number of retries that will be made if an error is thrown by any action    
*   Delay - this is the amount of time to delay retrying    
*   Then reschedule - if you run out of tries, you can reschedule the entire workflow some time later    
*   External - Indicates that this phase is executed externally, i.e. data is sent to a queue and is loaded remotely
    

Within the phase sections, we configure which actions are performed using the following syntax:

```js
workflowBody: (workflowEvent|workflowAction|workflowGateway|workflowWorkflow)

workflowEvent:
WF_EVENT name as type
  (assign|comment|return|transition)*
end

workflowAction:
WF_ACTION name input
  (assign|comment|transition)*
end

workflowGateway:
WF_GATEWAY name input
  (assign|comment|transition)*
end

workflowWorkflow:
WF_WORKFLOW name input
  (assign|comment|transition)*
end

transition: "name" -> connection
```

An explanation of each of the elements that can be added into a phase:

#### workflowEvent

A workflow event represents a change of state that the workflow moves to. This is usually the end of the workflow, but future development will add custom states that you will be able to define.

An example end state event:
```js
    WF_EVENT stopok as "success"
        return "ok"
    end
```
#### workflowAction

This is the configuration of an action in a workflow and generally prepares the action with the input data and routes the exit transitions to the next connection.

An example action configuration:

```js
WF_ACTION getxml ai
  "ok" -> transformxml
  "failed" -> stopfailed
  ai.url = input.url
  result = ${action:"xml_url"}.run(ai, output)    
end
```

#### workflowGateway

This is the configuration of a gateway junction which routes the workflow based on an input expression

#### workflowWorkflow

This is the same as a workflowAction except that a sub-workflow is run in place of an action.

### Saving the workflow

To save your [workflow](/docs/odsl/variable/workflow), use the save command with the [workflow active variable service](/docs/odsl/service/workflow) as shown:

```js
save ${workflow:my_workflow}
```

## Process

A process is a scheduled or event driven workflow or script which runs in the cloud.

### Creating a process

You can create a process using the Process() constructor and setting the properties on it. The valid properties are as follows:

|**Name**|**Description**|**Type**|
|-|-|-|
|service|The type of process this is - it is used to categorise your processes|String|
|name|The name of the process|String|
|description|A description for the process|String|
|enabled|A flag showing if this process is currently enabled for running|Boolean|
|processType|The type of process, either Ristretto or Lungo|String|
|workflow|The name of the workflow to run|String|
|scriptName|The name of the script to run, will be ignored if workflow is set|String|
|settings|Any configuration settings to be used|Settings|
|input|The input object to pass into the workflow|Object|
|event|The event to check for triggering the workflow or script|Object|
|cron|A valid cron expression used for time triggering this process|String|

#### Process Type

The processType property on a process can be set to Ristretto or Lungo, the difference between the 2 is as follows:

*   Ristretto - this is used for small, short running processes (less than 6 minutes) - it is a lower cost to run    
*   Lungo - this is used for longer running processes with higher resource demands, the runtime of Lungo processes is not restricted and the cost of running is higher than Ristretto
    

#### Cron Expression

This is a valid cron expression in the format “minute hour day-of-month month day-of-week year”. So, to schedule a process to run every weekday at 5pm, use the following:

```
process.cron = "0 17 ? * MON,TUE,WED,THU,FRI *"
```

### Saving your process

To save your [process](/docs/odsl/variable/process), use the save command with the [process active variable service](/docs/odsl/service/process) as show below:

```js
save ${process:my_process}
```

:::note
A process assumes the rights (both application and data) of the user creating the process at the point of the process creation. If more rights are added to the user afterwards, the process would need to be re-updated in order to assume those new rights.
:::

### Example process configuration

Here are a few examples of creating a process:

### Scheduling a workflow

```js
process = Process()
process.service = "ETL"
process.name = "ECB_FX_WORKFLOW"
process.description = "ETL Process for ECB_FX"
process.enabled = true
process.workflow = "#xml_data_loader"
process.input.url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
process.input.tx = "ECB_FX"
process.cron = "0 17 ? * MON,TUE,WED,THU,FRI *"
save ${process:process}
```

    

