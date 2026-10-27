---
slug: /training/technical/dataset-monitoring
title: "Module 07: Dataset Monitoring in the Portal"
sidebar_position: 8
tags: [training, dataset, monitoring, portal]
---

# Module 07: Dataset Monitoring in the Portal

A **Dataset** is automatically created by the platform when events carrying a `_dsid` property are saved. The `_dsid` value — in the format `provider.feed.product` — uniquely identifies the dataset. The platform tracks delivery of those events each business day and provides a monitoring dashboard showing completeness and quality.

:::note How Datasets Are Created
You do not need to create a dataset manually. As soon as the first event with a given `_dsid` is saved, the platform creates the dataset automatically. Datasets are connected to the events that carry their `_dsid` — not to timeseries or curves.
:::

---

## What Does a Dataset Track?

A dataset tracks the **delivery of events** for a defined schedule. Each day the platform checks:

- **Completeness** — did the expected events arrive?
- **Quality** — did the data pass the quality checks?
- **Critical checks** — did the data pass checks that would block downstream use?

The results are shown on the **Dataset Monitoring** dashboard, giving a daily traffic-light view of data health.

---

## Step 1: Confirm Your Dataset Exists

The events you saved in Modules 02 and 03 all carried `_dsid = "TRAINING.MYGASHUB.NOMINATIONS"` and `_dsid = "TRAINING.MYGASHUB.SETTLEMENTS"`. The platform will have created both datasets automatically.

To verify:

1. Open the **OpenDataDSL Portal**
2. Open the **Dataset Monitoring** dashboard
3. Select the **Monitored** button to list every dataset you are entitled to see, then search for `TRAINING.MYGASHUB`. You should see both datasets listed
4. Select the **add** button on each one so they appear in your monitored list

---

## Step 2: View and Edit the Dataset Configuration

Click on `TRAINING.MYGASHUB.SETTLEMENTS` to open the dataset. You can review and update its configuration:

| Field | Value |
|-------|-------|
| **Dataset ID** | `TRAINING.MYGASHUB.SETTLEMENTS` |
| **Name** | My Gas Hub – Settlement Prices |
| **Description** | Daily settlement price monitoring for the training gas hub |
| **Category** | GAS |
| **Calendar** | `#DAILY` |
| **Timezone** | Europe/London |

The **Calendar** determines which days the dataset is expected. Use `#DAILY` for a dataset that delivers one value per day.

---

## Step 3: Configure Delivery Timing

In the **Delivery** section:

| Field | Value |
|-------|-------|
| **Time** | `18:00` |
| **Timezone** | `Europe/London` |
| **Late** | `18:30` |

This tells the monitoring dashboard that events should arrive by 18:00 London time. Events received after 18:30 will be flagged as late.

---

## Step 4: Add a Quality Check Script Reference

In the **Quality Checks** section you can attach check functions once the script has been uploaded.

:::note Complete Module 08 First
The script selector is a dropdown — the script must already exist on the platform before it can be selected here. Save the dataset configuration now without any quality checks, then return to this step after completing Module 08 and uploading the script.
:::

---

## Step 5: Add a Critical Check

Critical checks are quality checks that, if they fail, mark the dataset as **blocked** — indicating that downstream processes should not use the data.

In the **Critical Checks** section:

| Field | Value |
|-------|-------|
| **Critical check script** | `my_gas_hub_quality_checks` |
| **Function name** | `criticalPriceCheck` |

---

## Step 6: Save the Dataset Configuration

Click **Save**. The platform will begin tracking delivery against the updated configuration on the next business day.

---

## Step 7: View the Monitoring Dashboard

1. Open the **Dataset Monitoring** dashboard
2. Find `TRAINING.MYGASHUB.SETTLEMENTS` in your monitored list
3. Read its row of status icons for the selected date:

| Icon | Values | What it tells you |
|-|-|-|
| **Delivery Status** | waiting, active, partial, holiday, loaded, late, missing | Where the delivery is in its lifecycle |
| **Delivery Score** | 0 to 4 | How promptly the data arrived (4 is on time, 0 means no data expected) |
| **Quality Status** | unchecked, valid, warning, failed, severe | The overall result of the quality checks |
| **Alerts** | A number | How many alerts were raised for this dataset |

---

## Step 8: View Delivery Details

Select the dataset to open its tabs for the selected date:

- **General**: the status information and the result of each completeness check (expected against actual) and quality check
- **Data**: the events delivered for this dataset on that date
- **Timeline**: everything that happened to the dataset on that date
- **Alerts**: alerts raised for the dataset on that date

The [Dataset Monitoring](/training/user/dataset-dashboard) module in the User track explains every icon and tab in more detail.

---

## Re-running the Checks (optional)

If you want to test monitoring against data you have already loaded, select a date for which you saved settlement events in Modules 02 or 03 and use the dataset actions to run the quality checks again. The actions available depend on your access rights.

---

## Exercise

1. Confirm both `TRAINING.MYGASHUB.NOMINATIONS` and `TRAINING.MYGASHUB.SETTLEMENTS` appear in the Datasets list
2. Update the `TRAINING.MYGASHUB.SETTLEMENTS` configuration with a Business calendar and 18:00 delivery time
3. Select a date that has settlement events and review the General and Timeline tabs

:::note Next Step
In [Module 08](/training/technical/quality-checks) you will write the quality check functions in an ODSL script and attach them to this dataset.
:::
