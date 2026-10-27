---
title: Task Service
description: The task service in the ODSL language
slug: /odsl/service/task
tags:
  - service
  - task
---

# Task Service

The **task** active variable service gives your scripts access to tasks assigned to users. It uses the [Task REST service](/docs/api/rest/service/task), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${task:"64255eae35f43713c1afa927"}

// Find items
items = find ${task}

// Save an item
save ${task:item}

// Tag the current version
tag ${task:"64255eae35f43713c1afa927"} as PROD

// Delete an item, or roll back to its previous version
delete ${task:"64255eae35f43713c1afa927"}
```

See [Task](/docs/odsl/variable/task) for the variable this service holds.
