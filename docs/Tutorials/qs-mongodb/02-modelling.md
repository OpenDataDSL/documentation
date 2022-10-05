---
title: MongoDB data modelling
sidebar_position: 2
slug: /tutorials/qs/mongodb/modelling
tags:
- quickstart
- mongodb
- modelling
---
import {QuickStartModule} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module gives you an introduction to data modelling for MongoDB." />

## Introduction to Types

:::info
You need to have created a named database connection called m101 to a MongoDB cluster containing the MongoDB Sample Dataset,
click [here](/docs/tutorials/qs/mongodb/connecting#named-connections) for information on how to do this
:::

In this module we are going to create some **OpenDataDSL types** which are used as metadata to model how data looks, 
how it can be navigated and also what checks and constraints should be run when adding new data. 

## Data Discovery
If we don't know the structure of the data we are modelling, there are some useful ODSL commands that allow you to determine how to model your data.

### Looking at a single document
The following command gets the first document from the sample_training.zips and prints it out to the debug console.

```js
find top 1 from ${object:"m101:sample_training.zips"}
```

This returns the following:

```json
[
{
  "_id": "5c8eccc1caa187d17ca6ed16",
  "city": "ALPINE",
  "loc": {
    "_id": "loc",
    "x": 86.208934,
    "y": 33.331165
  },
  "pop": 3062,
  "state": "AL",
  "zip": 35014
}
]
```

From this, we can see a sample structure of what the documents in the sample_training.zips collection look like.

* _id is a unique BsonObjectId identifier
* city is the name of the city that this zip code refers to
* loc is a sub document containing the reference coordinates of the zip code (unfortunately not in geoJSON format, so it cannot tbe used for geo queries)
* pop is a number with the population size
* state is the abbreviation for the state of this zip code
* zip is the actual zip code

### Looking at information about a field

#### Unique list of values

We can get a unique or distinct list of values for a field using the **unique** find command modifier, e.g.

```js
find unique state ${object:"m101:sample_training.zips"}
```

This returns an array of the distinct list of values for that field in that collection

#### More information about the values of a field

We can use the **info** find command modifier to get more detailed information about a specific field, e.g.

```js
find info state ${object:"m101:sample_training.zips"} 
```

This gives us an array of objects containing the following fields:

* _id - The display name for the field value
* count - The number of documents matching this field value
* filter - The JSON filter to use if you want to see all the documents that match this field value
* filtertext - The ODSL filter to use in a find command where clause 

For example:

```json
[
  {
    "_id": "TX",
    "count": 1676,
    "filter": {
      "state": "TX"
    },
    "filtertext": "state='TX'"
  }
]
```

If the amount of distinct values is too large, or the field has been modelled to be a bucketed field, the returned array contains objects that are buckets of values, e.g.

```json
[
  {
    "_id": "0-341", 
    "count": 2953, 
    "filter": {
      "pop": {
        "$gte": 0, 
        "$lt": 341
      }
    }, 
    "filtertext": "pop>='0' and pop<'341'"
  }
]
```

## Data Modelling
Once we have gained an understanding of the structure of the documents in the collection, we can create a **Type** which models that structure.

:::info
If the collection and objects have not been created by OpenDataDSL, the id of the type has to be the same as the full domain name of the collection, 
e.g. connection:database.collection
:::

Here is the ODSL code to create our type for the **zips** collection:

```js
zips = type
    city as Dimension()
    state as Dimension()
    pop as Dimension(Number) bucket buckets 10
    zip as Number()
end
zips.id = "m101:sample_training.zips"
save ${type:zips}
```

This code defines the following:
* city field is defined as a string dimension
* state field is defined as a string dimension
* pop field is defined as a numeric dimension with a bucketing definition
* zip field is defined as a numeric field

### Dimensions
Defining a field as a dimension indicates to a User Interface that this field can be used as a navigation filter.
It is used within the OpenDataDSL Web Portal and Excel Add-in and can also be used for other custom user interfaces.

Adding a bucketing defintion to a field indicates that the field values should be bucketed rather than used raw when using this field as a navigation filter. 

### Defining a new type
Let us now define a type for some new data that we are going to load in the next section.
It is for some sensors that record temperature and humidity, so our type definition looks like this:

```js
sensor = type
    name as Name() not null
    temperature as timeseries()
    humidity as timeseries()
end
save ${type:sensor}
```

Here we are defining the following:
* name is the defined name property of the sensor
* temperature is a timeseries of values
* humidity is a timeseries of values

:::note
Note that we added the phrase **not null** to the name property, this ensures that every sensor has a non null name
:::

In the [next](./loading) section, we look at loading data into our sensor dataset.
