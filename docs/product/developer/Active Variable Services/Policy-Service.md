---
title: Policy Service
description: The policy service in the ODSL language
slug: /odsl/service/policy
tags:
  - service
  - policy
---

# Policy Service

The **policy** active variable service gives your scripts access to your security policies. It uses the [Policy REST service](/docs/api/rest/service/policy), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${policy:"NGE.READ.GAS"}

// Find items
items = find ${policy}

// Save an item
save ${policy:item}

// Delete an item, or roll back to its previous version
delete ${policy:"NGE.READ.GAS"}
```

See [Policy](/docs/odsl/variable/policy) for the variable this service holds.
