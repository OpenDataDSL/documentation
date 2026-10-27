---
slug: /training/technical/alerts
title: "Module 09: Alerts & Notifications"
sidebar_position: 10
tags: [training, alerts, notifications, dataset, automation]
---

# Module 09: Alerts & Notifications

In the previous modules you configured delivery timing for the `TRAINING.MYGASHUB.SETTLEMENTS` dataset and attached quality and critical checks to it. In this module you will see how the platform raises **alerts** when that dataset is late, missing or fails its checks, and how to be **notified** about them.

## Alerts and Alert Records

The platform separates the definition of an alert from the alerts that are actually raised:

| Term | Service | Description |
|------|---------|-------------|
| **Alert** | `alert` | The configuration for an alert, for example which dataset it is about |
| **Alert Record** | `alertrecord` | An alert that has been raised: one record per issue, open until it is closed, with a timeline of what happened |

There are four alert types:

| Type | Description |
|------|-------------|
| `DatasetAlert` | System generated alerts about late or bad quality data, and manually curated messages about datasets |
| `MetricAlert` | User definable metrics that alert you when a threshold has been breached |
| `SystemAlert` | Issues raised by the platform about incorrect configuration or general issues |
| `ServiceAlert` | Alerts about a specific platform service |

This module concentrates on `DatasetAlert`, because it covers the two cases we care about: delivery failures and quality check violations.

---

## Step 1: Understand When Dataset Alerts Are Raised

When a dataset is **late**, **missing**, or **fails a quality check**, the platform raises a `DatasetAlert` for it. For the settlements dataset this is driven by the configuration you created in the [Dataset Monitoring](/training/technical/dataset-monitoring) and [Quality Checks](/training/technical/quality-checks) modules:

| Configuration | Raises an alert when |
|---------------|----------------------|
| Delivery time and late time | Events have not arrived within the delivery window |
| Calendar | An expected delivery date has no data |
| Quality and critical checks | A check function returns `"warning"` or `"failed"` |

Each alert record carries the `ondate` it is about, an `issue` describing the problem, a `message`, an `impact` of `critical`, `high`, `medium` (the default) or `low`, and a `status` of `open` or `closed`.

:::note One Record per Issue
Saving a record that matches an open record with the same type, name, ondate and issue updates that record and adds to its timeline, rather than creating a new one. For a `DatasetAlert`, the dataset delivery for the ondate is also updated with the number of open alerts.
:::

---

## Step 2: Find the Alerts Raised for Your Dataset

```js
//#region
use training

// All open dataset alerts for the settlements dataset
openAlerts = find ${alertrecord} where type = "DatasetAlert" and name = "TRAINING.MYGASHUB.SETTLEMENTS" and status = "open"

for rec in openAlerts
    print rec.ondate + " " + rec.issue + " (" + rec.impact + "): " + rec.message
next
//#endregion
```

If nothing is returned, your dataset has no open alerts. Step 4 shows how to raise one yourself so you have something to work with.

---

## Step 3: Define a Dataset Alert

An alert definition lets you describe the alert and set its default impact. A `DatasetAlert` needs a `name` and the `dsid` of the dataset.

```js
//#region
use training

a = Alert("TRAINING.MYGASHUB.SETTLEMENTS")
a.type = "DatasetAlert"
a.dsid = "TRAINING.MYGASHUB.SETTLEMENTS"
a.description = "Settlement prices for the training gas hub are late, missing or failed checks"
a.impact = "high"

save ${alert:a}
print "Dataset alert saved"
//#endregion
```

:::tip Updating an Alert
An existing alert with the same type and name is updated when you save it, so you can re-run this script to change the description or impact.
:::

---

## Step 4: Raise an Alert Record from a Script

As well as the alerts the platform raises, you can raise your own, for example when an analyst spots a problem that no check covers.

```js
//#region
use training

rec = AlertRecord("TRAINING.MYGASHUB.SETTLEMENTS", "DatasetAlert")
rec.ondate = "2025-03-03"
rec.issue = "price-review"
rec.message = "Settlement price for 2025-03-03 is under review with the counterparty"
rec.impact = "medium"

save ${alertrecord:rec}
print "Alert record raised"
//#endregion
```

Run the script a second time with a different `message`. Because the type, name, ondate and issue match the open record, the platform adds the new message to the timeline of the same record instead of creating a duplicate.

