---
slug: /training/administrator/secrets
title: "Module 05: Secrets Management"
sidebar_position: 6
tags: [training, administrator, security, secrets]
---

# Module 05: Secrets Management

Scripts and processes often need a password, token or account key to reach an external system. In this module you will keep those values in the secret service, use them from scripts without exposing them, and rotate and retire them safely.

## Learning Objectives

By the end of this module you will be able to:

- Explain what a secret is and how it differs from an ordinary variable
- Create a secret with a validity period
- List secrets and read one by id
- Use a secret in a script, for example as an API token or storage key
- Rotate, disable and delete secrets
- Manage secrets with the REST API

---

## Step 1: What Is a Secret?

A **secret** is a scalar whose value cannot be printed or logged. If you print it, you only see stars:

```
********
```

Secrets are stored in the `secret` service, where scripts, workflows and processes can retrieve them by id. Use them for passwords, API tokens, storage account keys and database connection information.

| Property | Description |
|----------|-------------|
| `id` | The name of the secret |
| `value` | The actual secret |
| `enabled` | Whether the secret can be used, defaults to true |
| `notBefore` | Optional date the secret is valid from |
| `expires` | Optional date the secret is valid to |

:::warning
Never put a real password or key in a script, a process `input` or a master data property. Anyone who can read the script or the process can see it. Store it as a secret and refer to it by id.
:::

---

## Step 2: Create a Secret

The variable name becomes the secret id. Replace the placeholder with the real value when you run it, and do not save the script with the real value in it.

```js
//#region Create a secret
ENTSOE_TOKEN = Secret("<your-entsoe-token>")
ENTSOE_TOKEN.notBefore = "2026-11-01"
ENTSOE_TOKEN.expires = "2027-10-31"
save ENTSOE_TOKEN
print "Secret saved"
//#endregion
```

:::tip
Set an `expires` date that matches the supplier's own expiry, so the secret is retired when the credential is.
:::

---

## Step 3: List and Read Secrets

`find` lists your secrets without their values:

```js
//#region List secrets
secrets = find ${secret}
print secrets
//#endregion
```

To use the value, read a secret by its id:

```js
//#region Read one secret
token = ${secret:"ENTSOE_TOKEN"}
print token
//#endregion
```

Printing still shows only stars, but the value can be used wherever a password or token is needed.

---

## Step 4: Use a Secret in a Script

As an API token in a URL:

```js
//#region Use a secret as a token
url = "https://web-api.tp.entsoe.eu/api?securityToken=" + ${secret:"ENTSOE_TOKEN"}
//#endregion
```

As an Azure Blob Storage account key:

```js
//#region Use a secret as a storage key
key = ${secret:"nge-blob-key"}
prices = ${azblob:"https://ngestorage.blob.core.windows.net/prices/daily/ttf.csv","AccountKey=" + key.value}
//#endregion
```

The same pattern works for the password option of the mail service and other services that take credentials. You will use these in [Module 07](/training/administrator/connections).

---

## Step 5: Rotate a Secret

Either read the secret and update it, or save a new secret with the same id:

```js
//#region Rotate a secret
// Extend the validity of the current value
ex = ${secret:"ENTSOE_TOKEN"}
ex.expires = "2028-10-31"
save ex

// Or replace the value under the same id
ENTSOE_TOKEN = Secret("<your-new-entsoe-token>")
ENTSOE_TOKEN.expires = "2028-10-31"
save ENTSOE_TOKEN
//#endregion
```

Because scripts refer to the secret by id, nothing else needs to change when you rotate it.

---

## Step 6: Disable or Delete a Secret

Disable a secret when you suspect it has leaked but are not ready to remove it:

```js
//#region Disable a secret
ex = ${secret:"ENTSOE_TOKEN"}
ex.enabled = false
save ex
//#endregion
```

Delete it when it is no longer needed:

```js
//#region Delete a secret
delete ${secret:"ENTSOE_TOKEN"}
//#endregion
```

:::note
After disabling or deleting a secret, check the processes that use it. Their next run is likely to fail, and the failure will show in the execution dashboard (see [Module 09](/training/administrator/processes)).
:::

---

## Step 7: Secrets in the REST API

The [Secret REST API](/docs/api/rest/service/secret) is a full CRUD API:

| Method | Path | Description |
|--------|------|-------------|
| GET | `v1` | List secrets. Each shows a reference to where it is kept in place of its value |
| GET | `v1/{key}` | Retrieve one secret with its value |
| POST | `v1` | Create or update a secret |
| DELETE | `v1/{key}` | Delete a secret |

```json
POST https://api.opendatadsl.com/api/secret/v1
Authorization: Bearer {{token}}

{
  "_type": "VarSecret",
  "_id": "SUPPLIER_FTP_PASSWORD",
  "value": "<placeholder-password>",
  "enabled": true,
  "expires": "2027-12-31"
}
```

If a request fails, the reason is in the `x-odsl-error` response header.

---

## Step 8: Credentials for External Data Connections

Some data connections, such as Morningstar, need each user's own credentials. Users store them with the user service, and the password is kept in the secret store, never in the user record:

```
PUT https://api.opendatadsl.com/api/user/v1/morningstar/<username>/<password>
Authorization: Bearer {{token}}
```

---

## Exercise

1. Create a secret called `TRAINING_TOKEN` with a placeholder value and an `expires` date three months from today.
2. List your secrets and confirm `TRAINING_TOKEN` is there without its value.
3. Read it by id and print it: you should only see stars.
4. Disable it, then delete it.

---

## Summary

| Task | ODSL |
|------|------|
| Create | `s = Secret("value")` then `save s` |
| List (no values) | `find ${secret}` |
| Read and use | `${secret:"ID"}` |
| Rotate | Save a new `Secret` with the same id |
| Disable | Set `enabled = false` and save |
| Delete | `delete ${secret:"ID"}` |

:::note Next Step
In [Module 06](/training/administrator/audit) you will use the audit trail to see who changed what, when and why.
:::
