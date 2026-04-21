---
slug: /training/technical/gt-environments
title: "Tutorial: Working with Data Environments"
sidebar_position: 21
tags: [training, technical, odsl, environments]
---

# Tutorial: Working with Data Environments

Understanding data environments and how to use them to isolate and protect your data.

---

## What is a Data Environment?

A data environment is a physically independent space where all your data, settings, workflows, and scripts reside. Environments are typically used to separate:

- **Production** — live, trusted data
- **Test** or **QA** — data used for testing features without affecting production
- **Develop** — experimental or in-progress work

Everything in an environment is isolated from other environments, including:

Actions, Audit records, Calendars, Curve management, Data, Extractors, Groups, Objects, Processes, Report configurations, Security policies, Scripts, Transformers, Types, and Workflows.

:::note Environment Quota
By default, each tenant has a maximum of 3 environments (including production). Contact OpenDataDSL to request additional environments.
:::

---

## Creating an Environment

```js
//#region
training = Object()
training.description = "Training environment"
save ${environment:training}
print "Training environment created"
//#endregion
```

---

## Switching to an Environment

Use the `use` command to direct all subsequent reads and writes to a named environment:

```js
use training
```

Any entity saved after this command will be stored in the `training` environment, not production.

---

## Listing Environments

```js
//#region
environments = find ${environment}
print environments
print "There are currently " + environments.size + " environments"
//#endregion
```

Each environment object contains:

| Property | Type | Description |
|----------|------|-------------|
| `_id` | String | The environment identifier |
| `_createdBy` | String | Email of the creator |
| `_size` | Number | Size in bytes |
| `_timestamp` | DateTime | When the environment was created |

---

## Deleting an Environment

:::warning Destructive Action
Deleting an environment permanently deletes **all** data within it. This cannot be undone.
:::

```js
//#region
delete ${environment:"training"}
print "Environment deleted"
//#endregion
```

:::note
You cannot delete the `production` environment.
:::

---

## Best Practice

Always do the following before running any training or experimental code:

1. Create a dedicated environment (e.g. `training`)
2. Add `use training` at the top of every script
3. Verify your changes in the training environment before applying anything to production
