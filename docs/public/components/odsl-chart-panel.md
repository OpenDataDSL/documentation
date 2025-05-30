---
title: odsl-chart-panel
description: An chart panel
slug: /public/components/odsl-chart-panel
tags:
- component
- chart
- javascript
- html
---

## Description
The odsl-chart-panel component configures a chart.
The odsl-chart-panel component can contain child components:
* [odsl-chart-series](odsl-chart-series) component to define the series to display.
* [odsl-chart-axis](odsl-chart-axis) component to configure the chart axis..

## Attributes
### config
A named chart configuration supplied as a variable name.

### service
The service attribute determines which [REST service](/docs/api/rest/rest) to use to retrieve the data, defaulting to data.

### source
The source attribute determines the source of the data, this is usually one of the following:
* public
* private
* all

It can also be omitted if the service is not a multi-source service.

It defaults to the source configured on the chart

### range
A timeseries range used to limit the data displayed in the chart.

### type
The type of chart.

### title
A title for the chart.

### subtitle
A sub-title for the chart.

## Examples

### Chart a timeseries
```html
<odsl-chart-panel title="Profit and Loss" service="data" source="private">
    <odsl-chart-axis axis=0 type="datetime"></odsl-chart-axis>
    <odsl-chart-series id="chart" key="SIMPLE_PORTFOLIO:Portfolio1"></odsl-chart-series>
</odsl-chart-panel>
```
