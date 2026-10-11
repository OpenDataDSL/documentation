---
slug: /topics/reporting/daily-status-reports
title: Daily Status Reports
description: Build a daily status report that many processes contribute to, then send the complete report on a schedule
sidebar_position: 2
tags:
- topics
- reporting
- status
- fixed
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is a daily status report?

A daily status report collects updates from many sources during the day into a single report. For example:

* A data loading process records that the morning files have arrived
* A curve build records whether each curve built successfully
* A validation script records any data quality warnings
* A user adds a note about a late price

Each contributor only knows about its own part, so it only sends its own part. The platform merges every update into the report for that day, and the report then contains the complete picture. At a set time, the finished report is sent to the people who need it.

This is done with a **Fixed** report that has `mergeUpdates` turned on.

## How merging works

Normally, saving a fixed report for an ondate replaces the data and creates a new version of the report. With `mergeUpdates` set to `true`, each save is merged into the report that is already stored for that ondate, and no new version is created.

The data you send is merged into the stored data using these rules:

|Data|What happens|
|-|-|
|Object|Merged field by field, so each contributor only changes the fields it sends|
|List of objects|Items are matched using a key field (see [merge keys](#merge-keys)). A matching item is merged, a new item is added to the end of the list|
|List of values|New values are added, values already in the list are kept|
|Single value (text, number, boolean)|Replaced, the latest update wins|
|`null`|The field is removed|
|Typed value (e.g. a date or a timeseries)|Replaced as a whole|

For example, if the stored report data is:

```json
{
  "loading": { "status": "running", "started": "07:02" },
  "curves": [
    { "name": "EEX.DE.BASE", "status": "success" }
  ]
}
```

and a contributor sends:

```json
{
  "loading": { "status": "complete", "finished": "07:45" },
  "curves": [
    { "name": "ICE.TTF", "status": "failed" }
  ]
}
```

the report data becomes:

```json
{
  "loading": { "status": "complete", "started": "07:02", "finished": "07:45" },
  "curves": [
    { "name": "EEX.DE.BASE", "status": "success" },
    { "name": "ICE.TTF", "status": "failed" }
  ]
}
```

### Merge keys

When a list of objects is merged, each incoming item is matched to an existing item using a key field. The first field in the `mergeKeys` list that the item contains is used.

If you don't set `mergeKeys`, the default is:

```js
["_id", "id", "key", "name"]
```

If your items use a different identifier, set your own merge keys on the report configuration, e.g. `["job"]` or `["curve", "id"]`.

An item that doesn't contain any of the merge keys is added to the list, unless an identical item is already there.

### Update log

Every merged update adds an entry to a log stored in the report data, in a field called `_updates`:

|Name|Description|
|-|-|
|time|When the update was made (UTC)|
|user|The user or service account that made the update|
|invocationId|The id of the request that made the update|
|keys|The top level fields of the data that this update contained|
|reason|The reason for the update, if one was given with the `_reason` parameter|

The log keeps the most recent 1,000 entries. You can show it in your template to give an audit trail of who updated the report and when.

:::note
`_updates` is managed by the platform. Any `_updates` field in the data you send is ignored.
:::

### Updates at the same time

If two contributors update the report at the same moment, both updates are kept. The platform detects the clash and re-applies the later update on top of the earlier one.

## Creating a daily status report

### Step 1: Create the report configuration

Create a **Fixed** report with `mergeUpdates` set to `true`.

To send the complete report at the end of the day, also give it a schedule using `cron` and `enabled`. When a merge report runs on its schedule it doesn't change anything, it simply returns the merged report for that day and triggers the **success** event (see [Step 3](#step-3-send-the-report-on-a-schedule)).

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
DAILY_STATUS = Report()
DAILY_STATUS.category = "Operations"
DAILY_STATUS.name = "Daily Status"
DAILY_STATUS.description = "Status of all daily loading, curve builds and checks"
DAILY_STATUS.reportType = "Fixed"
DAILY_STATUS.mergeUpdates = true
DAILY_STATUS.mergeKeys = ["name"]
DAILY_STATUS.template = "DailyStatusTemplate"
DAILY_STATUS.cron = "00 17 ? * MON-FRI * EU1"
DAILY_STATUS.enabled = true
save DAILY_STATUS
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
POST https://api.opendatadsl.com/api/report/v1
Authorization: Bearer {{token}}

{
    "_id": "DAILY_STATUS",
    "_type": "VarReportConfiguration",
    "reportType": "Fixed",
    "category": "Operations",
    "name": "Daily Status",
    "description": "Status of all daily loading, curve builds and checks",
    "mergeUpdates": true,
    "mergeKeys": ["name"],
    "template": "DailyStatusTemplate",
    "cron": "00 17 ? * MON-FRI * EU1",
    "enabled": true
}
```

</TabItem>
</Tabs>

:::tip
The `EU1` suffix on the cron expression runs the schedule on London time, so the report for the correct UK date is sent.
:::

### Step 2: Contribute to the report

Each contributor saves only its own part of the data. A process, script or user can contribute at any time during the day.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

Create a variable with the same name as the report, add your part of the data and save it as a report. It is saved for today's ondate, unless you set an `ondate` on the variable.

```js
// In the data loading process
DAILY_STATUS = Object()
DAILY_STATUS.loading = Object()
DAILY_STATUS.loading.status = "complete"
DAILY_STATUS.loading.finished = "07:45"
save ${report:DAILY_STATUS}
```

```js
// In the curve build script
curve = Object()
curve.name = "ICE.TTF"
curve.status = "failed"
curve.message = "Missing settlement price for DEC-26"

DAILY_STATUS = Object()
DAILY_STATUS.curves = [curve]
save ${report:DAILY_STATUS}
```

To update the report for a different day, set the `ondate` property. It is used to choose which day's report to update and is not saved as part of the data.

```js
// Add a late note to yesterday's report
DAILY_STATUS = Object()
DAILY_STATUS.ondate = "2026-10-09"
DAILY_STATUS.notes = ["ICE.TTF rebuilt at 19:30 after the settlement price was published"]
save ${report:DAILY_STATUS}
```

</TabItem>
<TabItem value="rest" label="REST API">

Send the data to the report id with the ondate. Use the optional `_reason` parameter to record why the update was made in the update log.

```js
POST https://api.opendatadsl.com/api/report/v1/private/DAILY_STATUS:2026-10-10
  ?_reason=Curve build
Authorization: Bearer {{token}}

{
    "curves": [
        { "name": "ICE.TTF", "status": "failed", "message": "Missing settlement price for DEC-26" }
    ]
}
```

</TabItem>
</Tabs>

To remove a field that was added earlier, send it with a value of `null`.

### Step 3: Send the report on a schedule

Two events are raised for a daily status report:

|Event|When it happens|Use it to|
|-|-|-|
|update|Every time a contributor updates the report|Act on each individual update, e.g. alert the team as soon as a curve fails|
|success|When the report runs on its schedule|Send the complete report, e.g. an end of day email|

The automation receives the complete merged report, not just the part that was updated.

Create an automation on the **success** event to send the report:

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
ab = AutomationBuilder("report", "private", "DAILY_STATUS")
ab.addCondition("success")
ab.setTarget("email")
ab.setProperty("to", "ops-team@example.com")
ab.setProperty("subject", "Daily Status")
ab.icon = "envelope-at text-outlook"
ab.enabled = true
save ${automation:ab}
```

</TabItem>
<TabItem value="rest" label="REST API">

```json
POST https://api.opendatadsl.com/api/automation/v1

{
  "target": "email",
  "icon": "envelope-at text-outlook",
  "enabled": true,
  "conditions": [
    {
      "service": "report",
      "action": "success",
      "id": "DAILY_STATUS",
      "source": "private"
    }
  ],
  "properties": {
    "to": "ops-team@example.com",
    "subject": "Daily Status"
  }
}
```

</TabItem>
</Tabs>

You can add a second automation on the **update** event if you want to be told about updates during the day as well. See [Creating Automations](/docs/topics/automations/creating) for more examples.

### Step 4: Format the report

Use a mustache template to show the report as HTML. Each contributor's part of the data is a separate section, and the update log can be shown at the end.

```html
<h1>{{name}}</h1>
<p>Report date: {{ondate}}</p>

<h2>Data Loading</h2>
{{#data.loading}}
<p>Status: <b>{{status}}</b>, started {{started}}, finished {{finished}}</p>
{{/data.loading}}
{{^data.loading}}
<p>No update received</p>
{{/data.loading}}

<h2>Curve Builds</h2>
<table>
    <thead>
        <tr><th>Curve</th><th>Status</th><th>Message</th></tr>
    </thead>
    <tbody>
        {{#data.curves}}
        <tr><td>{{name}}</td><td>{{status}}</td><td>{{message}}</td></tr>
        {{/data.curves}}
    </tbody>
</table>

<h2>Update Log</h2>
<table>
    <thead>
        <tr><th>Time</th><th>User</th><th>Updated</th></tr>
    </thead>
    <tbody>
        {{#data._updates}}
        <tr><td>{{time}}</td><td>{{user}}</td><td>{{#keys}}{{.}} {{/keys}}</td></tr>
        {{/data._updates}}
    </tbody>
</table>
```

## Reading the report

The report for a day is read in the same way as any other report, and always contains the merged data from every update so far.

<Tabs groupId="tool">
<TabItem value="odsl" label="OpenDataDSL" default>

```js
rep = ${report:"DAILY_STATUS:2026-10-10"}
print rep.data

// The latest report
rep = ${report:"DAILY_STATUS:L"}
```

</TabItem>
<TabItem value="rest" label="REST API">

```js
GET https://api.opendatadsl.com/api/report/v1/private/DAILY_STATUS:2026-10-10
Authorization: Bearer {{token}}
```

</TabItem>
</Tabs>

## Things to know

* `mergeUpdates` only applies to **Fixed** reports, it is ignored for all other report types
* A report with `mergeUpdates` doesn't keep versions, the update log is the history of changes for the day
* Each ondate is a separate report, so each day starts empty and the first update of the day creates it
* If a contributor sends data that isn't an object (e.g. a single list), the update log is stored on the report itself rather than in the data
