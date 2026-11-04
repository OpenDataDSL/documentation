---
title: Where alerts come from
description: The platform raisers that create alerts about datasets, curves and exports, the alerts people raise, and the alerts that close themselves
slug: /topics/alerts/where-alerts-come-from
sidebar_position: 2
tags: [topics, alerts, dataset monitoring, curves, operations]
---

# Where alerts come from

Most alerts are raised by the platform while it monitors your data. People raise the rest: your team, OpenDataDSL support, the scripts that load your data, and Fusion AI.

---

## Raised by the platform

| Raiser | Type | When | Key |
|-|-|-|-|
| Dataset monitoring | `completeness` | A delivery is late, missing or incomplete | `dataset/<dataset id>/<date>/completeness` |
| Dataset monitoring | `quality`, `critical` | A delivery fails its quality or critical checks | `dataset/<dataset id>/<date>/<type>` |
| Dataset monitoring | `initialisation` | The dataset's configuration cannot be used, such as a calendar that does not exist | `dataset/<dataset id>/<date>/initialisation` |
| Curve builds | `build` | A curve fails to build | `curve/<curve id>/<date>/build` |
| Curve quality checks | `quality` | A built curve fails its quality checks | `curve/<curve id>/<date>/quality` |
| Curve exports | `export` | An export group does not run | `curve-export/<group>/<date>` |
| The platform | various, category `system` | A configuration problem, such as an automation target that does not exist | |

The priority of a completeness alert comes from the dataset's **priority** (Medium when none is set). A dataset whose **alerts** setting is off raises no alerts.

:::note
While an open [root cause](/docs/topics/alerts/root-causes-and-traces) explains the problem, these raisers record it on the root cause instead of raising an alert of their own.
:::

---

## Alerts that close themselves

The platform closes its own alerts when the problem goes away:

| Alert | Closes when | Resolution |
|-|-|-|
| A late, missing or incomplete delivery | The data arrives and the delivery is complete | `Dataset is now complete` |
| A delivery on a day the calendar should not have expected data | OpenDataDSL corrects the dataset's calendar from the alert, and the delivery becomes a holiday | No data is expected on the date according to the calendar |
| A failed curve build or quality check | The curve builds, or passes its checks | The curve's status |
| A failed export | The export runs | The export's status |

Alerts raised by people are closed by people.

---

## Raised by people

| Who | How |
|-|-|
| Your team | **Raise alert** on the [Alerts screen](/docs/extensions/alerts/working-with-alerts#raise-an-alert), to ask OpenDataDSL for help or to track a problem yourselves |
| Scripts | `save ${alert:a}` in [ODSL](/docs/extensions/alerts/odsl), `update('alert', ...)` in [Python](/docs/extensions/alerts/python), or `POST alert/v1/private` in the [REST API](/docs/extensions/alerts/rest-api). A script that loads data raises the alert when collection or loading fails |
| Fusion AI | The `raise_alert` tool, from a conversation with an assistant. Its alerts are tagged `fusion-ai` |
| OpenDataDSL | Shared alerts about common and public data, and alerts for you about your data |

Give an alert a **key** when the same problem can be raised again (a script that checks something every hour, say): while an alert with that key is open, raising it again counts another occurrence.

An alert raised by a script running in a process is a **root cause** unless it says otherwise; see [Root causes and traces](/docs/topics/alerts/root-causes-and-traces).

:::note
Alerts are not part of the none plan: on that plan nothing is raised, and people cannot raise or comment on alerts.
:::

---

## Next

[Who sees an alert](/docs/topics/alerts/who-sees-an-alert)
