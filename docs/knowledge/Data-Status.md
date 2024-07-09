---
slug: /kb/status
description: Details on data status values
tags:
  - status
---
Data Statuses
=============

Data Status values allow us to add more information about an individual observation in a TimeSeries or Curve 

## Setting Value Statuses

We can add some context about an observation by adding some status information. Status information is categorised as follows:

*   Quality    
*   Source    
*   Reliability
*   Processed
    

### Quality Status

The quality status defines whether the value of the observation is deemed to to be representative of the TimeSeries at that point in time, so a missing value or a value that is much higher or lower than the other observations around it would be deemed to be of bad quality.

The states of the quality status are:

*   Unchecked (default)  
*   Valid
*   Failed
*   NIC - not in calendar
    

### Source Status

The source status defines where the value came from. This documents the provenance of the observations in the TimeSeries, for example if we fill in some gaps with an interpolation algorithm or create a value based on the values from other TimeSeries etc.

The states of the source status are:

*   New (default)
*   Changed
*   Implied
*   Filled
*   Converted
*   Calculated
*   Substituted
    

### Reliability Status

The reliability status is used for regulatory reporting regarding the trustworthiness of the observation if it is used for accounting purposes.

The states of the reliability status are:

*   Unknown (default)   
*   Quoted
*   Observed
*   Unobserved
    

### Processed Status

The processed status is used to determine various stages of evolution of a data point, these are custom and can be used as you like.

The states of the process status are:

*   Unprocessed (default)
*   Stage1
*   Stage2
*   Waiting
*   Failed
*   Built
*   Complete


## Examples

### Setting the status when the value is added

```js
// Setting the status when the value is added
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5, ["Valid", "Calculated"])
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {
        "quality": "VALID",
        "source": "CALCULATED"
      },
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```

### Setting the value on an observation in a TimeSeries

```js
// Setting the status on a value
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)
ts1["2021-01-01"].status.quality = "Valid"
print json(ts1)
```

### Setting additional information

```js
// Setting the status and info on a value
ts1 = TimeSeries("BUSINESS")
ts1.add("2021-01-01", 21.5)
ts1["2021-01-01"].status.quality = "Valid"
ts1["2021-01-01"].status.quality.info = "Tested for missing and spikes"
print json(ts1)
```

Results:

```json
{
  "_type": "VarTimeSeries",
  "_id": "ts1",
  "description": "",
  "start": "2021-01-01",
  "calendar": "BUSINESS",
  "timezone": "UTC",
  "valueType": "TRACKED",
  "dataType": "any",
  "properties": {},
  "data": [
    {
      "time": "2021-01-01",
      "value": 21.500000,
      "status": {
        "quality": "VALID:Tested for missing and spikes"
      },
      "_type": "TimeValue",
      "_links": {}
    }
  ]
}
```
