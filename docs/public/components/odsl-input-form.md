---
title: odsl-input-form
description: A form containing data that you want to input and save
slug: /public/components/odsl-input-form
tags:
- component
- input
- form
- javascript
- html
---

## Description
The odsl-input-form component is a container for input and data items which you can use to create a data capture form.
The odsl-input-form component can have child components of type [odsl-input-field](odsl-input-field) and [odsl-data-field](odsl-data-field) components.

## Attributes
### service
The service attribute determines which [REST service](/docs/api/rest/rest) to use to retrieve the data, defaulting to object.

### source
The source attribute determines the source of the data, this is usually one of the following:
* public
* private
* all

It can also be omitted if the service is not a multi-source service.

## Methods
### fillForm(data)

The fillForm method populates the form fields with the json data passed in.

## Events
Clicking the submit button on the form pushes the input data to the configured REST service.

There are 2 events that can be handled:
* onsubmit - this is called BEFORE the data is submitted to the service, allowing you to validate or augment the data.
* onchange - this is called AFTER the data is submitted, allowing you to refresh areas of your page.

### submit

The submit event is fired when the submit button is clicked by the user.
It allows you to validate or manipulate the data entered before being posted to the service.

### change
The change event is fired after the submit event has posted the data to the service.

## Examples

### An input form to add an event timeseries to an object
```html
<odsl-input-form service="object" source="private" onsubmit="insertIntoObject(event.detail)">
    <odsl-input-field name="name" class="col-6" type="text" label="Name" help="Enter the name"></odsl-input-field>
    <odsl-input-field name="description" class="col-6" type="text" label="Description" help="Enter the description"></odsl-input-field>
    <odsl-input-field name="currency" type="odsl-currency" label="Currency" help="Currency"></odsl-input-field>
    <odsl-input-field name="units" type="odsl-units" label="Units" help="Units"></odsl-input-field>
    <odsl-input-field name="calendar" class="col-5" type="odsl-calendar" label="Calendar" help="The calendar to align the events to"></odsl-input-field>
    <odsl-input-field name="timezone" class="col-5" type="odsl-timezone" label="Timezone" help="The timezone for the event times"></odsl-input-field>
    <odsl-input-field name="source" class="col-1" type="odsl-source" label="Event Source" help="Select the source for the events"></odsl-input-field>
    <odsl-input-field name="event" class="col-4" type="odsl-event-list" label="Event List" help="The event list that this timeseries is built from"></odsl-input-field>
    <odsl-input-field name="property" class="col-2" type="text" label="Property Name" help="The property in the event for the timeseries values"></odsl-input-field>
    <odsl-input-field name="filter" class="col-5" type="text" label="Filter" help="Optional filter to filter the values"></odsl-input-field>
    <odsl-data-field name="_type" value="VarEventTimeSeries"></odsl-data-field>
</odsl-input-form>
```

#### An example of the form defined above
![](/img/components/odsl-input-form.png)

### Javascript to manipulate data
Below is an example function for the ```onsubmit``` event to create an object wrapper for an event object:

```js
function insertIntoObject(detail) {
	// Insert the data into an Object
	var data = {
		"_id": "MY_OBJECT_ID"
	}
	
	// Add the entered data as an event list on the object
	data["MY_EVENT_LIST"] = detail.data;

	// Replace the original data with our new object data
	detail.data = data;
}
```