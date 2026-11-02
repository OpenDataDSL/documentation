---
title: Reference
description: Keyboard shortcuts, the checks the Workflow Manager makes, and how the diagram maps to the workflow code
slug: /extensions/workflow-manager/reference
sidebar_position: 6
tags: [extension, workflow manager, reference]
---

# Reference

## Keyboard shortcuts

| Keys | Where | Does |
|-|-|-|
| Ctrl+S | Anywhere | Save |
| Ctrl+Z, Ctrl+Y | Canvas | Undo, redo |
| Delete | Canvas | Delete the selected activity or connection |
| Escape | Canvas | Clear the selection |
| Escape | Expanded view | Go back to the normal view |
| Double click | Activity | Edit its name |
| Ctrl+Enter | Action editor | Run the action |
| F5 | Action editor | Debug the action (continue while paused) |
| F9 | Action editor | Set or remove a breakpoint |
| F10, F11, Shift+F11, Shift+F5 | Action editor, while debugging | Step over, step into, step out, stop |

## How the diagram maps to the code

| On the diagram | In the code |
|-|-|
| Start and its connection | `WF_START` with `"ok" -> first_activity` |
| Action | `WF_ACTION name input_variable` with its inputs (`input_variable.url = ...`) and the run line `result = ${action:"id"}.run(input_variable, output)` |
| Gateway with an action | `WF_GATEWAY` with the run line of the gateway action |
| Gateway with decision code | `WF_GATEWAY` with the code; the last assignment gives the exit |
| Sub-workflow | `WF_WORKFLOW` with `result = ${workflow:"id"}.run(input_variable, output)` |
| End event | `WF_EVENT name as "success"` (or `"failed"`) with its code and `return` |
| Connection | `"exit" -> next_activity` inside the block |
| Phase box | `phase "NAME" retries 3 delay 10 minutes then reschedule 1 hours external` around its blocks |
| Positions | The `// @layout` comment before the final `end` |

An action's outputs are kept on `output.<activity name>.<output name>`.

## Checks

| Level | Check |
|-|-|
| Error | The Start is not connected, or leads to an activity that does not exist |
| Error | There is no end event |
| Error | An action or sub-workflow has nothing chosen to run |
| Error | A gateway without an action has no decision code, or code that is not an assignment |
| Error | An action, gateway or sub-workflow is not in a phase |
| Error | Two activities, phases, inputs or outputs have the same name, or a name is not valid |
| Error | A connection leads to an activity that does not exist |
| Warning | An exit is not connected: the run fails if it is taken |
| Warning | A required input of an action is not set |
| Warning | An activity cannot be reached from the Start |
| Warning | The action or workflow an activity runs was not found, or does not have an exit that is routed |

## Permissions

The Workflows menu item is controlled by the feature `odsl.workflow_manager.manage` in the feature policy `extension.odsl.workflow_manager`. Saving workflows and processes follows your security policies for the workflow and process services.
