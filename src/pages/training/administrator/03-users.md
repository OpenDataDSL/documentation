---
slug: /training/administrator/users
title: "Module 03: Users & Groups"
sidebar_position: 4
tags: [training, administrator, users, groups, security]
---

# Module 03: Users & Groups

In this module you will bring people into your tenant, see what they can do, and manage their access through policy user groups so that a change of team is a one-line change rather than an edit to every policy.

## Learning Objectives

By the end of this module you will be able to:

- Invite a colleague to your tenant
- List users and see the policies and features that apply to them
- Explain where roles come from
- Create a policy user group and use it as a policy member
- Add and remove people from a group
- Manage API keys and service accounts

---

## Step 1: How Users Join

There is no separate user creation step. A person becomes a user of your tenant when they first sign in with their Microsoft work account from your organisation. You can also invite someone, and they are emailed an invite code:

```
GET https://api.opendatadsl.com/api/user/v1?_function=invite&email=tom.clarke@company.com
Authorization: Bearer {{token}}
```

:::note
Users sign in through your own Azure Active Directory, so your IT team decides who can authenticate. OpenDataDSL never sees their password.
:::

---

## Step 2: List Users

```js
//#region List users
colleagues = find ${user}
print colleagues

// Your own record
print ${user:"me"}
//#endregion
```

In the REST API, add extra fields to `_project` when you read a user to see what applies to them:

| Field | What it returns |
|-------|-----------------|
| `policies` | The security policies that apply to the user |
| `features` | The portal features they can use, from the tenant's features and the feature policies |
| `roles` | Your roles (only when reading `me`) |
| `groups` | Your groups (only when reading `me`) |

```
GET https://api.opendatadsl.com/api/user/v1/priya.shah@company.com?_project=policies,features
Authorization: Bearer {{token}}
```

---

## Step 3: Understand Roles

**Application roles** are Azure application roles that your IT security team assigns to users in your company. Users with the admin role can always create, update and delete your company's policies, even if the policies themselves would not allow it.

Everything else (which data a user can read or change, which portal menus they see, which fields are hidden) is decided by **policies**, which you manage in the platform.

---

## Step 4: Create a Policy User Group

A **policy user group** is a group of email addresses that you manage in the platform, so you do not need an Azure Active Directory group for every team. Create it in the `user` service with type `security` and category `policy`:

```js
//#region Create a policy user group
stewards = Group()
stewards.name = "DataStewards"
stewards.service = "user"
stewards.type = "security"
stewards.category = "policy"
stewards.items = ["anna@company.com", "raj@company.com"]
save stewards
print "Group saved"
//#endregion
```

The group is then known as `user:security:policy:DataStewards`, which is both how you read it and how you name it as a policy member.

---

## Step 5: Use the Group in a Policy

```js
//#region Give the group access
StewardsMasterData = Policy()
StewardsMasterData.description = "Data stewards manage master data"
StewardsMasterData.service = "object"
StewardsMasterData.addActions(["create", "read", "update", "delete"])
StewardsMasterData.addMember("user:security:policy:DataStewards")
save StewardsMasterData
//#endregion
```

Policy members can be:

| Member | Example | Security | Feature | Redaction |
|--------|---------|----------|---------|-----------|
| Everyone | `*` | Yes | Yes | Yes |
| One user | `user@company.com` | Yes | Yes | Yes |
| Policy user group | `user:security:policy:DataStewards` | Yes | Yes | Yes |
| Azure AD group id | `39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d` | Yes | No | No |

:::tip
Prefer groups to individual emails in policies. When someone moves team you change the group once, and their access changes in every policy that uses it.
:::

---

## Step 6: Change Group Membership

Add a person by reading the group, adding the email and saving:

```js
//#region Add a member
g = ${group:"user:security:policy:DataStewards"}
g.items.add("mei@company.com")
save g
//#endregion
```

Remove a person by removing the email and saving with `replace`, so the stored list is replaced rather than merged:

```js
//#region Remove a member
g = ${group:"user:security:policy:DataStewards"}
g.items.remove("raj@company.com")
save g replace
//#endregion
```

Groups are versioned, so you can list a group's history with `${group:"user:security:policy:DataStewards":*}` and see who changed it and when.

---

## Step 7: API Keys and Service Accounts

**Service accounts.** For unattended integrations, create an App registration in Azure Active Directory and use a client secret or certificate to get a token.

**API keys.** For applications that cannot use Azure AD, a user can create a key for themselves. The key is shown only once:

```js
//#region Manage your API keys
api-key create expires="2027-10-31" "etrm-feed"

// List your keys (the key values are not shown)
print ${user:"me"}.keys

// Revoke a key
api-key delete "etrm-feed"
//#endregion
```

The application then sends the key with the user's email, either as a Basic Authorization header or as the `x-odsl-email` and `x-odsl-key` headers.

:::warning
An API key acts as the user who created it, with all their access. Give keys an expiry date, store them in your application's own secret store, and revoke them when the integration is retired. If your company does not allow API keys, OpenDataDSL can switch them off for the whole tenant.
:::

---

## Step 8: Check What a User Can Do

The policy service tells you which policies apply to a user, and what they can do with a single record:

```
GET https://api.opendatadsl.com/api/policy/v1?_function=user&email=anna@company.com
GET https://api.opendatadsl.com/api/policy/v1?_function=rights&service=object&key=ICE.IFEU.B&email=anna@company.com
```

The `rights` call returns a list such as `["update", "read", "editPrivateTypeProperties"]`. The `members` function lists the distinct members of all your policies, which is a quick way to find groups and emails nobody uses any more.

:::note
If a user reports a `403 Forbidden` error from the API, the reason is in the `x-odsl-error` response header. Comparing it with the `rights` output usually shows which policy is missing.
:::

---

## Exercise

1. Create a policy user group called `TrainingViewers` containing your own email address.
2. Read it back using `${group:"user:security:policy:TrainingViewers"}` and print its items.
3. Add a colleague's email, then remove it again with `save g replace`.
4. Call the policy service `user` function for your own email and list the policies that apply to you.

---

## Summary

| Task | How |
|------|-----|
| Bring someone in | They sign in with their work account, or invite them with the user service `invite` function |
| See who is here | `find ${user}` |
| See what applies to someone | `_project=policies,features` on the user, or the policy `user` and `rights` functions |
| Group people | A `Group()` in the `user` service with type `security` and category `policy` |
| Use a group | Member `user:security:policy:` followed by the group name |
| Keys | `api-key create` and `api-key delete` |

:::note Next Step
In [Module 04](/training/administrator/policies) you will write security, feature and redaction policies for these groups.
:::
