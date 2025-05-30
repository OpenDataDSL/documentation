---
title: odsl-chart-series
description: An data series configuration on an ODSL chart
slug: /public/components/odsl-chart-series
tags:
- component
- chart
- javascript
- html
---

## Description
The odsl-chart-series component configures an input source of ODSL data to be shown on a chart.
The odsl-chart-series component must be a child component of an [odsl-chart-panel](odsl-chart-panel) component.

## Attributes
### service
The service attribute determines which [REST service](/docs/api/rest/rest) to use to retrieve the data, defaulting to the service configured on the chart.

### source
The source attribute determines the source of the data, this is usually one of the following:
* public
* private
* all

It can also be omitted if the service is not a multi-source service.

It defaults to the source configured on the chart

### key
The id of the item to get to display in the chart.

### range
A timeseries range used to limit the data displayed in the chart.

## Examples

### Chart a timeseries
```html
<odsl-chart-panel title="Profit and Loss" service="data" source="private">
    <odsl-chart-axis axis=0 type="datetime"></odsl-chart-axis>
    <odsl-chart-series id="chart" key="SIMPLE_PORTFOLIO:Portfolio1"></odsl-chart-series>
</odsl-chart-panel>
```

