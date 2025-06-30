---
title: odsl-range-selector
description: A component to allow the user to select a date range
slug: /public/components/odsl-range-selector
tags:
- component
- range
- dates
- javascript
- html
---

## Description
The odsl-range-selector component creates a panel with selectable ranges and dates.

## Attributes
### includeTime
If the includeTime attribute is added, the dates allow you to select both a date and time.

### forbidOverride
If the forbidOverride attribute is added, the user cannot make changes to the dates and can only select one of the pre-defined ranges.

### simple
If the simple attribute is added, only the list of ranges is shown.

### field
The name of the date field you are going to use this range selector for.
This is used when getting the selected range as a filter.

### ranges
An optional list of range codes to supply to the component.
Range codes are supplied as a JSON array string and can be any of:
* all - An open ended range
* today - Today
* yesterday - Yesterday
* thismonth - Every day this month
* lastmonth - Every day in the previous month
* nextmonth - Every day in the next month
* thisyear - Every day this year
* lastyear - Every day in the previous year
* nextyear - Every day in the next year
* last\{n\} - The last n days, e.g. last7
* next\{n\} - The next n days, e.g. next7

## Methods
### getRange()
Returns the selected range as an object with different formats:

* start - the start date
* end - the end date
* range - the named range selected
* func - the function to send with a _range query parameter
* filter - the json filter using the **field** attribute to send with a _filter query parameter

## Events
### change
This custom event is fired whenever an range is selected or a date is changed, the event has the following detail:

```json
{
  "start": start date,
  "end": end date,
  "range": the named range selected,
  "func": the function to send with a _range query parameter,
  "filter": the json filter using the field attribute to send with a _filter query parameter
}
```

## Examples

### With time and no override

```html
<odsl-range-selector includeTime forbidOverride onchange="console.log(event.detail)" >
</odsl-range-selector>
```

### A simple selector

```html
<odsl-range-selector simple></odsl-range-selector>
```

### A simple selector with defined ranges

```html
<odsl-range-selector simple ranges='["last7","last30"]'>
</odsl-range-selector>
```

### Using a field

```html
<odsl-range-selector includeTime field="timestamp" onchange="console.log(event.detail)" >
</odsl-range-selector>
```

#### Output from selecting Last 7 days

```json
{
    "start": "2025-05-23T00:00:00",
    "end": "2025-05-30T23:59:59",
    "range": "last7",
    "func": "between(2025-05-23T00:00:00,2025-05-30T23:59:59)",
    "filter": {
        "timestamp": {
            "$gte": "2025-05-23T00:00:00",
            "$lte": "2025-05-30T23:59:59"
        }
    }
}
```