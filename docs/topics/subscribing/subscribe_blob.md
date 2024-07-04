---
slug: /topics/subscribe/blob
title: Target - Azure Blob
description: A subscription target to automate sending data to an Azure Blob
tags:
- subscription
- azure
- blob
- target
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Azure Blob target is used to write data to:
* Azure Blob Storage
* Azure Data Lake Storage Gen2

## Azure Storage Configuration
In order for our application to create and update blobs in your Azure storage container, you need to add a role assignment to the OpenDataDSL application.

### Adding an access role
To give access, perform the following:

* In the Azure Portal, navigate to the Storage Account you want to use
* Select Access Control (IAM)
* Click 'Add Role Assignment' from the dropdown add button
* Select 'Storage Blob Data Contributor' and click 'Next'
* Click 'Select members'
* Type 'OpenDataDSL' in the search box and select the application and click 'Select'
* Click 'Review + assign' (twice)
* You can optionally add a condition to the role to limit the container or path that the application has access to

## Configuring a subscription target
The **name** of this target is ```BlobTarget```

To configure the write blob action, you need to provide the following:
* **storage**
  > The url of the storage container
* **adls**
  > A boolean - true if this is an Azure Data Lake Storage GEN 2 container
* **container**
  > The name of the container in the configured Azure Storage Account
* **path**
  > The optional path to place the blob into

## Examples

To add a blob target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select BlobTarget
* Fill out the storage, adls, container and path fields appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a blob target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addBlobTarget("https://odslonline.dfs.core.windows.net", true, "mycontainer", "files/test")
save sub
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/subscription/v1
Authorization: Bearer {{token}}

{
    "name": "MySubscription",
    "targets":[{
      "name": "BlobTarget",
      "storage": "https://odslonline.dfs.core.windows.net",
      "adls": true,
      "container": "mycontainer",
      "path": "files/test"
    }]
}
```

</TabItem>
</Tabs>

