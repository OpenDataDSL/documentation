---
slug: /topics/subscribe/jira
title: Target - JIRA 🆕
description: A subscription target to POST data to a JIRA Automation
tags:
- subscription
- jira
- target
- topics
- new
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

The **name** of this target is ```JIRAAutomationTarget```

To configure the JIRA webhook, you need to provide the following:
* **url**
  > The URL of the webhook to post the data to
* **template**
  > The name of a mustache template to transform the input data to be displayed in JIRA

### Adding a JIRA automation target

To add a JIRA automation target to an existing subscription:

<Tabs groupId="tool">
<TabItem value="portal" label="Web Portal" default>

* Select **Subscriptions**
* Find the subscription you want to add the target to.
* Click the + button next to targets
* Select JIRA Automation
* Fill out the url field appropriately
* Select the template to use to transform the data
* Click the save button


</TabItem>
<TabItem value="odsl" label="OpenDataDSL">

```js
// Adding a JIRA automation target to an existing subscription
sub = ${subscription:"MySubscription"}
sub.addJIRAAutomationTarget("https://jira/data", "template")
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
      "name": "JIRAAutomationTarget",
      "url": "https://jira/data",
      "template": "template"
    }]
}
```

</TabItem>
</Tabs>

