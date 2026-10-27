---
title: Alert Record Service
description: The alertrecord service in the ODSL language
slug: /odsl/service/alertrecord
tags:
  - service
  - alertrecord
---

# Alert Record Service

The **alertrecord** active variable service gives your scripts access to the alerts that have been raised, with their timeline. It uses the [Alert Record REST service](/docs/api/rest/service/alertrecord), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${alertrecord:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${alertrecord}
publicItems = find ${alertrecord:public}

// Save an item
save ${alertrecord:item}

// Delete an item, or roll back to its previous version
delete ${alertrecord:"6721f0c2a4b9e85d3c0f1a77"}
```

See [Alert Record](/docs/odsl/variable/alert) for the variable this service holds.
