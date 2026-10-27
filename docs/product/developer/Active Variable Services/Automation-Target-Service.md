---
title: Automation Target Service
description: The automationtarget service in the ODSL language
slug: /odsl/service/automationtarget
tags:
  - service
  - automationtarget
---

# Automation Target Service

The **automationtarget** active variable service gives your scripts access to the automation targets, standard and your own. It uses the [Automation Target REST service](/docs/api/rest/service/automationtarget), so the same rules and permissions apply.

Items whose id starts with # are read from public, any other id from private.

## Using the service

```js
// Read an item
item = ${automationtarget:"odsl.email"}

// Find items
items = find ${automationtarget}
publicItems = find ${automationtarget:public}

// Save an item
save ${automationtarget:item}

// Tag the current version
tag ${automationtarget:"odsl.email"} as PROD

// Delete an item, or roll back to its previous version
delete ${automationtarget:"odsl.email"}
```

See [Automation Target](/docs/odsl/variable/automation) for the variable this service holds.
