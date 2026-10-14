---
slug: /topics/policies/redaction
sidebar_position: 3
title: Redaction Policies
description: Using redaction policies to hide master data fields from some users
tags:
- redaction
- policies
- security
- topics
---

## Introduction
Redaction policies remove fields from master data records before they are returned to a user. The user still sees the record, just not the redacted fields.
Use them when some properties are commercially sensitive, such as contract prices, supplier codes or internal notes, but the rest of the record is useful to everyone.

For the full list of properties, see [Redaction Policies in ODSL](/docs/odsl/variable/redactionpolicy).

## How redaction works
* A redaction policy lists the fields to remove, in `redactions`. Use dot notation for a field inside a property, e.g. `contract.price`.
* It applies to every enabled redaction policy the user is a member of. Members can be `*`, user email addresses or [policy user groups](/docs/topics/policies#policy-user-groups). Azure Active Directory group ids are not used by redaction policies.
* It applies to master data (the `object` service), when records are read or listed.
* There is no allow or deny: a redaction policy always removes its fields for its members. To hide a field from everyone except a few people, make the policy's members a group of the people who should not see it.

:::caution
Redaction hides the value in the records returned, it does not stop a user filtering on the field. A user could still find records with a query such as `contract.price > 50`. If the records themselves must be hidden, use a [security policy](/docs/odsl/topics/policies).
:::

### Saving records with redacted fields
A normal save merges the changes into the stored record, so fields the user could not see are kept. Saving with `_replace=true` replaces the whole record, so redacted fields would be lost: users who have fields redacted should not save with replace.

## Examples

### Hide internal notes from everyone outside the data team

```js
HideInternalNotes = RedactionPolicy()
HideInternalNotes.description = "Internal notes are for the data team only"
HideInternalNotes.addFieldRedaction("internalNotes")
HideInternalNotes.addMember("user:security:policy:BusinessUsers")
save HideInternalNotes
```

### Hide contract pricing from analysts
Remove nested fields inside the `contract` property:

```js
HideContractPricing = RedactionPolicy()
HideContractPricing.description = "Analysts do not see contract pricing"
HideContractPricing.addFieldRedaction("contract.price")
HideContractPricing.addFieldRedaction("contract.currency")
HideContractPricing.addMember("user:security:policy:Analysts")
save HideContractPricing
```

The same policy as JSON, for the [Policy REST API](/docs/api/rest/service/policy):

```json
{
  "_id": "HideContractPricing",
  "_type": "RedactionPolicy",
  "description": "Analysts do not see contract pricing",
  "redactions": [
    "contract.price",
    "contract.currency"
  ],
  "members": [
    "user:security:policy:Analysts"
  ],
  "enabled": true
}
```
