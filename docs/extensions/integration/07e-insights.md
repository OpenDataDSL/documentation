---
title: Insights
description: The insight reports of the Integration extension, about delivery over time, the items that keep failing, send times, corrections and the codes of each system
slug: /extensions/integration/insights
sidebar_position: 7.9
tags: [extension, integration, insights, reports]
---

# Insights

The Integrations screen has **Insights**: reports that look across every system and group, and over weeks rather than one day. They come with the extension (category `odsl.integration`) and read the same daily reports, corrections logs, runs and codes as the screen.

---

## The reports

| Report | What it answers |
|-|-|
| [Integration Delivery History](/docs/public/insights/integration-delivery-history) | How much of each system's daily report was sent each day, which days fell short and what was not sent, and the days that missed the cutoff |
| [Integration Problem Items](/docs/public/insights/integration-problem-items) | The curves and timeseries that failed, had no data or were held back most often, whether they still do, and the reasons |
| [Integration Send Times](/docs/public/insights/integration-send-times) | When each group finishes sending, how late it has been against its usual time and the cutoff, and how long its runs take |
| [Integration Corrections](/docs/public/insights/integration-corrections) | The corrections found in a period, the ones waiting for approval, and how long sending them took |
| [Integration Codes by System](/docs/public/insights/integration-codes-by-system) | The codes each system knows your data by, the required codes that are missing and codes given to two items |

![The Calendar tab of the Integration Delivery History](/img/insights/integration-delivery-history/overview.png)

---

## Opening a report

1. Open **Operations > Integrations**.
2. Open the screen's **Insights** tab and choose the report.

Each report has a **Help** link at the top that opens its own page in this documentation.

:::tip
When a curve keeps failing, open **Integration Problem Items** to see since when and why, then **Integration Codes by System** to check its codes in every system.
:::

---

## Next

[Reference](/docs/extensions/integration/reference)
