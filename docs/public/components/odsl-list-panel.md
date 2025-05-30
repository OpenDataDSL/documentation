---
title: odsl-list-panel
description: A panel with a list of selectable items
slug: /public/components/odsl-list-panel
tags:
- component
- list
- javascript
- html
---

## Description
The odsl-list-panel component creates a panel with a list of items showing the following fields:
* icon - if no icon property exists, then an icon is added based on the _type property
* _id
* name
* description

## Attributes
### name
The name attribute is displayed at the top of the panel.

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

### group
The optional group attribute will display the list of items from the defined group.

## Methods
### getSelected()
Returns the data (_id, name, description) of the current selected item in the select list.

### refresh()
Refreshes the data in the list

## Events
### change
This custom event is fired whenever an item is selected, the event has the following detail:

```json
{
  "id": selected_id,
  "name": selected_name
}
```

## Examples

### List of groups of a certain type

```html
<odsl-list-panel 
        name="Portfolios" 
        service="group" 
        filter='{"type":"Portfolio"}' 
        onchange="console.log(event.detail)">
</odsl-list-panel>
```

### List of all private objects

```html
<odsl-list-panel 
        name="Objects" 
        service="object" 
        source="private">
</odsl-list-panel>
```

### List of objects in a group

```html
<odsl-list-panel 
        name="Objects" 
        service="object" 
        source="all" 
        group="object:Providers:FX:ABN AMRO">
</odsl-list-panel>
```
