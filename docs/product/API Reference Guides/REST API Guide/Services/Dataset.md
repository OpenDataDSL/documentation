---
title: Dataset Service
description: REST API for the dataset monitoring service
slug: /api/rest/service/dataset
tags:
- api
- service
- dataset
---
The dataset resource contains the configuration for dataset monitoring

## Dataset REST API

The Dataset REST API is accessed through the following URL:
```js
https://api.opendatadsl.com/api/dataset
```

### General
|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|


### Dataset info methods
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/info|v1/info|Lists all the datasets you have configured for monitoring|
|GET|{release}/allds|v1/allds|Lists all the datasets you have access to (both managed and unmanaged)|
|GET|{release}/info/{id}|v1/info/ICE.NDEX.NLB|Gets a dataset configuration|
|POST|{release}/info|v1/info|Update a dataset monitoring configuration|
|DELETE|{release}/info/{id}|v1/info/ICE.NDEX.NLB|Remove a dataset monitoring configuration|

### Dataset feed methods
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/feed|v1/feed|Lists all the dataset feeds you have configured for monitoring|
|GET|{release}/alldf|v1/alldf|Lists all the dataset feeds you have access to (both managed and unmanaged)|
|GET|{release}/feed/{id}|v1/feed/ICE.NDEX|Gets a dataset feed configuration|
|POST|{release}/feed|v1/feed|Update a dataset feed configuration|
|DELETE|{release}/feed/{id}|v1/feed/ICE.NDEX|Remove a dataset feed monitoring configuration|

### Dataset delivery methods
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|{release}/delivery|v1/delivery|Lists all the dataset deliveries for the current ondate|
|GET|{release}/delivery/{ondate}|v1/delivery/2024-06-12|Lists all the dataset deliveries for the provided ondate|
|GET|{release}/delivery/{id}|v1/delivery/ICE.NDEX.NLB:2024-06-12|Gets the specified dataset delivery for the provided ondate|

## Dataset entities

### Dataset configuration

Here are the properties of a Dataset configuration

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the DataSet in the format {provider}.{feed}.{product}|String|
|_type|Always 'Dataset'|String|
|dsid|Same as _id|String|
|name|The name of the dataset|String|
|provider|The id of the provider|String|
|feed|The id of the feed|String|
|product|The id of the product|String|
|source|The source of the dataset private, common or public|String|
|qualityGroup|The name of the quality group used to check the quality of the dataset (group type:quality)|String|
|expected|An object defining the number of each tenor type we expect to receive for this dataset - only applicable for private datasets|Object|

#### Example dataset

```json
  {
    "_id": "ICE.NDEX.BEP",
    "_type": "Dataset",
    "dsid": "ICE.NDEX.BEP",
    "provider": "ICE",
    "feed": "NDEX",
    "product": "BEP",
    "name": "ICE NDEX BEP - Belgian Power Financial Peak Futures",
    "qualityGroup": "default",
    "expected": {
      "*": 82,
      "Month": 59,
      "Year": 4,
      "Quarter": 19
    },
    "source": "common"
  }
```

### Dataset Feed configuration

Here are the properties of a Dataset Feed configuration

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the DataSet Feed in the format {provider}.{feed}|String|
|_type|Always 'DatasetFeed'|String|
|dsid|Same as _id|String|
|name|The name of the dataset feed|String|
|provider|The id of the provider|String|
|feed|The id of the feed|String|
|source|The source of the dataset private, common or public|String|
|calendar|The holiday calendar defining when the feed is available for collection|String|
|time|The start time when the feed should be available in the format HH:mm|String|
|late|The time when the feed is considered to be late in the format HH:mm|String|

#### Example dataset feed

```json
{
  "_id": "ODSL.FEED",
  "_type": "DatasetFeed",
  "calendar": "BUSINESS",
  "source": "private",
  "time": "20:00 EU1",
  "late": "23:00 EU1",
  "provider": "ODSL",
  "feed": "FEED",
  "name": "ODSL Sample Feed"
}
```

#### Smart feed configuration
If this dataset feed is being loaded using the Smart Feed, the following additional configuration information can be added:

|**Name**|**Description**|**Type**|
|-|-|-|
|smartFeed|A boolean indicating to load this dataset feed using the smart loader|Boolean|
|loaders|An array of loader configurations|Object|

##### Loader configuration

|**Name**|**Description**|**Type**|
|-|-|-|
|type|The type of loader - standard, auto or manual|String|
|id|The name of the loader, has to be unique within this feed|String|
|process|The name of the process to run|String|
|calendar|The days this loader should be run|String|
|start|The start time for the loader to fire|String|

##### Example loader configuration

