---
title: Used by, apps and history
description: What uses a group, the group apps of other extensions, the versions of a group and code to use it
slug: /extensions/group-manager/usage-and-history
sidebar_position: 5
tags: [extension, group manager, usage, apps, history, versions, odsl, rest]
---

# Used by, apps and history

---

## Used by

The **Used by** tab lists what depends on the group. Check it before you rename, convert or delete a group.

![What uses Gas and power daily](/img/extensions/group-manager/used-by.png)

| Section | What is listed |
|-|-|
| Policies | For a policy user group: the security, feature and redaction policies that name it |
| Curves | For a curve group: how many curves name it |
| Processes | Processes that name the group in their input (export schedules, integrations) and the `CURVEBUILD_` and `CURVEEXPORT_` processes of curve groups |
| Automations | Automations that run when items are added to, removed from or updated in the group |
| Integration | The system the Integration extension sends the group to |

---

## Apps

Other extensions add screens that work on one group, such as **Export** and **Integration**. The **Apps** tab lists the ones installed in your tenant; **Open here** opens an app below the list with this group selected.

![The Export and Integration apps for a group](/img/extensions/group-manager/apps.png)

---

## History

Every save keeps the previous version. Select a version to see what changed in it and what changed since, field by field, with the items added and removed. **Restore version** loads that version on the screen: check it, then **Save** to make it the current version (the version you replace is kept too).

![Version 2 of Gas and power daily, compared with the version before it and with now](/img/extensions/group-manager/history.png)

---

## Code

The **Code** tab shows ODSL that creates the group as it is on the screen (including unsaved changes), and how to use it from ODSL and the REST API, each with a **Copy** button, plus the group as JSON.

![The ODSL and REST code for Gas and power daily](/img/extensions/group-manager/code.png)
