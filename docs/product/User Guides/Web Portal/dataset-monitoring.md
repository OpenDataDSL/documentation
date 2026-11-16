---
title: Dataset monitoring
description: The Datasets screen in the web portal, for checking that your datasets were delivered on time and passed their quality checks
sidebar_position: 9
slug: /user/portal/dataset
tags:
  - portal
  - dashboard
  - dataset
  - monitoring
---
**Monitor** > **Datasets** shows whether the datasets you depend on have been delivered, are complete and have passed their quality checks, with any alerts raised about them.

![The Datasets screen](/img/portal/datasets.png)

---

## The toolbar

| Control | What it does |
|-|-|
| **Groups**, **List view**, **Feed view**, **Report view** | Shows the datasets grouped (by provider, for example), as a list, by feed, or the dataset reports |
| **Smart** | Switches the smart view on or off |
| **Monitored** | Switches between the datasets you monitor and every dataset you can see |
| **Current**, **Next available**, **Custom** | Which deliveries to show: the current ones, the next ones due, or the deliveries for a date you choose |
| Date | The delivery date, with arrows for the previous and next date |
| **Group status** | Shows only the groups with a particular status, or **All** |
| **Refresh** | Reads the status again; the arrow beside it has more options |

---

## The summary

| Chart | What it counts |
|-|-|
| **Delivery Status** | Datasets **Waiting**, **Partial**, **Missing**, **Loaded**, **Active**, **Late**, **Holiday** and **Failed** |
| **Quality Checks** | Datasets **Unchecked**, **Valid**, with **Warnings** and **Failed** |
| **Critical Checks** | Critical checks **Waiting**, **Valid** and **Failed** |
| **Alerts** | Alerts **Open**, **InProgress** and **Closed** |

---

## Completeness and quality checks

The table lists the datasets, grouped by what you choose in **View by** (for example **Provider**), with the number of datasets in each. **Delivery Status**, **Quality Checks** and **Critical Checks** show how many are in each state: point at a bar to see its count. **NONE** means none of the group's datasets have that kind of check.

### Delivery status
| Status | Meaning |
|-|-|
| **Waiting** | Not due yet |
| **Active** | The delivery has started |
| **Partial** | Some of the data has arrived |
| **Loaded** | Complete |
| **Late** | Due, but not complete yet |
| **Missing** | Not delivered |
| **Holiday** | Not expected today, because of the dataset's holiday calendar |
| **Failed** | The delivery failed |

### Quality status
| Status | Meaning |
|-|-|
| **Unchecked** | No quality checks have run |
| **Valid** | Passed every check |
| **Warnings** | Passed, with warnings |
| **Failed** | Failed one or more checks |

---

## Alerts

The **Alerts** list on the right shows the alerts raised about the datasets, filtered by **Impact** and **Status**. To work with alerts, open **Monitor** > [**Alerts**](/docs/extensions/alerts/overview).

---

## More information
- [Data monitoring](/docs/odsl/dm/monitoring)
- [Validation](/docs/extensions/validation/overview): the checks behind the quality status
