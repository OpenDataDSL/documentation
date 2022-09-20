---
slug: /odsl/variable/batch
tags:
  - batch
  - list
---
Batch
=====

A batch variable is a custom [list](List) variable that contains variables and supplemental information needed to update into the object repository

## Construction
A batch can be constructed in the following ways:

```js
// RECOMMENDED: Creating a batch from the PROCESS variable
batch=PROCESS.createBatch()

// Directly creating a batch
batch = Batch()
```

Creating a batch using the createBatch of a [process](Process) sets the following properties on the batch:
* service as the service property on the process
* name as the name property on the process
* correlationId as the unique executionId of the process

## Properties
A batch has the following properties:

|**Name**|**Description**|**Type**|
|-|-|-|
|id|The id of the batch|Scalar(String)|
|loader|The name of the loader|Scalar(String)|
|name|The name of the batch or process that runs this batch|Scalar(String)|
|service|The service name of the batch or process that runs this batch|Scalar(String)|
|size|The number of objects in the batch|Scalar(Int)|

## Methods
A batch variable has the following methods:

|**Name**|**Description**|**Return Type**|
|-|-|-|
|add(Object)|Adds an object to the batch|this|
|addAll(List(Object))|Adds all the objects from the supplied list to this batch|this|
|subList(int,int)|Gets a list with the elements in the supplied range|List|

