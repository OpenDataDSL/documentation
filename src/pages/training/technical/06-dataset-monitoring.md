---
slug: /training/technical/dataset-monitoring
title: "Module 06: Dataset Monitoring in the Portal"
sidebar_position: 7
tags: [training, dataset, monitoring, portal]
---

# Module 06: Dataset Monitoring in the Portal

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
2. In the left navigation, go to **Data Management → Datasets**
3. Search for `TRAINING.MYGASHUB` — you should see both datasets listed

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

:::note Complete Module 07 First
The script selector is a dropdown — the script must already exist on the platform before it can be selected here. Save the dataset configuration now without any quality checks, then return to this step after completing Module 07 and uploading the script.
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

1. In the left navigation, go to **Data Management → Dataset Monitoring**
2. Search for `TRAINING.MYGASHUB.SETTLEMENTS`
3. The dashboard will show a calendar view of delivery status by date

Each cell in the calendar represents one delivery date:

| Colour | Meaning |
|--------|---------| 
| 🟢 Green | Events delivered and passed quality checks |
| 🟡 Yellow | Events delivered but quality checks failed |
| 🔴 Red | Events not delivered or critical check failed |
| ⚫ Grey | Date not expected (e.g. weekend for a business calendar) |

---

## Step 8: View Delivery Details

Click on any date cell to see the delivery detail panel:

- **Completeness** — number of events received vs expected
- **Quality check results** — pass/fail for each check with error messages
- **Version history** — which version of the events was used

---

## Manual Delivery Trigger (optional)

If you want to test monitoring against data you have already loaded:

1. Go to **Dataset Monitoring → TRAINING.MYGASHUB.SETTLEMENTS**
2. Click on a date cell for which you saved settlement events in Modules 02 or 03
3. Click **Mark as Delivered**
4. The platform will run any configured quality checks against the events for that date

---

## Exercise

1. Confirm both `TRAINING.MYGASHUB.NOMINATIONS` and `TRAINING.MYGASHUB.SETTLEMENTS` appear in the Datasets list
2. Update the `TRAINING.MYGASHUB.SETTLEMENTS` configuration with a Business calendar and 18:00 delivery time
3. Use **Mark as Delivered** on one date that has settlement events and review the delivery detail panel

:::note Next Step
In [Module 07](/training/technical/quality-checks) you will write the quality check functions in an ODSL script and attach them to this dataset.
:::
