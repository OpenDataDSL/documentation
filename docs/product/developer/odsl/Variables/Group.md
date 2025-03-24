---
slug: /odsl/variable/group
title: Group 🆕
description: Creating and using groups in ODSL code
tags:
- group
- odsl
- new
---

A group is a list of things such as favourites or export items.

## Introduction
A basic group contains a list of either static or dynamic things which can be used throughout the platform.

## Defining a Group
Below is a table with all the properties of a basic group:

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|_id|ObjectId|67d3ee92196dab047409db1a|The unique auto-generated id for this group|
|service|String|data|The name of the service where the items for this group exist|
|type|String|favourite|The type of this group - can be anything, but there are some [special group types](#special-group-types)|
|category|String|Power|A category is used to categorise groups according to similar types|
|name|String|Netherlands Spot|The name of the group|
|description|String|Spot Data for the Netherlands|A description of the group|
|shared|Boolean|true|True if the group is accessible to everyone, false if only you can see it|
|items|Array|...|The list of items in this group (if it is static)|
|dynamic|Boolean|false|True if this is a dynamic group and the items are read using the dynamicOptions|
|dynamicOptions.service|String|object|The service used to get the list of id's, defaults to the group service|
|dynamicOptions.source|String|public|The source of the items, defaults to private|
|dynamicOptions.filter|String|_type='#ForeignExchange'|The filter used to dynamically find the items for this group|
|dynamicOptions.field|String|_id|The field for the id of the item, defaults to _id|
|dynamicOptions.objectfilter|String|_type='#ForeignExchange'|Use this to filter data based on master data properties|

## Managing groups in ODSL code

### Creating groups

#### Creating a static group

```js
bg = Group()
bg.name="My Items"
bg.category = "Data Lists"
bg.service = "object"
bg.type = "favourite"
bg.items = ["ICE.IFEU.B","ICE.NDEX.NLB"]
save bg
```

#### Creating a dynamic group

```js
bg = Group()
bg.name = "FX Data"
bg.category = "Data Lists"
bg.service = "object"
bg.type = "favourite"
bg.dynamicOptions.source = "public"
bg.dynamicOptions.filter = "_type='#ForeignExchange'"
save bg
```

#### Creating a dynamic group using an object filter

```js
bg = Group()
bg.name = "FX Data"
bg.category = "Data Lists"
bg.service = "data"
bg.type = "favourite"
bg.dynamicOptions.objectfilter = "source='ICE' and exchange='NDEX'"
bg.dynamicOptions.filter = "_type != 'VarCurve'"
save bg
```

### Listing groups

```js
find ${group} project type, category, name
```

### Getting a group

You can refer to a group either with its ```_id``` or using the format ```service:type:category:name```

#### Getting a group using the _id

```js
g = ${group:"67d3ee92196dab047409db1a"}
print g
```

#### Getting a group using type, category and name

```js
g = ${group:"data:favourite:Data Lists:FX Data"}
print g
```

### Adding items to a static group

Getting the group and adding the item to the items array

```js
g = ${group:"object:favourite:Data Lists:My Items"}
g.items.add("ICE.NDEX.NLP")
save g
```

### Removing an item from a static group

Getting the group, removing the item and saving the group with the replace option

```js
g = ${group:"object:favourite:Data Lists:My Items"}
g.items.remove("ICE.NDEX.NLP")
save g replace
```

Directly removing an item

```js
delete ${group:"object:favourite:Data Lists:My Items/items/ICE.NDEX.NLP"}
```

### Rolling back changes to a group

All changes to groups are tracked and versioned, you can rollback to a previous version of a group using the delete command

```js
delete ${group:"object:favourite:Data Lists:My Items"}
```

### Listing versions of a group

```js
v = ${group:"object:favourite:Data Lists:My Items":*}
print v
```

### Getting a specific version of a group

```js
v = ${group:"object:favourite:Data Lists:My Items":1}
print v
```

### Tagging a version of a group

You can tag a version of a group and directly refer to that version using the tag

```js
tag ${group:"object:favourite:Data Lists:My Items":1} as "TEST"
```

### Getting a version using the tag

```js
v = ${group:"object:favourite:Data Lists:My Items":TEST}
print v
```

### Deleting a group

To fully delete a group, use the version *

```js
delete ${group:"object:favourite:Data Lists:My Items":*}
```

## Using groups in ODSL code

You can use groups when searching for data in other services.

### Example using the object service

Let's assume we have a group defined with 2 items in the object service, e.g.

```js
bg = Group()
bg.name="My Items"
bg.category = "Data Lists"
bg.service = "object"
bg.type = "favourite"
bg.items = ["ICE.IFEU.B","ICE.NDEX.NLB"]
save bg
```

We can retrieve data from the object service using the group in an ```in``` clause as follows:

```js
find ${object:"all"} where _id in group("object:favourite:Data Lists:My Items") project name
```

### Example using curves in the data service

Let's assume we have a group defined with 2 curves in the data service, e.g.

```js
bg = Group()
bg.name="Settlements"
bg.category = "Data Lists"
bg.service = "data"
bg.type = "favourite"
bg.items = ["ICE.IFEU.B:SETTLE","ICE.NDEX.NLO:SETTLE"]
save bg
```

We can retrieve data from the object service using the group in an ```in``` clause and a specific ondate as follows:

```js
find for ondate("2025-03-13") ${data} where _id in group("data:favourite:Data Lists:Settlements")
```

We can also use a relative ondate as follows:

```js
find for ondate("L-1") ${data} where _id in group("data:favourite:Data Lists:Settlements")
```

## Special Group Types

There are some pre-defined special groups which control specific functionality within the platform.

### Curve Build Group

A curve build group has specific configuration information regarding the cut-off time for when curves need to be ready for and the rules to run if they are not ready by that time.

The type for the group is set to ```build```
The category for the group is set to ```curve```
The service for the group is set to ```curve```

A curve build group adds these additional fields to a group

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|timezone|String|Europe/Berlin|Sets the timezone for the cut-off time, defaults to UTC|
|calendar|String|#HENG|Sets the calendar used to determine the days that the curve is expected to build|
|cron|String||Sets the cut-off cron expression after which a substitute curve is created if it has not been built yet|
|offset|integer|0|Sets the number of days back to calculate the ondate from the cut off time, defaults to 0|
|useLatest|Boolean|true|A built in rule that uses the latest successfully build curve as a substitute if todays curve is missing|
|script|String||Sets the script that contains the function used to build a substitute curve if the curve isn't available by the cut-off time|
|expression|String||Sets the expression/function contained in the script used to build a substitute curve if the curve isn't available by the cut-off time|

#### An example build group

```js
g = BuildGroup()
g.name = "default2"
g.description = "Default Build Group"
g.calendar = "BUSINESS"
g.cron = "45 23 ? * MON-FRI * EU1"
g.offset = 0
g.timezone = "Europe/London"
g.useLatest = true
save g
```

### Quality Group

A quality group is a list of checks to perform on curves or datasets.

A quality group contains ```checks``` rather than items in a service.

The type for the group is set to ```quality```
The category and service for the group is set to ```curve``` or ```dataset```

A quality group adds these additional fields to a group

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|script|String||The script that contains the functions used for these quality checks|
|checks|List||A list of checks to perform|

A check is defined as

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|name|String|Test for zeros|The human readable name of the check|
|expression|String||The expression/function used to run this check|

#### An example quality group

```js
g = QualityGroup()
g.name = "default"
g.description = "Default Quality Group"
g.category = "curve"
g.script = "#QualityCheckCurves"
g.addCheck("Check for tenor gaps", "gapCheck()")
g.addCheck("Check for missing values", "missingCheck()")
g.addCheck("Check for zero values", "zeroCheck()")
save g
```

### Export Group

An export group is a list of items that a function is run at a set time, usually to export the data to a downstream system.

The type for the group is set to ```export```
The category and service for the group is set to ```curve``` or ```dataset```

An export group adds these additional fields to a group

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|enabled|boolean|true|A flag to enable or disable this export group|
|cron|String||Set a cron expression to run the export|
|offset|Integer|0|Sets the number of days back to calculate the ondate from the cut off time, defaults to 0|
|calendar|String|#HENG|Sets the calendar used to determine the days that the curve is expected to be exported|
|version|String|APPROVED|Set the name of the curve version to export, leave null to use the latest version|
|script|String||Sets the script that contains the functions used for these exports|
|expression|String||Sets the expression/function contained in the script used to export the data|

#### An example export group

```js
g = ExportGroup()
g.name = "DAILY"
g.description = "Daily Curve Export Group"
g.enabled = true
g.cron = "00 23 ? * MON-FRI *"
g.calendar = "BUSINESS"
g.offset = 0
g.script = 'odsl-demo\Exports\daily_export_report'
g.expression = "export()"
save g
```

### Approval Group

An approval group is a list of email addresses of users that can approve the list of curves.

The type for the group is set to ```approval```
The category and service for the group is set to ```curve```

An approval group adds these additional fields to a group

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|approvers|List|...|The list of email addresses of users that can approve the curves|
|version|String|APPROVED|Set the name of the curve version upon approval, defaults to APPROVED|

#### An example approval group

```js
g = ApprovalGroup()
g.name = "default"
g.description = "Default Approval Group"
g.approvers.add("demo@opendatadsl.com")
g.version = "APPROVED"
save g
```

### Subscription Target Group

A subscription target group is a list of targets to send subscriptions to.

A quality group contains ```targets``` rather than items in a service.

The type for the group is set to ```TargetGroup```
The category and service for the group is set to ```subscription```

A target group adds these additional fields to a group

|**Name**|**Type**|**Example**|**Description**|
|-|-|-|-|
|targets|SubscriptionTarget||The configuration for the subscription target|

#### An example subscription target group

```js
group = TargetGroup()
group.name = "SupportAlertGroup"
group.addTeamsChannelTarget("https://...", "#TeamsAlertMessage")
save group
```

:::info
For examples of other targets see [here](/docs/category/subscriptions)
:::

