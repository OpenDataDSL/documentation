---
title: What is an alert?
description: The core elements of an alert in OpenDataDSL, and how an alert moves from raised to closed
slug: /topics/alerts/what-is-an-alert
sidebar_position: 1
tags: [topics, alerts, operations, concepts]
---

# What is an alert?

An **alert** is one problem with your data that someone needs to look at: a dataset delivery that is late, a quality check that failed, a curve that did not build, an export that did not run. The platform raises most alerts itself; your team, OpenDataDSL and Fusion AI can raise them too.

An alert works like a small support ticket. It stays **open** until someone closes it with a **resolution**, it is always **with** someone who has to act next, and its **timeline** keeps everything that happened to it. One problem is one alert: when the same problem happens again, the alert counts another occurrence instead of a new alert being raised.

Throughout these pages we follow Northgate Energy, a fictional gas and power trader that loads ICE Endex and EEX settlement prices every evening and builds its forward curves from them.

---

## The core elements

| Element | What it is | Example |
|-|-|-|
| **Id** | `ALR-` and the year and a number for your own alerts, `ALC-` for shared alerts about common data, `ALP-` for public data | `ALR-2026-000401` |
| **Title** and **message** | A short description, and what is wrong | `ICE.NDEX.NLB 2026-11-02: data is late` |
| **Subject** | What the alert is about: a service (`dataset`, `curve`, `curve-export`, `process` and so on), an id, and the date for a delivery or a build | dataset `ICE.NDEX.NLB` for `2026-11-02` |
| **Type** | The kind of problem (the `issue` field) | `completeness`, `quality`, `critical`, `build`, `export`, `load` |
| **Category** | A grouping | `dataset`, `curve`, `process`, `system` |
| **Priority** | How urgent it is (the `severity` field): **Critical**, **High**, **Medium** or **Low** | High |
| **Status** | **Open** or **Closed** | Open |
| **With** | Who has to act next (the `agent` field): **your team** (`client`), **OpenDataDSL** (`opendatadsl`), or a data vendor by name | `ice` |
| **Key** | The id of the problem itself, used to recognise it when it happens again | `dataset/ICE.NDEX.NLB/2026-11-02/completeness` |
| **Occurrences** | How many times the problem happened while the alert was open | 3 |
| **Timeline** | Everything that happened, in order, with who did it and when: raised, comments, hand-overs, priority changes, closing and reopening | |
| **Resolution** | What was wrong and what was done, required to close | `ICE republished the file at 19:40; the delivery is now complete` |

The full list of fields is in the [Alerts reference](/docs/extensions/alerts/reference).

---

## From raised to closed

| Step | What happens |
|-|-|
| **Raised** | The alert is created, open, with the party that has to act. The platform's own alerts about your data start with your team; shared alerts start with OpenDataDSL |
| **Happens again** | Raising an alert with the key of an open alert adds an occurrence to it, and raises its priority if the new one is higher. Nothing new is created |
| **Comments** | Anyone working on it adds what they found. Comments can be edited and deleted by their author |
| **Handed over** | The alert moves to the party that has to act next: to OpenDataDSL for help, to a data vendor while waiting on a file, back to your team |
| **Priority changed** | Someone decides it is more or less urgent than it looked |
| **Closed** | Someone closes it with a resolution, or it closes itself when the problem goes away (for example a completeness alert when the missing data arrives) |
| **Reopened** | A closed alert can be reopened for 7 days. If the same problem (the same key) is raised again within those 7 days, the closed alert is reopened instead of a new one being raised |

Every step is written to the alert's timeline by the platform, so the timeline is the alert's complete history.

---

## Time with each party

The platform measures how long each alert has been open and how long it spent with each party: OpenDataDSL, your team and data vendors. It also records the first response (the first comment, hand-over or close by someone other than the person who raised it), how many times the alert was handed over and how many times it was reopened. These figures are the alert's `metrics`, shown on the alert and used by the [Alert Audit Report](/docs/public/insights/alert-audit-report).

---

## Where next

- [Where alerts come from](/docs/topics/alerts/where-alerts-come-from)
- [Who sees an alert](/docs/topics/alerts/who-sees-an-alert)
- [Root causes and traces](/docs/topics/alerts/root-causes-and-traces)
- [Working with alerts](/docs/topics/alerts/working-with-alerts)
- [The Alerts extension](/docs/extensions/alerts/overview), the screen for working on your alerts
