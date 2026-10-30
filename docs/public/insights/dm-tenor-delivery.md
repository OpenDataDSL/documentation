---
title: Tenor Delivery
description: An insight report that compares the tenors a dataset actually delivered each day with the tenors expected
slug: /public/insights/dm-tenor-delivery
catalog_summary: The tenors one dataset delivered each day, by tenor type, against what was expected
tags: [insight, report, dataset monitoring, tenors, completeness]
---

# Tenor Delivery

A forward curve dataset is only complete when it has all its contracts: the day ahead, the weekend, the months, quarters, seasons and years. **The Tenor Delivery** report counts the tenors a dataset delivered each day, by tenor type, next to the number expected. It answers questions like:

- Did this dataset deliver every expected tenor each day?
- On which days were tenors missing, and of which type?
- Is the expected tenor configuration still right for what the provider sends?

At Northgate Energy, Priya Shah uses it to see which contracts were missing from `ICE.NDEX.TTF` on the days it was only partly delivered.

![The Tenor Delivery report for ICE.NDEX.TTF, with the expected row at the top and two partial days](/img/insights/dm-tenor-delivery/overview.png)

---

## Opening the report

This is a dataset insight. Select a dataset on the Dataset Monitoring screen, then choose **Tenor Delivery** from its insights (category **Dataset Monitoring Insights**). Its report id is `#DMI_TENORDELIVERY`, and the dataset is passed in the `DSID` report property.

The report opens on **Last 30 days** and loads straight away.

| Control | What it does |
|-|-|
| **Date range** | **Today**, **Yesterday**, **Last 7 days**, **Last 30 days**, **Last 60 days**, **Last 90 days**, **This month**, **Last month** or **All** |
| **Start**, **End** | The on dates to include. Only the date part is used. |
| **Export (CSV)** | Downloads the table as `tenor-delivery.csv` |

---

## The report

The **Deliveries in range** card counts the delivery records in the range. The table has one row per delivery, and its first row, in bold, is the dataset's **expected** tenors. When the dataset has no expected tenors configured, that row says **Not Set**.

| Column | What it shows |
|-|-|
| **Date** | The on date of the delivery |
| **Status** | The delivery status, such as `loaded`, `partial` or `late` |
| `*` | The total number of tenors |
| One column per tenor type | The number of tenors of that type. Only the tenor types the dataset expects or delivered appear. |

The tenor type columns use these headings:

| Heading | Tenor type | Heading | Tenor type |
|-|-|-|-|
| **I** | Intraday | **HM1**, **HM2** | First and second half month |
| **short** | Short | **M** | Month |
| **bal** | Balance | **Q** | Quarter |
| **Day** | Day | **S** | Season |
| **CD** | Calendar day | **Y** | Year |
| **WKD** | Weekend | **Fin** | Financial |
| **Week** | Week | **Spr** | Spread |
| | | **Custom** | Custom |

At Northgate, the expected row asks for 28 tenors. On 5 and 27 October `ICE.NDEX.TTF` delivered 25: two quarters and one year were missing, and the status is `partial`.

---

## Where the data comes from

| Data | Where it comes from |
|-|-|
| Expected tenors | The `expected` settings of the dataset (`dataset` service, `info` source) |
| Delivered tenors and status | The `actual` and `status` fields of the dataset's `dataset_delivery` records |

The report reads the dataset's settings first to find where its delivery records are kept.

---

## Related

- [Quality and Critical Checks](/docs/public/insights/dm-quality-checks): the critical check that compares delivered and expected tenors
- [Delivery Scores](/docs/public/insights/dm-delivery-scores) and [Loaded Time Analysis](/docs/public/insights/dm-loaded-time): timeliness of the same dataset
- [Data Monitoring](/docs/odsl/dm/monitoring): how expected tenors are set and completeness is measured
- [Insights](/docs/odsl/insights/general): how insight reports work
