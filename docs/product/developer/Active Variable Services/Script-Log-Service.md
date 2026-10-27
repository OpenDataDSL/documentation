---
title: Script Log Service
description: The scriptlog service in the ODSL language
slug: /odsl/service/scriptlog
tags:
  - service
  - scriptlog
---

# Script Log Service

The **scriptlog** active variable service gives your scripts access to the log of each script run. It uses the [Script Log REST service](/docs/api/rest/service/scriptlog), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${scriptlog:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${scriptlog}

// Delete an item, or roll back to its previous version
delete ${scriptlog:"6721f0c2a4b9e85d3c0f1a77"}
```
