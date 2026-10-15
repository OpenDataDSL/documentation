---
title: Insights and policies
description: Adding insight reports to an extension, and the feature and data policies that decide who sees it and what it can do
slug: /extensions/building/insights-and-policies
sidebar_position: 5
tags: [extension, building-extensions, insights, policies]
---

# Insights and policies

---

## Insights

An **insight** is a report page listed on an extension's **Insights** tab. It is written like any other page (see [Writing pages](/docs/extensions/building/pages)) and registered as an insight report:

```js
ir = InsightReport()
ir.id = "acme.positions.insight.history"
ir.category = "acme.positions"
ir.name = "Position history"
ir.description = "The total position per book per day"
ir.template = "acme\extensions\positions\acme.positions.insight.history"
ir.icon = "clock-history text-primary"
ir.hideList = true
ir.hideExcel = true
save ir
```

| Property | Description |
|-|-|
| `id` | A unique id, for example the extension id, `.insight.` and a name |
| `category` | The extension id. The extension's **Insights** tab lists the insights in this category. |
| `name`, `description`, `icon` | How the insight is listed |
| `template` | The insight's page script |
| `hideList` | `true` to list it only on the extension's Insights tab, not in the general report list |
| `hideExcel` | `true` to leave it out of the Excel add-in |

For the insight to appear and install:

1. Set `insights = true` on the view whose menu item should show the **Insights** tab.
2. Add the insight id to `e.resources.reportconfig`.
3. Add the insight's page script to `e.resources.script`.

A typical insight page has filters in the header, KPI cards and a pager at the top, tabs with an overview, a list and breakdowns, and a detail panel for a selected row. The [Fusion AI insights](/docs/extensions/fusion-ai/insights) are examples.

---

## Feature policies

A **feature policy** decides who sees an extension's views. Each view has a `feature`; a user sees the view when a feature policy that includes them grants that feature.

```js
fp = FeaturePolicy()
fp.id = "extension.acme.positions"
fp.description = "Show the Positions extension"
fp.features = ["acme.positions.main"]
fp.addMember("Trading desk")
fp.addMember("Risk")
fp.deny = false
fp.enabled = true
save fp
```

| Property | Description |
|-|-|
| `id` | By convention, `extension.` and the extension id |
| `features` | The features it grants, matching the views' `feature` |
| `addMember(...)` | A user email, a user group name, or `*` for everyone in the tenant |
| `deny` | `true` to hide the views from the members instead |
| `enabled` | `false` to switch the policy off |

Use one feature for all views when everyone sees the whole extension. Use a feature per view, with several feature policies, when some tabs are for some people only: for example, everyone sees **Positions** but only the risk team sees **Limits**.

---

## Data policies

Pages read and write data as the signed-in user, so a page can only do what its user is allowed to. When the extension uses data the users cannot already reach, such as a service of its own, add a **policy** that grants it:

```js
p = Policy()
p.id = "PositionsNotes"
p.category = "Positions"
p.source = "private"
p.service = "object"
p.addAction("read")
p.addAction("update")
p.addMember("Trading desk")
save p
```

Use `p.setFullAccess()` for create, read, update, delete and run, or `addAction` for each action needed. Grant only what the pages need.

List every feature policy and data policy in `e.resources.policy`, so they are installed with the extension.
