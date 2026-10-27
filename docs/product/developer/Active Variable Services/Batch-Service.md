---
title: Batch Service
description: The batch service in the ODSL language
slug: /odsl/service/batch
tags:
  - service
  - batch
---

# Batch Service

The **batch** active variable service gives your scripts access to the summaries of batch updates. It uses the [Batch REST service](/docs/api/rest/service/batch), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${batch:"a757b7cc-ed3b-41f5-b5dd-30330b967416"}

// Find items
items = find ${batch}

// Save an item
save ${batch:item}

// Delete an item, or roll back to its previous version
delete ${batch:"a757b7cc-ed3b-41f5-b5dd-30330b967416"}
```

See [Batch](/docs/odsl/variable/batch) for the variable this service holds.
