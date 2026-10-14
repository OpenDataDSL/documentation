---
slug: /topics/policies/feature
sidebar_position: 2
title: Feature Policies
description: Using feature policies to show or hide Web Portal menu items and extension views
tags:
- feature
- policies
- topics
---

## Introduction
Feature policies decide which menu items and extension views a user sees in the Web Portal, so each user only sees the parts of the platform they need.

:::caution
Feature policies change what the portal shows, they are not a security control. A user who cannot see the Scripts menu item can still read scripts through the API, ODSL or the Excel Add-in if their [security policies](/docs/odsl/topics/policies) allow it.
:::

For the full list of properties and the portal feature names, see [Feature Policies in ODSL](/docs/odsl/variable/featurepolicy).

## How feature policies are combined
When a user opens the portal, their features are worked out like this:

1. Start from the features switched on for your company.
2. Every enabled **allow** feature policy the user is a member of switches its features on.
3. Every enabled **deny** feature policy the user is a member of switches its features off.

Deny always wins: if one policy allows `scripts` and another denies it, the user does not see Scripts.

When your company is onboarded, a feature policy called `EnergyUserFeatures` gives everyone (`*`) the standard menu items.

Members can be `*`, user email addresses or [policy user groups](/docs/topics/policies#policy-user-groups). Azure Active Directory group ids are not used by feature policies.

## Extension views
Extensions can add tabs and views to portal screens, each with its own feature name, for example `odsl.aggregator.report` for the Aggregator tab on the Reports screen. Use the feature name in a feature policy to show or hide the view, in the same way as a menu item.

## Examples

### A simpler portal for business users
Hide the technical menu items from a group of business users:

```js
BusinessUserFeatures = FeaturePolicy()
BusinessUserFeatures.description = "Hide technical menu items from business users"
BusinessUserFeatures.features = ["scripts", "types", "queues", "processes", "executions", "calendars"]
BusinessUserFeatures.deny = true
BusinessUserFeatures.addMember("user:security:policy:BusinessUsers")
save BusinessUserFeatures
```

### Reports and dashboards only
Turn off everything except reports and dashboards for viewers:

```js
ViewerFeatures = FeaturePolicy()
ViewerFeatures.description = "Viewers only see reports and dashboards"
ViewerFeatures.features = ["masterData", "data", "smartData", "geoData", "curves", "datasets", "processes", "executions", "queues", "types", "calendars", "scripts", "alerts", "groups"]
ViewerFeatures.deny = true
ViewerFeatures.addMember("user:security:policy:Viewers")
save ViewerFeatures
```

### Only some users see an extension view
Hide an extension view from everyone, except the users who should use it. Because deny always wins, put the deny policy on the users who should not see it, rather than on `*`:

```js
HideAggregatorTab = FeaturePolicy()
HideAggregatorTab.description = "Only the data team sees the Aggregator tab"
HideAggregatorTab.features = ["odsl.aggregator.report"]
HideAggregatorTab.deny = true
HideAggregatorTab.addMember("user:security:policy:BusinessUsers")
save HideAggregatorTab
```

### Switch a feature back on for a group
Allow policies switch on features that are off for your company or not in the default policy:

```js
PowerUserFeatures = FeaturePolicy()
PowerUserFeatures.description = "Power users see process timelines and data packages"
PowerUserFeatures.features = ["processTimeline", "dataPackages"]
PowerUserFeatures.addMember("user:security:policy:PowerUsers")
save PowerUserFeatures
```
