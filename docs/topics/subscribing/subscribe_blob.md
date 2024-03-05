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

## Configuration

### Azure Storage Configuration
The Azure Storage Account where you want the blob to be written needs to be configured on your tenant.

To do this, you need to create a **shared access signature** for your storage account with the following minimum rights:
* Allowed services
  * Blob
* Allowed resource types
  * Container
  * Object
* Allowed permissions
  * Write
  * Add
  * Create

You then need to copy the connection string and add it to your tenant as follows:

```js
tenant = ${tenant:""}
tenant.properties.storage = "---paste connection string---"
save ${tenant:tenant}
```

### Configuring a subscription target
The **name** of this target is ```BlobTarget```

To configure the write blob action, you need to provide the following:
* **container**
  > The name of the container in the configured Azure Storage Account
* **path**
  > The optional path to place the blob into

### Adding a blob target

To add a blob target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select BlobTarget
* Fill out the container and path fields appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a blob target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addBlobTarget("mycontainer", "files/test")
save sub
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/service/subscription/v1
Authorization: Bearer {{token}}

{
    "name": "MySubscription",
    "targets":[{
      "name": "BlobTarget",
      "container": "mycontainer",
      "path": "files/test"
    }]
}
```

</TabItem>
</Tabs>

