---
title: AI Task Service
description: The aitask service in the ODSL language
slug: /odsl/service/aitask
tags:
  - service
  - aitask
---

# AI Task Service

The **aitask** active variable service gives your scripts access to Fusion AI playbook tasks. It uses the [AI Task REST service](/docs/api/rest/service/aitask), so the same rules and permissions apply.

## Using the service

```js
// Read an item
item = ${aitask:"weekly-ttf-review"}

// Find items
items = find ${aitask}

// Save an item
save ${aitask:item}

// Delete an item, or roll back to its previous version
delete ${aitask:"weekly-ttf-review"}
```
