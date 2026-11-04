---
title: Working with alerts
description: The ways to see and work on alerts (the Alerts screen, ODSL, Python and the REST API), notifications through automations, and the insights about alerts
slug: /topics/alerts/working-with-alerts
sidebar_position: 5
tags: [topics, alerts, automations, insights, how-to]
---

# Working with alerts

You can work on alerts in the portal, in code, or let automations act on them for you.

---

## Ways in

| How | What you can do | Documentation |
|-|-|-|
| The portal | **Operations > Alerts**: your alerts and the shared alerts you follow, with filters and figures; one alert with its dataset delivery, root cause and timeline; raise, comment, hand over, change the priority, close and reopen | [The Alerts extension](/docs/extensions/alerts/overview), [The Alerts screen](/docs/extensions/alerts/the-alerts-screen), [Working with alerts](/docs/extensions/alerts/working-with-alerts) |
| ODSL | Find, read, raise and change alerts with the `alert` service | [Alerts in ODSL](/docs/extensions/alerts/odsl) |
| Python | The same with the Python SDK | [Alerts in Python](/docs/extensions/alerts/python) |
| REST API | `alert/v1/private`, `common` and `public` | [Alerts REST API](/docs/extensions/alerts/rest-api) |
| Fusion AI | Ask an assistant to raise an alert | [Where alerts come from](/docs/topics/alerts/where-alerts-come-from#raised-by-people) |

---

## Notifications

To hear about alerts as they happen, add an automation on the `alert` service. Its actions are:

| Action | When |
|-|-|
| `raised` | An alert is raised, or a problem is folded into a root cause |
| `closed` | An alert is closed, or a folded problem recovers |
| `reopened` | An alert is reopened |
| `agent` | An alert is handed over |
| `severity` | An alert's priority changes |
| `comment` | A comment is added, edited or deleted |

The condition's id is what the alert is about (a dataset or curve id) or `*` for every alert, so "email the gas desk when anything about `ICE.NDEX.TTF` is raised" is one automation. See [Notifications and automations](/docs/extensions/alerts/automations) for examples, and [Automation basics](/docs/topics/automations/basics) for how automations work.

---

## Insights

| Insight | What it answers |
|-|-|
| [Alert Audit Report](/docs/public/insights/alert-audit-report) | Who raised, commented on, handed over and closed your alerts, and when; the whole history of one alert; how quickly alerts were answered and closed |
| [Tracer](/docs/public/insights/tracer) | Everything one run started, by its trace id |

---

## Where next

- [The Alerts extension](/docs/extensions/alerts/overview)
- [Alerts reference](/docs/extensions/alerts/reference): every field of an alert and its timeline entries
