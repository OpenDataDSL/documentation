---
slug: /training/administrator/policies
title: "Module 04: Policies & Permissions"
sidebar_position: 5
tags: [training, administrator, security, policies]
---

# Module 04: Policies & Permissions

Policies control what your users can do and see. In this module you will review the policies you have, restrict the default full-access policy, and write security, feature and redaction policies for the groups you created in Module 03.

## Learning Objectives

By the end of this module you will be able to:

- Explain the three kinds of policy and what enforces each one
- Explain how allow and deny security policies are combined
- Write security policies with conditions, including "deny to everyone except"
- Protect master data properties declared on types
- Tidy the portal with feature policies and hide fields with redaction policies
- Check a user's rights before and after a change

---

## Step 1: The Three Kinds of Policy

All policies are records in the `policy` service, told apart by their `_type`:

| Policy | `_type` | Controls | Enforced by |
|--------|---------|----------|-------------|
| Security | `Policy` | Which records a user can create, read, update, delete or run | The platform, on every API call |
| Feature | `FeaturePolicy` | Which menu items and extension views a user sees | The Web Portal only |
| Redaction | `RedactionPolicy` | Which master data fields are removed from records a user reads | The platform, when master data is read |

You can manage them in the Web Portal under Policies, in ODSL, or with the [Policy REST API](/docs/api/rest/service/policy).

:::warning Feature policies are not security
A user who cannot see the Scripts menu item can still read scripts through the API, ODSL or the Excel Add-in if their security policies allow it. Use security policies to protect data.
:::

---

## Step 2: Review What You Have

```js
//#region List all policies
security = find ${policy} where _type = "Policy"
features = find ${policy} where _type = "FeaturePolicy"
redactions = find ${policy} where _type = "RedactionPolicy"

for p in security
    print p._id + ": " + p.description
next
//#endregion
```

Look for `ManageAllPrivateData` (everyone has full access to private data) and `EnergyUserFeatures` (everyone sees the standard menu items). These are created when your company is onboarded.

---

## Step 3: How Security Policies Are Combined

For each request the platform collects the user's enabled policies for the service (plus any for service `*`), the source and the action, then:

1. **Allow** policies are combined with **or**: any matching allow policy is enough. An allow policy with no condition matches every record.
2. **Deny** policies are combined with **and not**: a record matching any deny policy is removed.
3. A deny policy is ignored for a user who also has an allow policy with **exactly the same condition text**.
4. If the user has no policy for the action, it is not allowed.

The `condition` is written like an ODSL `where` clause. `{me}` in a condition is replaced by the current user's email.

---

## Step 4: Restrict the Default Policy

Give editors full access and everyone else read-only access:

```js
//#region Read-only by default
ManageAllPrivateData = ${policy:"ManageAllPrivateData"}
ManageAllPrivateData.removeMember("*")
ManageAllPrivateData.addMember("user:security:policy:Editors")
save ManageAllPrivateData

ReadOnlyUsers = Policy()
ReadOnlyUsers.description = "Read access to all private data"
ReadOnlyUsers.service = "*"
ReadOnlyUsers.addAction("read")
ReadOnlyUsers.addMember("*")
save ReadOnlyUsers
//#endregion
```

:::warning Do not lock yourself out
Before you restrict `ManageAllPrivateData`, make sure the `Editors` group exists and contains the people who manage policies.
:::

---

## Step 5: Conditions and Exceptions

A team manages its own master data:

```js
//#region Power team master data
PowerTeamMasterData = Policy()
PowerTeamMasterData.service = "object"
PowerTeamMasterData.condition = "commodity = 'POWER'"
PowerTeamMasterData.addActions(["create", "read", "update", "delete"])
PowerTeamMasterData.addMember("user:security:policy:PowerTeam")
save PowerTeamMasterData
//#endregion
```

Anyone with create and update rights on `object` is also given full access to the `data` and `event` services, so the team can save the curves and timeseries on those records.

Stop ICE master data being deleted by anyone except data administrators, using a deny and an allow with the same condition:

