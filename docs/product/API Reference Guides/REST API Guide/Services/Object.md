---
title: Object Service
description: REST API for the object service
slug: /api/rest/service/object
tags:
  - api
  - service
  - object
---
The object resource contains all the reference and meta-data for all the public and private data in OpenDataDSL

## Object REST API

The Object REST API is a full CRUD API allowing you to search and filter objects as well as update, version and delete them. It is accessed through the following URL:
```json
https://api.opendatadsl.com/service/object
```
The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|{release}/{source}|'v1/public' 'v1/private'|List public or private objects|
|GET|{release}/{source}/{key}|v1/private/TEST|Retrieve a single object using it’s unique id|
|GET|{release}/{source}/{key}/{version}|v1/private/TEST/1|Retrieve a version of a single object|
|GET|{release}/{source}/{key}/*|v1/private/TEST/*|Get a list of versions for a specific object|
|PUT|{release}/{source}/{key}/{version}/{tag}|v1/private/TEST/1/PROD|Tag a version with a name (which can be used instead of the version number when retrieving it)|
|POST|{release}|v1|Create or update an object, the object is the body of the POST request|
|DELETE|{release}/{source}/{key}|v1/private/TEST|Delete an object, if it is a versioned object, this has the effect of rolling back to the previous version|
|DELETE|{release}/{source}/{key}/{version}|v1/private/TEST/1|Delete a version of an object|
|DELETE|{release}/{source}/{key}/*|v1/private/TEST/*|Fully delete an object, including all versions|

## Finding Objects

### Searching for objects

You can use the _search query parameter to find objects, it searches in the following fields:

*   _id    
*   name    
*   description  
*   classification    

Example search request:

```json
https://api.opendatadsl.com/service/object/v1/public?_search=europe
```

The following fields are returned from the search command:

*   _id    
*   name    
*   description    
*   classification    
*   geolocation
    

You can return additional fields in the search query by passing in a _project query parameter, e.g.
```json
https://api.opendatadsl.com/service/object/v1/public?_search=europe&_project=location,category
```

### Supported query parameters

You can use the following query parameters when searching for objects:

|**Parameter**|**Example**|**Description**|
|-|-|-|
|_limit|_limit=20|Tells the service how many items to return|
|_skip|_skip=20|Tells the service from which item to start listing|
|_project|_project=location,category|Returns the additional named fields in the search response|
|_project|``` _project={“location”:1,”_id”:0}```|Returns additional fields with :1 and removes fields with :0 in the search response|
|{range}|timestamp=range(2021-01-01,2021-12-31)|Filter the search list using a date field where you can restrict the range of dates|
|{range}|quantity=range(0,10)|Filter the search list using a numeric field where you can restrict the range of values|
|{equal}|location=Europe|Filter the search list using a field and value|
|{ne}|location=ne(null)|Filter the search list where a field is not equal to a value|
|{in}|location=in(England, Germany)|Filter the results where a field is one of a list of values|
|{gt}|value=gt(4)|Filter the results where a field value is greater than a supplied value|
|{gte}|value=gte(4)|Filter the results where a field value is greater than or equal to a supplied value|
|{lt}|value=lt(4)|Filter the results where a field value is less than a supplied value|
|{lte}|value=lte(4)|Filter the results where a field value is less than or equal to a supplied value|
|{within}|geolocation=within(sphere([-2.6, 49.45], 0.007))|Filter the search list where the geolocation is within a sphere denoted as sphere([longitude, latitude], distance) where distance is radians|

### Searching autocomplete

The object service also includes an autocomplete helper which provides a list of phrases which you may be typing into the search box, to use this in the API, use the _searchinfo query parameter, e.g.
```json
https://api.opendatadsl.com/service/object/v1/public?_searchinfo=europe
```
This returns an array of JSON objects containing the _id and name field of objects you may be looking for like the below:
```json
[
  {
    "_id": "#EEX.AG.FAPP.BE.PR.IND.W",
    "name": "European Energy Exchange Belgium European Processing Potato Index"
  },
  {
    "_id": "#EEX.AG.FAPP.DE.PR.IND.W",
    "name": "European Energy Exchange Germany European Processing Potato Index"
  }
]
```
:::note
You can specify the number of items to return using the _limit query parameter
:::

## Filtering Objects

You can filter the list of objects returned using either a simple or complex filter.

### Simple filtering

#### Filtering by fields

Simple filtering allows you to provide names of fields as query parameters and a value that you want to filter on, see below for examples:

```json
https://api.opendatadsl.com/service/object/v1/public?location=Europe

https://api.opendatadsl.com/service/object/v1/public?currency=EUR&class=SPOT
```

:::note
Simple filters are case-sensitive
::::

#### Filtering by object type

You can also filter using the type of an object using the _type query parameter, e.g.
```json
https://api.opendatadsl.com/service/object/v1/public?_type=%23Company
```

:::note
%23Company is the URL encoded string of #Company
:::

You can also use a #type (%23type) query parameter to specify the type and all subtypes, e.g.
```json
https://api.opendatadsl.com/service/object/v1/public?%23type=%23MarketData
```

### Simple filtering with functions

The following functions are available for use with simple functions:

|**Function**|**Example**|**Description**|
|-|-|-|
|range (dates)|ts=range(2021-01-01,2021-12-31)|Filters date fields to a range of dates|
|range (number)|qty=range(0,10)|Filters numeric fields to a range of values|
|ne|location=ne(London)|Filters records where a field is not equal to the supplied value|
|in|location=in(England,Germany)|Filters records where a fields value is equal to a value within a supplied list of values|
|gt|value=gt(4)|Filters records where a field value is greater than a supplied value|
|gte|value=gte(4)|Filters records where a field value is greater than or equal to a supplied value|
|lt|value=lt(4)|Filters records where a field value is less than a supplied value|
|lte|value=lte(4)|Filters records where a field value is less than or equal to a supplied value|

### Complex filtering

You can supply a complex filter as a URL encoded JSON object

## Getting An Object

You can retrieve a single object using a HTTP GET request. The following example retrieves an object with _id TEST from your private repository:
```json
https://api.opendatadsl.com/service/object/v1/private/TEST
```

### Defining the fields to return

By default, all fields in the object are returned, but you can specify which fields you want/don’t want using the _project query parameter. The _project query parameter can be used simple as a list of fields you want (_id is always included too) or can be sent as JSON object declaring the fields to want or declaring the fields you don’t want.

#### Simple project form
```json
https://api.opendatadsl.com/service/object/v1/public/%23BNM_FX_AEDMYR_1200?_project=base,currency
```

Returns:
```json
{
  "_id": "#BNM_FX_AEDMYR_1200",
  "base": "AED",
  "currency": "MYR"
}
```

#### Complex project form

The JSON object to send as the _project query parameter contains a list of fields with values of 0 to exclude or 1 in include. The equivalent JSON object for the example above would be:

```json
{
  "base":1,
  "currency":1
}
```

### Getting data for an object

If the object has DATA (TimeSeries, Curves etc.) these are normally retrieved using the data service, but you can instruct the object service to return the data instead using the _profile query parameter. The _profile parameter should be set to the name of the DATA object to retrieve.

The following example retrieves the SPOT timeseries:

```json
https://api.opendatadsl.com/service/object/v1/public/%23BNM_FX_AEDMYR_1200?_profile=SPOT
```

#### Getting data for multiple objects

You can also supply the _profile parameter when using filter parameters in order to retrieve an array of DATA objects.

```json
https://api.opendatadsl.com/service/object/v1/public
  ?_type=%23ForeignExchange
  &dataset=BNM_FX
  &_profile=SPOT
```

## Getting Multiple Objects

You can retrieve multiple objects at once if you know their _id using the ‘all’ source and query parameters. This allows you to retrieve objects from both the public and private sources in one go.

Example getting multiple objects from both private and public:

```json
https://api.opendatadsl.com/service/object/v1/all
  ?_id=%23AHDB
  &_id=%23AHDB_DR_PR
  &_id=ABC
```

You can combine this also with the _project query parameter in order to specify which fields you want to return, e.g.

```json
https://api.opendatadsl.com/service/object/v1/all
  ?_id=%23AHDB
  &_id=%23AHDB_DR_PR
  &_id=ABC
  &_project=name,description
```

## Saving Objects

### Creating or Updating an object

#### Updating a single object

To create or update an object, you need to make a HTTP POST request to the object service with the body of the message being the object to update.

Below is an example of updating a #SETTING object to your private repository:

```json
POST https://api.opendatadsl.com/service/object/v1

{
  "_id": "TEST",
  "_type": "#SETTING",
  "name": "TEST",
  "value": 1234
}
```

#### Updating multiple objects

The POST method also supports arrays of objects in order to update multiple objects.

:::note
All updates to objects are performed in a transaction, therefore if one fails, nothing is updated
:::

Below is an example of updating multiple settings in one request:

```json
POST https://api.opendatadsl.com/service/object/v1

[
  {
    "_id": "TEST1",
    "_type": "#SETTING",
    "name": "TEST1",
    "value": 1
  },
  {
    "_id": "TEST2",
    "_type": "#SETTING",
    "name": "TEST2",
    "value": 2
  }
]
```

### Merging and replacing

Whenever an object is updated, the fields of the new object are merged with the existing object with the new object field values taking precedence. If you want to completely replace an object with the new version pass in the query parameter _replace=true.

The following examples show this in action:

#### Create an object

```json
POST https://api.opendatadsl.com/service/object/v1

{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "name": "TESTMERGE",
  "value": 1
}
```

#### Retrieve the object

```json
GET https://api.opendatadsl.com/service/object/v1/private/TESTMERGE
```
#### The object

```json
{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "name": "TESTMERGE",
  "value": 1,
  "_oid": "TESTMERGE",
  "_timestamp": "2021-05-13T12:06:42.136Z",
  "_user": "39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d",
  "_tag": [],
  "_version": 1
}
```

#### Update (merge) the object

```json
POST https://api.opendatadsl.com/service/object/v1

{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "description": "Test merging"
}
```

#### Retrieve the object again

```json
GET https://api.opendatadsl.com/service/v1/private/TESTMERGE
```

#### The Object
```json
{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "name": "TESTMERGE",
  "value": 1,
  "_oid": "TESTMERGE",
  "_timestamp": "2021-05-13T12:08:53.288Z",
  "_user": "39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d",
  "_tag": [],
  "_version": 2,
  "description": "Test merging"
}
```

Notice how the name and value remain in the object, the description has been added and the _version is now 2

#### Replace the object

```json
POST https://api.opendatadsl.com/service/object/v1?_replace=true

{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "description": "Test merging"
}
```

#### Retrieve the object again

```json
GET https://api.opendatadsl.com/service/object/v1/private/TESTMERGE
```

#### The Object

```json
{
  "_id": "TESTMERGE",
  "_type": "#SETTING",
  "description": "Test merging",
  "_oid": "TESTMERGE",
  "_timestamp": "2021-05-13T12:10:33.224Z",
  "_user": "39c6cccd-d6ea-4ac1-b564-8e4d1e28d75d",
  "_tag": [],
  "_version": 3
}
```

Notice how the name and value are now missing from the object

### Object versioning

If the object type you updating is a versioned type and the updated object is different to the existing stored object, the existing object will be archived and the new object becomes the current version with an increased version number.

### Tagging versions

You can tag a version of an object with a name such as PROD, FINAL etc. by using the HTTP PUT command as follows:

```json
PUT https://api.opendatadsl.com/service/object/v1/private/TESTMERGE/3/FINAL
```

You can now retrieve that version using the supplied tag, e.g.

```json
https://api.opendatadsl.com/service/object/v1/private/TESTMERGE/FINAL
```

If you PUT a different version to the same tag name, then this version now has that tag and the tag is removed from the other version.

The tags on a version are stored in the _tag field on the object

## Deleting Objects

To delete an object or roll back to a previous version on an object, you need to use the HTTP DELETE command.

Using DELETE without specifying a version, removes the latest version of the object, effectively performing a rollback to previous version on the object. If this is the only version, the object will be completely removed.

```json
DELETE https://api.opendatadsl.com/service/object/v1/private/TESTMERGE
```

Using DELETE specifying a version number or tagname deletes the specific version of the object. If this is the latest version of the object, the previous version of the object now becomes the current version.

```json
DELETE https://api.opendatadsl.com/service/object/v1/private/TESTMERGE/1
```

Using DELETE with * as the version, completely removes the object including all other versions.

```json
DELETE https://api.opendatadsl.com/service/object/v1/private/TESTMERGE/*
```