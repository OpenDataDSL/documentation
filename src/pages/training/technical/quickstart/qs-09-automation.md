---
slug: /training/technical/qs-automation
title: "QuickStart: Automation"
sidebar_position: 18
tags: [training, technical, odsl, quickstart]
---

# QuickStart: Automation

Creating workflows and processes to automate tasks in OpenDataDSL.

---

## Introduction

Automation in OpenDataDSL is built around two concepts:

- **Workflow** — a flow diagram of actions, events, and gateways that defines the steps of a task
- **Process** — a configuration that schedules and runs a workflow with specific inputs

---

## Workflows

A workflow consists of a start node, one or more **actions** (units of work), **gateways** (decision points), and an end event.

| Term | Description |
|------|-------------|
| Action | A unit of work that runs some code |
| Gateway | A decision node that routes execution |
| Phase | A section of a workflow that can be monitored and retried independently |
| Transition | A connector between steps |

### Simplest Workflow

```js
//#region
use training

wf_hello = workflow in "test"
    WF_START
        "ok" -> stopok
    end
    WF_EVENT stopok as "success"
        return "ok"
    end
end

save ${workflow:wf_hello}
print "Workflow saved"
//#endregion
```

### Creating an Action

An action defines its inputs, outputs, and exit transitions. The code inside runs when the workflow reaches that step.

```js
hello_message = action in "general"
    in user as Scalar
    out message as Scalar
    exit "ok"

    output.message = "Hello " + input.user
    return "ok"
end
```

Save the action to the server so the workflow can load it by reference:

```js
//#region
use training
save ${action:hello_message}
print "Action saved"
//#endregion
```

### Workflow with an Action

```js
//#region
use training

wf_hello = workflow in "test"
    in user as Scalar

    WF_START
        "ok" -> act_print
    end

    phase "MAIN"
        WF_ACTION act_print ai
            "ok" -> stopok
            ai.user = input.user
            result = ${action:"hello_message"}.run(ai, output)
        end
    end

    WF_EVENT stopok as "success"
        return "ok"
    end
end

save ${workflow:wf_hello}
print "Workflow saved"
//#endregion
```

### Running the Workflow Manually

```js
//#region
use training
objin = Object()
objin.user = "ODSL"
objout = Object()
wf_hello.run(objin, objout)
print objout.wf_hello.act_print.message
// >> Hello ODSL
//#endregion
```

---

## Processes

A process configures and schedules the running of a workflow. You can create multiple processes using the same workflow but with different inputs and schedules.

### Creating a Process

```js
//#region
use training

process = Process()
process.service = "TEST"
process.name = "HELLO_ODSL"
process.workflow = "wf_hello"
process.input.user = "ODSL"
process.cron = "0 17 ? * MON,TUE,WED,THU,FRI *"

save ${process:process}
print "Process saved — runs weekdays at 17:00"
//#endregion
```

### Multiple Processes from One Workflow

```js
//#region
use training

process2 = Process()
process2.service = "TEST"
process2.name = "HELLO_WORLD"
process2.workflow = "wf_hello"
process2.input.user = "World"
process2.cron = "0 16 ? * MON,TUE,WED,THU,FRI *"

save ${process:process2}
print "Second process saved — runs weekdays at 16:00"
//#endregion
```

:::tip Cron Syntax
Cron schedules follow the Quartz cron format: `seconds minutes hours day-of-month month day-of-week year`. The example above runs at 17:00 every weekday.
:::

:::note Completed QuickStart Developer Track
You have completed all nine modules of the QuickStart Developer track. Explore the [General Tutorials](/training/technical/gt-running-code) for additional topic-specific guides.
:::
