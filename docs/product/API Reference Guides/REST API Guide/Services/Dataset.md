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
|retryStrategy|Only applicable to standard loaders and configures how the loader handles retries|Object|

###### Retry strategies

|**Name**|**Description**|**Type**|
|-|-|-|
|strategy|The type - linear, random, eager or lazy|String|
|retryMinutes|The number of minutes to wait for linear and a hint to the others|Integer|

##### Example loader configuration

```json
{
  "calendar": "DAILY",
  "process": "BSP_EL_DA_DATA",
  "start": "19:30 EU2",
  "type": "standard",
  "id": "standard",
  "retryStrategy": {
    "strategy": "linear",
    "retryMinutes": 10
  }
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
|expectedChecks|Information about the [quantitative checks](#dataset-delivery-expected-checks-object) performed for each delivery|Object|
|actual|Actual tenors delivered, same format as expected|Object|
|timings|An object with info about the [timings](#dataset-delivery-timings-object)|Object|
|deliveries|Information about all the feed [deliveries](#dataset-delivery-deliveries-object) that were made|Object|
|checks|Information about all the quality [checks](#dataset-delivery-expected-checks-object) that were made|Object|
|timeline|A log of everything that has happened in connection with this delivery|Array(String)|
|timestamp|The last time this delivery information was updated|Datetime|
|issues|The current list of issues preventing this dataset from being complete|Array(String)|
|loadedTimeUTC|The UTC timestamp that this dataset was loaded|DateTime| 

#### Timeline messages

Each timeline message consists of the following parts separated by spaces:

* **Timestamp**
> The UTC timestamp of the message
* **Level**
> The log level, can be one of:
    * info - General information
    * warning - A non-fatal event has occurred that you need to be aware of
    * fatal - A fatal issue, usually missing data or failed quality check
    * severe - A severe issue that means this data is unusable 
* **Origin**
> The origin of the input data that triggered this dataset event, can be a process name or a user email
* **Phase**
> The phase where this occurred, can be one of:
    * initialise - Initialisation at the start of the day
    * delivery - Details about a data lod/delivery event
    * completeness - Completeness checks that verify that all data for this dataset has been loaded
    * lateness - Lateness notifications
    * quality - Qualitative check on the data content
* **Message**
> The rest of the timeline message is the message output from the process

**Example Timeline Message:**

"2024-11-08T17:22:06.029272Z[UTC] fatal ODSL_LOADER completeness Check: has tenor D00 has failed"

#### Dataset delivery timings object

|**Name**|**Description**|**Type**|
|-|-|-|
|expected|The time when this dataset is expected to be ready in the format HH:mm [tz]|String|
|late|The time when this dataset is considered to be late in the format HH:mm [tz]|String|
|loaded|The time the data was loaded completely in the format HH:mm [tz]|String|
|late_delta|An integer indicating the number of minutes that this dataset is late|Integer|

#### Dataset delivery deliveries object

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The transaction id - usually the same as the process execution id|String|
|timestamp|The datetime for this delivery|Datetime|
|reason|The reason string, usually crontab information|String|
|origin|The origin of the delivery, usually the name of the process|String|
|tenors|The actual tenors delivered in this delivery|Object|

#### Dataset delivery expected checks object

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The transaction id - usually the same as the process execution id|String|
|timestamp|The datetime for the quality checks|Datetime|
|log|Log messages produced from the checks|List(String)|
|{check name}|Object containing output from the quality check function|Object|

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
  "_id": "ODSL.DS.TEST:2024-11-04",
  "complete": true,
  "dsid": "ODSL.DS.TEST",
  "initialised": {
    "$date": "2024-11-08T17:22:04.290Z"
  },
  "ondate": "2024-11-04",
  "qualityStatus": "valid",
  "score": 4,
  "scoreinfo": "No issues on this day",
  "status": "loaded",
  "statusinfo": "Loaded data matches expected",
  "timeline": [
    "2024-11-08T17:22:04.290137Z[UTC] info ODSL_LOADER initialise status changed to waiting",
    "2024-11-08T17:22:04.393592Z[UTC] info ODSL_LOADER delivery Got delivery 7b33f31b-f321-4fac-beef-989fa30e5cf7 with 3 tenors",
    "2024-11-08T17:22:04.416355Z[UTC] info ODSL_LOADER delivery Delivery 7b33f31b-f321-4fac-beef-989fa30e5cf7 had 3 new tenors",
    "2024-11-08T17:22:06.029272Z[UTC] fatal ODSL_LOADER completeness Check: has tenor D00 has failed",
    "2024-11-08T17:22:07.459795Z[UTC] fatal ODSL_LOADER completeness Check: has tenor M00 has failed",
    "2024-11-08T17:22:07.460078Z[UTC] info ODSL_LOADER completeness status changed to partial",
    "2024-11-08T17:22:26.657711Z[UTC] info ODSL_LOADER delivery Got delivery 661cc59c-be3a-42de-8f21-9527fedade13 with 5 tenors",
    "2024-11-08T17:22:26.658153Z[UTC] info ODSL_LOADER delivery Delivery 661cc59c-be3a-42de-8f21-9527fedade13 had 2 new tenors",
    "2024-11-08T17:22:28.081597Z[UTC] info ODSL_LOADER completeness Check: has tenor D00 valid",
    "2024-11-08T17:22:29.399952Z[UTC] info ODSL_LOADER completeness Check: has tenor M00 valid",
    "2024-11-08T17:22:29.400029Z[UTC] info ODSL_LOADER completeness status changed to loaded",
    "2024-11-08T17:22:29.436052Z[UTC] info ODSL_LOADER completeness statusinfo changed to Loaded data matches expected",
    "2024-11-08T17:23:18.905957Z[UTC] info qualityChecks quality Running quality checks from group: DS Quality",
    "2024-11-08T17:24:25.502120Z[UTC] info qualityChecks quality Running quality checks from group: DS Quality"
  ],
  "timings": {
    "expected": "23:35 EU1",
    "late": "+05:00 EU1",
    "timezone": "Europe/London",
    "actual": [
      {
        "+17:22 EU1": "partial"
      },
      {
        "+17:22 EU1": "loaded"
      }
    ],
    "late_delta": 5062,
    "loaded": "+17:22 EU1"
  },
  "actual": {
    "*": 5,
    "CalendarDay": 3,
    "Month": 2
  },
  "deliveries": {
    "7b33f31b-f321-4fac-beef-989fa30e5cf7": {
      "id": "7b33f31b-f321-4fac-beef-989fa30e5cf7",
      "timestamp": "2024-11-08T17:22:04.393Z",
      "reason": "Unknown",
      "origin": "ODSL_LOADER",
      "tenors": {
        "*": 3,
        "CalendarDay": 2,
        "Month": 1
      }
    },
    "661cc59c-be3a-42de-8f21-9527fedade13": {
      "id": "661cc59c-be3a-42de-8f21-9527fedade13",
      "timestamp": "2024-11-08T17:22:26.657Z",
      "reason": "Unknown",
      "origin": "ODSL_LOADER",
      "tenors": {
        "*": 2,
        "CalendarDay": 1,
        "Month": 1
      }
    }
  },
  "expected": {
    "*": 2,
    "CalendarDay": 2,
    "Month": 2
  },
  "expectedChecks": {
    "7b33f31b-f321-4fac-beef-989fa30e5cf7": {
      "timestamp": "2024-11-08T17:22:04.434Z",
      "has tenor D00": {
        "_id": "#LOG",
        "ScriptReturnStatus": "failed",
        "failures": [
          "Missing D00 tenor"
        ]
      },
      "has tenor M00": {
        "_id": "#LOG",
        "ScriptReturnStatus": "failed",
        "failures": [
          "Missing M00 tenor"
        ]
      }
    },
    "661cc59c-be3a-42de-8f21-9527fedade13": {
      "timestamp": "2024-11-08T17:22:26.659Z",
      "has tenor D00": {
        "_id": "#LOG",
        "ScriptReturnStatus": "valid",
        "failures": []
      },
      "has tenor M00": {
        "_id": "#LOG",
        "ScriptReturnStatus": "valid",
        "failures": []
      },
      "log": [
        "2024-11-08T17:22:28.081511Z[UTC] INFO D00 found",
        "2024-11-08T17:22:29.399916Z[UTC] INFO M00 found"
      ]
    }
  },
  "issues": [],
  "loadedTimeUTC": "2024-11-08T17:22:29.400Z",
  "timestamp": "2024-11-08T17:22:29.400Z",
  "checks": {
    "21f55cdd-700d-424e-884f-31c0489de60f": {
      "timestamp": "2024-11-08T17:23:18.977Z",
      "Check for zero values": {
        "_id": "#LOG",
        "ScriptReturnStatus": "valid",
        "failures": []
      },
      "log": [
        "2024-11-08T17:23:22.895729Z[UTC] INFO Checking 5 events for dataset: ODSL.DS.TEST for 2024-11-04"
      ]
    },
    "c7b00b05-4c29-46ac-8099-4499742006b7": {
      "timestamp": "2024-11-08T17:24:25.524Z",
      "Check for zero values": {
        "_id": "#LOG",
        "ScriptReturnStatus": "valid",
        "failures": []
      },
      "log": [
        "2024-11-08T17:24:29.788058Z[UTC] INFO Checking 5 events for dataset: ODSL.DS.TEST for 2024-11-04"
      ]
    }
  }
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