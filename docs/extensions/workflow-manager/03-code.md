---
title: The workflow code
description: The ODSL a workflow diagram is written as, how changes to the code are shown in the diagram, and checking the syntax
slug: /extensions/workflow-manager/code
sidebar_position: 3
tags: [extension, workflow manager, workflows, odsl, code]
---

# The workflow code

The platform runs a workflow from its ODSL code. The **Code** tab shows the code the diagram is written as, in an editor with ODSL highlighting, and the two are kept in step:

- every change in the diagram rewrites the code;
- every change in the code is read back into the diagram half a second after you stop typing.

The code follows the [workflow syntax](/docs/odsl/variable/workflow). For Priya's workflow it starts like this:

```js
load_eex_settlements = workflow in "eex"
    // Downloads and loads the EEX settlement prices
    in ondate as Scalar "The trading day"
    exit "success", "failed"

    WF_START
        "ok" -> download
    end

    phase "DOWNLOAD" retries 3 delay 10 minutes then reschedule 1 hours
        WF_ACTION download download_in
            "ok" -> load
            "failed" -> no_file
            download_in.url = "https://example.com/eex/" + input.ondate + ".csv"
            result = ${action:"#http_download"}.run(download_in, output)
        end
    end
```

The positions of the activities on the canvas are kept in a comment at the end, `// @layout {...}`. It does not change what the workflow does. A workflow written in code without it is laid out automatically when you open it.

## When the code cannot be shown

If the code has a mistake the designer cannot read, such as a missing `end`, the line is marked in the editor, the Code tab says what is wrong, and the diagram shows a red banner and becomes read only until the code is fixed. Saving is not possible until then.

Statements written inside a phase but outside its blocks (log lines, variables) are kept as the phase's code and written at the top of the phase.

## Checking the syntax

**Check syntax** sends the code to the platform's ODSL parser and marks any errors in the editor. The same check runs when you save.

**Download** saves the code as an `.odsl` file.
