---
title: odsl-select
description: A select (drop-down list) HTML component
slug: /public/components/odsl-select
tags:
- component
- select
- javascript
- html
---

## Description
The odsl-select component is a drop-down list which is populated from any data in the platform.
It makes either a **distinct** call to get a unique list of values, or a **list** call retrieving _id and name properties.

By default a **list** call is made, unless a **field** attribute is set on the component.

## Attributes
### field
The field attribute tells the component to make a **distinct** call to get the list of items. 
The list of values are a distinct list of values frm the field property.

### service
The service attribute determines which [REST service](/docs/api/rest/rest) to use to retrieve the data, defaulting to **object**.

### source
The source attribute determines the source of the data, this is usually one of the following:
* public
* private
* all

It can also be omitted if the service is not a multi-source service.

### filter
The optional filter to use to limit the list of items.
This must be a JSON string.

## Methods
### getSelected()
Returns the id of the current selected item in the select list.

## Events
### change
This custom event is fired whenever an item is selected, the event has the following detail:

```json
{
  "id": selected_id
}
```

## Examples

### Getting a filtered list of scripts

```html
<odsl-select id="template" service="script" source="all" filter='{"category":"export"}'></odsl-select>
```

### Getting the selected item (javascript)

```js
let td = document.getElementById("template");
let template = td.getSelected();
console.log("Selected template is: " + template);
```

### Getting a list of group types

```html
<odsl-select id="types" service="group" field="type"></odsl-select>
```

### List of objects with event handler

```html
<odsl-select 
        service="object" 
        source="public" 
        filter='{"_type":"#ForeignExchange"}' 
        onchange="console.log(event.detail.id)">
</odsl-select>
```
