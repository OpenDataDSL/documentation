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

In order to use the REST API, you need to have a valid ID or ACCESS token and pass that as the Authorization header in the following way:

```
Authorization: Bearer <IDTOKEN>
```

## API Versioning
All OpenDataDSL REST API endpoints include a version identifier in the URL path, for example:

```https://api.opendatadsl.com/api/object/v1/public```

The version segment, currently `v1`, is embedded directly in the path rather than as a header or query parameter, making it explicit and easy to identify at a glance. 
This approach ensures that any existing integrations continue to work exactly as expected, even if future versions of the API are introduced. 

The platform is currently on **v1** across all services, and there are no planned breaking changes that would necessitate a new version. 
Should a `v2` ever become necessary in the future, both versions would be supported in parallel for a transition period, giving you ample time to migrate without disruption. 

For now, all documented examples and SDK calls use `v1`, and you can rely on this remaining stable.


## Multiple Environments

By default all your requests will be routed to your **production** environment, but in order to use a different configured user environment, you need to pass an **x-odsl-environment** header, e.g.

```
x-odsl-environment: <ENVNAME>
```

## Request headers

| **Header** | **Example** | **Description** |
|-|-|-|
| Authorization | Bearer eyJ0eXAi... | Your ID token, access token or API key (required by every service except health and survey) |
| x-odsl-environment | test | The data environment to use, defaults to production |
| x-odsl-app | exceladdin | The application making the request. Some services use it, for example the report service hides reports marked `hideExcel` from the Excel add-in |
| Accept | text/csv | The response format, see [Response Formats](#response-formats) |
| Content-Type | application/json | The format of the request body. Use `application/x-www-form-urlencoded` to put query parameters in the body of a GET request |

## Using GET body for large URLs
For any GET requests to the REST API where the URL is longer than 2048 characters, you can place the query parameters in the BODY of the GET request using the following configuration:

* Set a Content-Type header as ```application/x-www-form-urlencoded```
* In the body, specify the query parameters

The query parameter keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. 
Non-alphanumeric characters in both keys and values are URL encoded.

Example:

```js
GET https://api.opendatadsl.com/api/object/v1/public
Authorization: Bearer {{token}}
Content-Type: application/x-www-form-urlencoded

_distinct=_type&_filter={_id:/AB/}
```

## Pagination

All the GET methods that return a list break the results down into pages, which you control with the following query parameters:

| **Parameter** | **Description** | **Default** |
|-|-|-|
| _limit | The page size, or -1 for all the items | 100, or all the items for services that allow unlimited page sizes |
| _skip | The number of records to skip | 0 |
| _count | Set to false to skip counting the total number of items, which is faster on large collections | true |

As an example:

```js
// Initial request
https://api.opendatadsl.com/api/object/v1/public?_limit=100&_skip=0

// The request to get the next 100 records
https://api.opendatadsl.com/api/object/v1/public?_limit=100&_skip=100
```

After making the request, check the **x-total-count** response header: it tells you the total number of records for the request.

### Default page size
If you don't specify a ```_limit``` query parameter, a default limit of 100 is applied, except for the services that allow unlimited page sizes. Those return every matching item unless you give a ```_limit```. Most configuration services allow unlimited page sizes, for example action, calendar, extension, process, report, script and type. The services that hold large amounts of data, such as object, data, event, audit and the log services, apply the default of 100.

### Unlimited items
You can specify a ```_limit``` of -1 to request all items without pagination. For services that do not allow unlimited page sizes, the page is capped at 100,000 items.

### Lists that are not counted
Counting every match on a very large collection is slow, so some lists (for example event lists) don't count them. When there are more items than the page holds, the response has an **x-odsl-moredata** header set to true and an **x-total-count** of -2: keep reading pages until a page has fewer items than ```_limit```. Pass ```_count=true``` to ask for the exact count instead.

## All Standard Parameters

The following table is a list of all the standard query parameters and their usage:

| **Parameter** | **Examples** | **Description** |
|-|-|-|
| _sort | _sort=\{“name”:1, “timestamp”:-1\} | Sorts the results of a query according to the field or fields passed in. The value must be 1 for sort ascending or -1 for sort descending |
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
| _count | _count=true | Set to false to skip counting the total, or true to force an exact count on lists that are not counted by default |
| _filter | _filter=\{"_type":"VarCurve"\} | Filters the items, see [Searching and Filtering](./searching) |
| _aggregate | _aggregate=[...] | Runs a MongoDB aggregation pipeline, see [Aggregation](./aggregation) |
| _fieldinfo | _fieldinfo=user | Counts the items by the values of a field, see [Aggregation](./aggregation) |
| _sortbycount | _sortbycount=status | Returns each distinct value of a field with the number of items that have it, most common first |
| _bucket | _bucket=price buckets 10 | Groups the items into buckets by the values of a field |
| _group | _group=favourite:Lists:Gas | Restricts a list to the items in a group, using the group id or its type:category:name |
| _ignoreMissing | _ignoreMissing=true | When reading several ids from the all source, ignore the ones that don't exist instead of failing |
| _collation | _collation=\{"locale":"en","strength":2\} | A MongoDB collation for the query, for example to sort and match without case |
| _allowdiskuse | _allowdiskuse=true | Lets a large sort use disk space on the database server |
| _function | _function=listAutomations | Runs a service function, see [Special Functions](./special_functions) and each service's page |
| _run | _run=true | Runs a runnable item (an automation, a report, a smart curve) instead of just reading it |
| _ondate | _ondate=2026-10-23 | The date to use, for services that work on dated items such as reports and curves |
| _template | _template=%23PriceVolumeCurveTemplate | The mustache template used to render the result when you ask for text/html |
| _properties | _properties=\{"region":"NW"\} | Extra properties passed to a report or extension view when it is rendered |
| _bulk | _bulk=true | Applies a POST or DELETE to every item that matches the _filter, see [Bulk updates and deletes](#bulk-updates-and-deletes) |
| _upsert | _upsert=true | With a bulk update, creates an item when none matches the filter |
| _restore | _restore=true | With a bulk DELETE, restores bulk deleted items that match the filter |

#### Ranges

Time-series ranges can be one of:
* last(n) - return the last n values 
* from(date) - return all data since date 
* between(date, date) - return all data between the 2 dates

## Sources

Most services keep their items in one or more **sources**, which is the path segment after the release:

| **Source** | **Description** |
|-|-|
| public | Items published by OpenDataDSL that every tenant can read. Public ids start with `#` |
| private | Your company's own items |
| common | Items shared by data providers with the companies that subscribe to them (used by the data, event and object services) |
| all | Reads from public and private at once. Pass the ids with the `_id` query parameter (several `_id` parameters, or a comma separated list), or as a JSON array in the body of the GET request. An id starting with `#` is read from public, any other id from private |

Each service page shows which sources the service has. Services that only have one source, for example process or user, have no source segment in the path.

---

## Versions and tags

Versioned services keep every saved version of an item. The latest version is the live item, with a `_version` number. Older versions are kept in an archive with their own object id in `_id` and the item id in `_oid`.

| **Method** | **Path** | **Description** |
|-|-|-|
| GET | \{key\}/* | List the versions of an item |
| GET | \{key\}/\{version\} | Read a version by its number |
| GET | \{key\}/\{tag\} | Read the version that has a tag |
| PUT | \{key\}/\{version\}/\{tag\} | Tag a version. A tag is only on one version of an item at a time, so it moves from any other version |
| DELETE | \{key\} | Roll back: delete the latest version so the previous version becomes the live item. If it is the only version, the item is deleted |
| DELETE | \{key\}/\{version\} | Delete a version. Deleting the latest version rolls back to the previous one |
| DELETE | \{key\}/\{tag\} | Remove a tag from the version that has it |
| DELETE | \{key\}/* | Delete the item and all its versions |

The paths are relative to the service, release and source, for example ```/object/v1/private/MYOBJECT/*```.

---

## Renaming items

A PUT to an item without a tag renames it. The body is a JSON object with the new id in the service's key field (usually `_id`):

```js
PUT https://api.opendatadsl.com/api/script/v1/private/old-name
Authorization: Bearer {{token}}
Content-Type: application/json

{"_id": "new-name"}
```

The rename fails if an item with the new id already exists. It is recorded twice in the audit trail, once against each id, and items that refer to it are updated where the service supports it.

---

## Bulk updates and deletes

Some services let you change or delete every item that matches a filter in one call, by adding ```_bulk=true```:

* **POST** with ```_bulk=true``` and a ```_filter```: the body is a MongoDB update document (for example ```{"$set": {"category": "Gas"}}```) or an update pipeline (an array). Add ```_upsert=true``` to insert an item when nothing matches. You need full rights to the service and source.
* **DELETE** with ```_bulk=true``` and a ```_filter```: deletes every matching item and all its versions. The response is the list of ids deleted.
* **DELETE** with ```_bulk=true```, ```_restore=true``` and a ```_filter```: restores items deleted by a bulk delete (services that keep bulk deleted items only).

Bulk updates and restores are available on the object and event services. Bulk deletes are also available on audit, automationlog, batch, crontablog, dataset_delivery, dataset-feed-log, exception, health, metric, process-exec, queuelog, scriptlog and validation. Each change is recorded in the audit trail with the reason ```Bulk Updated```, ```Bulk Deleted``` or ```Bulk Restored``` unless you pass a ```_reason```.

```js
### Set the category of every private gas object
POST https://api.opendatadsl.com/api/object/v1/private
    ?_bulk=true
    &_filter={"_type":"GasPrice"}
Authorization: Bearer {{token}}
Content-Type: application/json

{"$set": {"category": "Gas"}}
```

---

## Response Formats

By default, all REST responses are in JSON format. This section shows you how to work with different response formats.

### CSV
CSV format is supported using the REST header: ```Accept: text/csv```

#### Examples of retrieving data in CSV format:

```json
### Master Data in CSV
GET https://api.opendatadsl.com/api/object/v1/public/%23ABN_FX.EURGBP
Authorization: Bearer {{token}}
Accept: text/csv

### Timeseries in CSV
GET https://api.opendatadsl.com/api/data/v1/public/%23ABN_FX.EURGBP:SPOT
Authorization: Bearer {{token}}
Accept: text/csv

### Curve in CSV
GET https://api.opendatadsl.com/api/data/v1/public/%23IPEX.EL.IT.BL.MTE.FWD.CURVE:PRICE:2023-12-12
Authorization: Bearer {{token}}
Accept: text/csv
```

### TSV
Tab separated values are supported using the REST header ```Accept: text/tab-separated-values```

### XML
XML format is supported using the REST header ```Accept: application/xml```

#### Examples of retrieving data in XML format:

```json
### Master Data in XML
GET https://api.opendatadsl.com/api/object/v1/public/%23ABN_FX.EURGBP
Authorization: Bearer {{token}}
Accept: application/xml

### Timeseries in XML
GET https://api.opendatadsl.com/api/data/v1/public/%23ABN_FX.EURGBP:SPOT
Authorization: Bearer {{token}}
Accept: application/xml

### Curve in XML
GET https://api.opendatadsl.com/api/data/v1/public/%23IPEX.EL.IT.BL.MTE.FWD.CURVE:PRICE:2023-12-12
Authorization: Bearer {{token}}
Accept: application/xml
```

### Custom
You can create your own output format by uploading a custom mustache template and using the REST header ```Accept: text/html``` along with the _template query parameter.

#### Example of retrieving data using a custom format:

```json
### Curve in HTML using a template
GET https://api.opendatadsl.com/api/data/v1/public/%23OTE.EL.CZ.HOURLY.DA:PRICE_VOL:2023-12-28
	?_template=%23PriceVolumeCurveTemplate
Authorization: Bearer {{token}}
Accept: text/html
```

---

## Response headers

| **Header** | **Description** |
|-|-|
| x-total-count | The total number of items that match a list request, or -2 when the list was not counted |
| x-odsl-moredata | true when a list that was not counted has more items than the page holds |
| x-odsl-invocationid | The unique id of this request, useful when you report a problem to support |
| x-odsl-resultaction | What the request did, for example list, read, update, delete, tag, rename, function or none |
| x-odsl-org | Your tenant id |
| x-odsl-error | The reason a request failed |

---

## Errors

When a request fails, the response has an HTTP error status, for example 400 for an invalid request, 401 or 403 when you are not allowed, 404 when the item does not exist and 500 for a server error. The reason is in the **x-odsl-error** response header rather than in the body, so always check that header when a request fails:

```js
HTTP/1.1 400 Bad Request
x-odsl-error: [6032] Body must be a ReportConfiguration
```

A request that changes nothing, for example deleting an item that does not exist, returns 304 Not Modified.

