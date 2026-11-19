---
title: Platform and security
description: The JSON of policies, groups, lists, secrets, settings, documentation, extensions, indexes, environments, tenants, users and the platform logs
slug: /api/json/platform
sidebar_position: 13
tags:
  - api
  - json
  - security
---

# Platform and security

---

## Policy

A policy gives or denies people access to data and features. Service: [Policy](/docs/api/rest/service/policy) (`policy/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The policy id. It cannot end with `-built-in` or match a built-in policy |
| `_type` | String | Yes | `Policy`, `FeaturePolicy` or `RedactionPolicy` |
| `service` | String | Yes for `Policy` | The service it covers, or `*` for all |
| `source` | String | No | The source it covers, defaults to `private` |
| `condition` | String | No | A filter on the items it covers. Saved with the filter turned into a query in `query` |
| `actions` | String[] | No | `create`, `read`, `update`, `delete`, `run`, `editPublicTypeProperties`, `editPrivateTypeProperties` |
| `members` | String[] | No | User emails and security group ids, or `*` for everyone |
| `features` | String[] | Yes for `FeaturePolicy` | The features the policy gives |
| `deny` | Boolean | No | True for a deny policy |
| `enabled` | Boolean | No | False to switch it off, defaults to true |
| `category`, `description` | String | No | Descriptive fields |
| `tags` | String[] | No | Tags |

```json
{
  "_id": "nge-gas-desk-write",
  "_type": "Policy",
  "category": "Desks",
  "description": "The gas desk can change gas master data",
  "service": "object",
  "source": "private",
  "condition": "commodity='Natural Gas'",
  "actions": ["read", "create", "update"],
  "members": ["priya.shah@northgate-energy.com", "tom.clarke@northgate-energy.com"],
  "deny": false,
  "enabled": true
}
```

---

## Group

A group is a list of items from another service, kept by name. Service: [Group](/docs/api/rest/service/group) (`group/v1`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | Made for you when you create a group |
| `_type` | String | Platform | `VarGroup` |
| `name` | String | Yes | The name |
| `type` | String | Yes | The kind of group, for example `favourite`, `build`, `quality`, `approval` or `export` |
| `category` | String | Yes | A category |
| `service` | String | Yes | The service the items come from, for example `object` or `data` |
| `description` | String | No | A description |
| `shared` | Boolean | No | True to share it with everyone in your company, defaults to false |
| `items` | String[] | No | The item ids, for a static group |
| `dynamic` | Boolean | No | True to find the items with a filter instead of listing them |
| `dynamicOptions` | Object | No | For a dynamic group: `filter` (or `objectFilter` to filter on master data), `service`, `source` and `field` (the id field, defaults to `_id`) |

```json
{
  "name": "NGE gas forwards",
  "type": "favourite",
  "category": "object",
  "service": "object",
  "shared": true,
  "dynamic": true,
  "dynamicOptions": {"filter": "source='ICE' and commodity='Natural Gas'"}
}
```

---

## List

A list of master data objects that someone makes in the portal. Service: [List](/docs/api/rest/service/list) (`list/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | No | An object id, made for you if not given |
| `name` | String | Yes | The name |
| `objects` | String[] | Yes | The object ids |
| `visibility` | String | No | `private` (the default) or `shared` |
| `owner` | String | Platform | Who made it |

```json
{
  "name": "Gas desk watch list",
  "objects": ["NGE.GAS.TTF", "NGE.GAS.NBP", "NGE.GAS.ZTP"],
  "visibility": "shared"
}
```

---

## Secret

Service: [Secret](/docs/api/rest/service/secret) (`secret/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_id` | String | Yes | The secret name |
| `_type` | String | No | `VarSecret` |
| `value` | String | Yes | The secret |
| `enabled` | Boolean | No | Defaults to true |
| `notBefore`, `expires` | Date | No | When the secret is valid from and to |
| `vault` | String | Platform | `client` when the value is kept in your own Azure Key Vault |

```json
{"_id": "ice-sftp-password", "_type": "VarSecret", "value": "s3cr3t", "enabled": true, "expires": "2027-06-30"}
```

---

## Setting

A personal setting, such as the last filter used on a screen. Service: [Setting](/docs/api/rest/service/setting) (`setting/v1`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `name` | String | Yes | The setting name. Names starting with `#` are kept centrally |
| (any name) | Any | No | The values to keep |
| `_id`, `_user` | String | Platform | The id and your user id |

```json
{"name": "smart-data.list.filters", "category": "Spread", "commodity": "Power"}
```

---

## Documentation

A document about something on the platform. Service: [Documentation](/docs/api/rest/service/documentation) (`documentation/v1/{source}`), versioned.

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `_type` | String | Platform | `VarDocumentation` |
| `documentationType` | String | No | `Default` (markdown in `content`, the default), `Link` (a page at `url`) or `JSON` (data in `json`) |
| `scope`, `entity`, `name` | String | No | What the document is about, for example `object`, `NGE.GAS.TTF` and `overview`. None of them may contain a colon |
| `language` | String | No | The language code, defaults to the request's language or `en` |
| `content` | String | For `Default` | The markdown. Front matter (`scope`, `entity`, `name`, `language`, `source`, `tags`) is read into the other fields |
| `url`, `selector` | String | For `Link` | The page, and an optional CSS selector for the part to show |
| `json`, `template` | | For `JSON` | The data, and an optional template |
| `tags` | String[] | Platform | From the front matter |
| `source` | String | No | `private`, unless you are an OpenDataDSL administrator |

Read a document with `documentation/v1/private/scope:entity:name`.

```json
{
  "documentationType": "Default",
  "scope": "object",
  "entity": "NGE.GAS.TTF",
  "name": "overview",
  "content": "# TTF\n\nThe Dutch Title Transfer Facility gas price used by the Northgate gas desk."
}
```

---

## Extension

An extension adds screens and resources to the portal. Service: [Extension](/docs/api/rest/service/extension) (`extension/v1/{source}`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | `publisher.code` |
| `_type` | String | `VarExtension` |
| `publisher`, `code` | String | The parts of the id |
| `name`, `description`, `icon` | String | Shown in the extension catalog |
| `documentation` | String | A link to the documentation |
| `tags` | String[] | Catalog tags |
| `currency`, `price` | String | The price, `0` for free |
| `preview` | Boolean | Only installable in the preview environment |
| `plugin`, `standalone` | Boolean | Set for plug-ins and stand-alone extensions |
| `dependencies` | Array | The extensions it needs |
| `views` | Array | The screens: `id`, `name`, `description`, `section`, `tabname`, `appname`, `excel`, `insights`, `home`, `icon`, `feature`, `order` and `script` (the mustache template) |
| `resources` | Object | What is installed with it, by service name: a list of ids, or an object of names to ids. `script` can name `install`, `upgrade` and `uninstall` scripts |
| `configuration` | Object | Settings for the extension |

```json
{
  "_id": "nge.positions",
  "_type": "VarExtension",
  "publisher": "nge",
  "code": "positions",
  "name": "Northgate positions",
  "description": "Net positions by desk and month",
  "icon": "bar-chart-line",
  "tags": ["trading"],
  "price": "0",
  "views": [
    {"id": "main", "name": "Positions", "section": "Trading", "tabname": "Main", "icon": "bar-chart-line", "script": "nge.positions.main"}
  ],
  "resources": {
    "script": {"main": "nge.positions.main", "install": "nge.positions.install"},
    "policy": ["extension.nge.positions"]
  }
}
```

---

## Index

An index on the data in one of your services, to make queries faster. Service: [Index](/docs/api/rest/service/index) (`index/v1/{service}`).

| **Field** | **Type** | **Required** | **What it is** |
|-|-|-|-|
| `name` | String | Yes | The index name |
| `key` | Object | Yes | The fields, each with 1 (ascending) or -1 (descending) |
| `unique`, `sparse`, `hidden` | Boolean | No | Index options |
| `expireAfterSeconds` | Integer | No | Remove documents after this many seconds |
| `partialFilterExpression` | Object | No | Only index documents that match |
| `collation` | Object | No | Language rules for comparing strings |

```json
{"name": "commodity_location", "key": {"commodity": 1, "location": 1}}
```

---

## Environment

A data environment. Service: [Environment](/docs/api/rest/service/environment) (`environment/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The environment id |
| `name` | String | The name |
| `description` | String | A description |
| `_createdBy`, `_timestamp` | | Platform: who created it and when |
| `_size` | Integer | Platform: the size of its data |

---

## Tenant

Your company. Service: [Tenant](/docs/api/rest/service/tenant) (`tenant/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | Your tenant id |
| `name` | String | Your company name |
| `properties` | Object | Your company details: `name`, `address1`, `address2`, `city`, `postcode`, `email`, `phone`, `accountContact`. Sent properties replace the saved ones |
| `accountContacts` | Object | Your account contacts |
| `preferences` | Object | Company preferences |
| `mongodb`, `connections` | String | Your own MongoDB connection strings, which must start with `mongodb` |
| `settings` | Object | Platform settings. Only OpenDataDSL can change them |
| `pricing`, `quota` | Object | Your plan and quotas. Only OpenDataDSL can change them |

```json
{
  "properties": {
    "name": "Northgate Energy",
    "address1": "1 Harbour Street",
    "city": "Aberdeen",
    "postcode": "AB11 5AA",
    "email": "accounts@northgate-energy.com"
  }
}
```

---

## User

Your user record. Service: [User](/docs/api/rest/service/user) (`user/v1`).

| **Field** | **Type** | **What it is** |
|-|-|-|
| `_id` | String | The record id |
| `id` | String | Your user id |
| `email` | String | Your email |
| `tid`, `tenant` | String | Your tenant id and name |
| `properties` | Object | Your details, for example `firstname`, `lastname`, `nickname` |
| `connections` | Object | Your connections to other systems |
| `keys` | Array | Your API keys, without the key itself: `name`, `start`, `expires`, `timestamp` |

To make an API key, POST `{"api-key": "create", "name": "etrm-feed", "expires": "2027-10-31"}`; to delete one, send `"api-key": "delete"` with its name.

---

## Logs and usage records

These records are written by the platform and are read-only.

| **Entity** | **Service** | **Fields** |
|-|-|-|
| Audit entry | [Audit](/docs/api/rest/service/audit) | `_id`, `timestamp`, `user`, `service`, `id`, `ref`, `version`, `action` (`create`, `update`, `delete` and so on), `description`, `reason`, `status` (the HTTP status), `change` (what changed) |
| Metric | [Metric](/docs/api/rest/service/metric) | `_id`, `timestamp`, `type` (`api`, `message`, `process` or `storage`), `service`, `action`, `method`, `application`, `environment`, `user`, `value`, `duration` (ms), `responseSize`, `httpstatus`, `detail`, `invocationId` |
| Invoice | [Billing](/docs/api/rest/service/billing) | `ref`, `date`, `year`, `month`, `tenant`, `tid`, `name`, `address`, `pricingPlan`, `charges`, `vat`, `total`, `detail` (the invoice lines) |
| User event | [User Event](/docs/api/rest/service/user-event) | `email`, `action` (`add`, `delete` or `invite`), `users` (the number of users after it), `timestamp` |
| Unit | [Unit](/docs/api/rest/service/unit) | `code`, `name`, `dimension`, `factor` (to the base unit of the dimension), `metric`, `prefix`, `conversions` (each `dimension`, `unit` and `requiredParameter`) |
| Function | [Function](/docs/api/rest/service/function) | `name`, `category`, `class`, `description`, `constructor`, `params` (each `name`, `description`, `type`), `returns`, `tags`, `link` |

```json
{
  "_id": "673b9f2e8c1d4a5e6f708192",
  "timestamp": "2026-11-18T18:12:03.601",
  "user": "priya.shah@northgate-energy.com",
  "service": "object",
  "id": "NGE.POWER.DE",
  "version": 3,
  "action": "update",
  "reason": "Added German peak hours",
  "status": 200
}
```
