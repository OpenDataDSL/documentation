---
title: Running Processes on Your Own Azure Batch Account
description: How to let OpenDataDSL run processes on an Azure Batch account in your own Azure subscription
slug: /it/batch-accounts
sidebar_position: 4
tags:
  - security
  - azure
  - batch
  - process
---
By default, every OpenDataDSL process runs in the OpenDataDSL Azure Batch account. You can also run selected processes on an Azure Batch account in your own Azure subscription, for example to keep compute inside your own network, use your own VM sizes, or run your own container images next to your own data.

This guide explains what you need to set up in Azure, how to give OpenDataDSL permission to submit work to your batch account, and how to point a process at it.

## How it works

1. You create (or reuse) an Azure Batch account, a pool that can run containers, and a job on that pool.
2. You give the OpenDataDSL application permission to submit tasks to that batch account. OpenDataDSL signs in to **your** Microsoft Entra ID tenant as its own application, so you never share a batch account key with us.
3. OpenDataDSL registers the batch account against your tenant under a name you choose.
4. You set `batchAccount` in the settings of any process that should run there.

When the process runs, OpenDataDSL submits a task to your job. The task runs the container image named in the process settings.

:::info Only container image processes
Processes that run on your own batch account must run a container image (the `image` process setting). Standard ODSL script and workflow processes always run in the OpenDataDSL batch account, as they need access to platform services that are never exposed outside OpenDataDSL.
:::

## What OpenDataDSL can and cannot do

OpenDataDSL is given the **Azure Batch Job Submitter** built-in role on your batch account only. With this role OpenDataDSL can:

* Submit tasks to jobs in the batch account
* Read the status of jobs and tasks
* Terminate tasks (for example when a user stops a running process)

OpenDataDSL **cannot**:

* Create, resize or delete pools
* Change the batch account, its keys or its networking
* Access any other resource in your subscription

Role-based access control only applies to Microsoft Entra ID sign-ins. A batch account shared key gives full control of the account, so OpenDataDSL never asks for one.

## Prerequisites

You need:

* An Azure subscription where you can create resources
* A **Global Administrator**, **Cloud Application Administrator** or **Application Administrator** in your Microsoft Entra ID tenant, to grant consent to the OpenDataDSL application
* An **Owner** or **User Access Administrator** on the batch account (or its resource group), to assign the role
* The OpenDataDSL **application (client) ID**, which OpenDataDSL support provides

## Step 1: Prepare the batch account

If you don't already have one, create an Azure Batch account in the Azure portal. Then:

1. Under **Settings > Configuration**, check that **Microsoft Entra ID** is one of the allowed authentication modes.
2. Create a **pool** that supports containers:
    * Use a Linux image that supports containers (for example an Ubuntu Server container image from the Azure Batch marketplace list)
    * Add a **container configuration** to the pool
    * If your images are in a private registry (for example Azure Container Registry), add the registry and its credentials to the container configuration, and optionally prefetch the images
    * Make sure the nodes have outbound internet access to `api.opendatadsl.com` if your container calls back to the OpenDataDSL API
3. Create a **job** on the pool. Give it a name you'll use as the default job, for example `odsl-jobs`. Leave the job open so tasks can be added to it.

You can create more than one job, for example one per pool, and choose the job for each process with the `job` process setting.

## Step 2: Grant consent to the OpenDataDSL application

Granting consent creates a service principal for the OpenDataDSL application in your Entra ID tenant. This is the identity you assign the role to in the next step.

If people in your organisation already sign in to OpenDataDSL with their Microsoft account, the OpenDataDSL application may already be listed under **Microsoft Entra ID > Enterprise applications**. If it is, skip to step 3.

As a tenant administrator, open this URL in a browser, replacing the two placeholders:

```
https://login.microsoftonline.com/<your-tenant-id>/adminconsent?client_id=<opendatadsl-application-id>
```

Sign in and accept. You may then be redirected to a page that shows an error. That's expected: consent has still been granted.

Alternatively, with the Azure CLI:

```bash
az ad sp create --id <opendatadsl-application-id>
```

You can check that it worked in the Azure portal under **Microsoft Entra ID > Enterprise applications**, where the OpenDataDSL application is now listed.

## Step 3: Assign the Azure Batch Job Submitter role

Assign the role to the OpenDataDSL application **on the batch account only**.

**In the Azure portal:**

1. Open the batch account and select **Access control (IAM)**.
2. Select **Add > Add role assignment**.
3. On the **Role** tab, choose **Azure Batch Job Submitter**.
4. On the **Members** tab, choose **User, group, or service principal**, select **Select members**, search for **OpenDataDSL** and select it.
5. Select **Review + assign**.

