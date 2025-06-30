---
title: Currency Service
description: REST API for the currency service
slug: /api/rest/service/currency
tags:
  - api
  - service
  - currency
---
A read-only service to find and retrieve public and private currencies

## Currency REST API

The Currency REST API is a read-only API allowing you to search and filter currency pairs and accessed through the following URL:
```js
https://api.opendatadsl.com/api/currency
```

The API consists of the following calls:

|**Method**|**Path**|**Example**|**Description**|
|-|-|-|-|
|GET|||Get the build information for this service|
|GET|\{release\}/\{source\}|'v1/public' 'v1/private'|List public or private currency pairs|
|GET|\{release\}/\{source\}/\{key\}|v1/private/TEST|Retrieve a single currency pair|

## Entities

### Currency Pair

The currency pair entity is an object of type #ForeignExchange and contains (at least) the following information:

|**Name**|**Description**|**Type**|
|-|-|-|
|_id|Unique id for the currency pair object (or object id if this is not the latest version)|String|
|_type|The type of the entity - always #ForeignExchange|String|
|_links|An object containing object link information|Object|
|_access|The data role for access control of this currency pair|String|
|base|The base currency code|String|
|currency|The currency code|String|
|source|The code for the currency provider|String|

## General Queries

#### Listing currency providers

In order to get a list of the currency providers, you can use the _distinct query parameter on either the public or private currency pairs, e.g.
```js
https://api.opendatadsl.com/api/currency/v1/public?_distinct=source
```

#### Listing base currencies for a provider

To get a list of base currencies for a provider, you can filter the source and use the _distinct query parameter on the base property, e.g.
```js
https://api.opendatadsl.com/api/currency/v1/public?source=ECB&_distinct=base
```
#### List currencies for a provider

To get a list of currencies for a specific base currency from a provider.
```js
https://api.opendatadsl.com/api/currency/v1/public?source=ECB&base=EUR&_distinct=currency
```

#### List currency pair ids for a provider

To get a list of object ids for a provider.
```js
https://api.opendatadsl.com/api/currency/v1/public?source=ECB&base=EUR&_distinct=_id
```

#### Get the spot currency pair data for a specific currency from a provider

This query will get the TimeSeries data for EUR/GBP from ECB
```js
https://api.opendatadsl.com/api/currency/v1/public
  ?source=ECB
  &base=EUR
  &currency=GBP
  &_profile=SPOT
```
