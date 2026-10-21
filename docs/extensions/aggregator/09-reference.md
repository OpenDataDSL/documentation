---
title: Aggregator reference
description: Where the Aggregator saves aggregations, reports, templates and emails, what the extension contains, and troubleshooting
slug: /extensions/aggregator/reference
sidebar_position: 9
tags: [extension, aggregator, reference, troubleshooting]
---

# Aggregator reference

---

## Where everything is kept

Everything the Aggregator saves is private to your organisation. For Northgate Energy's aggregation, key `dataset_deliveries`:

| What | Service and source | ID | Notes |
|-|-|-|-|
| The aggregation | `script`, private | `aggregator\dataset_deliveries` | Category `aggregation`. The function `aggregate_dataset_deliveries(ondate, start, end, report)` returns the rows, and `aggregate_dataset_deliveries(ondate, start, end)` returns them with the test values of any report properties. |
| The report | `reportconfig`, private | `AGG_DATASET_DELIVERIES` | Report type `Default`, category `Aggregations`, running `aggregate_dataset_deliveries(#ONDATE, #START, #END, #REPORT)` |
| The report template | `script`, private | `aggregator\templates\AGG_DATASET_DELIVERIES` | Script type and category `mustache`. Only for the house-style template. |
| The email template | `script`, private | `aggregator\templates\AGG_DATASET_DELIVERIES_email` | Script type and category `mustache` |
| The email | `automation` | Assigned by the platform | Target `odsl.email`, on the report's update, transformed by the email template |
| Stored reports | `report`, private | `AGG_DATASET_DELIVERIES` and the date | One per date, read as `AGG_DATASET_DELIVERIES:2026-10-15` |

A report with the **Generic table** uses the extension's own template, `odsl-extensions\extensions\aggregator\odsl.aggregator.report_template`, instead of one of its own.

---

## The report configuration

The fields the Aggregator sets on a report:

| Field | Example | What it is |
|-|-|-|
| `script` | `aggregator\dataset_deliveries` | The aggregation's script |
| `expression` | `aggregate_dataset_deliveries(#ONDATE, #START, #END, #REPORT)` | What the report runs. Reports saved before report properties have `(#ONDATE, #START, #END)`, which still works and is updated the next time the report is saved. |
| `template` | `aggregator\templates\AGG_DATASET_DELIVERIES` | How a stored date is shown |
| `cron`, `enabled` | `0 18 * * MON-FRI * EU1`, `true` | The schedule, and whether it is on |
| `defaultRange` | Empty, or `within(T)` | Sets `#START` and `#END`, relative to the ondate `T`. See [Default range](/docs/extensions/aggregator/schedule-and-email#default-range). |
| `cacheOptions` | `OnDemand`, private | Each run is stored for its date |
| `properties.aggregator` | | The aggregation key, the template mode, the columns, and the email settings and automation |
| `properties.NAME` | `properties.datasets`: `^ICE_` | The value of a report property placeholder, `@{NAME}`. `currency`, `units` and `timezone` are set on the report itself instead. |

---

## What the extension contains

| Part | ID | What it is |
|-|-|-|
| Extension | `odsl.aggregator` | Installs everything below |
| Feature policy | `extension.odsl.aggregator` | Gives access to the two features |
| Feature | `odsl.aggregator.manage` | The **Aggregator** view, in the **Information** section of the menu |
| Feature | `odsl.aggregator.report` | The **Aggregator** tab on the **Reports** screen |
| Script | `odsl-extensions\extensions\aggregator\odsl.aggregator.report_template` | The generic table template |

---

## Troubleshooting

| What you see | Why, and what to do |
|-|-|
| **No rows** | Check the `$match` conditions and the test dates. Strings that look like dates or numbers are converted: write `"string@..."` to compare with a string. |
| A stage is outlined in red | Its value is not valid JSON. Field names and strings need double quotes. |
| **... is not allowed** | `$out`, `$merge` and change streams cannot be used. |
| A stage fails on a service it should work on | Read the note under the stage: it may need to be first, need Atlas, or need a newer MongoDB version. See [Where a stage can run](/docs/extensions/aggregator/how-it-works#stages). |
| **Unknown function: aggregate_...** when a report runs | The report could not use the saved script. Open the aggregation in the Aggregator once, which saves it again, then run the report again. |
| The email is not sent | Check the recipients are in your email domain, and that the automation is on under **Automations** for the report. The email is only sent when a date is stored. |
| The email automation is not under **Automations** | It was made by an earlier version of the Aggregator. Open the report in the Aggregator and save it once. |
| **@&#123;name&#125; is a report setting, not a report property** | The placeholder's name is one of the report's own settings. Choose another name. |
| **... cannot contain double quotes, backslashes or line breaks** | A report property's value, or its test value, is put into the stage as text. Leave those characters out. |
| A report ignores a report property | Check the report sets it, under **Report properties** in the report editor or on the Reports screen tab, and that the name matches the placeholder exactly, including upper and lower case. |
| **Cannot parse ... as a date** when a report runs | The report's default range is not a date range the platform can read, often `@{ondate}` or `#ONDATE`. Use `within(T)` for the ondate. See [Default range](/docs/extensions/aggregator/schedule-and-email#default-range). |
| A template shows nothing for a field | The field name has characters a template cannot read, such as spaces. Rename it with `$project`. |
