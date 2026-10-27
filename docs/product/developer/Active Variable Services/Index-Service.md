---
title: Index Service
description: The index service in the ODSL language
slug: /odsl/service/index
tags:
  - service
  - index
---

# Index Service

The **index** active variable service gives your scripts access to the database indexes on your services. It uses the [Index REST service](/docs/api/rest/service/index), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${index:"region_1"}

// Find items
items = find ${index}

// Save an item
save ${index:item}

// Delete an item, or roll back to its previous version
delete ${index:"region_1"}
```

See [Index](/docs/odsl/variable/index) for the variable this service holds.
