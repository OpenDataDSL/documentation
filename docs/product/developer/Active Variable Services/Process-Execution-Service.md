---
title: Process Execution Service
description: The exec service in the ODSL language
slug: /odsl/service/exec
tags:
  - service
  - exec
---

# Process Execution Service

The **exec** active variable service gives your scripts access to the process execution logs. It uses the [Process Execution REST service](/docs/api/rest/service/process-execution), so the same rules and permissions apply.

## Using the service

```js
// Read an execution log
log = ${exec:"6090915ad6a48d0b3c4f663d"}

// Find the failed executions of a process
failed = find ${exec} where name == "ECB_FX" and status == "failed"

// Stop a running execution
delete ${exec:"6090915ad6a48d0b3c4f663d"}
```

You cannot save to this service. To run a process, use the [process service](./process).
