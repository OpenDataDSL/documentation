---
title: Keeping Your Secrets in Your Own Azure Key Vault
description: How to let OpenDataDSL keep or read your secrets in an Azure Key Vault in your own Azure subscription
slug: /it/key-vault
sidebar_position: 5
tags:
  - security
  - azure
  - key vault
  - secret
---
OpenDataDSL keeps the [secrets](/docs/odsl/service/secret) your scripts and processes use, such as passwords and API tokens, in its own Azure Key Vault. You can choose to keep them in an Azure Key Vault in your own Azure subscription instead, so the values never leave your control and you can see, audit and rotate them yourself.

This guide explains the two ways it can work, how to give OpenDataDSL access to your vault, and what changes for the people who use secrets.

## Two ways to work

|**Access**|**Who adds and changes secrets**|**Role you give OpenDataDSL**|
|-|-|-|
|**Read and write**|Your users, in OpenDataDSL, as today. The values are written to your vault|**Key Vault Secrets Officer**|
|**Read only**|You, in your key vault. OpenDataDSL only reads them|**Key Vault Secrets User**|

Choose **read only** if your security team wants to be the only one who can change secrets. Choose **read and write** if your users should keep managing secrets in OpenDataDSL.

OpenDataDSL signs in to **your** Microsoft Entra ID tenant as its own application, so you never share a key or password with us. If you have already given OpenDataDSL access to an [Azure Batch account](/docs/it/batch-accounts), it is the same application, and you can skip the consent step.

## Prerequisites

You need:

* An Azure Key Vault in your subscription
* A **Global Administrator**, **Cloud Application Administrator** or **Application Administrator** in your Microsoft Entra ID tenant, to grant consent to the OpenDataDSL application
* An **Owner** or **User Access Administrator** on the key vault, to give the application access
* The OpenDataDSL **application (client) ID**, which OpenDataDSL support provides

## Step 1: Grant consent to the OpenDataDSL application

Granting consent creates a service principal for the OpenDataDSL application in your Entra ID tenant: the identity you give access to in the next step.

As a tenant administrator, open this URL in a browser, replacing the two placeholders:

```
https://login.microsoftonline.com/<your-tenant-id>/adminconsent?client_id=<opendatadsl-application-id>
```

Sign in and accept. You may then be redirected to a page that shows an error. That's expected: consent has still been granted. Alternatively, with the Azure CLI:

```bash
az ad sp create --id <opendatadsl-application-id>
```

## Step 2: Give the application access to the vault's secrets

How you do this depends on the vault's **permission model**, shown under **Settings > Access configuration** on the key vault.

### Azure role-based access control

Assign the role for the access you chose, on the key vault only:

|**Access**|**Role**|
|-|-|
|Read and write|**Key Vault Secrets Officer**|
|Read only|**Key Vault Secrets User**|

In the Azure portal: open the key vault, select **Access control (IAM) > Add > Add role assignment**, choose the role, then on the **Members** tab select **User, group, or service principal** and find **OpenDataDSL**. Or with the Azure CLI:

```bash
az role assignment create \
  --assignee <opendatadsl-application-id> \
  --role "Key Vault Secrets Officer" \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.KeyVault/vaults/<key-vault-name>
```

### Access policies

Add an access policy for the OpenDataDSL application with these **secret permissions**:

|**Access**|**Secret permissions**|
|-|-|
|Read and write|Get, List, Set, Delete|
|Read only|Get, List|

With the Azure CLI:

```bash
az keyvault set-policy \
  --name <key-vault-name> \
  --spn <opendatadsl-application-id> \
  --secret-permissions get list set delete
```

Either way, OpenDataDSL can't see or change your vault's keys, certificates, settings or anything else in your subscription.

### Networking

If the vault's firewall only allows selected networks, OpenDataDSL needs to be allowed in. Ask OpenDataDSL support for the addresses to add.

## Step 3: Send the details to OpenDataDSL

|**Detail**|**Example**|**Where to find it**|
|-|-|-|
|Vault URI|`https://acme-secrets.vault.azure.net`|The key vault's **Overview** page, **Vault URI**|
|Entra ID tenant ID|`00000000-0000-0000-0000-000000000000`|**Microsoft Entra ID > Overview**, **Tenant ID**|
|Access|Read only|The access you chose|

OpenDataDSL tests the connection and switches your tenant to your vault. Only OpenDataDSL administrators can change where a tenant's secrets are kept.

## Using secrets

Scripts and processes use secrets exactly as before:

```js
url = "https://web-api.tp.entsoe.eu/api?securityToken=" + ${secret:"ENTSOE_TOKEN"}
```

|**Situation**|**What happens**|
|-|-|
|A secret saved in OpenDataDSL with read and write access|The value is written to your vault, named `odsl-` and the secret's name, for example `odsl-ENTSOE-TOKEN-69e3f579` (characters a vault name can't have become `-`, and a short code keeps names apart)|
|A secret you created in your vault yourself|Use it by its name in the vault. Vault names can't contain `_`, so `${secret:"ENTSOE_TOKEN"}` also finds a vault secret called `ENTSOE-TOKEN`|
|Saving a secret in OpenDataDSL with read only access|Refused: add or change the secret in your vault|
|Secrets saved before you switched|They stay in the OpenDataDSL vault and keep working. With read and write access, each one moves to your vault the next time it is saved|
|Deleting a secret in OpenDataDSL|With read and write access it is also deleted from your vault, which keeps it as deleted for its retention period. With read only access, your vault isn't changed|

A secret that is disabled, not yet valid or expired in your vault can't be read.

## Removing access

To stop OpenDataDSL using your vault, ask OpenDataDSL support to switch your tenant back to the OpenDataDSL vault, then remove the role assignment or access policy. Secrets that were kept in your vault have to be saved again in OpenDataDSL, with their values, before scripts can use them again.

If you remove the role first, scripts that use secrets fail until access is restored.

## Troubleshooting

|**Symptom**|**Likely cause**|
|-|-|
|Not found in the directory (`AADSTS700016`)|Consent hasn't been granted in step 1, or the tenant ID sent to OpenDataDSL is wrong|
|`Forbidden` or not authorized|The role or access policy is missing, or a role assignment hasn't taken effect yet (it can take a few minutes)|
|`ForbiddenByFirewall`|The vault firewall doesn't allow OpenDataDSL in|
|A secret isn't found|It has a different name in the vault. Remember that `_` is read as `-`|

## More information

* [Azure Key Vault role-based access control](https://learn.microsoft.com/azure/key-vault/general/rbac-guide)
* [Azure Key Vault access policies](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy)
* [Running processes on your own Azure Batch account](/docs/it/batch-accounts)
