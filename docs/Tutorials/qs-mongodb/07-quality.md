---
title: Data Quality
sidebar_position: 7
slug: /tutorials/qs/mongodb/quality
tags:
- quickstart
- odsl
- mongodb
- data
- quality
---
import {QuickStartModule} from '/src/components/Discovery.js';
import {MoreInfo, InDepth, Tutorial} from '/src/components/Discovery.js';

<QuickStartModule text="A tutorial showing you how to ensure the data in your collections is of high quality" />

## Using Types to define quality rules

When you define a type, there are various aspects of it which then controls data quality as new data is written.

## Value type
When you define a property on a type, you specify the type of data that will be stored in that property.

The type definition below defines 3 properties:
* name is of type String
* temperature and humidity are of type Timeseries

```js
sensor = type
    name as String() not null
    temperature as timeseries()
    humidity as timeseries()
end
```

Any data written using type=sensor that had those 3 properties would have to conform to the defined types or else it would be rejected.

## Not null directive
Adding the directive ```not null``` to a property definition ensures that no null values can be written to this property.

## Default directive
Adding a ```default``` directive is an alternative way of dealing with null values, in this case if the value on the document is null, the default value will be used instead.

The default value can be:
* A statically defined value
* A value looked up from another document

### Example of a statically defined default value

If the name property is missing or null, it is replaced with the value ```Undefined```

```js
sensor = type
    name as String() default "Undefined"
end
```

### Example of a looked up default value

If the name property is missing or null, it is replaced with the value looked up using the property name in the ```type``` property from the object ```sensor_metadata```

```js
sensor = type
    type as String() not null
    name as String() default ${object:"sensor_metadata"}[type].name
end
```

The sensor_metadata would look something like this:

```json
{
  "types": ["A", "B"],
  "A": {
    "name": "Type A"
  },
  "B": {
    "name": "Type B"
  }
}
```

## Value constraints

You can add constraints to a type which check the value or values of properties to ensure they fulfill a condition.

Constraints can be configured, upon failure, to either:
* Reject the whole document (default)
* Mark the document with a Failed status by adding the directive ```mark``` after the ```check``` directive

### Example of using the mark directive

```js
sensor = type
    type as String() not null
    name as String() not null

    constraint type_valid check mark (type = "test")
end
```

### Example of value in a list

This example checks to see that the value in the ```type``` property is one of "temperature", "humidity" or "both"

```js
sensor = type
    type as String() not null
    name as String() not null

    constraint type_valid check (type in ["temperature","humidity","both"])
end
```

### Example of using a regex expression
The following using a regex expression to validate that an input value matches a certain patter

```js
sensor = type
    type as String() not null
    name as String() not null
    zip as String() not null

    constraint zip_valid check mark (zip matches "^\d{5}(-\d{4})?$")
end
```

### Example of looked up constraint
The following constraint checks to see that the value in the ```type``` property exists in a ```types``` array in a ```sensor_metadata``` object.

```js
sensor = type
    type as String() not null
    name as String() default ${object:"sensor_metadata"}[type].name
    
    constraint type_valid check (type in ${object:"sensor_metadata"}.types)
end
```