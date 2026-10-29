---
slug: /odsl/os/alerts
title: Alerts
description: How the platform raises alerts about your data, and how you and OpenDataDSL work on them
tags:
- operations
- alerts
- topics
---

## Introduction

An alert is a problem with your data that someone needs to look at. Alerts work like small support tickets: an alert stays **open** until it is **closed** with a resolution, it is always **with** someone (your team, OpenDataDSL or a data vendor), and its **timeline** keeps everything that happened to it, including comments.

## Where alerts come from

|Raised by|Examples|
|-|-|
|Dataset monitoring|A delivery is late or missing, incomplete, or fails its quality or critical checks|
|Curves|A curve build fails, quality checks fail, an export does not run|
|The platform|A configuration problem, such as a calendar that does not exist|
|Your team|Anything you want OpenDataDSL's help with, or want to track yourselves|
|OpenDataDSL|Shared alerts about common and public data, such as an exchange publishing a file late|

The platform gives each problem a **key** (for a dataset delivery, the dataset id, the date and the issue). While an alert with that key is open, the same problem happening again counts another occurrence rather than raising a new alert. Some alerts close themselves when the problem goes away, for example when missing data arrives.

## Your alerts and shared alerts

|Kind|Ids|Who sees it|Who changes it|
|-|-|-|-|
|Your alerts|ALR-|Your company and OpenDataDSL|Your company and OpenDataDSL|
|Shared alerts about common data|ALC-|Everyone|OpenDataDSL. You can add comments that only your company and OpenDataDSL see|
|Shared alerts about public data|ALP-|Everyone|As common|

Your alerts belong to a data environment (production, test1 and so on).

## Working with alerts

|How|Where|
|-|-|
|The portal|[The Alerts extension](/docs/extensions/alerts/overview)|
|ODSL|[Alerts in ODSL](/docs/extensions/alerts/odsl)|
|Python|[Alerts in Python](/docs/extensions/alerts/python)|
|REST API|[Alerts REST API](/docs/extensions/alerts/rest-api)|

## Getting notified about alerts

To be notified when an alert is raised, closed, handed over, changes priority or gets a comment, add an automation on the `alert` service. See [Notifications and automations](/docs/extensions/alerts/automations).
