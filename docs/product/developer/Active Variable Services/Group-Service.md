---
title: Group Service
description: The group service in the ODSL language
slug: /odsl/service/group
tags:
  - service
  - group
---

# Group Service

The **group** active variable service gives your scripts access to groups of items, such as favourites, curve build groups and export groups. It uses the [Group REST service](/docs/api/rest/service/group), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${group:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${group}

// Save an item
save ${group:item}

// Tag the current version
tag ${group:"6721f0c2a4b9e85d3c0f1a77"} as PROD

// Delete an item, or roll back to its previous version
delete ${group:"6721f0c2a4b9e85d3c0f1a77"}
```

See [Group](/docs/odsl/variable/group) for the variable this service holds.
