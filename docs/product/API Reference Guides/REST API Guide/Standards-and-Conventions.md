---
sidebar_position: 1
slug: /api/rest/standards
---
Standards and Conventions
=========================

A useful guide to the conventions used within the REST API.

## REST Remote Service URL

All the REST remote service resources are accessible through a single URL endpoint:

https://api.opendatadsl.com/api

## Security

In order to use the REST API, you need to have a valid ID token and pass that as the Authorization header in the following way:

```
Authorization: Bearer <IDTOKEN>
```

## Multiple Environments

By default all your requests will be routed to your **production** environment, but in order to use a different configured user environment, you need to pass an **x-odsl-environment** header, e.g.

```
x-odsl-environment: <ENVNAME>
```

## GET as POST
For any GET requests to the REST API, you can also use POST using the following configuration:

* Set a Content-Type header as ```application/x-www-form-urlencoded```
* In the body, specify the query parameters

The query parameter keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. 
Non-alphanumeric characters in both keys and values are URL encoded.

Example:

```js
POST https://api.opendatadsl.com/api/object/v1/public
Authorization: Bearer {{token}}
Content-Type: application/x-www-form-urlencoded

_distinct=_type&_filter={_id:/AB/}
```

## Pagination

All the GET methods tagged in the documentation as **PAGED** break the list of results down into pages which you can control using the following query parameters:

| **Parameter** | **Description** | **Default** |
|-|-|-|
| _limit | The page size | 100 | 
| _skip | The number of records to skip | 0 |

As an example:

```js
// Initial request 
https://api.opendatadsl.com/api/action/v1/public?_limit=100&_skip=0

// The request to get the next 100 records
https://api.opendatadsl.com/api/action/v1/public?_limit=100&_skip=100
```

After making the request, you should check the response headers for **x-total-count**, this tells you the total number of records for the request.

## All Standard Parameters

The following table is a list of all the standard query parameters and their usage:

| **Parameter** | **Examples** | **Description** |
|-|-|-|
| _sort | _sort={“name”:1, “timestamp”:-1} | Sorts the results of a query according to the field or fields passed in. The value must be 1 for sort ascending or -1 for sort descending |
| _limit | _limit=100 | Limits the number of returned items |
| _skip | _skip=100 | Skips the number of items specified |
| _search | _search=london | Searches the data using the passed in search expression |
| _searchinfo | _searchinfo=lon | Returns a list of ‘auto-complete’ items starting with the expression passed in |
| _distinct | _distinct=location | Returns an array of strings representing a distinct list of values from the named field |
| _reason | _reason=New Data | When added to POST or DELETE calls, sets the reason field in the audit trail |
| _profile | _profile=SPOT | Used in a OBJECT service query to return DATA related to the object |
| _project | _project=name, description | Defines a specific list of fields that you want returned from the service |
| _delay | _delay=60000 | Defines the amount of milliseconds to delay running a manually triggered process |
| _range | _range=last(10) | Defines the date range that you want to return data from a TimeSeries |
| _replace | _replace=true | If set to true with an OBJECT POST query, it will replace the stored object with the provided object instead of merging the data into it |

#### Ranges

Time-series ranges can be one of:
* last(n) - return the last n values 
* from(date) - return all data since date 
* between(date, date) - return all data between the 2 dates