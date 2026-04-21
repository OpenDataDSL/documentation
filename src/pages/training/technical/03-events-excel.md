---
slug: /training/technical/events-excel
title: "Module 03: Working with Events in Excel"
sidebar_position: 4
tags: [training, events, excel]
---

# Module 03: Working with Events in Excel

In this module you will use the **OpenDataDSL Excel Add-in** to view, add, and update events without writing any code. This is useful for business users or for bulk data entry workflows.

## Prerequisites

- The OpenDataDSL Excel Add-in must be installed and authenticated
- You have completed Module 02 so the `MY.GAS.HUB` object and `NOMINATIONS` event list already exist

---

## Step 1: Open the Add-in and Select the Training Environment

1. Open Microsoft Excel
2. Go to the **OpenDataDSL** tab in the ribbon
3. Click **Sign In** if you are not already authenticated
4. The OpenDataDSL task pane will open on the right-hand side
5. Click the **Settings** (gear icon) in the task pane
6. Select **training** from the environment list to switch to your training environment

:::note
All reads and writes in the add-in will now target the training environment, consistent with the scripts you ran in Module 02.
:::

---

## Step 2: Load Events into a Worksheet

1. In the task pane, navigate to **Events → Download**
2. Select the **private** source
3. Click the **Add** button next to the `MY.GAS.HUB:NOMINATIONS` event list
4. Select the **Options** tab and set a date range — for example, `2025-03-01` to `2025-03-07`
5. Click **Download**

The add-in will insert a table into your worksheet with one row per event. Each column corresponds to an event property:

| id | eventstart | eventend | direction | volume | counterparty | _dsid |
|----|------------|----------|-----------|--------|--------------|-------|
| NOM-20250301-001 | 2025-03-01 | 2025-03-02 | BUY | 5500 | ACME Energy Ltd | TRAINING.MYGASHUB.NOMINATIONS |
| NOM-20250302-001 | 2025-03-02 | 2025-03-03 | BUY | 4873 | ACME Energy Ltd | TRAINING.MYGASHUB.NOMINATIONS |

---

## Step 3: Update Events in Excel

1. Click into any cell in the table and edit the value — for example, change the `volume` for `2025-03-03` from `4873` to `5200`
2. You can update multiple rows at once
3. When you are ready to save, go to **Events → Upload** in the task pane — all rows in the table will be submitted

---

## Step 4: Add New Events in Excel

To add new events without coding:

1. Add a new row at the bottom of the loaded table
2. Fill in all required columns:
   - `id` — a unique event identifier, e.g. `NOM-20250308-001`
   - `eventstart` — the gas day date
   - `eventend` — the day after
   - `direction` — `BUY` or `SELL`
   - `volume` — a numeric value
   - `counterparty` — a text string
   - `_dsid` — the dataset identifier, e.g. `TRAINING.MYGASHUB.NOMINATIONS`
3. Go to **Events → Upload** to save the new row along with any other changes

:::tip Event IDs and Dataset Monitoring
Always set a unique `id` for every event. Using a consistent naming convention such as `{type}-{date}-{sequence}` (e.g. `NOM-20250308-001`) makes events easy to identify and means re-uploading the same row will update the event rather than create a duplicate.

Always include the `_dsid` column when uploading events — this is required for dataset monitoring. Events without `_dsid` will not be tracked.
:::

---

## Step 5: Create a New Event List via a Template

The add-in can generate a blank template worksheet for a new event list, ready for you to fill in.

1. In the task pane, navigate to **Events → Create**
2. Select the **Event Type** as `settlementType`
3. In the ID field, type the full event list identifier: `MY.GAS.HUB:SETTLEMENTS`
4. Click **Create**

The add-in will create a new worksheet with the correct column headers for the `SETTLEMENTS` event list. Fill in your data rows:

| id | eventtime | price | currency | _dsid |
|----|-----------|-------|----------|-------|
| SET-20250301-001 | 2025-03-01 | 0.8510 | GBP | TRAINING.MYGASHUB.SETTLEMENTS |
| SET-20250302-001 | 2025-03-02 | 0.8475 | GBP | TRAINING.MYGASHUB.SETTLEMENTS |
| SET-20250303-001 | 2025-03-03 | 0.8620 | GBP | TRAINING.MYGASHUB.SETTLEMENTS |

Once your data is ready, go to **Events → Upload** to save it to the platform.

---

## Step 6: Verify in the Portal

After uploading:

1. Open the **OpenDataDSL Portal** in your browser
2. Navigate to **Master Data → MY.GAS.HUB**
3. Click on the **Events** tab
4. Select the `SETTLEMENTS` event list
5. Confirm your uploaded events appear with the correct dates and values

---

## Tips for Excel Data Entry

- Use the standard Excel date format for date columns — no special formatting is required.
- Numeric columns should not contain currency symbols or thousand separators.
- Always set a unique `id` for every event row — never leave it blank.
- Use Excel **data validation** (dropdowns) on columns like `direction` or `currency` to enforce consistent values.

---

## Exercise

1. Load the `NOMINATIONS` events you created in Module 02 into Excel
2. Update the `volume` for at least two gas days and upload the changes
3. Add a new `SELL` nomination for `2025-03-08` with id `NOM-20250308-002`, volume `2500`, and counterparty `Delta Power`, then upload
4. Verify all changes in the portal

:::note Next Step
In [Module 04](/training/technical/event-timeseries) you will use ODSL to create EventTimeSeries from the events you have loaded.
:::
