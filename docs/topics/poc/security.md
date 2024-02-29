---
slug: /poc/security
title: Security
description: Detailed instructions for setting up authentication and authorisation
sidebar_position: 2
tags:
- poc
- security
- policy
---

## Authorization

Users are authenticated using Azure AD for SSO.
All users logging in from the same Azure AD tenant will share the same private data.

## Authentication
Access to any data in the OpenDataDSL platform is governed by security policies.

### Changing the default policy
By default, all users can read/write and delete everything in your own **private** database.
The default **ManageAllPrivateData** policy can be edited to only include users that you want to have full access, this can be done using ODSL code as follows:

```js
ManageAllPrivateData = Policy()
ManageAllPrivateData.description = "Manage All private data"
ManageAllPrivateData.source = "private"
ManageAllPrivateData.service = "*"
ManageAllPrivateData.addMember("user1@company.com")
ManageAllPrivateData.addMember("user2@company.com")
ManageAllPrivateData.setFullAccess()
save ManageAllPrivateData
```

Replace the members with the actual email addresses of the users you want to allow full access.

### Adding a read all policy
You can also add a new policy which allows all users to read all private data as follows:

```js
ReadAllPrivateData = Policy()
ReadAllPrivateData.description = "Read All Private Data"
ReadAllPrivateData.source = "private"
ReadAllPrivateData.service = "*"
ReadAllPrivateData.addAction("read")
ReadAllPrivateData.addMember("*")
save ReadAllPrivateData
```

### Denying access to certain datasets
You can add a condition on a policy that narrows the policy to only data that matches the condition, e.g.

```js
DenyAccessToArgusData = Policy()
DenyAccessToArgusData.description = "Deny all access to Argus data"
DenyAccessToArgusData.condition = "source = 'ARGUS'"
DenyAccessToArgusData.source = "private"
DenyAccessToArgusData.deny = true
DenyAccessToArgusData.setFullAccess()
DenyAccessToArgusData.service = "object"
DenyAccessToArgusData.addMember("user1@company.com")
save DenyAccessToArgusData
```

Setting the **deny = true** property disallows access to the data defined by the policy - in this case **source = "ARGUS"**.

### Access to public data
By default, all your users have read-only access to public data.
You cannot create a policy that allows anything other than read access to pulbic data, but you can restrict the public data that your users are allowed to read by adding a restrictive policy, e.g.

```js
ReadEntsoe = Policy()
ReadEntsoe.description = "Restrict access to ENTSOE data"
ReadEntsoe.source = "public"
ReadEntsoe.service = "*"
ReadEntsoe.addAction("read")
ReadEntsoe.addMember("*")
ReadEntsoe.condition = "source = 'ENTSOE'"
ReadEntsoe.deny = true
save ReadEntsoe
```

### Accounts data
There is some data in the Accounts source that you might want to allow access to:

#### Queues

Allow the management of message queues
```js
ManageQueues = Policy()
ManageQueues.description = "Manage Queues"
ManageQueues.source = "_ACCOUNTS"
ManageQueues.service = "queue"
ManageQueues.addMember("user1@company.com")
ManageQueues.setFullAccess()
save ManageQueues
```

#### Subscriptions

Allow the management of subscriptions and subscription items
```js
ManageSubscriptions = Policy()
ManageSubscriptions.description = "Manage Subscriptions"
ManageSubscriptions.source = "_ACCOUNTS"
ManageSubscriptions.service = "subscription"
ManageSubscriptions.addMember("user1@company.com")
ManageSubscriptions.setFullAccess()
save ManageSubscriptions

ManageSubscriptionItems = Policy()
ManageSubscriptionItems.description = "Manage Subscription Items"
ManageSubscriptionItems.source = "_ACCOUNTS"
ManageSubscriptionItems.service = "subscriptionitem"
ManageSubscriptionItems.addMember("user1@company.com")
ManageSubscriptionItems.setFullAccess()
save ManageSubscriptionItems
```

#### Metrics

Allow reading metrics
```js
AllowReadMetrics = Policy()
AllowReadMetrics.description = "Allow reading metrics"
AllowReadMetrics.source = "_ACCOUNTS"
AllowReadMetrics.service = "metric"
AllowReadMetrics.addMember("*")
AllowReadMetrics.addAction("read")
save AllowReadMetrics
```

## Further reading
* [IT Security](/docs/it/security)
* [Policy Variable](/docs/odsl/variable/policy)
* [Policy REST Service](/docs/api/rest/service/policy)
* [Conditions](/docs/odsl/command/conditions)
