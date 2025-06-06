---
title: odsl-input-field
description: An input field on a form
slug: /public/components/odsl-input-field
tags:
- component
- input
- form
- javascript
- html
---

## Description
The odsl-input-field component is an individual input items which you can use to input data on a data capture form.
The odsl-input-field component must be a child component of type [odsl-input-form](odsl-input-form) component.

## Attributes
### name
The name attribute is the name of the field you want to save.

### label
This is the label for the field to be shown to the user.

### type
This the the type of field, the table below shows all possible types:

|Value|Description|
|-|-|
|text|A string value|
|number|A numeric value|
|date|A date value (without time)|
|localdate-time|A datetime value|
|odsl-currency|A select list of currencies|
|odsl-calendar|A select list of calendars|
|odsl-expiry|A select list of expiry calendars|
|odsl-units|A select list of units|
|odsl-timezone|A select list of timezones|
|odsl-event-list|A select list of event list ids|
|odsl-source|A select list of data sources|

### help
This is some help text shown below the field to give the user some information about what to enter into this field.

### value
The is the default value of the field, can be omitted.

## Methods
### setValue(v)

The setValue method sets the value of this field to the passed in value.

## Examples

### An input form to add an event to an object
```html
<odsl-input-form service="object" source="private" onsubmit="insertIntoObject(event.detail)">
    <odsl-input-field name="name" class="col-6" type="text" label="Name" help="Enter the name"></odsl-input-field>
    <odsl-input-field name="description" class="col-6" type="text" label="Description" help="Enter the description"></odsl-input-field>
    <odsl-input-field name="currency" type="odsl-currency" label="Currency" help="Currency"></odsl-input-field>
    <odsl-input-field name="units" type="odsl-units" label="Units" help="Units"></odsl-input-field>
    <odsl-input-field name="calendar" class="col-5" type="odsl-calendar" label="Calendar" help="The calendar to align the events to"></odsl-input-field>
    <odsl-input-field name="timezone" class="col-5" type="odsl-timezone" label="Timezone" help="The timezone for the event times"></odsl-input-field>
    <odsl-input-field name="source" class="col-1" type="odsl-source" label="Event Source" help="Select the source for the events"></odsl-input-field>
    <odsl-input-field name="event" class="col-4" type="odsl-event-list" label="Event List" help="The event list that this timeseries is built from"></odsl-input-field>
    <odsl-input-field name="property" class="col-2" type="text" label="Property Name" help="The property in the event for the timeseries values"></odsl-input-field>
    <odsl-input-field name="filter" class="col-5" type="text" label="Filter" help="Optional filter to filter the values"></odsl-input-field>
    <odsl-data-field name="_type" value="VarEventTimeSeries"></odsl-data-field>
</odsl-input-form>

```
