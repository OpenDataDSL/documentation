---
title: Documentation Service
description: The documentation service in the ODSL language
slug: /odsl/service/documentation
tags:
  - service
  - documentation
---

# Documentation Service

The **documentation** active variable service gives your scripts access to documentation for items and services. It uses the [Documentation REST service](/docs/api/rest/service/documentation), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${documentation:"NGE.GAS.TTF"}

// Find items
items = find ${documentation}
publicItems = find ${documentation:public}

// Save an item
save ${documentation:item}

// Tag the current version
tag ${documentation:"NGE.GAS.TTF"} as PROD

// Delete an item, or roll back to its previous version
delete ${documentation:"NGE.GAS.TTF"}
```

See [Documentation](/docs/odsl/variable/documentation) for the variable this service holds.
