---
title: odsl-group-items
description: A panel with a list of items from a group
slug: /public/components/odsl-group-items
tags:
- component
- list
- group
- javascript
- html
---

## Description
The odsl-group-items component is a simplified [odsl-list-panel](./odsl-list-panel) which lists the _id of items in a group.

## Attributes
### group
The group id to use to get the list of items.

### multi
If set, allows the user to select multiple items from the list, defaults to false.

## Methods
### getSelected()
Returns the _id of the selected rows in the select list as an array, e.g.

```json
[
    {
        "_id": "#ABN.FX"
    },
    {
        "_id": "#ABN_FX.EURTRY"
    }
]
```

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

### List of items

```html
<odsl-group-items group="object:Providers:FX:ABN AMRO">
</odsl-group-items>
```

### Multi-select enabled

```html
<odsl-group-items 
        group="object:Providers:FX:ABN AMRO" 
        multi=true>
</odsl-group-items>
```

