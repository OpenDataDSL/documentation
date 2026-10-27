---
slug: /training/user/timeseries-excel
title: "Module 05: TimeSeries in Excel"
sidebar_position: 6
tags: [training, user, excel, timeseries]
---

# Module 05: TimeSeries in Excel

In this module you will use the Excel Add-in to load timeseries into a worksheet, analyse them with ordinary Excel tools, keep them up to date with **Refresh**, and upload revised values back to the platform.

## Learning Objectives

By the end of this module you will be able to:

- Download one or more timeseries for a chosen date range and timezone
- Choose between the horizontal and vertical layouts
- Analyse the data with Excel formulas and charts
- Refresh the data later without searching again
- Correct values and upload them, and create a new timeseries from a template

## Prerequisites

- The Excel Add-in is installed and you are signed in ([Module 03](/training/user/excel-setup))
- For the upload steps: permission to change your company's private data, ideally in a test environment

:::note Example data
The download steps use the public ECB rates such as `#ECB_FX.EURGBP:SPOT`. If the Technical track's training scenario is set up, you can also download `MY.GAS.HUB:SETTLEMENT_PRICE` or `MY.GAS.HUB:BUY_VOLUME`. Those are built from events or formulas, so they are for reading only: to change their values, change the events (Module 04).
:::

---

## Step 1: Download TimeSeries

1. From the toolbar select **Download**, then **Timeseries**, or select **Download** on the **Timeseries** card of the home screen
2. Search for the timeseries you want. Use the filters or the search box to narrow the list, for example `ECB EUR`
3. To download one timeseries, select the download icon on its row. To download several, select the plus icon on each one to add it to the selection

![Download and add icons on each timeseries](/img/training/excel/timeseries-download3.png)

4. Optionally, on the **Options** tab, choose the **Range** of dates and the **Timezone** for the values

![The Options tab with the range and timezone](/img/training/excel/timeseries-download4.png)

5. Choose the layout:

| Layout | Ids | Dates | Values flow |
|-|-|-|-|
| **Horizontal** | First column | First row | Across the sheet |
| **Vertical** | First row | First column | Down the sheet |

6. Select **Download**

:::tip Which layout?
**Vertical** puts one date per row, which suits Excel charts, filters and formulas such as `AVERAGE` best. **Horizontal** is handy when you compare many timeseries side by side over a short range.
:::

---

## Step 2: Analyse the Data

The downloaded values are ordinary Excel cells, so all of Excel is available. With a vertical layout and the values of `#ECB_FX.EURGBP:SPOT` in column B, for example:

```
=AVERAGE(B2:B30)
=MAX(B2:B30)-MIN(B2:B30)
```

You can also add a line chart over the range, or compare two timeseries in a third column.

:::tip Keep your workings separate
Put your own formulas and charts next to the downloaded range or on another sheet, rather than inside it. The add-in then always finds the range intact when you refresh or upload.
:::

### Conversion options (optional)

The add-in also offers Excel functions, such as `ODSL.SERIESRANGE`, whose options convert data as it is loaded, for example `currency=USD`, `units=MWH`, `precision=2` or `$timezone=Europe/London`. See [Excel Functions](/docs/user/excel/functions) if you need these.

---

## Step 3: Refresh the Data

Next day, there is no need to search again:

1. From the toolbar select **Refresh**, or select **Timeseries** on the **Refresh** card
2. The add-in lists the timeseries ranges it finds in your worksheet
3. Select the refresh icon on one range, or tick several and select **Refresh**

Formulas and charts that point at the range recalculate with the new values.

---

## Step 4: Upload Revised Values

Use this when you need to correct or fill in values in a private timeseries your company maintains.

1. Change the values in the downloaded range. You can change several cells and several timeseries at once
2. From the toolbar select **Upload**, or select **Upload** on the **Timeseries** card
3. Choose the timeseries range from the ranges the add-in found in the worksheet
4. Select the upload icon on one range, or tick several and select **Upload**

:::note What happens to the old values
If versioning is configured for the timeseries, the platform keeps the previous values as an earlier version, so changes can be traced. Public data (ids starting with `#`) is maintained by OpenDataDSL, so make your revisions to your company's own private timeseries.
:::

---

## Step 5: Create a New TimeSeries

1. From the toolbar select **New**, then **Timeseries**, or select **Create** on the **Timeseries** card
2. Choose the **Object Type** and **Calendar**, and type the **Id** as `objectid:timeseriesid`, for example `TRAINING.PRACTICE:YOURNAME_PRICE`. Separate several ids with commas to create more than one
3. Optionally fill in **Currency**, **Unit** and **Timezone**
4. Under **Options**, choose how to create it:
   - **Add only template to worksheet**: adds the layout only; the timeseries is created when you upload data
   - **Create and add to worksheet**: creates it, then adds the layout
   - **Create Only**: creates it without touching the worksheet
5. Choose the layout and select **Create**
6. Type values into the template and upload them as in Step 4

---

## Exercise

1. Download `#ECB_FX.EURGBP:SPOT` and `#ECB_FX.EURUSD:SPOT` (or another two ECB rates) for the last month in the vertical layout
2. Work out the average of each, and chart them together
3. Refresh the ranges and check your formulas update
4. In your test environment, create `TRAINING.PRACTICE:YOURNAME_PRICE` with a business calendar using **Add only template to worksheet**, enter five values and upload them
5. Change one value, upload again, and open the timeseries in the portal to confirm the change

---

## Summary

| Task | Where |
|-|-|
| Download | **Download**, **Timeseries**, search, download or plus icon, **Options**, layout, **Download** |
| Analyse | Ordinary Excel formulas and charts, kept outside the range |
| Refresh | **Refresh**, choose the ranges |
| Upload changes | Edit cells, **Upload**, choose the ranges |
| Create | **New**, **Timeseries**, id `object:series`, options, **Create** |

**Further reading:** [Working with timeseries in Excel](/docs/user/excel/timeseries), [Working with curves in Excel](/docs/user/excel/curves), [Excel Functions](/docs/user/excel/functions)

:::note Next Step
In [Module 06](/training/user/dataset-dashboard) you will check whether your data arrived on time and passed its quality checks.
:::
