---
title: AI Agent Service
description: The aiagent service in the ODSL language
slug: /odsl/service/aiagent
tags:
  - service
  - aiagent
---

# AI Agent Service

The **aiagent** active variable service gives your scripts access to your Fusion AI agents. It uses the [AI Agent REST service](/docs/api/rest/service/aiagent), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${aiagent:"morning-gas-check"}

// Find items
items = find ${aiagent}

// Save an item
save ${aiagent:item}

// Delete an item, or roll back to its previous version
delete ${aiagent:"morning-gas-check"}
```

See [AI Agent](/docs/odsl/variable/ai) for the variable this service holds.
