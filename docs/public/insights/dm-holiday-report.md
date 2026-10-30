---
title: Holiday Report
catalog_title: Holiday Report (dataset)
sidebar_label: Holiday Report (dataset)
description: A Dataset Monitoring insight that lists the holidays in the calendar a dataset follows, for this year or next year
slug: /public/insights/dm-holiday-report
catalog_summary: The holidays a dataset follows this year or next, from its own or its feed's calendar
tags: [insight, report, dataset monitoring, calendar, holidays]
---

# Holiday Report

A dataset is not expected on a holiday: Dataset Monitoring uses the dataset's calendar to know when to expect data, and quality checks do not run on a holiday. **The Holiday Report** shows the holidays one dataset follows and answers questions like:

- Is this dataset expected on Good Friday or Christmas Eve?
- Which calendar does this dataset follow: its own or its feed's?
- Which days next year will this dataset not be delivered?

Throughout this page we follow Northgate Energy, a fictional gas and power trader that monitors the EEX TTF spot dataset `EEX.NG_SPOT.TTF`.

![The Holiday Report for the EEX TTF spot dataset, showing this year's holidays](/img/insights/dm-holiday-report/overview.png)

---

## Opening the report

Select a dataset on the **Dataset Monitoring** screen and choose **Holiday Report** from its insights (category **Dataset Monitoring Insights**). It is not listed in the Reports menu.

| Registration | Value |
|-|-|
| Report id | `#DMI_HOLIDAYs` |
| Category | Dataset Monitoring Insights |
| Template | `#insight-dm-holiday-report` |
| Input | The selected dataset, passed as the `DSID` report property |

The report finds the dataset's calendar and opens on **This year**.

| Control | What it does |
|-|-|
| **Date Range** | **This year** or **Next year** |
| **Start**, **End** | The dates in use. Change either one to set your own range; the list reloads straight away. |
| **Export (CSV)** | Downloads the table as shown |
| **Debug log** | At the bottom of the page: the calendar that was used and how many holidays were found |

---

## Which calendar is used

| Calendar set on | Used |
|-|-|
| The dataset | The dataset's own calendar |
| Only the dataset feed (the first two parts of the dataset id, such as `EEX.NG_SPOT`) | The feed's calendar |

---

## The report

The **Holidays in range** card shows how many holidays fall between **Start** and **End**.

| Column | What it shows |
|-|-|
| **ID** | The calendar the holiday comes from |
| **Date** | The holiday date |
| **Name** | The holiday name |

Select **Next year** to plan ahead.

![The Holiday Report showing next year's holidays](/img/insights/dm-holiday-report/next-year.png)

At Northgate, the TTF spot dataset follows its feed's calendar `#EEX.NG`, with seven holidays this year and five next year.

---

## Troubleshooting

| Problem | What to do |
|-|-|
| **No holidays fall in the selected range for this dataset's calendar** | Check the range, and check that the dataset or its feed has a calendar. |
| The report stays on **Resolving this dataset's calendar** | The dataset or its feed could not be read. Open **Debug log** to see how far it got. |

---

## Related

- [Insights](/docs/odsl/insights/general): how insight reports work
- [Holiday Report](/docs/public/insights/holiday-report): holidays across your calendars
- [Calendar Holiday Report](/docs/public/insights/calendar-item-holiday): the holidays of one calendar
