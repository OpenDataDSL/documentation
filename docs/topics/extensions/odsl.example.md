---
slug: /odsl/extension/odsl.example
description: A simple example of creating a basic extension
sidebar_position: 1
tags:
- extension
- example
---
# Example extension

## Introduction

The example extension showcases the [HTML components](/docs/category/html-components) and the basic functionality available for building application extensions.

## Creating the extension

### Feature policy

Here is the feature policy for this extension - we use the same feature (odsl.example.test) for all extension views

```js
fp = FeaturePolicy()
fp.id = "extension.odsl.example"
fp.description = "Show odsl Example extension views"
fp.features = ["odsl.example.test"]
fp.addMember("*")
fp.deny = false
fp.enabled = true
save fp
```

### Extension manifest

```js
e = Extension()
e.id = "odsl.example"
e.publisher = "odsl"
e.code = "example"
e.name = "Example Extension"
e.icon = "hexagon"
e.description = "A simple extension showcasing the HTML components etc."
e.tags = ["EXAMPLE"]

e.resources.script.install = "odsl-extensions\extensions\example\odsl.example.install"
e.resources.script.upgrade = "odsl-extensions\extensions\example\odsl.example.upgrade"
e.resources.script.uninstall = "odsl-extensions\extensions\example\odsl.example.uninstall"
e.resources.policy = ["extension.odsl.example"]

v = e.addView("Example")
v.section = "Extensions"
v.name = "Example"
v.tabname = "Main"
v.excel = false
v.insights = true
v.feature = "odsl.example.test"
v.icon = "hexagon"
v.script = "odsl-extensions\extensions\example\odsl.example.test"

v = e.addView("Lists")
v.section = "Extensions"
v.name = "Example"
v.tabname = "Apps"
v.appname = "HTML List Components"
v.description = "An example of list components"
v.excel = false
v.feature = "odsl.example.test"
v.icon = "list"
v.script = "odsl-extensions\extensions\example\odsl.example.lists"

v = e.addView("Chart")
v.section = "Extensions"
v.name = "Example"
v.tabname = "Chart"
v.appname = "HTML Chart Component"
v.description = "An example of charts"
v.excel = false
v.feature = "odsl.example.test"
v.icon = "graph-up"
v.script = "odsl-extensions\extensions\example\odsl.example.chart"

v = e.addView("Grid")
v.section = "Extensions"
v.name = "Example"
v.tabname = "Apps"
v.appname = "HTML Grid Component"
v.description = "An example of the grid component"
v.excel = false
v.feature = "odsl.example.test"
v.icon = "table"
v.script = "odsl-extensions\extensions\example\odsl.example.grid"

save e
```

## Scripts

The install, upgrade and uninstall scripts are here for example only.

### Install script

```js
print "Installing ODSL Example Extension"
```

### Upgrade script

```js
print "Upgrading ODSL Example Extension"
```

### Uninstall script

```js
print "Un-Installing ODSL Example Extension"
```

## Views

### Test
This view doesn't use any ODSL components, it displays a weather widget from weatherwidget.io

```html
<h1>ODSL Example Extension</h1>

<h2>Weather Widget</h2>

<a 
    class="weatherwidget-io" 
    href="https://forecast7.com/en/51d51n0d13/london/" 
    data-label_1="LONDON" 
    data-label_2="WEATHER" 
    data-theme="original" >LONDON WEATHER
</a>

<script>
!function(d,s,id) {
    var js,fjs=d.getElementsByTagName(s)[0];
    if(!d.getElementById(id)) {
        js=d.createElement(s);
        js.id=id;
        js.src='https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js,fjs);
    }
}(document,'script','weatherwidget-io-js');
</script>
```

### Lists
This view shows how to use the [odsl-list-panel component](/docs/public/components/odsl-list-panel)

```html
{{>#odsl-extension}}

<div class="container-fluid h-100 d-flex flex-column extension">
	<div class="row h-50 p-1">
		<div class="col w-50 h-100 p-1">
			<odsl-list-panel name="Public Extensions" service="extension" source="public"></odsl-list-panel>
		</div>
		<div class="col w-50 h-100 p-1">
			<odsl-list-panel name="Reports" service="reportconfig" source="public"></odsl-list-panel>
		</div>
	</div>
	<div class="row flex-grow-1 p-1">
		<div class="col w-50 h-100 p-1">
			<odsl-list-panel name="Public Objects" service="object" source="public"></odsl-list-panel>
		</div>
		<div class="col w-50 h-100 p-1">
			<odsl-list-panel name="Private Objects" service="object" source="private"></odsl-list-panel>
		</div>
	</div>
</div>
```

### Chart
This view shows how to use:
* [odsl-list-panel component](/docs/public/components/odsl-list-panel)
* [odsl-range-selector component](/docs/public/components/odsl-range-selector)
* [odsl-chart-panel component](/docs/public/components/odsl-chart-panel)

It also shows how you can configure a chart to use the odsl-range-selector automatically.

```html
{{>#odsl-extension}}

<div class="container-fluid h-100 d-flex flex-column extension">
	<div class="row h-100 p-1">
		<div class="col w-50 h-100 p-1">
			<odsl-list-panel 
				name="TimeSeries" 
				service="data" 
				source="public" 
				filter='{"_type":{"$in":["VarTimeSeries","VarEVentTimeSeries","VarSmartTimeSeries"]}}'
				onchange="document.getElementById('series').setAttribute('key', event.detail.id)"
				>
			</odsl-list-panel>
		</div>
		<div class="col w-50 h-100 p-1 d-flex flex-column">			
			<div class="flex-shrink-1">
				<odsl-range-selector 
                    id="rs" 
                    ranges='["last7","last30","thismonth","lastmonth","thisyear","lastyear"]'>
                </odsl-range-selector>
			</div>
			<div class="flex-shrink-1">
				<odsl-chart-panel title="Example Chart" service="data" source="public" rangeselector="rs">
					<odsl-chart-axis axis=0 type="datetime"></odsl-chart-axis>
					<odsl-chart-series id="series"></odsl-chart-series>
				</odsl-chart-panel>
			</div>
		</div>
	</div>
</div>
```

### Grid
This view shows how to use:
* [odsl-list-panel component](/docs/public/components/odsl-list-panel)
* [odsl-grid-panel component](/docs/public/components/odsl-grid-panel)

It also shows how you can configure a list panel to interact with a grid panel.

```html
{{>#odsl-extension}}

<div class="container-fluid h-100 d-flex flex-column extension">
	<div class="row flex-grow-1 p-1">
		<div class="col-4 h-100 p-1">
			<odsl-list-panel 
				id="objects" 
				name="Favourites" 
				service="group" 
				filter='{"type":"Favourites","service":"object"}'
				onchange="document.getElementById('properties').setAttribute('group', event.detail.id);">
            </odsl-list-panel>
		</div>
		<div class="col-8 h-100 p-1">
			<odsl-grid-panel id="properties" service="object" source="all" group="none">
				<odsl-grid-column field="_id" headername="ID" flex=2></odsl-grid-column>
				<odsl-grid-column field="name" headername="Name" flex=3></odsl-grid-column>
				<odsl-grid-column field="description" headername="Description" flex=4></odsl-grid-column>
				<odsl-grid-column field="location" headername="Location" flex=2></odsl-grid-column>
			</odsl-grid-panel>
		</div>
	</div>
</div>
```