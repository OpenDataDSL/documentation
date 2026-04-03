---
slug: /poc/security
title: Security
description: Detailed instructions for setting up authentication and authorisation
sidebar_position: 3
tags:
- poc
- security
- policy
---

# Security

This page explains how authentication and authorisation work in OpenDataDSL, and how to configure access policies for your users.

## Authentication

Users are authenticated using Azure Active Directory (Azure AD) single sign-on. All users logging in from the same Azure AD tenant automatically share the same private data environment.

## Authorisation

Access to data in OpenDataDSL is governed by **policies**. A policy defines which users can perform which actions on which data. Policies are created and managed using ODSL code.

### Default policy

By default, all users in your tenant have full read, write, and delete access to everything in your private database. This is controlled by the built-in `ManageAllPrivateData` policy.

To restrict full access to specific users, edit the policy and replace the wildcard membership with named email addresses:

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

### Granting read-only access to all users

To allow all users to read private data without being able to modify it, create a new policy with read-only access and a wildcard member (`"*"`):

```js
ReadAllPrivateData = Policy()
ReadAllPrivateData.description = "Read All Private Data"
ReadAllPrivateData.source = "private"
ReadAllPrivateData.service = "*"
ReadAllPrivateData.addAction("read")
ReadAllPrivateData.addMember("*")
save ReadAllPrivateData
```

### Denying access to specific datasets

Use a condition on a policy to restrict access to data matching specific criteria. Setting `deny = true` turns the policy into a deny rule:

```js
DenyAccessToArgusData = Policy()
DenyAccessToArgusData.description = "Deny all access to Argus data"
DenyAccessToArgusData.condition = "source = 'ARGUS'"
DenyAccessToArgusData.source = "private"
DenyAccessToArgusData.service = "object"
DenyAccessToArgusData.deny = true
DenyAccessToArgusData.setFullAccess()
DenyAccessToArgusData.addMember("user1@company.com")
save DenyAccessToArgusData
```

### Restricting access to public data

By default, all users have read-only access to public data. You cannot grant write access to public data, but you can restrict which public datasets your users can see using a deny policy with a condition:

```js
RestrictEntsoe = Policy()
RestrictEntsoe.description = "Restrict access to ENTSOE data"
RestrictEntsoe.source = "public"
RestrictEntsoe.service = "*"
RestrictEntsoe.addAction("read")
RestrictEntsoe.addMember("*")
RestrictEntsoe.condition = "source = 'ENTSOE'"
RestrictEntsoe.deny = true
save RestrictEntsoe
```

## Accounts Data Policies

Some platform features — queues and metrics — are managed through a separate `_ACCOUNTS` source and require their own policies.

### Queues

Allow specific users to manage message queues:

```js
ManageQueues = Policy()
ManageQueues.description = "Manage Queues"
ManageQueues.source = "_ACCOUNTS"
ManageQueues.service = "queue"
ManageQueues.addMember("user1@company.com")
ManageQueues.setFullAccess()
save ManageQueues
```

### Metrics

Allow all users to read metrics:

```js
AllowReadMetrics = Policy()
AllowReadMetrics.description = "Allow reading metrics"
AllowReadMetrics.source = "_ACCOUNTS"
AllowReadMetrics.service = "metric"
AllowReadMetrics.addMember("*")
AllowReadMetrics.addAction("read")
save AllowReadMetrics
```

## Automations Policy

Automations are stored under the standard `private` source. To restrict which users can create, update, or delete automations, add a policy on the `automation` service:

```js
ManageAutomations = Policy()
ManageAutomations.description = "Manage Automations"
ManageAutomations.source = "private"
ManageAutomations.service = "automation"
ManageAutomations.addMember("user1@company.com")
ManageAutomations.setFullAccess()
save ManageAutomations
```

## Further Reading

* [IT Security](/docs/it/security)
* [Policy variable reference](/docs/odsl/variable/policy)
* [Policy REST service](/docs/api/rest/service/policy)
* [Conditions reference](/docs/odsl/command/conditions)
