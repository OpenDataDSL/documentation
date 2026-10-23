---
title: Versions and the audit trail
description: Compare any two versions of a script, restore an earlier version, and see who created and changed the script, when and why
slug: /extensions/script-manager/history
sidebar_position: 6
tags: [extension, script manager, scripts, versions, audit, compare]
---

# Versions and the audit trail

Every save of a script makes a new version and keeps the earlier ones. The Script Manager shows what changed between any two versions, lets you go back to one, and lists who changed the script, when and why.

---

## Comparing versions

The **Compare versions** tab lists the versions of the script, newest first, with who saved each one and when. Under the list, two versions are shown side by side, with removed lines in red and added lines in green.

![Version 2 and version 3 of the spark spread script side by side](/img/extensions/script-manager/compare.png)

| Control | What it does |
|-|-|
| **Changes** | Compares a version with the one before it: what that save changed |
| **With current** | Compares a version with the current one (or with the editor when you have unsaved changes) |
| **Compare** lists | Any two versions, or a version and **The editor** with your unsaved changes |
| Swap | Swaps the two sides |
| **Side by side** and **Inline** | Two columns, or one column with the removed and added lines one after the other |
| Up and down arrows | Go to the previous or next change |

Above the comparison you see how many changes there are and how many lines were added and removed.

Here Priya compares version 2 with version 3, where she moved the inputs into a region and wrote the formula as the function `sparkSpread`.

---

## Restoring a version

Select **Restore** on an earlier version to make it the current one again. The Script Manager puts that version's text in the editor and saves it as a new version, with the reason `Restored version 2` (which you can change). The versions in between are kept, so you can restore those too.

:::note
Restoring replaces the text in the editor, including any unsaved changes. The Script Manager warns you first.
:::

---

## The audit trail

The **Audit trail** tab lists everything done to the script, newest first.

![The audit trail of the spark spread script](/img/extensions/script-manager/audit.png)

| Column | What it shows |
|-|-|
| **When** | When it happened |
| **Who** | Who did it |
| **What** | **Created**, **Changed**, **Rolled back**, **Tagged**, **Renamed** or **Deleted**, with the version it made |
| **Details** | The reason given when it was saved, and what changed: **Script text changed**, or other fields such as the description |
| **Compare** | Opens the version before and the version this change made on the **Compare versions** tab |

Filter by action to see only the changes, for example. The reasons are what each person typed when they saved, so a good reason, such as *Efficiency is now 50% for the new CCGT fleet*, saves the next person from reading the code.

---

## Next

[Script Manager reference](/docs/extensions/script-manager/reference): permissions, the REST functions and what the extension contains.
