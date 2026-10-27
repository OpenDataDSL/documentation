---
title: Queue Log Service
description: The queuelog service in the ODSL language
slug: /odsl/service/queuelog
tags:
  - service
  - queuelog
---

# Queue Log Service

The **queuelog** active variable service gives your scripts access to the log of messages sent to your queues. It uses the [Queue Log REST service](/docs/api/rest/service/queuelog), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${queuelog:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${queuelog}

// Delete an item, or roll back to its previous version
delete ${queuelog:"6721f0c2a4b9e85d3c0f1a77"}
```
