---
title: odsl-grid-panel
description: A panel with a grid of data
slug: /public/components/odsl-grid-panel
tags:
- component
- grid
- javascript
- html
---

## Description
The odsl-grid-panel component creates a panel with a table or grid of items.
The columns that are shown are configured using an [odsl-grid-column](odsl-grid-column) tag.

## Attributes
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

### multi
If set, allows the user to select multiple items from the list, defaults to false.

### manual
If set, this grid panel will not read data from the service, but will expect the data to be manually set using the setData(data) method

## Methods
### getSelected()
Returns the entire data for the selected rows in the select list as an array, e.g.

```json
[
  {
    "_id": "SIMPLE_PORTFOLIO:TRADES:AX/345543/456778",
    "_type": "VarEvent",
    "eventtime": "2025-05-30T09:31:50",
    "eventstart": "2025-05-30T09:31:50",
    "eventend": "2025-05-30T09:31:50",
    "eventid": "AX/345543/456778",
    ...
  }
]
```

### refresh()
Refreshes the data in the grid.

### setData(data)
Manually sets the data for this grid, the ```manual``` attribute must be set for this to work.

## Events
### change
This custom event is fired whenever an item is selected, the event has the following detail:

```json
{
  "id": selected_id
}
```

## Examples

### List of events for a specific eventlist

```html
<odsl-grid-panel name="Trades" service="event" source="private" filter='{"event":"SIMPLE_PORTFOLIO:TRADES"}'>
    <odsl-grid-column field="TRADE_ID" headername="Trade Id"></odsl-grid-column>
    <odsl-grid-column field="PRICE" headername="Price"></odsl-grid-column>
    <odsl-grid-column field="VOLUME" headername="Volume"></odsl-grid-column>
</odsl-grid-panel>
```
