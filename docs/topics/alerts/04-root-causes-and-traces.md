---
title: Root causes and traces
description: How every run carries a trace id from data collection to export, how the alert raised by a failed load becomes the root cause, and how problems it caused are recorded on it
slug: /topics/alerts/root-causes-and-traces
sidebar_position: 4
tags: [topics, alerts, root cause, provenance, trace]
---

# Root causes and traces

One failed load can break much more than itself: the datasets it loads are late or incomplete, the curves built from them fail, and the exports of those curves do not run. Without help, that is many alerts for one problem. Root causes and traces keep it as one story, from data collection to data export.

---

## Traces

Every process run has an execution id. The work the run starts carries that id as its **trace**, however many steps later: the data it saves, the automations those saves trigger, the curves they build, the exports that follow, and any process those start in turn. The trace is set once, at the start of the chain, and never replaced.

| Where the trace is kept | Field |
|-|-|
| Process executions | `trace` |
| Dataset deliveries | each delivery's `trace` and `execution`, and `traces` on the delivery record |
| Curve builds and exports | `trace` on each build and export, and `traces` on the build record |
| Automation logs and queue logs | `trace` |
| Alerts raised in the run | `trace` (`id`, `type`, `process`, `execution`) and `traces` |

Scripts outside the platform (the Python SDK in a process run, or a REST call) pass the trace in the `x-odsl-trace` header. The Python SDK does this when you give the client to `process.TASK`.

To see everything one run started, give its trace id to the [Tracer](/docs/public/insights/tracer) insight.

---

## Root causes

A **root cause** is the alert raised by a failed run, usually by the load script when the data cannot be collected or loaded. An alert raised by a script or a person inside a process run is a root cause unless it sends `root: false`; one raised outside a run can be made a root cause with `root: true`. The platform's own alerts are never root causes.

A root cause raised in a run without a subject is about the run itself: the process and the date it is for, with type `load`. It can list the datasets the run was meant to load in `affects`.

---

## Problems folded into a root cause

Before the platform raises an alert about a dataset, a curve or an export, it looks for an open root cause that explains the problem: one raised in the same run (the same trace), one that names the dataset or whose process loads it, or one that already holds a problem on a curve's inputs or an export's curves, for the same date. When it finds one, the problem is recorded on the root cause as a **problem folded in** instead of raising an alert. It is marked **Recovered** when the item recovers.

Automations still hear of folded problems: `raised` when a problem is folded in, `closed` when it recovers.

---

## Linked alerts

An alert raised before its root cause was known (late data spotted before the load failed) cannot be folded in after the fact, so it is **linked** to the root cause when the root cause is raised. You can also link an alert to a root cause by hand. A linked alert is marked **Caused by** the root cause, and closing the root cause is noted on it.

The [Root causes](/docs/extensions/alerts/root-causes) page of the Alerts extension explains folding, linking and closing in full, with how the screen shows them.

---

## Next

[Working with alerts](/docs/topics/alerts/working-with-alerts)
