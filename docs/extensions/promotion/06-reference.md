---
title: Reference
description: Installing the Promotion extension, permissions, how each kind of item is written, and the format of the deployment records
slug: /extensions/promotion/reference
sidebar_position: 6
tags: [extension, promotion, reference, environments, permissions]
---

# Reference

---

## Installing

Install the extension in every environment you promote from: your test or UAT environment to push to production, and production too if you want to copy items from production to a test environment. The screen does not work in the preview environment, which runs the next platform release on its own servers.

The extension installs:

| Item | Id | What it is |
|-|-|-|
| View | **Promote to another environment** (Manage menu) | The Select, Review and push, and Deployments tabs. Feature `odsl.promotion.manage`. |
| Feature policy | `extension.odsl.promotion` | Who sees the view. |
| Security policy | `PromotionDeployments` | Read, create and update the deployment records (`object/promotion_deployment`). |
| Security policy | `PromotionItems` | Read, create and update the item records (`object/promotion_item`). |

Neither security policy allows deleting the records: they are the audit trail of every promotion.

---

## Permissions

| To | You need |
|-|-|
| Open the screen | The feature `odsl.promotion.manage` in your environment. |
| See items in your environment | Read access to them in your environment. |
| Push an item | Create (new items, copies) or update (overwrite, merge) access to it in the **target**, given by the target's security policies. |
| Undo | Delete (remove, roll back) or update (save back) access in the target. |

Promotion makes every request as you: it cannot do anything in the target that your policies there do not allow. The Review tab checks your rights in the target and warns about items you cannot push.

---

## How each kind is written

| Kind | Written with | Notes |
|-|-|-|
| Types, calendars, expiry calendars, scripts, transformers, extractors, workflows, reports, dashboards | `POST <service>/v1/private` with `_replace=true` | Versioned: the target keeps its previous version. |
| Validation checks, automation targets, processes, groups | `POST <service>/v1` with `_replace=true` | Versioned. A process with a schedule starts running on it. |
| Master data | `POST object/v1/private` with `_replace=true` (or a merge for **Merge**) | The record's own fields; the target's links to data items are kept. |
| Smart and event data | `POST object/v1/private`: a merge update of the record with the item as a property | The record must exist in the target. The item replaces its own inputs (`properties._replace`). |
| Security policies | `POST policy/v1` | Not versioned: undo saves the copy back. |
| Automations | `POST automation/v1` | Matched in the target by target, conditions and settings, never by id. Not versioned. |

Every write carries the reason `Promoted by <deployment id> from <environment>: <your reason>`, and every undo `Undo of <deployment id>: <your reason>`, which the platform stores in the audit record of the change.

---

## Where the records are kept

The records are kept in the environment the deployment was made from, in two object collections.

### promotion_deployment

One record per deployment, `GET object/v1/promotion_deployment/PRM-20261026-174105-GOJX`:

| Field | What it holds |
|-|-|
| `_id` | `PRM-` followed by the date and time (UTC) and four random letters. |
| `name`, `reason` | As given when pushing. |
| `sourceEnv`, `targetEnv` | The route. |
| `user`, `started`, `ended` | Who pushed it and when. |
| `status` | `running`, `completed`, `completed with errors`, `stopped`, `undone` or `partly undone`. |
| `stopOnError` | Whether it stops at the first error. |
| `counts` | `total`, `created`, `updated`, `unchanged`, `skipped`, `failed`, `notrun`. |
| `items` | One entry per item: `n`, `kind`, `id`, `targetId`, `choice`, `result`, `beforeVersion`, `afterVersion`, `error`, `undo`. |
| `log` | Entries with a time `t`, a `level` (`info`, `ok`, `warn`, `error`) and a `msg`. |
| `undo`, `undos` | The last undo and every undo: who, when, why, which items and the counts. |

### promotion_item

One record per pushed item, `GET object/v1/promotion_item/PRM-20261026-174105-GOJX:0002`, saved before the item is written and updated after:

| Field | What it holds |
|-|-|
| `deployment`, `n`, `kind`, `id`, `targetId`, `choice` | Which item and what was asked. |
| `existed`, `beforeVersion`, `before` | Whether the target had it, its version, and a copy of it (JSON text) before the deployment. |
| `pushed` | What was written (JSON text). |
| `afterVersion`, `result`, `phase`, `error` | The outcome. `phase` is `pushing` while the item is being written, then `pushed` or `failed`. |
| `objectId`, `objectBeforeVersion`, `objectAfterVersion` | For smart and event data: the record it is held on, and its versions. |
| `undo` | The undo of the item: what was planned, the result, when and by whom. |

Copies bigger than 6 MB (a very long stored timeseries, for example) are not kept; undo then relies on the platform's versions.

---

## Good to know

- Promotion compares content only: versions, timestamps, users and other fields the platform adds are left out of the comparison.
- Public items, the scripts of installed extensions and stored curves are not offered. Promote the processes that load data rather than the data itself, except for definitions such as smart curves.
- An automation's id is never sent to the target: automations of every environment share one collection, so sending the id would change the automation in your own environment.
- Deleting an item from production is not something a deployment does. Delete it in production itself.
- Pushing to an environment other than production works the same way; the confirmation then does not ask you to type `production`.
