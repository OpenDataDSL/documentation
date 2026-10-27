---
title: Report Creator Service
description: The reportcreator service in the ODSL language
slug: /odsl/service/reportcreator
tags:
  - service
  - reportcreator
---

# Report Creator Service

The **reportcreator** active variable service gives your scripts access to report configurations with parameters. It uses the [Report Creator REST service](/docs/api/rest/service/reportcreator), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${reportcreator:"PRICE_SUMMARY"}

// Find items
items = find ${reportcreator}
publicItems = find ${reportcreator:public}

// Save an item
save ${reportcreator:item}

// Tag the current version
tag ${reportcreator:"PRICE_SUMMARY"} as PROD

// Delete an item, or roll back to its previous version
delete ${reportcreator:"PRICE_SUMMARY"}
```

See [Report Creator](/docs/odsl/variable/reportcreator) for the variable this service holds.
