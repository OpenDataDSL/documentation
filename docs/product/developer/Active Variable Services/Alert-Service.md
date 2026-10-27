---
title: Alert Service
description: The alert service in the ODSL language
slug: /odsl/service/alert
tags:
  - service
  - alert
---

# Alert Service

The **alert** active variable service gives your scripts access to alert definitions: the conditions that raise alerts. It uses the [Alert REST service](/docs/api/rest/service/alert), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${alert:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${alert}
publicItems = find ${alert:public}

// Save an item
save ${alert:item}

// Delete an item, or roll back to its previous version
delete ${alert:"6721f0c2a4b9e85d3c0f1a77"}
```

See [Alert](/docs/odsl/variable/alert) for the variable this service holds.
