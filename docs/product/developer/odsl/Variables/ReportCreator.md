---
slug: /odsl/variable/reportcreator
title: ReportCreator
tags:
- report
---

# ReportCreator

A **ReportCreator** is a [report configuration](/docs/odsl/variable/report) with parameters: people fill in the parameters to create their own reports from it, and an example report is built from each parameter's example value. It is saved with the [report creator service](/docs/api/rest/service/reportcreator).

## Construction

|**Function**|**Description**|
|-|-|
|ReportCreator()|Creates a new report creator|

It has all the properties and methods of a [report configuration](/docs/odsl/variable/report), and a `parameters` list. Each parameter has a `name`, `type`, `description` and `example`.
