---
title: Queue Service
description: The queue service in the ODSL language
slug: /odsl/service/queue
tags:
  - service
  - queue
---

# Queue Service

The **queue** active variable service gives your scripts access to your message queues. It uses the [Queue REST service](/docs/api/rest/service/queue), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${queue:"etrm"}

// Find items
items = find ${queue}

// Save an item
save ${queue:item}

// Delete an item, or roll back to its previous version
delete ${queue:"etrm"}
```
