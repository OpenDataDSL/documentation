---
title: Automation Log Service
description: The automationlog service in the ODSL language
slug: /odsl/service/automationlog
tags:
  - service
  - automationlog
---

# Automation Log Service

The **automationlog** active variable service gives your scripts access to the log of each automation run. It uses the [Automation Log REST service](/docs/api/rest/service/automationlog), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${automationlog:"6721f0c2a4b9e85d3c0f1a77"}

// Find items
items = find ${automationlog}

// Delete an item, or roll back to its previous version
delete ${automationlog:"6721f0c2a4b9e85d3c0f1a77"}
```
