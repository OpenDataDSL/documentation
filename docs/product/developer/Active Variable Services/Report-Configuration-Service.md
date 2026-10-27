---
title: Report Configuration Service
description: The reportconfig service in the ODSL language
slug: /odsl/service/reportconfig
tags:
  - service
  - reportconfig
---

# Report Configuration Service

The **reportconfig** active variable service gives your scripts access to your report configurations. It uses the [Report Configuration REST service](/docs/api/rest/service/reportconfig), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${reportconfig:"METRICS"}

// Find items
items = find ${reportconfig}
publicItems = find ${reportconfig:public}

// Save an item
save ${reportconfig:item}

// Tag the current version
tag ${reportconfig:"METRICS"} as PROD

// Delete an item, or roll back to its previous version
delete ${reportconfig:"METRICS"}
```

See [Report Configuration](/docs/odsl/variable/report) for the variable this service holds.
