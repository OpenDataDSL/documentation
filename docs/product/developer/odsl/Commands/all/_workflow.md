Create a workflow

#### Syntax
```js
varname = workflow IN "category"
  (comment)? 
  (actionInput|actionOutput)* 
  (actionExit)?
  workflowStart (phase|workflowEvent|NL|comment)*
end

workflowStart: WF_START
  workflowTransition
end
workflowBody: (workflowEvent|workflowAction|workflowGateway|workflowWorkflow)
workflowEvent: WF_EVENT varname AS "string"
  (assign|comment|returnstmt|workflowTransition)* 
end
workflowAction: WF_ACTION varname input
  (assign|comment|workflowTransition)* 
end
workflowGateway: WF_GATEWAY varname input
  (assign|comment|workflowTransition)* 
end
workflowWorkflow: WF_WORKFLOW varname input
  (assign|comment|workflowTransition)* 
end
workflowTransition: "name" -> connection

// Workflow phases
phase: phase "name" (retries INT)? (delay INT TIMEUNIT)? (then reschedule)? (external)?
  (statement|workflowBody)* 
end
reschedule: reschedule INT TIMEUNIT
fail: fail expression
abort: abort expression
```
#### Description

The configuration of a workflow is best done using the workflow GUI in the web portal (Not available yet), but it can also be done in OpenDataDSL code.

##### Anatomy of a workflow

A workflow has some input, output and exit configuration at the start - just like an action. The input information is passed in via a process or as an object if running the workflow manually.

###### Workflow Blocks

All workflows have building blocks in them:

*   WF_START - There must be exactly 1 of these, which indicates the start point and it only contains a transition which is the first workflow element that is called    
*   WF_ACTION - This is a block which configures a workflow [action](/docs/odsl/variable/action). You can:    
    *   define the action transition routing, i.e. the route to take given the transition information when the action completes        
    *   assign the action input variables from the workflow input or any previous action outputs        
    *   run the action using the input variables        
*   WF_GATEWAY - This block configures a workflow gateway. It is configured in the same way as an action block and is generally used to route workflows according to an expression    
*   WF_WORKFLOW - This block configured a sub-workflow, it is configured in the same way as an action - NOTE than any workflow can be used as a sub-workflow    
*   WF_EVENT - This is generally used as an end point of a workflow and is used to return the transition information back to the calling application.
    

###### Workflow Phase

A workflow can nest its WF_ACTION, WF_GATEWAY and WF_WORKFLOW blocks in a phase.

It is recommended that you use phases in a workflow for the following reasons:

*   It breaks a workflow into distinct sections which get reported in real-time whilst the workflow is executing    
*   It allows you to time sections of the workflow    
*   Each phase allows for custom configuration of retries, retry delay and rescheduling
    

#### Examples

```js
wf_xml_extract = workflow in "data-loaders"
    // Extract some data
    in url as Scalar
    exit "success", "failed"
    
    WF_START
        "ok" -> act_extract_xml
    end

    phase "EXTRACT"
        WF_ACTION act_extract_xml ai
            "ok" -> stopok
            "failed" -> stopfailed
            ai.url = input.url
            result = ${action:"#extract_xml"}.run(ai, output)    
        end
    end

    WF_EVENT stopok as "success"
        return "ok"
    end
    WF_EVENT stopfailed as "failed"
       return "failed"
    end
end
```

As a line-by-line breakdown of this workflow

1. Define a workflow called wf_xml_extract in the category data-loaders
2. Set a description for this workflow
3. Define an input variable called url which is a [Scalar](/docs/odsl/variable/scalar)
4. Define exit transitions for the workflow as success and failed
6. Define the workflow start point
7. Transition to the action named act\_extract\_xml (the transition name is ignored)
10. Define a workflow phase called EXTRACT
11. Define an action block called act\_extract\_xml with an input variable called ai
12. Route the “ok” transition to stopok
13. Route the “failed” transition to stopfailed
14. Set the url on the action input to be the input url (passed in by the [process](/docs/odsl/dm/workflow))
15. Run the #extract_xml action passing in the ai variable and the global output variable
19. Define the stopok event as a success transition for the whole workflow
22. Define the stopfailed event as a failed transition for the whole workflow

