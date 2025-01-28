---
slug: /topics/subscribe/teams
title: Target - Teams Channel 🆕
description: A subscription target to POST data to a Teams Channel webhook
tags:
- subscription
- teams
- target
- topics
- new
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```TeamsTarget```

To configure the teams channel, you need to provide the following:
* **url**
  > The URL of the teams channel webhook to post the data to
* **template**
  > The name of a mustache template to transform the input data to be displayed in teams

### Getting the teams channel URL

To get the URL for a teams channel, you need to do the following:
* Find the channel you want to send messages to
* Click on the **...** More Options button
* Select Manage channel - (If you can't see this option, you need to contact the teams channel owner to perform this task)
* In the **Connectors** section, click the edit button
* Find the Incoming Webhook connector and click the Add button

![](/img/portal/teams-incoming-webhook.png)

* Follow the prompts to create an incoming webhook and copy the URL

### Adding a teams channel target

To add a teams channel target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select Teams Channel
* Fill out the url field appropriately
* Select the template to use to transform the data
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a teams channel target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addTeamsTarget("https://xxxx.webhook.office.com/webhookb2/...", "#TeamsAlertMessage")
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
      "name": "TeamsTarget",
      "url": "https://xxxx.webhook.office.com/webhookb2/...",
      "template": "#TeamsAlertMessage"
    }]
}
```

</TabItem>
</Tabs>

