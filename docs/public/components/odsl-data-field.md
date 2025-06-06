---
title: odsl-data-field
description: An hidden data field on a form
slug: /public/components/odsl-data-field
tags:
- component
- input
- form
- javascript
- html
---

## Description
The odsl-data-field component is a hidden field on a data capture form used to add non-editable or calculated fields onto an input form.
The odsl-data-field component must be a child component of type [odsl-input-form](odsl-input-form) component.

## Attributes
### name
The name attribute is the name of the field you want to save.

### value
The is the value of the field.

### evalue
This is an expression to be used to evaluate the value for this field.

:::info
You can use either value (static) or evalue (dynamic) for the value for this field.
:::

The evalue can use a javascript expression, e.g. to get an attribute from an element on the page.
It can also reference other input fields using the variable ```$data```

#### Example evalues

Generating a date string
```html
<odsl-data-field name="eventtime" evalue="new Date().toISOString()"></odsl-data-field>
```

Referencing an input field
```html
<odsl-data-field name="_id" evalue="$data.TRADE_ID"></odsl-data-field>
```

## Methods
### setValue(v)

The setValue method sets the value of this field to the passed in value.

## Examples

### An input form to add an event to an object
```html
<odsl-input-form service="object" source="private" onsubmit="saveTrade(event.detail)" onchange="tradeSaved()">
    <odsl-input-field name="TRADE_ID" type="text" label="Trade Reference" help="Enter a reference for this trade"></odsl-input-field>
    <odsl-input-field name="INSTRUMENT" type="text" label="Instrument" help="Enter the traded instrument"></odsl-input-field>
    <odsl-input-field name="PRICE" type="number" label="Price" help="Enter the price the instrument was traded at"></odsl-input-field>
    <odsl-input-field name="VOLUME" type="number" label="Volume" help="Enter the traded volume"></odsl-input-field>
    <odsl-data-field name="_id" evalue="$data.TRADE_ID"></odsl-data-field>
    <odsl-data-field name="_type" value="VarEvent"></odsl-data-field>
    <odsl-data-field name="eventtype" value="simple_portfolio_event"></odsl-data-field>
    <odsl-data-field name="eventtime" evalue="new Date().toISOString()"></odsl-data-field>
</odsl-input-form>
```
