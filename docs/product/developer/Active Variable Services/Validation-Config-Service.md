---
title: Validation Config Service
description: The validationconfig service in the ODSL language
slug: /odsl/service/validationconfig
tags:
  - service
  - validationconfig
---

# Validation Config Service

The **validationconfig** active variable service gives your scripts access to the validation checks configured for each curve and timeseries. It uses the [Validation Config REST service](/docs/api/rest/service/validationconfig), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${validationconfig:"NGE.GAS.TTF:MID"}

// Find items
items = find ${validationconfig}

// Save an item
save ${validationconfig:item}

// Tag the current version
tag ${validationconfig:"NGE.GAS.TTF:MID"} as PROD

// Delete an item, or roll back to its previous version
delete ${validationconfig:"NGE.GAS.TTF:MID"}
```
