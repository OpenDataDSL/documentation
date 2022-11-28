---
slug: /odsl/variable/declaredtype
tags:
  - type
---
DeclaredType
============================

A DeclaredType variable is a wrapper for a type and is used by the type service and creating objects.

## Construction
You declare a type using a structure containing the type definition and takes the following form:

```js
typename = (versioned)? type (extends typename)?
    (comment)?
    
    // Property
    name as type(qualifier?) (not null)? (default expression)? (bucket bucketDefinition)?
    
    // Smart Data
    name as smart (timeseries|curve) (with)? expression
    
    // Constraint
    constraint name (check|unique) (mark)? (condition (, condition)* | profile for checkname(param (,param)*))
    
end
```

### Adding property definitions
A property definition declares that this type has a specifically named property of a certain type.
The type can be one of the following:

|Type|Description|
|-|-|
|name|A special type declaring that this field is the default property to be used as the *name* of the object|
|description|A special type declaring that this field is the default property to be used as the *description* of the object|
|dimension|A special type declaring that this field is to be used as a filter property when navigating objects of this type|
|string|A scalar string property|
|number|A scalar numeric property|
|date|A scalar date or timestamp property|
|boolean|A scalar boolean (true|false) property|
|list|A list of variables|
|object|A dynamic object|
|duration|A duration variable|
|geometry|A geometry variable|
|timeseries|A timeseries|
|curve|A curve|

#### Not null
If you add the 'not null' modifier on the property definition, OpenDataDSL will not allow null values for this property.

#### Default
A way of counteracting the 'not null' modifier is to use a 'default' modifier that sets a default value for a property if it doesn't have a value.
The default value can be a scalar value or can be an expression that looks up a value in other objects.

##### Examples
```js
address = type
    name as String() not null
    type as Dimension()
    typeName as String() default ${object:"abc_metadata"}[type].name
end
```

#### Bucket
You can define a bucketing scheme for a property using the 'bucket' modifier, this takes the form:

```js
bucket (boundaries array|buckets integer (granularity (definition)?)
```

e.g.

```js
...
year as Dimension(number) not null bucket boundaries [1980, 1990, 2000, 2010, 2020, 2030]
...
```

### Adding smart data properties
Smart data properties allow you to create smart timeseries or curves which will be dynamically added to all objects that directly inherit this type.

For example, if you have an ASK and BID timeseries on the objects of a certain type, you can add a MID smart timeseries that dynamically calculates the mid point between the ASK and BID timeseries.

```js
...
MID = smart timeseries with (ASK+BID)/2
...
```

### Adding constraints
You can add constraints on the objects on a type that will help to improve the quality of your data.

```constraint name (check|unique) (mark)? (condition (, condition)* | for checkname(param (,param)*))```

#### name
The name of the constraint

#### check or unique
Check defines that this is a quality check type constraint and unique adds a unique index such that no 2 documents can be added with the same unique combination of fields

#### mark
Normally if a constraint catches a quality failure, the update will be rejected. If you add the 'mark' modifier, the object is marked with a status and message that the constraint check failed.

#### timeseries checks
You can perform tests for the following quality issues:

* Missing data using ```for missing()```

#### Examples
```js
constraint type_valid check (type in ${object:"abc_metadata"}.types)
constraint zip_valid check mark (zip matches "^\d{5}(-\d{4})?$")
constraint hl_valid check mark (hl in ["high","low"])
constraint zip_index unique (zip,hl)
```
