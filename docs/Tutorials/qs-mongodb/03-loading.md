---
title: Loading data into MongoDB
sidebar_position: 3
slug: /tutorials/qs/mongodb/loading
tags:
- quickstart
- mongodb
- loading
---
import {QuickStartModule} from '/src/components/Discovery.js';

<QuickStartModule text="This quickstart module shows you how to update data into MongoDB." />

## Methods of loading data - all licenses

:::info
This section presumes you have already completed [MongoDB Data Modelling](./modelling) and that you have created the 
[sensor type](./modelling#defining-a-new-type)
:::

OpenDataDSL makes loading data into MongoDB very easy, here are some ways you can do it using any OpenDataDSL license.

### Directly creating data from ODSL code

We can create objects of type sensor directly in ODSL code as shown below:

```js
s9754 = object as sensor
    name = "Bromley"
    temperature = TimeSeries("2022-10-03T09:30:27", "SPARSE", 15)
    humidity = TimeSeries("2022-10-03T09:30:27", "SPARSE", 32)
end
save ${object:s9754}
```

### Use a transformer to create data

An OpenDataDSL transformer maps data from an input source to output data objects.

Let us assume we get sensor data in JSON format similar to below:

```json
{
  "time":"2022-10-03T11:30:00", 
  "sensors":[
    {
      "id":"s9754",
      "temperature":15.5,
      "humidity":33
    },
    {
      "id":"s9879", 
      "temperature":14.5,
      "humidity":19
    }
  ]
}
```

We can create our objects using the following transformer:

```js
sensor_tx = transform input into sensor as var
    create with sensors
    unique id = var.id
    temperature = TimeSeries(input.time, "SPARSE", var.temperature)
    humidity = TimeSeries(input.time, "SPARSE", var.humidity)
end
save ${transformer:sensor_tx}
```

This assumes that the sensors have already been created, otherwise they will fail the name null check.

:::info
Two very important aspects of loading data into MongoDB via OpenDataDSL:
* If the document already exists, the data is merged with the existing document and then the quality checks are performed
* Timeseries are created if they don't exist and appended to if they do exist
:::
  
We can now load our data from a file using the following script (assuming the data is in a file /data/sensor_data.json)

```js
input = ${file:"/data/sensor_data.json"}
result = ${transformer:"sensor_tx"}.run(input)
save ${object:result}
```

### Saving to your own collection
As well as saving to the default ```private``` collection, you can also save to any named collection.

We just have to make a small modification to the save command to specify the name of the collection to save to, in this case ```sensors```

```js
s9797 = object as sensor
    name = "Bromley"
    temperature = TimeSeries("2022-10-03T09:30:27", "SPARSE", 15)
    humidity = TimeSeries("2022-10-03T09:30:27", "SPARSE", 32)
end
save ${object:"sensors"/s9797}
```

:::note
If the named collection doesn't exist, it will be created on the fly
:::

### Retrieving data from your own collection
To search for data in your own collection, just specify the name of the collection to search in, e.g.:

```js
find ${object:"sensors"}
```

To retrieve a single document using it's ```_id``` property

```js
sensor = ${object:"sensors"/"s9797"}
print sensor
```

## Methods of loading data - commercial licenses

Here are some ways you can load data into MongoDB using a commercial OpenDataDSL license.

### Using the REST API

You can update the sensor data using a REST API call as follows:

```js
POST https://api.opendatadsl.com/api/object/v1/private
Authorization: Bearer {{token}}

[
{
  "_id": "s9754",
  "_type": "sensor",
  "humidity": {
    "_type":"VarTimeSeries",
    "calendar": "SPARSE",
    "data":[
      {"time":"2022-10-03T17:30:00", "value":12}
    ]
  },
  "temperature": {
    "_type":"VarTimeSeries",
    "calendar": "SPARSE",
    "data":[
      {"time":"2022-10-03T17:30:00", "value":9}
    ]
  }
},
{
  "_id": "s9879",
  "_type": "sensor",
  "humidity": {
    "_type":"VarTimeSeries",
    "calendar": "SPARSE",
    "data":[
      {"time":"2022-10-03T17:30:00", "value":10}
    ]
  },
  "temperature": {
    "_type":"VarTimeSeries",
    "calendar": "SPARSE",
    "data":[
      {"time":"2022-10-03T17:30:00", "value":9.5}
    ]
  }
}
]
```

### Using a scheduled process
If you have a Premium or Enterprise License, you can schedule a process to run at regular intervals to collect the data from the source, 
transform it and load it into MongoDB.

This can be built either as a Workflow using re-usable Actions or as a Script.

This method is explained in detail [here](/docs/odsl/dm/workflow)



