---
title: Your Access Rights
description: An item insight that lists the actions you are allowed to take on the selected item, worked out by the platform from your security policies
slug: /public/insights/access-rights
catalog_summary: Exactly what you are allowed to do on one item, worked out from your security policies
tags: [insight, report, security, policies, rights, item insight, master data]
---

# Your Access Rights

Security policies can depend on the service, the source and conditions on the record itself, so it is not always obvious what you can do with a particular item. **Your Access Rights** asks the platform directly and answers questions like:

- Can I update this record, or only read it?
- Am I allowed to edit the properties that come from its type?
- Why does saving this item fail with a permission error?

At Northgate Energy, Priya Shah is a data steward. On the TTF front month product `NGE_PRODUCT:TTF_M` her rights include `editPrivateTypeProperties`, granted by the data stewards' policy, so she can change its product properties. Traders see only `read`.

![Your Access Rights on master data record NGE_PRODUCT:TTF_M](/img/insights/access-rights/report.png)

---

## Opening the report

This is an item insight: open an item, then choose **Your Access Rights** from its insights. The template is registered twice:

| Report id | Category | Where it appears |
|-|-|-|
| `#INSIGHT_ITEM_USERRIGHTS` | Item Insights | The insights of items on screens that offer the general item insights |
| `#MDI_USERRIGHTS` | Master Data Insights | The insights of a master data record (service `object`) |

The screen passes the item's service and id. For a dataset, the report uses the dataset id. There are no controls: the report loads as soon as it opens.

---

## The report

| Part | What it shows |
|-|-|
| **Service**, **Entity** | The service and id the rights were worked out for |
| **Rights granted** | How many actions you are allowed |
| **Your access rights** | Each action you are allowed, one per line |

Typical actions are `read`, `create`, `update` and `delete`; some services add their own, such as `run`. On master data the list can also include `editPublicTypeProperties` and `editPrivateTypeProperties`, which allow changing properties declared on a public or private type. These two are never granted by default, so a data steward needs a policy that includes them.

If nothing is allowed, the report shows **No access rights found for this service and entity.**

---

## Where the data comes from

The report calls the platform's rights function on the policy service with the item's service, source (public for an id starting with `#`, otherwise private) and id. The platform applies your security policies in the current data environment, including deny policies and conditions on the record.

---

## Related

- [Security & Access Insights](/docs/public/insights/security-access): all policies, groups and users side by side
- [Item Audit Report](/docs/public/insights/item-audit-report): who changed the item
- [Security policies](/docs/odsl/topics/policies)
- [Insights](/docs/odsl/insights/general): how insight reports work
