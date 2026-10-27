---
slug: /training/administrator/tenant-overview
title: "Module 01: Tenant Overview"
sidebar_position: 2
tags: [training, administrator, concepts, tenant]
---

# Module 01: Tenant Overview

This module explains how your company is set up on OpenDataDSL: the tenant, its data environments, the people who use it, how their access is decided and what is kept separate from what. Most of it is reading, with a few short ODSL snippets you can run to look at your own tenant.

## Learning Objectives

By the end of this module you will be able to:

- Describe what a tenant is and view your tenant information
- Explain the difference between the production, preview and named data environments
- Describe how users sign in and how their access is decided
- Explain the difference between public and private data
- List which items are isolated in each environment

---

## Step 1: The Tenant

A **tenant** is your company's own space on the platform. It is created the first time someone from your company signs in to the Web Portal: they are asked for the company name and a few details, and from then on everyone who signs in with a work account from the same organisation joins the same tenant.

The tenant holds your company information and your tenancy configuration, such as service quotas, features and settings. You can view it with the `tenant` service:

```js
//#region View your tenant
print ${tenant:""}
//#endregion
```

This prints, as JSON, your company information plus your service quotas and other configuration.

You can record your company details (name, address, email, phone, account contact) by saving an Object to the tenant service. See [Tenant Service](/docs/odsl/service/tenant) for the template.

:::warning Properties are replaced, not merged
When you update the company information through the [Tenant REST API](/docs/api/rest/service/tenant), the `properties` you send replace all the existing ones. Read the tenant first, change the property, and send all the properties back.
:::

:::note Tenant settings
Tenant settings (for example whether API keys are allowed) can only be changed by OpenDataDSL. Contact OpenDataDSL if you need a setting changed.
:::

---

## Step 2: Data Environments

A **data environment** is a physically independent space where your data, settings, workflows and scripts live. Each environment is a separate physical database in the same cluster.

| Environment | What it is |
|-------------|-----------|
| `production` | Your live environment. All requests go here unless you say otherwise. It cannot be deleted. |
| `preview` | Runs the next platform release on its own servers, so you can try a release before it reaches production. It cannot be deleted. |
| Named environments | Environments you create, such as `develop`, `test` or `uat`, to build and test without touching production. |

The number of environments you can have is limited by your tenant's environment quota. By default this is 3, including production. You can request more from OpenDataDSL.

You will create and manage environments in [Module 02](/training/administrator/environments).

---

## Step 3: Users and Sign-In

Users sign in with **Azure Active Directory** single sign-on, using their Microsoft work account. Personal email addresses cannot be used. OpenDataDSL never sees a user's password: authentication is handled by your own identity provider, so your IT team's rules (multi-factor authentication, conditional access and so on) apply.

There are three ways to connect:

| Method | Used for |
|--------|---------|
| Work account (Azure AD) | People using the Web Portal, Excel Add-in, VS Code or the API |
| App registration (client secret or certificate) | Unattended service accounts, for example an ETRM integration |
| API key | External applications that cannot use Azure AD. These can be switched off for the whole tenant |

To see who has connected from your company:

```js
//#region List your colleagues
colleagues = find ${user}
print colleagues
//#endregion
```

---

## Step 4: Roles and Policies

Access is decided at two levels:

1. **Application roles** are Azure application roles, configured for your users by your own IT security team. Users with the admin role can always create, update and delete your company's policies.
2. **Policies** decide what each user can do with the data and what they see in the portal. They are records in the `policy` service.

| Policy | Controls |
|--------|----------|
| Security policy | Which records a user can create, read, update, delete or run |
| Feature policy | Which menu items and extension views a user sees in the Web Portal |
| Redaction policy | Which master data fields are removed from the records a user reads |

When your company is onboarded, a default security policy called `ManageAllPrivateData` gives everyone (`*`) full access to all private data, and a feature policy called `EnergyUserFeatures` gives everyone the standard menu items. To restrict access you change, disable or replace these.

A few policies are built in and cannot be edited, such as `ReadMyProfile-Built-In` and `ReadTenantUsers-Built-In`.

:::warning
Before you change or remove `ManageAllPrivateData`, make sure someone in your tenant can still manage policies.
:::

You will work with policies in [Module 04](/training/administrator/policies).

---

## Step 5: Public and Private Data

Every item belongs to a **source**:

| Source | What it holds | Who can change it |
|--------|---------------|-------------------|
| `public` | Data shared with every company, such as public calendars, types and reference data. Ids start with `#`, for example `#ECB_FX` | Only platform administrators |
| `private` | Your company's own data | Decided by your security policies |

Everyone in your company can read public data. Access to private data is what your security policies control.

---

## Step 6: Resource Isolation

The following are kept separately in each environment, so a change in `test` does not affect `production`:

- Actions, calendars, types and groups
- Objects (master data) and data
- Curve management information
- Extractors, transformers, scripts and workflows
- Processes and process execution records
- Report configurations and reports
- Security policies
- Audit records

Public items are shared by every environment, because they are not stored in your environments.

:::tip
Because security policies and audit records belong to an environment, a policy you add in `test` does not protect `production`, and the audit trail of production only shows production's changes.
:::

---

## Exercise

1. Run `print ${tenant:""}` and find your service quotas in the output.
2. Run `find ${environment}` and note which environments your tenant already has.
3. Run `find ${user}` and count how many colleagues have connected.
4. Run `print ${user:"me"}` to see your own user record.

---

## Summary

| Concept | What it is |
|---------|-----------|
| Tenant | Your company's space on the platform, with its quotas and settings |
| Environment | A physically separate database for your data and configuration |
| Production and preview | The two environments that always exist and cannot be deleted |
| User | A person or application that signs in with Azure AD, an app registration or an API key |
| Application role | An Azure role assigned by your IT team |
| Policy | A record in the policy service deciding what users can do or see |
| Public and private | Shared reference data, and your company's own data |

:::note Next Step
In [Module 02](/training/administrator/environments) you will create a test environment, control access to it and promote items from it to production.
:::