```json
{
  "calendar": "DAILY",
  "process": "BSP_EL_DA_DATA",
  "start": "19:30 EU2",
  "type": "standard",
  "id": "standard"
}
```


### Dataset Delivery configuration

Here are the properties of a Dataset Delivery configuration

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the Dataset Delivery in the format {provider}.{feed}.{product}.{ondate}|String|
|_type|Always 'DatasetDelivery'|String|
|dsid|The dataset id|String|
|ondate|The date for the data being delivered|String|
|complete|A boolean indicating if this dataset is complete|Boolean|
|initialised|A datetime when this delivery was initialised|Datetime|
|score|An integer defining the score for this delivery - 4=No issues, 3=Late<1h, 2=Late<4h, 1=Late>4h, 0=Holiday|Integer|
|scoreinfo|Text to add context to the score value|String|
|status|The current status of the delivery|String|
|statusinfo|Text to add context to the status|String|
|expected|Expected tenors to be delivered, copied from the dataset configuration|Object|
|actual|Actual tenors delivered, same format as expected|Object|
|timings|An object with info about the [timings](#dataset-delivery-timings-object)|Object|
|deliveries|Information about all the feed [deliveries](#dataset-delivery-deliveries-object) that were made|Object|
|checks|Information about all the quality checks that were made|Object|
|timeline|A log of everything that has happened in connection with this delivery|Array(String)|
|timestamp|The last time this delivery information was updated|Datetime|

#### Dataset delivery timings object

|**Name**|**Description**|**Type**|
|-|-|-|
|expected|The time when this dataset is expected to be ready in the format HH:mm [tz]|String|
|late|The time when this dataset is considered to be late in the format HH:mm [tz]|String|
|loaded|The time the data was loaded completely in the format HH:mm [tz]|String|
|late_delta|An integer indicating the number of minutes that this dataset is late|Integer|
|actual|An array of objects with time and status used to show partial deliveries up to final full delivery|Array| 

#### Dataset delivery deliveries object

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The transaction id - usually the same as the process execution id|String|
|timestamp|The datetime for this delivery|Datetime|
|reason|The reason string, usually crontab information|String|
|origin|The origin of the delivery, usually the name of the process|String|
|tenors|The actual tenors delivered in this delivery|Object|

#### Dataset delivery quality check object

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The transaction id - usually the same as the process execution id|String|
|timestamp|The datetime for the quality checks|Datetime|
|log|Log messages produced from the checks|List(String)|
|{check name}|Object containing output from the quality check function|Object|

#### Example Dataset Delivery

```json
{
  "_id": "BSP.EL_DA.SI:2024-07-18",
  "complete": true,
  "dsid": "BSP.EL_DA.SI",
  "initialised": "2024-07-18T00:00:40.580Z",
  "ondate": "2024-07-18",
  "score": 1,
  "scoreinfo": "Late Data: > 4h",
  "status": "loaded",
  "statusinfo": "Loaded data matches expected",
  "timeline": [
    "2024-07-18T00:00:40.580263Z[UTC] info DS_PUBLIC_INIT status changed to waiting",
    "2024-07-19T00:10:32.981082Z[UTC] warn DS_PUBLIC_LATE status changed to late",
    "2024-07-19T00:10:32.981146Z[UTC] info DS_PUBLIC_LATE statusinfo changed to 1 days late",
    "2024-07-19T17:31:05.803141Z[UTC] info BSP_EL_DA_DATA Got delivery ee5d9f41-b32e-465a-9c78-80fbe775f4ac with 24 tenors",
    "2024-07-19T17:31:05.807096Z[UTC] info BSP_EL_DA_DATA Delivery ee5d9f41-b32e-465a-9c78-80fbe775f4ac had 24 new tenors",
    "2024-07-19T17:31:05.807251Z[UTC] info BSP_EL_DA_DATA status changed to loaded",
    "2024-07-19T17:31:05.865858Z[UTC] info BSP_EL_DA_DATA statusinfo changed to Loaded data matches expected"
  ],
  "timings": {
    "expected": "19:30 EU2",
    "late": "21:00 EU2",
    "timezone": "Europe/Ljubljana",
    "actual": [
      {
        "00:10 UTC": "late"
      },
      {
        "-19:31 EU2": "loaded"
      }
    ],
    "late_delta": 88260,
    "loaded": "-19:31 EU2"
  },
  "actual": {
    "*": 24,
    "Intraday": 24
  },
  "deliveries": {
    "ee5d9f41-b32e-465a-9c78-80fbe775f4ac": {
      "id": "ee5d9f41-b32e-465a-9c78-80fbe775f4ac",
      "timestamp": "2024-07-19T17:31:05.803Z",
      "reason": "smartLoader(BSP.EL_DA/BSP_EL_DA_DATA/2024-07-19,2024-07-19T17:30:30Z)",
      "origin": "BSP_EL_DA_DATA",
      "tenors": {
        "*": 24,
        "Intraday": 24
      }
    }
  },
  "expected": {
    "*": 24,
    "Intraday": 24
  },
  "timestamp": "2024-07-19T17:31:05.807Z"
}
```

## Functions

The following functions are available on the dataset REST API:

|**Function**|**Example**|**Description**|
|-|-|-|
|expected|/dataset/v1/ODSL.NDEX.BEP?_function=expected|Calculate the expected tenors for a dataset based on historic data loads|
|expected|/dataset/v1/ODSL?_function=expected|Calculate the expected tenors for all datasets starting with ODSL based on historic data loads|
|initialise|/dataset/v1/2024-04-30?_function=initialise|Initialise a dataset for a specified ondate|
|lateness|/dataset/v1/2024-03-11?_function=lateness|Check the lateness of all datasets for the specified ondate|

## Examples

### Datasets

```js
### Get full list of datasets
GET {{url}}/dataset/v1/allds
  ?_project=name
Authorization: Bearer {{token}}

### Get Dataset infos
GET {{url}}/dataset/v1/info
Authorization: Bearer {{token}}

### Get Dataset infos - filtered
GET {{url}}/dataset/v1/info
  ?_id=ICE.NDEX.GAB
  &_id=ICE.NDEX.BEP
Authorization: Bearer {{token}}

### Get Dataset infos - projected
GET {{url}}/dataset/v1/info
  ?_project=dsid,source
Authorization: Bearer {{token}}

### Get a Dataset info
GET {{url}}/dataset/v1/info/ICE.NDEX.BEB
Authorization: Bearer {{token}}

### Add a Dataset Info
POST {{url}}/dataset/v1/info
Authorization: Bearer {{token}}

{
  "_id": "ODSL.TRADER1.NBP",
  "expected": {
    "*": 1
  }
}

### Add a common Dataset Info
POST {{url}}/dataset/v1/info
Authorization: Bearer {{token}}

{
  "_id": "ICE.NDEX.NLB",
  "source":"common"
}

### Delete a Dataset info
DELETE {{url}}/dataset/v1/info/ICE.NDEX.DDA
Authorization: Bearer {{token}}
```

### Dataset Feed

```js
### Get full list of datasets
GET {{url}}/dataset/v1/alldf
  ?_project=name
Authorization: Bearer {{token}}

### Get Dataset Feeds
GET {{url}}/dataset/v1/feed
Authorization: Bearer {{token}}

### Get Dataset Feeds - filtered
GET {{url}}/dataset/v1/feed
  ?_id=ICE.NDEX
Authorization: Bearer {{token}}

### Get Dataset Feeds - filtered
GET {{url}}/dataset/v1/feed
  ?source=common
Authorization: Bearer {{token}}

### Get Dataset Feeds - projected
GET {{url}}/dataset/v1/feed
  ?_project=calendar,time,late
Authorization: Bearer {{token}}

### Get a Dataset Feed
GET {{url}}/dataset/v1/feed/ICE.NDEX
Authorization: Bearer {{token}}

### Get a Dataset Feed - projected
GET {{url}}/dataset/v1/feed/ICE.NDEX
  ?_project=time,late
Authorization: Bearer {{token}}

### Add a dataset feed
POST {{url}}/dataset/v1/feed
Authorization: Bearer {{token}}

{
  "_id": "ODSL.TRADER1",
  "time": "20:00 EU1",
  "late": "23:00 EU1"
}

### Delete a feed
DELETE {{url}}/dataset/v1/feed/ODSL.TRADER1
Authorization: Bearer {{token}}

```

### Dataset deliveries

```js
### Get Dataset Deliveries - current ondate
GET {{url}}/dataset/v1/delivery
Authorization: Bearer {{token}}

### Get Dataset Deliveries - specific ondate
GET {{url}}/dataset/v1/delivery/2024-06-12
Authorization: Bearer {{token}}

### Get Dataset Deliveries - filtered
GET {{url}}/dataset/v1/delivery/2024-06-12
  ?dsid=ICE.NDEX.NLB
Authorization: Bearer {{token}}

### Get Dataset Deliveries - projected
GET {{url}}/dataset/v1/delivery/2024-06-12
  ?_project=score,scoreinfo
Authorization: Bearer {{token}}

### Get Dataset Delivery
GET {{url}}/dataset/v1/delivery/ICE.NDEX.NLB:2024-06-12
  ?_project=score,scoreinfo
Authorization: Bearer {{token}}
```