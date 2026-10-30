---
title: What is the Alerts extension?
description: An introduction to alerts and the Alerts extension, one place for your team to see and work on the alerts about your data
slug: /extensions/alerts/overview
sidebar_position: 1
tags: [extension, alerts, operations, data quality, support]
---

# What is the Alerts extension?

When something goes wrong with your data, the platform raises an **alert**: a dataset delivery is late or incomplete, a quality check fails, a curve does not build, an export does not run. You and your team can raise alerts too, to ask OpenDataDSL for help or to keep track of a problem yourselves.

An alert works like a small support ticket. It stays open until the problem is solved, it is always **with** someone (your team, OpenDataDSL or a data vendor), and everything that happens to it is kept on its **timeline**: comments, hand-overs, priority changes, closing and reopening.

The **Alerts** extension puts these alerts in one screen and answers questions like:

- What is wrong with our data today, and what is waiting on us?
- What is OpenDataDSL doing about the ICE Endex delivery that was incomplete last night?
- Is the problem with the dataset itself? What arrived, what is missing, and what did the quality checks say?
- How long has this alert been open, and how long has it been with each party?

![The Alerts screen with Northgate Energy's open alerts](/img/extensions/alerts/alerts.png)

---

## Key concepts

| Concept | What it means |
|-|-|
| **Alert** | One problem, with a title, a message, a priority, a type and what it is about (a dataset, a curve, a process). It has an id such as `ALR-2026-000401` |
| **Your alerts** | Private alerts: raised by the platform about your data, or by your team. Only your company and OpenDataDSL see them. They belong to a data environment (production, test1 and so on) |
| **Shared alerts** | Alerts about common or public data, raised and managed by OpenDataDSL for everyone who uses that data. Ids start `ALC-` (common) or `ALP-` (public). You can read them and add comments that only your team and OpenDataDSL see |
| **Status** | **Open** or **Closed**. Closing needs a **resolution**: what was wrong and what was done. A closed alert can be reopened for 7 days |
| **With** | Who has to act next: **Your team**, **OpenDataDSL**, or a data vendor such as ICE or EEX. The time with each one is measured |
| **Priority** | **Critical**, **High**, **Medium** or **Low** |
| **Type** | What kind of problem it is: delivery, completeness, quality, metadata, corrections, build, export, or another type |
| **Key** | An optional id for the problem itself, such as `dataset/ICE.NDEX.NLB/2026-10-27/completeness`. Raising an alert with the key of an open alert does not create a second one: it counts another occurrence |
| **Timeline** | Everything that happened to the alert, in order, with who did it and when |

---

## What you get

| Where | What you can do |
|-|-|
| **Operations > Alerts** | See your alerts and the shared alerts about the datasets you follow, filter and search them, open one to see its details and the dataset delivery behind it, comment, raise, hand over, change the priority, close and reopen. Updates appear as they happen |
| [ODSL](/docs/extensions/alerts/odsl) | Find, read, raise, comment on and close alerts from your scripts |
| [Python](/docs/extensions/alerts/python) | The same from Python with the `odsl` package |
| [REST API](/docs/extensions/alerts/rest-api) | The same from any language |
| [Automations](/docs/extensions/alerts/automations) | Send an email or a Teams message when an alert is raised, closed, handed over, changes priority or gets a comment |
| [Insights](/docs/extensions/alerts/insights) | Reports on your alerts, starting with the [Alert Audit Report](/docs/public/insights/alert-audit-report): who did what and when, the whole history of any alert, and response times |

---

## Where next

- [The Alerts screen](/docs/extensions/alerts/the-alerts-screen): filters, figures, the list and one alert
- [Working with alerts](/docs/extensions/alerts/working-with-alerts): raise, comment, hand over, change the priority, close and reopen
- [Alerts in ODSL](/docs/extensions/alerts/odsl)
- [Alerts in Python](/docs/extensions/alerts/python)
- [Alerts REST API](/docs/extensions/alerts/rest-api)
- [Notifications and automations](/docs/extensions/alerts/automations)
- [Insights](/docs/extensions/alerts/insights): reports on your alerts
- [Reference](/docs/extensions/alerts/reference): fields, timeline entries, permissions and installation