---

## Step 5: Get Notified About Delivery Failures

To be told when something goes wrong, add an **automation** on the event that raises the alert. A dataset alert is raised when a dataset is late or missing, so an automation on the `late` and `missing` actions of the `dataset` service notifies you at the same time.

```js
//#region
use training

ab = AutomationBuilder("dataset", "private", "TRAINING.MYGASHUB.SETTLEMENTS")
ab.addCondition("late")
ab.addCondition("missing")
ab.setTarget("email")
ab.setProperty("to", "your.name@example.com")
ab.setProperty("subject", "Settlements late or missing: TRAINING.MYGASHUB.SETTLEMENTS")
ab.icon = "bell-fill text-warning"
ab.enabled = true

save ${automation:ab}
print "Delivery failure automation saved"
//#endregion
```

Replace the `to` address with your own. An automation fires when **any** of its conditions match, so this single automation covers both cases.

---

## Step 6: Get Notified About Quality Check Violations

Quality and critical check failures are recorded as dataset alert records. To be notified whenever an alert record for the settlements dataset is raised or updated, watch the `alertrecord` service using the id `DatasetAlert/` followed by the dataset id.

```js
//#region
use training

ab = AutomationBuilder("alertrecord", "private", "DatasetAlert/TRAINING.MYGASHUB.SETTLEMENTS")
ab.addCondition("create")
ab.addCondition("update")
ab.setTarget("email")
ab.setProperty("to", "your.name@example.com")
ab.setProperty("subject", "ALERT: TRAINING.MYGASHUB.SETTLEMENTS")
ab.icon = "bell-fill text-danger"
ab.enabled = true

save ${automation:ab}
print "Alert record automation saved"
//#endregion
```

To test it, re-run the alert record script from Step 4 with a new message and check your inbox.

:::tip Sending to Microsoft Teams
To post to a Teams channel instead of sending an email, use the `teams` target. It needs a `url` (the incoming webhook URL for the channel) and a `template` (the id of a mustache script that formats the message).
:::

---

## Step 7: Close an Alert

When the issue has been resolved, close the record by setting its `status` to `closed` and saving it.

```js
//#region
use training

openAlerts = find ${alertrecord} where type = "DatasetAlert" and name = "TRAINING.MYGASHUB.SETTLEMENTS" and issue = "price-review" and status = "open"

for rec in openAlerts
    rec.status = "closed"
    rec.message = "Price confirmed with the counterparty"
    save ${alertrecord:rec}
    print "Closed alert for " + rec.ondate
next
//#endregion
```

---

## Metric Alerts (optional)

A `MetricAlert` checks a platform metric on a schedule and raises an alert when it crosses a threshold. It needs a `metric`, how the metric is `observed` over the `lookback` (for example `summed`), an `operator` (`gt`, `gte`, `lt` or `lte`), a `checkFrequency` such as `15m`, and either an `absoluteThreshold` or a dynamic threshold. See the [Alerts](/docs/odsl/os/alerts) topic for the full property list.

---

## Summary

| What you did | How |
|--------------|-----|
| Found open alerts for a dataset | `find ${alertrecord} where ...` |
| Defined a dataset alert | `Alert(name)` with `type = "DatasetAlert"` and `dsid`, saved to `${alert}` |
| Raised and updated an alert record | `AlertRecord(name, "DatasetAlert")`, saved to `${alertrecord}` |
| Notified on delivery failures | Automation on the `dataset` service, `late` and `missing` actions |
| Notified on quality violations | Automation on the `alertrecord` service for the dataset |
| Closed an alert | Set `status = "closed"` and save |

## Exercise

1. Create a delivery failure automation for `TRAINING.MYGASHUB.NOMINATIONS`
2. Raise an alert record for `TRAINING.MYGASHUB.NOMINATIONS` with an impact of `low`, then run the script again with a new message and confirm only one open record exists
3. Close the record and confirm it no longer appears in the open alerts query

For more detail, see [Alerts](/docs/odsl/os/alerts), the [Alert and AlertRecord](/docs/odsl/variable/alert) variable reference and the [Alert Record service](/docs/api/rest/service/alertrecord).

:::note Next Step
In [Module 10](/training/technical/automations) you will look at automations in more depth and use them, together with scheduled processes, to run scripts and data workflows.
:::