**With the Azure CLI:**

```bash
az role assignment create \
  --assignee <opendatadsl-application-id> \
  --role "Azure Batch Job Submitter" \
  --scope /subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Batch/batchAccounts/<batch-account-name>
```

Role assignments can take a few minutes to take effect.

## Step 4: Send the details to OpenDataDSL

Send these details to OpenDataDSL support:

|**Detail**|**Example**|**Where to find it**|
|-|-|-|
|A name for the batch account|`acme-batch`|Your choice. You'll use it in process settings|
|Batch account URL|`https://acmebatch.westeurope.batch.azure.com`|Batch account **Overview** page, **Account endpoint**|
|Entra ID tenant ID|`00000000-0000-0000-0000-000000000000`|**Microsoft Entra ID > Overview**, **Tenant ID**|
|Default job name|`odsl-jobs`|The job you created in step 1|

OpenDataDSL registers the batch account against your OpenDataDSL tenant. Only OpenDataDSL administrators can register batch accounts, so no one else can point processes at your account.

## Step 5: Run a process on your batch account

Add `batchAccount` and `image` to the process settings:

```json
{
    "_type": "VarProcess",
    "name": "ACME_PRICE_MODEL",
    "description": "Runs the ACME price model in our own batch account",
    "enabled": true,
    "cron": "30 18 ? * MON-FRI *",
    "settings": {
        "batchAccount": "acme-batch",
        "image": "acmeregistry.azurecr.io/price-model:1.4",
        "commandline": "/bin/sh -c 'python /app/run.py'",
        "job": "odsl-jobs",
        "maxTime": "PT2H",
        "retention": "P1D"
    }
}
```

`job` is optional: if you leave it out, the default job registered for the batch account is used. Saving a process fails if `batchAccount` names an account that isn't registered for your tenant, or if `image` is missing.

### What the task receives

The task runs with the same environment variables as a container process in the OpenDataDSL batch account. The OpenDataDSL SDKs use them to read the run's details and report its progress back to OpenDataDSL.

|**Variable**|**Description**|
|-|-|
|ODSL_TASKID|The process execution id|
|ODSL_STAGE|The OpenDataDSL environment stage|
|ODSL_SB_CPM|The connection the SDK uses to send the process status back to OpenDataDSL|
|ODSL_STORAGE_URL, ODSL_STORAGE_CONTAINER, ODSL_LOG_CONTAINER|OpenDataDSL storage used by processes|
|ODSL_TOKEN|An OpenDataDSL API access token: for a manual run, the token of the user who ran it; for a scheduled run, a 30 minute token for the process's run-as user|
|ODSL_TASK|JSON description of the run: process name, trigger, reason, input and job|
|ODSL_PROCESS|JSON of the process configuration|

Task environment variables can be read by anyone with read access to the batch account. Limit read access to the account to the people who run it.

### Logs

Task output (`stdout.txt` and `stderr.txt`) stays in your batch account and isn't copied to OpenDataDSL. Azure Batch deletes a task's files when its retention time ends. The default is 10 minutes, so set the `retention` process setting (for example `P1D`) if you want to keep them longer.

## Removing access

To stop OpenDataDSL using your batch account, do any of the following:

* Remove the **Azure Batch Job Submitter** role assignment from the batch account
* Delete the OpenDataDSL application under **Microsoft Entra ID > Enterprise applications**
* Ask OpenDataDSL support to remove the batch account registration

Processes that still reference the batch account will fail when they next run.

## Troubleshooting

|**Symptom**|**Likely cause**|
|-|-|
|`AuthorizationFailure` or `403` when the process runs|The role assignment is missing, is on the wrong scope, or hasn't taken effect yet|
|`AADSTS700016` application not found in the directory|Consent hasn't been granted in step 2, or the tenant ID registered with OpenDataDSL is wrong|
|`JobNotFound`|The job name in the process settings, or the registered default job, doesn't exist in the batch account|
|Task stays in `active` state|The pool has no nodes, or all nodes are busy|
|Task fails to start with a container error|The pool has no container configuration, or can't pull the image from your registry|

## More information

* [Role-based access control for Azure Batch](https://learn.microsoft.com/azure/batch/batch-role-based-access-control)
* [Authenticate Azure Batch service solutions with Microsoft Entra ID](https://learn.microsoft.com/azure/batch/batch-aad-auth)
* [Run container applications on Azure Batch](https://learn.microsoft.com/azure/batch/batch-docker-container-workloads)
