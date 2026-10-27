---
slug: /odsl/variable/automation
title: Automation
tags:
- automation
---

# Automation

An automation runs an action (an automation target) when something happens to an item, for example emailing a curve when it is updated. You create automations in ODSL with an **AutomationBuilder**: give it the item, choose one of the automation templates the item offers (the [listAutomations](/docs/api/rest/special_functions) special function lists them), set the template's properties and build it. See [Automations](/docs/topics/automations/basics).

## Construction

|**Function**|**Description**|
|-|-|
|AutomationBuilder(service, source)|Creates a new OpenDataDSL automation using a builder|
|AutomationBuilder(service, source, key)|Creates a new OpenDataDSL automation using a builder|

## Builder methods

|**Name**|**Description**|**Return Type**|
|-|-|-|
|withAutomationTemplate(template)|Select the template to use for this automation|AutomationBuilder|
|set(name, value)|Set a property on the automation|AutomationBuilder|
|build()|Build the automation you have configured with this builder|Automation|

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|conditions|The conditions for when this automation will fire|List|
|enabled|Set to false to disable this automation|Boolean|
|icon|The icon (bootstrap icons) to be shown next the automation in the GUI - usually the same as the target icon|String|
|name|The READONLY name of this automation, this is generated using the template and properties|String|
|owner|The READONLY owner of this automation, used for setting security policies on the automation|String|
|properties|The properties to send to the target|Object|
|target|The automation target id|String|
|template|The text template used to create this automation|String|


## Example

```js
builder = AutomationBuilder("object", "private", "NGE.GAS.TTF")
// template is the text of one of the automations this item offers,
// as listed by the listAutomations special function
builder.withAutomationTemplate(template)
builder.set("to", "market-data@northgate-energy.com")
automation = builder.build()
save ${automation:automation}
```

## Automation targets

An automation target is the action an automation runs. You can create your own with **AutomationTarget()**.

## Properties

|**Name**|**Description**|**Type**|
|-|-|-|
|actions|The actions this target can work with, leave empty for all|List|
|allowPropertyChange|True if we allow the user to specify a check for a property changing to either a specific value or anything|Boolean|
|allowTransformation|True if we allow the user to specify a transformer to transform the data to be submitted|Boolean|
|code|The code id of the automation target|String|
|description|The long description of the automation target|String|
|icon|The code for the icon (bootstrap icons) to be shown next the automation target name in the GUI|String|
|inputs|The input configuration information|Object|
|name|The name of the automation target|String|
|properties|The properties array to send to the target|Object|
|publisher|The publisher of the automation target|String|
|script|The script name that performs the action|String|
|services|The services this target can work with, leave empty for all|List|
|tags|A list of tags used to categorise this automation target|List|
|template|The text used to collect information from the user and the data to collect|String|


## Further Reading

* [Automation service](/docs/api/rest/service/automation) and [Automation Target service](/docs/api/rest/service/automationtarget) in the REST API
