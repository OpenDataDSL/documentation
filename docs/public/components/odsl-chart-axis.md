---
title: odsl-chart-axis
description: An axis configuration on an ODSL chart
slug: /public/components/odsl-chart-axis
tags:
- component
- chart
- javascript
- html
---

## Description
The odsl-chart-axis component configures an axis on a chart.
The odsl-chart-axis component must be a child component of an [odsl-chart-panel](odsl-chart-panel) component.

## Attributes
### axis
The axis number:
* 0 for the default x axis
* 1 for the default y axis
Anything else to add a new axis.
  
### reversed
A boolean indicating that this axis is reversed.

### side
The side on which the axis is rendered. 0 is top, 1 is right, 2 is bottom and 3 is left.

### type
The type of axis. Can be one of linear, logarithmic, datetime or category.

## Examples

### Set the x-axis to be a datetime axis
```html
<odsl-chart-axis axis=0 type="datetime"></odsl-chart-axis>
```

