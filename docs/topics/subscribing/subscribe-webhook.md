---
slug: /topics/subscribe/webhook
title: Target - Webhook
description: A subscription target to POST data to a webhook
tags:
- subscription
- webhook
- target
- topics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```WebhookTarget```

To configure the webhook, you need to provide the following:
* **url**
  > The URL of the webhook to post the data to

### Adding a webhook target

To add a webhook target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select WebhookTarget
* Fill out the url field appropriately
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a webhook run target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addWebhookTarget("https://webhook.opendatadsl.com/data")
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
      "name": "WebhookTarget",
      "url": "https://webhook.opendatadsl.com/data"
    }]
}
```

</TabItem>
</Tabs>

