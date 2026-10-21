---
title: Automations reference
description: Where automations and their runs are kept, ownership, test runs, the automation log fields, what the extension installs, and troubleshooting
slug: /extensions/automations/reference
sidebar_position: 6
tags: [extension, automations, automation, reference]
---

# Automations reference

---

## Where everything is kept

| What | Service | Notes |
|-|-|-|
| Automations | `automation` | Shared by all companies on the platform, so every record holds its company and environment, and you only see your own. Each automation has a `target`, a `template` (the sentence), `conditions` (the triggers: `source`, `service`, `id`, `action`, and `did` for derived items), `properties` (the settings), `enabled` and `owner` |
| Runs | `automationlog` | Your company's private data, one record per run, see [The automation log](#the-automation-log) |
| Targets | `automationtarget` | OpenDataDSL's public targets and your company's private ones; a private target replaces a public one with the same id |

The REST services are described in the REST API guide: [automation](/docs/api/rest/service/automation), [automationlog](/docs/api/rest/service/automationlog) and [automationtarget](/docs/api/rest/service/automationtarget).

---

## Ownership

An automation runs as its **owner**: it can only read the items and use the scripts its owner can, and sends what its owner is allowed to see.

The platform sets the owner every time an automation is saved: it becomes the person who saved it. In this extension that happens when you:

- select **Save** in the editor,
- turn an automation on or off, with its switch or with **Enable** and **Disable**,
- create an automation.

:::caution
Before changing someone else's automation, check that you have access to everything it uses. Otherwise it may stop working once you are its owner. The editor warns you when the owner is someone else.
:::

Saving also sets the automation's environment to the one you are signed in to.

---

## Test runs

**Run now** in the editor runs the saved automation straight away:

- It uses the automation's first trigger. The platform reads its item as it is now. For a curve, that is the latest curve, or the curve for the **Ondate** you chose. For an automation on an event curve or event timeseries, the curve or timeseries itself is read, not the event list it is built from.
- It runs even when the automation is disabled.
- It runs as you, not as the owner, and it does not change the owner.
- It is recorded in the automation log with the reason `Test Run`, and shown as **Test run** in the Activity tab and `test` in the editor's recent runs.
- It cannot run for an automation on any item (`*`).
- It fails with "Unable to run" when the item does not exist.

---

## The automation log

| Field | What it holds |
|-|-|
| `timestamp` | When the automation ran (UTC) |
| `status` | `success`, `failed`, or another status the target returned |
| `message` | The target's message |
| `automation` | The automation's id |
| `target` | The target's id |
| `key` | The item that triggered the run (for an automation on any item, the actual item) |
| `source`, `service`, `action`, `property` | The trigger |
| `ondate` | The curve's ondate, for curves |
| `method` | `Process` (the platform's automation process) or `Direct` (in the request that changed the item, with the application) |
| `reason` | What caused it, such as `Update from: priya.shah@northgate-energy.com`, or `Test Run` |
| `invocationId`, `rootInvocationId` | The request ids, to find the run in the platform's logs |

---

## What the extension installs

| Kind | Id | What it is |
|-|-|-|
| Feature policy | `extension.odsl.automations` | Gives everyone the `odsl.automations.manage` feature. Change its members to limit who sees the screen |
| Menu item | **Operations**, **Automations** | The screen with the Overview, Automations, Activity, Targets and New tabs |
| Insight reports | `odsl.automations.by_target`, `odsl.automations.by_service`, `odsl.automations.failures`, `odsl.automations.busiest` | Category **Automations** |

The feature only decides who sees the screen. What each person can read and change is decided by the platform's security policies, as everywhere else.

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| An automation never runs | Check it is enabled, that its item is the right one (the source matters: an item in common data is not the same as a private one), and that the action is the one that really happens (a curve loaded by a process is **updated**, not **created**) |
| It runs but every run fails | Read the message in the Activity tab. Common causes: the target no longer exists (the editor says so), a setting is wrong (a queue name, an email address), the transformer script was renamed, or the owner no longer has access to the item or script |
| A message such as `Request failed: 403 Forbidden - ...` | The platform refused the change. The text after the dash is the platform's reason, usually a missing permission |
| **Last run** says **Never** for an automation that runs | Runs are only counted for the environment you are signed in to |
| The New tab does not find an item | Check the **Service** and **Source**. You can also type the full id and select **Show what it can do** |
| A target is missing from the New tab | The target does not work with the item's service or with the action you filtered on. See its **Works with** on the [Targets tab](/docs/extensions/automations/targets) |
| An automation keeps coming back after it is deleted | Another extension keeps it, such as Validation or Composer. Change it there |