```js
//#region Deny to everyone except
DenyDeleteICE = Policy()
DenyDeleteICE.service = "object"
DenyDeleteICE.condition = "source = 'ICE'"
DenyDeleteICE.deny = true
DenyDeleteICE.addAction("delete")
DenyDeleteICE.addMember("*")
save DenyDeleteICE

AllowDeleteICE = Policy()
AllowDeleteICE.service = "object"
AllowDeleteICE.condition = "source = 'ICE'"
AllowDeleteICE.addAction("delete")
AllowDeleteICE.addMember("user:security:policy:DataAdmins")
save AllowDeleteICE
//#endregion
```

Let operations staff run processes without changing them:

```js
//#region Run but not edit
RunProcesses = Policy()
RunProcesses.service = "process"
RunProcesses.addActions(["read", "run"])
RunProcesses.addMember("user:security:policy:Operations")
save RunProcesses
//#endregion
```

---

## Step 6: Protect Type Properties

Properties declared on a master data record's type can only be changed by users with `editPublicTypeProperties` (for public types such as `#Commodity`) or `editPrivateTypeProperties` (for your own types). Nobody has these until a policy grants them, and `setFullAccess()` does not include them.

```js
//#region Stewards maintain type properties
StewardsEditTypeProperties = Policy()
StewardsEditTypeProperties.service = "object"
StewardsEditTypeProperties.addActions(["update", "editPublicTypeProperties", "editPrivateTypeProperties"])
StewardsEditTypeProperties.addMember("user:security:policy:DataStewards")
save StewardsEditTypeProperties
//#endregion
```

:::note
Processes and scripts that update type properties run as a user or API key, which also needs these permissions.
:::

---

## Step 7: Feature Policies

Feature policies switch portal features on (allow) or off (deny). Deny always wins.

```js
//#region Simpler portal for business users
BusinessUserFeatures = FeaturePolicy()
BusinessUserFeatures.description = "Hide technical menu items from business users"
BusinessUserFeatures.features = ["scripts", "types", "queues", "processes", "executions", "calendars"]
BusinessUserFeatures.deny = true
BusinessUserFeatures.addMember("user:security:policy:BusinessUsers")
save BusinessUserFeatures
//#endregion
```

Extensions add views with their own feature names, for example `odsl.promotion.manage` for the Promote screen. Use them in a feature policy in the same way. See [Feature Policies](/docs/topics/policies/feature) for the feature names.

---

## Step 8: Redaction Policies

Redaction policies remove fields from master data for their members. There is no allow or deny: the fields are always removed.

```js
//#region Hide contract pricing from analysts
HideContractPricing = RedactionPolicy()
HideContractPricing.description = "Analysts do not see contract pricing"
HideContractPricing.addFieldRedaction("contract.price")
HideContractPricing.addFieldRedaction("contract.currency")
HideContractPricing.addMember("user:security:policy:Analysts")
save HideContractPricing
//#endregion
```

Members cannot use redacted fields in filters, searches, sorts or aggregations: they get `403 Forbidden`. Users with redacted fields should not save records with `_replace=true`, because the fields they cannot see would be lost.

:::warning
Redaction applies to master data reads. Audit records still hold the old and new values of changed fields, so restrict read access to the audit service for users who must not see redacted values.
:::

---

## Step 9: Check, Disable and Delete

Check a user's rights on a record:

```
GET https://api.opendatadsl.com/api/policy/v1?_function=rights&service=object&key=ICE.IFEU.B&email=anna@company.com
```

Disable a policy without deleting it, or delete it:

```js
//#region Disable or delete
p = ${policy:"RunProcesses"}
p.enabled = false
save p

delete ${policy:"RunProcesses"}
//#endregion
```

:::tip
Policies belong to an environment. Test a new policy in your test environment with `use test`, check the `rights` output, then apply it in production, for example with the Promotion extension.
:::

---

## Exercise

1. List your security policies and find who `ManageAllPrivateData` applies to.
2. Write a policy that lets the `TrainingViewers` group read and run reports in the `Daily` category.
3. Write a feature policy that hides `scripts` from `TrainingViewers`.
4. Use the `rights` function to check your own rights on one report.

---

## Summary

| Policy | Key properties | Combined by |
|--------|----------------|-------------|
| Security | `service`, `source`, `condition`, `actions`, `deny`, `members` | Allow with or, deny with and not, same-condition exception |
| Feature | `features`, `deny`, `members` | Deny always wins |
| Redaction | `redactions`, `members` | Always removes the fields |

:::note Next Step
In [Module 05](/training/administrator/secrets) you will store credentials safely in the secret service.
:::
